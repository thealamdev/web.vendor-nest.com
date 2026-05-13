"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { OrganizationContext } from "@/app/context";
import { getCookie } from "@/lib/session";
import { CookieEnum } from "@/app/enums/CookieEnum";

export default function OrganizationSwitcher() {
    const [open, setOpen] = useState(false);
    const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
    const [switching, setSwitching] = useState(false);
    const { organizations, changeOrganization } = useContext(OrganizationContext);
    const currentOrg = organizations.find(o => o.org_id === selectedOrgId) ?? organizations[0];

    useEffect(() => {
        const fetchOrgFromCookie = async () => {
            const res = await getCookie(CookieEnum.ORGANIZATION_CONTEXT);
            setSelectedOrgId(res)
        }
        fetchOrgFromCookie();
    }, [])

    const handleSelect = useCallback(async (org: any) => {
        if (org.org_id === currentOrg?.org_id || switching) return;

        setSwitching(true);
        setOpen(false);

        try {
            setSelectedOrgId(org.org_id);
            await changeOrganization(org.org_id);
        } finally {
            setSwitching(false);
        }
    }, [currentOrg, switching, changeOrganization]);

    return (
        <div className="relative m-4">

            {/* Clickable Logo Area */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 w-full"
            >

                {/* Avatar */}
                <div className="h-10 w-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold">
                    {currentOrg?.name?.slice(0, 2).toUpperCase()}
                </div>

                {/* Name + Subtitle (ONLY THIS CHANGES) */}
                <div className="text-left flex-1">
                    <h2 className="font-bold text-gray-900 leading-tight">
                        {currentOrg?.name}
                    </h2>

                    {/* <p className="text-xs text-gray-500">
                        {currentOrg.subtitle}
                    </p> */}
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
                        const active = org.org_id === currentOrg.org_id;

                        return (
                            <button
                                key={org.org_id}
                                onClick={() => handleSelect(org)}
                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                            >
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-900">
                                        {org.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {org.email}
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