/* eslint-disable react/prop-types */
import { useState } from "react";
import SelectedDropDown from "./SelectedDropDown";
import Time from "./Time";

function TimeDropDown ({name, selected, times}) {
    console.log(times,(times === undefined) ? 0 : times.length);
    const [inputCounter, setInputCounter] = useState(0);

    const addInput = (e) => {
        e.preventDefault();
        setInputCounter(inputCounter + 1);
    }

    return (
        <>
            {(times !== undefined) && 
            times.map((time_obj, index) => {
                console.log(inputCounter);
                return (
                <>
                    <Time key={index} 
                          name={name} 
                          index={index} 
                          preset_time={time_obj["time"]}/>
                    <SelectedDropDown selected={selected} 
                                      name={name} 
                                      index={index} 
                                      preset_category={
                                        (time_obj["category"].length === 1) ? 
                                        time_obj["category"][0] : "mixed"
                                      }/><br/>
                </>)})}
            {Array(inputCounter).fill(null).map((elem, index) => 
                <>
                    <Time key={index} 
                          name={name} 
                          index={index}/>
                    <SelectedDropDown selected={selected} 
                                      name={name} 
                                      index={index}/><br/>
                </>)}
            <button onClick={addInput}>Add</button>
        </>
    )
}

export default TimeDropDown;