import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, Text, ForeignKey, Numeric, Integer, Enum as SQLEnum, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import enum


class VehicleType(str, enum.Enum):
    TRUCK = "truck"
    VAN = "van"
    TRAILER = "trailer"
    CONTAINER = "container"
    FLATBED = "flatbed"
    TANKER = "tanker"


class VehicleStatus(str, enum.Enum):
    AVAILABLE = "available"
    IN_USE = "in_use"
    MAINTENANCE = "maintenance"
    OUT_OF_SERVICE = "out_of_service"


class FuelType(str, enum.Enum):
    DIESEL = "diesel"
    GASOLINE = "gasoline"
    ELECTRIC = "electric"
    CNG = "cng"
    LNG = "lng"


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    registration_number = Column(String(50), nullable=False, unique=True)
    vehicle_type = Column(SQLEnum(VehicleType), nullable=False)
    make = Column(String(100), nullable=True)
    model = Column(String(100), nullable=True)
    year = Column(Integer, nullable=True)
    color = Column(String(50), nullable=True)
    vin = Column(String(17), nullable=True, unique=True)
    license_plate = Column(String(20), nullable=True)
    license_plate_state = Column(String(50), nullable=True)
    license_expiry = Column(Date, nullable=True)
    fuel_type = Column(SQLEnum(FuelType), default=FuelType.DIESEL)
    capacity_weight = Column(Numeric(10, 2), nullable=True)
    capacity_volume = Column(Numeric(10, 2), nullable=True)
    capacity_unit = Column(String(20), default="lbs")
    current_mileage = Column(Integer, default=0)
    status = Column(SQLEnum(VehicleStatus), default=VehicleStatus.AVAILABLE)
    insurance_expiry = Column(Date, nullable=True)
    registration_expiry = Column(Date, nullable=True)
    last_service_date = Column(Date, nullable=True)
    next_service_date = Column(Date, nullable=True)
    next_service_mileage = Column(Integer, nullable=True)
    avatar_url = Column(String(500), nullable=True)
    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    company = relationship("Company", back_populates="vehicles")
    maintenances = relationship("VehicleMaintenance", back_populates="vehicle")
    shipments = relationship("Shipment", back_populates="vehicle")


class VehicleMaintenance(Base):
    __tablename__ = "vehicle_maintenances"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    vehicle_id = Column(UUID(as_uuid=True), ForeignKey("vehicles.id"), nullable=False, index=True)
    maintenance_type = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    cost = Column(Numeric(10, 2), nullable=True)
    mileage_at_service = Column(Integer, nullable=True)
    service_date = Column(Date, nullable=False)
    next_service_date = Column(Date, nullable=True)
    next_service_mileage = Column(Integer, nullable=True)
    provider = Column(String(255), nullable=True)
    receipt_url = Column(String(500), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    vehicle = relationship("Vehicle", back_populates="maintenances")
