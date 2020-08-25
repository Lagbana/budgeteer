import React, { useState, useEffect } from 'react'
import { Routes } from './Routes'
import { setAccessToken } from './utils/accessToken'

interface Props {}

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8080/refresh_token', {
      method: 'POST',
      credentials: 'include'
    }).then(async context => {
      const { accessToken } = await context.json()
      setAccessToken(accessToken)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div>loading...</div>
  }
  return <Routes />
}
