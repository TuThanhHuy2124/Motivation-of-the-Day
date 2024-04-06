from datetime import datetime
from database import data
from collections import namedtuple

            
def get_simplified_user(user_obj: dict):

    now = datetime.now()
    day = now.strftime("%A")
    time = now.strftime("%H:%M")
    
    def _should_send_mail():
        time_list = user_obj["day_times"][day]
        is_time = True in [(time == time_obj["time"]) for time_obj in time_list]

        return (day in user_obj["days"]) and (is_time)
    
    def _get_category():
        time_objs = user_obj["day_times"][day]
        for time_obj in time_objs:
            if(time_obj["time"] == time):
                return time_obj["category"]

    if(_should_send_mail()):
        return {"first_name": user_obj["first_name"], "category": _get_category()}

print(get_simplified_user(data))