import { useState } from "react";
import InfoInput from "../components/InfoInput";

function Import () {
    const [authenticated, setAuthenticated] = useState(false);

    const handleImport = (e) => {
        e.preventDefault();
        const [first_name, last_name, email] = [e.target[0].value, e.target[1].value, e.target[2].value];
        const params = new URLSearchParams({
            email: email,
            first_name: first_name,
            last_name: last_name
        });
        console.log(params.toString())
        fetch(`/getuser?${params.toString()}`, {method: "GET"})
            .then(response => {
                if(response.ok) {
                    return response.json().then(data => {
                        console.log(data);
                        window.location.href = `localhost:5137/submission?${params.toString()}`
                    })
                }
                else {
                    console.log(response)
                }
            })
            
    }

    return (
        <form onSubmit={handleImport}>
            <InfoInput/><br/>
            <button type="submit">Import</button>
        </form>
    )

}

export default Import