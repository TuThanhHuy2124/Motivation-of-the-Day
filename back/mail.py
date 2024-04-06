import smtplib
import time
from email.message import EmailMessage
from logic import get_simplified_user, rearrange_name
from api import get_quote_obj

def send_email(receiver_email, simplified_user):
    [quote_obj] = get_quote_obj(simplified_user["category"])
    print(quote_obj)
    content = f"Hello, {simplified_user["first_name"]}\n"\
              f"This is your quote of the day:\n"\
              f"{quote_obj["quote"]} - {rearrange_name(quote_obj["author"])}"

    msg = EmailMessage()
    msg.set_content(content)

    sender = 'motivation.of.the.day.2124@gmail.com' 
    password = 'lewd ijxv aozh hvex'
    receiver = receiver_email

    msg['Subject'] = f'Quote Of The Day'
    msg['From'] = "Motivation Of The Day"
    msg['To'] = receiver

    #creating the SMTP server object
    smtp_server = smtplib.SMTP("smtp.gmail.com", 587)
    smtp_server.ehlo() #ESMTP protocol

    smtp_server.starttls() #TLS connection
    smtp_server.ehlo() #calling the ehlo() again as encryption happens on calling startttls()

    smtp_server.login(sender, password)

    # send message
    smtp_server.send_message(msg, sender, receiver)
    # print when succeed
    print('The email has been sent successfully')

    #terminating the server
    smtp_server.quit()

def run():
    simplified_user = get_simplified_user()
    if(simplified_user is not None):
        send_email("thanhhuy21112004@gmail.com", simplified_user)

if __name__ == "__main__":
    while True:
        run()
        time.sleep(60)