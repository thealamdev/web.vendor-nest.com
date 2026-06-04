"use client";

import { loginAction } from "@/app/actions/auth/vendor/login-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useState } from "react";

export default function Home() {

  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    const res = await loginAction(data);

    if (res.success && res.payload.hasMembership) {
      router.push("/choose-organization");
    } else {
      router.push("/dashboard");
    }

    return res;
  };

  const [error, action, isPending] = useActionState(handleSubmit, null);

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
              Welcome back
            </h1>

            <p className="text-sm text-gray-500">
              Sign in to continue to your account
            </p>
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
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-900 transition"
              >
                Forgot password?
              </button>
            </div>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
            />
          </div>

          {/* Error */}
          {error?.message && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
              <p className="text-sm text-red-600">
                {error.message}
              </p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-11 rounded-lg text-sm font-medium"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </Button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <a
              href={'/auth/vendor/register'}
              className="font-medium text-gray-900 hover:underline"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}