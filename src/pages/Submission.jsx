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
    const [day_times, setDayTimes] = useState([])
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

    const constructDayTimes = (times, chosen_categories) => {
      
      const day_times = {}
      for(const day of DAYS) {

        day_times[day] = []
        var index = 0

        // eslint-disable-next-line no-constant-condition
        while(true) {

          const time_obj = {}
          const [time] = times.filter(time => time.id === (day + "-" + index) && time.className === "time")
          const [chosen_category] = chosen_categories.filter(selection => selection.id === (day + "-" + index))
          
          
          if(time === undefined) {break}
          else if(time.value === "") {index++; continue;}
          else {
            time_obj["time"] = time.value
            time_obj["category"] = (chosen_category.value === "mixed") ? categories : [chosen_category.value]
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

    const times = elements_array.filter(element => element.className === "time")
    const chosen_categories = elements_array.filter(element => element.className === "chosen-category")
    console.log(times, chosen_categories)
    const day_times = constructDayTimes(times, chosen_categories)
    
    console.log(day_times)

    if(is_valid(categories, day_times)) {
      fetch("/updatedaytimes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          id: id,
          categories: categories, 
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
