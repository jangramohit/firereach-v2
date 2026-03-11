import requests
import xml.etree.ElementTree as ET
import re
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
}

class NewsService:
    @staticmethod
    def clean_text(text: str) -> str:
        if not text:
            return ""
        v = re.sub(r'\s+', ' ', text)
        v = v.replace('&amp;', '&').replace('&quot;', '"')
        return v.strip()

    @staticmethod
    def search_news(query: str, max_results: int = 5) -> List[Dict[str, str]]:
        """Searches Google News via RSS to act as a free NewsAPI replacement."""
        logger.info(f"Querying News for: '{query}'")
        results = []
        try:
            url = f"https://news.google.com/rss/search?q={query}&hl=en-US&gl=US&ceid=US:en"
            response = requests.get(url, headers=HEADERS, timeout=10)
            response.raise_for_status()
            
            root = ET.fromstring(response.content)
            items = root.findall('./channel/item')
            for item in items[:max_results]:
                title = item.find('title')
                link = item.find('link')
                if title is not None and link is not None:
                    results.append({
                        "title": NewsService.clean_text(title.text),
                        "url": link.text,
                    })
        except Exception as e:
            logger.error(f"Failed to fetch news for '{query}': {e}")
            
        return results
