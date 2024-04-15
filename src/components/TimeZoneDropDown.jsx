const UTCs = [
    ["UTC-12:00", -12],
    ["UTC-11:00", -11],
    ["UTC-10:00", -10],
    ["UTC-09:30", -9.5],
    ["UTC-09:00", -9],
    ["UTC-08:00", -8],
    ["UTC-07:00", -7],
    ["UTC-06:00", -6],
    ["UTC-05:00", -5],
    ["UTC-04:00", -4],
    ["UTC-03:30", -3.5],
    ["UTC-03:00", -3],
    ["UTC-02:00", -2],
    ["UTC-01:00", -1],
    ["UTC", 0],
    ["UTC+01:00", 1],
    ["UTC+02:00", 2],
    ["UTC+03:00", 3],
    ["UTC+03:30", 3.5],
    ["UTC+04:00", 4],
    ["UTC+04:30", 4.5],
    ["UTC+05:00", 5],
    ["UTC+05:30", 5.5],
    ["UTC+05:45", 5.75],
    ["UTC+06:00", 6],
    ["UTC+06:30", 6.5],
    ["UTC+07:00", 7],
    ["UTC+08:00", 8],
    ["UTC+08:45", 8.75],
    ["UTC+09:00", 9],
    ["UTC+09:30", 9.5],
    ["UTC+10:00", 10],
    ["UTC+10:30", 10.5],
    ["UTC+11:00", 11],
    ["UTC+12:00", 12],
    ["UTC+12:45", 12.75],
    ["UTC+13:00", 13],
    ["UTC+14:00", 14],
]

// eslint-disable-next-line react/prop-types
const TimeZoneDropDown = ({ preset_timezone, setTimezone }) => {

    const handleTimeZoneChange = (e) => {setTimezone(Number(e.target[e.target.selectedIndex].value));}

    const initializeTimezone = () => {
        if(preset_timezone === null) { 
            setTimezone(-12);
            return -12;
        }
        return preset_timezone;
    }

    return (
        <>
            <a href="https://www.google.com/search?q=my+time+zone" target="_blank"><button>Your Time Zone</button></a><br/>
            <select onChange={handleTimeZoneChange}>
                {UTCs.map(([display_UTC, UTC_value], index) => {
                    return <option key={index} value={UTC_value} selected={UTC_value === initializeTimezone()}>{display_UTC}</option>
                })}
            </select>
        </>
    )
}

export default TimeZoneDropDown