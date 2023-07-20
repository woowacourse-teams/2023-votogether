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

  :root {
    /* Colors *****************************************/
    --primary-color: #FA7D7C;
    --white: #FFFFFF;
    --slate: #94A3B8;
    --gray: #F4F4F4;
    --red: #F51A18;
    --dark-gray: #929292;
    
    /* Fonts *****************************************/
    --text-title: 600 2rem/2.4rem san-serif;
    --text-subtitle: 600 1.8rem/2.8rem san-serif;
    --text-body: 400 1.6rem/2.4rem san-serif;
    --text-caption: 400 1.4rem/2rem san-serif;
    --text-small: 400 1.2rem/1.8rem san-serif;
  }  
`;
