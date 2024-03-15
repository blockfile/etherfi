import React, { useState, useEffect } from "react";
import Navbar from "../../navbar/navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./downloadpage.css";
import logo from "../../assets/Images/logo.png";
function DownloadPage() {
    let { id } = useParams();
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/files/${id}`
                );

                setFile(response.data);
            } catch (error) {
                console.error("Failed to fetch file:", error);
            }
        };

        fetchFile();
    }, [id]);

    return (
        <div className="bg text-white font-anta h-screen overflow-hidden">
            <Navbar />
            {/* Use an extra container div if Navbar should not be centered and should stay at the top */}
            <div className="flex justify-center items-center h-full bg pb-24 ">
                {" "}
                {/* This will take up the remaining height */}
                <div className="w-full md:max-w-xl p-4 bg-gray-800 rounded-lg shadow-md sm:w-[500px] mx-3">
                    <div>
                        <div className="">
                            <img
                                src={logo}
                                alt="logo"
                                className=" h-24 w-24 mx-auto animate-spin"
                            />
                        </div>
                    </div>
                    {file ? (
                        <div className="flex flex-col items-center ">
                            <h2 className="text-xl font-semibold mb-2">
                                File Details
                            </h2>
                            <div className=" flex justify-evenly">
                                <div></div>
                                <div className=" ">
                                    <p className="filename">
                                        Filename: {file.filename}
                                    </p>
                                    <p>Size: {file.size}</p>

                                    <p>
                                        Uploaded:{" "}
                                        {new Date(
                                            file.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <a
                                href={`https://web3storage.sgp1.cdn.digitaloceanspaces.com/uploads/${file.walletAddress}/${file.filename}`}
                                download={file.filename}
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Download
                            </a>
                        </div>
                    ) : (
                        <p>Loading file details...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DownloadPage;
