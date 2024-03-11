import styled from 'styled-components'
export const Container = styled.div`
  /* position: absolute;
  top: 0;
  right: 0;
  padding: 3rem 3rem; */
  display: flex;
  flex-direction: row;
  /* justify-content: center;
  align-items: center; */

  input[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 52px;
    height: 27px;
    background: #91919d;

    float: right;
    border-radius: 100px;
    position: relative;
  }

  label::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 90px;
    transition: 0.3s;
  }

  input:checked + label {
    background-color: ${props => props.theme.colors.secundary};
  }

  input:checked + label::after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  label:active:after {
    width: 45px;
  }
`
