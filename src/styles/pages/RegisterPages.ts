import styled from 'styled-components'
import { Form } from '@unform/web'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding-top: 13.6vh;
  background-color: ${props => props.theme.colors.background};

  @media (max-width: 900px) {
    /* height: 100vh; */
  }
`
export const Title = styled.h1`
  font-size: 2rem;
  padding: 2rem 0;

  @media (min-width: 1100px) {
    padding: 0 0 1rem 0;
  }
`
export const ConainerTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid ${props => props.theme.colors.border_base};

  button {
    width: 10rem;
    height: 4rem;
    background-color: ${props => props.theme.colors.blue};
    border-radius: 5px;
  }
`
export const Content = styled.div`
  padding: 0 1rem;
  padding: 1rem 1rem 2rem 30.5rem;
  max-width: 1200px;

  .containerButton {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .address {
    @media (max-width: 900px) {
      display: none;
    }
  }

  fieldset {
    border: 0;
    padding: 1rem;

    legend {
      color: ${props => props.theme.colors.legend_text};
    }
  }

  .formTriple {
    display: grid;
    grid-template-columns: 1fr;
  }

  .formDubleRight {
    display: grid;
    grid-template-columns: 1fr;
  }

  .formDubleLeft {
    display: grid;
    grid-template-columns: 1fr;
  }

  .containerMeta {
    display: grid;
    grid-template-columns: 1fr;
    background-color: pink;
  }

  .containermetaDuble {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .containermetaDubleRight {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
  .containermetaDubleLeft {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }

  .containerImage {
    display: flex;
    flex-direction: row;

    .patrimonyImage {
      /* width: 250px;
      height: auto; */
      padding: 3px;
      display: flex;
      position: relative;

      img {
        width: 100%;
      }

      button {
        border: 0;
        background-color: ${props => props.theme.colors.red};
        width: 2.3rem;
        height: 2.3rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: -5px;
        top: -5px;
        cursor: pointer;

        svg {
          color: #fff;
        }
      }
    }
  }

  .containerImages {
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (min-width: 950px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .patrimonyImage {
      width: 200px;
      height: auto;
      padding: 3px;
      display: flex;
      position: relative;

      img {
        width: 100%;
        margin-bottom: 0.5rem;
      }

      button {
        border: 0;
        background-color: ${props => props.theme.colors.red};
        width: 2.3rem;
        height: 2.3rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: -5px;
        top: -5px;
        cursor: pointer;

        svg {
          color: #fff;
        }
      }
    }
  }

  .scanQrCode {
    margin-left: 1rem;
    margin-top: 0.3rem;
    height: 5rem;
    width: 5rem;
    svg {
      color: ${props => props.theme.colors.button_print_icon};
      size: 50px !important ;
    }

    :hover {
      svg {
        color: ${props => props.theme.colors.button_print_icon};
        size: 50px !important ;
      }
      background: ${props => props.theme.colors.button_print};
    }
  }

  .selectWithButton {
    display: grid;
    grid-template-columns: 5fr 1fr;
    align-items: center;
  }

  @media (min-width: 800px) {
    .containerMeta {
      grid-template-columns: 1fr 1fr;
    }
    .formTriple {
      grid-template-columns: 1fr 1fr;
    }

    .formDubleRight {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }

    .formDubleLeft {
      display: grid;
      grid-template-columns: 2fr 1fr;
    }
  }
  @media (min-width: 950px) {
    .containerMeta {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .formTriple {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (min-width: 500px) and (max-width: 801px) {
    min-width: 100vw;
    padding: 1rem;
  }

  @media (max-width: 1050px) {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  @media (min-width: 1100px) {
  }
`

export const FormScrip = styled(Form)`
  margin-top: 3rem;
  padding: 0.3rem;
  padding-bottom: 1rem;
  border: 1px solid var(--color-border-base);
  border-radius: 4px;

  .containerImage {
    width: 20rem;
    margin-left: 0.5rem;

    .selectedImage {
      button {
        border: 0;
        position: absolute;
        top: -0.6rem;
        right: -0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        background-color: red;
        cursor: pointer;
        svg {
          color: #fff;
        }
      }
      width: 20rem;
      position: relative;

      img {
        border-radius: 4px;
        width: 100%;
        height: auto;
      }
    }
    .selectedPDF {
      button {
        border: 0;
        position: absolute;
        top: -0.6rem;
        right: -0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        background-color: red;
        cursor: pointer;
        svg {
          color: #fff;
        }
      }
      margin-left: 0.5rem;
      width: 5rem;
      height: 5rem;
      border-radius: 4px;
      border: 1px solid var(--color-border-base);
      position: relative;
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
  .containerVideo {
    display: flex;
    .selectedFile {
      button {
        border: 0;
        position: absolute;
        top: -0.6rem;
        right: -0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        background-color: red;
        cursor: pointer;
        svg {
          color: #fff;
        }
      }
      margin-left: 0.5rem;
      padding: 0.5rem;
      padding-right: 1.5rem;
      border-radius: 4px;
      border: 1px solid var(--color-border-base);
      position: relative;
      display: flex;

      svg {
        width: 3.5rem;
        height: 3.5rem;
        color: red;
      }
    }
  }
  .containerAudio {
    display: flex;
    margin-top: 1.5rem;

    .selectedAudio {
      button {
        border: 0;
        position: absolute;
        top: -0.1rem;
        right: -0.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        background-color: red;
        cursor: pointer;
        svg {
          color: #fff;
        }
      }
      position: relative;
    }
  }
`
