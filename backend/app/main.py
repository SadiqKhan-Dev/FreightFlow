from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from app.config import get_settings
from app.database import engine, Base
from app.api.v1 import auth, companies, drivers, vehicles, customers, shipments, invoices, warehouses, routes_api, notifications, blog, jobs, dashboard, reports, settings

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(
    title=f"{settings.APP_NAME} API",
    description="Enterprise Logistics & Freight Management Platform API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth.router, prefix="/api/v1")
app.include_router(companies.router, prefix="/api/v1")
app.include_router(dashboard.router, prefix="/api/v1")
app.include_router(drivers.router, prefix="/api/v1")
app.include_router(vehicles.router, prefix="/api/v1")
app.include_router(customers.router, prefix="/api/v1")
app.include_router(shipments.router, prefix="/api/v1")
app.include_router(invoices.router, prefix="/api/v1")
app.include_router(warehouses.router, prefix="/api/v1")
app.include_router(routes_api.router, prefix="/api/v1")
app.include_router(notifications.router, prefix="/api/v1")
app.include_router(blog.router, prefix="/api/v1")
app.include_router(jobs.router, prefix="/api/v1")
app.include_router(reports.router, prefix="/api/v1")
app.include_router(settings.router, prefix="/api/v1")


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": settings.APP_NAME}


@app.get("/api/v1/contact")
async def contact_form():
    return {"message": "Contact form endpoint"}
