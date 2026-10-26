import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getSession } from '../services/auth.js'

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
    getSession().then((session) => {
      if (active) setStatus(session ? 'ok' : 'no')
    })
    return () => {
      active = false
    }
  }, [])

  if (status === 'loading') {
    return (
      <main className="page">
        <p className="state-msg">Verificando acesso...</p>
      </main>
    )
  }

  if (status === 'no') return <Navigate to="/login" replace />

  return children
}