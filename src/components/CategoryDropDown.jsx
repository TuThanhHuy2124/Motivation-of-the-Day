function CategoryDropDown() {
    const options= ['age', 
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
    return (
        <div className="categories">
        {options.map((option, index) => {
            return (
                <div key={index}>
                    <label htmlFor={option}>{option}</label>
                    <input type="checkbox" className="category" name={option} id={option}/><br/>
                </div>
            )
        })} 
        </div>
    )
}

export default CategoryDropDown