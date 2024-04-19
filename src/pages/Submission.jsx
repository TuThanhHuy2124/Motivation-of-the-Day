import "./Submission.css";
import { useState } from 'react';
import wrapPromise from "../wrapPromise";
import DayTimeInput from '../components/DayTimeInput';
import SelectionDisplay from '../components/SelectionDisplay';
import TimeZoneDropDown from "../components/TimeZoneDropDown";

const data = wrapPromise(fetch(`/getuser${window.location.search}`));

function Submission() {
    const user = data.read()
    console.log(user)

    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const searchQuery = new URLSearchParams(window.location.search);
    const id = searchQuery.get("id");
    
    function setProperty(obj, property, defaultResult) {
      if(obj === null) return defaultResult
      else if(Object.prototype.hasOwnProperty.call(obj, property)) {
        return obj[property]
      } else return defaultResult

    }

    const [timezone, setTimezone] = useState(setProperty(user, "timezone", null));
    const [day_times, setDayTimes] = useState(setProperty(user, "day_times", []));
    const [categories, setCategories] = useState(setProperty(user, "categories", []));
    const first_name = user["first_name"];
    const last_name = user["last_name"];
    const [email, setEmail] = useState(setProperty(user, "email", null));

    // useEffect(() => {
    //   const getUser = async () => {
    //     fetch(`/getuser${window.location.search}`)
    //         .then(response => {
    //           if(response.ok) {
    //             response.json().then(user => {
    //               console.log(user);
    //               setEmail(user["email"]);
    //               setFirstName(user["first_name"]);
    //               setLastName(user["last_name"]);
    //               if(Object.prototype.hasOwnProperty.call(user, "categories")) { setCategories(user["categories"]); }
    //               if(Object.prototype.hasOwnProperty.call(user, "day_times")) { setDayTimes(user["day_times"]); }
    //               if(Object.prototype.hasOwnProperty.call(user, "timezone")) { setTimezone(user["timezone"]); }
    //             })
    //           }
    //         })
    //   }
    //   getUser()
    // }, [])

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

  const dataAllValid = () => {return (timezone !== null);}

  const addUser = (e) => {
    e.preventDefault();
    console.log(filterInvalid(day_times));
    if(dataAllValid()) {
      fetch("/updatedaytimes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timezone: timezone,
          id: id,
          categories: categories, 
          day_times: sortByTime(filterInvalid(day_times))
        })
      })
      window.alert("User's data has been updated");
      window.location.reload();
    } else console.log("prevented");
  }

  return (
    <>
    <div className='personal-info'>
      <p>First Name: <b>{first_name}</b></p>
      <p>Last Name: <b>{last_name}</b></p>
      <p>Email: <b>{email}</b></p>
      <TimeZoneDropDown preset_timezone={timezone} setTimezone={setTimezone}/>
    </div>
    <form className="submission">
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
