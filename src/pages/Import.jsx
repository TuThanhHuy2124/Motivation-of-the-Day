import { useEffect, useState } from "react";
import InfoInput from "../components/InfoInput";

function Import () {
    const [authenticationInfo, setAuthenticationInfo] = useState(null);

    const handleImport = (e) => {
        e.preventDefault();
        const [first_name, last_name, email] = [e.target[0].value, e.target[1].value, e.target[2].value];
        const params = new URLSearchParams({
            email: email,
            first_name: first_name,
            last_name: last_name
        });
        console.log(params.toString())
        fetch(`/authenticateuser?${params.toString()}`, {method: "GET"})
            .then(response => {
                if(response.ok) {
                    return response.json().then(data => {
                        console.log(data);
                        setAuthenticationInfo(data);
                    })
                }
                else {
                    console.log(response)
                }
            })
            
    }

    useEffect(() => {
        if(authenticationInfo !== null) {
            const nextParams = new URLSearchParams(authenticationInfo)
            window.location.href = `http://localhost:5173/submission?${nextParams.toString()}`
        }
    }, [authenticationInfo])

    return (
        <form onSubmit={handleImport}>
            <InfoInput/><br/>
            <button type="submit">Import</button>
        </form>
    )

}

export default Import