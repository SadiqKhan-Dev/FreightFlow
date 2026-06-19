from pydantic import BaseModel
from typing import Optional, List, Any
from uuid import UUID


class PaginationParams(BaseModel):
    page: int = 1
    per_page: int = 20
    sort_by: Optional[str] = None
    sort_order: str = "desc"
    search: Optional[str] = None


class PaginatedResponse(BaseModel):
    items: List[Any]
    total: int
    page: int
    per_page: int
    pages: int


class MessageResponse(BaseModel):
    message: str
    success: bool = True


class ErrorResponse(BaseModel):
    detail: str
    code: Optional[str] = None
