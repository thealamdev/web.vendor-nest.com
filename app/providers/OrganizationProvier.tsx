"use client";

import React, { ReactNode, useEffect, useState } from 'react'
import { chooseWorkspaceService } from '../services/choose-workspace/choose-workspace-service';
import { OrganizationContext } from '../context';
import { updateCookie } from '@/lib/session';
import { CookieEnum } from '../enums/CookieEnum';
import { useRouter } from 'next/navigation';

export interface Membership {
    org_id: string;
    name: string;
    email: string;
    phone: string;
    type: string;
}[]

interface PageProps {
    children: Readonly<ReactNode>
}

export default function OrganizationProvier({
    children
}: PageProps) {
    const router = useRouter()

    const [memberships, setMemberships] = useState<Membership[]>([]);
    const [loading, setLoading] = useState(true);

    const handleOrgChange = async (orgId: string) => {
        await updateCookie(CookieEnum.ORGANIZATION_CONTEXT, orgId);
        window.location.reload();
    }

    useEffect(() => {
        const fetchMembership = async () => {
            try {
                const res = await chooseWorkspaceService();
                setMemberships(res.payload || []);
            } finally {
                setLoading(false);
            }
        };

        fetchMembership();
    }, []);


    return (
        <OrganizationContext.Provider value={{
            organizations: memberships,
            changeOrganization: handleOrgChange
        }}>
            {children}
        </OrganizationContext.Provider>
    )
}
