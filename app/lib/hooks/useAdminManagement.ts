import { useState } from 'react'

export function useAdminManagement() {
  const [admins, setAdmins] = useState<string[]>(['0x123...']) // Mock owner/admin

  const addAdmin = (address: string) => {
    setAdmins(prev => [...prev, address])
  }

  const removeAdmin = (address: string) => {
    setAdmins(prev => prev.filter(a => a !== address))
  }

  const isAdmin = (address: string) => {
    return admins.includes(address)
  }

  return {
    admins,
    addAdmin,
    removeAdmin,
    isAdmin
  }
}