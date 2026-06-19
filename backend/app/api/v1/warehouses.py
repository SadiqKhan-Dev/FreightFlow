from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional
from uuid import UUID

from app.database import get_db
from app.models.warehouse import Warehouse, WarehouseInventory, WarehouseMovement
from app.models.user import User
from app.schemas.common import PaginatedResponse
from app.api.deps import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/warehouses", tags=["Warehouses"])


class WarehouseCreate(BaseModel):
    name: str
    code: str
    address: str
    city: str
    state: str
    zip_code: str
    country: str = "US"
    capacity: Optional[float] = None
    capacity_unit: str = "sqft"
    contact_person: Optional[str] = None
    contact_phone: Optional[str] = None
    contact_email: Optional[str] = None


class WarehouseResponse(BaseModel):
    id: UUID
    company_id: UUID
    name: str
    code: str
    address: str
    city: str
    state: str
    zip_code: str
    country: str
    capacity: Optional[float]
    capacity_unit: str
    contact_person: Optional[str]
    contact_phone: Optional[str]
    contact_email: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True


class InventoryCreate(BaseModel):
    item_name: str
    sku: Optional[str] = None
    description: Optional[str] = None
    quantity: int
    unit: str = "pcs"
    weight: Optional[float] = None
    weight_unit: str = "lbs"
    location: Optional[str] = None
    reorder_level: Optional[int] = None


class InventoryResponse(BaseModel):
    id: UUID
    warehouse_id: UUID
    item_name: str
    sku: Optional[str]
    description: Optional[str]
    quantity: int
    unit: str
    weight: Optional[float]
    weight_unit: str
    location: Optional[str]
    reorder_level: Optional[int]

    class Config:
        from_attributes = True


@router.get("", response_model=PaginatedResponse)
async def list_warehouses(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Company access required")

    query = select(Warehouse).where(Warehouse.company_id == user.company_id, Warehouse.is_active == True)
    count_query = select(func.count(Warehouse.id)).where(Warehouse.company_id == user.company_id, Warehouse.is_active == True)

    if search:
        search_filter = Warehouse.name.ilike(f"%{search}%") | Warehouse.code.ilike(f"%{search}%")
        query = query.where(search_filter)
        count_query = count_query.where(search_filter)

    total = (await db.execute(count_query)).scalar()
    query = query.offset((page - 1) * per_page).limit(per_page)
    result = await db.execute(query)
    warehouses = result.scalars().all()

    return PaginatedResponse(
        items=[WarehouseResponse.model_validate(w) for w in warehouses],
        total=total, page=page, per_page=per_page,
        pages=(total + per_page - 1) // per_page,
    )


@router.post("", response_model=WarehouseResponse, status_code=status.HTTP_201_CREATED)
async def create_warehouse(
    data: WarehouseCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Company access required")

    warehouse = Warehouse(**data.model_dump(), company_id=user.company_id)
    db.add(warehouse)
    await db.flush()
    return WarehouseResponse.model_validate(warehouse)


@router.get("/{warehouse_id}", response_model=WarehouseResponse)
async def get_warehouse(
    warehouse_id: UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Warehouse).where(Warehouse.id == warehouse_id, Warehouse.company_id == user.company_id))
    warehouse = result.scalar_one_or_none()
    if not warehouse:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Warehouse not found")
    return WarehouseResponse.model_validate(warehouse)


@router.post("/{warehouse_id}/inventory", response_model=InventoryResponse, status_code=status.HTTP_201_CREATED)
async def add_inventory(
    warehouse_id: UUID,
    data: InventoryCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    item = WarehouseInventory(**data.model_dump(), warehouse_id=warehouse_id)
    db.add(item)
    await db.flush()
    return InventoryResponse.model_validate(item)


@router.get("/{warehouse_id}/inventory", response_model=list[InventoryResponse])
async def list_inventory(
    warehouse_id: UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(WarehouseInventory).where(WarehouseInventory.warehouse_id == warehouse_id)
    )
    return [InventoryResponse.model_validate(i) for i in result.scalars().all()]
