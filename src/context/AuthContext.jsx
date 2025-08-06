import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('twitch_monitor_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email === 'demo@example.com' && password === 'password') {
      const userData = {
        id: 1,
        name: 'Demo User',
        email: email,
        subscription: 'pro',
        joinedAt: new Date().toISOString()
      }
      setUser(userData)
      localStorage.setItem('twitch_monitor_user', JSON.stringify(userData))
      return userData
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const signup = async (name, email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const userData = {
      id: Date.now(),
      name,
      email,
      subscription: 'free',
      joinedAt: new Date().toISOString()
    }
    setUser(userData)
    localStorage.setItem('twitch_monitor_user', JSON.stringify(userData))
    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('twitch_monitor_user')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}