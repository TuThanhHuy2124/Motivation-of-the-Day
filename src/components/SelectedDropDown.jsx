import { useState } from "react";
import "./SelectedDropDown.css"

/* eslint-disable react/prop-types */
function SelectedDropDown ({ selected, day, index, preset_category, day_times, setDayTimes }) {
    const [dropDownTouched, setDropDownTouched] = useState(preset_category !== "blank");

    const handleSelectedDropDown = (e) => {
        setDropDownTouched(true);
        e.preventDefault();
        const dayTimesCopy = {...day_times};

        if(e.target.value !== "Category") {
            dayTimesCopy[day][index].category = (e.target.value === "mixed") ? selected : [e.target.value];
        } 
        else {
            dayTimesCopy[day][index].category = [];
        }

        setDayTimes(dayTimesCopy);
    }

    return (
        <select className="chosen-category" id={day + "-" + index} onChange={handleSelectedDropDown}>
            {!dropDownTouched && <option id="blank" selected={preset_category === "blank"}>Category</option>}
            {(selected.length > 1) && <option id="mixed" selected={preset_category === "mixed"}>mixed</option>}
            {selected.map((option, index) => 
                <option key={index} id={option} selected={preset_category === option}>
                    {option}
                </option>)}
        </select>
    )

}

export default SelectedDropDown;