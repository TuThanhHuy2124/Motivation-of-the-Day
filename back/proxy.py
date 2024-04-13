from flask import Flask, request, abort, Response
from database import push_user, fetch_user, user_exists, confirm_user, user_confirmed, get_user_id, update_day_times, InformationMismatched
from mail import send_confirmation
import json
app = Flask(__name__)

class UserAlreadyExists(Exception):
    def __init__(self, message):
        self.message = message

    def __str__(self):
        return self.message

@app.route("/updatedaytimes", methods=["PUT"])
def add_user():
    try:
        if(request.method == "PUT"):
            update_day_times(**request.json)
            print("Done")
            return "User Pushed", 200
    except Exception as e:
        print(e)
        return "Cannot Push To Server", 500
    
@app.route("/getuser", methods=["GET"])
def get_user():
    try:
        if(request.method == "GET"):
            email = request.args.get("email")
            id = request.args.get("id")
            print(email, id)
            return fetch_user(email, id)
    except InformationMismatched as e:
        print(e)
        abort(404)

@app.route("/signupuser", methods=["POST"])
def sign_up_user():
    try:
        if(request.method == "POST"):
            print(request.json)
            if(not user_exists(request.json["email"])):
                send_confirmation(request.json["email"], request.json["id"])
                push_user(request.json)
            else:
                print("raised")
                raise UserAlreadyExists("User already exists in database")
        return "Confirmation Email Sent", 200
    except UserAlreadyExists as e:
        print(e)
        return str(e), 404

@app.route("/verifyuser", methods=["PUT"])
def verify_user():
    try:
        if(request.method == "PUT"):
            print(request.json["id"], request.json["email"])
            if(not user_confirmed(request.json["email"])):
                confirm_user(request.json["email"], request.json["id"])
                print("Verify user successfully")
        return "User Verified", 200
    except:
        return "Cannot Verify User", 500
    
@app.route("/authenticateuser", methods=["GET"])
def authenticate_user():
    """When Import send an authentication request, if user exists and all the information matches, return user's email address, first name, and last name so they can use /getuser"""
    try:
        if(request.method == "GET"):
            email = request.args.get("email")
            first_name = request.args.get("first_name")
            last_name = request.args.get("last_name")
            print(email, first_name, last_name)
            response = {
                "email": email,
                "id": get_user_id(email, first_name, last_name)
            }
            return json.dumps(response), 200
    except InformationMismatched as e:
        print(e)
        abort(404)

if __name__ == "__main__":
    app.run(ssl_context="adhoc", debug=True)