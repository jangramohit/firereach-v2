import json
import logging
from groq import Groq
from app.config import settings
from app.utils.prompts import RESEARCH_ANALYST_PROMPT

logger = logging.getLogger(__name__)

def tool_research_analyst(icp: str, company: str, signals_data_json: str) -> str:
    """
    Converts signals and ICP into a strategic account brief via the Groq LLM API.
    """
    logger.info(f"Running research analyst for {company}.")
    
    if not settings.GROQ_API_KEY:
        logger.warning("GROQ_API_KEY is missing. Returning a mocked account brief.")
        return f"{company} recently raised funding and is scaling their infrastructure rapidly.\n\nRapid expansion introduces critical vulnerabilities. Cybersecurity training is necessary during this growth phase."

    try:
        # The LLM sometimes hallucinates and passes a stringified list instead of a stringified dict
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
        
        client = Groq(api_key=settings.GROQ_API_KEY)
        
        prompt = RESEARCH_ANALYST_PROMPT.format(
            icp=icp,
            company=company,
            signals=json.dumps(signals)
        )
        
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )
        
        return response.choices[0].message.content.strip()
        
    except Exception as e:
        logger.error(f"Error in research analyst: {e}")
        return "Failed to generate account brief due to an error."
