import "./Submission.css";
import { useEffect, useState } from 'react';
import DayTimeInput from '../components/DayTimeInput';
import SelectionDisplay from '../components/SelectionDisplay';
import TimeZoneDropDown from "../components/TimeZoneDropDown";

function Submission() {
    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const searchQuery = new URLSearchParams(window.location.search);
    const email = searchQuery.get("email");
    const id = searchQuery.get("id");
    
    const [timezone, setTimezone] = useState(null)
    const [day_times, setDayTimes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);

    useEffect(() => {
      const getUser = async () => {
        fetch(`/getuser${window.location.search}`)
            .then(response => {
              if(response.ok) {
                response.json().then(user => {
                  console.log(user);
                  setFirstName(user["first_name"]);
                  setLastName(user["last_name"]);
                  if(Object.prototype.hasOwnProperty.call(user, "categories")) { setCategories(user["categories"]); }
                  if(Object.prototype.hasOwnProperty.call(user, "day_times")) { setDayTimes(user["day_times"]); }
                  if(Object.prototype.hasOwnProperty.call(user, "timezone")) { setTimezone(user["timezone"]); }
                })
              }
            })
      }
      getUser()
    }, [])

  const filterInvalid = (day_times) => {
    for(const day of DAYS) {
      if(day_times[day] !== undefined) {
        day_times[day] = day_times[day].filter(time_obj => time_obj.time !== "" && time_obj.category.length !== 0);
      }
    }
    console.log(day_times);
    return day_times;
  }

  const sortByTime = (day_times) => {
    for(const day of DAYS) {
      if(day_times[day] !== undefined) {
        day_times[day].sort((a, b) => a["time"].localeCompare(b["time"]));
      }
    }
    return day_times;
  }

  const addUser = (e) => {
    e.preventDefault();
    console.log(filterInvalid(day_times));
    fetch("/updatedaytimes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timezone: timezone,
        email: email,
        id: id,
        categories: categories, 
        day_times: sortByTime(filterInvalid(day_times))
      })
    })
    window.alert("User's data has been updated");
    window.location.reload();
  }

  return (
    <>
    <div className='personal-info'>
      <p>First Name: {first_name}</p>
      <p>Last Name: {last_name}</p>
      <p>Email: {email}</p>
      <TimeZoneDropDown preset_timezone={timezone} setTimezone={setTimezone}/>
    </div>
    <form>
      <div className='main-display'>
        <SelectionDisplay selected={categories} setSelected={setCategories}/>
        <DayTimeInput DAYS={DAYS} selected={categories} day_times={day_times} setDayTimes={setDayTimes}/>
      </div>
      <button type='submit' onClick={addUser}>Submit</button>
    </form>
    </>
  )
}

export default Submission;
