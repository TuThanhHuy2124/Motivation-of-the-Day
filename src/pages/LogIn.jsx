import { useEffect, useState } from "react";
import InfoInput from "../components/InfoInput";
import "./Form.css";
import Loading from "../components/Loading";

function LogIn () {
    const [status, setStatus] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [statusColor, setStatusColor] = useState(null);
    const [authenticationInfo, setAuthenticationInfo] = useState(null);

    const handleImport = (e) => {
        e.preventDefault();
        const [email, password] = [e.target[0].value, e.target[1].value];
        const params = new URLSearchParams({
            email: email,
            password: password
        });
        console.log(params.toString()); 
        setLoading(true);
        fetch(`${import.meta.env.VITE_BACKEND_URL}/authenticateuser?${params.toString()}`, {method: "GET"})
            .then(response => {
                if(response.ok) {
                    response.json().then(data => {
                        console.log(data);
                        setAuthenticationInfo(data);
                        setStatus("User's data imported");
                        setStatusColor("green");
                    })
                }
                else {
                    response.json().then(data => {
                        console.log(data);
                        setStatus(data["response"]);
                        setStatusColor("red");
                    })
                }
                setLoading(false);
            })
            
    }

    useEffect(() => {
        if(authenticationInfo !== null) {
            const nextParams = new URLSearchParams(authenticationInfo);
            window.location.href = `http://localhost:5173/submission?${nextParams.toString()}`;
        }
    }, [authenticationInfo])

    return (
        <>
        {isLoading && <Loading/>}
        <form className="input-form" onSubmit={handleImport}>
            <div className="input-container">
                <InfoInput require_email={true}
                           require_password={true}/>
                <button className="input-button" type="submit">Log In</button>
            </div>
            {(status !== null) && <p className={"status" + " " + statusColor}>{status}</p>}
        </form>
        </>
    )

}

export default LogIn;