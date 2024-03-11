import styled from 'styled-components'
export const Container = styled.div`
  width: 100%;
  padding: 0 1rem 2rem 1rem;
  table {
    border-collapse: collapse;
    width: 100%;
    border-radius: 4px;

    td,
    th {
      border: 1px solid ${props => props.theme.colors.border_base};
      text-align: left;
      padding: 8px;
      height: 2rem;
      min-width: 20rem;
    }

    th {
      span {
        font-weight: 600;
        color: ${props => props.theme.colors.legend_text};
      }
    }

    td {
      span {
        font-weight: 300;
        color: ${props => props.theme.colors.text};
      }
    }

    tr:nth-child(even) {
      /* background-color: #eeeeee; */
    }
    tr:hover {
      td {
        background-color: ${props => props.theme.colors.background_table};
        cursor: pointer;
      }
    }

    .containerImage {
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: flex;
        text-decoration: none;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid ${props => props.theme.colors.link_blue};

        span {
          margin-right: 1rem;
          color: ${props => props.theme.colors.link_blue};

          :hover {
            font-weight: 500;
          }
        }
        svg {
          color: ${props => props.theme.colors.link_blue};
        }
      }
    }
  }
  /* @media (min-width: 1100px) {
    padding: 0 1rem 0 31rem;
  } */
`
