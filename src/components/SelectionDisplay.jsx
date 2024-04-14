/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import "./SelectionDisplay.css"

const OPTIONS= ['age', 
                'alone', 
                'amazing', 
                'anger', 
                'architecture', 
                'art', 
                'attitude', 
                'beauty', 
                'best', 
                'birthday', 
                'business', 
                'car', 
                'change', 
                'communication', 
                'computers', 
                'cool', 
                'courage', 
                'dad', 
                'dating', 
                'death', 
                'design', 
                'dreams', 
                'education', 
                'environmental', 
                'equality', 
                'experience', 
                'failure', 
                'faith', 
                'family', 
                'famous', 
                'fear', 
                'fitness', 
                'food', 
                'forgiveness', 
                'freedom', 
                'friendship', 
                'funny', 
                'future', 
                'god', 
                'good', 
                'government', 
                'graduation', 
                'great', 
                'happiness', 
                'health', 
                'history', 
                'home', 
                'hope', 
                'humor', 
                'imagination', 
                'inspirational', 
                'intelligence', 
                'jealousy', 
                'knowledge', 
                'leadership', 
                'learning', 
                'legal', 
                'life', 
                'love', 
                'marriage', 
                'medical', 
                'men', 
                'mom', 
                'money', 
                'morning', 
                'movies', 
                'success']

function SelectionDisplay({ selected, setSelected }) {
    const [unselected, setUnselected] = useState([]);

    useEffect(() => {
        setUnselected(OPTIONS.filter(option => selected.indexOf(option) === -1))
    }, [selected])

    const handleDiv = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        
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
            <div className="unselected">
                <h3>Unselected</h3>
                {unselected.map((option, index) => <div key={index} className="category" name={option} id={option} onClick={handleDiv}>{option}</div>)} 
            </div>

            <div className="selected">
                <h3>Selected</h3>
                {selected.map((option, index) => <div key={index} className="category" name={option} id={option} onClick={handleDiv}>{option}</div>)} 
            </div>
        </>
    )
}

export default SelectionDisplay;