from flask import Flask, request, abort, Response
from database import push_user, fetch_user, user_exists, confirm_user
from mail import send_confirmation
app = Flask(__name__)

class UserAlreadyExists(Exception):
    def __init__(self, message):
        self.message = message

@app.route("/adduser", methods=["POST"])
def add_user():
    try:
        if(request.method == "POST"):
            push_user(request.json)
            print("Add user successfully")
        return "User Pushed", 200
    except:
        return "Cannot Push To Server", 500
    
@app.route("/getuser", methods=["GET"])
def get_user():
    try:
        if(request.method == "GET"):
            email = request.args.get("email")
            user = fetch_user(email)
            if(user is not None):
                return user, 200
                print("Get user successfully")
            else:
                return "User Does Not Exist", 404
    except:
        return "Cannot Fetch From To Server", 500

@app.route("/signupuser", methods=["POST"])
def sign_up_user():
    try:
        if(request.method == "POST"):
            print(request.json)
            if(not user_exists(request.json["email"])):
                send_confirmation(request.json["email"], request.json["id"])
                push_user(request.json)
            else:
                raise UserAlreadyExists("User already exists in database")
            print("Sign up user successfully")
        return "Confirmation Email Sent", 200
    except Exception as e:
        print(e)
        abort(404)

@app.route("/verifyuser", methods=["PUT"])
def verify_user():
    try:
        if(request.method == "PUT"):
            print(request.json["id"], request.json["email"])
            confirm_user(request.json["email"], request.json["id"])
            print("Verify user successfully")
        return "User Verified", 200
    except:
        return "Cannot Verify User", 500
    
@app.route("/authenticateuser", methods=["GET"])
def authenticate_user():
    #Request email with first and last name
    pass

if __name__ == "__main__":
    app.run(ssl_context="adhoc", debug=True)