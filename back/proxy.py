from flask import Flask, request
from database import push_user
app = Flask(__name__)

@app.route("/adduser", methods=["POST"])
def add_user():
    try:
        if(request.method == "POST"):
            push_user(request.json)
        return "User Pushed", 200
    except:
        return "Cannot Push To Server", 500
        

if __name__ == "__main__":
    app.run(ssl_context="adhoc", debug=True)