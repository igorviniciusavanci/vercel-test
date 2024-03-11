import styled, { css } from 'styled-components'

interface ButtonProps {
  secundary?: boolean
  remove?: boolean
}
export const Container = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: '. . . . .';
  min-height: 4rem;
  border: 1px solid ${props => props.theme.colors.border_base};
  border-top: 0;

  .description {
    min-height: 4rem;
    display: flex;
    align-items: center;
    border-right: 0.5px solid ${props => props.theme.colors.border_base};
    border-left: 0.5px solid ${props => props.theme.colors.border_base};
    padding: 0 0.5rem;
  }

  .input {
    min-height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 0.5px solid ${props => props.theme.colors.border_base};
    border-left: 0.5px solid ${props => props.theme.colors.border_base};
  }

  .chk input {
    display: none;
  }

  .chk span {
    width: 2rem;
    height: 2rem;
    display: block;
    border-radius: 2px;
    background-color: #fff;
    border: 0.8px solid grey;

    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      position: absolute;
      color: #fff;
    }
  }

  .chk input:checked + span {
    background-color: ${props => props.theme.colors.blue_check};
    border: 0;
  }
`
