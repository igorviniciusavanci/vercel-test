const creditCardMask = (value: string): string => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{4})(\d)/, '$1 $2') // captura 2 grupos de numero o primeiro de 2 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})\d+?$/, '$1')
}

const cepMask = (value: string): string => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1') // captura 3 numeros seguidos de um traço e não deixa ser digitado mais nada
}

const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

const cnpjMask = (value: string): string => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

const phoneMask = (value: string): string => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{1})/, '($1')
    .replace(/(\d{2})(\d)/, '$1) $2')
    .replace(/(\d{4})(\d)/, ' $1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, ' $1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1')
}

const removeMask = (value: string): string => {
  return value.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
}

export { creditCardMask, cpfMask, cepMask, phoneMask, cnpjMask, removeMask }
