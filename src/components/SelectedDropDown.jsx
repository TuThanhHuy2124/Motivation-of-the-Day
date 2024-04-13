/* eslint-disable react/prop-types */
function SelectedDropDown ({ selected, name, index, preset_category }) {
    return (
        <select className="chosen-category" id={name + "-" + index}>
            {(selected.length > 1) && <option id="mixed">mixed</option>}
            {selected.map((option, index) => 
                <option key={index} id={option} selected={preset_category === option}>
                    {option}
                </option>)}
        </select>
    )

}

export default SelectedDropDown;