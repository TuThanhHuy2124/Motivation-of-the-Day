import { useState } from "react"

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
    console.log(selected)
    const [unselected, setUnselected] = useState(OPTIONS.filter(option => {console.log(selected.indexOf(option)); return (selected.indexOf(option) === -1);}))
    console.log(unselected)

    const handleDiv = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        if(selected.indexOf(e.target.id) !== -1) { 
            setSelected(selected.filter(category => category !== e.target.id).sort())
            setUnselected([...unselected, e.target.id].sort()) 
        } 
        else { 
            setSelected([...selected, e.target.id].sort())
            setUnselected(unselected.filter(category => category !== e.target.id).sort())
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

export default SelectionDisplay