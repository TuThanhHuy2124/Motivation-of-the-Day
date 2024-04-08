import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Submission from "./pages/Submission"
import SignUp from "./pages/SignUp"
import Import from "./pages/Import"
import Confirmation from "./pages/Confirmation"

function App () {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                        <Route path="/import" element={<Import />}></Route>
                        <Route path="/submission" element={<Submission />}></Route>
                        <Route path="/signup" element={<SignUp />}></Route>
                        <Route path="/confirmation/:id" element={<Confirmation />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App