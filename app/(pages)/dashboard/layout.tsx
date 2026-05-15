import React, { ReactNode } from 'react'
import LayoutContext from './layouts/LayoutContext'
import RolePermissionProvider from '@/app/providers/RolePermissionProvider';
import OrganizationProvier from '@/app/providers/OrganizationProvier';
import QueryProvider from '@/app/providers/QueryProvider';

export default function DashbaordLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <QueryProvider>
            <RolePermissionProvider>
                <OrganizationProvier>
                    <LayoutContext>
                        {children}
                    </LayoutContext>
                </OrganizationProvier>
            </RolePermissionProvider>
        </QueryProvider>


    )
}
