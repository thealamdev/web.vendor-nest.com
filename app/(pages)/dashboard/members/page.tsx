"use client";

import React, { useActionState, useState } from "react";
import Modal from "@/components/utilities/Modal";
import { api } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  memberStoreAction,
  MemberStoreRequest,
} from "@/app/actions/dashboard/members/member-store-action";
import { toast } from "sonner";
import MemberStoreComponent from "./components/MemberStoreComponent";
import { Button } from "@/components/ui/button";
import MemberUpdateComponent from "./components/MemberUpdateComponent";

type Member = {
  id: string;
  user_name: string;
  user_email: string;
  user_type: string;
  invited_by_name: string;
  invited_by_email: string;
};

export type Role = {
  id: string;
  name: string;
};

const fetchMembers = async (): Promise<Member[]> => {
  const res = await api.get("/user-management/member/members");
  return res.data?.payload;
};

const fetchRoles = async (): Promise<Role[]> => {
  const res = await api.get("/user-management/role/getAll");
  return res.data?.payload;
};

export default function Page() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const initialForm: MemberStoreRequest = {
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    role_ids: [],
  };

  const [form, setForm] = useState<MemberStoreRequest>(initialForm);
  const [member, setMember] = useState<Member>();

  const { data: members = [], isLoading } = useQuery<Member[]>({
    queryKey: ["organization:members"],
    queryFn: fetchMembers,
  });

  const { data: roles = [] } = useQuery({
    queryKey: ["organization:roles"],
    queryFn: fetchRoles,
  });

  const handleUpdate = (memberId: string) => {
    setIsOpenUpdate(true);
    setMember(members?.find((member: Member) => member.id === memberId))
  }

  const handleSubmit = async () => {
    const res = await memberStoreAction(form);

    if (res.success) {
      queryClient.invalidateQueries({ queryKey: ["organization:members"] });
      toast.success("Organization member added");
      setForm(initialForm);
      setIsOpen(false);
    } else {
      toast.error(res.message ?? "Something went wrong!");
    }

    return res;
  };

  const [res, action, isPending] = useActionState(handleSubmit, null);

  const fieldErrors = res?.errors ?? {};

  const handleChange = (name: string, value: string) => {
    if (name === 'role_ids') {
      setForm((prev) => {
        const exist = prev.role_ids.includes(value);
        if (exist) return prev;
        return {
          ...prev,
          role_ids: exist ? prev.role_ids.filter(item => item !== value) : [...prev.role_ids, value]
        }
      })
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Members</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          + Create Member
        </button>
      </div>

      {isLoading && (
        <p className="text-sm text-gray-500">Loading members...</p>
      )}

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
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {members?.map((member, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="p-4">{member.user_name}</td>
                  <td className="p-4">{member.user_email}</td>
                  <td className="p-4 capitalize">{member.user_type}</td>
                  <td className="p-4">{member.invited_by_name}</td>
                  <td className="p-4">{member.invited_by_email}</td>
                  <td>
                    <Button
                      type="button"
                      onClick={() => handleUpdate(member?.id)}
                    >Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Member"
      >
        <MemberStoreComponent
          action={action}
          form={form}
          fieldErrors={fieldErrors}
          handleChange={handleChange}
          roles={roles}
          setIsOpen={setIsOpen}
          isPending={isPending}
        />
      </Modal>

      <Modal
        isOpen={isOpenUpdate}
        onClose={() => setIsOpenUpdate(false)}
        title="Create Member"
      >
        <pre>{JSON.stringify(member, null, 2)}</pre>
        <MemberUpdateComponent />
      </Modal>
    </div>
  );
}