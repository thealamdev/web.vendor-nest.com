"use client";

import {
  RolePermissionContext,
  RolePermissionResponse
} from '@/app/context/RolePermissionContext';
import { hasPermission } from '@/app/utils/PermissionHandler';
import { Button } from '@/components/ui/button';
import UnauthorizedComponent from '@/components/utilities/UnauthorizedComponent';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import React, { useContext } from 'react';

const Unauthorized = () => {
  return (
    <UnauthorizedComponent />
  )
}

const fetchRoles = async () => {
  const res = await api.get('/user-management/role/getAll');
  return res.data.payload;
}

export default function RolePermission() {
  const {
    permissions,
    isLoading
  } = useContext<RolePermissionResponse>(RolePermissionContext);

  const router = useRouter();

  const {
    data: roles = [],
    isLoading: roleLoading,
    error
  } = useQuery<any>({
    queryKey: ['roles:all'],
    queryFn: fetchRoles
  });

  if (roleLoading || isLoading) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-semibold text-gray-900">
            Roles
          </h1>
          <Button
            onClick={() => router.push('/dashboard/role-permisson/create')}
            className='cursor-pointer'>+ Create Role</Button>
        </div>

        {hasPermission('role.view', permissions) ? (
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-gray-50">
                <tr className="text-left text-sm text-gray-600">

                  <th className="px-6 py-4 font-medium">
                    Name
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Organization
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Created By
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Type
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Editable
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {roles?.map((role: any) => {

                  return (
                    <tr
                      key={role.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >

                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {role.name}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {role.description}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div>
                          <p>{role.organization?.name}</p>

                          <p className="text-xs text-gray-500 mt-1">
                            {role.organization?.email}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div>
                          <p>{role.created_by?.name}</p>

                          <p className="text-xs text-gray-500 mt-1">
                            {role.created_by?.email}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                          {role.organization_type}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {role.is_editable ? (
                          <span className="text-green-600 font-medium">
                            Yes
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            No
                          </span>
                        )}
                      </td>

                      <td className='text-center'>
                        <Button
                          type='button'
                          onClick={() => router.push(`/dashboard/role-permisson/update/${role?.id}`)}
                        >Edit</Button>
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>
          </div>
        ) : (
          <Unauthorized />
        )}
      </div>
    </div>
  );
}