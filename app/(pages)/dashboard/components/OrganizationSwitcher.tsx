"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function OrganizationSwitcher() {
    const [open, setOpen] = useState(false);

    const organizations = [
        { id: 1, name: "VendorNext", subtitle: "Multi Organization Platform" },
        { id: 2, name: "Tech Corp", subtitle: "Engineering Workspace" },
        { id: 3, name: "Eventify Ltd", subtitle: "Event Management" },
    ];

    const [currentOrg, setCurrentOrg] = useState(organizations[0]);

    const handleSelect = (org: any) => {
        setCurrentOrg(org);
        setOpen(false);

        // later you can call API or reload here
        // router.refresh() or router.push(...)
    };

    return (
        <div className="relative m-4">

            {/* Clickable Logo Area */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 w-full"
            >

                {/* Avatar */}
                <div className="h-10 w-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold">
                    {currentOrg.name.slice(0, 2).toUpperCase()}
                </div>

                {/* Name + Subtitle (ONLY THIS CHANGES) */}
                <div className="text-left flex-1">
                    <h2 className="font-bold text-gray-900 leading-tight">
                        {currentOrg.name}
                    </h2>

                    <p className="text-xs text-gray-500">
                        {currentOrg.subtitle}
                    </p>
                </div>

                <ChevronDown
                    size={18}
                    className={`text-gray-500 transition ${open ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">

                    {organizations.map((org) => {
                        const active = org.id === currentOrg.id;

                        return (
                            <button
                                key={org.id}
                                onClick={() => handleSelect(org)}
                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                            >
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-900">
                                        {org.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {org.subtitle}
                                    </p>
                                </div>

                                {active && (
                                    <Check size={16} className="text-green-600" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}