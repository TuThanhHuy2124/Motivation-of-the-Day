import { Link } from "react-router-dom"
import "./Error.css";

function Error() {
    return(
        <div className="error-page">
            <h1>404</h1>
            <h2>Oops, you seems lost</h2>
            <Link to="/"><button>Back to Home</button></Link>
        </div>
    )
}

export default Error