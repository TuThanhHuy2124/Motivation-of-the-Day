import smtplib
import time
from collections import namedtuple
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime
from logic import get_simplified_user, rearrange_name, get_users_from_file
from api import get_quote_obj

EmailPackage = namedtuple("EmailPackage", ["receiver", "text_content", "html_content"])

def email_decorator(func) -> None:
    def inner(*arg, **kwargs):
        package = func(*arg, **kwargs)

        sender = 'motivation.of.the.day.2124@gmail.com' 
        password = 'lewd ijxv aozh hvex'

        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Quote Of The Day'
        msg['From'] = "Motivation Of The Day"
        msg['To'] = package.receiver

        part1 = MIMEText(package.text_content, 'plain')
        part2 = MIMEText(package.html_content, 'html')

        msg.attach(part1)
        msg.attach(part2)

        #creating the SMTP server object
        smtp_server = smtplib.SMTP("smtp.gmail.com", 587)
        smtp_server.ehlo() #ESMTP protocol

        smtp_server.starttls() #TLS connection
        smtp_server.ehlo() #calling the ehlo() again as encryption happens on calling startttls()

        smtp_server.login(sender, password)

        # send message
        smtp_server.sendmail(sender, package.receiver, msg.as_string())
        # print when succeed
        print('The email has been sent successfully')

        #terminating the server
        smtp_server.quit()

    return inner

@email_decorator
def send_confirmation(email, id):
    receiver = email

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
                                <h1>Welcome to <i>Quote Of The Day</i>!</h1>
                                <div class="content">
                                    <h2>Thank you for signing up to receive quotes from <i>Motivation Of The Day</i></h2>
                                    <h2>You are only <i>ONE</i> step away from receiving motivational quotes daily</h2>
                                    <h2>Please <i>verify</i> your email address using the link below</h2>
                                    <div class="verify">
                                        <a href="localhost:5173/confirm/{id}" target="_blank">
                                            <button><h3>Verify Email</h3></button>
                                        </a>
                                    </div>
                                    <h2>Please <i>ignore</i> this email if you did not sign up for this</h2>
                                </div>
                            </div>
                        </body>
                    </html>
                   """
    
    return EmailPackage(receiver, text_content, html_content)

@email_decorator
def send_email(simplified_user):
    quote_obj = get_quote_obj(simplified_user["category"])
    print(quote_obj, quote_obj["category"])

    receiver = simplified_user["email"]

    text_content = f"Hello, {simplified_user["first_name"]}\n"\
                   f"Here is your quote about {quote_obj["category"]} for {datetime.now().strftime("%m/%d/%Y")} at {datetime.now().strftime("%H:%M")}:\n"\
                   f"{quote_obj["quote"]} - {rearrange_name(quote_obj["author"])}"

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
                            <h2>Here is your quote about <i>{quote_obj["category"]}</i> for <i>{datetime.now().strftime("%m/%d/%Y")}</i> at <i>{datetime.now().strftime("%H:%M")}</i>:</h2>
                            <div class="quote-container">
                                <h2>{quote_obj["quote"]}</h2>
                                <h2 class="author">- {rearrange_name(quote_obj["author"])}</h2>
                            </div>
                        </div>
                    </body>
                    </html>
                   """
    
    return EmailPackage(receiver, text_content, html_content)

def run():
    for user in get_users_from_file():
        simplified_user = get_simplified_user(user)
        if(simplified_user is not None):
            send_email(simplified_user)

if __name__ == "__main__":
    print("mail.py is running")
    while True:
        run()
        time.sleep(60)