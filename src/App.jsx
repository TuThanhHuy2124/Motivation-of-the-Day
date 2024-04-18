import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Submission from "./pages/Submission";
import SignUp from "./pages/SignUp";
import Import from "./pages/Import";
import Confirmation from "./pages/Confirmation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Rejection from "./pages/Rejection";

function App () {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                        <Route path="/" element={<SignUp />}></Route>
                        <Route path="/import" element={<Import />}></Route>
                        <Route path="/submission" element=
                            {<ErrorBoundary fallback={<h1>Something went wrong</h1>}>
                                <Suspense fallback={<h1>Loading...</h1>}>
                                    <Submission />
                                </Suspense>
                            </ErrorBoundary>}>
                        </Route>
                        <Route path="/confirmation" element=
                            {<ErrorBoundary fallback={<Rejection/>}>
                                <Suspense fallback={<h1>Loading...</h1>}>
                                    <Confirmation />
                                </Suspense>
                            </ErrorBoundary>}>
                        </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App;