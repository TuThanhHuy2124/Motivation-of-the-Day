import { useEffect, useState } from "react";
import InfoInput from "../components/InfoInput";
import Loading from "../components/Loading";
import "./Form.css";

function SignUp () {
    const [status, setStatus] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [statusColor, setStatusColor] = useState(null);
    
    useEffect(() => {
        setTimeout(() => setStatus(null), 3000);
    }, [status])

    const handleSignUp = (e) => {
        e.preventDefault();
        const [first_name, 
               last_name, 
               email, 
               password, 
               password_confirmation] = [e.target[0].value,
                                         e.target[1].value, 
                                         e.target[2].value,
                                         e.target[3].value, 
                                         e.target[4].value];
        if((password === password_confirmation) && (password.length >= 8)) {
            setLoading(true)
            fetch(`${import.meta.env.VITE_BACKEND_URL}/signupuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: Math.random().toString(36).slice(2) + 
                        Math.random().toString(36).slice(2),
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password,
                    confirmed: false,
                })
            })
            .then(response => {
                if(response.ok) { setStatusColor("green"); }
                else { setStatusColor("red"); }
                response.json().then(data => setStatus(data["response"]));
                setLoading(false);
            })
        } else if (password.length < 8) {
            setStatus("Password needs to have at least 8 characters");
            setStatusColor("red");
        } else {
            setStatus("Password mismatched");
            setStatusColor("red");
        }
    }

    return (
        <>
        {isLoading && <Loading/>}
        <form className="input-form" onSubmit={handleSignUp}>
            <div className="input-container">
                <InfoInput require_names={true} 
                           require_email={true} 
                           require_password={true} 
                           require_password_confirmation={true}/>
                <button className="input-button" type="submit">Sign Up</button>
            </div>
        </form>
        {(status !== null) && <p className={"status" + " " + statusColor}>{status}</p>}
        </>
    )

}

export default SignUp;