// eslint-disable-next-line react/prop-types
function SelectedDropDown ({ selected, name, index }) {

    return (
        <select className="chosen-category" id={name + "-" + index}>
            {(selected.length > 1) && <option id="mixed">mixed</option>}
            {selected.map((option, index) => <option key={index} id={option}>{option}</option>)}
        </select>
    )

}

export default SelectedDropDown