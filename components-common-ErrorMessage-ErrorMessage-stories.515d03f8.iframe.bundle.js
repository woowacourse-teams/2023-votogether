"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[3765],{"./src/components/common/ErrorMessage/ErrorMessage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/ErrorMessage/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{errorHandler:()=>{}})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <ErrorMessage errorHandler={() => {}} />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/ErrorMessage/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ErrorMessage});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Wrapper=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  position: relative;
`,Title=(styled_components_browser_esm.zo.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.r.zIndex.header};

  @media (min-width: ${theme.r.breakpoint.md}) {
    display: none;
  }
`,styled_components_browser_esm.zo.h1`
  width: 90%;
  margin-top: 60px;

  font-size: 20px;
  font-weight: bold;

  text-align: center;
`),Description=styled_components_browser_esm.zo.p`
  width: 90%;
  margin: 20px 0;

  font: var(--text-body);
  text-align: center;
`;styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`,styled_components_browser_esm.zo.p`
  display: flex;
  justify-content: space-around;
  gap: 10px;

  padding: 12px;

  font: var(--text-body);
  font-weight: bold;
`,styled_components_browser_esm.zo.div`
  width: 120px;
  height: 50px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ErrorMessage({errorHandler}){return(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(Title,{children:"⚠ 잠시 후 다시 시도해주세요."}),(0,jsx_runtime.jsx)(Description,{children:"요청하신 데이터를 불러오는데 실패했습니다."})]})}ErrorMessage.displayName="ErrorMessage";try{ErrorMessage.displayName="ErrorMessage",ErrorMessage.__docgenInfo={description:"",displayName:"ErrorMessage",props:{errorHandler:{defaultValue:null,description:"",name:"errorHandler",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/ErrorMessage/index.tsx#ErrorMessage"]={docgenInfo:ErrorMessage.__docgenInfo,name:"ErrorMessage",path:"src/components/common/ErrorMessage/index.tsx#ErrorMessage"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
//# sourceMappingURL=components-common-ErrorMessage-ErrorMessage-stories.515d03f8.iframe.bundle.js.map