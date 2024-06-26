/* eslint-disable react/prop-types */
import SelectedDropDown from "./SelectedDropDown";
import TimeInput from "./TimeInput";
import "./TimeCategoryInput.css"

function TimeCategoryInput ({day, selected, day_times, setDayTimes}) {
    const times = day_times[day];

    const addInput = (e) => {
        e.preventDefault();
        const dayTimesCopy = {...day_times};
        const baseObj = {
            time: ":",
            category: []
        }

        if(Object.prototype.hasOwnProperty.call(dayTimesCopy, day)) {dayTimesCopy[day].push(baseObj)}
        else {dayTimesCopy[day] = [baseObj]}
        
        setDayTimes(dayTimesCopy);
    }

    const removeInput = (e) => {
        e.preventDefault();
        const [e_day, e_index] = e.target.className.split(" ");
        const dayTimesCopy = {...day_times};

        dayTimesCopy[e_day].splice(e_index, 1)
        
        setDayTimes(dayTimesCopy)
    }

    const getPresetCategory = (time_obj) => {
        if (time_obj["category"].length === 0) { return "blank"; } 
        else if (time_obj["category"].length === 1) { return time_obj["category"][0]; }
        else { return "mixed"; } 
    }

    return (
        <>
            <button onClick={addInput} id="add-button">+</button>
            {(times !== undefined) && 
            times.map((time_obj, index) => {
                return (
                <div key={index} className="time-category-container">
                    <TimeInput day={day} 
                               index={index} 
                               day_times={day_times}
                               setDayTimes={setDayTimes}
                               preset_time={time_obj["time"]}/>
                    <SelectedDropDown selected={selected} 
                                      day={day} 
                                      index={index} 
                                      day_times={day_times}
                                      setDayTimes={setDayTimes}
                                      preset_category={getPresetCategory(time_obj)}/>
                    <button className={day + " " + index} id="remove-button" onClick={removeInput}>X</button>
                </div>)})}
        </>
    )
}

export default TimeCategoryInput;