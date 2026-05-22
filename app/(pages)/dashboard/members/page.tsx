"use client";

import React, { useActionState, useEffect, useState } from "react";
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
import { memberUpdateAction, MemberUpdateRequest } from "@/app/actions/dashboard/members/member-update.aciton";

export type Member = {
  id: string;
  user: {
    name: string;
    email: string;
    type: string;
  };
  inviter: {
    name: string;
    email: string;
    type: string;
  };
  roles: Role[];
};

export type Role = {
  id: string;
  name: string;
  slug: string;
};

const fetchMembers = async (): Promise<Member[]> => {
  const res = await api.get("/user-management/member/members");
  return res.data?.payload;
};

const fetchOneMember = async (memberId: string): Promise<Member> => {
  const res = await api.get(`/user-management/member/show/${memberId}`);
  return res.data?.payload;
}

const fetchRoles = async (): Promise<Role[]> => {
  const res = await api.get("/user-management/role/getAll");
  return res.data?.payload;
};

const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
      {name?.charAt(0)?.toUpperCase()}
    </div>
  );
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

  const initialUpdateForm = {
    role_ids: [],
  }

  const [form, setForm] = useState<MemberStoreRequest>(initialForm);
  const [updateForm, setUpdateForm] = useState<MemberUpdateRequest>(initialUpdateForm);
  const [selectedMember, setSelectedMember] = useState<string>('');

  const { data: members = [], isLoading } = useQuery<Member[]>({
    queryKey: ["organization:members"],
    queryFn: fetchMembers,
  });

  const { data: member, error: memberError, isLoading: isLoadingMember } = useQuery<Member>({
    queryKey: ["organization:member", selectedMember],
    queryFn: () => fetchOneMember(selectedMember),
    enabled: !!selectedMember,
  });

  useEffect(() => {
    setUpdateForm((prev: any) => (
      {
        ...prev,
        role_ids: member?.roles.map((r) => {
          return r.id;
        })
      }
    ))
  }, [member])

  const { data: roles = [] } = useQuery({
    queryKey: ["organization:roles"],
    queryFn: fetchRoles,
  });

  const handleUpdate = (memberId: string) => {
    setSelectedMember(memberId);
    setIsOpenUpdate(true);
  };

  const handleRemove = (type: string, memberId: string) => {
    if (type === 'update') {
      setUpdateForm((prev) => (
        {
          ...prev,
          role_ids: prev.role_ids.filter((r) => r !== memberId)
        }
      ))
    }
    if (type === 'store') {
      setForm((prev) => (
        {
          ...prev,
          role_ids: prev.role_ids.filter((r) => r !== memberId)
        }
      ))
    }
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

  const handleUpdateAction = async () => {
    const res = await memberUpdateAction(selectedMember, updateForm);

    if (res.success) {
      queryClient.invalidateQueries({ queryKey: ["organization:members"] });
      toast.success("Organization member update");
      setForm(initialForm);
      setIsOpen(false);
    } else {
      toast.error(res.message ?? "Something went wrong!");
    }

    return res;
  };

  const [res, action, isPending] = useActionState(handleSubmit, null);
  const [upRes, updateAction, upIspending] = useActionState(handleUpdateAction, null);
  const fieldErrors = res?.errors ?? {};

  const handleChange = (name: string, value: string) => {
    if (name === "role_ids") {
      setForm((prev) => {
        const exist = prev.role_ids.includes(value);
        return {
          ...prev,
          role_ids: exist
            ? prev.role_ids.filter((r) => r !== value)
            : [...prev.role_ids, value],
        };
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateChange = (name: string, value: string) => {
    setUpdateForm((prev) => {
      const exist = prev.role_ids.includes(value);
      return {
        ...prev,
        role_ids: exist
          ? prev.role_ids.filter((r) => r !== value)
          : [...prev.role_ids, value],
      };
    });
  }

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
        <p className="text-sm text-gray-500">Loading members...</p>
      )}

      {/* Table */}
      {!isLoading && (
        <div className="overflow-x-auto border border-gray-200 rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Inviter</th>
                <th className="p-4 font-medium">Roles</th>
                <th className="p-4 font-medium text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-t border-gray-100">

                  {/* USER */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={member.user.name} />
                      <div>
                        <p className="font-medium">{member.user.name}</p>
                        <p className="text-xs text-gray-500">
                          {member.user.email}
                        </p>
                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full capitalize">
                          {member.user.type}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* INVITER */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={member.inviter.name} />
                      <div>
                        <p className="font-medium">{member.inviter.name}</p>
                        <p className="text-xs text-gray-500">
                          {member.inviter.email}
                        </p>
                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full capitalize">
                          {member.inviter.type}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* ROLES */}
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {member.roles.map((role) => (
                        <span
                          key={role.id}
                          className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-xs"
                        >
                          {role.name}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 text-end">
                    <Button
                      type="button"
                      onClick={() => handleUpdate(member.id)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Modal */}
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
          handleRemove={handleRemove}
        />
      </Modal>

      {/* Update Modal */}
      <Modal
        isOpen={isOpenUpdate}
        onClose={() => setIsOpenUpdate(false)}
        title="Update Member"
      >
        <MemberUpdateComponent
          action={updateAction}
          isPending={upIspending}
          loading={isLoadingMember}
          error={memberError}
          member={member}
          roles={roles}
          handleUpdateChange={handleUpdateChange}
          updateForm={updateForm}
          handleRemove={handleRemove}
        />
      </Modal>
    </div>
  );
}