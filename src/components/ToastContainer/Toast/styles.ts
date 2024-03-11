import styled, { css } from 'styled-components'
import { animated } from 'react-spring'

interface ConatainerProps {
  type?: 'success' | 'error' | 'info'
  hasDescrition?: boolean
}

const toastTypeVariation = {
  info: css`
    background-color: #bfe5ff;
    color: #006bb2;
  `,
  success: css`
    background-color: #e4eee8;
    color: #6fb283;
  `,
  error: css`
    background-color: #ffdace;
    color: #ff565e;
  `
}

export const Conateiner = styled(animated.div)<ConatainerProps>`
  width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  & + div {
    margin-top: 10px;
  }

  ${props => toastTypeVariation[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      font-size: 14px;
      opacity: 0.8;
      margin-top: 4px;
      color: #4a4a4a;
    }
  }

  button {
    position: absolute;
    top: 15px;
    right: 13px;
    border: 0;
    background-color: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasDescrition &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`
