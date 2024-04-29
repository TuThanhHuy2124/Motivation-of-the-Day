import json
import firebase_admin
from dotenv import dotenv_values
from datetime import datetime
from collections import namedtuple
from logic import get_all_subscribers
from firebase_admin import credentials, db

SECRET = dotenv_values("./data/.env")
databaseURL = SECRET["DATABASE_URL"]
cred = credentials.Certificate(json.loads(SECRET["FIREBASE_CRED"]))
firebase_admin.initialize_app(cred, {'databaseURL': databaseURL})
# ConditionResultPackage namedtuple
ConditionResultPackage = namedtuple("ConditionResultPackage", ["condition", "result", "failed_message"])

# Exceptions
class InformationMismatched(Exception):
    def __init__(self, message) -> None:
        self._message = message

    def __str__(self) -> str:
        return self._message

class UserDoesNotExist(Exception):
    def __init__(self, message) -> None:
        self._message = message

    def __str__(self) -> str:
        return self._message

# Helper functions
def _to_email_name(email: str) -> str:
    return email.split("@")[0]

def _write_to_file(raw_data: dict, file_name="data/subscribers.json") -> None:
    with open(file_name, "w") as file:
        json.dump(raw_data, file)

# Get user's id from email and password
def get_user_id(email: str, password: str) -> str:
    """
    Return user's id if the inputted email and password match
    """
    for id, user in get_all_subscribers().items():
        if user["email"] == email and user["password"] == password:
            return id
    raise InformationMismatched("Wrong email or password")


# Check user's information
def user_exists(email: str) -> bool:
    return True in set((subscriber["email"] == email) for id, subscriber in get_all_subscribers().items())

def user_confirmed(id: str) -> bool:
    subscribers = get_all_subscribers()
    return (id in subscribers) and ("confirmed" in subscribers[id]) and (subscribers[id]["confirmed"])

# Decorators
def push_and_get(func):
    """
    Get the correct address in the database then call the func 
    (which suppposed to add data to that point to the database).
    Then, fetch the data from database and write into 'subscriber.json'.

    Require wrapped func to take 'id' and 'sub_ref' as parameters.
    """
    def wrapper(*args, id, **kwargs):
        subs_ref = db.reference("subscribers")
        sub_ref = subs_ref.child(id)
        func(*args, **kwargs, id=id, sub_ref=sub_ref)
        fetched = subs_ref.get()
        print(fetched)
        _write_to_file(fetched)
    return wrapper

def verify_log_in(func):
    """
    Verify the email with extra condition (which is returned by the func).
    Then, return the 'result' (which is also returned by the func).

    Require the wrapped func to take 'id' and 'user' as parameters.
    Require the wrapped func to return a ConditionResultPackage. 
    """
    def wrapper(*args, id, **kwargs):
        data = get_all_subscribers()
        print(data, id)
        
        if id not in data:
            raise InformationMismatched("ID cannot be found")
        else:
            user = data[id]
            package = func(*args, **kwargs, id=id, user=user)
            if user_confirmed(id):
                if package.condition:
                    return package.result
                else:
                    raise InformationMismatched(package.failed_message)
            else:
                raise InformationMismatched("User has not verified their account yet")
    return wrapper

# Use push_and_get
@push_and_get
def push_user(user: dict, *, id: str, sub_ref) -> None:
    """
    Add 'user' to 'sub_ref' (user's address in the database) (which is passed from the decorator)
    """
    sub_ref.set(user)

@push_and_get
def confirm_user(*, id: str, sub_ref) -> None:
    """
    Add 'confirmed' and 'confirmed_date' attributes to 'sub_ref' (user's address in the database) (which is passed from the decorator)
    """
    if id in get_all_subscribers():
        sub_ref.update({
            "confirmed": True,
            "confirmed_date": datetime.now().strftime("%m/%d/%Y")
        })
    else:
        raise UserDoesNotExist("Cannot verify because user does not exist")

# Use verify_log_in
@verify_log_in  
def fetch_user(* , id: str, user: dict) -> dict:
    """
    Return user's data if the inputted id matches
    """
    condition = user["id"] == id
    result = user
    failed_message = "User's ID does not match"
    return ConditionResultPackage(condition, result, failed_message)

@verify_log_in
def update_user_day_times(categories: list, day_times: dict, timezone: int, * , id: str, user: dict):
    """
    Update user's 'categories', 'day_times', and 'timezone' if the inputted id matches
    """
    @push_and_get
    def _update(*, id: str, sub_ref) -> None:
        sub_ref.update({
                    "timezone": timezone,
                    "categories": categories,
                    "day_times": day_times,
                })
        
    condition = user["id"] == id
    result = _update(id=id)
    failed_message = "User's ID does not match"

    return ConditionResultPackage(condition, result, failed_message)
        