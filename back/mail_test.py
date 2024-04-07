import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# me == my email address
# you == recipient's email address
me = 'motivation.of.the.day.2124@gmail.com'
you = "tuthanhhuy2004@gmail.com"
password = 'lewd ijxv aozh hvex'

# Create message container - the correct MIME type is multipart/alternative.
msg = MIMEMultipart('alternative')
msg['Subject'] = "Link"
msg['From'] = me
msg['To'] = you

# Create the body of the message (a plain-text and an HTML version).
text = "Hi!\nHow are you?\nHere is the link you wanted:\nhttp://www.python.org"
html = """\
<html>
  <head>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        i {
            color: green;
        }
        .quote-container {
            border: 2px solid black;
            border-radius: 10px;
        }
        .quote-container h2 {
            text-align: justify;
            text-align-last: center;
            padding: 0px 15px 0px 15px;
        }
        .author {
            opacity: 0.5;
        }
    </style>
  </head>
  <body>
    <div class="everything">
        <h1>Hello, <i>Thanh Huy</i>!</h1>
        <h2>Here is your quote about <i>success</i> for <i>4/6/2024</i> at <i>18:20</i>:</h2>
        <div class="quote-container">
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni pariatur natus aliquam ex repudiandae atque accusantium, voluptatum sint laborum accusamus cupiditate mollitia? Ad adipisci quas inventore earum dolorum quidem voluptate?</h2>
            <h2 class="author">- No One</h2>
        </div>
    </div>
  </body>
</html>
"""

# Record the MIME types of both parts - text/plain and text/html.
part1 = MIMEText(text, 'plain')
part2 = MIMEText(html, 'html')

# Attach parts into message container.
# According to RFC 2046, the last part of a multipart message, in this case
# the HTML message, is best and preferred.
msg.attach(part1)
msg.attach(part2)
# Send the message via local SMTP server.
mail = smtplib.SMTP('smtp.gmail.com', 587)

mail.ehlo()

mail.starttls()

mail.login(me, password)
mail.sendmail(me, you, msg.as_string())
mail.quit()