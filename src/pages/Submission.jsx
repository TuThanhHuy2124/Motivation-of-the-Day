import CategoryDropDown from '../components/CategoryDropDown'
import InfoInput from '../components/InfoInput'
import DayTimeInput from '../components/DayTimeInput'

function Submission() {
    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    const is_valid = (first_name, last_name, email, categories, day_times) => {
      console.log()
      return (first_name !== "") &&
             (last_name !== "") &&
             (email !== "") &&
             (categories.length !== 0) &&
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

    const first_name = elements["first_name"].value;
    const last_name = elements["last_name"].value;
    const email = elements["email"].value;
    const categories = elements_array.filter(element => (element.className === "category" && element.checked === true))
                                     .map(elements => elements.id);
    const times = elements_array.filter(element => element.className === "hour" || element.className === "minute")
    const day_times = constructDayTimes(times, categories)

    const date_obj = new Date()
    const day = String(date_obj.getDate()).padStart(2, "0");
    const month = String(date_obj.getMonth() + 1).padStart(2, "0");
    const year = String(date_obj.getFullYear());
    const date = `${year}-${month}-${day}`
    
    console.log(first_name, last_name, email, categories, day_times)

    if(is_valid(first_name, last_name, email, categories, day_times)) {
      fetch("/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          email: email,
          day_times: day_times,
          confirmed: false,
          date: date
        })
      })
    } else console.log("prevented")
  }

  return (
    <form>
      <InfoInput />
      <CategoryDropDown />
      <DayTimeInput DAYS={DAYS}/>
      <button type='submit' onClick={addUser}>Submit</button>
    </form>
  )
}

export default Submission
