const GITHUB_USER = 'wassupnini'
const CACHE_TTL = 1000 * 60 * 10 // 10 minutos

// Cache em memória: como é um módulo, sobrevive à navegação entre páginas
let cache = null

export async function fetchProjects() {
  if (cache && Date.now() - cache.time < CACHE_TTL) {
    return cache.data
  }

  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
    { headers: { Accept: 'application/vnd.github+json' } },
  )

  if (response.status === 403) {
    throw new Error('Limite de requisições do GitHub atingido. Tente novamente mais tarde.')
  }
  if (!response.ok) {
    throw new Error('Não foi possível carregar os projetos.')
  }

  const repos = await response.json()

  // Só forks (projetos em grupo). O portfólio não é fork, então fica de fora.
  const data = repos
    .filter((repo) => repo.topics?.includes('portfolio-grupo'))
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      slug: repo.name.toLowerCase(),
      description: repo.description,
      language: repo.language,
      updatedAt: repo.updated_at,
      url: repo.html_url,
    }))

  cache = { data, time: Date.now() }
  return data
}
