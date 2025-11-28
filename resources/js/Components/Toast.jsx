import React from "react";

export default function Toast({ message, type = "success", onClose }) {
    if (!message) return null;
    return (
        <div
            className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow text-white ${
                type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
        >
            {message}
            <button className="ml-4 text-white" onClick={onClose}>
                &times;
            </button>
        </div>
    );
}
