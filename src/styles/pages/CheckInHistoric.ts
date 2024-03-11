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

  .title {
    strong {
      font-size: 2rem;
      font-weight: 600;
    }
    padding-bottom: 3rem;
  }

  fieldset {
    border: 0;
    padding: 1rem;

    legend {
      color: ${props => props.theme.colors.legend_text};
    }

    .containerButton {
      display: flex;
      justify-content: center;
    }
  }

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

export const ContainerUserHistoric = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem;
  margin-top: 2.5rem;
  border-top: 1px solid ${props => props.theme.colors.border_base};
`
export const UserData = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 1.5rem;
`
export const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`
export const Cpf = styled.div`
  font-size: 1.2rem;
  font-weight: 100;
  /* color: #93a4ac; */
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

export const Day = styled.strong`
  font-size: 1.6rem;
  font-weight: 400;
  color: #b4c8d1;
`

export const ContainerRegisters = styled.div`
  padding: 0 2rem;
  display: flex;
  flex: 1;
  flex-direction: column;
`
export const Register = styled.div`
  display: flex;
  padding: 0 1rem;
`
export const RegisterValue = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: 100;
  min-width: 8rem;
  color: #93a4ac;
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
