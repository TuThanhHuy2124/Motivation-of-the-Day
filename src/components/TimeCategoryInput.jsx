/* eslint-disable react/prop-types */
import SelectedDropDown from "./SelectedDropDown";
import TimeInput from "./TimeInput";

function TimeCategoryInput ({day, selected, day_times, setDayTimes}) {
    const times = day_times[day];

    const addInput = (e) => {
        e.preventDefault();
        const dayTimesCopy = {...day_times};

        if(Object.prototype.hasOwnProperty.call(dayTimesCopy, day)) {
            dayTimesCopy[day].push({
                time: "",
                category: []
            })
        }
        else {
            dayTimesCopy[day] = [{
                    time: "",
                    category: []
                }]
        }
        
        setDayTimes(dayTimesCopy);
    }

    const removeInput = (e) => {
        e.preventDefault();
        const [e_day, e_index] = e.target.className.split(" ");
        const dayTimesCopy = {...day_times};

        dayTimesCopy[e_day].splice(e_index, 1)
        console.log(dayTimesCopy, e)
        
        setDayTimes(dayTimesCopy)
    }

    const getPresetCategory = (time_obj) => {
        if (time_obj["category"].length === 0) { return "blank"; } 
        else if (time_obj["category"].length === 1) { return time_obj["category"][0]; }
        else { return "mixed"; } 
    }

    return (
        <>
            {(times !== undefined) && 
            times.map((time_obj, index) => {
                console.log(time_obj)
                return (
                <div key={index}>
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
                    <button className={day + " " + index}onClick={removeInput}>X</button><br/>
                </div>)})}
            <button onClick={addInput}>Add</button>
        </>
    )
}

export default TimeCategoryInput;