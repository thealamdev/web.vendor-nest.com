"use client";

import { registerAction } from "@/app/actions/auth/vendor/register-aciton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useState } from "react";

export default function RegisterPage() {

    const router = useRouter();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData((prev: any) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        const res = await registerAction(data);
        console.log(res)

        if (res.success && !res.payload.hasMembership) {
            router.push("/auth/vendor/organization");
        }

        return res;
    };

    const [errors, action, isPending] = useActionState(handleSubmit, null);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <form
                    action={action}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6"
                >
                    {/* Header */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Create Account
                        </h1>

                        <p className="text-sm text-gray-500">
                            Register to access your organization
                        </p>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>

                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            onChange={handleChange}
                            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                        />
                        {errors?.errors?.name && <p className="text-red-500 text-sm font-normal">{errors?.errors?.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            onChange={handleChange}
                            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                        />

                        {errors?.errors?.email && <p className="text-red-500 text-sm font-normal">{errors?.errors?.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label
                            htmlFor="password_confirmation"
                            className="text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>

                        <Input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            placeholder="Confirm your password"
                            onChange={handleChange}
                            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
                        />
                        {errors?.errors?.password && <p className="text-red-500 text-sm font-normal">{errors?.errors?.password}</p>}
                    </div>

                    {/* Error */}
                    {errors?.message && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                            <p className="text-sm text-red-600">
                                {errors.message}
                            </p>
                        </div>
                    )}

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-11 rounded-lg text-sm font-medium"
                    >
                        {isPending ? "Creating account..." : "Create Account"}
                    </Button>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="font-medium text-gray-900 hover:underline"
                        >
                            Sign in
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}