"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[7284],{"./src/components/comment/CommentDeleteModal/CommentDeleteModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/comment/CommentDeleteModal/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{handleCancelClick:()=>{},handleDeleteClick:()=>{}})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <CommentDeleteModal handleCancelClick={() => {}} handleDeleteClick={() => {}} />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/comment/CommentDeleteModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentDeleteModal});var CommentModal=__webpack_require__("./src/components/comment/CommentModal/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Description=styled_components_browser_esm.zo.p`
  color: #67727e;

  font: var(--text-caption);
  white-space: pre-wrap;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentDeleteModal({handleCancelClick,handleDeleteClick}){return(0,jsx_runtime.jsx)(CommentModal.Z,{title:"댓글 삭제하기",primaryButton:{text:"삭제",handleClick:handleDeleteClick},secondaryButton:{text:"취소",handleClick:handleCancelClick},children:(0,jsx_runtime.jsx)(Description,{children:"댓글을 삭제하시겠습니까?\n댓글이 삭제되고 취소할 수 없습니다."})})}CommentDeleteModal.displayName="CommentDeleteModal";try{CommentDeleteModal.displayName="CommentDeleteModal",CommentDeleteModal.__docgenInfo={description:"",displayName:"CommentDeleteModal",props:{handleCancelClick:{defaultValue:null,description:"",name:"handleCancelClick",required:!0,type:{name:"() => void"}},handleDeleteClick:{defaultValue:null,description:"",name:"handleDeleteClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentDeleteModal/index.tsx#CommentDeleteModal"]={docgenInfo:CommentDeleteModal.__docgenInfo,name:"CommentDeleteModal",path:"src/components/comment/CommentDeleteModal/index.tsx#CommentDeleteModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/comment/CommentModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentModal});var SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentModal({title,primaryButton,secondaryButton,children}){const{text:primaryText,handleClick:primaryClick}=primaryButton,{text:secondaryText,handleClick:secondaryClick}=secondaryButton;return(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsxs)(ModalContainer,{children:[(0,jsx_runtime.jsx)(Title,{children:title}),children,(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:secondaryClick,theme:"gray",children:secondaryText})}),(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:primaryClick,theme:"fill",children:primaryText})})]})]})})}CommentModal.displayName="CommentModal";try{CommentModal.displayName="CommentModal",CommentModal.__docgenInfo={description:"",displayName:"CommentModal",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},primaryButton:{defaultValue:null,description:"",name:"primaryButton",required:!0,type:{name:"ButtonProps"}},secondaryButton:{defaultValue:null,description:"",name:"secondaryButton",required:!0,type:{name:"ButtonProps"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentModal/index.tsx#CommentModal"]={docgenInfo:CommentModal.__docgenInfo,name:"CommentModal",path:"src/components/comment/CommentModal/index.tsx#CommentModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BORDER_THEME={fill:"var(--primary-color)",blank:"var(--primary-color)",gray:"#67727E"},TEXT_THEME={fill:"white",blank:"var(--primary-color)",gray:"white"},BACKGROUND_THEME={fill:"var(--primary-color)",blank:"white",gray:"#67727E"},Button=styled_components_browser_esm.zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{$theme:theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'},{value:'"gray"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{header:100,modal:200}}}}]);
//# sourceMappingURL=components-comment-CommentDeleteModal-CommentDeleteModal-stories.4c09830e.iframe.bundle.js.map