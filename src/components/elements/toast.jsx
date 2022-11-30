import React, { useEffect } from "react";
import useToast from "../../hooks/useToast";



function IconSuccess() {
    return (
        <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
        </svg>
    )
}

function IconInfo() {
    return (
        <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-info" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
            <circle cx="8" cy="4.5" r="1"/>
        </svg>
    )
}

function IconError() {
    return (
        <svg  width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
            <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
        </svg>
    )
}

export default function Toast({variant, text}) {

    const {hideToast} = useToast();

    useEffect(() => {

        setTimeout(() => {
            hideToast();
        }, 5000);

    }, []);
    
    let icon = <IconInfo />
    let containerClass = 'flex w-80 border-l-4 fixed right-3 top-2 items-centerborder-l-4  py-2 px-3 shadow-md mb-2 '
    let textColor = 'text-blue-500'

    if (variant === 'success') {
        icon = <IconSuccess />
        containerClass += 'bg-green-500 border-green-700';
        textColor = 'text-green-500';
    }

    if (variant === 'error') {
        icon = <IconError />
        containerClass += 'bg-red-500 border-red-700';
        textColor = 'text-red-500';
    }

    if (variant === 'info') {
        containerClass += 'bg-blue-500 border-blue-700';
        textColor = 'text-blue-500';
    }

    return (
    <div className={containerClass}>
      <div className={"rounded-full bg-white mr-3" + textColor}>
        {icon}
      </div>
      <div className="ml-2 text-white max-w-xs ">
        {text}
      </div>
    </div>
    )
}