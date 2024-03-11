import styled from 'styled-components'

export const ContainerFilter = styled.div`
  background-color: ${props => props.theme.colors.background_filter};
  padding: 1rem;
  margin: 1rem;
  border: 1px solid var(--color-border-base);
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  .containerButton {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .containerMetaDoble {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .containermetaDubleLeft {
    display: grid;
    grid-template-columns: 1fr;
  }

  @media (min-width: 500px) {
    .containerMeta {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .containermetaDuble {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .containermetaDubleLeft {
      display: grid;
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 700px) {
    padding: 2rem 1rem;

    .containerMeta {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }

    .containermetaDuble {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
    .containermetaDubleLeft {
      display: grid;
      grid-template-columns: 2fr 1fr;
    }
  }
`
