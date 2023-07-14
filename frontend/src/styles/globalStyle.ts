import { createGlobalStyle } from 'styled-components';

import { reset } from './reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
    
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    border:none
  }
  
  ul,
  li {
    list-style: none;
  }
  
  html,
  body {
    font-family: sans-serif;
    font-size: 62.5%;
  }

  /* Colors *****************************************/
  /* Fonts *****************************************/
  :root {
    --primary-color: #FA7D7C;
    --white: #FFFFFF;

    --text-title: 600 20px/24px san-serif;
    --text-subtitle: 600 18px/28px san-serif;
    --text-body: 400 16px/24px san-serif;
    --text-caption: 400 14px/20px san-serif;
  }  
`;
