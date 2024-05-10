import "./Submission.css";
import { useEffect, useState } from 'react';
import Loading from "../components/Loading";
import DayTimeInput from '../components/DayTimeInput';
import SelectionDisplay from '../components/SelectionDisplay';
import TimeZoneDropDown from "../components/TimeZoneDropDown";

function Submission() {
    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    const [isLoading, setLoading] = useState(true);
    const [displayInfo, setDisplayInfo] = useState(false);
    const [timezone, setTimezone] = useState(null)
    const [day_times, setDayTimes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [email, setEmail] = useState(null);

    let id = localStorage.getItem("id");
    if(id === null) {
      id = sessionStorage.getItem("id");
      if(id === null) {console.log("No ID Found"); window.location.href = `https://motivation-of-the-day.netlify.app/`;}
    }

    useEffect(() => {
      const getUser = async () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/getuser?id=${id}`, {
            headers: {
              "Content-Type": "application/json",
              "Origin": import.meta.env.VITE_FRONTEND_URL
          }
        })
        .then(response => {
          if(response.ok) {
            response.json().then(user => {
              setEmail(user["email"])
              setFirstName(user["first_name"]);
              setLastName(user["last_name"]);
              if(Object.prototype.hasOwnProperty.call(user, "categories")) { setCategories(user["categories"]); }
              if(Object.prototype.hasOwnProperty.call(user, "day_times")) { setDayTimes(user["day_times"]); }
              if(Object.prototype.hasOwnProperty.call(user, "timezone")) { setTimezone(user["timezone"]); }
            })
          }
          setLoading(false);
        })
      }
      getUser()
    }, [])

  const filterInvalid = (day_times) => {
    for(const day of DAYS) {
      if(day_times[day] !== undefined) {
        day_times[day] = day_times[day].filter(time_obj => time_obj.time.length === 5 && time_obj.category.length !== 0);
      }
    }
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

  const updateUser = (e) => {
    e.preventDefault();
    if(dataAllValid()) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/updatedaytimes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Origin": import.meta.env.VITE_FRONTEND_URL
        },
        body: JSON.stringify({
          timezone: timezone,
          id: id,
          categories: categories, 
          day_times: sortByTime(filterInvalid(day_times))
        })
      })
      .then(response => {
        if(response.ok) {
          response.json().then(data => {
            window.alert(data["response"]);
            window.location.reload();
          })
        }
        else {
          response.json().then(data => {
            throw Error(data["response"]);
          })
        }
      });
  }}

  const deleteUser = (e) => {
    e.preventDefault();
    if(window.confirm("Are you sure you want to delete this account?")) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/deleteuser?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Origin": import.meta.env.VITE_FRONTEND_URL
        }
      })
      .then(response => {
        if(response.ok) {
          response.json().then(data => {
            window.alert(data["response"]);
            window.location.href = `https://motivation-of-the-day.netlify.app/`;
          })
        }
        else {
          response.json().then(data => {
            throw Error(data["response"]);
          })
        }
      });
  }}

  return (
    <div className="display" id="submission-display">
    {
      // isLoading ? <Loading/> :
      <>
        <button className={displayInfo ? "active" : null} id="my-info-button"
                onClick={(e) => {
                  e.preventDefault();
                  setDisplayInfo(!displayInfo);
                }}>My Info</button>
        {displayInfo && <div className='personal-info'>
          <p className="first-name-fetched">First Name: <b>{first_name}</b></p>
          <p className="last-name-fetched">Last Name: <b>{last_name}</b></p>
          <p className="email-fetched">Email: <b>{email}</b></p>
          <button onClick={deleteUser} id="delete-button">Delete Account</button>
        </div>}
        <div className="main-display">
          <TimeZoneDropDown preset_timezone={timezone} setTimezone={setTimezone}/>
          <form className="submission">
            <div className='inner-main-display'>
              <SelectionDisplay selected={categories} setSelected={setCategories}/>
              <DayTimeInput DAYS={DAYS} selected={categories} day_times={day_times} setDayTimes={setDayTimes}/>
            </div>
            <button type='submit' onClick={updateUser} id="submission-button">Submit</button>
          </form>
        </div>
      </>
    }
    </div>
  )
}

export default Submission;
