import json
import firebase_admin
from datetime import datetime
from firebase_admin import credentials, db
from logic import get_all_subscribers

databaseURL = "https://motivation-of-the-day-default-rtdb.firebaseio.com/"
cred = credentials.Certificate("data/firebase_cred.json")
firebase_admin.initialize_app(cred, {'databaseURL': databaseURL})

# Exceptions
class InformationMismatched(Exception):
    def __init__(self, message):
        self.message = message

class UserDoesNotExist(Exception):
    def __init__(self, message):
        self.message = message

# Helper functions
def _to_email_name(email: str) -> str:
    return email.split("@")[0]

def _write_to_file(raw_data: dict, file_name="data/subscribers.json") -> None:
    with open(file_name, "w") as file:
        json.dump(raw_data, file)

# Check users information
def user_exists(email: str) -> bool:
    return _to_email_name(email) in get_all_subscribers()

def user_confirmed(email: str) -> bool:
    return _to_email_name(email) in get_all_subscribers() and get_all_subscribers()[_to_email_name(email)]["confirmed"]

# Decorators
def push_and_get(func: function) -> function:
    """
    Get the correct address in the database then call the func 
    (which suppposed to add data to that point to the database).
    Then, fetch the data from database and write into 'subscriber.json'.

    Require wrapped func to take 'email' and 'sub_ref' as parameters.
    """
    def wrapper(*args, email, **kwargs):
        subs_ref = db.reference("subscribers")
        sub_ref = subs_ref.child(_to_email_name(email))
        func(*args, **kwargs, email=email, sub_ref=sub_ref)
        fetched = subs_ref.get()
        print(fetched)
        _write_to_file(fetched)
    return wrapper

def verify_log_in(func: function) -> function:
    """
    Verify the email with extra condition (which is returned by the func).
    Then, return the 'result' (which is also returned by the func).

    Require the wrapped func to take 'email' and 'user' as parameters.
    Require the wrapped func to return a 'condition' and a 'result' (in this order). 
    """
    def wrapper(*args, email, **kwargs):
        data = get_all_subscribers()
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

# Use push_and_get
@push_and_get
def push_user(user: dict, *, email: str, sub_ref) -> None:
    """
    Add 'user' to 'sub_ref' (user's address in the database) (which is passed from the decorator)
    """
    sub_ref.set(user)

@push_and_get
def confirm_user(id: str, *, email: str, sub_ref) -> None:
    """
    Add 'confirmed' and 'confirmed_date' attributes to 'sub_ref' (user's address in the database) (which is passed from the decorator)
    """
    if get_all_subscribers()[_to_email_name(email)]["id"] == id:
        sub_ref.update({
            "confirmed": True,
            "confirmed_date": datetime.now().strftime("%m/%d/%Y")
        })
    else:
        raise UserDoesNotExist("Cannot verify because user does not exist")

# Use verify_log_in
@verify_log_in     
def get_user_id(first_name: str, last_name: str, * , email: str, user: dict) -> str:
    """
    Return user's id if the inputted email, first name, and last name match
    """
    condition = user["first_name"] == first_name and user["last_name"] == last_name
    result = user["id"]
    return condition, result

@verify_log_in  
def fetch_user(id: str, * , email: str, user: dict) -> dict:
    """
    Return user's data if the inputted email and id match
    """
    condition = user["id"] == id
    result = user
    return condition, result

@verify_log_in
def update_day_times(id: str, categories: list, day_times: dict, * , email: str, user: dict):
    """
    Update user's 'categories' and 'day_times' if the inputted email and id match
    """
    condition = user["id"] == id

    @push_and_get
    def _update(*, email: str, sub_ref):
        sub_ref.update({
                    "categories": categories,
                    "day_times": day_times,
                })
    
    result = _update(email=email)

    return condition, result
        