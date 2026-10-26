import { useEffect, useState } from 'react'
import { useGithubRepos } from '../hooks/useGithubRepos.js'
import { supabase } from '../services/supabase.js'
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
  const { repos, loading: reposLoading, error: reposError } = useGithubRepos()
  const [featured, setFeatured] = useState(null) // null = ainda carregando
  const [featuredError, setFeaturedError] = useState(false)

  useEffect(() => {
    supabase
      .from('featured_projects')
      .select('slug')
      .order('position')
      .then(({ data, error }) => {
        if (error) setFeaturedError(true)
        else setFeatured(data.map((row) => row.slug))
      })
  }, [])

  const loading = reposLoading || (featured === null && !featuredError)
  const error = reposError || (featuredError ? 'Não foi possível carregar os destaques.' : null)

  // Mantém a ordem em que os projetos foram marcados no dashboard
  const visible = featured
    ? featured.map((slug) => repos.find((r) => r.slug === slug)).filter(Boolean)
    : []

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

      {!loading && error && <p className="state-msg">Não foi possível carregar os projetos. {error}</p>}

      {!loading && !error && visible.length === 0 && (
        <p className="state-msg">Nenhum projeto em destaque.</p>
      )}

      {!loading && !error && visible.length > 0 && (
        <div className="project-grid">
          {visible.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </section>
  )
}