import type { ButtonHTMLAttributes } from 'react'
import React from 'react'

import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  secundary?: boolean
  remove?: boolean
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  title,
  secundary,
  remove,
  loading,
  ...rest
}) => {
  return (
    <Container
      secundary={secundary}
      remove={remove}
      className="buttonload"
      {...rest}
    >
      {loading ? <i className="fa fa-circle-o-notch fa-spin" /> : title}
      {children}
    </Container>
  )
}

export default Button
