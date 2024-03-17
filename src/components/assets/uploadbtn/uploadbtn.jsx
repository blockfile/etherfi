import React from "react";
import "./uploadbtn.css";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
function UploadBtn() {
    return (
        <div>
            <div class="container">
                <button class="relative inline-flex items-center justify-center p-0.5  sm:mb-24 md:mb-2 sm:ml-10 md:ml-0 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                    <div class="relative px-5 py-2.5 transition-all ease-in duration-75 md:text-3xl sm:text-xl mx-auto bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <div className="flex space-x-4 ">
                            <div className="my-auto">
                                <span>Upload FILE</span>
                            </div>
                            <div>
                                <MdOutlineDriveFolderUpload size={50} />
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
}
export default UploadBtn;
