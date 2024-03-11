import React from 'react'

import { ContainerFilter } from './styles'

const Filter: React.FC = ({ children }) => {
  return (
    <ContainerFilter>
      <strong>Filtros</strong>
      {children}
    </ContainerFilter>
  )
}

export default Filter
