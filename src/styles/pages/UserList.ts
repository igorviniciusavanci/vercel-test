import styled from 'styled-components'

export const Contant = styled.div`
  @media (min-width: 1100px) {
    padding: 0 0 0 30.5rem;
  }
`

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
`

export const ContainerTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
`

export const ContainerButtonTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
`

export const ContainerFilter = styled.div`
  background-color: #eeeeee;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid ${props => props.theme.colors.border_base};
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  .containerButton {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 500px) {
    .containerMeta {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 700px) {
    padding: 2rem 1rem;

    .containerMeta {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`
