"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[3038],{"./src/components/common/AppInstallPrompt/BookMarkPrompt/BookMarkPrompt.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>BookMarkPrompt_stories});const arrow_up_on_square_namespaceObject=__webpack_require__.p+"static/media/arrow-up-on-square.9cf4be0a.svg";var logo=__webpack_require__("./src/assets/logo.svg"),x_mark_black=__webpack_require__("./src/assets/x_mark_black.svg"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 240px;
  border-top: 1px solid rgba(0, 0, 0, 0.3);

  position: fixed;
  bottom: 0;
  left: 0;

  background-color: white;

  z-index: ${theme.r.zIndex.modal};
`,Content=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: max-content;
  padding: 30px 20px;
`,Header=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 50px;
`,LogoImage=styled_components_browser_esm.zo.img`
  border-radius: 16px;

  width: 80px;
  height: 80px;
`,HeaderContent=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;

  margin-left: 24px;
`,HeaderTop=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
`,Title=styled_components_browser_esm.zo.span`
  font-size: 2.4rem;
  font-weight: 700;
`,Description=styled_components_browser_esm.zo.p`
  font-size: 1.6rem;
  font-weight: 700;
`,CancelButton=styled_components_browser_esm.zo.button`
  padding: 10px;

  position: relative;
  bottom: 10px;
  left: 10px;

  cursor: pointer;
`,IconImage=styled_components_browser_esm.zo.img`
  width: 24px;
  height: 24px;
`,DescriptionWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  align-self: end;
  gap: 8px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function BookMarkPrompt({handleCancelClick}){return(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsxs)(Content,{children:[(0,jsx_runtime.jsxs)(Header,{children:[(0,jsx_runtime.jsx)(LogoImage,{src:logo,alt:"보투게더 로고 이미지"}),(0,jsx_runtime.jsxs)(HeaderContent,{children:[(0,jsx_runtime.jsxs)(HeaderTop,{children:[(0,jsx_runtime.jsx)(Title,{children:"VoTogether"}),(0,jsx_runtime.jsx)(CancelButton,{onClick:handleCancelClick,children:(0,jsx_runtime.jsx)(IconImage,{src:x_mark_black,alt:"취소 아이콘"})})]}),(0,jsx_runtime.jsx)(Description,{children:"VoTogether는 앱처럼 원활히 사용할 수 있습니다. 설치하시겠습니까?"})]})]}),(0,jsx_runtime.jsx)(DescriptionWrapper,{children:(0,jsx_runtime.jsxs)(Description,{children:["브라우저 메뉴바에서 ",(0,jsx_runtime.jsx)(IconImage,{src:arrow_up_on_square_namespaceObject,alt:"추가하기 아이콘"}),' 모양 버튼을 눌러 "홈 화면에 추가하기"를 통해 설치를 할 수 있습니다.']})})]})})}BookMarkPrompt.displayName="BookMarkPrompt";try{BookMarkPrompt.displayName="BookMarkPrompt",BookMarkPrompt.__docgenInfo={description:"",displayName:"BookMarkPrompt",props:{handleCancelClick:{defaultValue:null,description:"",name:"handleCancelClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/AppInstallPrompt/BookMarkPrompt/index.tsx#BookMarkPrompt"]={docgenInfo:BookMarkPrompt.__docgenInfo,name:"BookMarkPrompt",path:"src/components/common/AppInstallPrompt/BookMarkPrompt/index.tsx#BookMarkPrompt"})}catch(__react_docgen_typescript_loader_error){}const BookMarkPrompt_stories={component:BookMarkPrompt},Default={render:()=>(0,jsx_runtime.jsx)(BookMarkPrompt,{handleCancelClick:()=>{}})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <BookMarkPrompt handleCancelClick={() => {}} />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
  `}}},"./src/assets/logo.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/logo.9ee58604.svg"},"./src/assets/x_mark_black.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/x_mark_black.c8494eb2.svg"}}]);
//# sourceMappingURL=components-common-AppInstallPrompt-BookMarkPrompt-BookMarkPrompt-stories.4c7bc337.iframe.bundle.js.map