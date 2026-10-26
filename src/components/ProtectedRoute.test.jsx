import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.jsx'

vi.mock('../services/auth.js', () => ({
  getSession: vi.fn(() => Promise.resolve(null)),
}))

describe('ProtectedRoute', () => {
  it('redireciona para /login quando não há sessão', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<p>Tela de login</p>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <p>Conteúdo privado</p>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => expect(screen.getByText('Tela de login')).toBeInTheDocument())
    expect(screen.queryByText('Conteúdo privado')).not.toBeInTheDocument()
  })
})
