import "./App.css";
import React, { useState } from "react";
import Main from "../src/components/pages/main/main";
import UploadPage from "./components/pages/uploadpage/uploadpage";
import { useRoutes } from "react-router-dom";
import TokenContext from "../src/components/assets/TokenContext";
import DownloadPage from "./components/pages/downloadpage/downloadpage";

function App() {
    const [tokenBalance, setTokenBalance] = useState(0);
    let element = useRoutes([
        {
            path: "/",
            element: <Main />,
        },
        {
            path: "/uploadpage",
            element: <UploadPage />,
        },
        {
            path: "/download/:id",
            element: <DownloadPage />,
        },
    ]);
    return (
        <div className="App bg-black">
            {" "}
            <TokenContext.Provider value={{ tokenBalance, setTokenBalance }}>
                {element}{" "}
            </TokenContext.Provider>
        </div>
    );
}

export default App;
