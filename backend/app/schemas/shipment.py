from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime
from app.models.shipment import ShipmentStatus, ShipmentType, FreightClass


class ShipmentCreate(BaseModel):
    customer_id: Optional[UUID] = None
    shipment_type: ShipmentType = ShipmentType.FTL
    freight_class: Optional[FreightClass] = None
    shipper_name: str
    shipper_address: str
    shipper_city: str
    shipper_state: str
    shipper_zip: str
    shipper_country: str = "US"
    shipper_contact: Optional[str] = None
    shipper_phone: Optional[str] = None
    shipper_email: Optional[str] = None
    pickup_datetime: Optional[datetime] = None
    consignee_name: str
    consignee_address: str
    consignee_city: str
    consignee_state: str
    consignee_zip: str
    consignee_country: str = "US"
    consignee_contact: Optional[str] = None
    consignee_phone: Optional[str] = None
    consignee_email: Optional[str] = None
    delivery_datetime: Optional[datetime] = None
    description: Optional[str] = None
    weight: Optional[float] = None
    weight_unit: str = "lbs"
    pieces: Optional[int] = None
    volume: Optional[float] = None
    volume_unit: str = "cbft"
    hazmat: bool = False
    hazmat_class: Optional[str] = None
    un_number: Optional[str] = None
    special_instructions: Optional[str] = None
    quoted_price: Optional[float] = None
    notes: Optional[str] = None


class ShipmentUpdate(BaseModel):
    status: Optional[ShipmentStatus] = None
    driver_id: Optional[UUID] = None
    vehicle_id: Optional[UUID] = None
    route_id: Optional[UUID] = None
    final_price: Optional[float] = None
    payment_status: Optional[str] = None
    notes: Optional[str] = None


class ShipmentResponse(BaseModel):
    id: UUID
    company_id: UUID
    shipment_number: str
    customer_id: Optional[UUID]
    driver_id: Optional[UUID]
    vehicle_id: Optional[UUID]
    route_id: Optional[UUID]
    status: ShipmentStatus
    shipment_type: ShipmentType
    freight_class: Optional[FreightClass]
    shipper_name: str
    shipper_address: str
    shipper_city: str
    shipper_state: str
    shipper_zip: str
    consignee_name: str
    consignee_address: str
    consignee_city: str
    consignee_state: str
    consignee_zip: str
    description: Optional[str]
    weight: Optional[float]
    pieces: Optional[int]
    hazmat: bool
    quoted_price: Optional[float]
    final_price: Optional[float]
    payment_status: str
    estimated_distance: Optional[float]
    current_lat: Optional[float]
    current_lng: Optional[float]
    notes: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ShipmentTrackingCreate(BaseModel):
    status: ShipmentStatus
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    notes: Optional[str] = None


class ShipmentTrackingResponse(BaseModel):
    id: UUID
    shipment_id: UUID
    status: ShipmentStatus
    location: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    notes: Optional[str]
    event_time: datetime
    created_by: Optional[UUID]

    class Config:
        from_attributes = True
