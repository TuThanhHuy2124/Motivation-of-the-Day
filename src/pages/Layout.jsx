import { Outlet, Link} from "react-router-dom"

function Layout () {

    return (
        <>
            <Link to="/import">Import Page</Link><br/>
            <Link to="/signup">Sign Up Page</Link><br/>
            <Outlet />
        </>
    )

}

export default Layout;