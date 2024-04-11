import { useEffect, useState } from 'react';
import "./Submission.css"
import SelectionDisplay from '../components/SelectionDisplay'
import DayTimeInput from '../components/DayTimeInput'

function Submission() {
    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const searchQuery = new URLSearchParams(window.location.search)
    const email = searchQuery.get("email")
    const id = searchQuery.get("id")
    const [categories, setCategories] = useState([])
    const [day_times, setDayTimes] = useState(null)
    const [first_name, setFirstName] = useState(null)
    const [last_name, setLastName] = useState(null)

    useEffect(() => {
      const getUser = async () => {
        fetch(`/getuser${window.location.search}`)
            .then(response => {
              if(response.ok) {
                response.json().then(user => {
                  console.log(user)
                  setFirstName(user["first_name"])
                  setLastName(user["last_name"])
                  if(user.hasOwnProperty("categories")) { setCategories(user["categories"]) }
                  if(user.hasOwnProperty("day_times")) { setDayTimes(user["day_times"]) }
                })
              }
            })
      }
      getUser()
    }, [])

    const is_valid = (categories, day_times) => {
      console.log(categories, day_times)
      return (categories.length !== 0) &&
             (Object.keys(day_times).length !== 0)
    }

    const constructDayTimes = (times, categories) => {
      
      const day_times = {}
      for(const day of DAYS) {

        day_times[day] = []
        var index = 0

        // eslint-disable-next-line no-constant-condition
        while(true) {

          const time_obj = {}
          const [hour] = times.filter(time => time.id === (day + "-" + index) && time.className === "hour")
          const [minute] = times.filter(time => time.id === (day + "-" + index) && time.className === "minute")
          
          if(hour === undefined || minute === undefined) {break}
          else if(hour.value === "" || minute.value == "") {index++; continue;}
          else {
            time_obj["time"] = (hour.value.length == 1 ? "0" + hour.value : hour.value) + ":" + (minute.value.length == 1 ? "0" + minute.value : minute.value)
            time_obj["category"] = categories
          }

          day_times[day].push(time_obj)
          index++
        }

        if(day_times[day].length === 0) {delete day_times[day]}
      }

      return day_times
  }

  const addUser = (e) => {
    e.preventDefault()
    
    const form = e.target.form;
    const elements = form.elements;
    const elements_array = Array(...elements);

    const categories = elements_array.filter(element => (element.className === "category" && element.checked === true))
                                     .map(elements => elements.id);
    const times = elements_array.filter(element => element.className === "hour" || element.className === "minute")
    const day_times = constructDayTimes(times, categories)
    
    console.log(categories, day_times)

    if(is_valid(categories, day_times)) {
      fetch("/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          id: id,
          catergories: categories, 
          day_times: day_times
        })
      })
    } else console.log("prevented")
  }

  return (
    <>
    <div className='personal-info'>
      <p>First Name: {first_name}</p>
      <p>Last Name: {last_name}</p>
      <p>Email: {email}</p>
    </div>
    <form>
      <div className='main-display'>
        <SelectionDisplay selected={categories} setSelected={setCategories}/>
        <DayTimeInput DAYS={DAYS} selected={categories}/>
      </div>
      <button type='submit' onClick={addUser}>Submit</button>
    </form>
    </>
  )
}

export default Submission
