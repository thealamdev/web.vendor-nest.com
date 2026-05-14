import React from 'react'

export default function UnauthorizedComponent() {
    return (
        <div className="flex items-center justify-center py-24 px-6">
            <div className="max-w-md w-full text-center">

                <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
                        />
                    </svg>
                </div>

                <h2 className="mt-6 text-2xl font-semibold text-gray-900">
                    Access Denied
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                    You do not have permission to access this page.
                    Please contact your organization administrator
                    if you believe this is a mistake.
                </p>

                <div className="mt-8">
                    <button
                        onClick={() => window.history.back()}
                        className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:opacity-90 transition"
                    >
                        Go Back
                    </button>
                </div>

            </div>
        </div>
    )
}
