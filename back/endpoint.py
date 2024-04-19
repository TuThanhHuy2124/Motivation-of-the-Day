import json
import time
from mail import send_confirmation
from flask import Flask, request, abort, Response
from database import push_user, fetch_user, user_exists, confirm_user, user_confirmed, get_user_id, update_user_day_times, InformationMismatched, UserDoesNotExist

app = Flask(__name__)
    
@app.route("/signupuser", methods=["POST"])
def sign_up_user():
    """
    Provide an endpoint for frontend to sign a user up.
    """
    if(request.method == "POST"):
        print(request.json)
        if(not user_exists(request.json["email"])):
            push_user(request.json, id=request.json["id"])
            send_confirmation(request.json["email"], request.json["id"])
            return json.dumps({"response": "Confirmation email sent"}), 200
        else:
            error = "User already exists"
            print(error)
            return json.dumps({"response": error}), 404
    
@app.route("/verifyuser", methods=["PUT"])
def verify_user():
    """
    Only verify a user once.
    Provide an endpoint for frontend to verify a user when they confirm their email.
    """
    time.sleep(2)
    try:
        if(request.method == "PUT"):
            print(request.json["id"])
            if(not user_confirmed(request.json["id"])):
                success_msg = "Verify user successfully"
                confirm_user(id=request.json["id"])
                print(success_msg)
                return json.dumps({"response": success_msg}), 200
            else:
                return json.dumps({"response": "User already verified email"}), 404
            
    except UserDoesNotExist as e:
        print(e)
        return json.dumps({"response": str(e)}), 404  
     
@app.route("/authenticateuser", methods=["GET"])
def authenticate_user():
    """
    Provide an endpoint for frontend to authenticate a user by responding with the 
    user's ID if the request email and password all match.
    """
    try:
        if(request.method == "GET"):
            email = request.args.get("email")
            password = request.args.get("password")
            print(email, password)
            response = {"id": get_user_id(email, password)}
            return json.dumps(response), 200
        
    except InformationMismatched as e:
        print(e)
        return json.dumps({"response": str(e)}), 404    
    
@app.route("/getuser", methods=["GET"])
def get_user():
    """
    Provide an endpoint for frontend to request a user's data by responding 
    with the user's JSON if the request ID matches.
    """
    time.sleep(2)
    try:
        if(request.method == "GET"):
            id = request.args.get("id")
            print(id)
            return fetch_user(id=id), 200
        
    except InformationMismatched as e:
        print(e)
        return json.dumps({"response": str(e)}), 404    
    
@app.route("/updatedaytimes", methods=["PUT"])
def update_day_times():
    """
    Provide an endpoint for frontend to update 'day_times', 'categories', and 'timezone' attribute for a user.
    """
    time.sleep(2)
    try:
        if(request.method == "PUT"):
            sucess_msg = "User's day times updated"
            update_user_day_times(**request.json)
            print(sucess_msg)
            return json.dumps({"response": sucess_msg}), 200
        
    except InformationMismatched as e:
        print(e)
        return json.dumps({"response": str(e)}), 404     
    
if __name__ == "__main__":
    app.run(ssl_context="adhoc", debug=True)