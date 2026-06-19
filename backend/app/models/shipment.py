import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, Text, ForeignKey, Numeric, Integer, Enum as SQLEnum, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import enum


class ShipmentStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    ASSIGNED = "assigned"
    PICKED_UP = "picked_up"
    IN_TRANSIT = "in_transit"
    ARRIVED = "arrived"
    DELIVERED = "delivered"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class ShipmentType(str, enum.Enum):
    LTL = "ltl"
    FTL = "ftl"
    PARCEL = "parcel"
    EXPRESS = "express"
    SPECIALIZED = "specialized"


class FreightClass(str, enum.Enum):
    CLASS_50 = "50"
    CLASS_55 = "55"
    CLASS_60 = "60"
    CLASS_65 = "65"
    CLASS_70 = "70"
    CLASS_77_5 = "77.5"
    CLASS_85 = "85"
    CLASS_92_5 = "92.5"
    CLASS_100 = "100"
    CLASS_110 = "110"
    CLASS_125 = "125"
    CLASS_150 = "150"
    CLASS_175 = "175"
    CLASS_200 = "200"
    CLASS_250 = "250"
    CLASS_300 = "300"
    CLASS_400 = "400"
    CLASS_500 = "500"


class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False, index=True)
    shipment_number = Column(String(50), nullable=False, unique=True, index=True)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id"), nullable=True, index=True)
    driver_id = Column(UUID(as_uuid=True), ForeignKey("drivers.id"), nullable=True, index=True)
    vehicle_id = Column(UUID(as_uuid=True), ForeignKey("vehicles.id"), nullable=True)
    route_id = Column(UUID(as_uuid=True), ForeignKey("routes.id"), nullable=True)

    status = Column(SQLEnum(ShipmentStatus), default=ShipmentStatus.PENDING)
    shipment_type = Column(SQLEnum(ShipmentType), default=ShipmentType.FTL)
    freight_class = Column(SQLEnum(FreightClass), nullable=True)

    # Shipper info
    shipper_name = Column(String(255), nullable=False)
    shipper_address = Column(Text, nullable=False)
    shipper_city = Column(String(100), nullable=False)
    shipper_state = Column(String(100), nullable=False)
    shipper_zip = Column(String(20), nullable=False)
    shipper_country = Column(String(100), default="US")
    shipper_contact = Column(String(255), nullable=True)
    shipper_phone = Column(String(20), nullable=True)
    shipper_email = Column(String(255), nullable=True)
    pickup_datetime = Column(DateTime(timezone=True), nullable=True)

    # Consignee info
    consignee_name = Column(String(255), nullable=False)
    consignee_address = Column(Text, nullable=False)
    consignee_city = Column(String(100), nullable=False)
    consignee_state = Column(String(100), nullable=False)
    consignee_zip = Column(String(20), nullable=False)
    consignee_country = Column(String(100), default="US")
    consignee_contact = Column(String(255), nullable=True)
    consignee_phone = Column(String(20), nullable=True)
    consignee_email = Column(String(255), nullable=True)
    delivery_datetime = Column(DateTime(timezone=True), nullable=True)

    # Cargo info
    description = Column(Text, nullable=True)
    weight = Column(Numeric(10, 2), nullable=True)
    weight_unit = Column(String(10), default="lbs")
    pieces = Column(Integer, nullable=True)
    volume = Column(Numeric(10, 2), nullable=True)
    volume_unit = Column(String(10), default="cbft")
    hazmat = Column(Boolean, default=False)
    hazmat_class = Column(String(20), nullable=True)
    un_number = Column(String(20), nullable=True)
    special_instructions = Column(Text, nullable=True)

    # Pricing
    quoted_price = Column(Numeric(12, 2), nullable=True)
    final_price = Column(Numeric(12, 2), nullable=True)
    currency = Column(String(3), default="USD")
    payment_status = Column(String(20), default="pending")

    # Tracking
    estimated_distance = Column(Float, nullable=True)
    estimated_duration = Column(Float, nullable=True)
    actual_distance = Column(Float, nullable=True)
    actual_duration = Column(Float, nullable=True)
    current_lat = Column(Float, nullable=True)
    current_lng = Column(Float, nullable=True)

    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    company = relationship("Company", back_populates="shipments")
    customer = relationship("Customer", back_populates="shipments")
    driver = relationship("Driver", back_populates="shipments")
    vehicle = relationship("Vehicle", back_populates="shipments")
    route = relationship("Route", back_populates="shipments")
    tracking_events = relationship("ShipmentTracking", back_populates="shipment", order_by="ShipmentTracking.event_time.desc()")


class ShipmentTracking(Base):
    __tablename__ = "shipment_tracking"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    shipment_id = Column(UUID(as_uuid=True), ForeignKey("shipments.id"), nullable=False, index=True)
    status = Column(SQLEnum(ShipmentStatus), nullable=False)
    location = Column(String(255), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    notes = Column(Text, nullable=True)
    event_time = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)

    shipment = relationship("Shipment", back_populates="tracking_events")
