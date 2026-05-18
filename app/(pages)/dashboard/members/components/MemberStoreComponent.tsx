import { MemberStoreRequest } from "@/app/actions/dashboard/members/member-store-action";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Role } from "../page";
import { PackageCheck, ShieldCheck, ShoppingCart, X } from "lucide-react";

type PageProps = {
    action: () => void;
    form: MemberStoreRequest;
    fieldErrors: MemberStoreRequest;
    handleChange: (name: string, value: string) => void;
    roles: any;
    setIsOpen: (value: boolean) => void;
    isPending: boolean;
}

const getRoleIcon = (slug: string) => {
    switch (slug) {
        case "order-management":
            return <ShoppingCart className="h-5 w-5 text-blue-600" />;

        case "product-management":
            return <PackageCheck className="h-5 w-5 text-emerald-600" />;

        default:
            return <ShieldCheck className="h-5 w-5 text-gray-600" />;
    }
};

export default function MemberStoreComponent({
    action,
    form,
    fieldErrors,
    handleChange,
    roles,
    setIsOpen,
    isPending
}: PageProps) {

    const matchedRoles = roles.filter((role: any, index: number) => (
        role.id === form.role_ids[index]
    ))

    return (
        <form action={action} className="space-y-4">

            <div className="space-y-1">
                <Input
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Full Name"
                    className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                />
                {fieldErrors?.name && (
                    <p className="text-sm text-red-500">{fieldErrors.name}</p>
                )}
            </div>

            <div className="space-y-1">
                <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Email Address"
                    className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                />
                {fieldErrors?.email && (
                    <p className="text-sm text-red-500">{fieldErrors.email}</p>
                )}
            </div>

            <div className="space-y-1">
                <Input
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="Phone Number"
                    className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                />
                {fieldErrors?.phone && (
                    <p className="text-sm text-red-500">{fieldErrors.phone}</p>
                )}
            </div>

            <div className="space-y-1">
                <Input
                    type="password"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Password"
                    className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                />
                {fieldErrors?.password && (
                    <p className="text-sm text-red-500">{fieldErrors.password}</p>
                )}
            </div>

            <div className="space-y-1">
                <Input
                    type="password"
                    value={form.password_confirmation}
                    onChange={(e) =>
                        handleChange("password_confirmation", e.target.value)
                    }
                    placeholder="Confirm Password"
                    className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                />
                {fieldErrors?.password_confirmation && (
                    <p className="text-sm text-red-500">
                        {fieldErrors.password_confirmation}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <Select
                    onValueChange={(value) => handleChange("role_ids", value)}
                >
                    <SelectTrigger className="w-full !h-11 border-gray-300 focus:ring-1 focus:ring-gray-900">
                        <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles?.map((role: any) => (
                            <SelectItem key={role.id} value={role.id}>
                                {role.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {fieldErrors?.role_ids && (
                    <p className="text-sm text-red-500">{fieldErrors.role_ids}</p>
                )}
            </div>

            <div className="space-y-3">
                {matchedRoles?.map((role: any) => (
                    <div
                        key={role.id}
                        className="flex items-start justify-between rounded-xl border bg-white p-4 shadow-sm"
                    >
                        <div className="flex gap-3">
                            <div className="mt-0.5 rounded-lg bg-gray-100 p-2">
                                {getRoleIcon(role.slug)}
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-sm">
                                        {role.name}
                                    </h4>

                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-700">
                                        {role.organization_type}
                                    </span>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    {role.description}
                                </p>

                                <div className="text-xs text-muted-foreground">
                                    Organization: {role.organization?.name}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            // onClick={() => {
                            //     setForm((prev: any) => ({
                            //         ...prev,
                            //         role_ids: prev.role_ids.filter(
                            //             (id) => id !== role.id
                            //         ),
                            //     }));
                            // }}
                            className="rounded-md p-1 hover:bg-red-50"
                        >
                            <X className="h-4 w-4 text-red-500" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-sm"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 bg-black text-white rounded-xl text-sm disabled:opacity-50"
                >
                    {isPending ? "Creating..." : "Create Member"}
                </button>
            </div>
        </form>
    )
}
