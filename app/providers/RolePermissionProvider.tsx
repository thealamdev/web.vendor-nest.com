"use client";

import React, { ReactNode, useEffect, useState } from 'react'
import { RolePermissionContext } from '../context/RolePermissionContext'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query';

interface PageProps {
  children: Readonly<ReactNode>
}

const fetchPermissions = async () => {
  const response = await api.get(`/user-management/permissions/memberPermissions`);
  return response.data.payload;
}

export default function RolePermissionProvider({
  children
}: PageProps) {

  const { data: permissions, error, isPending } = useQuery({
    queryKey: ['permissions:all'],
    queryFn: fetchPermissions
  });

  return (
    <RolePermissionContext.Provider value={{
      permissions: permissions,
      isLoading: isPending,
    }}>
      <div>{children}</div>
    </RolePermissionContext.Provider>
  )
}
