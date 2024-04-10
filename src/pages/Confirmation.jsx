import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Confirmation() {
    const [submissionDisplay, setSubmissionDisplay] = useState(false)
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get("id")
    const email = queryParams.get("email")

    console.log(id, email)

    useEffect(() => {
        const verifyUser = async () => {
            fetch("/verifyuser", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    id: id
                })
            })
            .then(response => {
                if(response.ok) {
                    setSubmissionDisplay(true)
                }
                else {
                    console.log(response)
                }
            })
        }
        verifyUser()
    }, [])

    return (
        <>
            <h1>Thank you for verifying your email address</h1>
            <h2>You may now proceed to submit the form</h2>
            {submissionDisplay && <Link to={"/submission" + window.location.search}><button>Submission</button></Link>}
        </>
    )
}

export default Confirmation