import { useState } from "react"
import Time from "./Time"

// eslint-disable-next-line react/prop-types
function TimeDropDown ({name}) {
    const [inputCounter, setInputCounter] = useState(1)

    const addInput = (e) => {
        console.log(e)
        e.preventDefault();
        setInputCounter(inputCounter + 1);
    }

    return (
        <>
            {Array(inputCounter).fill(null).map((elem, index) => <><Time key={index} name={name} index={index}/><br/></>)}
            <button onClick={addInput}>Add</button>
        </>
    )
}

export default TimeDropDown