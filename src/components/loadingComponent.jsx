import React from "react";

function LoadingComponent() {
    return (
        <div className="flex flex-col justify-center items-center h-[80vh]">
            <div className="flex space-x-2 animate-bounce">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-xl text-gray-700 mt-4">Loading...</p>
        </div>
    );
}

export default LoadingComponent;