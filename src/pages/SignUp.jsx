import { useEffect, useState } from "react";
import InfoInput from "../components/InfoInput";
import "./Form.css";

function SignUp () {
    const [status, setStatus] = useState(null);
    const [statusColor, setStatusColor] = useState(null);

    useEffect(() => {
        setTimeout(() => setStatus(null), 3000);
    }, [status])

    const handleSignUp = (e) => {
        e.preventDefault();
        const [first_name, last_name, email] = [e.target[0].value, e.target[1].value, e.target[2].value];
        console.log(first_name, last_name, email);
        fetch(`/signupuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: Math.random().toString(36).slice(2),
                first_name: first_name,
                last_name: last_name,
                email: email,
                confirmed: false,
            })
        })
        .then(response => {
            if(response.ok) { setStatusColor("green"); }
            else { setStatusColor("red"); }
            response.json().then(data => setStatus(data["response"]));
        })
    }

    return (
        <>
        <form className="input-form" onSubmit={handleSignUp}>
            <div className="input-container">
                <InfoInput/>
                <button className="input-button" type="submit">Sign Up</button>
            </div>
        </form>
        {(status !== null) && <p className={"status" + " " + statusColor}>{status}</p>}
        </>
    )

}

export default SignUp;