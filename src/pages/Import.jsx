import { useEffect, useState } from "react";
import InfoInput from "../components/InfoInput";
import "./Form.css";

function Import () {
    const [status, setStatus] = useState(null);
    const [statusColor, setStatusColor] = useState(null);
    const [authenticationInfo, setAuthenticationInfo] = useState(null);

    const handleImport = (e) => {
        e.preventDefault();
        const [first_name, last_name, email] = [e.target[0].value, e.target[1].value, e.target[2].value];
        const params = new URLSearchParams({
            email: email,
            first_name: first_name,
            last_name: last_name
        });
        console.log(params.toString()); 
        fetch(`/authenticateuser?${params.toString()}`, {method: "GET"})
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
            })
            
    }

    useEffect(() => {
        if(authenticationInfo !== null) {
            const nextParams = new URLSearchParams(authenticationInfo);
            window.location.href = `http://localhost:5173/submission?${nextParams.toString()}`;
        }
    }, [authenticationInfo])

    return (
        <form className="input-form" onSubmit={handleImport}>
            <div className="input-container">
                <InfoInput require_email={true}
                           require_password={true}
                           require_names={true}/>
                <button className="input-button" type="submit">Import</button>
            </div>
            {(status !== null) && <p className={"status" + " " + statusColor}>{status}</p>}
        </form>
    )

}

export default Import;