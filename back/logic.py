import json
from datetime import datetime

def json_loader(func):
    def inner():
        file_name = "data/subscribers.json"
        with open(file_name, "r") as file:
            user_objs = json.load(file)
        return func(user_objs)
    return inner

@json_loader
def get_all_from_file(user_objs=None):
    return user_objs

@json_loader
def get_email_names_from_file(user_objs=None):
    return [email_name for email_name, value in user_objs.items()]

@json_loader
def get_users_from_file(user_objs=None):
    return [user_obj for key, user_obj in user_objs.items()]

def rearrange_name(name: str) -> str:
    if "," in name:
        last, first = name.split(",")
        return first.strip() + " " + last.strip()
    else:
        return name

def get_simplified_user(user_obj: dict):
    #print(user_obj)
    if user_obj["confirmed"]:
        now = datetime.now()
        day = now.strftime("%A")
        time = now.strftime("%H:%M")
        
        def _should_send_mail():
            time_list = user_obj["day_times"][day]
            is_time = True in [(time == time_obj["time"]) for time_obj in time_list]

            return (day in user_obj["day_times"].keys()) and (is_time)
        
        def _get_category():
            time_objs = user_obj["day_times"][day]
            for time_obj in time_objs:
                if(time_obj["time"] == time):
                    return time_obj["category"]

        if(_should_send_mail()):
            return {"first_name": user_obj["first_name"], "category": _get_category(), "email": user_obj["email"]}

#print(get_simplified_user())