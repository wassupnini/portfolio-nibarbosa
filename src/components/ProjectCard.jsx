import { Link } from 'react-router-dom'
import Card from './Card.jsx'

export default function ProjectCard({ repo }) {
  return (
    <Card className="project-card">
      <div className="project-card-header">
        <h3>{repo.name}</h3>
        <span className="tag">Em grupo</span>
      </div>
      <p>{repo.description || 'Sem descrição.'}</p>
      <div className="project-meta">
        {repo.language && <span className="tag">{repo.language}</span>}
      </div>
      <Link to={`/projetos/${repo.slug}`} className="project-link">
        Ver projeto →
      </Link>
    </Card>
  )
}