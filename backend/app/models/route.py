import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, Text, ForeignKey, Numeric, Integer, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base


class Route(Base):
    __tablename__ = "routes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    origin_address = Column(Text, nullable=False)
    origin_city = Column(String(100), nullable=False)
    origin_state = Column(String(100), nullable=False)
    origin_zip = Column(String(20), nullable=False)
    destination_address = Column(Text, nullable=False)
    destination_city = Column(String(100), nullable=False)
    destination_state = Column(String(100), nullable=False)
    destination_zip = Column(String(20), nullable=False)
    distance = Column(Float, nullable=True)
    distance_unit = Column(String(10), default="mi")
    estimated_duration = Column(Float, nullable=True)
    estimated_duration_unit = Column(String(10), default="hrs")
    fuel_cost_estimate = Column(Numeric(10, 2), nullable=True)
    toll_cost_estimate = Column(Numeric(10, 2), nullable=True)
    is_active = Column(Boolean, default=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    stops = relationship("RouteStop", back_populates="route", order_by="RouteStop.stop_order")
    shipments = relationship("Shipment", back_populates="route")


class RouteStop(Base):
    __tablename__ = "route_stops"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    route_id = Column(UUID(as_uuid=True), ForeignKey("routes.id"), nullable=False, index=True)
    stop_order = Column(Integer, nullable=False)
    address = Column(Text, nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    zip_code = Column(String(20), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    stop_type = Column(String(50), default="pickup")
    scheduled_time = Column(DateTime(timezone=True), nullable=True)
    actual_time = Column(DateTime(timezone=True), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    route = relationship("Route", back_populates="stops")
