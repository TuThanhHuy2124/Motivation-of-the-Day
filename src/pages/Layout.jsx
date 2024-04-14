import { Outlet, Link} from "react-router-dom";
import "./Layout.css";

function Layout () {

    return (
        <div>
            <h1 className="title">Motivation of the Day</h1>
            <nav>
                <div className="hover-trigger"></div>
                <ul>
                    <li><Link to="/import">Import</Link><br/></li>
                    <li><Link to="/">Sign Up</Link><br/></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )

}

export default Layout;