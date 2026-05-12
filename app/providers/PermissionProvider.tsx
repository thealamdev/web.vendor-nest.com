"use client"
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { PermissionContext } from '../context/PermissionContext'
import { api } from '@/lib/api'

interface PageProps {
  children: Readonly<ReactNode>
}

export default function PermissionProvider({
  children
}: PageProps) {

  const [activeRole, setActiveRole] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await api.get('/user-management/role/getAll');
      setActiveRole(response?.data?.payload[0]?.id ?? '')
    }
    fetchRoles()
  }, [])

  useEffect(() => {
    try {
      setLoading(false);
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

  }, [activeRole])


  return (
    <PermissionContext.Provider value={{
      permissions: permissions,
      isLoading: isLoading
    }}>
      <div>{children}</div>
    </PermissionContext.Provider>
  )
}
