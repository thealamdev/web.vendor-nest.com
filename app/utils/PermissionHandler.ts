
export const hasPermission = (permission: string, permissions: string[]) => {
    return permissions?.includes(permission);
}

export const hasAnyPermission = (lists: string[], permissions: string[]) => {
    return lists.some((list: string) => permissions.includes(list));
}

export const hasAllPermissions = (lists: string[], permissions: string[]) => {
    return lists.every((list: string) => permissions.includes(list))
}