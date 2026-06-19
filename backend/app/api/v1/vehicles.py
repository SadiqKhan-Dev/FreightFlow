from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional
from uuid import UUID

from app.database import get_db
from app.models.vehicle import Vehicle, VehicleMaintenance
from app.models.user import User
from app.schemas.vehicle import (
    VehicleCreate, VehicleUpdate, VehicleResponse,
    VehicleMaintenanceCreate, VehicleMaintenanceResponse,
)
from app.schemas.common import PaginatedResponse
from app.api.deps import get_current_user

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])


@router.get("", response_model=PaginatedResponse)
async def list_vehicles(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    vehicle_type: Optional[str] = None,
    status_filter: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Company access required")

    query = select(Vehicle).where(Vehicle.company_id == user.company_id)
    count_query = select(func.count(Vehicle.id)).where(Vehicle.company_id == user.company_id)

    if search:
        search_filter = Vehicle.name.ilike(f"%{search}%") | Vehicle.registration_number.ilike(f"%{search}%")
        query = query.where(search_filter)
        count_query = count_query.where(search_filter)

    if vehicle_type:
        query = query.where(Vehicle.vehicle_type == vehicle_type)
        count_query = count_query.where(Vehicle.vehicle_type == vehicle_type)

    if status_filter:
        query = query.where(Vehicle.status == status_filter)
        count_query = count_query.where(Vehicle.status == status_filter)

    total = (await db.execute(count_query)).scalar()
    query = query.offset((page - 1) * per_page).limit(per_page).order_by(Vehicle.created_at.desc())
    result = await db.execute(query)
    vehicles = result.scalars().all()

    return PaginatedResponse(
        items=[VehicleResponse.model_validate(v) for v in vehicles],
        total=total,
        page=page,
        per_page=per_page,
        pages=(total + per_page - 1) // per_page,
    )


@router.post("", response_model=VehicleResponse, status_code=status.HTTP_201_CREATED)
async def create_vehicle(
    data: VehicleCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Company access required")

    existing = await db.execute(select(Vehicle).where(Vehicle.registration_number == data.registration_number))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Registration number already exists")

    vehicle = Vehicle(**data.model_dump(), company_id=user.company_id)
    db.add(vehicle)
    await db.flush()
    return VehicleResponse.model_validate(vehicle)


@router.get("/{vehicle_id}", response_model=VehicleResponse)
async def get_vehicle(
    vehicle_id: UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Vehicle).where(Vehicle.id == vehicle_id, Vehicle.company_id == user.company_id))
    vehicle = result.scalar_one_or_none()
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found")
    return VehicleResponse.model_validate(vehicle)


@router.put("/{vehicle_id}", response_model=VehicleResponse)
async def update_vehicle(
    vehicle_id: UUID,
    data: VehicleUpdate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Vehicle).where(Vehicle.id == vehicle_id, Vehicle.company_id == user.company_id))
    vehicle = result.scalar_one_or_none()
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(vehicle, key, value)

    return VehicleResponse.model_validate(vehicle)


@router.delete("/{vehicle_id}")
async def delete_vehicle(
    vehicle_id: UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Vehicle).where(Vehicle.id == vehicle_id, Vehicle.company_id == user.company_id))
    vehicle = result.scalar_one_or_none()
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found")

    vehicle.is_active = False
    return {"message": "Vehicle deactivated successfully"}


@router.post("/{vehicle_id}/maintenance", response_model=VehicleMaintenanceResponse, status_code=status.HTTP_201_CREATED)
async def add_maintenance(
    vehicle_id: UUID,
    data: VehicleMaintenanceCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Vehicle).where(Vehicle.id == vehicle_id, Vehicle.company_id == user.company_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found")

    maintenance = VehicleMaintenance(**data.model_dump(), vehicle_id=vehicle_id)
    db.add(maintenance)
    await db.flush()
    return VehicleMaintenanceResponse.model_validate(maintenance)


@router.get("/{vehicle_id}/maintenance", response_model=list[VehicleMaintenanceResponse])
async def list_maintenance(
    vehicle_id: UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(VehicleMaintenance)
        .where(VehicleMaintenance.vehicle_id == vehicle_id)
        .order_by(VehicleMaintenance.service_date.desc())
    )
    return [VehicleMaintenanceResponse.model_validate(m) for m in result.scalars().all()]
