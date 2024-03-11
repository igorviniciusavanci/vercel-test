import React from 'react'

import { Container } from './styles'

const TitleRegisters: React.FC = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>
}

export default TitleRegisters
