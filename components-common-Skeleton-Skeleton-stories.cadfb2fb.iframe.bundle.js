"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[8298],{"./src/components/common/Skeleton/Skeleton.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FirstBoxLarge:()=>FirstBoxLarge,FirstBoxSmall:()=>FirstBoxSmall,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/Skeleton/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},FirstBoxLarge={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!0})},FirstBoxSmall={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1})};FirstBoxLarge.parameters={...FirstBoxLarge.parameters,docs:{...FirstBoxLarge.parameters?.docs,source:{originalSource:"{\n  render: () => <Skeleton isLarge={true} />\n}",...FirstBoxLarge.parameters?.docs?.source}}},FirstBoxSmall.parameters={...FirstBoxSmall.parameters,docs:{...FirstBoxSmall.parameters?.docs,source:{originalSource:"{\n  render: () => <Skeleton isLarge={false} />\n}",...FirstBoxSmall.parameters?.docs?.source}}};const __namedExportsOrder=["FirstBoxLarge","FirstBoxSmall"]},"./src/components/common/Skeleton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Skeleton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 9px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    gap: 12px;
  }
`,Box=styled_components_browser_esm.zo.div`
  border-radius: 4px;

  background-color: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;

  animation: 1.7s ${theme.r.animation.skeletonGradientWave} linear infinite;
`,FirstBox=(0,styled_components_browser_esm.zo)(Box)`
  height: ${props=>props.$isLarge?"40vh":"30vh"};

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: ${props=>props.$isLarge?"44vh":"34vh"};
  }
`,SecondBox=(0,styled_components_browser_esm.zo)(Box)`
  height: 4vh;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: 6vh;
  }
`,ThirdBox=(0,styled_components_browser_esm.zo)(Box)`
  height: 2vh;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: 4vh;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Skeleton({isLarge}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(FirstBox,{$isLarge:isLarge}),(0,jsx_runtime.jsx)(SecondBox,{}),(0,jsx_runtime.jsx)(ThirdBox,{})]})}Skeleton.displayName="Skeleton";try{Skeleton.displayName="Skeleton",Skeleton.__docgenInfo={description:"",displayName:"Skeleton",props:{isLarge:{defaultValue:null,description:"",name:"isLarge",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Skeleton/index.tsx#Skeleton"]={docgenInfo:Skeleton.__docgenInfo,name:"Skeleton",path:"src/components/common/Skeleton/index.tsx#Skeleton"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
//# sourceMappingURL=components-common-Skeleton-Skeleton-stories.cadfb2fb.iframe.bundle.js.map