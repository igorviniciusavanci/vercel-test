import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  TextareaHTMLAttributes
} from 'react'

import { useField } from '@unform/core'
import { FiAlertCircle } from 'react-icons/fi'
import { boolean } from 'yup'
import { Container, Error } from './styles'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
  required?: boolean
  disabled?: boolean
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  required,
  disabled,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
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
      ref: textareaRef.current,
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
            <FiAlertCircle color="red" />
          </Error>
        )}
      </div>
      <textarea
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        disabled={disabled}
        ref={textareaRef}
        defaultValue={defaultValue}
        {...rest}
        id="filterAll"
      />
    </Container>
  )
}

export default TextArea
TextArea.defaultProps = {
  required: false,
  disabled: false
}
