/* eslint-disable react/prop-types */
import TimeCategoryInput from "./TimeCategoryInput";

function DayTimeInput ({DAYS, selected, day_times, setDayTimes}) {
    return (
        <div className="dayTimesInput">
            {DAYS.map((day, index) => {
                return (
                    <div className="day" key={index}>
                        <p className={day}>{day}</p>
                        <TimeCategoryInput day={day} 
                                           selected={selected} 
                                           day_times={day_times} 
                                           setDayTimes={setDayTimes}/>
                    </div>
                )
            })}
        </div>
    )
}

export default DayTimeInput;