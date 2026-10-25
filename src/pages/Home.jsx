import { useTheme } from '../hooks/useTheme.js'

export default function Home() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div>
      <h1>Home</h1>
      <p>Tema atual: {theme}</p>
      <button onClick={toggleTheme}>Alternar tema</button>
    </div>
  )
}