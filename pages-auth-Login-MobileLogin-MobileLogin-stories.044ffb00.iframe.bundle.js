"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[2600],{"./src/pages/auth/Login/MobileLogin/MobileLogin.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/pages/auth/Login/MobileLogin/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <MobileLogin />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/pages/auth/Login/MobileLogin/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>MobileLogin});var dist=__webpack_require__("./node_modules/react-router/dist/index.js");const kakao_login_medium_wide_namespaceObject=__webpack_require__.p+"static/media/kakao_login_medium_wide.90f45a76.svg",stroke_logo_namespaceObject=__webpack_require__.p+"static/media/stroke-logo.efb937fb.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
`,LogoImage=styled_components_browser_esm.zo.img`
  width: 80px;
  height: 80px;
  margin-bottom: 36px;
`,LogoTitle=styled_components_browser_esm.zo.h1`
  margin-bottom: 140px;

  font-size: 3.2rem;
  font-weight: 700;
`,LoginButton=styled_components_browser_esm.zo.button`
  cursor: pointer;
`,GuestButton=styled_components_browser_esm.zo.button`
  margin-top: 30px;

  color: #9f9f9f;

  font: var(--text-caption);
  font-weight: 400;

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function MobileLogin(){const navigate=(0,dist.s0)(),kakaoURL=`https://kauth.kakao.com/oauth/authorize?client_id=${`${"MISSING_ENV_VAR".VOTOGETHER_REST_API_KEY}`}&redirect_uri=${`${"MISSING_ENV_VAR".VOTOGETHER_SERVER_REDIRECT_URL}`}&response_type=code`;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(LogoImage,{src:stroke_logo_namespaceObject,alt:"보투게더 로고"}),(0,jsx_runtime.jsx)(LogoTitle,{children:"VOTOGETHER"}),(0,jsx_runtime.jsx)(LoginButton,{onClick:()=>window.location.href=kakaoURL,children:(0,jsx_runtime.jsx)("img",{src:kakao_login_medium_wide_namespaceObject,alt:"카카오 로그인"})}),(0,jsx_runtime.jsx)(GuestButton,{onClick:()=>navigate("/"),children:"비회원으로 이용하기"})]})}MobileLogin.displayName="MobileLogin"}}]);
//# sourceMappingURL=pages-auth-Login-MobileLogin-MobileLogin-stories.044ffb00.iframe.bundle.js.map