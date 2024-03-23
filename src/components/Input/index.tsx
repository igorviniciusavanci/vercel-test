import { useField } from '@unform/core'
import type { InputHTMLAttributes } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'

import { Container, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  required?: boolean
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  required,
  disabled,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, error, registerField, defaultValue } = useField(name)
  const [isFocused, setIsFocused] = useState(false)
  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container isErrored={!!error} isFocused={isFocused} disabled={disabled}>
      <div>
        <label htmlFor="filterAll">
          {label}
          {required && <span> *</span>}
        </label>
        {error && (
          <Error title={error}>
            <FiAlertCircle size={20} />
          </Error>
        )}
      </div>
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        disabled={disabled}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
        id="filterAll"
      />
    </Container>
  )
}

export default Input
