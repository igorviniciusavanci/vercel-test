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
export const Title = styled.h1`
  font-size: 2rem;
  padding: 2rem 0;

  @media (min-width: 1100px) {
    padding: 0 0 1rem 0;
  }
`
export const Content = styled.div`
  padding: 0 1rem;
  padding: 1rem 1rem 2rem 30.5rem;
  max-width: 1200px;

  .containerButton {
    align-items: center;
    flex-direction: row !important;
    justify-content: center;

    .print {
      border: 0;
      background-color: transparent;
      margin-left: 1rem;
      width: 5rem;
      height: 5rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 1s;
      cursor: pointer;

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
  }
  .address {
    @media (max-width: 900px) {
      /* width: 100vw; */
      display: none;
    }
  }

  fieldset {
    border: 0;
    padding: 1rem;

    legend {
      color: ${props => props.theme.colors.legend_text};
      padding-top: 2rem;
      font-weight: 600;
      font-size: 1.8rem;
      display: flex;
      flex-direction: column;
      /* align-items: center; */
      width: 100%;
      padding-bottom: 1rem;
      border-bottom: 1px solid ${props => props.theme.colors.border_base};

      div {
        display: flex;

        span {
          font-size: 16px;
        }
      }
    }
  }

  .containerMeta {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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

  @media (max-width: 500px) {
    min-width: 100vw;
    padding: 1rem;

    .containerMeta {
      grid-template-columns: 1fr;
    }

    .containermetaDuble {
      grid-template-columns: 1fr;
    }
    .containermetaDubleRight {
      grid-template-columns: 1fr;
    }
    .containermetaDubleLeft {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 801px) {
    min-width: 100vw;
    padding: 1rem;

    .containerMeta {
      grid-template-columns: 1fr 1fr;
    }

    .containermetaDuble {
      grid-template-columns: 1fr;
    }
    .containermetaDubleRight {
      grid-template-columns: 1fr;
    }
    .containermetaDubleLeft {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 1050px) {
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    padding: 1rem;

    /* .containerMeta {
      grid-template-columns: 1fr 1fr;
    }

    .containermetaDuble {
      grid-template-columns: 1fr;
    }
    .containermetaDubleRight {
      grid-template-columns: 1fr;
    }
    .containermetaDubleLeft {
      grid-template-columns: 1fr;
    } */
  }

  @media (min-width: 1100px) {
    /* background-color: pink;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
  }

  @media print {
    h1 {
      /* page-break-after: always !important; */
      break-before: always;
    }
  }

  /* @media (min-width: 500px) {
    .containerMeta {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .containerDisk {
      display: grid;
      grid-template-columns: 1fr 2fr;

      align-items: center;

      a {
        text-decoration: none;

        height: 5.6rem;
        margin-top: 0.8rem;
        border-radius: 0.8rem;
        div {
          height: 5.6rem;
          background-color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.8rem;
          margin-right: 0.3rem;

          strong {
            color: #fff;
            font-size: 2rem;
          }
        }
      }
    }
  } */
  /* 
  @media (min-width: 700px) {
    padding: 2rem 1rem;
    max-width: 950px;

    .containerMeta {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }

    .containermetaDuble {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .containermetaDubleA {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
    .containermetaDubleB {
      display: grid;
      grid-template-columns: 2fr 1fr;
    }
  } */
`

export const ContainerTitle = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media print {
    display: none;
  }
`

export const ContainerQR = styled.div`
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  .containerQR {
    strong {
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #000;
      align-self: center;
    }
    display: flex;
    flex-direction: column;
    padding: 3rem;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.border_base};
    .logo {
      padding-top: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media print {
    break-after: avoid-page;
    /* page-break-after: always; */
    /* section {
      page-break-after: always;
    } */
  }
`
