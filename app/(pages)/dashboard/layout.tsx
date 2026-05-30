import { Toaster } from 'sonner';
import React, { ReactNode } from 'react'
import LayoutContext from './layouts/LayoutContext'
import QueryProvider from '@/app/providers/QueryProvider';
import LogoutProvider from '@/app/providers/LogoutProvider';
import OrganizationProvier from '@/app/providers/OrganizationProvier';
import RolePermissionProvider from '@/app/providers/RolePermissionProvider';

export default function DashbaordLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <QueryProvider>
            <LogoutProvider>
                <RolePermissionProvider>
                    <OrganizationProvier>
                        <LayoutContext>
                            {children}
                        </LayoutContext>
                    </OrganizationProvier>
                </RolePermissionProvider>
                <Toaster richColors position="top-right" />
            </LogoutProvider>
        </QueryProvider>
    )
}
