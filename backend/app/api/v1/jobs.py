from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional
from uuid import UUID
from pydantic import BaseModel

from app.database import get_db
from app.models.job import JobListing, JobApplication
from app.schemas.common import PaginatedResponse
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/careers", tags=["Careers"])


class JobListingCreate(BaseModel):
    title: str
    slug: str
    department: Optional[str] = None
    location: str
    job_type: str = "full_time"
    salary_min: Optional[str] = None
    salary_max: Optional[str] = None
    description: str
    requirements: Optional[str] = None
    benefits: Optional[str] = None


class JobListingResponse(BaseModel):
    id: UUID
    title: str
    slug: str
    department: Optional[str]
    location: str
    job_type: str
    salary_min: Optional[str]
    salary_max: Optional[str]
    description: str
    requirements: Optional[str]
    benefits: Optional[str]
    is_active: bool
    created_at: str

    class Config:
        from_attributes = True


class JobApplicationCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: Optional[str] = None
    resume_url: Optional[str] = None
    cover_letter: Optional[str] = None
    linkedin_url: Optional[str] = None


class JobApplicationResponse(BaseModel):
    id: UUID
    job_id: UUID
    first_name: str
    last_name: str
    email: str
    phone: Optional[str]
    status: str
    created_at: str

    class Config:
        from_attributes = True


@router.get("/jobs", response_model=PaginatedResponse)
async def list_jobs(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    department: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(JobListing).where(JobListing.is_active == True)
    count_query = select(func.count(JobListing.id)).where(JobListing.is_active == True)

    if search:
        search_filter = JobListing.title.ilike(f"%{search}%")
        query = query.where(search_filter)
        count_query = count_query.where(search_filter)

    if department:
        query = query.where(JobListing.department == department)
        count_query = count_query.where(JobListing.department == department)

    total = (await db.execute(count_query)).scalar()
    query = query.offset((page - 1) * per_page).limit(per_page).order_by(JobListing.created_at.desc())
    result = await db.execute(query)
    jobs = result.scalars().all()

    return PaginatedResponse(
        items=[JobListingResponse.model_validate(j) for j in jobs],
        total=total, page=page, per_page=per_page,
        pages=(total + per_page - 1) // per_page,
    )


@router.get("/jobs/{slug}", response_model=JobListingResponse)
async def get_job(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(JobListing).where(JobListing.slug == slug))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    return JobListingResponse.model_validate(job)


@router.post("/jobs/{job_id}/apply", response_model=JobApplicationResponse, status_code=status.HTTP_201_CREATED)
async def apply_for_job(
    job_id: UUID,
    data: JobApplicationCreate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(JobListing).where(JobListing.id == job_id, JobListing.is_active == True))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    application = JobApplication(**data.model_dump(), job_id=job_id)
    db.add(application)
    await db.flush()
    return JobApplicationResponse.model_validate(application)


@router.post("/jobs", response_model=JobListingResponse, status_code=status.HTTP_201_CREATED)
async def create_job(
    data: JobListingCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    job = JobListing(**data.model_dump())
    db.add(job)
    await db.flush()
    return JobListingResponse.model_validate(job)
