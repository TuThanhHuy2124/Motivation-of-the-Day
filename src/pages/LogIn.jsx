import { useEffect, useState } from "react";
import InfoInput from "../components/InfoInput";
import "./SignUpLogIn.css";
import Loading from "../components/Loading";

function LogIn () {
    const [status, setStatus] = useState(null);
    const [remember, setRemember] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [statusColor, setStatusColor] = useState(null);
    
    useEffect(() => {if(localStorage.getItem("id") !== null) {window.location.href = `https://motivation-of-the-day.netlify.app/submission`;}}, [])
    const handleLogIn = (e) => {
        e.preventDefault();
        const [email, password] = [e.target[0].value, e.target[1].value];
        const params = new URLSearchParams({
            email: email,
            password: password
        });
        setLoading(true);
        fetch(`${import.meta.env.VITE_BACKEND_URL}/authenticateuser?${params.toString()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Origin": import.meta.env.VITE_FRONTEND_URL
                    }
                })
            .then(response => {
                if(response.ok) {
                    response.json().then(data => {
                        if (remember) {localStorage.setItem("id", data.id); console.log("Save in localStorage")}
                        else sessionStorage.setItem("id", data.id); console.log("Save in sessionStorage");
                        setStatus("User's data imported");
                        setStatusColor("green");
                        window.location.href = `https://motivation-of-the-day.netlify.app/submission`;
                    })
                }
                else {
                    response.json().then(data => {
                        setStatus(data["response"]);
                        setStatusColor("red");
                    })
                }
                setLoading(false);
            })
            
    }

    return (
        <>
        {isLoading && <Loading/>}
        <div className="display" id="log-in-display">
            <div id="log-in-quote-display">
                <p id="log-in-quote">“Live as if you were to die tomorrow. Learn as if you were to live forever.”</p>
                <p id="log-in-author">- Mahatma Gandhi -</p>
            </div>
            <form id="log-in-form" onSubmit={handleLogIn}>
                <div id="log-in-info">
                    <h1>Log In</h1>
                    <h2>Start receiving inspirational emails here!</h2>
                </div>
                <div id="log-in-container">
                    <InfoInput require_email={true}
                               require_password={true}
                               require_remember={true}
                               remember={remember}
                               setRemember={setRemember}/>
                    <button id="log-in-button" type="submit">Log In</button>
                </div>
            </form>
            {(status !== null) && <p className={"status" + " " + statusColor}>{status}</p>}
        </div>
        </>
    )

}

export default LogIn;