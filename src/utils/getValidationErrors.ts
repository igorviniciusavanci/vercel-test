import type { ValidationError } from 'yup'

interface Errors {
  [key: string]: string
}

export default function getValidationsErrors(err: ValidationError): Errors {
  const validationsErrors: Errors = {}

  err.inner.forEach(error => {
    validationsErrors[error.path] = error.message
  })

  return validationsErrors
}
