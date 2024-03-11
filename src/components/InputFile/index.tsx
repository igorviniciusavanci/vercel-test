import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import { MdAddAPhoto } from 'react-icons/md'

import { Container } from './styles'

interface InputFileProps {
  loadingImage?: boolean
  capture?: boolean
  onChangeFile?(file: ChangeEvent<HTMLInputElement>): void
  onClick?(): void
}

const InputFile: React.FC<InputFileProps> = ({
  loadingImage,
  onChangeFile,
  onClick,
  capture
}) => {
  return (
    <Container>
      {loadingImage ? (
        <i className="fa fa-circle-o-notch fa-spin" />
      ) : (
        <MdAddAPhoto size={20} />
      )}
      <input
        type="file"
        name="arquivo"
        id="arquivo"
        multiple
        accept="image/*"
        onChange={e => {
          typeof onChangeFile === 'function' && onChangeFile(e)
        }}
        onClick={() => {
          typeof onClick === 'function' && onClick()
        }}
        capture={capture}
      />
    </Container>
  )
}

export default InputFile
InputFile.defaultProps = {
  loadingImage: false,
  onChangeFile: () => {
    /* function */
  },
  onClick: () => {
    /* function */
  }
}
