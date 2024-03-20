import React from "react";
import { FaTwitter, FaTelegram } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";

function Footer() {
    return (
        <div className="flex flex-col justify-center items-center  text-white text-center ">
            <div className=" bottom-10 left-0 right-0 flex justify-center items-center space-x-7 ">
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
            <div className=" bottom-2 left-0 right-0 mt-5  text-xs">
                ©2024 BlockFile | All Rights Reserved
            </div>
        </div>
    );
}

export default Footer;
