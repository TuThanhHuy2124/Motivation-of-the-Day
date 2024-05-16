import { useState } from "react";
import InfoInput from "../components/InfoInput";
import Loading from "../components/Loading";
import "./SignLogForgotReset.css";

export default function ResetPassword() {
    const [status, setStatus] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [statusColor, setStatusColor] = useState(null);
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    
    const handleResetPassword = (e) => {
        e.preventDefault()
        console.log(e)
        const [password, password_confirmation] = [e.target[0].value, e.target[1].value];
        
        if(password === "") {
            setStatus("Missing password");
            setStatusColor("red");
        }
        else if(password_confirmation === "") {
            setStatus("Missing password confirmation");
            setStatusColor("red");
        }
        else if(password !== password_confirmation) {
            setStatus("Password does not match");
            setStatusColor("red");
        }
        else {
            setLoading(true);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/resetpassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": import.meta.env.VITE_FRONTEND_URL
                },
                body: JSON.stringify({
                    id: id,
                    password: password
                })
            })
            .then(response => {
                console.log(response)
                if(response.ok) {
                    response.json().then(data => {
                        setStatus(data.response);
                        setStatusColor("green");
                        window.location.href = `https://pocket-motivator.netlify.app/login`;
                    })
                }
                else {
                    response.json().then(data => {
                        setStatus(data.response);
                        setStatusColor("red");
                    })
                }
                setLoading(false);
            })
        }
    }

    return (
        <>
            {isLoading && <Loading/>}
            <div className="display" id="reset-password-display">
                <form id="reset-password-form" onSubmit={handleResetPassword}>
                    <div id="reset-password-info">
                        <h1>Forgot Your Password?</h1>
                        <h2>Enter your email below</h2>
                    </div>
                    <div id="reset-password-container">
                        <InfoInput require_password={true}
                                   require_password_confirmation={true}/>
                        <button type="submit" id="reset-password-button">Reset Password</button>
                    </div>
                </form>
                {(status !== null) && <p className={"status" + " " + statusColor}>{status}</p>}
            </div>
        </>
    )
}