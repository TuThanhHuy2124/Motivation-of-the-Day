import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Submission from "./pages/Submission";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Confirmation from "./pages/Confirmation";

function App () {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                        <Route path="/" element={<SignUp />}></Route>
                        <Route path="/login" element={<LogIn />}></Route>
                        <Route path="/submission" element={<Submission />}></Route>
                        <Route path="/confirmation" element={<Confirmation />}></Route>
                </Route>
                <Route path="*" element={<h1>Oops, there's nothing here</h1>}/>
            </Routes>
        </BrowserRouter>
    )

}

export default App;