/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import "./SelectionDisplay.css"

const OPTIONS= ["anxiety",
                "change",
                "choice",
                "confidence",
                "courage",
                "death",
                "dreams",
                "excellence",
                "failure",
                "fairness",
                "fear",
                "forgiveness",
                "freedom",
                "future",
                "happiness",
                "inspiration",
                "kindness",
                "leadership",
                "life",
                "living",
                "love",
                "pain",
                "past",
                "success",
                "time",
                "today",
                "truth",
                "work"]

function SelectionDisplay({ selected, setSelected }) {
    const [unselected, setUnselected] = useState([]);

    useEffect(() => {
        setUnselected(OPTIONS.filter(option => selected.indexOf(option) === -1))
    }, [selected])

    const handleDiv = (e) => {
        e.preventDefault();
        
        if(selected.indexOf(e.target.id) !== -1) { 
            setSelected(selected.filter(category => category !== e.target.id).sort());
            setUnselected([...unselected, e.target.id].sort());
        } 
        else { 
            setSelected([...selected, e.target.id].sort());
            setUnselected(unselected.filter(category => category !== e.target.id).sort());
        }
    }
    
    
    return (
        <>
            <div className="unselected-display">
                <h3>Unselected</h3>
                <div className="unselected">
                    {unselected.map((option, index) => <button key={index} className="category" name={option} id={option} onClick={handleDiv}>{option}</button>)} 
                </div>
            </div>

            <div className="selected-display">
                <h3>Selected</h3>
                <div className="selected">
                    {selected.map((option, index) => <button key={index} className="category" name={option} id={option} onClick={handleDiv}>{option}</button>)} 
                </div>
            </div>
        </>
    )
}

export default SelectionDisplay;