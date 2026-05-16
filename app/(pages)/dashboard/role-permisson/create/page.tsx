"use client";

import React, { useActionState, useMemo, useState } from "react";
import { Check, Shield } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { RolePermissionRequest, rolePermissionStoreAction } from "@/app/actions/dashboard/role-permission/role-permission-store-aciton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const permissionsData: Record<string, string[]> = {
    role: [
        "role.view",
        "role.create",
        "role.update",
        "role.delete",
        "role.assign"
    ],

    permission: ["permission.view"],

    organization: [
        "organization.view",
        "organization.create",
        "organization.update",
        "organization.delete",
        "organization.switch"
    ],

    member: [
        "member.view",
        "member.invite",
        "member.update",
        "member.remove"
    ],

    product: [
        "product.view",
        "product.create",
        "product.update",
        "product.delete",
        "product.approve",
        "product.reject"
    ],

    category: [
        "category.view",
        "category.create",
        "category.update",
        "category.delete"
    ],

    order: [
        "order.view",
        "order.manage",
        "order.update_status",
        "order.cancel"
    ],

    payment: [
        "payment.view",
        "payment.manage",
        "payment.refund"
    ],

    transaction: ["transaction.view"],

    report: [
        "report.view",
        "report.export"
    ],

    notification: [
        "notification.view",
        "notification.send"
    ],

    support: [
        "support.view",
        "support.reply",
        "support.close"
    ]
};

export default function CreateRolePage() {
    const [formData, setFormData] = useState<RolePermissionRequest>({
        organization_type: "vendor",
        name: "",
        description: "",
        is_editable: true,
        permissions: [] as string[]
    });

    const router = useRouter();

    const totalPermissions = useMemo(() => {
        return Object.values(permissionsData).flat().length;
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
            setTimeout(() => {
                router.push('/dashboard/role-permisson')
            }, 1000)
        }
        return res;
    };

    const [errors, action, isPending] = useActionState(handleSubmit, null);

    return (
        <div className="min-h-screen bg-muted/30 p-6">
            <form action={action} className="mx-auto max-w-7xl space-y-6">
                <pre className="text-green-400">
                    {JSON.stringify(errors, null, 2)}
                </pre>

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

                        {/* JSON Preview */}
                        <Card className="rounded-2xl border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle>
                                    Payload Preview
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <pre className="overflow-auto rounded-xl bg-black p-4 text-xs text-green-400">
                                    {JSON.stringify(formData, null, 4)}
                                </pre>
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
    );
}