// eslint-disable-next-line react/prop-types
function SelectedDropDown ({ selected }) {

    return (
        <select>
            <option>Mixed</option>
            {selected.map((option, index) => <option key={index}>{option}</option>)}
        </select>
    )

}

export default SelectedDropDown