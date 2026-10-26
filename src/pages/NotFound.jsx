import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle.jsx'

export default function NotFound() {
  return (
    <main className="page not-found">
      <SectionTitle>Página não encontrada (404)</SectionTitle>
      <p className="state-msg">O endereço que você acessou não existe.</p>
      <Link to="/" className="btn">
        Voltar para a home
      </Link>
    </main>
  )
}
