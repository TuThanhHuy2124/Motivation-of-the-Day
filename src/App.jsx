import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Submission from "./pages/Submission"
import Import from "./pages/Import"

function App () {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                        <Route path="/import" element={<Import />}></Route>
                        <Route path="/submission" element={<Submission />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App