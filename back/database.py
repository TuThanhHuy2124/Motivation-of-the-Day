import firebase_admin
import json
from datetime import datetime
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
                        "time": "23:59",
                        "category": ["success"]
                    }],
                    "Saturday": [{
                        "time": "00:17",
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
                            "time": "23:17"
                        }, 
                        {
                            "category": ["fitness"], 
                            "time": "23:18"
                        }, 
                        {
                            "category": ["happiness"], 
                            "time": "23:19"
                        }], 
                    "Monday": [
                        {
                            "category": ["success"], 
                            "time": "18:00"
                        }], 
                    "Saturday": [
                        {
                            "category": ["success"], 
                            "time": "00:11"
                        }], 
                    "Sunday": [
                        {
                            "category": ["success"], 
                            "time": "18:00"
                        }], 
                    "Thursday": [
                        {
                            "category": ["success"],
                              "time": "18:00"
                        }], 
                    "Tuesday": [
                        {
                            "category": ["success"], 
                            "time": "18:00"
                        }], 
                    "Wednesday": [
                        {
                            "category": ["success"], 
                            "time": "18:00"
                        }]})

#push_user(the_user_one)
#push_user(the_user_two)