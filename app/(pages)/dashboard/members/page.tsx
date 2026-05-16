"use client";

import React, { useEffect, useState } from "react";

import Modal from "@/components/utilities/Modal";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { api } from "@/lib/api";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  memberStoreAction,
  MemberStoreRequest,
} from "@/app/actions/dashboard/members/member-store-action";
import { toast } from "sonner";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type Member = {
  user_name: string;
  user_email: string;
  user_type: string;
  invited_by_name: string;
  invited_by_email: string;
};

type Role = {
  id: string;
  name: string;
};

/* -------------------------------------------------------------------------- */
/*                                    APIs                                    */
/* -------------------------------------------------------------------------- */

const fetchMembers = async (): Promise<Member[]> => {
  const res = await api.get("/user-management/member/members");
  return res.data.payload;
};

const fetchRoles = async (): Promise<Role[]> => {
  const res = await api.get("/user-management/role/getAll");
  return res.data.payload;
};

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function Page() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  /* ------------------------------------------------------------------------ */
  /*                                 Form State                               */
  /* ------------------------------------------------------------------------ */

  const initialForm: MemberStoreRequest = {
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    role_id: "",
  };

  const [form, setForm] = useState<MemberStoreRequest>(initialForm);

  /* ------------------------------------------------------------------------ */
  /*                                  Queries                                 */
  /* ------------------------------------------------------------------------ */

  const { data: members, isLoading } = useQuery({
    queryKey: ["organization:members"],
    queryFn: fetchMembers,
  });

  const { data: roles } = useQuery({
    queryKey: ["organization:roles"],
    queryFn: fetchRoles,
  });

  /* ------------------------------------------------------------------------ */
  /*                                 Mutation                                 */
  /* ------------------------------------------------------------------------ */

  const mutation = useMutation({
    mutationFn: async (payload: MemberStoreRequest) => {
      return await memberStoreAction(payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization:members"],
      });

      toast.success('Organization member added')
      setForm(initialForm);

      setIsOpen(false);
    },
  });

  /* ------------------------------------------------------------------------ */
  /*                              Handle Change                               */
  /* ------------------------------------------------------------------------ */

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ------------------------------------------------------------------------ */
  /*                              Handle Submit                               */
  /* ------------------------------------------------------------------------ */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    mutation.mutate(form);
  };

  /* ------------------------------------------------------------------------ */
  /*                                   Render                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="p-6 space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Members</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          + Create Member
        </button>
      </div>

      {/* Loading */}

      {isLoading && (
        <p className="text-sm text-gray-500">
          Loading members...
        </p>
      )}

      {/* Members Table */}

      {!isLoading && (
        <div className="overflow-x-auto border border-gray-200 rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Invited By</th>
                <th className="p-4 font-medium">Invited Email</th>
              </tr>
            </thead>

            <tbody>
              {members?.map((member, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-100"
                >
                  <td className="p-4">{member.user_name}</td>

                  <td className="p-4">{member.user_email}</td>

                  <td className="p-4 capitalize">
                    {member.user_type}
                  </td>

                  <td className="p-4">
                    {member.invited_by_name}
                  </td>

                  <td className="p-4">
                    {member.invited_by_email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Member"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Name */}

          <Input
            value={form.name}
            onChange={(e) =>
              handleChange("name", e.target.value)
            }
            placeholder="Full Name"
            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
          />

          {/* Email */}

          <Input
            type="email"
            value={form.email}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
            placeholder="Email Address"
            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
          />

          {/* Phone */}

          <Input
            value={form.phone}
            onChange={(e) =>
              handleChange("phone", e.target.value)
            }
            placeholder="Phone Number"
            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
          />

          {/* Password */}

          <Input
            type="password"
            value={form.password}
            onChange={(e) =>
              handleChange("password", e.target.value)
            }
            placeholder="Password"
            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
          />

          {/* Confirm Password */}

          <Input
            type="password"
            value={form.password_confirmation}
            onChange={(e) =>
              handleChange(
                "password_confirmation",
                e.target.value
              )
            }
            placeholder="Confirm Password"
            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
          />

          {/* Role Select */}

          <Select
            value={form.role_id}
            onValueChange={(value) =>
              handleChange("role_id", value)
            }
          >
            <SelectTrigger className="w-full !h-11 border-gray-300 focus:ring-1 focus:ring-gray-900">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>

            <SelectContent>
              {roles?.map((role) => (
                <SelectItem
                  key={role.id}
                  value={role.id}
                >
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Error Message */}

          {mutation.isError && (
            <p className="text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          )}

          {/* Footer */}

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
              disabled={mutation.isPending}
              className="px-4 py-2 bg-black text-white rounded-xl text-sm disabled:opacity-50"
            >
              {mutation.isPending
                ? "Creating..."
                : "Create Member"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}