import { useEffect, useState } from 'react'
import { fetchProjects } from '../services/github.js'

export function useGithubRepos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    fetchProjects()
      .then((data) => {
        if (active) setRepos(data)
      })
      .catch((err) => {
        if (active) setError(err.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { repos, loading, error }
}
