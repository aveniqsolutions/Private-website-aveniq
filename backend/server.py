from fastapi import FastAPI, APIRouter, BackgroundTasks, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime, timezone
from models import ContactMessage, ContactMessageResponse
from email_service import EmailService


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

def send_email_background(contact_data: dict):
    """Background task to send email without blocking response"""
    email_service = EmailService()
    success, message = email_service.send_contact_notification(
        recipient_name=contact_data["name"],
        recipient_email=contact_data["email"],
        subject=contact_data["subject"],
        message=contact_data["message"]
    )
    
    # Log the result for debugging
    if not success:
        logger.error(f"Failed to send email: {message}")
    else:
        logger.info(f"Email sent successfully for contact from {contact_data['email']}")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact", response_model=ContactMessageResponse)
async def submit_contact_form(
    contact: ContactMessage,
    background_tasks: BackgroundTasks
) -> ContactMessageResponse:
    """
    Accept contact form submission, store in MongoDB, and send admin notification
    """
    try:
        # Prepare document for MongoDB
        contact_dict = contact.model_dump()
        contact_dict["created_at"] = datetime.now(timezone.utc)
        contact_dict["email_status"] = "pending"
        
        # Insert into MongoDB
        result = await db.contacts.insert_one(contact_dict)
        inserted_id = str(result.inserted_id)
        
        # Add background task to send email
        background_tasks.add_task(
            send_email_background,
            contact_dict
        )
        
        return ContactMessageResponse(
            success=True,
            message="Contact form submitted successfully! We'll get back to you soon.",
            contact_id=inserted_id
        )
        
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing contact form: {str(e)}"
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
