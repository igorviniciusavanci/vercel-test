import Router from 'next/router'
import React, { ButtonHTMLAttributes, useCallback } from 'react'
import {
  AiTwotoneFolderOpen,
  AiOutlineSetting,
  AiOutlineQuestion,
  AiOutlineBarChart,
  AiOutlineMessage,
  AiOutlineLock
} from 'react-icons/ai'
import { FaTruckMonster, FaUsers, FaUserLock, FaUserCog } from 'react-icons/fa'
import { MdPrecisionManufacturing, MdOutlineQrCode2 } from 'react-icons/md'
import { GiRanchGate } from 'react-icons/gi'
import { IoConstructOutline } from 'react-icons/io5'
import { BsCalendarCheck, BsClockHistory, BsTools } from 'react-icons/bs'

import { Container, Image } from './styles'

// type CardCategoryProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface CardShortcutProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
  disabled?: boolean
  operation?: boolean
}

const ButtonShortcut: React.FC<CardShortcutProps> = ({
  name,
  disabled,
  operation,
  ...rest
}) => {
  const icon = useCallback((name: string) => {
    switch (name) {
      case 'Usuários':
        return <FaUsers size={30} />

      case 'Fazendas':
        return <GiRanchGate size={27} />

      case 'Fabricantes':
        return <MdPrecisionManufacturing size={30} />

      case 'Patrimônios':
        return <FaTruckMonster size={30} />

      case 'Gerar QR':
        return <MdOutlineQrCode2 size={30} />

      case 'Permissão de Usuários':
        return <FaUserLock size={30} />

      case 'Criar Permissão':
        return <FaUserCog size={30} />

      case 'Check-in':
        return <BsCalendarCheck size={30} />

      case 'Check-out':
        return <BsClockHistory size={30} />

      case 'Relatar':
        return <BsTools size={30} />

      default:
        return <AiOutlineQuestion size={30} />
    }
  }, [])

  return (
    <Container name={name} disabled={disabled} operation={operation} {...rest}>
      <div>
        <h1>{name}</h1>
        {icon(name)}
      </div>
    </Container>
  )
}

export default ButtonShortcut
