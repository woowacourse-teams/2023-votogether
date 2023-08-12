"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[3765],{"./src/components/common/ErrorMessage/ErrorMessage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ErrorMessage_stories});var IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Wrapper=styled_components_browser_esm.zo.div`
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
`,Direction=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`,RetryText=styled_components_browser_esm.zo.p`
  display: flex;
  justify-content: space-around;
  gap: 10px;

  padding: 12px;

  font: var(--text-body);
  font-weight: bold;
`;styled_components_browser_esm.zo.div`
  width: 120px;
  height: 50px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ErrorMessage({errorHandler}){return(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(Title,{children:"⚠ 잠시 후 다시 시도해주세요."}),(0,jsx_runtime.jsx)(Description,{children:"요청하신 데이터를 불러오는데 실패했습니다."}),(0,jsx_runtime.jsx)(Direction,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:errorHandler,"aria-label":"다시 시도",theme:"blank",children:(0,jsx_runtime.jsxs)(RetryText,{children:[(0,jsx_runtime.jsx)(IconButton.Z,{category:"retry"}),"다시 시도"]})})})]})}ErrorMessage.displayName="ErrorMessage";try{ErrorMessage.displayName="ErrorMessage",ErrorMessage.__docgenInfo={description:"",displayName:"ErrorMessage",props:{errorHandler:{defaultValue:null,description:"",name:"errorHandler",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/ErrorMessage/index.tsx#ErrorMessage"]={docgenInfo:ErrorMessage.__docgenInfo,name:"ErrorMessage",path:"src/components/common/ErrorMessage/index.tsx#ErrorMessage"})}catch(__react_docgen_typescript_loader_error){}const ErrorMessage_stories={component:ErrorMessage},Default={render:()=>(0,jsx_runtime.jsx)(ErrorMessage,{errorHandler:()=>{}})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <ErrorMessage errorHandler={() => {}} />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/IconButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>IconButton});const back_namespaceObject=__webpack_require__.p+"static/media/back.0d0cf282.svg",category_namespaceObject=__webpack_require__.p+"static/media/category.5dbd06d6.svg",retry_namespaceObject=__webpack_require__.p+"static/media/retry.ed31509f.svg",search_white_namespaceObject=__webpack_require__.p+"static/media/search_white.74caf850.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  background-color: rgba(0, 0, 0, 0);

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ICON_CATEGORY={category:{name:"카테고리",url:category_namespaceObject},back:{name:"뒤로가기",url:back_namespaceObject},search:{name:"검색",url:search_white_namespaceObject},retry:{name:"다시시도",url:retry_namespaceObject}};function IconButton({category,...rest}){const src=ICON_CATEGORY[category].url,ariaLabelText=ICON_CATEGORY[category].name;return(0,jsx_runtime.jsx)(Button,{"aria-label":ariaLabelText,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:`${ariaLabelText} 버튼`})})}IconButton.displayName="IconButton";try{IconButton.displayName="IconButton",IconButton.__docgenInfo={description:"",displayName:"IconButton",props:{category:{defaultValue:null,description:"",name:"category",required:!0,type:{name:"enum",value:[{value:'"search"'},{value:'"category"'},{value:'"back"'},{value:'"retry"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/IconButton/index.tsx#IconButton"]={docgenInfo:IconButton.__docgenInfo,name:"IconButton",path:"src/components/common/IconButton/index.tsx#IconButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BORDER_THEME={fill:"var(--primary-color)",blank:"var(--primary-color)",gray:"#67727E"},TEXT_THEME={fill:"white",blank:"var(--primary-color)",gray:"white"},BACKGROUND_THEME={fill:"var(--primary-color)",blank:"white",gray:"#67727E"},Button=styled_components_browser_esm.zo.button`
  display: block;

  width: 100%;
  height: 100%;
  border: 2px solid ${({$theme})=>BORDER_THEME[$theme]};
  border-radius: 8px;

  color: ${({$theme})=>TEXT_THEME[$theme]};
  background-color: ${({$theme})=>BACKGROUND_THEME[$theme]};

  font: var(--text-caption);

  cursor: pointer;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{$theme:theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'},{value:'"gray"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
//# sourceMappingURL=components-common-ErrorMessage-ErrorMessage-stories.137fe3ea.iframe.bundle.js.map