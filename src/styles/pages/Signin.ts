import styled from 'styled-components'
import Image from 'next/image'
import { Form } from '@unform/web'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${props => props.theme.colors.background};

  @media (max-width: 900px) {
    height: 150vh;
  }
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  .theme {
    position: absolute;
    right: 35px;
    top: 20px;
    z-index: 999999 !important;
  }

  form {
    width: 100%;
  }

  .containerButton {
    display: flex;
    flex-direction: column;
    align-items: center;

    .forgotPassword {
      margin-top: 15px;
      button {
        border: 0;
        background-color: transparent;
        cursor: pointer;
        border-bottom: 1px solid ${props => props.theme.colors.secundary};
        color: ${props => props.theme.colors.secundary};
        font-size: 1.35rem;
      }
    }
  }

  @media (max-width: 900px) {
    flex-direction: column-reverse;
  }
`
export const ContentForm = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    align-self: center;
    width: 90%;
    padding: 8rem 0 6rem 0;
  }
`

export const BoxHeader = styled.div`
  top: 0;
  padding: 3rem 0rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    padding: 1.5rem 1.5rem;
  }
`
export const Box = styled.div`
  width: 32vw;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 60vw;
  }

  @media (max-width: 700px) {
    width: 80vw;
  }
`
export const BoxForm = styled(Form)`
  display: flex;
  flex-direction: column;
`

export const HeaderImage = styled(Image)``

export const CotainerImage = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  background-color: #fff;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;

  @media (max-width: 900px) {
    height: 100vh;
  }

  .background {
    display: flex;
    flex: 1;
    /* background: url('https://cdn.pixabay.com/photo/2020/03/07/17/16/rapeseeds-4910374__340.jpg'); */
    background-position: initial;
    background-size: cover;
    position: relative;
  }

  .layer {
    background-color: rgba(24, 61, 35, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 900px) {
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    border-bottom-right-radius: 0;
  }
`
export const Title = styled.h1`
  margin-bottom: 3rem;
  display: flex;
  align-self: center;
  color: ${props => props.theme.colors.secundary};
`
