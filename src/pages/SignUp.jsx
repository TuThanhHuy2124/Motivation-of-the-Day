import EmailInput from "../components/EmailInput";

function SignUp () {

    const handleSignUp = (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        fetch(`/signupuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: Math.random().toString(36).slice(2),
                confirmed: false,
                email: email
            })
        })
    }

    return (
        <form onSubmit={handleSignUp}>
            <EmailInput/>
            <button type="submit">Sign Up</button>
        </form>
    )

}

export default SignUp