import React, { useEffect } from 'react'
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi'

import { ToastMessage, useToast } from '../../../hooks/toast'
import { Conateiner } from './styles'

interface ToastProps {
  message: ToastMessage
}

const icons = {
  info: <FiInfo />,
  success: <FiCheckCircle />,
  error: <FiAlertCircle />
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 10000)

    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, message.id])

  return (
    <Conateiner
      hasDescrition={!!message.description}
      type={message.type}
      // style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={16} />
      </button>
    </Conateiner>
  )
}

export default Toast
