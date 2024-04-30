import { useState } from "react";
import "./TimeInput.css"

// eslint-disable-next-line react/prop-types
function TimeInput ({day, index, preset_time, day_times, setDayTimes}) {
    const [value, setValue] = useState(preset_time);

    const handleTimeInput = (e) => {
        e.preventDefault();
        console.log(e, e.target.value);
        
        const dayTimesCopy = {...day_times};
        dayTimesCopy[day][index].time = e.target.value;

        setValue(null);
        setDayTimes(dayTimesCopy);
        console.log(dayTimesCopy);
    }

    return <input name={day} 
                  id={day + "-" + index} 
                  type="time" 
                  className="time-input" 
                  value={value} 
                  step={600}
                  onInput={handleTimeInput}/>
}

export default TimeInput;