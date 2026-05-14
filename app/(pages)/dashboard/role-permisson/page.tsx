"use client";

import {
  RolePermissionContext,
  RolePermissionResponse
} from '@/app/context/RolePermissionContext';
import UnauthorizedComponent from '@/components/utilities/Unauthorized';

import React, { useContext } from 'react';

const Unauthorized = () => {
  return (
    <UnauthorizedComponent />
  )
}

export default function RolePermission() {
  const {
    roles,
    permissions,
    isLoading,
    changeRole,
    roleId
  } = useContext<RolePermissionResponse>(RolePermissionContext);

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

        <div className="px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-semibold text-gray-900">
            Roles
          </h1>
        </div>

        {permissions.includes('role.view') ? (
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

                  const isActive = roleId === role.id;

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

                      <td className="px-6 py-4">

                        <button
                          onClick={() => changeRole(role.id)}
                          className={`
                 px-4 py-2 rounded-xl text-sm font-medium transition
                 ${isActive
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }
               `}
                        >
                          {isActive ? 'Selected' : 'Select'}
                        </button>

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