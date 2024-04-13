import json
import firebase_admin
from datetime import datetime
from firebase_admin import credentials, db
from logic import get_all_from_file, get_users_from_file, get_email_names_from_file

databaseURL = "https://motivation-of-the-day-default-rtdb.firebaseio.com/"
cred = credentials.Certificate("data/firebase_cred.json")
firebase_admin.initialize_app(cred, {'databaseURL': databaseURL})

class InformationMismatched(Exception):
    def __init__(self, message):
        self.message = message

class UserDoesNotExist(Exception):
    def __init__(self, message):
        self.message = message

def _to_email_name(email):
    return email.split("@")[0]

def _write_to_file(raw_data: dict, file_name="data/subscribers.json") -> None:
    with open(file_name, "w") as file:
        json.dump(raw_data, file)

def user_exists(email: str) -> bool:
    return _to_email_name(email) in get_email_names_from_file()

def user_confirmed(email: str) -> bool:
    return _to_email_name(email) in get_all_from_file() and get_all_from_file()[_to_email_name(email)]["confirmed"]

def push_and_get(func) -> None:
    def wrapper(*args, email, **kwargs):
        subs_ref = db.reference("subscribers")
        sub_ref = subs_ref.child(_to_email_name(email))
        func(*args, **kwargs, email=email, sub_ref=sub_ref)
        fetched = subs_ref.get()
        print(fetched)
        _write_to_file(fetched)
    return wrapper

def verify_log_in(func) -> str:
    def wrapper(*args, email, **kwargs):
        
        data = get_all_from_file()
        email_name = _to_email_name(email)
        print(data, email_name)
        
        if email_name not in data:
            raise InformationMismatched("Email cannot be found")
        else:
            user = data[email_name]
            condition, result = func(*args, **kwargs, email=email, user=user)
            if user_confirmed(email):
                if condition:
                    return result
                else:
                    raise InformationMismatched("Wrong first or last name")
            else:
                raise InformationMismatched("User has not verified their account yet")
    return wrapper

@push_and_get
def push_user(user: dict, *, email: str, sub_ref) -> None:
    sub_ref.set(user)

@push_and_get
def confirm_user(id: str, *, email: str, sub_ref) -> None:
    if get_all_from_file()[_to_email_name(email)]["id"] == id:
        sub_ref.update({
            "confirmed": True,
            "confirmed_date": datetime.now().strftime("%m/%d/%Y")
        })
    else:
        raise UserDoesNotExist("Cannot verify because user does not exist")

@verify_log_in     
def get_user_id(first_name: str, last_name: str, * , email: str, user: dict) -> str:
    condition = user["first_name"] == first_name and user["last_name"] == last_name
    result = user["id"]
    return condition, result

@verify_log_in  
def fetch_user(id: str, * , email: str, user: dict) -> dict:
    condition = user["id"] == id
    result = user
    return condition, result

@verify_log_in
def update_day_times(id: str, categories: list, day_times: dict, * , email: str, user: dict):
    condition = user["id"] == id

    @push_and_get
    def _update(*, email: str, sub_ref):
        sub_ref.update({
                    "categories": categories,
                    "day_times": day_times,
                })
    
    result = _update(email=email)

    return condition, result
        