import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Submission from "./pages/Submission";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Confirmation from "./pages/Confirmation";
import About from "./pages/About";
import Error from "./pages/Error";

function App () {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout loggedin={false}/>}>
                        <Route path="/" element={<About />}></Route>
                        <Route path="/signup" element={<SignUp />}></Route>
                        <Route path="/login" element={<LogIn />}></Route>
                        <Route path="/confirmation" element={<Confirmation />}></Route>
                </Route>
                <Route path="/submission" element={<Layout loggedin={true}/>}>
                    <Route path="/submission" element={<Submission />}></Route>
                </Route>
                <Route path="*" element={<Error />}/>
            </Routes>
        </BrowserRouter>
    )

}

export default App;