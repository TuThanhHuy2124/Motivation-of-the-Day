import TimeDropDown from "./TimeDropDown"

function DayTimeInput () {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return (
        <div className="dayTimesInput">
            {days.map((day, index) => {
                return (
                    <div key={index}>
                        <input name={day} id={day} className="day" type="checkbox"></input>
                        <label htmlFor={day}>{day}</label><br/>
                        <TimeDropDown name={day} />
                    </div>
                )
            })}
        </div>
    )
}

export default DayTimeInput