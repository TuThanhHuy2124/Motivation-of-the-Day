import firebase_admin
import json
from datetime import datetime
from firebase_admin import credentials, db

databaseURL = "https://motivation-of-the-day-default-rtdb.firebaseio.com/"
cred = credentials.Certificate("firebase_cred.json")
firebase_admin.initialize_app(cred, {'databaseURL': databaseURL})

ref = db.reference("/subscribers")

with open("subscriber.json", "r") as file:
    data = json.load(file)

#ref.push(data)