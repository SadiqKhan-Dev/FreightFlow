from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime, date
from app.models.vehicle import VehicleType, VehicleStatus, FuelType


class VehicleCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    registration_number: str
    vehicle_type: VehicleType
    make: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    color: Optional[str] = None
    vin: Optional[str] = None
    license_plate: Optional[str] = None
    license_plate_state: Optional[str] = None
    license_expiry: Optional[date] = None
    fuel_type: FuelType = FuelType.DIESEL
    capacity_weight: Optional[float] = None
    capacity_volume: Optional[float] = None
    capacity_unit: str = "lbs"
    insurance_expiry: Optional[date] = None
    registration_expiry: Optional[date] = None
    notes: Optional[str] = None


class VehicleUpdate(BaseModel):
    name: Optional[str] = None
    vehicle_type: Optional[VehicleType] = None
    make: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    color: Optional[str] = None
    license_plate: Optional[str] = None
    license_plate_state: Optional[str] = None
    license_expiry: Optional[date] = None
    fuel_type: Optional[FuelType] = None
    capacity_weight: Optional[float] = None
    capacity_volume: Optional[float] = None
    status: Optional[VehicleStatus] = None
    insurance_expiry: Optional[date] = None
    registration_expiry: Optional[date] = None
    last_service_date: Optional[date] = None
    next_service_date: Optional[date] = None
    notes: Optional[str] = None
    avatar_url: Optional[str] = None


class VehicleResponse(BaseModel):
    id: UUID
    company_id: UUID
    name: str
    registration_number: str
    vehicle_type: VehicleType
    make: Optional[str]
    model: Optional[str]
    year: Optional[int]
    color: Optional[str]
    vin: Optional[str]
    license_plate: Optional[str]
    license_plate_state: Optional[str]
    license_expiry: Optional[date]
    fuel_type: FuelType
    capacity_weight: Optional[float]
    capacity_volume: Optional[float]
    capacity_unit: str
    current_mileage: int
    status: VehicleStatus
    insurance_expiry: Optional[date]
    registration_expiry: Optional[date]
    last_service_date: Optional[date]
    next_service_date: Optional[date]
    avatar_url: Optional[str]
    notes: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class VehicleMaintenanceCreate(BaseModel):
    maintenance_type: str
    description: str
    cost: Optional[float] = None
    mileage_at_service: Optional[int] = None
    service_date: date
    next_service_date: Optional[date] = None
    next_service_mileage: Optional[int] = None
    provider: Optional[str] = None
    notes: Optional[str] = None


class VehicleMaintenanceResponse(BaseModel):
    id: UUID
    vehicle_id: UUID
    maintenance_type: str
    description: str
    cost: Optional[float]
    mileage_at_service: Optional[int]
    service_date: date
    next_service_date: Optional[date]
    next_service_mileage: Optional[int]
    provider: Optional[str]
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
