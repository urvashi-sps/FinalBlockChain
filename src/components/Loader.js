import React, { Component } from 'react';
const Loader = () => {
    return (
        <div className="flex justify-center items-center py-3">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-red-800"></div>
        </div>
    )
}

export default Loader;