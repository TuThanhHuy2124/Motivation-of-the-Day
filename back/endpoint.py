import json
from flask_cors import CORS, cross_origin
from mail import send_confirmation
from flask import Flask, request, abort, Response, jsonify
from database import push_user, delete_user, fetch_user, user_exists, confirm_user, user_confirmed, get_user_id, update_user_day_times, sync_from_firebase, InformationMismatched, UserDoesNotExist

FRONTEND_URL = "https://motivation-of-the-day.netlify.app"

def _prepare_flask_app() -> Flask:
    sync_from_firebase()
    return Flask(__name__)

def _build_response(msg: str, additional_info: dict = {}):
    response_dict = {"response": msg}
    response_dict.update(additional_info)
    response = jsonify(response_dict)
    print(response, response_dict)
    return response

app = _prepare_flask_app()
CORS(app)

@app.route("/deleteuser", methods=["GET"])
@cross_origin(origins=FRONTEND_URL)
def delete_user():
    """
    Provide an endpoint for frontend to delete a user.
    """
    try:
        if(request.method == "GET"):
            id = request.args.get("id")
            print(id)
            return _build_response("User's account has been deleted", delete_user(id=id)), 200
        
    except InformationMismatched as e:
        print(e)
        return _build_response(str(e)), 404  
        
@app.route("/signupuser", methods=["POST"])
@cross_origin(origins=FRONTEND_URL)
def sign_up_user():
    """
    Provide an endpoint for frontend to sign a user up.
    """
    if(request.method == "POST"):
        
        print(request.json)
        if(not user_exists(request.json["email"])):
            push_user(request.json, id=request.json["id"])
            send_confirmation(request.json["email"], request.json["id"])
            return _build_response("Confirmation email sent"), 200
        else:
            error = "User already exists"
            print(error)
            return _build_response(error), 404
    
@app.route("/verifyuser", methods=["PUT"])
@cross_origin(origins=FRONTEND_URL)
def verify_user():
    """
    Only verify a user once.
    Provide an endpoint for frontend to verify a user when they confirm their email.
    """
    try:
        if(request.method == "PUT"):
            print(request.json["id"])
            if(not user_confirmed(request.json["id"])):
                success_msg = "Verify user successfully"
                confirm_user(id=request.json["id"])
                print(success_msg)
                return _build_response(success_msg), 200
            else:
                return _build_response("User already verified email"), 404
            
    except UserDoesNotExist as e:
        print(e)
        return _build_response(str(e)), 404  
     
@app.route("/authenticateuser", methods=["GET"])
@cross_origin(origins=FRONTEND_URL)
def authenticate_user():
    """
    Provide an endpoint for frontend to authenticate a user by responding with the 
    user's ID if the request email and password all match.
    """
    try:
        if(request.method == "GET"):
            email = request.args.get("email")
            password = request.args.get("password")
            id = get_user_id(email, password)
            print(email, password, id)
            if(user_confirmed(id)):
                return _build_response("User logged in", {"id": id}), 200
            raise InformationMismatched("User has not confirmed their account yet")
        
    except InformationMismatched as e:
        print(e)
        return _build_response(str(e)), 404    
    
@app.route("/getuser", methods=["GET"])
@cross_origin(origins=FRONTEND_URL)
def get_user():
    """
    Provide an endpoint for frontend to request a user's data by responding 
    with the user's JSON if the request ID matches.
    """
    try:
        if(request.method == "GET"):
            id = request.args.get("id")
            print(id)
            return _build_response("User's id fetched", fetch_user(id=id)), 200
        
    except InformationMismatched as e:
        print(e)
        return _build_response(str(e)), 404    
    
@app.route("/updatedaytimes", methods=["PUT"])
@cross_origin(origins=FRONTEND_URL)
def update_day_times():
    """
    Provide an endpoint for frontend to update 'day_times', 'categories', and 'timezone' attribute for a user.
    """
    try:
        if(request.method == "PUT"):
            sucess_msg = "User's day times updated"
            update_user_day_times(**request.json)
            print(sucess_msg)
            return _build_response(sucess_msg), 200
        
    except InformationMismatched as e:
        print(e)
        return _build_response(str(e)), 404     
    
if __name__ == "__main__":
    sync_from_firebase()
    app.run(ssl_context="adhoc", debug=True)