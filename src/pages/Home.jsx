import { useGithubRepos } from '../hooks/useGithubRepos.js'

export default function Home() {
  const { repos, loading, error } = useGithubRepos()

  if (loading) return <p>Carregando...</p>
  if (error) return <p>Erro: {error}</p>
  if (repos.length === 0) return <p>Nenhum projeto encontrado.</p>

  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>{repo.name}: {repo.description}</li>
      ))}
    </ul>
  )
}