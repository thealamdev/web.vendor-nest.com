"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Check, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useActionState, useContext, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PermissionGroupByModuleResponse, rolePermissionService } from "@/app/services/dashboard/role-permission/role-permission-service";
import { RolePermissionRequest, rolePermissionStoreAction } from "@/app/actions/dashboard/role-permission/role-permission-store-aciton";
import { hasPermission } from "@/app/utils/PermissionHandler";
import { RolePermissionContext, RolePermissionResponse } from "@/app/context/RolePermissionContext";
import UnauthorizedComponent from "@/components/utilities/UnauthorizedComponent";

const fetchPermissions = async () => {
    const res = await rolePermissionService.permissionsGroupByModule();
    return res.payload;
}

export default function CreateRolePage() {
    const { permissions } = useContext<RolePermissionResponse>(RolePermissionContext);
    const [formData, setFormData] = useState<RolePermissionRequest>({
        organization_type: "vendor",
        name: "",
        description: "",
        is_editable: true,
        permissions: [] as string[]
    });

    const queryClient = useQueryClient();

    const { data: permissionsData = [], error, isLoading } = useQuery<PermissionGroupByModuleResponse>({
        queryKey: [`permissionGroupByModule}`],
        queryFn: fetchPermissions
    })

    const router = useRouter();

    const totalPermissions = useMemo(() => {
        return Object?.values(permissionsData).flat().length;
    }, []);

    const selectedCount = formData.permissions.length;

    const togglePermission = (permission: string) => {
        setFormData((prev) => {
            const exists = prev.permissions.includes(permission);

            return {
                ...prev,
                permissions: exists
                    ? prev.permissions.filter((p) => p !== permission)
                    : [...prev.permissions, permission]
            };
        });
    };

    const toggleModule = (modulePermissions: string[]) => {
        const allSelected = modulePermissions.every((permission) =>
            formData.permissions.includes(permission)
        );

        setFormData((prev) => ({
            ...prev,
            permissions: allSelected
                ? prev.permissions.filter(
                    (permission) =>
                        !modulePermissions.includes(permission)
                )
                : Array.from(
                    new Set([
                        ...prev.permissions,
                        ...modulePermissions
                    ])
                )
        }));
    };

    const handleSubmit = async () => {
        const res = await rolePermissionStoreAction(formData);
        if (res.success) {
            toast.success('Role & Permission added');
            queryClient.invalidateQueries({
                queryKey: ['roles:all']
            })
            setTimeout(() => {
                router.push('/dashboard/role-permisson')
            }, 1000)
        } else {
            toast.error(res?.message)
        }
        return res;
    };

    const [errors, action, isPending] = useActionState(handleSubmit, null);

    return (
        <div>

            {
                hasPermission('role.create', permissions) ? (
                    <div className="min-h-screen bg-muted/30 p-6">
                        <form action={action} className="mx-auto max-w-7xl space-y-6">
                            {/* Header */}
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">
                                        Create Role
                                    </h1>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Configure role information and assign permissions by module.
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant="secondary"
                                        className="rounded-full px-4 py-1 text-sm"
                                    >
                                        {selectedCount} / {totalPermissions} Permissions
                                    </Badge>

                                    <Button type="submit">
                                        {isPending ? 'Saving...' : 'Save Role'}
                                    </Button>
                                </div>
                            </div>

                            <div
                                className="grid grid-cols-1 gap-6 xl:grid-cols-12"
                            >

                                {/* Left Side */}
                                <div className="space-y-6 xl:col-span-4">

                                    {/* Role Information */}
                                    <Card className="rounded-2xl border-0 shadow-sm">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Shield className="h-5 w-5" />
                                                Role Information
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent className="space-y-5">
                                            <div className="space-y-2">
                                                <Label>
                                                    Role Name
                                                </Label>

                                                <Input
                                                    placeholder="Product & Order Management"
                                                    className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                                                    value={formData.name}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            name: e.target.value
                                                        }))
                                                    }
                                                />

                                                {errors?.errors?.name && <p className="text-red-500 text-sm">{errors?.errors?.name}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <Label>
                                                    Description
                                                </Label>

                                                <Textarea
                                                    rows={5}
                                                    placeholder="This role can manage products and orders..."
                                                    value={formData.description}
                                                    onChange={(e: any) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            description: e.target.value
                                                        }))
                                                    }
                                                />
                                                {errors?.errors?.description && <p className="text-red-500 text-sm">{errors?.errors?.description}</p>}
                                            </div>

                                            <div className="flex items-center justify-between rounded-xl border p-4">
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        Editable Role
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        Allow this role to be updated later
                                                    </p>
                                                </div>

                                                <Checkbox
                                                    checked={formData.is_editable}
                                                    onCheckedChange={(checked: any) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            is_editable: !!checked
                                                        }))
                                                    }
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Right Side */}
                                <div className="xl:col-span-8">

                                    <Card className="rounded-2xl border-0 shadow-sm">
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <div>
                                                <CardTitle>
                                                    Permission Modules
                                                </CardTitle>

                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    Select permissions module wise
                                                </p>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="space-y-5">

                                            {Object.entries(permissionsData).map(
                                                ([module, modulePermissions]) => {
                                                    const selectedModuleCount =
                                                        modulePermissions.filter((permission) =>
                                                            formData.permissions.includes(permission)
                                                        ).length;

                                                    const allSelected =
                                                        selectedModuleCount ===
                                                        modulePermissions.length;

                                                    return (
                                                        <div
                                                            key={module}
                                                            className="rounded-2xl border bg-background"
                                                        >

                                                            {/* Module Header */}
                                                            <div className="flex flex-col gap-4 border-b p-5 lg:flex-row lg:items-center lg:justify-between">

                                                                <div>
                                                                    <h3 className="text-base font-semibold capitalize">
                                                                        {module}
                                                                    </h3>

                                                                    <p className="text-sm text-muted-foreground">
                                                                        {selectedModuleCount} of{" "}
                                                                        {modulePermissions.length} selected
                                                                    </p>
                                                                </div>

                                                                <Button
                                                                    type="button"
                                                                    variant={
                                                                        allSelected
                                                                            ? "default"
                                                                            : "outline"
                                                                    }
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        toggleModule(
                                                                            modulePermissions
                                                                        )
                                                                    }
                                                                >
                                                                    {allSelected
                                                                        ? "Remove All"
                                                                        : "Select All"}
                                                                </Button>
                                                            </div>

                                                            {/* Permissions */}
                                                            <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2">

                                                                {modulePermissions.map(
                                                                    (permission) => {
                                                                        const checked =
                                                                            formData.permissions.includes(
                                                                                permission
                                                                            );

                                                                        return (
                                                                            <button
                                                                                type="button"
                                                                                key={permission}
                                                                                onClick={() =>
                                                                                    togglePermission(
                                                                                        permission
                                                                                    )
                                                                                }
                                                                                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all
                                                                                
                                                                                ${checked
                                                                                        ? "border-primary bg-primary/5"
                                                                                        : "hover:bg-muted/50"
                                                                                    }
                                                                            `}
                                                                            >

                                                                                <div
                                                                                    className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border
                                                                                    
                                                                                    ${checked
                                                                                            ? "border-primary bg-primary text-primary-foreground"
                                                                                            : ""
                                                                                        }
                                                                                `}
                                                                                >
                                                                                    {checked && (
                                                                                        <Check className="h-3.5 w-3.5" />
                                                                                    )}
                                                                                </div>

                                                                                <div className="space-y-1">
                                                                                    <p className="text-sm font-medium">
                                                                                        {permission
                                                                                            .split(".")[1]
                                                                                            ?.replaceAll(
                                                                                                "_",
                                                                                                " "
                                                                                            )
                                                                                            .replace(
                                                                                                /\b\w/g,
                                                                                                (char) =>
                                                                                                    char.toUpperCase()
                                                                                            )}
                                                                                    </p>

                                                                                    <p className="text-xs text-muted-foreground">
                                                                                        {permission}
                                                                                    </p>
                                                                                </div>
                                                                            </button>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </form>
                    </div>
                ):(
                    <UnauthorizedComponent />
                )
            }
        </div>
    );
}