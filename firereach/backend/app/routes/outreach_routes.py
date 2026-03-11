from fastapi import APIRouter, HTTPException
from app.schemas.outreach_schema import OutreachRequest, OutreachResponse
from app.services.company_discovery import CompanyDiscoveryService
from app.agents.outreach_agent import OutreachAgent
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/run-outreach", response_model=OutreachResponse)
def run_outreach_sequence(request: OutreachRequest):
    """
    Main endpoint triggering the FireReach Batch Engine Pipeline.
    Directly processes the explicit target company provided by the user.
    """
    logger.info(f"Incoming outreach request for ICP: {request.icp}, Target: {request.target_company}")
    response = OutreachResponse()
    
    try:
        # Phase 1: Sequential Agent Processing
        logger.info("-- Phase 1: Initiating Sequential Agent Workflows --")
        logger.info(f"Processing target: {request.target_company}")
        
        processed_data = OutreachAgent.process_company(
             company=request.target_company,
             icp=request.icp,
             target_email=request.target_email
        )
        response.companies_processed.append(processed_data)
             
    except Exception as e:
        logger.error(f"Outreach sequence failed: {e}")
        response.status = "error"
        response.errors.append(str(e))
        
    return response
