import React, { ButtonHTMLAttributes } from 'react'

import { Button } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  secundary?: boolean
}

const ButtonCircle: React.FC<ButtonProps> = ({
  secundary,
  children,
  ...rest
}) => {
  return (
    <Button secundary={secundary} {...rest}>
      {children}
    </Button>
  )
}

export default ButtonCircle
