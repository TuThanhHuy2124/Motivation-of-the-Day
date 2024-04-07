import TimeDropDown from "./TimeDropDown"

function DayTimeInput () {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return (
        <div className="dayTimesInput">
            {days.map((day, index) => {
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