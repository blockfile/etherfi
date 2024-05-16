import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar/navbar";
import Footer from "../../Footer/Footer";
import Loading from "../../assets/video/loading.mp4";
import { CSSTransition } from "react-transition-group";

import "./main.css";
function Main() {
    const [greetings, setGreetings] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const navigate = useNavigate();
    const messages = [
        " Welcome to ETHERFILE!",
        "Please Enter your Command Selection:",
        "1: Back to Homepage.",
        "2: Go to dapp and start uploading.",
    ];
    const etherfile = "//ETHERBOT: ";
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (messageIndex < messages.length) {
                const currentMessage = messages[messageIndex];
                if (currentCharIndex < currentMessage.length) {
                    setGreetings((prevGreetings) => {
                        // Create a new array only if this is the first char of a new message
                        if (prevGreetings.length === messageIndex) {
                            return [
                                ...prevGreetings,
                                currentMessage[currentCharIndex],
                            ];
                        } else {
                            // Otherwise, append the next character to the last message
                            const updatedGreetings = [...prevGreetings];
                            updatedGreetings[messageIndex] +=
                                currentMessage[currentCharIndex];
                            return updatedGreetings;
                        }
                    });
                    setCurrentCharIndex(currentCharIndex + 1);
                } else if (messageIndex < messages.length - 1) {
                    setCurrentCharIndex(0);
                    setMessageIndex(messageIndex + 1);
                }
            }
        }, 50);

        return () => clearTimeout(timer); // Clean up the timeout to prevent memory leaks or state updates on unmounted components
    }, [currentCharIndex, messageIndex, messages]);

    const handleInputKeyPress = (event) => {
        if (event.key === "Enter") {
            if (inputValue === "1") {
                setGreetings((prev) => [
                    ...prev,
                    "You will now be redirected to homepage.",
                ]);
                setShowLoading(true);
                setTimeout(() => {
                    setShowLoading(false);
                    navigate("/");
                }, 5000); // Display loading for 5 seconds then navigate
            } else if (inputValue === "2") {
                setGreetings((prev) => [
                    ...prev,
                    "Redirecting to DApp upload page.",
                ]);
                setShowLoading(true);
                setTimeout(() => {
                    setShowLoading(false);
                    navigate("/uploadpage");
                }, 5000); // Change '/dapp' to your actual route
            } else {
                setGreetings((prev) => [...prev, "Invalid command."]);
            }
            setInputValue(""); // Clear input field after handling
        }
    };

    return (
        <div className="bg3 sm:overflow-hidden h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-black flex flex-col justify-between rounded-b-lg mx-2 bg-opacity-40 rounded-t-lg">
                    <div className=" bg-slate-500 py-1 font-Mono flex justify-center space-x-4 rounded-t-xl">
                        <span>//ETHERFILE.EXE</span>
                        <div className="animate-spin">
                            <span>/</span>
                        </div>
                    </div>
                    <div className="flex-grow text-white mx-2 mt-2 text-justify overflow-auto">
                        {greetings.map((greeting, index) => (
                            <div key={index} className="font-Mono">
                                <span className="text-green-500">
                                    {etherfile}
                                </span>
                                {greeting}
                            </div>
                        ))}
                    </div>
                    <input
                        className="w-full h-8 bg-black bg-opacity-40 text-white pl-2 outline-none border-none caret-white font-Mono rounded-b-lg"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleInputKeyPress}
                        placeholder="// TYPE YOUR COMMAND HERE.."
                    />
                </div>
            </div>
            <CSSTransition
                in={showLoading}
                timeout={300}
                classNames="fade"
                unmountOnExit>
                <div className="fixed inset-0 bg-black  flex items-center justify-center">
                    <video
                        autoPlay
                        loop
                        src={Loading}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute flex justify-center items-center w-full h-full"></div>
                </div>
            </CSSTransition>

            <Footer />
        </div>
    );
}

export default Main;
