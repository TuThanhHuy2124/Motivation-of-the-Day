import "./InfoInput.css"

function InfoInput () {
    return (
        <>
            <div className="first-name-container">
                <label htmlFor="first_name">First Name: </label>
                <input name="first_name" id="first-name"></input><br/>
            </div>
            <div className="last-name-container">
                <label htmlFor="last_name">Last Name: </label>
                <input name="last_name" id="last-name"></input><br/>
            </div>
            <div className="email-container">
                <label htmlFor="email">Email: </label>
                <input name="email" id="email"></input>
            </div>
        </>
    )
}

export default InfoInput;