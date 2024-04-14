import json
from datetime import datetime

def get_all_subscribers() -> dict:
    """
    Return all the user_objs from subsribers.json
    """
    file_name = "data/subscribers.json"
    with open(file_name, "r") as file:
        user_objs = json.load(file)
    return user_objs

def rearrange_name(name: str) -> str:
    """
    Rearrange names with format "{last_name}, {first_name}" to "{first_name} {last_name}"
    """
    if "," in name:
        last, first = name.split(",")
        return first.strip() + " " + last.strip()
    else:
        return name

def get_user_if_valid(user_obj: dict) -> dict | None:
    """
    Check if user has confirmed their email and if they have any day_times to display.
    If yes, send a simplified version of user object if it is the right time
    (contains just enough information to send an email).
    If no, return None.
    """
    if user_obj["confirmed"]:
        now = datetime.now()
        day = now.strftime("%A")
        time = now.strftime("%H:%M")
        
        def _should_send_mail() -> bool:
            """
            Return true if it is the right time and day to send an email and false otherwise
            """
            if "day_times" not in user_obj : return False
            if day not in user_obj["day_times"]: return False
            time_list = user_obj["day_times"][day]
            is_time = True in [(time == time_obj["time"]) for time_obj in time_list]
            return (day in user_obj["day_times"].keys()) and (is_time)
        
        def _get_category() -> list:
            """
            Return the list of categories that associates with this time and day of the week
            """
            time_objs = user_obj["day_times"][day]
            for time_obj in time_objs:
                if(time_obj["time"] == time):
                    return time_obj["category"]

        if(_should_send_mail()):
            return {"first_name": user_obj["first_name"], "category": _get_category(), "email": user_obj["email"]}