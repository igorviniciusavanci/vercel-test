import React, { InputHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = InputHTMLAttributes<HTMLInputElement>

const ToggleButton: React.FC<ButtonProps> = ({ ...rest }) => {
  return (
    <Container>
      <div className="toggle">
        <input id="switch" type="checkbox" name="theme" {...rest} />
        <label htmlFor="switch">Toggle</label>
      </div>
    </Container>
  )
}

export default ToggleButton
