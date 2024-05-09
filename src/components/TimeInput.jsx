import { useState } from "react";
import "./TimeInput.css"

// eslint-disable-next-line react/prop-types
function TimeInput ({day, index, preset_time, day_times, setDayTimes}) {
    const time_period = 10;
    const hours = new Array(24).fill(null);
    const minutes = new Array(60 / time_period).fill(null);
    const [preset_hour, preset_minute] = preset_time.split(":");
    const [hourTouched, setHourTouched] = useState(preset_hour !== "");
    const [minuteTouched, setMinuteTouched] = useState(preset_minute !== "");
    const fillNumber = (num) => {
        const str_num = String(num)
        return str_num.length === 1 ? "0" + str_num : str_num;
    }

    const handleMinuteInput = (e) => {
        setMinuteTouched(true);

        const dayTimesCopy = {...day_times};
        const currentTime = dayTimesCopy[day][index].time;
        const middlePoint = currentTime.indexOf(":");
        const selectedIndex = e.target.selectedIndex;

        if (middlePoint === 0) {
            dayTimesCopy[day][index].time = currentTime + e.target[selectedIndex].innerHTML ;
        }
        else if (middlePoint === 2) {
            dayTimesCopy[day][index].time = currentTime.substring(0, middlePoint + 1) + e.target[selectedIndex].innerHTML;
        }
        
        console.log(dayTimesCopy[day][index])
    }

    const handleHourInput = (e) => {
        setHourTouched(true);

        const dayTimesCopy = {...day_times};
        const currentTime = dayTimesCopy[day][index].time;
        const middlePoint = currentTime.indexOf(":");
        const selectedIndex = e.target.selectedIndex;

        if (middlePoint === 0) {
            dayTimesCopy[day][index].time = e.target[selectedIndex].innerHTML + currentTime;
        }
        else if (middlePoint === 2) {
            dayTimesCopy[day][index].time = e.target[selectedIndex].innerHTML + currentTime.substring(middlePoint);
        }

        console.log(dayTimesCopy[day][index])
    }

    return (
        <div className="time-input">
            <select onChange={handleHourInput}>
                {!hourTouched && <option selected={preset_hour === ""}>Hour</option>}
                {hours.map((value, index) => <option key={index} selected={preset_hour !== "" && Number(preset_hour) === index}>{fillNumber(index)}</option>)}
            </select>
            :
            <select onChange={handleMinuteInput}>
                {!minuteTouched && <option selected={preset_minute === ""}>Minute</option>}
                {minutes.map((value, index) => <option key={index} selected={preset_minute !== "" && Number(preset_minute) === index * time_period}>{fillNumber(index * time_period)}</option>)}
            </select>
        </div>
    )
}

export default TimeInput;