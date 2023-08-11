"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[6079],{"./src/components/common/DeleteModal/DeleteModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Post:()=>Post,User:()=>User,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/DeleteModal/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},Post={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{target:"POST",handleCancelClick:()=>{},handleDeleteClick:()=>{}})},User={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{target:"MEMBERSHIP",handleCancelClick:()=>{},handleDeleteClick:()=>{}})};Post.parameters={...Post.parameters,docs:{...Post.parameters?.docs,source:{originalSource:'{\n  render: () => <DeleteModal target="POST" handleCancelClick={() => {}} handleDeleteClick={() => {}} />\n}',...Post.parameters?.docs?.source}}},User.parameters={...User.parameters,docs:{...User.parameters?.docs,source:{originalSource:'{\n  render: () => <DeleteModal target="MEMBERSHIP" handleCancelClick={() => {}} handleDeleteClick={() => {}} />\n}',...User.parameters?.docs?.source}}};const __namedExportsOrder=["Post","User"]},"./src/components/common/DeleteModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>DeleteModal});var TwoButtonModal=__webpack_require__("./src/components/common/TwoButtonModal/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Description=styled_components_browser_esm.zo.p`
  color: #67727e;

  font: var(--text-caption);
  white-space: pre-wrap;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TARGET_FOR_DELETE={MEMBERSHIP:"계정을",POST:"게시글을",COMMENT:"댓글을"};function DeleteModal({target,handleCancelClick,handleDeleteClick}){return(0,jsx_runtime.jsx)(TwoButtonModal.Z,{title:`${TARGET_FOR_DELETE[target]} 삭제하기`,primaryButton:{text:"삭제",handleClick:()=>{handleDeleteClick(),handleCancelClick()}},secondaryButton:{text:"취소",handleClick:handleCancelClick},children:(0,jsx_runtime.jsx)(Description,{children:`${TARGET_FOR_DELETE[target]} 삭제하시겠습니까?\n${TARGET_FOR_DELETE[target]} 삭제하면 취소할 수 없습니다.`})})}DeleteModal.displayName="DeleteModal";try{DeleteModal.displayName="DeleteModal",DeleteModal.__docgenInfo={description:"",displayName:"DeleteModal",props:{target:{defaultValue:null,description:"",name:"target",required:!0,type:{name:"enum",value:[{value:'"MEMBERSHIP"'},{value:'"POST"'},{value:'"COMMENT"'}]}},handleCancelClick:{defaultValue:null,description:"",name:"handleCancelClick",required:!0,type:{name:"() => void"}},handleDeleteClick:{defaultValue:null,description:"",name:"handleDeleteClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/DeleteModal/index.tsx#DeleteModal"]={docgenInfo:DeleteModal.__docgenInfo,name:"DeleteModal",path:"src/components/common/DeleteModal/index.tsx#DeleteModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BORDER_THEME={fill:"var(--primary-color)",blank:"var(--primary-color)",gray:"#67727E"},TEXT_THEME={fill:"white",blank:"var(--primary-color)",gray:"white"},BACKGROUND_THEME={fill:"var(--primary-color)",blank:"white",gray:"#67727E"},Button=styled_components_browser_esm.zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{$theme:theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'},{value:'"gray"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/TwoButtonModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TwoButtonModal});var SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  padding: 0 12px;

  position: fixed;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.5);

  z-index: ${theme.r.zIndex.modal};

  @media (min-width: ${theme.r.breakpoint.sm}) {
    padding: 0;
  }
`,ModalContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;

  background-color: white;
`,Title=styled_components_browser_esm.zo.span`
  margin-bottom: 32px;

  color: #334253;

  font: var(--text-title);
  font-weight: 500;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font-size: 2.4rem;
  }
`,ButtonContainer=styled_components_browser_esm.zo.div`
  display: flex;
  gap: 12px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    gap: 14px;
  }
`,ButtonWrapper=styled_components_browser_esm.zo.div`
  width: 100%;
  height: 48px;
  margin-top: 44px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TwoButtonModal({title,primaryButton,secondaryButton,children}){const{text:primaryText,handleClick:primaryClick}=primaryButton,{text:secondaryText,handleClick:secondaryClick}=secondaryButton;return(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsxs)(ModalContainer,{children:[(0,jsx_runtime.jsx)(Title,{children:title}),children,(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:secondaryClick,theme:"gray",children:secondaryText})}),(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:primaryClick,theme:"fill",children:primaryText})})]})]})})}TwoButtonModal.displayName="TwoButtonModal";try{TwoButtonModal.displayName="TwoButtonModal",TwoButtonModal.__docgenInfo={description:"",displayName:"TwoButtonModal",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},primaryButton:{defaultValue:null,description:"",name:"primaryButton",required:!0,type:{name:"ButtonProps"}},secondaryButton:{defaultValue:null,description:"",name:"secondaryButton",required:!0,type:{name:"ButtonProps"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/TwoButtonModal/index.tsx#TwoButtonModal"]={docgenInfo:TwoButtonModal.__docgenInfo,name:"TwoButtonModal",path:"src/components/common/TwoButtonModal/index.tsx#TwoButtonModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
//# sourceMappingURL=components-common-DeleteModal-DeleteModal-stories.8c14d360.iframe.bundle.js.map