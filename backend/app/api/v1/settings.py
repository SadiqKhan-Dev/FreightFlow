from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional

from app.database import get_db
from app.models.user import User
from app.models.company import Company
from app.schemas.user import UserUpdate, UserResponse
from app.schemas.company import CompanyUpdate, CompanyResponse
from app.api.deps import get_current_user

router = APIRouter(prefix="/settings", tags=["Settings"])


class CompanySettingsUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    country: Optional[str] = None
    logo_url: Optional[str] = None
    website: Optional[str] = None
    tax_id: Optional[str] = None
    dot_number: Optional[str] = None
    mc_number: Optional[str] = None


class UserSettingsUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None


@router.get("/company", response_model=CompanyResponse)
async def get_company_settings(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=404, detail="No company associated")

    result = await db.execute(select(Company).where(Company.id == user.company_id))
    company = result.scalar_one_or_none()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return CompanyResponse.model_validate(company)


@router.put("/company", response_model=CompanyResponse)
async def update_company_settings(
    data: CompanySettingsUpdate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.company_id:
        raise HTTPException(status_code=404, detail="No company associated")

    result = await db.execute(select(Company).where(Company.id == user.company_id))
    company = result.scalar_one_or_none()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(company, key, value)

    return CompanyResponse.model_validate(company)


@router.get("/profile", response_model=UserResponse)
async def get_user_profile(user: User = Depends(get_current_user)):
    return UserResponse.model_validate(user)


@router.put("/profile", response_model=UserResponse)
async def update_user_profile(
    data: UserSettingsUpdate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)

    return UserResponse.model_validate(user)
