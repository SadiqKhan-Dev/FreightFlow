from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, timezone, timedelta

from app.database import get_db
from app.models.shipment import Shipment, ShipmentStatus
from app.models.driver import Driver, DriverStatus
from app.models.vehicle import Vehicle, VehicleStatus
from app.models.invoice import Invoice, InvoiceStatus
from app.models.customer import Customer
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats")
async def get_dashboard_stats(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        return {
            "total_shipments": 0,
            "active_deliveries": 0,
            "total_vehicles": 0,
            "total_drivers": 0,
            "total_customers": 0,
            "pending_invoices": 0,
            "revenue_this_month": 0,
            "revenue_last_month": 0,
        }

    cid = user.company_id

    total_shipments = (await db.execute(
        select(func.count(Shipment.id)).where(Shipment.company_id == cid, Shipment.is_active == True)
    )).scalar() or 0

    active_deliveries = (await db.execute(
        select(func.count(Shipment.id)).where(
            Shipment.company_id == cid,
            Shipment.status.in_(["assigned", "picked_up", "in_transit"])
        )
    )).scalar() or 0

    total_vehicles = (await db.execute(
        select(func.count(Vehicle.id)).where(Vehicle.company_id == cid, Vehicle.is_active == True)
    )).scalar() or 0

    total_drivers = (await db.execute(
        select(func.count(Driver.id)).where(Driver.company_id == cid, Driver.is_active == True)
    )).scalar() or 0

    total_customers = (await db.execute(
        select(func.count(Customer.id)).where(Customer.company_id == cid, Customer.is_active == True)
    )).scalar() or 0

    pending_invoices = (await db.execute(
        select(func.count(Invoice.id)).where(
            Invoice.company_id == cid,
            Invoice.status.in_(["sent", "overdue"])
        )
    )).scalar() or 0

    now = datetime.now(timezone.utc)
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    last_month_start = (month_start - timedelta(days=1)).replace(day=1)

    revenue_this_month = (await db.execute(
        select(func.coalesce(func.sum(Invoice.total_amount), 0)).where(
            Invoice.company_id == cid,
            Invoice.status == "paid",
            Invoice.created_at >= month_start
        )
    )).scalar() or 0

    revenue_last_month = (await db.execute(
        select(func.coalesce(func.sum(Invoice.total_amount), 0)).where(
            Invoice.company_id == cid,
            Invoice.status == "paid",
            Invoice.created_at >= last_month_start,
            Invoice.created_at < month_start
        )
    )).scalar() or 0

    return {
        "total_shipments": total_shipments,
        "active_deliveries": active_deliveries,
        "total_vehicles": total_vehicles,
        "total_drivers": total_drivers,
        "total_customers": total_customers,
        "pending_invoices": pending_invoices,
        "revenue_this_month": float(revenue_this_month),
        "revenue_last_month": float(revenue_last_month),
    }


@router.get("/recent-shipments")
async def get_recent_shipments(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        return []

    result = await db.execute(
        select(Shipment)
        .where(Shipment.company_id == user.company_id)
        .order_by(Shipment.created_at.desc())
        .limit(10)
    )
    shipments = result.scalars().all()

    return [{
        "id": str(s.id),
        "shipment_number": s.shipment_number,
        "shipper_name": s.shipper_name,
        "consignee_name": s.consignee_name,
        "status": s.status.value,
        "created_at": s.created_at.isoformat(),
    } for s in shipments]


@router.get("/shipment-status-distribution")
async def get_shipment_status_distribution(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        return []

    result = await db.execute(
        select(Shipment.status, func.count(Shipment.id))
        .where(Shipment.company_id == user.company_id)
        .group_by(Shipment.status)
    )
    return [{"status": row[0].value, "count": row[1]} for row in result.all()]


@router.get("/revenue-chart")
async def get_revenue_chart(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        return []

    now = datetime.now(timezone.utc)
    data = []
    for i in range(11, -1, -1):
        month_date = now - timedelta(days=30 * i)
        month_start = month_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        if i > 0:
            next_month = (month_start + timedelta(days=32)).replace(day=1)
        else:
            next_month = now

        result = await db.execute(
            select(func.coalesce(func.sum(Invoice.total_amount), 0)).where(
                Invoice.company_id == user.company_id,
                Invoice.status == "paid",
                Invoice.created_at >= month_start,
                Invoice.created_at < next_month
            )
        )
        amount = float(result.scalar() or 0)
        data.append({
            "month": month_start.strftime("%b %Y"),
            "amount": amount,
        })

    return data
