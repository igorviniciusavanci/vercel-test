import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding-top: 13.6vh;
  background-color: ${props => props.theme.colors.background};

  @media (max-width: 900px) {
    /* height: 100vh; */
  }
`
export const Content = styled.div`
  padding: 1rem 1rem 2rem 31.5rem;
  max-width: 1200px;
  z-index: 1;

  @media (max-width: 500px) {
    min-width: 100vw;
    padding: 1rem;
  }

  @media (max-width: 1050px) {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
`

export const ContainerImage = styled.div`
  position: fixed;
  right: 2.5rem;
  bottom: 2.5rem;
  width: 200px;
  height: auto;
  z-index: 0;

  img {
    width: 100%;
  }
`

export const ContainerShortcut = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: '. . . . . . .';
  grid-template-rows: 1fr;
  gap: 0px 0px;
  z-index: 2;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: '. . . . .';
    /* height: 250px;
    width: 200px; */
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas: '. . . .';
    button {
      margin: 0 auto;
    }
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: '. . .';
    button {
      margin: 0 auto;
    }
  }

  button {
    margin-top: 1rem;
  }
`
