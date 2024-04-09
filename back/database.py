import json
import firebase_admin
from datetime import datetime, timedelta
from firebase_admin import credentials, db
from logic import get_users_from_file, get_email_names_from_file


databaseURL = "https://motivation-of-the-day-default-rtdb.firebaseio.com/"
cred = credentials.Certificate("data/firebase_cred.json")
firebase_admin.initialize_app(cred, {'databaseURL': databaseURL})

def _get_email_name(email):
    return email.split("@")[0]

def _write_to_file(raw_data: dict, file_name="data/subscribers.json") -> None:
    #data = [value for key, value in raw_data.items()]
    with open(file_name, "w") as file:
        json.dump(raw_data, file)

def push_user(user: dict) -> None:
    subs_ref = db.reference("subscribers")
    sub_ref = subs_ref.child(_get_email_name(user["email"]))
    sub_ref.set(user)
    fetched = subs_ref.get()
    print(fetched)
    _write_to_file(fetched)

def confirm_user(email: str, id: str) -> None:
    subs_ref = db.reference("subscribers")
    sub_ref = subs_ref.child(_get_email_name(email))
    sub_ref.update({"confirmed": True})
    fetched = subs_ref.get()
    print(fetched)
    _write_to_file(fetched)


def fetch_user(email: dict) -> None:
    data = get_users_from_file()
    print(data)
    for user in data:
        if(user["email"] == email):
            return user
    
def change_day_times():
    pass

def user_exists(email):
    return _get_email_name(email) in get_email_names_from_file()
        