from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional
from uuid import UUID

from app.database import get_db
from app.models.driver import Driver
from app.models.user import User
from app.schemas.driver import DriverCreate, DriverUpdate, DriverResponse
from app.schemas.common import PaginatedResponse
from app.api.deps import get_current_user

router = APIRouter(prefix="/drivers", tags=["Drivers"])


@router.get("", response_model=PaginatedResponse)
async def list_drivers(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    status_filter: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Company access required")

    query = select(Driver).where(Driver.company_id == user.company_id)
    count_query = select(func.count(Driver.id)).where(Driver.company_id == user.company_id)

    if search:
        search_filter = Driver.first_name.ilike(f"%{search}%") | Driver.last_name.ilike(f"%{search}%") | Driver.license_number.ilike(f"%{search}%")
        query = query.where(search_filter)
        count_query = count_query.where(search_filter)

    if status_filter:
        query = query.where(Driver.status == status_filter)
        count_query = count_query.where(Driver.status == status_filter)

    total = (await db.execute(count_query)).scalar()
    query = query.offset((page - 1) * per_page).limit(per_page).order_by(Driver.created_at.desc())
    result = await db.execute(query)
    drivers = result.scalars().all()

    return PaginatedResponse(
        items=[DriverResponse.model_validate(d) for d in drivers],
        total=total,
        page=page,
        per_page=per_page,
        pages=(total + per_page - 1) // per_page,
    )


@router.post("", response_model=DriverResponse, status_code=status.HTTP_201_CREATED)
async def create_driver(
    data: DriverCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Company access required")

    driver = Driver(**data.model_dump(), company_id=user.company_id)
    db.add(driver)
    await db.flush()
    return DriverResponse.model_validate(driver)


@router.get("/{driver_id}", response_model=DriverResponse)
async def get_driver(
    driver_id: UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Driver).where(Driver.id == driver_id, Driver.company_id == user.company_id))
    driver = result.scalar_one_or_none()
    if not driver:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Driver not found")
    return DriverResponse.model_validate(driver)


@router.put("/{driver_id}", response_model=DriverResponse)
async def update_driver(
    driver_id: UUID,
    data: DriverUpdate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Driver).where(Driver.id == driver_id, Driver.company_id == user.company_id))
    driver = result.scalar_one_or_none()
    if not driver:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Driver not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(driver, key, value)

    return DriverResponse.model_validate(driver)


@router.delete("/{driver_id}")
async def delete_driver(
    driver_id: UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Driver).where(Driver.id == driver_id, Driver.company_id == user.company_id))
    driver = result.scalar_one_or_none()
    if not driver:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Driver not found")

    driver.is_active = False
    return {"message": "Driver deactivated successfully"}
