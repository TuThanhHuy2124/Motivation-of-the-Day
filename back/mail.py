import smtplib
from email.message import EmailMessage

def send_email(receiver_email):
    
    msg = EmailMessage()
    msg.set_content(content)

    sender = 'motivation.of.the.day.2124@gmail.com' 
    password = 'lewd ijxv aozh hvex'
    receiver = receiver_email

    msg['Subject'] = f'The contents of {file_name}'
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