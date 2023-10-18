import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../AuthContext';

export default function Logout() {
    const { setIsLoggedIn } = useAuth();
  return (
    setIsLoggedIn(false)
  )
}