import React from 'react'

/** 
 * Modal component
 * @param {size} size: Optional with available options: small, medium and full 
 * @returns 
 */
export default function Modal({children, size, header}) {

    let defaultSizeClass = 'lg:max-w-lg';
    let modalSize = '';
    
    if (!size) modalSize = defaultSizeClass
    if (size === 'small') modalSize = defaultSizeClass
    if (size === 'medium') modalSize = 'lg:max-w-3xl'
    if (size === 'full') modalSize = 'lg:max-w-7xl'

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className={"relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full " + modalSize}>
                    {header &&
                    <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {header}
                        </h3>
                    </div>
                    }
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="">
                        
                        {children}
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}