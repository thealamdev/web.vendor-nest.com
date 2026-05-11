"use client";

import { storeWorkspaceAction } from "@/app/actions/choose-workspace/storeWorkspaceAction";
import { chooseWorkspaceService, storeWorkspaceService } from "@/app/services/choose-workspace/choose-workspace-service";
import { Building2, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Membership {
    org_id: string;
    name: string;
    email: string;
    phone: string;
    type: string;
}

export default function Page() {
    const [memberships, setMemberships] = useState<Membership[]>([]);
    const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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

    const handleChooseWorkspace = async(membership: Membership) => {
        setSelectedOrg(membership.org_id);
        const res = await storeWorkspaceAction(membership.org_id);
        if(res?.success){
            router.push('/dashboard')
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Choose Your Workspace
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Select the organization you want to continue with
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-black animate-spin" />
                    </div>
                ) : memberships.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border p-10 text-center">
                        <p className="text-gray-500">
                            No workspace found
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {memberships.map((membership) => {
                            const isSelected =
                                selectedOrg === membership.org_id;

                            return (
                                <button
                                    key={membership.org_id}
                                    onClick={() =>
                                        handleChooseWorkspace(membership)
                                    }
                                    className={`text-left bg-white border rounded-3xl p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${isSelected
                                        ? "border-black ring-2 ring-black"
                                        : "border-gray-200"
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="h-14 w-14 rounded-2xl bg-black text-white flex items-center justify-center">
                                            <Building2 size={26} />
                                        </div>

                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                                            {membership.type}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {membership.name}
                                    </h2>

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

                                    <div className="mt-6">
                                        <div
                                            className={`w-full rounded-xl py-3 text-center font-medium transition ${isSelected
                                                ? "bg-black text-white"
                                                : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {isSelected
                                                ? "Selected"
                                                : "Choose Workspace"}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}