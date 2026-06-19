from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional
from uuid import UUID

from app.database import get_db
from app.models.invoice import Invoice, InvoiceItem, Payment
from app.models.user import User
from app.schemas.invoice import InvoiceCreate, InvoiceResponse, PaymentCreate, PaymentResponse
from app.schemas.common import PaginatedResponse
from app.api.deps import get_current_user
import random
import string

router = APIRouter(prefix="/invoices", tags=["Invoices"])


def generate_invoice_number() -> str:
    prefix = "INV"
    number = ''.join(random.choices(string.digits, k=8))
    return f"{prefix}-{number}"


@router.get("", response_model=PaginatedResponse)
async def list_invoices(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    status_filter: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Company access required")

    query = select(Invoice).where(Invoice.company_id == user.company_id, Invoice.is_active == True)
    count_query = select(func.count(Invoice.id)).where(Invoice.company_id == user.company_id, Invoice.is_active == True)

    if search:
        search_filter = Invoice.invoice_number.ilike(f"%{search}%")
        query = query.where(search_filter)
        count_query = count_query.where(search_filter)

    if status_filter:
        query = query.where(Invoice.status == status_filter)
        count_query = count_query.where(Invoice.status == status_filter)

    total = (await db.execute(count_query)).scalar()
    query = query.offset((page - 1) * per_page).limit(per_page).order_by(Invoice.created_at.desc())
    result = await db.execute(query)
    invoices = result.scalars().all()

    return PaginatedResponse(
        items=[InvoiceResponse.model_validate(i) for i in invoices],
        total=total,
        page=page,
        per_page=per_page,
        pages=(total + per_page - 1) // per_page,
    )


@router.post("", response_model=InvoiceResponse, status_code=status.HTTP_201_CREATED)
async def create_invoice(
    data: InvoiceCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Company access required")

    subtotal = sum(item.quantity * item.unit_price for item in data.items)
    tax_amount = subtotal * (data.tax_rate / 100)
    total_amount = subtotal + tax_amount - data.discount_amount

    invoice = Invoice(
        company_id=user.company_id,
        customer_id=data.customer_id,
        shipment_id=data.shipment_id,
        invoice_number=generate_invoice_number(),
        issue_date=data.issue_date,
        due_date=data.due_date,
        subtotal=subtotal,
        tax_rate=data.tax_rate,
        tax_amount=tax_amount,
        discount_amount=data.discount_amount,
        total_amount=total_amount,
        notes=data.notes,
        terms=data.terms,
    )
    db.add(invoice)
    await db.flush()

    for item_data in data.items:
        item = InvoiceItem(
            invoice_id=invoice.id,
            description=item_data.description,
            quantity=item_data.quantity,
            unit_price=item_data.unit_price,
            amount=item_data.quantity * item_data.unit_price,
        )
        db.add(item)

    return InvoiceResponse.model_validate(invoice)


@router.get("/{invoice_id}", response_model=InvoiceResponse)
async def get_invoice(
    invoice_id: UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Invoice).where(Invoice.id == invoice_id, Invoice.company_id == user.company_id))
    invoice = result.scalar_one_or_none()
    if not invoice:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invoice not found")
    return InvoiceResponse.model_validate(invoice)


@router.post("/{invoice_id}/payments", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
async def add_payment(
    invoice_id: UUID,
    data: PaymentCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Invoice).where(Invoice.id == invoice_id, Invoice.company_id == user.company_id))
    invoice = result.scalar_one_or_none()
    if not invoice:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invoice not found")

    payment = Payment(**data.model_dump(), invoice_id=invoice_id)
    db.add(payment)

    invoice.amount_paid = float(invoice.amount_paid) + data.amount
    if float(invoice.amount_paid) >= float(invoice.total_amount):
        invoice.status = "paid"
    else:
        invoice.status = "partially_paid"

    await db.flush()
    return PaymentResponse.model_validate(payment)


@router.get("/{invoice_id}/payments", response_model=list[PaymentResponse])
async def list_payments(
    invoice_id: UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Payment).where(Payment.invoice_id == invoice_id).order_by(Payment.payment_date.desc())
    )
    return [PaymentResponse.model_validate(p) for p in result.scalars().all()]
