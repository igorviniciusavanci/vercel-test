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
  padding: 0 1rem;
  padding: 1rem 1rem 2rem 30.5rem;
  max-width: 1200px;

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

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  border-radius: 4px;
  justify-content: space-between;
  transition-duration: 0.5s;

  &:hover {
    background-color: ${props => props.theme.colors.input_background};
  }
  & + div {
    margin-top: 0.5rem;
  }
`
export const UserData = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
export const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`
export const Cpf = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
`
export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;

  button {
    svg {
      color: #fff;
    }
  }

  .edit {
    background-color: ${props => props.theme.colors.blue};
    &:hover {
      background-color: ${props => props.theme.colors.blue_hover};
    }
  }
  .remove {
    background-color: ${props => props.theme.colors.red};
    &:hover {
      background-color: ${props => props.theme.colors.red_hover};
    }
  }
`
