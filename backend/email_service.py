import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from typing import Tuple
import os

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_server = os.environ.get('SMTP_SERVER')
        self.smtp_port = int(os.environ.get('SMTP_PORT', 587))
        self.smtp_sender = os.environ.get('SMTP_SENDER')
        self.smtp_password = os.environ.get('SMTP_PASSWORD')
    
    def send_contact_notification(self, 
                                  recipient_name: str,
                                  recipient_email: str,
                                  subject: str,
                                  message: str) -> Tuple[bool, str]:
        """
        Send email notification to admin account via Office 365 SMTP
        
        Args:
            recipient_name: Name of the person submitting the form
            recipient_email: Email address of the person submitting the form
            subject: Contact form subject line
            message: Contact form message body
            
        Returns:
            Tuple of (success: bool, message: str)
        """
        try:
            # Construct email body
            email_body = f"""
New Contact Form Submission - Aveniq Solutions

Name: {recipient_name}
Email: {recipient_email}
Subject: {subject}

Message:
{message}

---
This is an automated message from your Aveniq Solutions contact form.
            """
            
            # Create MIME message
            msg = MIMEMultipart()
            msg["From"] = self.smtp_sender
            msg["To"] = self.smtp_sender
            msg["Subject"] = f"New Contact: {subject}"
            msg.attach(MIMEText(email_body, "plain"))
            
            # Connect to Office 365 SMTP server and send
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_sender, self.smtp_password)
                server.sendmail(self.smtp_sender,
                              self.smtp_sender,
                              msg.as_string())
            
            logger.info(f"Email sent successfully for contact from {recipient_email}")
            return True, "Email notification sent to admin"
            
        except smtplib.SMTPAuthenticationError as e:
            logger.error(f"SMTP Authentication failed: {str(e)}")
            return False, "Authentication failed. Check SMTP credentials."
        except smtplib.SMTPException as e:
            logger.error(f"SMTP error occurred: {str(e)}")
            return False, f"Error sending email: {str(e)}"
        except Exception as e:
            logger.error(f"Unexpected error sending email: {str(e)}")
            return False, f"Unexpected error: {str(e)}"
