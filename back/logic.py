import json
from datetime import datetime, timedelta, timezone

def _get_timezone(tz: int = -7) -> timezone:
    return timezone(timedelta(hours=tz))

def get_all_subscribers(file_name = "subscribers.json") -> dict:
    """
    Return all the user_objs from subsribers.json
    """
    try:
        with open(file_name, "r") as file:
            user_objs = json.load(file)
    except FileNotFoundError:
        with open(file_name, "w") as file:
            file.write("{}")
            user_objs = {}
    print("returning user_objs: ")
    print(user_objs)
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

def get_user_if_valid(user_obj: dict, now = datetime.now(tz=_get_timezone())) -> dict | None:
    """
    Check if user has confirmed their email and if they have any day_times to display.
    If yes, send a simplified version of user object if it is the right time
    (contains just enough information to send an email).
    If no, return None.
    """
    if user_obj["confirmed"] and "day_times" in user_obj:
        day = now.strftime("%A")
        time = now.strftime("%H:%M")
        converted_day_times = _rearrange_day_times(user_obj["day_times"], user_obj["timezone"])

        def _should_send_mail() -> bool:
            """
            Return true if it is the right time and day to send an email and false otherwise
            """
            if "day_times" not in user_obj : return False
            if day not in converted_day_times: return False
            time_list = converted_day_times[day]
            print("time list: ")
            print(time_list)
            is_time = True in [(time == time_obj["time"]) for time_obj in time_list]
            return (day in converted_day_times.keys()) and (is_time)
        
        def _get_category() -> list:
            """
            Return the list of categories that associates with this time and day of the week
            """
            time_objs = converted_day_times[day]
            print("get category: ")
            print(time_objs)
            print(now, day, time)
            for time_obj in time_objs:
                print(time_obj["time"], time)
                if(time_obj["time"] == time):
                    return time_obj["category"]

        if(_should_send_mail()):
            returned_date = datetime.now(tz=_get_timezone(user_obj["timezone"])).strftime("%m/%d/%Y")
            returned_time = datetime.now(tz=_get_timezone(user_obj["timezone"])).strftime("%H:%M")
            return {"first_name": user_obj["first_name"], "category": _get_category(), "email": user_obj["email"], "date": returned_date, "time": returned_time}

def _rearrange_day_times(org_day_times: dict, timezone: int) -> dict:
    """
    Rearrange original day times dictionary and convert it into a specific timezone's counterpart
    """
    result = {
        "Monday": [],
        "Tuesday": [],
        "Wednesday": [],
        "Thursday": [],
        "Friday": [],
        "Saturday": [],
        "Sunday": [],
    }

    for weekday, time_objs in org_day_times.items():
        for time_obj in time_objs:
            converted_weekday, converted_time = _get_weekday_by_timezone(weekday, time_obj["time"], timezone)
            time_obj["time"] = converted_time
            result[converted_weekday].append(time_obj)

    return result
   
def _get_weekday_by_timezone(weekday: str, time: str, timezone: int) -> str:
    """
    Given a weekday and a time, change the timezone and return the relative weekday in that timezone
    """
    CALIFORNIA_UTC = -7
    WEEKDAYS = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]

    hour, minute = time.split(":")
    time_obj = datetime(month=4,day=(15 + WEEKDAYS.index(weekday)), year=2024, hour=int(hour), minute=int(minute))
    timezone_obj = timedelta(hours=CALIFORNIA_UTC - timezone)
    converted_time = time_obj + timezone_obj
    return WEEKDAYS[converted_time.weekday()], converted_time.strftime("%H:%M")