from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional
from uuid import UUID
import random
import string

from app.database import get_db
from app.models.shipment import Shipment, ShipmentTracking
from app.models.user import User
from app.schemas.shipment import (
    ShipmentCreate, ShipmentUpdate, ShipmentResponse,
    ShipmentTrackingCreate, ShipmentTrackingResponse,
)
from app.schemas.common import PaginatedResponse
from app.api.deps import get_current_user

router = APIRouter(prefix="/shipments", tags=["Shipments"])


def generate_shipment_number() -> str:
    prefix = "FF"
    number = ''.join(random.choices(string.digits, k=8))
    return f"{prefix}-{number}"


@router.get("", response_model=PaginatedResponse)
async def list_shipments(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    status_filter: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Company access required")

    query = select(Shipment).where(Shipment.company_id == user.company_id, Shipment.is_active == True)
    count_query = select(func.count(Shipment.id)).where(Shipment.company_id == user.company_id, Shipment.is_active == True)

    if search:
        search_filter = Shipment.shipment_number.ilike(f"%{search}%") | Shipment.shipper_name.ilike(f"%{search}%") | Shipment.consignee_name.ilike(f"%{search}%")
        query = query.where(search_filter)
        count_query = count_query.where(search_filter)

    if status_filter:
        query = query.where(Shipment.status == status_filter)
        count_query = count_query.where(Shipment.status == status_filter)

    total = (await db.execute(count_query)).scalar()
    query = query.offset((page - 1) * per_page).limit(per_page).order_by(Shipment.created_at.desc())
    result = await db.execute(query)
    shipments = result.scalars().all()

    return PaginatedResponse(
        items=[ShipmentResponse.model_validate(s) for s in shipments],
        total=total,
        page=page,
        per_page=per_page,
        pages=(total + per_page - 1) // per_page,
    )


@router.post("", response_model=ShipmentResponse, status_code=status.HTTP_201_CREATED)
async def create_shipment(
    data: ShipmentCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Company access required")

    shipment = Shipment(
        **data.model_dump(),
        company_id=user.company_id,
        shipment_number=generate_shipment_number(),
    )
    db.add(shipment)
    await db.flush()

    tracking = ShipmentTracking(
        shipment_id=shipment.id,
        status="pending",
        notes="Shipment created",
        created_by=user.id,
    )
    db.add(tracking)

    return ShipmentResponse.model_validate(shipment)


@router.get("/{shipment_id}", response_model=ShipmentResponse)
async def get_shipment(
    shipment_id: UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Shipment).where(Shipment.id == shipment_id, Shipment.company_id == user.company_id))
    shipment = result.scalar_one_or_none()
    if not shipment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shipment not found")
    return ShipmentResponse.model_validate(shipment)


@router.put("/{shipment_id}", response_model=ShipmentResponse)
async def update_shipment(
    shipment_id: UUID,
    data: ShipmentUpdate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Shipment).where(Shipment.id == shipment_id, Shipment.company_id == user.company_id))
    shipment = result.scalar_one_or_none()
    if not shipment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shipment not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(shipment, key, value)

    if "status" in update_data:
        tracking = ShipmentTracking(
            shipment_id=shipment.id,
            status=update_data["status"],
            notes=f"Status updated to {update_data['status']}",
            created_by=user.id,
        )
        db.add(tracking)

    return ShipmentResponse.model_validate(shipment)


@router.post("/{shipment_id}/tracking", response_model=ShipmentTrackingResponse, status_code=status.HTTP_201_CREATED)
async def add_tracking_event(
    shipment_id: UUID,
    data: ShipmentTrackingCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Shipment).where(Shipment.id == shipment_id, Shipment.company_id == user.company_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shipment not found")

    tracking = ShipmentTracking(**data.model_dump(), shipment_id=shipment_id, created_by=user.id)
    db.add(tracking)
    await db.flush()
    return ShipmentTrackingResponse.model_validate(tracking)


@router.get("/{shipment_id}/tracking", response_model=list[ShipmentTrackingResponse])
async def list_tracking_events(
    shipment_id: UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(ShipmentTracking)
        .where(ShipmentTracking.shipment_id == shipment_id)
        .order_by(ShipmentTracking.event_time.desc())
    )
    return [ShipmentTrackingResponse.model_validate(t) for t in result.scalars().all()]
