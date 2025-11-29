import React from "react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center flex-col text-center w-full h-[100vh]">
            <div className="flex w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto" />
            <h2 className="text-white dark:text-white mt-4">Loading...</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
                Your adventure is about to begin
            </p>
        </div>
    );
};

export default Loader;
