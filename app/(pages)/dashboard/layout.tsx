import React, { ReactNode } from 'react'
import LayoutContext from './layouts/LayoutContext'
import PermissionProvider from '@/app/providers/PermissionProvider';

export default function DashbaordLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <PermissionProvider>
            <LayoutContext>
                {children}
            </LayoutContext>
        </PermissionProvider>

    )
}
