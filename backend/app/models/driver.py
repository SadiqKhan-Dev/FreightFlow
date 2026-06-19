import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, Text, ForeignKey, Date, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import enum


class DriverStatus(str, enum.Enum):
    AVAILABLE = "available"
    ON_TRIP = "on_trip"
    OFF_DUTY = "off_duty"
    ON_LEAVE = "on_leave"
    SUSPENDED = "suspended"


class Driver(Base):
    __tablename__ = "drivers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True, unique=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    address = Column(Text, nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    zip_code = Column(String(20), nullable=True)
    date_of_birth = Column(Date, nullable=True)
    license_number = Column(String(100), nullable=False)
    license_state = Column(String(50), nullable=False)
    license_expiry = Column(Date, nullable=False)
    license_class = Column(String(20), nullable=True)
    cdl_expiry = Column(Date, nullable=True)
    medical_card_expiry = Column(Date, nullable=True)
    hazmat_endorsement = Column(Boolean, default=False)
    tanker_endorsement = Column(Boolean, default=False)
    experience_years = Column(String(10), nullable=True)
    status = Column(SQLEnum(DriverStatus), default=DriverStatus.AVAILABLE)
    avatar_url = Column(String(500), nullable=True)
    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    company = relationship("Company", back_populates="drivers")
    user = relationship("User", back_populates="driver_profile")
    shipments = relationship("Shipment", back_populates="driver")
