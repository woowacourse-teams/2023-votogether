"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[7822],{"./src/components/comment/CommentList/CommentLoginSection/CommentLoginSection.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/comment/CommentList/CommentLoginSection/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{name:"닉네임"})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  render: () => <CommentLoginSection name="닉네임" />\n}',...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/comment/CommentList/CommentLoginSection/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentLoginSectionSection});var path=__webpack_require__("./src/constants/path.ts");const kakao_login_large_namespaceObject=__webpack_require__.p+"static/media/kakao_login_large.0a33a8d0.svg";var dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.section`
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    padding: 0 20px;

    font-size: 2.4rem;
  }
`,Title=styled_components_browser_esm.zo.span`
  font-size: 2.2rem;
  font-weight: 600;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font-size: 2.4rem;
  }
`,SubTitle=styled_components_browser_esm.zo.p`
  margin-top: 10px;

  font: var(--text-caption);
  font-weight: 400;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`,LoginLink=(0,styled_components_browser_esm.zo)(dist.rU)`
  display: flex;
  justify-content: center;

  margin-top: 40px;
`,Image=styled_components_browser_esm.zo.img`
  width: 300px;
  height: 45px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentLoginSectionSection({name}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Title,{children:"대화에 참여하려면 회원가입"}),(0,jsx_runtime.jsxs)(SubTitle,{children:["로그인하여 ",name,"님의 이야기에 대해 피드백을 제공해 보세요"]}),(0,jsx_runtime.jsx)(LoginLink,{to:path.m.LOGIN,"aria-label":"카카오 로그인 페이지로 이동",children:(0,jsx_runtime.jsx)(Image,{src:kakao_login_large_namespaceObject,alt:"로그인 페이지로"})})]})}CommentLoginSectionSection.displayName="CommentLoginSectionSection";try{CommentLoginSection.displayName="CommentLoginSection",CommentLoginSection.__docgenInfo={description:"",displayName:"CommentLoginSection",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentList/CommentLoginSection/index.tsx#CommentLoginSection"]={docgenInfo:CommentLoginSection.__docgenInfo,name:"CommentLoginSection",path:"src/components/comment/CommentList/CommentLoginSection/index.tsx#CommentLoginSection"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/path.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>BASE_PATH,m:()=>PATH});const BASE_PATH={HOME:"/",LANDING:"/landing",LOGIN:"/login",POST:"/posts",USER:"/users",ADMIN:"/admin",SEARCH:"/search",RANKING:"/ranking"},PATH={...BASE_PATH,POST_WRITE:`${BASE_PATH.POST}/write`,POST_VOTE_RESULT:`${BASE_PATH.POST}/result`,POST_CATEGORY:`${BASE_PATH.POST}/category`,USER_POST:`${BASE_PATH.USER}/posts`,USER_VOTE:`${BASE_PATH.USER}/votes`,USER_INFO:`${BASE_PATH.USER}/myPage`,USER_INFO_REGISTER:`${BASE_PATH.USER}/register`}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
//# sourceMappingURL=components-comment-CommentList-CommentLoginSection-CommentLoginSection-stories.226f0380.iframe.bundle.js.map