from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID
from datetime import datetime


class CompanyCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    country: str = "US"
    website: Optional[str] = None
    tax_id: Optional[str] = None
    dot_number: Optional[str] = None
    mc_number: Optional[str] = None


class CompanyUpdate(BaseModel):
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


class CompanyResponse(BaseModel):
    id: UUID
    name: str
    slug: str
    email: str
    phone: Optional[str]
    address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    zip_code: Optional[str]
    country: str
    logo_url: Optional[str]
    website: Optional[str]
    tax_id: Optional[str]
    dot_number: Optional[str]
    mc_number: Optional[str]
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
