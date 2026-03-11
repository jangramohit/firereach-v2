import json
import logging
import re
from groq import Groq
from app.config import settings
from app.schemas.outreach_schema import OutreachSenderResult
from app.services.email_service import EmailService
from app.utils.prompts import EMAIL_GENERATOR_PROMPT

logger = logging.getLogger(__name__)

def tool_outreach_automated_sender(company: str, account_brief: str, signals_data_json: str, target_email: str = None) -> OutreachSenderResult:
    """
    Generates a personalized email using an LLM and sends it via SendGrid.
    """
    logger.info(f"Running outreach sender for {company}.")
    
    try:
        if isinstance(signals_data_json, dict):
             parsed_data = signals_data_json
        elif isinstance(signals_data_json, list):
             parsed_data = signals_data_json
        elif isinstance(signals_data_json, str) and signals_data_json.strip():
             try:
                 parsed_data = json.loads(signals_data_json)
             except json.JSONDecodeError:
                 parsed_data = {}
        else:
             parsed_data = {}
             
        if isinstance(parsed_data, list):
            signals = parsed_data
        elif isinstance(parsed_data, dict):
            signals = parsed_data.get("signals", [])
        else:
            signals = []
    except Exception as e:
        logger.error(f"Failed to parse signals JSON: {e}")
        signals = []
    
    # Generate generic realistic email address if none provided for testing
    safe_domain = re.sub(r'[^a-zA-Z0-9]', '', company.lower()) + ".com"
    recipient_email = target_email if target_email else f"alex.founder@{safe_domain}"

    subject = f"Growth & Infrastructure at {company}"
    body = f"Hi,\n\nI saw {company} is growing rapidly. We help startups scaling fast ensure security constraints are met.\n\nBest,\nSender"

    if settings.GROQ_API_KEY:
        try:
            client = Groq(api_key=settings.GROQ_API_KEY)
            
            prompt = EMAIL_GENERATOR_PROMPT.format(
                company=company,
                account_brief=account_brief,
                signals=json.dumps(signals)
            )
            
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                response_format={"type": "json_object"}
            )
            
            content = response.choices[0].message.content
            draft_data = json.loads(content)
            subject = draft_data.get("subject", subject)
            body = draft_data.get("body", body)
            
        except Exception as e:
             logger.error(f"Failed to generate custom email with LLM: {e}")

    # Send the email
    email_sent = EmailService.send_email(
        to_email=recipient_email,
        subject=subject,
        body=body
    )
    
    status = "sent" if email_sent else "failed"
    
    return OutreachSenderResult(
        email_status=status,
        recipient=recipient_email,
        subject=subject
    )
