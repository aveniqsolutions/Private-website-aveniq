from pydantic import BaseModel, EmailStr, Field
from datetime import datetime, timezone
from typing import Optional
from enum import Enum

class EmailStatusEnum(str, Enum):
    PENDING = "pending"
    SENT = "sent"
    FAILED = "failed"

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_status: EmailStatusEnum = EmailStatusEnum.PENDING
    admin_email: str = "contact@aveniq-solutions.com"

class ContactMessageResponse(BaseModel):
    success: bool
    message: str
    contact_id: Optional[str] = None
