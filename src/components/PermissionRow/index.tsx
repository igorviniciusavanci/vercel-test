import React, { useCallback, useRef, useState } from 'react'
import { GoCheck } from 'react-icons/go'
import { Container } from './styles'

interface PermissionRowProps {
  title: string
  initialValue?: number
  value?: number
  onChange?(value: number): void
  disabled?: boolean
}

const PermissionRow: React.FC<PermissionRowProps> = ({
  title,
  onChange,
  initialValue,
  disabled,
  value
}) => {
  const refShow = useRef<HTMLInputElement>(null)
  const refEdit = useRef<HTMLInputElement>(null)
  const refCreate = useRef<HTMLInputElement>(null)
  const refRemove = useRef<HTMLInputElement>(null)
  const [permissionValue, setPermissionValue] = useState(initialValue || 0)

  const handleChangePermission = useCallback(
    (number: number) => {
      let currentValue = permissionValue
      if (
        (number === 1 && refShow.current.checked) ||
        (number === 2 && refCreate.current.checked) ||
        (number === 4 && refEdit.current.checked) ||
        (number === 8 && refRemove.current.checked)
      ) {
        currentValue = currentValue + number
      } else {
        currentValue = currentValue - number
      }
      setPermissionValue(currentValue)
      onChange(currentValue)
    },
    [permissionValue]
  )
  return (
    <Container>
      <div className="description">
        <strong>{title}</strong>
      </div>
      <div className="input">
        <label className="chk">
          <input
            ref={refShow}
            type="checkbox"
            defaultChecked={!!(permissionValue & 1)}
            onClick={() => handleChangePermission(1)}
            disabled={disabled}
          ></input>
          <span>
            <GoCheck size={20}></GoCheck>
          </span>
        </label>
        {/* <input
          ref={refShow}
          type="checkbox"
          defaultChecked={!!(permissionValue & 1)}
          onClick={() => handleChangePermission(1)}
          disabled={disabled}
        /> */}
      </div>
      <div className="input">
        <label className="chk">
          <input
            ref={refCreate}
            type="checkbox"
            defaultChecked={!!(permissionValue & 2)}
            onClick={() => handleChangePermission(2)}
            disabled={disabled}
          />
          <span>
            <GoCheck size={20}></GoCheck>
          </span>
        </label>
        {/* <input
          ref={refCreate}
          type="checkbox"
          defaultChecked={!!(permissionValue & 2)}
          onClick={() => handleChangePermission(2)}
          disabled={disabled}
        /> */}
      </div>
      <div className="input">
        <label className="chk">
          <input
            ref={refEdit}
            type="checkbox"
            defaultChecked={!!(permissionValue & 4)}
            onClick={() => handleChangePermission(4)}
            disabled={disabled}
          />
          <span>
            <GoCheck size={20}></GoCheck>
          </span>
        </label>
        {/* <input
          ref={refEdit}
          type="checkbox"
          defaultChecked={!!(permissionValue & 4)}
          onClick={() => handleChangePermission(4)}
          disabled={disabled}
        /> */}
      </div>
      <div className="input">
        <label className="chk">
          <input
            ref={refRemove}
            type="checkbox"
            defaultChecked={!!(permissionValue & 8)}
            onClick={() => handleChangePermission(8)}
            disabled={disabled}
          />
          <span>
            <GoCheck size={20}></GoCheck>
          </span>
        </label>
        {/* <input
          ref={refRemove}
          type="checkbox"
          defaultChecked={!!(permissionValue & 8)}
          onClick={() => handleChangePermission(8)}
          disabled={disabled}
        /> */}
      </div>
    </Container>
  )
}

export default PermissionRow
