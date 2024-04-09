import InfoInput from "../components/InfoInput";

function SignUp () {
    
    const handleSignUp = (e) => {
        e.preventDefault();
        const [first_name, last_name, email] = [e.target[0].value, e.target[1].value, e.target[2].value];
        console.log(first_name, last_name, email)
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
                day_times: [],
                confirmed: false,
                confirmed_date: null,
            })
        }).then(response => {
            if(response.ok) {
                return response.json()
            }
            else {
                console.log(response); 
            }
        })
    }

    return (
        <form onSubmit={handleSignUp}>
            <InfoInput/><br/>
            <button type="submit">Sign Up</button>
        </form>
    )

}

export default SignUp