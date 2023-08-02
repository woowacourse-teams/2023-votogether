"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[6775],{"./src/components/report/UserReportModal/UserReportModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/report/UserReportModal/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{handleCancelClick:()=>{}})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <UserReportModal handleCancelClick={() => {}} />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/comment/CommentModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentModal});var SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentModal({title,primaryButton,secondaryButton,children}){const{text:primaryText,handleClick:primaryClick}=primaryButton,{text:secondaryText,handleClick:secondaryClick}=secondaryButton;return(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsxs)(ModalContainer,{children:[(0,jsx_runtime.jsx)(Title,{children:title}),children,(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:secondaryClick,theme:"gray",children:secondaryText})}),(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:primaryClick,theme:"fill",children:primaryText})})]})]})})}CommentModal.displayName="CommentModal";try{CommentModal.displayName="CommentModal",CommentModal.__docgenInfo={description:"",displayName:"CommentModal",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},primaryButton:{defaultValue:null,description:"",name:"primaryButton",required:!0,type:{name:"ButtonProps"}},secondaryButton:{defaultValue:null,description:"",name:"secondaryButton",required:!0,type:{name:"ButtonProps"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentModal/index.tsx#CommentModal"]={docgenInfo:CommentModal.__docgenInfo,name:"CommentModal",path:"src/components/comment/CommentModal/index.tsx#CommentModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Select/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Select});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg");const SELECT_SELECTED="selected",SELECT_DISABLED="disabled",SELECT_DEFAULT="default";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  font: var(--text-caption);

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`,SELECTED_CSS_OPTION={selected:{border:"2px solid #60a5fa",color:"var(--slate)",cursor:"pointer"},disabled:{border:"1px solid var(--slate)",color:"var(--slate)",cursor:"not-allowed"},default:{border:"1px solid var(--slate)",color:"",cursor:"pointer"}},SelectedContainer=styled_components_browser_esm.zo.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 8px;
  border: ${({$status})=>SELECTED_CSS_OPTION[$status].border};
  border-radius: 4px;

  font: inherit;

  color: ${({$status})=>SELECTED_CSS_OPTION[$status].color};

  cursor: ${({$status})=>SELECTED_CSS_OPTION[$status].cursor};
`,OptionListParent=styled_components_browser_esm.zo.div`
  position: relative;
`,OptionListContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  border: 1px solid var(--slate);
  border-radius: 4px;

  position: absolute;
  top: 4px;

  background-color: var(--white);
`,OptionContainer=styled_components_browser_esm.zo.div`
  padding: 8px;

  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`,Image=styled_components_browser_esm.zo.img`
  width: 20px;
  height: 20px;
  border-left: 1px solid var(--slate);
  padding-left: 8px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Select({selectedOption,optionList,handleOptionChange,isDisabled=!1,...rest}){const optionKeyList=Object.keys(optionList),[isOpen,setIsOpen]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(SelectedContainer,{onClick:()=>{isDisabled||setIsOpen((prev=>!prev))},$status:isDisabled?SELECT_DISABLED:isOpen?SELECT_SELECTED:SELECT_DEFAULT,...rest,children:[(0,jsx_runtime.jsx)("span",{children:selectedOption}),(0,jsx_runtime.jsx)(Image,{src:isOpen?chevron_up:chevron_down,alt:"",$isSelected:isOpen})]}),isOpen&&(0,jsx_runtime.jsx)(OptionListParent,{children:(0,jsx_runtime.jsx)(OptionListContainer,{children:optionKeyList.map((optionKey=>(0,jsx_runtime.jsx)(OptionContainer,{onClick:()=>(handleOptionChange(optionKey),void setIsOpen(!1)),children:optionList[optionKey]},optionKey)))})})]})}Select.displayName="Select";try{Select.displayName="Select",Select.__docgenInfo={description:"",displayName:"Select",props:{selectedOption:{defaultValue:null,description:"",name:"selectedOption",required:!0,type:{name:"string"}},optionList:{defaultValue:null,description:"",name:"optionList",required:!0,type:{name:"Record<T, string>"}},handleOptionChange:{defaultValue:null,description:"",name:"handleOptionChange",required:!0,type:{name:"(option: T) => void"}},isDisabled:{defaultValue:{value:"false"},description:"",name:"isDisabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Select/index.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/components/common/Select/index.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BORDER_THEME={fill:"var(--primary-color)",blank:"var(--primary-color)",gray:"#67727E"},TEXT_THEME={fill:"white",blank:"var(--primary-color)",gray:"white"},BACKGROUND_THEME={fill:"var(--primary-color)",blank:"white",gray:"#67727E"},Button=styled_components_browser_esm.zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{$theme:theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'},{value:'"gray"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/report/UserReportModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>UserReportModal});var useSelect=__webpack_require__("./src/hooks/useSelect.tsx"),CommentModal=__webpack_require__("./src/components/comment/CommentModal/index.tsx"),Select=__webpack_require__("./src/components/common/Select/index.tsx");const USER_REPORT_KIND={ADVERTISING:"advertisingNickname",INVALID:"invalidNickname",SPAMMING:"spamming"},USER_REPORT_MESSAGE={[USER_REPORT_KIND.ADVERTISING]:"광고성 닉네임",[USER_REPORT_KIND.INVALID]:"부적절한 닉네임",[USER_REPORT_KIND.SPAMMING]:"도배성 컨텐츠 작성"};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UserReportModal({handleCancelClick}){const{handleOptionChange,selectedOption}=(0,useSelect.L)(USER_REPORT_KIND.ADVERTISING);return(0,jsx_runtime.jsx)(CommentModal.Z,{title:"유저 신고하기",primaryButton:{text:"신고",handleClick:()=>{}},secondaryButton:{text:"취소",handleClick:handleCancelClick},children:(0,jsx_runtime.jsx)(Select.Z,{"aria-label":"유저 신고 방법 선택",optionList:USER_REPORT_MESSAGE,handleOptionChange,selectedOption:USER_REPORT_MESSAGE[selectedOption]})})}UserReportModal.displayName="UserReportModal";try{UserReportModal.displayName="UserReportModal",UserReportModal.__docgenInfo={description:"",displayName:"UserReportModal",props:{handleCancelClick:{defaultValue:null,description:"",name:"handleCancelClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/report/UserReportModal/index.tsx#UserReportModal"]={docgenInfo:UserReportModal.__docgenInfo,name:"UserReportModal",path:"src/components/report/UserReportModal/index.tsx#UserReportModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useSelect.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>useSelect});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useSelect=initialOption=>{const[selectedOption,setSelectedOption]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOption);return{selectedOption,handleOptionChange:option=>{setSelectedOption(option)}}};try{useSelect.displayName="useSelect",useSelect.__docgenInfo={description:"",displayName:"useSelect",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useSelect.tsx#useSelect"]={docgenInfo:useSelect.__docgenInfo,name:"useSelect",path:"src/hooks/useSelect.tsx#useSelect"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{header:100,modal:200}}},"./src/assets/chevron-down.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-down.f97a5bb1.svg"},"./src/assets/chevron-up.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-up.a1eb858b.svg"}}]);
//# sourceMappingURL=components-report-UserReportModal-UserReportModal-stories.17812acf.iframe.bundle.js.map