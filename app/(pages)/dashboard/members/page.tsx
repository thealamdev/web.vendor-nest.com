"use client";

import { Input } from "@/components/ui/input";
import Modal from "@/components/utilities/Modal";
import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

type Member = {
  user_name: string;
  user_email: string;
  user_type: string;
  invited_by_name: string;
  invited_by_email: string;
  invited_by_type: string;
};

const fetchMembers = async (): Promise<Member[]> => {
  const res = await api.get("/user-management/member/members");
  return res.data.payload;
};

const createMember = async (payload: any) => {
  const res = await api.post("/user-management/member/members", payload);
  return res.data;
};

export default function Page() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  // form state
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    user_type: "vendor",
    invited_by_name: "",
    invited_by_email: "",
    invited_by_type: "vendor",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["organization:members"],
    queryFn: fetchMembers,
  });

  const mutation = useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization:members"],
      });
      setIsOpen(false);
      setForm({
        user_name: "",
        user_email: "",
        user_type: "vendor",
        invited_by_name: "",
        invited_by_email: "",
        invited_by_type: "vendor",
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

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
      {isLoading && <p>Loading members...</p>}

      {/* Error */}
      {error && (
        <p className="text-red-500">Failed to load members</p>
      )}

      {/* Table */}
      {data && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Type</th>
                <th className="p-3">Invited By</th>
                <th className="p-3">Invited Email</th>
              </tr>
            </thead>

            <tbody>
              {data.map((member, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{member.user_name}</td>
                  <td className="p-3">{member.user_email}</td>
                  <td className="p-3 capitalize">{member.user_type}</td>
                  <td className="p-3">{member.invited_by_name}</td>
                  <td className="p-3">{member.invited_by_email}</td>
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
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            id="name"
            name="user_name"
            type="text"
            placeholder="John Doe"
            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
            onChange={handleChange}
          />

          <Input
            name="user_email"
            type="email"
            placeholder="john@gmail.com"
            className="h-11 border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-900"
            onChange={handleChange}
          />

          <select
            name="user_type"
            onChange={handleChange}
            className="h-11 w-full border border-gray-300 rounded-xl px-3 focus:ring-1 focus:ring-gray-900"
          >
            <option value="vendor">Vendor</option>
            <option value="platform">Platform</option>
          </select>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-black text-white"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}