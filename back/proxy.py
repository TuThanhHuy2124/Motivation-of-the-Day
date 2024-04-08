from flask import Flask, request
from database import push_user, fetch_user
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
        print("first line")
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

if __name__ == "__main__":
    app.run(ssl_context="adhoc", debug=True)