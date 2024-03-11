import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
  colors: {
    body: '#FFF',
    toggleBorder: '#FFF',
    background: '#fff',
    input_label: '#6fb283',
    card_label: '#e4eee8',
    legend_text: '#6fb283',
    label_red: '#ff565e',
    red: '#ff565e',
    red_hover: '#c34046',
    blue: '#4f91b5',
    blue_hover: '#2b6787',
    link_blue: '#36b6fc',
    blue_check: '#0275ff',
    text: '#4a4a4a',
    label: '#666461',
    label_disabled: '#c4c4c4',
    primary: '#345f41',
    secundary: '#6fb283',
    input_background: '#f8f8f8',
    line_in_white: '#E6E6F0',
    header_background: '#6fb283',
    border_base: '#E6E6F0',
    menu_active_bg: '#e4eee8',
    card_background: '#6fb283',
    card_background_active: '#5c966d',
    card_user_background: '#e1e1e6',
    card_user_border: '#cdcdcd',
    background_table: '#eff2f0',
    background_filter: '#eff2f0',
    icon_farm: '#345f41',
    button_print_icon: '#6fb283',
    button_print: '#345f41'
  }
}

export const darkTheme = {
  colors: {
    body: '#203038',
    text: '#e1e1e6',
    background: '#203038',
    legend_text: '#6fb283',
    input_label: '#e1e1e6',
    card_label: '#30444e',
    label: '#b0b0b2',
    label_disabled: '#3c4f58',
    input_background: '#30444e',
    line_in_white: '#2b3f49',
    label_red: '#ff565e',
    red: '#ff565e',
    red_hover: '#c34046',
    blue: '#4f91b5',
    blue_hover: '#2b6787',
    link_blue: '#42abe4',
    blue_check: '#0275ff',
    primary: '#345f41',
    secundary: '#6fb283',
    header_background: '#345f41',
    border_base: '#39525e',
    menu_active_bg: '#2b3f49',
    card_background: '#6fb283',
    card_background_active: '#e4eee8',
    card_user_background: '#2b3f49',
    card_user_border: '#3c4c54',
    background_table: '#283b44',
    background_filter: '#1d2c34',
    icon_farm: '#345f41',
    button_print_icon: '#6fb283',
    button_print: '#eff2f0'
  }
}

export const GlobalStyles = createGlobalStyle`
*, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 60%;

  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.50s linear;
  }
  body,
  input,
  button,
  textarea, p {
    font: 500 1.6rem 'Open Sans';
    font-family: 'Open Sans', sans-serif;
    color: ${({ theme }) => theme.colors.text};
    /* transition: all 0.50s linear; */
  }
  label {
    font: 500 1.3rem 'Open Sans';
    font-family: 'Open Sans', sans-serif;
    /* transition: all 0.50s linear; */
  }
  h1 {
    font-weight: 500;
    font-size: 3rem;
    font-family: 'Signika Negative', sans-serif;
  }
  strong, span {
    font: 500 1.6rem 'Open Sans';
    font-family: 'Open Sans', sans-serif;
    /* transition: all 0.50s linear; */
  }
  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Open Sans', sans-serif;
    transition: all 0.50s linear;
  }
`
