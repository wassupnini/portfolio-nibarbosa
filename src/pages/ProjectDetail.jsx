import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { slug } = useParams()
  return <h1>Projeto: {slug}</h1>
}