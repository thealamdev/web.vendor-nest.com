"use client";

import { storeOrganizationAction } from "@/app/actions/choose-organization/storeOrganizationAction";
import { Membership } from "@/app/providers/OrganizationProvier";
import { chooseWorkspaceService } from "@/app/services/choose-organization/choose-organization-service";
import { Button } from "@/components/ui/button";
import {
    AlertCircle,
    Building2,
    Loader2,
    Mail,
    Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, {
    useActionState,
    useEffect,
    useState,
} from "react";

type ActionState = {
    success: boolean;
    status: number;
    message: string;
    errors?: {
        organization_id?: string[];
    };
};


export default function Page() {
    const router = useRouter();

    const [memberships, setMemberships] = useState<
        Membership[]
    >([]);

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        organization_id: "",
    });

    // fetch organizations
    useEffect(() => {
        const fetchMembership = async () => {
            try {
                const res = await chooseWorkspaceService();

                setMemberships(res.payload || []);
            } finally {
                setLoading(false);
            }
        };

        fetchMembership();
    }, []);

    // set selected organization
    const handleChangeOrganization = (
        organization_id: string
    ) => {
        setFormData({
            organization_id,
        });
    };

    // form action
    const handleChooseOrganization = async () => {
        if (!formData.organization_id) {
            return {
                success: false,
                status: 422,
                message: "Validation Failed",
                errors: {
                    organization_id: [
                        "Organization id is required.",
                    ],
                },
            };
        }

        const res = await storeOrganizationAction(
            formData
        );

        if (res.payload.isChecked) {
            router.push("/dashboard");
        }

        return res;
    };

    const [state, formAction, isPending] =
        useActionState(
            handleChooseOrganization,
            null
        );

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl">
                {/* heading */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Choose Your Workspace
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Select the organization you want to continue
                        with
                    </p>
                </div>

                {/* error */}
                {state?.message && !state.success && (
                    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4">
                        <AlertCircle
                            size={18}
                            className="text-red-500 mt-0.5"
                        />

                        <div>
                            <p className="text-sm font-semibold text-red-600">
                                {state.message}
                            </p>

                            {state.errors?.organization_id?.[0] && (
                                <p className="text-sm text-red-500 mt-1">
                                    {
                                        state.errors.organization_id[0]
                                    }
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* loading */}
                {loading ? (
                    <div className="flex justify-center">
                        <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-black animate-spin" />
                    </div>
                ) : memberships.length === 0 ? (
                    <div className="flex flex-col gap-5 bg-white rounded-3xl shadow-sm border p-10 text-center">
                        <Button
                            type="button"
                            onClick={() =>
                                router.push(
                                    "/auth/vendor/organization"
                                )
                            }
                        >
                            Create Workspace
                        </Button>

                        <p className="text-gray-500">
                            No workspace found
                        </p>
                    </div>
                ) : (
                    <form action={formAction}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {memberships.map((membership) => {
                                const isSelected =
                                    formData.organization_id ===
                                    membership.org_id;

                                const hasError =
                                    !!state?.errors?.organization_id &&
                                    isSelected;

                                return (
                                    <button
                                        key={membership.org_id}
                                        type="submit"
                                        disabled={isPending}
                                        onClick={() =>
                                            handleChangeOrganization(
                                                membership.org_id
                                            )
                                        }
                                        className={`
                      text-left bg-white rounded-[30px] border p-6 shadow-sm
                      transition-all duration-200
                      hover:-translate-y-1 hover:shadow-lg
                      ${hasError
                                                ? "border-red-400 ring-2 ring-red-100"
                                                : isSelected
                                                    ? "border-black ring-2 ring-black/10"
                                                    : "border-gray-200"
                                            }
                    `}
                                    >
                                        {/* top */}
                                        <div className="flex items-start justify-between mb-5">
                                            <div className="h-14 w-14 rounded-2xl bg-black text-white flex items-center justify-center">
                                                <Building2 size={26} />
                                            </div>

                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                                                {membership.isOwner}
                                            </span>
                                        </div>

                                        {/* title */}
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {membership.name}
                                        </h2>

                                        {/* info */}
                                        <div className="mt-5 space-y-3">
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Mail size={16} />

                                                <span className="text-sm">
                                                    {membership.email}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Phone size={16} />

                                                <span className="text-sm">
                                                    {membership.phone}
                                                </span>
                                            </div>
                                        </div>

                                        {/* validation error */}
                                        {hasError && (
                                            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-3 py-2">
                                                <p className="text-sm font-medium text-red-600">
                                                    {
                                                        state.errors
                                                            ?.organization_id?.[0]
                                                    }
                                                </p>
                                            </div>
                                        )}

                                        {/* button */}
                                        <div className="mt-6">
                                            <div
                                                className={`
                          w-full rounded-xl py-3 text-center font-medium
                          transition-all duration-200
                          ${isSelected
                                                        ? "bg-black text-white"
                                                        : "bg-gray-100 text-gray-800"
                                                    }
                        `}
                                            >
                                                {isPending && isSelected ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Loader2
                                                            size={18}
                                                            className="animate-spin"
                                                        />

                                                        <span>
                                                            Choosing Workspace...
                                                        </span>
                                                    </div>
                                                ) : isSelected ? (
                                                    "Selected Workspace"
                                                ) : (
                                                    "Choose Workspace"
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}