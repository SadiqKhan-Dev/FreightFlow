from pydantic import BaseModel, Field
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from app.models.invoice import InvoiceStatus, PaymentMethod


class InvoiceItemCreate(BaseModel):
    description: str
    quantity: float = 1
    unit_price: float


class InvoiceItemResponse(BaseModel):
    id: UUID
    description: str
    quantity: float
    unit_price: float
    amount: float
    created_at: datetime

    class Config:
        from_attributes = True


class InvoiceCreate(BaseModel):
    customer_id: UUID
    shipment_id: Optional[UUID] = None
    issue_date: datetime
    due_date: datetime
    items: List[InvoiceItemCreate]
    tax_rate: float = 0
    discount_amount: float = 0
    notes: Optional[str] = None
    terms: Optional[str] = None


class InvoiceResponse(BaseModel):
    id: UUID
    company_id: UUID
    customer_id: UUID
    shipment_id: Optional[UUID]
    invoice_number: str
    status: InvoiceStatus
    issue_date: datetime
    due_date: datetime
    subtotal: float
    tax_rate: float
    tax_amount: float
    discount_amount: float
    total_amount: float
    amount_paid: float
    currency: str
    notes: Optional[str]
    terms: Optional[str]
    pdf_url: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: datetime
    items: List[InvoiceItemResponse] = []

    class Config:
        from_attributes = True


class PaymentCreate(BaseModel):
    amount: float
    payment_method: PaymentMethod
    transaction_id: Optional[str] = None
    payment_date: datetime
    notes: Optional[str] = None


class PaymentResponse(BaseModel):
    id: UUID
    invoice_id: UUID
    amount: float
    payment_method: PaymentMethod
    transaction_id: Optional[str]
    payment_date: datetime
    notes: Optional[str]
    receipt_url: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
