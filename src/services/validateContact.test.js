import { describe, it, expect } from 'vitest'
import { validateContact } from './validateContact.js'

describe('validateContact', () => {
  it('retorna erros para todos os campos vazios', () => {
    const errors = validateContact({ name: '', email: '', message: '' })
    expect(errors.name).toBeDefined()
    expect(errors.email).toBeDefined()
    expect(errors.message).toBeDefined()
  })

  it('rejeita e-mail sem @', () => {
    const errors = validateContact({
      name: 'Nicole',
      email: 'nicole.gmail.com',
      message: 'Uma mensagem com mais de vinte caracteres.',
    })
    expect(errors.email).toBe('E-mail inválido.')
  })

  it('rejeita mensagem com menos de 20 caracteres', () => {
    const errors = validateContact({
      name: 'Nicole',
      email: 'nicole@exemplo.com',
      message: 'curta',
    })
    expect(errors.message).toBe('A mensagem precisa ter no mínimo 20 caracteres.')
  })

  it('aceita dados válidos', () => {
    const errors = validateContact({
      name: 'Nicole',
      email: 'nicole@exemplo.com',
      message: 'Uma mensagem com mais de vinte caracteres.',
    })
    expect(errors).toEqual({})
  })
})