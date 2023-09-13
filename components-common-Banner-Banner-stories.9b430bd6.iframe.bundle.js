"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[8304],{"./src/components/common/Banner/Banner.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/Banner/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},Primary={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{title:"이것은 배너에 포함될 제목입니다.",content:"그리고 이것은 배너에 포함될 내용입니다.",handleClose:()=>{},path:"/"})};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:'{\n  render: () => <Banner title="이것은 배너에 포함될 제목입니다." content="그리고 이것은 배너에 포함될 내용입니다." handleClose={() => {}} path="/" />\n}',...Primary.parameters?.docs?.source}}};const __namedExportsOrder=["Primary"]},"./src/components/common/Banner/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Banner});var x_mark_black=__webpack_require__("./src/assets/x_mark_black.svg"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Wrapper=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-columns: 1fr 8fr 3fr;
  align-items: center;
  justify-items: center;
  gap: 4px;

  width: 100%;
  height: 60px;
  border-radius: 7px;

  background-color: #f1eae7;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    grid-template-columns: 1fr 6fr 3fr;
    margin: 0 8px;
  }

  @media (max-width: ${theme.r.breakpoint.sm}) {
    border-radius: 0px;
  }
`,IconImage=styled_components_browser_esm.zo.img`
  width: 18px;
  height: 18px;

  justify-self: center;
`,Content=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  justify-self: start;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    margin-left: 20px;
  }
`,Title=styled_components_browser_esm.zo.span`
  font-size: 16px;
  font-weight: 600;

  @media (max-width: ${theme.r.breakpoint.sm}) {
    font-size: 13px;
  }
`,Description=styled_components_browser_esm.zo.span`
  font-size: 14px;

  @media (max-width: ${theme.r.breakpoint.sm}) {
    font-size: 12px;
  }
`,MovePageLink=(0,styled_components_browser_esm.zo)(dist.rU)`
  justify-self: center;

  width: 60%;
  height: 50%;
  border-radius: 8px;
  padding-top: 7px;

  color: white;
  background-color: var(--header);

  font-size: 12px;
  text-decoration: none;
  text-align: center;

  @media (max-width: ${theme.r.breakpoint.sm}) {
    width: 70%;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Banner({title,content,handleClose,path}){return(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(IconImage,{src:x_mark_black,alt:"배너 닫기",onClick:handleClose}),(0,jsx_runtime.jsxs)(Content,{children:[(0,jsx_runtime.jsx)(Title,{"aria-label":"배너 제목",children:title}),(0,jsx_runtime.jsx)(Description,{"aria-label":"배너 내용",children:content})]}),(0,jsx_runtime.jsx)(MovePageLink,{to:path,"aria-label":"세부 페이지로 이동",children:"자세히"})]})}Banner.displayName="Banner";try{Banner.displayName="Banner",Banner.__docgenInfo={description:"",displayName:"Banner",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"string"}},handleClose:{defaultValue:null,description:"",name:"handleClose",required:!0,type:{name:"() => void"}},path:{defaultValue:null,description:"",name:"path",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Banner/index.tsx#Banner"]={docgenInfo:Banner.__docgenInfo,name:"Banner",path:"src/components/common/Banner/index.tsx#Banner"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
  `}}},"./src/assets/x_mark_black.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/x_mark_black.c8494eb2.svg"}}]);
//# sourceMappingURL=components-common-Banner-Banner-stories.9b430bd6.iframe.bundle.js.map