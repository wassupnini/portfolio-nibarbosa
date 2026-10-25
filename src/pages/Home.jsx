import { useTheme } from '../hooks/useTheme.js'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import SectionTitle from '../components/SectionTitle.jsx'

export default function Home() {
  const { theme, toggleTheme } = useTheme()

  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <SectionTitle>Home</SectionTitle>
      <Card>
        <p>Tema atual: {theme}</p>
        <Button onClick={toggleTheme}>Alternar tema</Button>
      </Card>
      <Card className="mt-4">
        <p>Card de teste</p>
        <Button disabled>Botão desabilitado</Button>
      </Card>
    </main>
  )
}