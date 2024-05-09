import { Link } from "react-router-dom";
import "./About.css";

function About () {

    return (
        <div className="display" id="about-display">
            <h1 id="welcome">Welcome to Pocket Motivator!</h1>
            <h3 id="sub-welcome">Your companion through hard times</h3>
            <p id="intro"><Link to="/signup">Create an account</Link> with us and start receiving motivational emails of your chosen topics at your chosen times</p>
        </div>
    )

}

export default About;