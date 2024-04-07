import EmailInput from "../components/EmailInput";

function Import () {

    const handleImport = (e) => {
        e.preventDefault();
        const email = e.target[0].value;

        let url = new URL("/getuser");
        let params = url.searchParams;
        params.append("email", email)

        console.log(url.toString())
        //fetch(`/getuser/email=${esc(email)}`, {method: "GET"});
    }

    return (
        <form onSubmit={handleImport}>
            <EmailInput/>
            <button type="submit">Import</button>
        </form>
    )

}

export default Import