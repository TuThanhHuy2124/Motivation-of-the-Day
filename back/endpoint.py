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
            send_confirmation(request.json["email"], request.json["id"])
            push_user(request.json, email=request.json["email"])
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
    time.sleep(5)
    try:
        if(request.method == "PUT"):
            print(request.json["id"], request.json["email"])
            if(not user_confirmed(request.json["email"])):
                success_msg = "Verify user successfully"
                confirm_user(id=request.json["id"], email=request.json["email"])
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
    user's email and ID if the request email, first name, and last name all match.
    """
    try:
        if(request.method == "GET"):
            email = request.args.get("email")
            first_name = request.args.get("first_name")
            last_name = request.args.get("last_name")
            print(email, first_name, last_name)
            response = {
                "email": email,
                "id": get_user_id(first_name, last_name, email=email)
            }
            return json.dumps(response), 200
        
    except InformationMismatched as e:
        print(e)
        return json.dumps({"response": str(e)}), 404    
    
@app.route("/getuser", methods=["GET"])
def get_user():
    """
    Provide an endpoint for frontend to request a user's data by responding 
    with the user's JSON if the request email and ID all match.
    """
    time.sleep(5)
    try:
        if(request.method == "GET"):
            email = request.args.get("email")
            id = request.args.get("id")
            print(email, id)
            return fetch_user(id, email=email), 200
        
    except InformationMismatched as e:
        print(e)
        return json.dumps({"response": str(e)}), 404    
    
@app.route("/updatedaytimes", methods=["PUT"])
def update_day_times():
    """
    Provide an endpoint for frontend to update 'day_times' attribute for a user.
    """
    try:
        if(request.method == "PUT"):
            sucess_msg = "User's day times updated"
            update_user_day_times(**request.json)
            print(sucess_msg)
            return json.dumps({"respponse": sucess_msg}), 200
        
    except InformationMismatched as e:
        print(e)
        return json.dumps({"response": str(e)}), 404     
    
if __name__ == "__main__":
    app.run(ssl_context="adhoc", debug=True)