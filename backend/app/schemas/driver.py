from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID
from datetime import datetime, date
from app.models.driver import DriverStatus


class DriverCreate(BaseModel):
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    phone: str
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    date_of_birth: Optional[date] = None
    license_number: str
    license_state: str
    license_expiry: date
    license_class: Optional[str] = None
    cdl_expiry: Optional[date] = None
    medical_card_expiry: Optional[date] = None
    hazmat_endorsement: bool = False
    tanker_endorsement: bool = False
    experience_years: Optional[str] = None
    notes: Optional[str] = None


class DriverUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    license_number: Optional[str] = None
    license_state: Optional[str] = None
    license_expiry: Optional[date] = None
    license_class: Optional[str] = None
    cdl_expiry: Optional[date] = None
    medical_card_expiry: Optional[date] = None
    hazmat_endorsement: Optional[bool] = None
    tanker_endorsement: Optional[bool] = None
    experience_years: Optional[str] = None
    status: Optional[DriverStatus] = None
    notes: Optional[str] = None
    avatar_url: Optional[str] = None


class DriverResponse(BaseModel):
    id: UUID
    company_id: UUID
    user_id: Optional[UUID]
    first_name: str
    last_name: str
    email: str
    phone: str
    address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    zip_code: Optional[str]
    date_of_birth: Optional[date]
    license_number: str
    license_state: str
    license_expiry: date
    license_class: Optional[str]
    cdl_expiry: Optional[date]
    medical_card_expiry: Optional[date]
    hazmat_endorsement: bool
    tanker_endorsement: bool
    experience_years: Optional[str]
    status: DriverStatus
    avatar_url: Optional[str]
    notes: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
