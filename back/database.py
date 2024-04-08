import json
import firebase_admin
from datetime import datetime, timedelta
from firebase_admin import credentials, db
from logic import get_users_from_file

databaseURL = "https://motivation-of-the-day-default-rtdb.firebaseio.com/"
cred = credentials.Certificate("data/firebase_cred.json")
firebase_admin.initialize_app(cred, {'databaseURL': databaseURL})

def _write_to_file(raw_data: dict, file_name="data/subscribers.json") -> None:
    data = [value for key, value in raw_data.items()]
    with open(file_name, "w") as file:
        json.dump(data, file)

def push_user(user: dict) -> None:
    ref = db.reference("/subscribers")
    ref.push(user)
    _write_to_file(ref.get())

def fetch_user(email: dict) -> None:
    data = get_users_from_file()
    print(data)
    for user in data:
        if(user["email"] == email):
            return user
    
def change_day_times():
    pass