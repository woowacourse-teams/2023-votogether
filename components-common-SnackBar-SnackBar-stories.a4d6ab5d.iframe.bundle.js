"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[7475],{"./src/components/common/SnackBar/SnackBar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{PositionCase:()=>PositionCase,SizeCase:()=>SizeCase,__namedExportsOrder:()=>__namedExportsOrder,default:()=>SnackBar_stories});var useToggle=__webpack_require__("./src/hooks/useToggle.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts"),ToastNSnackBarStyle=__webpack_require__("./src/components/common/ToastNSnackBarStyle.ts");const fadeInAnimation=styled_components_browser_esm.F4`
  0%{
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`,Wrapper=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${props=>ToastNSnackBarStyle.V[props.$position]};
  align-items: end;
  justify-items: center;

  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
`,Content=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${props=>ToastNSnackBarStyle.m[props.$size].width};
  height: ${props=>ToastNSnackBarStyle.m[props.$size].height};
  border: 2px solid var(--primary-color);
  border-radius: 4px;

  background-color: var(--white);

  font: var(--text-caption);
  letter-spacing: 1px;

  animation: ${fadeInAnimation} ease-in-out 0.3s;

  z-index: ${theme.r.zIndex.modal};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SnackBar({children,size,position}){return(0,jsx_runtime.jsx)(Wrapper,{$position:position,children:(0,jsx_runtime.jsx)(Content,{$size:size,$isOpen:!0,children})})}SnackBar.displayName="SnackBar";try{SnackBar.displayName="SnackBar",SnackBar.__docgenInfo={description:"",displayName:"SnackBar",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SnackBar/index.tsx#SnackBar"]={docgenInfo:SnackBar.__docgenInfo,name:"SnackBar",path:"src/components/common/SnackBar/index.tsx#SnackBar"})}catch(__react_docgen_typescript_loader_error){}const SnackBar_stories={component:SnackBar},buttonStyle={display:"block",margin:"10px",background:"gray",cursor:"pointer"},SizeCase=()=>{const{isOpen:isSmOpen,openComponent:openSmComponent,closeComponent:closeSmComponent}=(0,useToggle.O)(),{isOpen:isMdOpen,openComponent:openMdComponent,closeComponent:closeMdComponent}=(0,useToggle.O)(),{isOpen:isLgOpen,openComponent:openLgComponent,closeComponent:closeLgComponent}=(0,useToggle.O)(),{isOpen:isFreeOpen,openComponent:openFreeComponent,closeComponent:closeFreeComponent}=(0,useToggle.O)(),handleLgCancelClick=()=>{closeLgComponent()};return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("button",{onClick:()=>{openSmComponent()},style:buttonStyle,children:"sm 사이즈 스낵바 열기 버튼"}),isSmOpen&&(0,jsx_runtime.jsxs)(SnackBar,{size:"sm",position:"bottom",children:["게시물이 삭제되었습니다.",(0,jsx_runtime.jsx)("button",{onClick:()=>{closeSmComponent()},style:buttonStyle,children:"닫기"})]}),(0,jsx_runtime.jsx)("button",{onClick:()=>{openMdComponent()},style:buttonStyle,children:"md 사이즈 스낵바 열기 버튼"}),isMdOpen&&(0,jsx_runtime.jsxs)(SnackBar,{size:"md",position:"bottom",children:["게시물이 삭제되었습니다.",(0,jsx_runtime.jsx)("button",{onClick:()=>{closeMdComponent()},style:buttonStyle,children:"닫기"})]}),(0,jsx_runtime.jsx)("button",{onClick:()=>{openLgComponent()},style:buttonStyle,children:"lg 사이즈 스낵바 열기 버튼"}),isLgOpen&&(0,jsx_runtime.jsxs)(SnackBar,{size:"lg",position:"bottom",children:["게시물이 삭제되었습니다.",(0,jsx_runtime.jsx)("button",{onClick:handleLgCancelClick,style:buttonStyle,children:"취소"}),(0,jsx_runtime.jsx)("button",{onClick:handleLgCancelClick,style:buttonStyle,children:"확인"})]}),(0,jsx_runtime.jsx)("button",{onClick:()=>{openFreeComponent()},style:buttonStyle,children:"free 사이즈 스낵바 열기 버튼"}),isFreeOpen&&(0,jsx_runtime.jsxs)(SnackBar,{size:"free",position:"bottom",children:["게시물이 삭제되었습니다.",(0,jsx_runtime.jsx)("button",{onClick:()=>{closeFreeComponent()},style:buttonStyle,children:"닫기"})]})]})},PositionCase=()=>{const{isOpen:isTopOpen,openComponent:openTopComponent,closeComponent:closeTopComponent}=(0,useToggle.O)(),{isOpen:isBottomOpen,openComponent:openBottomComponent,closeComponent:closeBottomComponent}=(0,useToggle.O)();return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("button",{onClick:()=>{openTopComponent()},style:buttonStyle,children:"top position 스낵바 열기 버튼"}),isTopOpen&&(0,jsx_runtime.jsxs)(SnackBar,{size:"sm",position:"top",children:["게시물이 삭제되었습니다.",(0,jsx_runtime.jsx)("button",{onClick:()=>{closeTopComponent()},style:buttonStyle,children:"닫기"})]}),(0,jsx_runtime.jsx)("button",{onClick:()=>{openBottomComponent()},style:buttonStyle,children:"bottom position 스낵바 열기 버튼"}),isBottomOpen&&(0,jsx_runtime.jsxs)(SnackBar,{size:"sm",position:"bottom",children:["게시물이 삭제되었습니다.",(0,jsx_runtime.jsx)("button",{onClick:()=>{closeBottomComponent()},style:buttonStyle,children:"닫기"})]})]})};SizeCase.parameters={...SizeCase.parameters,docs:{...SizeCase.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isOpen: isSmOpen,\n    openComponent: openSmComponent,\n    closeComponent: closeSmComponent\n  } = useToggle();\n  const {\n    isOpen: isMdOpen,\n    openComponent: openMdComponent,\n    closeComponent: closeMdComponent\n  } = useToggle();\n  const {\n    isOpen: isLgOpen,\n    openComponent: openLgComponent,\n    closeComponent: closeLgComponent\n  } = useToggle();\n  const {\n    isOpen: isFreeOpen,\n    openComponent: openFreeComponent,\n    closeComponent: closeFreeComponent\n  } = useToggle();\n  const handleSmButtonClick = () => {\n    openSmComponent();\n  };\n  const handleMdButtonClick = () => {\n    openMdComponent();\n  };\n  const handleLgButtonClick = () => {\n    openLgComponent();\n  };\n  const handleFreeButtonClick = () => {\n    openFreeComponent();\n  };\n  const handleSmCancelClick = () => {\n    closeSmComponent();\n  };\n  const handleMdCancelClick = () => {\n    closeMdComponent();\n  };\n  const handleLgCancelClick = () => {\n    closeLgComponent();\n  };\n  const handleFreeCancelClick = () => {\n    closeFreeComponent();\n  };\n  return <>\n      <button onClick={handleSmButtonClick} style={buttonStyle}>\n        sm 사이즈 스낵바 열기 버튼\n      </button>\n      {isSmOpen && <SnackBar size="sm" position="bottom">\n          게시물이 삭제되었습니다.\n          <button onClick={handleSmCancelClick} style={buttonStyle}>\n            닫기\n          </button>\n        </SnackBar>}\n      <button onClick={handleMdButtonClick} style={buttonStyle}>\n        md 사이즈 스낵바 열기 버튼\n      </button>\n      {isMdOpen && <SnackBar size="md" position="bottom">\n          게시물이 삭제되었습니다.\n          <button onClick={handleMdCancelClick} style={buttonStyle}>\n            닫기\n          </button>\n        </SnackBar>}\n      <button onClick={handleLgButtonClick} style={buttonStyle}>\n        lg 사이즈 스낵바 열기 버튼\n      </button>\n      {isLgOpen && <SnackBar size="lg" position="bottom">\n          게시물이 삭제되었습니다.\n          <button onClick={handleLgCancelClick} style={buttonStyle}>\n            취소\n          </button>\n          <button onClick={handleLgCancelClick} style={buttonStyle}>\n            확인\n          </button>\n        </SnackBar>}\n      <button onClick={handleFreeButtonClick} style={buttonStyle}>\n        free 사이즈 스낵바 열기 버튼\n      </button>\n      {isFreeOpen && <SnackBar size="free" position="bottom">\n          게시물이 삭제되었습니다.\n          <button onClick={handleFreeCancelClick} style={buttonStyle}>\n            닫기\n          </button>\n        </SnackBar>}\n    </>;\n}',...SizeCase.parameters?.docs?.source}}},PositionCase.parameters={...PositionCase.parameters,docs:{...PositionCase.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isOpen: isTopOpen,\n    openComponent: openTopComponent,\n    closeComponent: closeTopComponent\n  } = useToggle();\n  const {\n    isOpen: isBottomOpen,\n    openComponent: openBottomComponent,\n    closeComponent: closeBottomComponent\n  } = useToggle();\n  const handleTopButtonClick = () => {\n    openTopComponent();\n  };\n  const handleBottomButtonClick = () => {\n    openBottomComponent();\n  };\n  const handleTopCancelClick = () => {\n    closeTopComponent();\n  };\n  const handleBottomCancelClick = () => {\n    closeBottomComponent();\n  };\n  return <>\n      <button onClick={handleTopButtonClick} style={buttonStyle}>\n        top position 스낵바 열기 버튼\n      </button>\n      {isTopOpen && <SnackBar size="sm" position="top">\n          게시물이 삭제되었습니다.\n          <button onClick={handleTopCancelClick} style={buttonStyle}>\n            닫기\n          </button>\n        </SnackBar>}\n      <button onClick={handleBottomButtonClick} style={buttonStyle}>\n        bottom position 스낵바 열기 버튼\n      </button>\n      {isBottomOpen && <SnackBar size="sm" position="bottom">\n          게시물이 삭제되었습니다.\n          <button onClick={handleBottomCancelClick} style={buttonStyle}>\n            닫기\n          </button>\n        </SnackBar>}\n    </>;\n}',...PositionCase.parameters?.docs?.source}}};const __namedExportsOrder=["SizeCase","PositionCase"]},"./src/components/common/ToastNSnackBarStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>POSITION,m:()=>SQUARE_SIZE});const POSITION={top:"25%",bottom:"85%"},SQUARE_SIZE={sm:{width:"250px",height:"40px"},md:{width:"400px",height:"40px"},lg:{width:"500px",height:"45px"},free:{width:"80%",height:"50px"}}},"./src/hooks/useToggle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>useToggle});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useToggle=(isInitialOpen=!1)=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(isInitialOpen);return{isOpen,openComponent:()=>{setIsOpen(!0)},closeComponent:()=>{setIsOpen(!1)},toggleComponent:()=>{setIsOpen((prevIsOpen=>!prevIsOpen))}}};try{useToggle.displayName="useToggle",useToggle.__docgenInfo={description:"",displayName:"useToggle",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useToggle.tsx#useToggle"]={docgenInfo:useToggle.__docgenInfo,name:"useToggle",path:"src/hooks/useToggle.tsx#useToggle"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
//# sourceMappingURL=components-common-SnackBar-SnackBar-stories.a4d6ab5d.iframe.bundle.js.map