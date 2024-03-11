import React, { ChangeEvent, useCallback } from 'react'

import { MdAddAPhoto, MdSettingsVoice } from 'react-icons/md'
import { AiFillFileAdd } from 'react-icons/ai'
import { BiVideoPlus } from 'react-icons/bi'
import { BsFileEarmarkPlus } from 'react-icons/bs'
import { Container } from './styles'

interface ButtonFileProps {
  loading?: boolean
  type: string
  onChangeFile?(file: ChangeEvent<HTMLInputElement>): void
}

const ButtonFile: React.FC<ButtonFileProps> = ({
  loading,
  onChangeFile,
  type
}) => {
  const getIcon = useCallback(() => {
    switch (type) {
      case '.mp3,audio/*':
        return <MdSettingsVoice size={20} />
      case 'image/*':
        return <MdAddAPhoto size={20} />
      case 'video/*':
        return <BiVideoPlus size={20} />
      case 'application/pdf':
        return <AiFillFileAdd size={20} />
      case 'file':
        return <BsFileEarmarkPlus size={20} />

      default:
        return <MdAddAPhoto size={20} />
    }
  }, [type])

  return (
    <Container>
      {loading ? <i className="fa fa-circle-o-notch fa-spin" /> : getIcon()}
      <input
        type="file"
        name="arquivo"
        id="arquivo"
        accept={type}
        // multiple
        onChange={e => {
          typeof onChangeFile === 'function' && onChangeFile(e)
        }}
      />
    </Container>
  )
}

export default ButtonFile
ButtonFile.defaultProps = {
  loading: false,
  onChangeFile: () => {
    /* function */
  }
}
