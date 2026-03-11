import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content
from app.config import settings
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    def send_email(to_email: str, subject: str, body: str) -> bool:
        """Sends an email automatically via SendGrid integration."""
        logger.info(f"Attempting to send email to {to_email} via SendGrid.")
        
        if not settings.SENDGRID_API_KEY:
            logger.warning("SENDGRID_API_KEY is not set.")
            if settings.SMTP_SERVER and settings.SMTP_USERNAME and settings.SMTP_PASSWORD:
                logger.info("Falling back to standard SMTP configuration.")
                return EmailService._send_smtp_email(to_email, subject, body)
            else:
                logger.warning("No SMTP fallback configured. Mocking email dispatch success.")
                return True
            
        try:
            sg = sendgrid.SendGridAPIClient(api_key=settings.SENDGRID_API_KEY)
            
            from_email = Email(settings.SENDER_EMAIL)
            to_email_obj = To(to_email)
            content = Content("text/plain", body)
            
            mail = Mail(from_email, to_email_obj, subject, content)
            
            response = sg.client.mail.send.post(request_body=mail.get())
            
            if response.status_code in [200, 201, 202]:
                logger.info("Email sent successfully via SendGrid.")
                return True
            else:
                logger.error(f"SendGrid returned status code: {response.status_code}")
                return False
                
        except Exception as e:
            logger.error(f"Failed to send email via SendGrid: {e}")
            return False

    @staticmethod
    def _send_smtp_email(to_email: str, subject: str, body: str) -> bool:
        """Fallback method utilizing standard SMTP."""
        try:
            msg = MIMEMultipart()
            msg['From'] = settings.SENDER_EMAIL
            msg['To'] = to_email
            msg['Subject'] = subject
            
            msg.attach(MIMEText(body, 'plain'))
            
            port = settings.SMTP_PORT or 587
            
            server = smtplib.SMTP(settings.SMTP_SERVER, port)
            server.starttls()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            text = msg.as_string()
            server.sendmail(settings.SENDER_EMAIL, to_email, text)
            server.quit()
            
            logger.info("Email sent successfully via SMTP fallback.")
            return True
        except Exception as e:
            logger.error(f"Failed to send email via SMTP: {e}")
            return False
