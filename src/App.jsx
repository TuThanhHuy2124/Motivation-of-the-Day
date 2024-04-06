import './App.css'
import CategoryDropDown from './components/CategoryDropDown'
import InfoInput from './components/InfoInput'
import DayTimeInput from './components/DayTimeInput'

function App() {
    const constructDayTimes = (days, times, categories) => {
      
      const day_times = {}
      for(const day of days) {

        day_times[day] = []
        var index = 0;

        // eslint-disable-next-line no-constant-condition
        while(true) {

          const time_obj = {}
          const [hour] = times.filter(time => time.id === (day + "-" + index) && time.className === "hour")
          const [minute] = times.filter(time => time.id === (day + "-" + index) && time.className === "minute")
          
          if(hour === undefined || minute === undefined) {break}
          else if(hour.value === "" || minute.value == "") {console.log("continue");  index++; continue;}
          else {
            time_obj["time"] = hour.value + ":" + minute.value;
            time_obj["category"] = categories
          }


          day_times[day].push(time_obj)
          
          index++;
        }
      }

      return day_times
  }

  const addUser = (e) => {
    e.preventDefault()
    const form = e.target.form;
    const elements = form.elements;
    const elements_array = Array(...elements);

    const first_name = elements["first_name"].value;
    const last_name = elements["last_name"].value;
    const email = elements["email"].value;
    const categories = elements_array.filter(element => (element.className === "category" && element.checked === true))
                                     .map(elements => elements.id);
    const days = elements_array.filter(element => (element.className === "day" && element.checked === true))
                               .map(elements => elements.id);
                               
    var times = [];
    days.forEach((day) => {times.push(...(elements_array.filter(element => element.id.includes(day + "-"))))})
    const day_times = constructDayTimes(days, times, categories)

    const date_obj = new Date()
    const day = String(date_obj.getDate()).padStart(2, "0");
    const month = String(date_obj.getMonth() + 1).padStart(2, "0");
    const year = String(date_obj.getFullYear());
    const date = `${year}-${month}-${day}`

    console.log(first_name, last_name, email, categories, days, day_times)
    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      days: days,
      day_times: day_times,
      confirmed: false,
      date: date
    }

    console.log(user)
    
    fetch("/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })
  }

  return (
    <form>
      <InfoInput />
      <CategoryDropDown />
      <DayTimeInput />
      <button type='submit' onClick={addUser}>Submit</button>
    </form>
  )
}

export default App
