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

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await api.get('/user-management/role/getAll');
      setActiveRole(response?.data?.payload[0]?.id ?? '')
    }
    fetchRoles()
  }, [])

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await api.get(`/user-management/permissions/get/${activeRole}`)
      console.log(response)
    }
    if (activeRole) {
      fetchPermission()
    }
  }, [activeRole])


  return (
    <PermissionContext.Provider value={null}>
      <div>{children}</div>
    </PermissionContext.Provider>
  )
}
