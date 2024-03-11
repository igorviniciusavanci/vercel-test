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
  .containerButtonFooter {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
  }
  .containerButton {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 2rem;
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

  @media (min-width: 800px) {
    .containerMeta {
      grid-template-columns: 1fr 1fr;
      background-color: red;
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

export const ConainerTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid ${props => props.theme.colors.border_base};

  div {
    button {
      width: 10rem;
      height: 4rem;
      background-color: ${props => props.theme.colors.blue};
      border-radius: 5px;
    }
    .delete {
      background-color: ${props => props.theme.colors.red};
      margin-right: 1rem;
    }
  }
`
export const TablePermissions = styled.div`
  margin: 1rem 1.5rem 5rem 1.5rem;
`
export const FarmPermission = styled.div`
  margin: 0 1.5rem;
  /* background-color: pink; */
  strong {
    font-size: 1.8rem;
    font-weight: 700;
  }
`
export const TableHeaderFarm = styled.div`
  background-color: ${props => props.theme.colors.background_table};
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.colors.border_base};
  border-bottom: 0;

  strong {
    font-size: 1.9rem;
    font-weight: 600;
    color: ${props => props.theme.colors.link_blue};
  }
`
export const TableHeaderTitle = styled.div`
  background-color: ${props => props.theme.colors.background_table};
  height: 4.5rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border: 1px solid ${props => props.theme.colors.border_base};

  strong {
    font-size: 1.9rem;
    font-weight: 400;
    color: ${props => props.theme.colors.legend_text};
  }
`
export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: '. . . . .';
  height: 3rem;
  border-right: 1px solid ${props => props.theme.colors.border_base};
  border-left: 1px solid ${props => props.theme.colors.border_base};

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.5px solid ${props => props.theme.colors.border_base};
    strong {
      color: ${props => props.theme.colors.legend_text};
    }
  }
`
