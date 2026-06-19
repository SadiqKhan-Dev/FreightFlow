from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, timezone, timedelta
from typing import Optional

from app.database import get_db
from app.models.shipment import Shipment
from app.models.driver import Driver
from app.models.vehicle import Vehicle
from app.models.invoice import Invoice
from app.models.customer import Customer
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/revenue")
async def revenue_report(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        return {"total_revenue": 0, "total_invoices": 0, "paid_invoices": 0, "pending_amount": 0}

    query = select(
        func.coalesce(func.sum(Invoice.total_amount), 0),
        func.count(Invoice.id),
    ).where(Invoice.company_id == user.company_id)

    paid_query = select(func.coalesce(func.sum(Invoice.total_amount), 0)).where(
        Invoice.company_id == user.company_id, Invoice.status == "paid"
    )
    pending_query = select(func.coalesce(func.sum(Invoice.total_amount - Invoice.amount_paid), 0)).where(
        Invoice.company_id == user.company_id, Invoice.status.in_(["sent", "overdue"])
    )

    total_result = await db.execute(query)
    total = total_result.one()
    paid = (await db.execute(paid_query)).scalar()
    pending = (await db.execute(pending_query)).scalar()

    return {
        "total_revenue": float(total[0]),
        "total_invoices": total[1],
        "paid_amount": float(paid),
        "pending_amount": float(pending),
    }


@router.get("/shipments")
async def shipment_report(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        return {"total": 0, "by_status": [], "by_type": []}

    total = (await db.execute(
        select(func.count(Shipment.id)).where(Shipment.company_id == user.company_id)
    )).scalar()

    status_result = await db.execute(
        select(Shipment.status, func.count(Shipment.id))
        .where(Shipment.company_id == user.company_id)
        .group_by(Shipment.status)
    )
    by_status = [{"status": r[0].value, "count": r[1]} for r in status_result.all()]

    type_result = await db.execute(
        select(Shipment.shipment_type, func.count(Shipment.id))
        .where(Shipment.company_id == user.company_id)
        .group_by(Shipment.shipment_type)
    )
    by_type = [{"type": r[0].value, "count": r[1]} for r in type_result.all()]

    return {"total": total, "by_status": by_status, "by_type": by_type}


@router.get("/fleet")
async def fleet_report(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        return {"total_vehicles": 0, "by_status": [], "by_type": []}

    total = (await db.execute(
        select(func.count(Vehicle.id)).where(Vehicle.company_id == user.company_id, Vehicle.is_active == True)
    )).scalar()

    status_result = await db.execute(
        select(Vehicle.status, func.count(Vehicle.id))
        .where(Vehicle.company_id == user.company_id, Vehicle.is_active == True)
        .group_by(Vehicle.status)
    )
    by_status = [{"status": r[0].value, "count": r[1]} for r in status_result.all()]

    type_result = await db.execute(
        select(Vehicle.vehicle_type, func.count(Vehicle.id))
        .where(Vehicle.company_id == user.company_id, Vehicle.is_active == True)
        .group_by(Vehicle.vehicle_type)
    )
    by_type = [{"type": r[0].value, "count": r[1]} for r in type_result.all()]

    return {"total_vehicles": total, "by_status": by_status, "by_type": by_type}


@router.get("/drivers")
async def driver_report(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        return {"total_drivers": 0, "by_status": []}

    total = (await db.execute(
        select(func.count(Driver.id)).where(Driver.company_id == user.company_id, Driver.is_active == True)
    )).scalar()

    status_result = await db.execute(
        select(Driver.status, func.count(Driver.id))
        .where(Driver.company_id == user.company_id, Driver.is_active == True)
        .group_by(Driver.status)
    )
    by_status = [{"status": r[0].value, "count": r[1]} for r in status_result.all()]

    return {"total_drivers": total, "by_status": by_status}
