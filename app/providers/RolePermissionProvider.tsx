"use client";

import React, { ReactNode, useEffect, useState } from 'react'
import { RolePermissionContext } from '../context/RolePermissionContext'
import { api } from '@/lib/api'

interface PageProps {
  children: Readonly<ReactNode>
}

export default function RolePermissionProvider({
  children
}: PageProps) {

  const [activeRole, setActiveRole] = useState('');
  const [roles, setRoles] = useState<[]>([]);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await api.get('/user-management/role/getAll');
      const fetchedRoles = response?.data?.payload ?? [];
      setRoles(fetchedRoles);
      
      const storedRole = localStorage.getItem('role');

      const roleExists = fetchedRoles.some(
        (role: any) => role.id === storedRole
      );

      if (storedRole && roleExists) {
        setActiveRole(storedRole);
      } else {
        const firstRoleId = fetchedRoles[0]?.id ?? '';

        setActiveRole(firstRoleId);

        localStorage.setItem('role', firstRoleId);
      }
    }
    fetchRoles();
  }, [])

  useEffect(() => {
    if (!activeRole) return;
    setLoading(true);
    try {
      const fetchPermission = async () => {
        const response = await api.get(`/user-management/permissions/get/${activeRole}`);
        setPermissions(response?.data?.payload?.permissions)
      }
      if (activeRole) {
        fetchPermission()
      }
    } catch (error) {

    } finally {
      setLoading(false)
    }

  }, [activeRole]);

  const changeRole = (roleId: string) => {
    setActiveRole(roleId);
    localStorage.setItem('role', roleId);
  };

  return (
    <RolePermissionContext.Provider value={{
      roleId: activeRole,
      roles: roles,
      permissions: permissions,
      isLoading: isLoading,
      changeRole
    }}>
      <div>{children}</div>
    </RolePermissionContext.Provider>
  )
}
