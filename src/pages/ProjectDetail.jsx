import { Link, useParams } from 'react-router-dom'
import { useGithubRepos } from '../hooks/useGithubRepos.js'
import Card from '../components/Card.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Button from '../components/Button.jsx'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { repos, loading, error } = useGithubRepos()

  if (loading) {
    return (
      <main className="page">
        <Card>
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-line" />
        </Card>
      </main>
    )
  }

  if (error) {
    return (
      <main className="page">
        <p className="state-msg">Não foi possível carregar o projeto. {error}</p>
        <p className="state-msg"><Link to="/" className="project-link">Voltar para a home</Link></p>
      </main>
    )
  }

  const repo = repos.find((r) => r.slug === slug)

  if (!repo) {
    return (
      <main className="page">
        <p className="state-msg">Projeto não encontrado.</p>
        <p className="state-msg"><Link to="/" className="project-link">Voltar para a home</Link></p>
      </main>
    )
  }

  return (
    <main className="page">
      <SectionTitle>{repo.name.replace(/-/g, ' ')}</SectionTitle>
      <Card className="stack">
        <span className="tag">Projeto em grupo</span>
        <p>{repo.description || 'Sem descrição.'}</p>
        {repo.language && <span className="tag">{repo.language}</span>}
        <p><strong>Minha parte:</strong> escreva aqui sua contribuição.</p>
        <div>
          <a href={repo.url} target="_blank" rel="noreferrer">
            <Button>Ver no GitHub</Button>
          </a>
        </div>
      </Card>
      <p className="state-msg"><Link to="/" className="project-link">← Voltar para a home</Link></p>
    </main>
  )
}