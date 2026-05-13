import React, { ReactNode } from 'react'
import LayoutContext from './layouts/LayoutContext'
import RolePermissionProvider from '@/app/providers/RolePermissionProvider';
import OrganizationProvier from '@/app/providers/OrganizationProvier';

export default function DashbaordLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <RolePermissionProvider>
            <OrganizationProvier>
                <LayoutContext>
                    {children}
                </LayoutContext>
            </OrganizationProvier>
        </RolePermissionProvider>

    )
}
