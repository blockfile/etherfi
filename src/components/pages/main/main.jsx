import React from "react";
import "./main.css";
import Navbar from "../../navbar/navbar";
import Scene from "../../assets/scenebg/scene"; // Adjust the import path according to your file structure
import UploadBtn from "../../assets/uploadbtn/uploadbtn";
import { Link } from "react-router-dom";

function Main() {
    return (
        <div className="bg  sm:overflow-hidden">
            <Navbar />
            <div className="bg-scene my-5">
                <div className="scene-container z-0">
                    <Scene />
                </div>

                <div className="centered-text">
                    <p className="md:text-5xl sm: text-2xl">YOUR</p>
                    <p className="md:text-7xl sm: text-4xl text-white  glitch layers ring-4 my-2 ">
                        WEB3 FILE STORAGE
                    </p>
                    <p
                        className="md:text-5xl sm: text-2xl  glitch layers"
                        data-text=" BLOCKFILE">
                        BLOCKFILE
                    </p>
                    <div className="centered-button my-24">
                        <Link to="/uploadpage">
                            <UploadBtn />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
