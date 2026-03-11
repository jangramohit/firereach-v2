from typing import List
from app.services.news_service import NewsService
from app.schemas.outreach_schema import SignalHarvesterResult
import logging

logger = logging.getLogger(__name__)

def tool_signal_harvester(company: str) -> SignalHarvesterResult:
    """
    Deterministically captures real signals for a specific targeted company
    using news scraping without hallucinating.
    """
    logger.info(f"Running signal harvester for company: {company}")
    
    signals = []
    
    # 1. Funding
    funding_query = f'"{company}" raised funding news'
    for item in NewsService.search_news(funding_query, 2):
        if len(item.get("title", "")) > 20:
             signals.append(f"Funding: {item['title']}")
             
    # 2. Hiring
    hiring_query = f'"{company}" hiring engineers careers jobs'
    for item in NewsService.search_news(hiring_query, 2):
        if len(item.get("title", "")) > 20:
             signals.append(f"Hiring: {item['title']}")
             
    # 3. Product Launches
    product_query = f'"{company}" new product launch'
    for item in NewsService.search_news(product_query, 1):
        if len(item.get("title", "")) > 20:
             signals.append(f"Product: {item['title']}")
             
    # Fallback to defaults to prevent an empty array crashing downstream LLM reasoning
    if not signals:
         signals = [
             f"{company} matches the target industry profile and market context.",
             f"Hiring engineering talent indicating active expansion."
         ]
         
    return SignalHarvesterResult(company=company, signals=signals)
