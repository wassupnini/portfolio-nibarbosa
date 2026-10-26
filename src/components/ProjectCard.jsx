import Card from './Card.jsx'

export default function ProjectCard({ repo }) {
  return (
    <Card>
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <span>{repo.language}</span>
    </Card>
  )
}