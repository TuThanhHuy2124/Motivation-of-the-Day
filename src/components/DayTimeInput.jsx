/* eslint-disable react/prop-types */
import TimeDropDown from "./TimeDropDown";

function DayTimeInput ({DAYS, selected, day_times}) {
    return (
        <div className="dayTimesInput">
            {DAYS.map((day, index) => {
                return (
                    <div className="day" key={index}>
                        <p className={day}>{day}</p>
                        <TimeDropDown name={day} selected={selected} times={day_times[day]}/>
                    </div>
                )
            })}
        </div>
    )
}

export default DayTimeInput;