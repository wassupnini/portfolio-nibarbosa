import { useState } from 'react'
import { sendContactMessage } from '../services/messages.js'
import { validateContact } from '../services/validateContact.js'
import Button from './Button.jsx'
import Card from './Card.jsx'
import SectionTitle from './SectionTitle.jsx'

const EMPTY_FORM = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const found = validateContact(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('sending')
    try {
      await sendContactMessage(form)
      setForm(EMPTY_FORM)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="page">
      <SectionTitle>Contato</SectionTitle>
      <Card className="contact-card">
        <form className="stack" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              name="name"
              className="input"
              placeholder="Seu nome"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              className="input"
              placeholder="seuemail@exemplo.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="message">Mensagem</label>
            <textarea
              id="message"
              name="message"
              className="input"
              placeholder="Escreva sua mensagem..."
              value={form.message}
              onChange={handleChange}
            />
            {errors.message && <span className="field-error">{errors.message}</span>}
          </div>

          <Button type="submit" disabled={status === 'sending'}>
            {status === 'sending' && <span className="spinner" />}
            {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
          </Button>

          {status === 'success' && (
            <p className="form-status success">Mensagem enviada com sucesso!</p>
          )}
          {status === 'error' && (
            <p className="form-status error">
              Não foi possível enviar. Tente novamente em instantes.
            </p>
          )}
        </form>
      </Card>
    </section>
  )
}
