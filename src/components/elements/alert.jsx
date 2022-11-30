import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'


export function Alert({variant, text}) {
    let variantClass = "border flex text-sm px-4 py-3 rounded relative "
    
    if (variant == "error") {
        variantClass += "bg-red-50 border-red-50 text-red-900"
    }

    if (variant == "success") {
        variantClass += "bg-green-100 border-green-400 text-green-700"
    }

    if (variant == "info") {
        variantClass += "bg-blue-100 border-blue-400 text-blue-700"
    }

    return (
        <div className={variantClass} role="alert">
            <ExclamationCircleIcon className='mr-1' width={'20px'}/>
            <span className="block  sm:inline">
                {text}
            </span>
        </div>
    )
}