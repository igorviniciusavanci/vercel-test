import styled, { css } from 'styled-components'

interface CardDashboardProps {
  name: string
  disabled?: boolean
}

export const Container = styled.button<CardDashboardProps>`
  border: transparent;
  background-color: ${props => props.theme.colors.card_background};

  /* height: 125px; */
  padding: 1rem;
  width: 100%;
  /* width: 135px; */
  background-color: '#fff';
  text-decoration: none;
  box-shadow: 0px 4.09158px 20.4579px rgba(0, 0, 0, 0.1);
  border-radius: 8.18316px;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  transition: background-color 0.8s;
  cursor: pointer;

  margin: 0 auto;
  margin-top: 2rem;

  & + a {
    margin-top: 2rem;
  }

  /* & + a {
    margin-left: 20px;
  } */

  &:hover {
    background: ${props => props.theme.colors.card_background_active};
  }

  .image {
    /* height: 100px; */
    /* display: flex; */
    /* justify-content: center;
    align-items: center; */
  }
  .farmData {
    margin-left: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* justify-content: flex-end;
    align-items: center; */

    h1 {
      /* align-self: center; */
      font-size: 2.5rem;
      color: ${props => props.theme.colors.card_label};
    }
    span {
      /* align-self: center; */
      font-size: 1.5rem;
      color: ${props => props.theme.colors.card_label};
    }
  }

  svg {
    color: ${props => props.theme.colors.icon_farm};
  }

  @media (min-width: 700px) {
    /* height: 250px; */
    /* width: 200px; */
  }

  ${props =>
    props.disabled &&
    css`
      cursor: default;
      background-color: #bbbbbb;
      &:hover {
        background-color: #bbbbbb;
      }
      svg,
      h1 {
        color: #dadada;
      }
    `}
`

export const Image = styled.div<CardDashboardProps>`
  background-size: contain;
  margin-top: 20px;
  height: 185px;
  /* width: 185px; */
  transition: 0.8s;
`
