"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[9742],{"./src/components/comment/CommentList/CommentTextForm/CommentTextForm.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{EditForm:()=>EditForm,InitForm:()=>InitForm,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _mocks_mockData_comment__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/mocks/mockData/comment.ts"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/comment/CommentList/CommentTextForm/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_1__.Z},InitForm={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{initialComment:""})},EditForm={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{initialComment:_mocks_mockData_comment__WEBPACK_IMPORTED_MODULE_0__.I[0].content,handleCancelClick:()=>{}})};InitForm.parameters={...InitForm.parameters,docs:{...InitForm.parameters?.docs,source:{originalSource:'{\n  render: () => <CommentTextForm initialComment="" />\n}',...InitForm.parameters?.docs?.source}}},EditForm.parameters={...EditForm.parameters,docs:{...EditForm.parameters?.docs,source:{originalSource:"{\n  render: () => <CommentTextForm initialComment={MOCK_TRANSFORMED_COMMENT_LIST[0].content} handleCancelClick={() => {}} />\n}",...EditForm.parameters?.docs?.source}}};const __namedExportsOrder=["InitForm","EditForm"]},"./src/components/comment/CommentList/CommentTextForm/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentTextForm});var useText=__webpack_require__("./src/hooks/useText.ts"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx");const COMMENT_MAX_LENGTH=200;var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
`,TextArea=styled_components_browser_esm.zo.textarea`
  height: 120px;
  padding: 12px;
  border: 1px solid var(--primary-color);
  border-radius: 6px;

  font: var(--text-caption);
  font-weight: 400;
  line-height: 2.4rem;

  resize: none;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: 160px;

    font: var(--text-body);
  }
`,ButtonContainer=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: end;
  gap: 20px;

  padding-top: 20px;
`,ButtonWrapper=styled_components_browser_esm.zo.div`
  width: 60px;
  height: 40px;

  font: var(--text-caption);
  font-weight: 600;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    width: 74px;
    height: 46px;

    font: var(--text-body);
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentTextForm({initialComment,handleCancelClick}){const{handleTextChange,text}=(0,useText.X)(initialComment);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(TextArea,{value:text,onChange:e=>handleTextChange(e,COMMENT_MAX_LENGTH)}),(0,jsx_runtime.jsxs)(ButtonContainer,{children:[handleCancelClick&&(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:handleCancelClick,theme:"gray",type:"button",children:"취소"})}),(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"blank",type:"button",children:"저장"})})]})]})}CommentTextForm.displayName="CommentTextForm";try{CommentTextForm.displayName="CommentTextForm",CommentTextForm.__docgenInfo={description:"",displayName:"CommentTextForm",props:{initialComment:{defaultValue:null,description:"",name:"initialComment",required:!0,type:{name:"string"}},handleCancelClick:{defaultValue:null,description:"",name:"handleCancelClick",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentList/CommentTextForm/index.tsx#CommentTextForm"]={docgenInfo:CommentTextForm.__docgenInfo,name:"CommentTextForm",path:"src/components/comment/CommentList/CommentTextForm/index.tsx#CommentTextForm"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BORDER_THEME={fill:"var(--primary-color)",blank:"var(--primary-color)",gray:"#67727E"},TEXT_THEME={fill:"white",blank:"var(--primary-color)",gray:"white"},BACKGROUND_THEME={fill:"var(--primary-color)",blank:"white",gray:"#67727E"},Button=styled_components_browser_esm.zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{$theme:theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'},{value:'"gray"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useText.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>useText});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useText=originalText=>{const[text,setText]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(originalText);return{text,handleTextChange:(event,limit)=>{const{value}=event.target;if(value.length===limit)return event.target.setCustomValidity(`선택지 내용은 ${limit}자까지 입력 가능합니다.`),void event.target.reportValidity();setText(value),event.target.setCustomValidity("")}}}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{header:100,modal:200}}}}]);
//# sourceMappingURL=components-comment-CommentList-CommentTextForm-CommentTextForm-stories.1b6d1c50.iframe.bundle.js.map