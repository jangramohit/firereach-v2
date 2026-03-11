from pydantic_settings import BaseSettings
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

class Settings(BaseSettings):
    GROQ_API_KEY: str
    NEWSAPI_KEY: Optional[str] = None
    SENDGRID_API_KEY: Optional[str] = None
    SENDER_EMAIL: str = "hello@firereach.test"
    
    # SMTP Fallback
    SMTP_SERVER: Optional[str] = None
    SMTP_PORT: Optional[int] = None
    SMTP_USERNAME: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
