import InfoInput from "../components/InfoInput";

function Import () {

    const handleImport = (e) => {
        e.preventDefault();
        const email = e.target[2].value;
        const params = new URLSearchParams({email: email});
        console.log(params.toString())
        fetch(`/getuser?${params.toString()}`, {method: "GET"})
            .then(response => response.json())
            .then(data => console.log(data))
    }

    return (
        <form onSubmit={handleImport}>
            <InfoInput/><br/>
            <button type="submit">Import</button>
        </form>
    )

}

export default Import