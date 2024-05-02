import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading.jsx";
import "./Confirmation.css"

function Confirmation() {
    const [statusColor, setStatusColor] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [submissionDisplay, setSubmissionDisplay] = useState(null);
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");

    useEffect(() => {
        const verifyUser = async () => {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/verifyuser`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
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
                setLoading(false);
            })
        }
        verifyUser();
    }, [])

    return (
        <div className="confirmation">
            {
                isLoading ? <Loading/> :
                    submissionDisplay ? 
                        <div className="confirmation-container">
                            <h1 className="line-1">Thank you for verifying your email address</h1>
                            <h2 className="line-2">You may now proceed to submit the form</h2>
                            <Link to={"/submission" + window.location.search}><button>Submission</button></Link>
                        </div> :
                        <div className="confirmation-container">
                            <h1 className="line-1">You have already verified your email</h1>
                            <h2 className="line-2">Please use <Link to="/login">Log In</Link> to load your data</h2>
                        </div>
            }
        </div>
    )
}

export default Confirmation;