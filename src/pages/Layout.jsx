import { Outlet, Link} from "react-router-dom";
import "./Layout.css";

function Layout () {

    return (
        <>
        <header>
            <h1 className="title">Pocket Motivator</h1>
            <nav>
                <Link to="/"><button>About</button></Link>
                <Link to="/signup"><button>Sign Up</button></Link>
                <Link to="/login"><button>Log In</button></Link>
            </nav>
        </header>
        <Outlet />
        <footer>
            <div id="icon-container">
                <a href="https://www.linkedin.com/in/thanhhuytu" target="_blank"><img className="icon" id="linkedin-icon" src="icon/linkedin.png"/></a>
                <a href="https://github.com/TuThanhHuy2124/Pocket-Motivator" target="_blank"><img className="icon" id="github-icon" src="icon/github.png"/></a>
                <a href="https://www.facebook.com/profile.php?id=100041434789106" target="_blank"><img className="icon" id="facebook-icon" src="icon/facebook.png"/></a>
                <a href="https://www.instagram.com/tuhuyne123/" target="_blank"><img className="icon" id="instagram-icon" src="icon/instagram.png"/></a>
            </div>
            <h3 className="title" id="secondary-title">Pocket Motivator</h3>
            <a href="mailto:tuthanhhuy2004@gmail.com"><button id="contact-me">Contact Me</button></a>
        </footer>
        </>
    )

}

export default Layout;