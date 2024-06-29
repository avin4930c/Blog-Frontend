import React from 'react';
import NavBar from './navbar';

const UnderDevelopmentPage = () => {
    return (
        <>
        <NavBar />
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Under Development</h1>
            <p className="text-lg text-gray-600">This page is currently under development.</p>
            <p className="text-lg text-gray-600">Check back later!</p>
        </div>
        </>
    );
};

export default UnderDevelopmentPage;