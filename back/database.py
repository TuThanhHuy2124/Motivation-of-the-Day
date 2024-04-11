import json
import firebase_admin
from datetime import datetime, timedelta
from firebase_admin import credentials, db
from logic import get_all_from_file, get_users_from_file, get_email_names_from_file

class InformationMismatched(Exception):
    def __init__(self, message):
        self.message = message

databaseURL = "https://motivation-of-the-day-default-rtdb.firebaseio.com/"
cred = credentials.Certificate("data/firebase_cred.json")
firebase_admin.initialize_app(cred, {'databaseURL': databaseURL})

def _to_email_name(email):
    return email.split("@")[0]

def _write_to_file(raw_data: dict, file_name="data/subscribers.json") -> None:
    #data = [value for key, value in raw_data.items()]
    with open(file_name, "w") as file:
        json.dump(raw_data, file)

def push_user(user: dict) -> None:
    subs_ref = db.reference("subscribers")
    sub_ref = subs_ref.child(_to_email_name(user["email"]))
    sub_ref.set(user)
    fetched = subs_ref.get()
    print(fetched)
    _write_to_file(fetched)

def confirm_user(email: str, id: str) -> None:
    subs_ref = db.reference("subscribers")
    sub_ref = subs_ref.child(_to_email_name(email))
    if get_all_from_file()[_to_email_name(email)]["id"] == id:
        sub_ref.update({"confirmed": True})
    else:
        raise Exception
    fetched = subs_ref.get()
    print(fetched)
    _write_to_file(fetched)

def get_user_id(email: str, first_name: str, last_name: str) -> str:
    data = get_all_from_file()
    email_name = _to_email_name(email)
    print(data, email_name)
    if email_name not in data:
        raise InformationMismatched("Email cannot be found")
    else:
        user = data[email_name]
        if user_confirmed(email):
            if user["first_name"] == first_name and user["last_name"] == last_name:
                return user["id"]
            else:
                raise InformationMismatched("Wrong first or last name")
        else:
            raise InformationMismatched("User has not verified their account yet")

def fetch_user(email: str, id: str) -> dict:
    data = get_all_from_file()
    email_name = _to_email_name(email)
    print(data, email_name)
    if email_name not in data:
        raise InformationMismatched("Email cannot be found")
    else:
        user = data[email_name]
        if user_confirmed(email):
            if user["id"] == id:
                return user
            else:
                raise InformationMismatched("Wrong first or last name")
        else:
            raise InformationMismatched("User has not verified their account yet")
    
def change_day_times():
    pass

def user_exists(email):
    return _to_email_name(email) in get_email_names_from_file()

def user_confirmed(email):
    return _to_email_name(email) in get_all_from_file() and get_all_from_file()[_to_email_name(email)]["confirmed"]
        