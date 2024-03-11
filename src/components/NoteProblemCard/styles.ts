import { ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  secundary?: boolean
  remove?: boolean
}
export const Container = styled.div<ButtonProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border_base};
  padding: 0.5rem;
  border-radius: 4px;
  transition: 1s;
  margin-top: 2rem;

  /* & + div {
    margin-top: 1rem;
  } */

  ${props =>
    !props.disabled &&
    css`
      :hover {
        /* background-color: #cacaca; */
        cursor: pointer;
      }
    `}
  > button {
    width: 100%;
    border: 0;
    background-color: transparent;
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    transition: 1s;

    ${props =>
      !props.disabled &&
      css`
        :hover {
          /* background-color: #cacaca; */
          cursor: pointer;
        }
      `}
    .scriptHeader {
      width: 100%;
      display: flex;
      flex-direction: row;
      border: 0;
      .scriptIcon {
        display: flex;
        justify-content: center;
        padding: 0 0.5rem;

        svg {
          color: var(--color-primary);
        }
      }

      .scriptHeaderContant {
        margin-left: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1;
        margin-right: 1rem;
        margin-bottom: 2.5rem;

        .scriptTitle {
          strong {
            font-size: 1.9rem;
            font-weight: 700;
          }
        }
        .scriptTag {
          strong {
            span {
              font-size: 1.1rem;
              font-weight: 300;
            }
            font-size: 1.1rem;
            font-weight: 500;
          }
        }
      }
      .removeScript {
        button {
          svg {
            color: ${props => props.theme.colors.red};
            transition: 1s;
          }
          :hover {
            background-color: ${props => props.theme.colors.red};
            svg {
              color: #fff;
            }
            i {
              color: #fff;
            }
          }
        }
      }
      .editScript {
        margin: 0 0.4rem;
        button {
          /* background-color: ${props => props.theme.colors.blue}; */
          svg {
            color: ${props => props.theme.colors.blue};
            /* color: #fff; */
            transition: 1s;
          }
          :hover {
            background-color: ${props => props.theme.colors.blue};
            svg {
              color: #fff;
            }
            i {
              color: #fff;
            }
          }
        }
      }
    }
  }

  & + div {
    margin-top: 1.5rem;
  }
`

export const ContainerItem = styled.div`
  background-color: ${props => props.theme.colors.card_user_background};
  border-radius: 4px;

  & + div {
    margin-top: 1rem;
  }

  .scriptItens {
    /* background-color: #fefefe; */
    border-radius: 4px;
    padding: 1rem;

    .scriptContent {
      display: flex;
      & + div {
        margin-top: 1rem;
      }

      .scriptItenIcon {
        padding-right: 1rem;
        svg {
          color: var(--color-primary);
        }
      }
      .content {
        display: flex;
        flex: 1;
        justify-content: space-between;
        .media {
          display: flex;
          flex: 1;

          strong {
            /* color: #000; */
          }
        }
        .mediaImage {
          display: flex;
          flex-direction: column;
          flex: 1;

          strong {
            margin: 0.2rem 0;
            font-size: 1.2rem;
            font-weight: 200;
            font-style: italic;
          }

          .caption {
            font-style: normal;
            font-weight: 400;
          }

          img {
            width: 20rem;
            height: auto;
            font-size: 1.1rem;
            border-radius: 3px;
          }
          a {
            display: flex;
            width: 5rem;
            .pdfFile {
              width: 5rem;
              height: 5rem;
              border-radius: 4px;
              border: 1px solid var(--color-border-base);
              display: flex;
              justify-content: center;
              align-items: center;

              svg {
                width: 3.5rem;
                height: 3.5rem;
                color: red;
              }
            }
          }

          .time {
            margin-left: 1rem;
            width: 11rem;
            span {
              font-size: 1.1rem;
              font-weight: 300;
            }
          }
        }
      }
      .removeScript {
        i {
          color: ${props => props.theme.colors.red};
        }
        margin-left: 0.5rem;
        button {
          width: 2.5rem;
          height: 2.5rem;
          svg {
            color: ${props => props.theme.colors.red};
            transition: 2s;
          }
          :hover {
            background-color: ${props => props.theme.colors.red};
            svg {
              color: #fff;
            }
            i {
              color: #fff;
            }
          }
        }
      }
      .editScript {
        i {
          color: ${props => props.theme.colors.blue};
        }
        margin-left: 1rem;
        button {
          svg {
            color: ${props => props.theme.colors.blue};
          }
          :hover {
            background-color: ${props => props.theme.colors.blue};
          }
        }
      }
    }
  }
`
