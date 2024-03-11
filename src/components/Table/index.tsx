import React, { useCallback } from 'react'
import User from '../../DTO/userDTO'
import { BsImage } from 'react-icons/bs'

import { Container } from './styles'

interface TableProps {
  listTitle: string[]
  listItens: any[]
  onClickItem?(item: string): void
}

interface Test {
  [key: string]: string
}

interface RowProps {
  item: Record<string, Test>
  onClickRow?(id: string): void
}

const Row: React.FC<RowProps> = ({ item, onClickRow }) => {
  const handleClick = useCallback(() => {
    if (typeof onClickRow === 'function') {
      if (item && typeof item.id === 'string') {
        onClickRow(item.id)
      }
    }
  }, [onClickRow, item])
  const a = { ...item }
  delete a.id
  const keys = Object.keys(a)
  return (
    <tr key={Math.random()}>
      {keys.map(key => {
        if (key === 'files' && item[key]) {
          console.log(item[key][0])
          return (
            <td key={key}>
              <div className="containerImage">
                <a
                  href={`https://agroappfiles.s3.amazonaws.com/${item[key]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Ver Imagem</span>
                  <BsImage size={15} />
                </a>
              </div>
            </td>
          )
        }
        // console.log(key)
        return (
          <td key={key} onClick={handleClick}>
            <span>{item[key]}</span>
          </td>
        )
      })}
    </tr>
  )
  // }
}

const Table: React.FC<TableProps> = ({ listTitle, listItens, onClickItem }) => {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            {listTitle.map(title => {
              return (
                <th key={title}>
                  <span>{title}</span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {listItens.map(item => {
            return <Row key={item} item={item} onClickRow={onClickItem} />
          })}
        </tbody>
      </table>
    </Container>
  )
}

export default Table
