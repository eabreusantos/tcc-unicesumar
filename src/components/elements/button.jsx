import React from 'react'


export default function Button({variant, onClick, children}) {

    return (
        <button onClick={onClick} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            {children}
        </button>
    )
}