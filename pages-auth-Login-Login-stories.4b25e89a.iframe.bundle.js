"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[8474],{"./src/pages/auth/Login/Login.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Login_stories});var MobileLogin=__webpack_require__("./src/pages/auth/Login/MobileLogin/index.tsx"),ServiceIntroductionSection=__webpack_require__("./src/pages/auth/Login/ServiceIntroductionSection/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${theme.r.breakpoint.lg}) {
    grid-template-columns: 1fr minmax(200px, 400px);
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Login(){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(ServiceIntroductionSection.Z,{}),(0,jsx_runtime.jsx)(MobileLogin.Z,{})]})}Login.displayName="Login";const Login_stories={component:Login},Default={render:()=>(0,jsx_runtime.jsx)(Login,{})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <Login />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/pages/auth/Login/MobileLogin/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>MobileLogin});var dist=__webpack_require__("./node_modules/react-router/dist/index.js");const kakao_login_medium_wide_namespaceObject=__webpack_require__.p+"static/media/kakao_login_medium_wide.90f45a76.svg",stroke_logo_namespaceObject=__webpack_require__.p+"static/media/stroke-logo.efb937fb.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function MobileLogin(){const navigate=(0,dist.s0)(),kakaoURL=`https://kauth.kakao.com/oauth/authorize?client_id=${`${"MISSING_ENV_VAR".VOTOGETHER_REST_API_KEY}`}&redirect_uri=${`${"MISSING_ENV_VAR".VOTOGETHER_SERVER_REDIRECT_URL}`}&response_type=code`;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(LogoImage,{src:stroke_logo_namespaceObject,alt:"보투게더 로고"}),(0,jsx_runtime.jsx)(LogoTitle,{children:"VOTOGETHER"}),(0,jsx_runtime.jsx)(LoginButton,{onClick:()=>window.location.href=kakaoURL,children:(0,jsx_runtime.jsx)("img",{src:kakao_login_medium_wide_namespaceObject,alt:"카카오 로그인"})}),(0,jsx_runtime.jsx)(GuestButton,{onClick:()=>navigate("/"),children:"비회원으로 이용하기"})]})}MobileLogin.displayName="MobileLogin"},"./src/pages/auth/Login/ServiceIntroductionSection/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ServiceIntroductionSection});const votogether_home_namespaceObject=__webpack_require__.p+"static/media/votogether_home.00aed547.png",votogether_write_namespaceObject=__webpack_require__.p+"static/media/votogether_write.45f87763.png";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.section`
  display: none;

  @media (min-width: ${theme.r.breakpoint.lg}) {
    display: flex;
  }
`,ContentContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100vh;
  padding: 0 150px;

  color: #fff;
  background-color: #1f1f1f;
`,TitleContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 65px;
`,TitleText=styled_components_browser_esm.zo.span`
  font-size: 3.6rem;
  font-weight: 700;
`,IntroduceContainer=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
`,Introduce=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;

  height: max-content;
`,PhoneImage=styled_components_browser_esm.zo.img`
  height: 200px;

  object-fit: cover;

  @media (min-height: 600px) {
    height: 400px;
  }

  @media (min-height: 900px) {
    height: max-content;
  }
`,Text=styled_components_browser_esm.zo.span`
  font-size: 2rem;
  font-weight: 400;
`,Decorator=styled_components_browser_esm.zo.div`
  width: 16px;
  height: 100vh;

  &:nth-child(2) {
    background-color: #6d6d6d;
  }

  &:nth-child(3) {
    background-color: #8d8d8d;
  }

  &:last-child {
    background-color: #bcbcbc;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ServiceIntroductionSection(){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(ContentContainer,{children:[(0,jsx_runtime.jsxs)(TitleContainer,{children:[(0,jsx_runtime.jsx)(TitleText,{children:"FUN FROM CHOICE!"}),(0,jsx_runtime.jsx)(TitleText,{children:"오늘도 즐거운 한 표!"})]}),(0,jsx_runtime.jsxs)(IntroduceContainer,{children:[(0,jsx_runtime.jsxs)(Introduce,{children:[(0,jsx_runtime.jsx)(Text,{children:"투표를 해보세요!"}),(0,jsx_runtime.jsx)(PhoneImage,{src:votogether_home_namespaceObject,alt:"보투게더 이용 사진"})]}),(0,jsx_runtime.jsxs)(Introduce,{children:[(0,jsx_runtime.jsx)(Text,{children:"글을 쓰며 사람들의 반응을 확인해요!"}),(0,jsx_runtime.jsx)(PhoneImage,{src:votogether_write_namespaceObject,alt:"보투게더 글 작성하는 사진"})]})]})]}),(0,jsx_runtime.jsx)(Decorator,{}),(0,jsx_runtime.jsx)(Decorator,{}),(0,jsx_runtime.jsx)(Decorator,{})]})}ServiceIntroductionSection.displayName="ServiceIntroductionSection"},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
  0% {
      background-color: rgba(165, 165, 165, 0.1);
  }

  50% {
      background-color: rgba(165, 165, 165, 0.3);
  }
  
  100% {
      background-color: rgba(165, 165, 165, 0.1);
  }
  `,skeletonGradientWave:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
  to {
      background-position-x: -200%;
    }
  `}}}}]);
//# sourceMappingURL=pages-auth-Login-Login-stories.4b25e89a.iframe.bundle.js.map