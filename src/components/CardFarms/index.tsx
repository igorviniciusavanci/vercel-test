import Router from 'next/router'
import React, { useCallback } from 'react'
import { GiFarmTractor } from 'react-icons/gi'
import { FaTruckMonster } from 'react-icons/fa'
import { MdEngineering } from 'react-icons/md'
import { IoConstructOutline } from 'react-icons/io5'

import { Container, Image } from './styles'
import { useAuth } from '../../hooks/auth'

// type CardCategoryProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface CardDashboardProps {
  name: string
  cpf?: string
  cnpj?: string
  id: string
  disabled?: boolean
}

const CardFarms: React.FC<CardDashboardProps> = ({
  name,
  cpf,
  cnpj,
  id,
  disabled
}) => {
  const { onSelectFarm, onChangeFarmPermissions, user } = useAuth()
  const handleClick = useCallback(async () => {
    await onSelectFarm(id)
    await onChangeFarmPermissions({ id: user.id, farmId: id })
    Router.push('/dashboard')
  }, [onSelectFarm, user])

  return (
    <Container name={name} onClick={handleClick} disabled={disabled}>
      <div className="image">
        <GiFarmTractor size={60}></GiFarmTractor>
      </div>
      <div className="farmData">
        <h1>{name}</h1>
        {cpf && <span>{cpf}</span>}
        {cnpj && <span>{cnpj}</span>}
      </div>
    </Container>
  )
}

export default CardFarms
