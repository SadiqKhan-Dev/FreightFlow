from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional
from uuid import UUID
from pydantic import BaseModel

from app.database import get_db
from app.models.blog import BlogPost, BlogCategory
from app.schemas.common import PaginatedResponse
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/blog", tags=["Blog"])


class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: str
    cover_image: Optional[str] = None
    category_id: Optional[UUID] = None
    tags: Optional[str] = None
    is_published: bool = False


class BlogPostResponse(BaseModel):
    id: UUID
    title: str
    slug: str
    excerpt: Optional[str]
    content: str
    cover_image: Optional[str]
    category_id: Optional[UUID]
    tags: Optional[str]
    is_published: bool
    view_count: str
    created_at: str

    class Config:
        from_attributes = True


class BlogCategoryCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None


class BlogCategoryResponse(BaseModel):
    id: UUID
    name: str
    slug: str
    description: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True


@router.get("/posts", response_model=PaginatedResponse)
async def list_posts(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    category_id: Optional[UUID] = None,
    published_only: bool = True,
    db: AsyncSession = Depends(get_db),
):
    query = select(BlogPost)
    count_query = select(func.count(BlogPost.id))

    if published_only:
        query = query.where(BlogPost.is_published == True)
        count_query = count_query.where(BlogPost.is_published == True)

    if search:
        search_filter = BlogPost.title.ilike(f"%{search}%")
        query = query.where(search_filter)
        count_query = count_query.where(search_filter)

    if category_id:
        query = query.where(BlogPost.category_id == category_id)
        count_query = count_query.where(BlogPost.category_id == category_id)

    total = (await db.execute(count_query)).scalar()
    query = query.offset((page - 1) * per_page).limit(per_page).order_by(BlogPost.created_at.desc())
    result = await db.execute(query)
    posts = result.scalars().all()

    return PaginatedResponse(
        items=[BlogPostResponse.model_validate(p) for p in posts],
        total=total, page=page, per_page=per_page,
        pages=(total + per_page - 1) // per_page,
    )


@router.get("/posts/{slug}", response_model=BlogPostResponse)
async def get_post(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BlogPost).where(BlogPost.slug == slug))
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return BlogPostResponse.model_validate(post)


@router.post("/posts", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(
    data: BlogPostCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    post = BlogPost(**data.model_dump(), author_id=user.id)
    db.add(post)
    await db.flush()
    return BlogPostResponse.model_validate(post)


@router.get("/categories", response_model=list[BlogCategoryResponse])
async def list_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BlogCategory).where(BlogCategory.is_active == True))
    return [BlogCategoryResponse.model_validate(c) for c in result.scalars().all()]


@router.post("/categories", response_model=BlogCategoryResponse, status_code=status.HTTP_201_CREATED)
async def create_category(
    data: BlogCategoryCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    category = BlogCategory(**data.model_dump())
    db.add(category)
    await db.flush()
    return BlogCategoryResponse.model_validate(category)
