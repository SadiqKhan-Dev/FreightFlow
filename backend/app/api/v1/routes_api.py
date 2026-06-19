from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel

from app.database import get_db
from app.models.route import Route, RouteStop
from app.models.user import User
from app.schemas.common import PaginatedResponse
from app.api.deps import get_current_user

router = APIRouter(prefix="/routes", tags=["Routes"])


class RouteStopCreate(BaseModel):
    stop_order: int
    address: str
    city: str
    state: str
    zip_code: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    stop_type: str = "pickup"
    scheduled_time: Optional[str] = None
    notes: Optional[str] = None


class RouteCreate(BaseModel):
    name: str
    origin_address: str
    origin_city: str
    origin_state: str
    origin_zip: str
    destination_address: str
    destination_city: str
    destination_state: str
    destination_zip: str
    distance: Optional[float] = None
    estimated_duration: Optional[float] = None
    fuel_cost_estimate: Optional[float] = None
    toll_cost_estimate: Optional[float] = None
    notes: Optional[str] = None
    stops: Optional[List[RouteStopCreate]] = None


class RouteResponse(BaseModel):
    id: UUID
    company_id: UUID
    name: str
    origin_address: str
    origin_city: str
    origin_state: str
    origin_zip: str
    destination_address: str
    destination_city: str
    destination_state: str
    destination_zip: str
    distance: Optional[float]
    estimated_duration: Optional[float]
    fuel_cost_estimate: Optional[float]
    toll_cost_estimate: Optional[float]
    is_active: bool
    notes: Optional[str]

    class Config:
        from_attributes = True


@router.get("", response_model=PaginatedResponse)
async def list_routes(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Company access required")

    query = select(Route).where(Route.company_id == user.company_id, Route.is_active == True)
    count_query = select(func.count(Route.id)).where(Route.company_id == user.company_id, Route.is_active == True)

    if search:
        search_filter = Route.name.ilike(f"%{search}%")
        query = query.where(search_filter)
        count_query = count_query.where(search_filter)

    total = (await db.execute(count_query)).scalar()
    query = query.offset((page - 1) * per_page).limit(per_page)
    result = await db.execute(query)
    routes = result.scalars().all()

    return PaginatedResponse(
        items=[RouteResponse.model_validate(r) for r in routes],
        total=total, page=page, per_page=per_page,
        pages=(total + per_page - 1) // per_page,
    )


@router.post("", response_model=RouteResponse, status_code=status.HTTP_201_CREATED)
async def create_route(
    data: RouteCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Company access required")

    route = Route(
        **data.model_dump(exclude={"stops"}),
        company_id=user.company_id,
    )
    db.add(route)
    await db.flush()

    if data.stops:
        for stop_data in data.stops:
            stop = RouteStop(**stop_data.model_dump(), route_id=route.id)
            db.add(stop)

    return RouteResponse.model_validate(route)


@router.get("/{route_id}", response_model=RouteResponse)
async def get_route(
    route_id: UUID,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(select(Route).where(Route.id == route_id, Route.company_id == user.company_id))
    route = result.scalar_one_or_none()
    if not route:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Route not found")
    return RouteResponse.model_validate(route)
