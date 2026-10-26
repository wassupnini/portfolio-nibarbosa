import { useGithubRepos } from '../hooks/useGithubRepos.js'
import Card from './Card.jsx'
import ProjectCard from './ProjectCard.jsx'
import SectionTitle from './SectionTitle.jsx'

function ProjectSkeleton() {
  return (
    <Card className="project-card">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line short" />
    </Card>
  )
}

export default function Projects() {
  const { repos, loading, error } = useGithubRepos()

  return (
    <section className="page">
      <SectionTitle>Projetos</SectionTitle>

      {loading && (
        <div className="project-grid">
          {[0, 1, 2].map((i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="state-msg">Não foi possível carregar os projetos. {error}</p>
      )}

      {!loading && !error && repos.length === 0 && (
        <p className="state-msg">Nenhum projeto encontrado.</p>
      )}

      {!loading && !error && repos.length > 0 && (
        <div className="project-grid">
          {repos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </section>
  )
}