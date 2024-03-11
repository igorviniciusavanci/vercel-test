import styled from 'styled-components'
import Image from 'next/image'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  padding-top: 15rem;
`

export const Content = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .containerButton {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 600px) {
    width: 70%;
  }
  @media (min-width: 800px) {
    width: 60%;
    max-width: 900px;
  }
`

export const Title = styled.strong`
  padding: 2rem 0rem;
`

export const Subtitle = styled.strong`
  padding: 0rem 0rem 2rem 0;
  font-size: 1.3rem;
`

export const Button = styled.button`
  height: 5rem;
  width: 20rem;
  background: var(--color-primary);
  border: 0;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  margin: 0 auto;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: none;

  svg {
    margin-right: 1rem;
  }
`

export const ConteinerImage = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  @media (min-width: 800px) {
    justify-content: flex-end;
    margin-top: -5rem;
    z-index: -1;
  }
`
export const ImageBackground = styled(Image)`
  width: 70%;
  height: 70%;
  max-width: 30rem;
  max-height: 340rem;
`
