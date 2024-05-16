import { useState } from "react";
import InfoInput from "../components/InfoInput";
import Loading from "../components/Loading";
import "./SignLogForgotReset.css";

export default function ForgotPassword() {
    const [status, setStatus] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [statusColor, setStatusColor] = useState(null);
    
    const handleForgotPassword = (e) => {
        e.preventDefault()
        console.log(e)
        const email = e.target[0].value;
        
        if(email === "") {
            setStatus("Missing email");
            setStatusColor("red");
        }
        else {
            setLoading(true);
            const params = new URLSearchParams({email: email});
            fetch(`${import.meta.env.VITE_BACKEND_URL}/forgotpassword?${params.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": import.meta.env.VITE_FRONTEND_URL
                }
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
            <div className="display" id="forgot-password-display">
                <form id="forgot-password-form" onSubmit={handleForgotPassword}>
                    <div id="forgot-password-info">
                        <h1>Forgot Your Password?</h1>
                        <h2>Enter your email below</h2>
                    </div>
                    <div id="forgot-password-container">
                        <InfoInput require_email={true}/>
                        <button type="submit" id="send-email-button">Send Email</button>
                    </div>
                </form>
                {(status !== null) && <p className={"status" + " " + statusColor}>{status}</p>}
            </div>
        </>
    )
}