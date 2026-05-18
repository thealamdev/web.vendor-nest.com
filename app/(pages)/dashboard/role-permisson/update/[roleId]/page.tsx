import UpdateRolePermissionComponent from "./components/UpdateRolePermissionComponent";

export default async function UpdateRolePermission({ params }: { params: Promise<{ roleId: string }> }) {
    const roleId = (await params).roleId;
    return (
        <div>
            <UpdateRolePermissionComponent
                roleId={roleId}
            />
        </div>
    )
}
