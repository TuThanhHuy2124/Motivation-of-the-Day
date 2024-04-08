import EmailInput from "../components/EmailInput";

function Import () {

    const handleImport = (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const params = new URLSearchParams({email: email});
        fetch(`/getuser?${params.toString()}`, {method: "GET"})
            .then(response => response.json())
            .then(data => console.log(data))
    }

    return (
        <form onSubmit={handleImport}>
            <EmailInput/>
            <button type="submit">Import</button>
        </form>
    )

}

export default Import