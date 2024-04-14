import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Confirmation.css"

function Confirmation() {
    const [statusColor, setStatusColor] = useState(null);
    const [submissionDisplay, setSubmissionDisplay] = useState(null);
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const email = queryParams.get("email");

    console.log(id, email);

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
                    setStatusColor("green");
                    setSubmissionDisplay(true);
                }
                else {
                    setStatusColor("red");
                    setSubmissionDisplay(false);
                }
            })
        }
        verifyUser();
    }, [])

    return (
        <div className="confirmation">
            {
                submissionDisplay ? 
                    <div className="confirmation-container">
                        <h1 className="line-1">Thank you for verifying your email address</h1>
                        <h2 className="line-2">You may now proceed to submit the form</h2>
                        <Link to={"/submission" + window.location.search}><button>Submission</button></Link>
                    </div> :
                    <div className="confirmation-container">
                        <h1 className="line-1">You have already verified your email</h1>
                        <h2 className="line-2">Please use <Link to="/import">Import</Link> to load your data</h2>
                    </div>
            }
        </div>
    )
}

export default Confirmation;