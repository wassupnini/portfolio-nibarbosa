import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export async function sendContactMessage({ name, email, message }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('Configuração de e-mail ausente. Verifique o arquivo .env.')
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    { from_name: name, from_email: email, message },
    { publicKey: PUBLIC_KEY },
  )
}