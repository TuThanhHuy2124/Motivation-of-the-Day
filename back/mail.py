import smtplib
from email.message import EmailMessage

with open("file.txt") as f:
    msg = EmailMessage()
    msg.set_content(f.read())

sender = 'motivation.of.the.day.2124@gmail.com' 
password = 'lewd ijxv aozh hvex'
receiver = 'thanhhuy21112004@gmail.com'

msg['Subject'] = 'The contents of file.txt'
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
