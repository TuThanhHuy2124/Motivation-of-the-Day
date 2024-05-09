/* eslint-disable react/prop-types */
import TimeCategoryInput from "./TimeCategoryInput";
import "./DayTimeInput.css"

function DayTimeInput ({DAYS, selected, day_times, setDayTimes}) {
    return (
        <div className="day-times-column">
            <h3>Time Slots</h3>
            <div className="day-times-input">
                {DAYS.map((day, index) => {
                    return (
                        <div className="weekday-container" key={index}>
                            <p className={day + " weekday"}>{day}</p>
                            <TimeCategoryInput day={day} 
                                               selected={selected} 
                                               day_times={day_times} 
                                               setDayTimes={setDayTimes}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DayTimeInput;