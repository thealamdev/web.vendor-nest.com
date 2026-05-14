"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { OrganizationStoreAction, OrganizationStoreRequest } from "@/app/actions/auth/vendor/organization-store-aciton";

export default function CreateOrganizationPage() {
    const router = useRouter();

    const [data, setData] = useState<OrganizationStoreRequest>({
        type: "vendor",
        name: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        city: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const res = await OrganizationStoreAction(data);
            console.log(res)
            return;
            if (res.success) {
                router.push("/dashboard");
            }
        } catch (err: any) {
            setError(
                err?.response?.data?.message || "Failed to create organization"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6"
                >
                    {/* Header */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Create Organization
                        </h1>

                        <p className="text-sm text-gray-500">
                            Setup your vendor organization
                        </p>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Organization Name
                        </label>
                        <Input
                            name="name"
                            placeholder="Vendor Owner Org"
                            onChange={handleChange}
                            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="org@example.com"
                            onChange={handleChange}
                            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <Input
                            name="phone"
                            placeholder="017XXXXXXXX"
                            onChange={handleChange}
                            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                        />
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <Input
                            name="address"
                            placeholder="Manikganj Bus Stand"
                            onChange={handleChange}
                            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                        />
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <Input
                            name="country"
                            placeholder="Bangladesh"
                            onChange={handleChange}
                            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                        />
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            City
                        </label>
                        <Input
                            name="city"
                            placeholder="Dhaka"
                            onChange={handleChange}
                            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 rounded-lg text-sm font-medium"
                    >
                        {loading ? "Creating..." : "Create Organization"}
                    </Button>
                </form>
            </div>
        </div>
    );
}