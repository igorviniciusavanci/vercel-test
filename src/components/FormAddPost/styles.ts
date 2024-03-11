import styled, { css } from 'styled-components';
import { Form } from '@unform/web';

export const FormScrip = styled(Form)`
  margin-top: 3rem;
  padding: 0.3rem;
  margin: 0.3rem;
  padding-bottom: 1rem;
  border: 1px solid var(--color-border-base);
  border-radius: 4px;

  .containerImage {
    width: 20rem;
    margin-left: 0.5rem;

    .selectedImage {
      button {
        border: 0;
        position: absolute;
        top: -0.6rem;
        right: -0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        background-color: red;
        cursor: pointer;
        svg {
          color: #fff;
        }
      }
      width: 20rem;
      position: relative;

      img {
        border-radius: 4px;
        width: 100%;
        height: auto;
      }
    }
    .selectedPDF {
      button {
        border: 0;
        position: absolute;
        top: -0.6rem;
        right: -0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        background-color: red;
        cursor: pointer;
        svg {
          color: #fff;
        }
      }
      margin-left: 0.5rem;
      width: 5rem;
      height: 5rem;
      border-radius: 4px;
      border: 1px solid var(--color-border-base);
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: 3.5rem;
        height: 3.5rem;
        color: red;
      }
    }
  }
  .containerVideo {
    display: flex;
    .selectedFile {
      button {
        border: 0;
        position: absolute;
        top: -0.6rem;
        right: -0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        background-color: red;
        cursor: pointer;
        svg {
          color: #fff;
        }
      }
      margin-left: 0.5rem;
      padding: 0.5rem;
      padding-right: 1.5rem;
      border-radius: 4px;
      border: 1px solid var(--color-border-base);
      position: relative;
      display: flex;

      svg {
        width: 3.5rem;
        height: 3.5rem;
        color: red;
      }
    }
  }
  .containerAudio {
    display: flex;
    margin-top: 1.5rem;

    .selectedAudio {
      button {
        border: 0;
        position: absolute;
        top: -0.1rem;
        right: -0.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        background-color: red;
        cursor: pointer;
        svg {
          color: #fff;
        }
      }
      position: relative;
    }
  }
  .ButtonForm {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    button {
      width: 12rem;
      height: 3.5rem;
      font-size: 1.5rem;
      font-weight: 400;

      & + button {
        margin-left: 1rem;
      }
    }
    .cancel {
      background-color: lightgray;
    }
  }
`;
