import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'

// O dashboard só é baixado quando alguém abre /dashboard
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<p className="state-msg">Carregando...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/projetos/:slug" element={<ProjectDetail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
