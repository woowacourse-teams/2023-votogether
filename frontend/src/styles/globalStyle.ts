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
    --red: #F51A18;
    --primary-color: #F85554;
    --white: #ffffff;
    --bright-gray: #F4F4F4;
    --gray: #cccccc;
    --dark-gray: #929292;
    --slate: #94a3b8;
    --header: #1f1f1f;
    --graph-color-purple:#853DE1;
    --graph-color-green:#5AEAA5;
    --active-post: #00DFA2;
    --text-dark-gray:#686868;
    
    /* Fonts *****************************************/
    --text-page-title: 600 2.4rem/2.6rem san-serif;
    --text-title: 600 2rem/2.4rem san-serif;
    --text-subtitle: 600 1.8rem/2rem san-serif;
    --text-body: 400 1.7rem/2rem san-serif;
    --text-caption: 400 1.6rem/2rem san-serif;
    --text-default: 400 1.4rem/2rem san-serif;
    --text-small: 400 1.2rem/1.8rem san-serif;
  }  
`;
