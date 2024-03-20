import React from "react";
import { FaTwitter, FaTelegram } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import "./Footer.css";
function Footer() {
    return (
        <div className="flex flex-col justify-center items-center  text-white text-center font-anta  ">
            <div className=" absolute bottom-10 left-0 right-0 flex justify-center items-center space-x-7  ">
                <a
                    href="https://t.me/blockfileofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl">
                    <FaTelegram />
                </a>
                <a
                    href="https://twitter.com/blockFofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl">
                    <FaTwitter />
                </a>
                <a
                    href="https://blockfile.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl">
                    <BsGlobe />
                </a>
            </div>

            <div className=" bottom-2 left-0 right-0 mt-5 absolute  text-xs">
                <span> ©2024 BlockFile | All Rights Reserved | V.1.0.1</span>
            </div>
        </div>
    );
}

export default Footer;
