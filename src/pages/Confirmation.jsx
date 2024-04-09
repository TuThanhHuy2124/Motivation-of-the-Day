import { useEffect } from "react";
import { useParams } from "react-router-dom"

function Confirmation() {
    const { id } = useParams();

    useEffect(() => {
        const verifyUser = async () => {
            fetch("/verifyuser", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            })
        }
        verifyUser()
    }, [])

    return (
        <>
            <h1>Thank you for verifying your email address</h1>
            <h2>You may now proceed to submit the form</h2>
        </>
    )
}

export default Confirmation