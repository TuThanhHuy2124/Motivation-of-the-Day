import { Link } from "react-router-dom"
import "./ConfirmReject.css"

function Rejection() {
    return (
        <div className="rejection">
            <div className="rejection-container">
                    <h1 className="line-1">You have already verified your email</h1>
                    <h2 className="line-2">Please use <Link to="/import">Import</Link> to load your data</h2>
            </div>
        </div>
    )
}

export default Rejection