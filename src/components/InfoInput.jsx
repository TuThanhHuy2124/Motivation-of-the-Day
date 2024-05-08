import "./InfoInput.css"

// eslint-disable-next-line react/prop-types
function InfoInput ({require_names, require_email, require_password, require_password_confirmation}) {
    return (
        <div className="info-input">
            {
            require_names &&
            <div className="names-container">
                <div className="first-name-container">
                    <label htmlFor="first_name">First Name </label>
                    <input name="first_name" id="first-name"></input><br/>
                </div>
                <div className="last-name-container">
                    <label htmlFor="last_name">Last Name </label>
                    <input name="last_name" id="last-name"></input><br/>
                </div>
            </div>
            }
            {
            require_email &&
                <div className="email-container">
                    <label htmlFor="email">Email </label>
                    <input name="email" id="email"></input><br/>
                </div>
            }
            <div className="password-pack-container">
            {
            require_password &&    
                <div className="password-container">
                    <label htmlFor="password">Password </label>
                    <input name="password" id="password" type="password"></input><br/>
                </div>
            }
            {
            require_password_confirmation &&
                <div className="password-confirmation-container">
                    <label htmlFor="password-confirmation">Confirm Your Password </label>
                    <input name="password-confirmation" id="password-confirmation" type="password"></input><br/>
                </div>
            }
            </div>
        </div>
    )
}

export default InfoInput;