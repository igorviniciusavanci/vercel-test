import Router from 'next/router'
import React, { useCallback } from 'react'
import {
  AiTwotoneFolderOpen,
  AiOutlineSetting,
  AiOutlineQuestion,
  AiOutlineBarChart,
  AiOutlineMessage
} from 'react-icons/ai'
import { FaTruckMonster } from 'react-icons/fa'
import { MdEngineering } from 'react-icons/md'
import { IoConstructOutline } from 'react-icons/io5'

import { Container, Image } from './styles'

// type CardCategoryProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface CardDashboardProps {
  name: string
  path: string
  disabled?: boolean
}

const CardDashboard: React.FC<CardDashboardProps> = ({
  name,
  path,
  disabled
}) => {
  const handleClick = useCallback(() => {
    Router.push(path)
  }, [])

  const icon = useCallback((name: string) => {
    switch (name) {
      case 'Administrativo':
        return <AiTwotoneFolderOpen size={60} />

      case 'Patrimônio':
        return <FaTruckMonster size={58} />

      case 'Operação':
        return <MdEngineering size={58} />

      case 'Manutenção':
        return <IoConstructOutline size={50} />

      case 'Relatórios':
        return <AiOutlineBarChart size={55} />

      case 'Suporte':
        return <AiOutlineMessage size={55} />

      case 'Configurações':
        return <AiOutlineSetting size={60} />

      default:
        return <AiOutlineQuestion size={60} />
    }
  }, [])

  return (
    <Container name={name} onClick={handleClick} disabled={disabled}>
      <div>
        <h1>{name}</h1>
        {icon(name)}
      </div>
    </Container>
  )
}

export default CardDashboard
