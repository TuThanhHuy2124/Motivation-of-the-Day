/* eslint-disable react/prop-types */
import TimeDropDown from "./TimeDropDown"

function DayTimeInput ({DAYS}) {

    return (
        <div className="dayTimesInput">
            {DAYS.map((day, index) => {
                return (
                    <div className="day" key={index}>
                        <p className={day}>{day}</p>
                        <TimeDropDown name={day} />
                    </div>
                )
            })}
        </div>
    )
}

export default DayTimeInput