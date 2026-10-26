import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase.js'
import { signOut } from '../services/auth.js'
import { useGithubRepos } from '../hooks/useGithubRepos.js'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import SectionTitle from '../components/SectionTitle.jsx'

export default function Dashboard() {
  const navigate = useNavigate()
  const { repos, loading: reposLoading, error: reposError } = useGithubRepos()
  const [messages, setMessages] = useState([])
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function loadData() {
    setError(null)
    const [m, f] = await Promise.all([
      supabase.from('messages').select('*').order('created_at', { ascending: false }),
      supabase.from('featured_projects').select('slug').order('position'),
    ])
    if (m.error || f.error) {
      setError('Não foi possível carregar os dados.')
    } else {
      setMessages(m.data)
      setFeatured(f.data.map((row) => row.slug))
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function toggleAnswered(msg) {
    const { error } = await supabase
      .from('messages')
      .update({ answered: !msg.answered })
      .eq('id', msg.id)
    if (error) return setError('Não foi possível atualizar a mensagem.')
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, answered: !m.answered } : m)),
    )
  }

  async function toggleFeatured(slug) {
    if (featured.includes(slug)) {
      await supabase.from('featured_projects').delete().eq('slug', slug)
    } else {
      await supabase
        .from('featured_projects')
        .insert({ slug, position: featured.length })
    }
    loadData()
  }

  async function handleLogout() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <main className="page">
      <div className="project-card-header">
        <SectionTitle>Dashboard</SectionTitle>
        <Button onClick={handleLogout}>Sair</Button>
      </div>

      {error && <p className="state-msg">{error}</p>}
      {loading && <p className="state-msg">Carregando mensagens...</p>}

      {!loading && (
        <>
          <h2 className="section-title">Mensagens</h2>
          {messages.length === 0 && <p className="state-msg">Nenhuma mensagem recebida.</p>}
          <div className="stack">
            {messages.map((msg) => (
              <Card key={msg.id} className="stack">
                <div className="project-card-header">
                  <strong>{msg.name}</strong>
                  <span className="tag">{msg.answered ? 'Respondida' : 'Pendente'}</span>
                </div>
                <p>{msg.email}</p>
                <p>{msg.message}</p>
                <div>
                  <Button onClick={() => toggleAnswered(msg)}>
                    {msg.answered ? 'Marcar como pendente' : 'Marcar como respondida'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <h2 className="section-title">Projetos em destaque</h2>
          {reposLoading && <p className="state-msg">Carregando projetos...</p>}
          {reposError && <p className="state-msg">{reposError}</p>}
          <div className="stack">
            {repos.map((repo) => (
              <Card key={repo.id} className="project-card-header">
                <span>{repo.name}</span>
                <Button onClick={() => toggleFeatured(repo.slug)}>
                  {featured.includes(repo.slug) ? 'Remover destaque' : 'Destacar'}
                </Button>
              </Card>
            ))}
          </div>
        </>
      )}
    </main>
  )
}