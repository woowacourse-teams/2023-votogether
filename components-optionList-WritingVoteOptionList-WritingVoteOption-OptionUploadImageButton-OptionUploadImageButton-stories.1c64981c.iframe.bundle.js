"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[7087],{"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionUploadImageButton/OptionUploadImageButton.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionUploadImageButton/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{isImageVisible:!0,optionId:123})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <OptionUploadImageButton isImageVisible={true} optionId={123} />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionUploadImageButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>OptionUploadImageButton});__webpack_require__("./node_modules/react/index.js");const photo_white_namespaceObject=__webpack_require__.p+"static/media/photo_white.830f687b.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),style=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/style.ts");const Container=styled_components_browser_esm.zo.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  visibility: ${props=>props.$isVisible&&"hidden"};
`,Label=styled_components_browser_esm.zo.label`
  ${style.T$}
`,FileInput=styled_components_browser_esm.zo.input`
  visibility: hidden;
`,Image=(0,styled_components_browser_esm.zo)(style.Z)``;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function OptionUploadImageButton({optionId,isImageVisible,...rest}){const id=optionId.toString();return(0,jsx_runtime.jsxs)(Container,{$isVisible:isImageVisible,children:[(0,jsx_runtime.jsx)(Label,{htmlFor:id,"aria-label":"선택지 이미지 업로드 버튼",title:"이미지 업로드",children:(0,jsx_runtime.jsx)(Image,{src:photo_white_namespaceObject,alt:""})}),(0,jsx_runtime.jsx)(FileInput,{id,type:"file",accept:"image/*",...rest})]})}OptionUploadImageButton.displayName="OptionUploadImageButton";try{OptionUploadImageButton.displayName="OptionUploadImageButton",OptionUploadImageButton.__docgenInfo={description:"",displayName:"OptionUploadImageButton",props:{optionId:{defaultValue:null,description:"",name:"optionId",required:!0,type:{name:"number"}},isImageVisible:{defaultValue:null,description:"",name:"isImageVisible",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionUploadImageButton/index.tsx#OptionUploadImageButton"]={docgenInfo:OptionUploadImageButton.__docgenInfo,name:"OptionUploadImageButton",path:"src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionUploadImageButton/index.tsx#OptionUploadImageButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/style.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ee:()=>Image,OO:()=>ContentContainer,QU:()=>CancelButtonWrapper,S0:()=>ImageCancelWrapper,T$:()=>ButtonCssText,W2:()=>Container,Y7:()=>OptionContainer,Z:()=>IconImage,im:()=>ContentTextArea,mo:()=>ImageContainer});var styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_styles_theme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styles/theme.ts");const Container=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.li`
  display: flex;
  gap: 10px;
`,OptionContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 15px;
  border-radius: 4px;

  background-color: #e6e6e6;
`,ContentContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  width: 100%;
`,ContentTextArea=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.textarea`
  width: 100%;
  height: 90px;
  padding: 8px;

  font: var(--text-caption);
  line-height: 2.4rem;

  background-color: #e6e6e6;

  resize: none;

  @media (min-width: ${_styles_theme__WEBPACK_IMPORTED_MODULE_0__.r.breakpoint.md}) {
    font: var(--text-body);
  }
`,ImageContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  width: 80%;
  margin-top: 20px;

  position: relative;
`,Image=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.img`
  width: 100%;
  border-radius: 4px;

  aspect-ratio: 1/1;
  object-fit: cover;
`,ImageCancelWrapper=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  position: absolute;
  top: 10px;
  right: 10px;
`,CancelButtonWrapper=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  width: 34px;
  height: 100%;
`,ButtonCssText=`\ndisplay: flex;\njustify-content: center;\nalign-items: center;\n\nwidth: 24px;\nheight: 24px;\nborder-radius: 50%;\n\nbackground-color: #bebebe;\n\ncursor: pointer;\n\n@media (min-width: ${_styles_theme__WEBPACK_IMPORTED_MODULE_0__.r.breakpoint.md}) {\n width:20px;\n height:20px;\n}\n`,IconImage=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.img`
  width: 14px;
  height: 14px;

  @media (min-width: ${_styles_theme__WEBPACK_IMPORTED_MODULE_0__.r.breakpoint.md}) {
    width: 16px;
    height: 16px;
  }
`},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
//# sourceMappingURL=components-optionList-WritingVoteOptionList-WritingVoteOption-OptionUploadImageButton-OptionUploadImageButton-stories.1c64981c.iframe.bundle.js.map