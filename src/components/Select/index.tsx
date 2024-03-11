import React, { useRef, useEffect } from 'react'
import { useField } from '@unform/core'

import { FiAlertCircle, FiInfo } from 'react-icons/fi'
import { Container, SelectContainer, Error, Info } from './styles'
import { usePreferences } from '../../hooks/preferences'

export interface Options {
  id?: string
  label: string
  value: string
}

interface SelectProps {
  name: string
  label: string
  value?: Options
  required?: boolean
  options: Options[]
  disabled?: boolean
  isMulti?: boolean
  isClearable?: boolean
  info?: string
  placeholder?: string
  onChange?(e: Record<string, undefined>): void
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  placeholder,
  options,
  value,
  required,
  disabled,
  info,
  isMulti,
  isClearable,
  onChange
}) => {
  const selectRef = useRef(null)
  const { theme } = usePreferences()
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value'
      // getValue: ref => {
      //   return selectRef.current.value
      // }
      // setValue: (ref, value) => {
      //   ref.current.value = value
      // },
      // clearValue: ref => {
      //   ref.current.value = ''
      // }
    })
  }, [registerField, fieldName])

  const getBackgroundColor = (selected: boolean) => {
    if (theme) {
      if (selected) {
        if (theme === 'light') return '#eff4f1'
        return '#6fb283'
      }
      if (theme === 'dark') return 'rgba(255,255,255,.1)'
      return '#e4eee8'
    }
    return 'rgba(0,0,0,.2)'
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: `1px solid ${
        theme === 'dark' ? 'rgba(255,255,255,.3)' : '#E6E6F0'
      }`,
      color: state.isSelected
        ? theme === 'light'
          ? '#4a4a4a'
          : '#345f41'
        : props => props.theme.colors.text,
      backgroundColor: state.isSelected
        ? theme === 'dark'
          ? '#eff4f1'
          : '#6fb283'
        : 'transparent',
      padding: 10,
      fontSize: 16,
      ':hover': {
        backgroundColor: getBackgroundColor(state.isSelected),
        color: state.isSelected
          ? theme === 'light'
            ? '#4a4a4a'
            : '#345f41'
          : props => props.theme.colors.text
      }
    }),

    singleValue: (provided, state) => ({
      ...provided,
      color: props => props.theme.colors.text
    })
  }

  return (
    <Container isErrored={!!error} disabled={disabled}>
      <div className="header">
        <label htmlFor="filterAll">
          {label}
          {required && <span> *</span>}
        </label>
        {error && (
          <Error title={error}>
            <FiAlertCircle size={20} />
          </Error>
        )}
        {!error && info && (
          <Info title={info}>
            <FiInfo color="#006bb2" size={20} />
          </Info>
        )}
      </div>
      <div>
        <SelectContainer
          styles={customStyles}
          className="basic-single"
          classNamePrefix="select"
          placeholder={placeholder}
          ref={selectRef}
          name={name}
          options={options}
          isMulti={isMulti}
          isDisabled={disabled}
          isClearable={isClearable}
          onChange={(e: Record<string, undefined>) => {
            typeof onChange === 'function' && onChange(e)
          }}
          defaultValue={defaultValue}
          value={value}
        />
      </div>
    </Container>
  )
}

export default Select
