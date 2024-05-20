import urllib
import smtplib
from api import get_quote_obj
from collections import namedtuple
from email.mime.text import MIMEText
from database import sync_from_firebase
from email.mime.multipart import MIMEMultipart
from logic import get_user_if_valid, rearrange_name, get_all_subscribers

# EmailPackage namedtuple
EmailPackage = namedtuple("EmailPackage", ["receiver", "subject", "text_content", "html_content"])

# Decorator
def email_decorator(func):
    """
    Manage all aspects of sending an email. Get information of receiver's email, 
    subject, text content and HTML content through the wrapped func.

    Require wrapped func to return an EmailPackage.
    """
    def wrapper(*arg, **kwargs):
        package = func(*arg, **kwargs)

        sender = 'motivation.of.the.day.2124@gmail.com' 
        password = 'hfzt dzej iqnf ibbw'

        msg = MIMEMultipart('alternative')
        msg['Subject'] = package.subject
        msg['From'] = "Pocket Motivator"
        msg['To'] = package.receiver

        part1 = MIMEText(package.text_content, 'plain')
        part2 = MIMEText(package.html_content, 'html')

        msg.attach(part1)
        msg.attach(part2)
        print("connecting")
        #creating the SMTP server object
        smtp_server = smtplib.SMTP('smtp.gmail.com',587)
        print("connected")
        #ESMTP protocol
        smtp_server.ehlo() 
        
        #TLS connection
        smtp_server.starttls()
        #calling the ehlo() again as encryption happens on calling startttls()
        smtp_server.ehlo() 

        smtp_server.login(sender, password)

        # send message
        smtp_server.sendmail(sender, package.receiver, msg.as_string())
        # print when succeed
        print('The email has been sent successfully')
        #terminating the server
        smtp_server.quit()

    return wrapper

# Functions to send emails
@email_decorator
def send_confirmation(email: str, id: str) -> EmailPackage:
    """
    Return EmailPackage contains necessary information to send out a confirmation email
    """
    print("send confirmation", email, id)
    params = {"id": id}   

    receiver = email

    subject = "Pocket Motivator - Email Verification"

    text_content = f"Hello, there"

    html_content = f"""
                    <html>
                        <head>
                            <style>
                                body {{
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                }}
                                i {{
                                    color: green;
                                }}
                                .content {{
                                    padding: 0px 10px 0px 10px;
                                    border: 2px solid black;
                                    border-radius: 10px;
                                    text-align: center;
                                }}
                                h3 {{
                                    margin: 0;
                                }}
                                button {{
                                    padding: 10px;
                                    border-radius: 10px;
                                    background-color: green;
                                    color: white;
                                }}
                            </style>
                        </head>
                        <body>
                            <div class="everything">
                                <h1>Welcome to <i>Pocket Motivator</i>!</h1>
                                <div class="content">
                                    <h2>Thank you for signing up to receive quotes from <i>Pocket Motivator</i></h2>
                                    <h2>You are only <i>ONE</i> step away from receiving motivational quotes daily</h2>
                                    <h2>Please <i>verify</i> your email address using the link below</h2>
                                    <div class="verify">
                                        <a href="https://pocket-motivator.netlify.app/confirmation?{urllib.parse.urlencode(params)}" target="_blank">
                                            <button><h3>Verify Email</h3></button>
                                        </a>
                                    </div>
                                    <h2>Please <i>ignore</i> this email if you did not sign up for this</h2>
                                </div>
                            </div>
                        </body>
                    </html>
                   """
    
    return EmailPackage(receiver, subject, text_content, html_content)

@email_decorator
def send_reset_password(email: str, id: str) -> EmailPackage:
    """
    Return EmailPackage contains necessary information to send out a reset password email
    """
    print("send reset password", email, id)
    params = {"id": id}   

    receiver = email

    subject = "Pocket Motivator - Reset Password"

    text_content = f"Hello, there"

    html_content = f"""
                    <html>
                        <head>
                            <style>
                                body {{
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                }}
                                i {{
                                    color: green;
                                }}
                                .content {{
                                    padding: 0px 10px 0px 10px;
                                    border: 2px solid black;
                                    border-radius: 10px;
                                    text-align: center;
                                }}
                                h3 {{
                                    margin: 0;
                                }}
                                button {{
                                    padding: 10px;
                                    border-radius: 10px;
                                    background-color: green;
                                    color: white;
                                }}
                            </style>
                        </head>
                        <body>
                            <div class="everything">
                                <h1>Hello from <i>Pocket Motivator</i>!</h1>
                                <div class="content">
                                    <h2>This email has been sent because you have <i>requested to change<i> your password</h2>
                                    <h2>Please <i>do not</i> share this link with anyone</h2>
                                    <div class="verify">
                                        <a href="https://pocket-motivator.netlify.app/reset-password?{urllib.parse.urlencode(params)}" target="_blank">
                                            <button><h3>Reset My Password</h3></button>
                                        </a>
                                    </div>
                                    <h2>Please simply <i>ignore</i> this email if you did not request this</h2>
                                </div>
                            </div>
                        </body>
                    </html>
                   """
    
    return EmailPackage(receiver, subject, text_content, html_content)

@email_decorator
def send_quote(simplified_user: dict) -> EmailPackage:
    """
    Return EmailPackage contains necessary information to send out a quote email
    """
    print(simplified_user)
    quote_obj = get_quote_obj(simplified_user["category"])
    
    receiver = simplified_user["email"]

    subject = f"Pocket Motivator - {simplified_user['date']} - {simplified_user['time']}"

    text_content = ""
                #    f"Hello, {simplified_user["first_name"]}\n"\
                #    f"Here is your quote about {quote_obj["category"]} for {date} at {time}:\n"\
                #    f"{quote_obj["quote"]} - {rearrange_name(quote_obj["author"])}"

    html_content = f"""
                    <html>
                    <head>
                        <style>
                            body {{
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                            }}
                            i {{
                                color: green;
                            }}
                            img {{
                                border-radius: 50%;
                                display: block;
                                margin-top: 16.185px;
                                margin-left: auto;
                                margin-right: auto;
                            }}
                            .quote-container {{
                                border: 2px solid black;
                                border-radius: 10px;
                            }}
                            .quote-container h2 {{
                                text-align: justify;
                                text-align-last: center;
                                padding: 0px 15px 0px 15px;
                            }}
                            .author {{
                                opacity: 0.5;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class="everything">
                            <h1>Hello, <i>{simplified_user["first_name"]}</i>!</h1>
                            <h2>Here is your quote about <i>{quote_obj["category"]}</i> for <i>{simplified_user["date"]}</i> at <i>{simplified_user["time"]}</i>:</h2>
                            <div class="quote-container">
                                <img src="{quote_obj["i"]}" alt="author's image"></img>
                                <h2>{quote_obj["q"]}</h2>
                                <h2 class="author">- {rearrange_name(quote_obj["a"])}</h2>
                            </div>
                        </div>
                    </body>
                    </html>
                   """
    
    return EmailPackage(receiver, subject, text_content, html_content)

def scan_and_send_mail() -> None:
    for email_name, user in get_all_subscribers().items():
        simplified_user = get_user_if_valid(user)
        print(simplified_user)
        if(simplified_user is not None):
            send_quote(simplified_user)

if __name__ == "__main__":
    print("mail.py is running")
    sync_from_firebase()
    scan_and_send_mail()
    print("mail.py stopped")