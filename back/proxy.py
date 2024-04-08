from flask import Flask, request
from database import push_user, fetch_user
from mail import send_confirmation
app = Flask(__name__)

@app.route("/adduser", methods=["POST"])
def add_user():
    try:
        if(request.method == "POST"):
            push_user(request.json)
        return "User Pushed", 200
    except:
        return "Cannot Push To Server", 500
    
@app.route("/getuser", methods=["GET"])
def get_user():
    try:
        if(request.method == "GET"):
            email = request.args.get("email")
            print(email)
            user = fetch_user(email)
            print(user)
            if(user is not None):
                return user, 200
            else:
                return "User Does Not Exist", 404
    except:
        return "Cannot Fetch From To Server", 500

@app.route("/signupuser", methods=["POST"])
def sign_up_user():
    try:
        if(request.method == "POST"):
            print("Start sending confirmation email here")
            send_confirmation(request.json["email"], request.json["id"])
            push_user(request.json)
        return "Confirmation Email Sent", 200
    except:
        return "Cannot Fetch From To Server", 500

@app.route("/verifyuser", methods=["PUT"])
def verify_user():
    try:
        if(request.method == "PUT"):
            print(request.json["id"])
        return "User Verified", 200
    except:
        return "Cannot Verify User", 500

if __name__ == "__main__":
    app.run(ssl_context="adhoc", debug=True)