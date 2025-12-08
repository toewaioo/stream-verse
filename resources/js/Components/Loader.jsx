import React from "react";

const Loader = ({ title, status }) => {
    return (
        <div className="flex items-center justify-center flex-col text-center w-full h-[100vh] dark:bg-black">
            <div className="flex w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto" />
            <h1 className="text-3xl font-bold dark:text-gray-400 text-center mb-4">
                {title}
            </h1>
            {/* <p className="text-zinc-600 dark:text-zinc-400">
                Your adventure is about to begin
            </p> */}
            <p className="dark:text-gray-400">{status}</p>
        </div>
    );
};

export default Loader;
