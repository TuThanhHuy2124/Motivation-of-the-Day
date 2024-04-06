import firebase_admin
import json
from datetime import datetime, timedelta
from firebase_admin import credentials, db
from logic import User, to_dict


databaseURL = "https://motivation-of-the-day-default-rtdb.firebaseio.com/"
cred = credentials.Certificate("data/firebase_cred.json")
firebase_admin.initialize_app(cred, {'databaseURL': databaseURL})

def _write_to_file(raw_data: dict, file_name="data/subscribers.json") -> None:
    data = [value for key, value in raw_data.items()]
    with open(file_name, "w") as file:
        json.dump(data, file)

def push_user(user: User) -> None:
    ref = db.reference("/subscribers")
    ref.push(to_dict(user))
    _write_to_file(ref.get())
    
def change_day_times():
    pass
#_write_to_file(db.reference("/subscribers").get())
#ref.push(data)
    
the_user_one =  User(first_name="Thanh Huy", 
                last_name="Tu", 
                email="thanhhuy21112004@gmail.com", 
                confirmed=False, 
                date=datetime.now().strftime("%Y-%m-%d"),
                days=["Friday", "Saturday"],
                day_times={
                    "Friday": [{
                        "time": (datetime.now() + timedelta(minutes=1)).strftime("%H:%M"),
                        "category": ["success"]
                    }],
                    "Saturday": [{
                        "time": (datetime.now() + timedelta(minutes=2)).strftime("%H:%M"),
                        "category": ["success"]
                    }]
                })

the_user_two =  User(first_name="Thanh Huy", 
                last_name="Tu", 
                email="tuthanhhuy2004@gmail.com", 
                confirmed=False, 
                date=datetime.now().strftime("%Y-%m-%d"),
                days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                day_times={
                    "Friday": [
                        {
                            "category": ["success"], 
                            "time": (datetime.now() + timedelta(minutes=1)).strftime("%H:%M")
                        }, 
                        {
                            "category": ["fitness"], 
                            "time": (datetime.now() + timedelta(minutes=2)).strftime("%H:%M")
                        }, 
                        {
                            "category": ["happiness"], 
                            "time": (datetime.now() + timedelta(minutes=3)).strftime("%H:%M")
                        }], 
                    "Monday": [
                        {
                            "category": ["success"], 
                            "time": (datetime.now() + timedelta(minutes=1)).strftime("%H:%M")
                        }], 
                    "Saturday": [
                        {
                            "category": ["success"], 
                            "time": (datetime.now() + timedelta(minutes=1)).strftime("%H:%M")
                        }], 
                    "Sunday": [
                        {
                            "category": ["success"], 
                            "time": (datetime.now() + timedelta(minutes=1)).strftime("%H:%M")
                        }], 
                    "Thursday": [
                        {
                            "category": ["success"],
                              "time": (datetime.now() + timedelta(minutes=1)).strftime("%H:%M")
                        }], 
                    "Tuesday": [
                        {
                            "category": ["success"], 
                            "time": (datetime.now() + timedelta(minutes=1)).strftime("%H:%M")
                        }], 
                    "Wednesday": [
                        {
                            "category": ["success"], 
                            "time": (datetime.now() + timedelta(minutes=1)).strftime("%H:%M")
                        }]})

print(the_user_one)
print(the_user_two)

#push_user(the_user_one)
#push_user(the_user_two)