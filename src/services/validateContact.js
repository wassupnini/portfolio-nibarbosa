export function validateContact({ name, email, message }) {
  const errors = {}

  if (name.trim().length < 2) {
    errors.name = 'O nome precisa ter no mínimo 2 caracteres.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'E-mail inválido.'
  }
  if (message.trim().length < 20) {
    errors.message = 'A mensagem precisa ter no mínimo 20 caracteres.'
  }

  return errors
}