from pydantic import BaseModel, Field
from typing import List, Optional

# API Input
class OutreachRequest(BaseModel):
    icp: str = Field(..., description="Ideal Customer Profile. E.g., 'Series B startups hiring engineers'")
    target_company: str = Field(..., description="The name of the company to target. E.g., 'SecureStack'")
    target_email: Optional[str] = Field(None, description="Optional email to send the outreach to during testing.")

# Agent State & Output
class ProcessedCompany(BaseModel):
    company: str
    signals: List[str] = []
    research_brief: Optional[str] = None
    email_status: str = "pending"

class OutreachResponse(BaseModel):
    status: str = "completed"
    companies_processed: List[ProcessedCompany] = []
    errors: List[str] = []

# Tool Internal schemas
class SignalHarvesterResult(BaseModel):
    company: str
    signals: List[str]

class OutreachSenderResult(BaseModel):
    email_status: str
    recipient: str
    subject: str
