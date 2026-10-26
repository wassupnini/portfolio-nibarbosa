import { Link, useParams } from 'react-router-dom'
import { useGithubRepos } from '../hooks/useGithubRepos.js'
import Card from '../components/Card.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Button from '../components/Button.jsx'

// Minha contribuição em cada projeto em grupo, pelo slug do repositório
const MY_PART = {
  orbitwatch:
    'Fiz os ajustes finais do projeto, revisando e corrigindo detalhes antes da entrega, e integrei essas mudanças ao repositório por meio de pull request.',
  'vinheria-agnello':
    'Criei a página de produtos com tabela, lista e estilos em CSS, corrigi o texto, e desenvolvi o efeito de diamante e o hover nas categorias, além da personalização da seleção de texto.',
  'social-connect':
    'Fiz a documentação do projeto no README, com o resumo, a lista de integrantes, as tecnologias utilizadas e o link do GitHub Pages.',
}

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
        <p className="state-msg">
          <Link to="/" className="project-link">
            Voltar para a home
          </Link>
        </p>
      </main>
    )
  }

  const repo = repos.find((r) => r.slug === slug)

  if (!repo) {
    return (
      <main className="page">
        <p className="state-msg">Projeto não encontrado.</p>
        <p className="state-msg">
          <Link to="/" className="project-link">
            Voltar para a home
          </Link>
        </p>
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
        <p>
          <strong>Minha parte:</strong> {MY_PART[repo.slug] || 'Descreva aqui sua contribuição.'}
        </p>
        <div>
          <a href={repo.url} target="_blank" rel="noreferrer">
            <Button>Ver no GitHub</Button>
          </a>
        </div>
      </Card>
      <p className="state-msg">
        <Link to="/" className="project-link">
          ← Voltar para a home
        </Link>
      </p>
    </main>
  )
}
