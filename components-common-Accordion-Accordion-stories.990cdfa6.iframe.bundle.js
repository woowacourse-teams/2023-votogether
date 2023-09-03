"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[8101],{"./src/components/common/Accordion/Accordion.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,DeleteUserAccount:()=>DeleteUserAccount,NicknameChange:()=>NicknameChange,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var styled_components__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_hooks_useToggle__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/hooks/useToggle.tsx"),_Modal__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Modal/index.tsx"),_SquareButton__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/common/SquareButton/index.tsx"),___WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/common/Accordion/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_3__.Z},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_3__.Z,{title:"Click Title to Open Content",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span",{children:"Hello This is Content!"})})},NicknameChange={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(___WEBPACK_IMPORTED_MODULE_3__.Z,{title:"닉네임 변경",ariaLabel:"닉네임 변경 메뉴",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Input,{placeholder:"새로운 닉네임을 입력해주세요"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ButtonWrapper,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SquareButton__WEBPACK_IMPORTED_MODULE_2__.Z,{"aria-label":"닉네임 변경",theme:"fill",children:"변경"})})]})},DeleteUserAccount=()=>{const{isOpen,openComponent,closeComponent}=(0,_hooks_useToggle__WEBPACK_IMPORTED_MODULE_0__.O)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(___WEBPACK_IMPORTED_MODULE_3__.Z,{title:"회원 탈퇴",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ButtonWrapper,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SquareButton__WEBPACK_IMPORTED_MODULE_2__.Z,{onClick:openComponent,"aria-label":"회원 탈퇴",theme:"blank",children:"회원 탈퇴"})}),isOpen&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Modal__WEBPACK_IMPORTED_MODULE_1__.Z,{size:"sm",onModalClose:closeComponent,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(ModalBody,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ModalTitle,{children:"정말 탈퇴하시겠어요?"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(ModalDescription,{children:["탈퇴 버튼 클릭 시, ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("br",{}),"계정은 삭제되며 복구되지 않아요."]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(ButtonListWrapper,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SquareButton__WEBPACK_IMPORTED_MODULE_2__.Z,{"aria-label":"회원 탈퇴",theme:"fill",children:"탈퇴"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SquareButton__WEBPACK_IMPORTED_MODULE_2__.Z,{onClick:closeComponent,"aria-label":"회원 탈퇴",theme:"blank",children:"취소"})]})]})})]})};DeleteUserAccount.displayName="DeleteUserAccount";const ButtonWrapper=styled_components__WEBPACK_IMPORTED_MODULE_5__.zo.div`
  width: 90px;
  height: 50px;
`,Input=styled_components__WEBPACK_IMPORTED_MODULE_5__.zo.input`
  width: 80%;
  border: 1px solid #f2f2f2;
  padding: 20px;
`,ModalBody=styled_components__WEBPACK_IMPORTED_MODULE_5__.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  width: 90%;
  margin: 40px 20px 0px 16px;

  font: var(--text-caption);
`,ModalTitle=styled_components__WEBPACK_IMPORTED_MODULE_5__.zo.div`
  font: var(--text-title);
`,ModalDescription=styled_components__WEBPACK_IMPORTED_MODULE_5__.zo.div`
  font: var(--text-body);
`,ButtonListWrapper=styled_components__WEBPACK_IMPORTED_MODULE_5__.zo.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;

  width: 90%;
  height: 50px;

  margin-top: 20px;
`;Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  render: () => <Accordion title="Click Title to Open Content">\n      <span>Hello This is Content!</span>\n    </Accordion>\n}',...Default.parameters?.docs?.source}}},NicknameChange.parameters={...NicknameChange.parameters,docs:{...NicknameChange.parameters?.docs,source:{originalSource:'{\n  render: () => <Accordion title="닉네임 변경" ariaLabel="닉네임 변경 메뉴">\n      <Input placeholder="새로운 닉네임을 입력해주세요" />\n      <ButtonWrapper>\n        <SquareButton aria-label="닉네임 변경" theme="fill">\n          변경\n        </SquareButton>\n      </ButtonWrapper>\n    </Accordion>\n}',...NicknameChange.parameters?.docs?.source}}},DeleteUserAccount.parameters={...DeleteUserAccount.parameters,docs:{...DeleteUserAccount.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isOpen,\n    openComponent,\n    closeComponent\n  } = useToggle();\n  return <Accordion title="회원 탈퇴">\n      <ButtonWrapper>\n        <SquareButton onClick={openComponent} aria-label="회원 탈퇴" theme="blank">\n          회원 탈퇴\n        </SquareButton>\n      </ButtonWrapper>\n      {isOpen && <Modal size="sm" onModalClose={closeComponent}>\n          <ModalBody>\n            <ModalTitle>정말 탈퇴하시겠어요?</ModalTitle>\n            <ModalDescription>\n              탈퇴 버튼 클릭 시, <br></br>계정은 삭제되며 복구되지 않아요.\n            </ModalDescription>\n            <ButtonListWrapper>\n              <SquareButton aria-label="회원 탈퇴" theme="fill">\n                탈퇴\n              </SquareButton>\n              <SquareButton onClick={closeComponent} aria-label="회원 탈퇴" theme="blank">\n                취소\n              </SquareButton>\n            </ButtonListWrapper>\n          </ModalBody>\n        </Modal>}\n    </Accordion>;\n}',...DeleteUserAccount.parameters?.docs?.source}}};const __namedExportsOrder=["Default","NicknameChange","DeleteUserAccount"]},"./src/components/common/Accordion/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Accordion});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.ZP.div`
  width: 100%;

  font: var(--text-caption);
`,Title=styled_components_browser_esm.ZP.div`
  display: flex;
  justify-content: space-between;

  border: 1px solid #f2f2f2;
  border-radius: 7px 7px 0 0;
  padding: 16px;

  background-color: #ffffff;

  &:hover {
    background-color: #f2f2f2;
  }
  cursor: pointer;
`,Content=styled_components_browser_esm.ZP.div`
  display: ${props=>props.$isOpen?"block":"none"};
  justify-content: space-between;

  border: 1px solid #f2f2f2;
  border-radius: 0 0 7px 7px;
  padding: 16px;

  opacity: ${props=>props.$isOpen?1:0};
  animation: ${props=>props.$isOpen?fadeIn:fadeOut} 0.2s ease-in-out;
`,Image=styled_components_browser_esm.ZP.img`
  width: 20px;
  height: 20px;
`,fadeIn=styled_components_browser_esm.F4`
  from {
    opacity: 0;
    height: 0;
  }
  to {
    opacity: 1;
    height: auto;
  }
`,fadeOut=styled_components_browser_esm.F4`
  from {
    opacity: 1;
    height: auto;
  }
  to {
    opacity: 0;
    height: 0;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Accordion({title,ariaLabel="메뉴",children}){const[isOpen,setIsOpen]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsxs)(Title,{"aria-label":isOpen?`${ariaLabel} 닫기`:`${ariaLabel} 열기`,tabIndex:0,onClick:()=>{setIsOpen(!isOpen)},"aria-controls":`${title}에 대한 내용`,children:[title,(0,jsx_runtime.jsx)(Image,{src:isOpen?chevron_up:chevron_down,alt:"",$isOpen:isOpen})]}),(0,jsx_runtime.jsx)(Content,{"aria-live":"polite",id:`${title}에 대한 내용`,$isOpen:isOpen,children})]})}Accordion.displayName="Accordion";try{Accordion.displayName="Accordion",Accordion.__docgenInfo={description:"",displayName:"Accordion",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},ariaLabel:{defaultValue:{value:"메뉴"},description:"",name:"ariaLabel",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/index.tsx#Accordion"]={docgenInfo:Accordion.__docgenInfo,name:"Accordion",path:"src/components/common/Accordion/index.tsx#Accordion"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Modal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Modal});var react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const MODAL_SIZE={sm:"290px",md:"590px",lg:"700px"},All=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;
`,Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.35);
`,Container=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-rows: 1fr 6fr;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: ${props=>MODAL_SIZE[props.size]};
  height: 290px;
  border-radius: 12px;
  border: 2px solid #f6f6f6;
  padding: 5px;

  background-color: white;

  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
`,HiddenCloseButton=styled_components_browser_esm.zo.button`
  position: absolute;
  left: -10000px;
  top: -10000px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Modal({onModalClose,children,size}){const BackDropRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{const handler=e=>{e.target===BackDropRef.current&&onModalClose()};return document.addEventListener("click",handler),()=>document.removeEventListener("click",handler)}),[BackDropRef,onModalClose]),(0,jsx_runtime.jsxs)(All,{children:[(0,jsx_runtime.jsx)(HiddenCloseButton,{onClick:onModalClose,tabIndex:0,"aria-label":"팝업 창 닫기"}),(0,jsx_runtime.jsx)(Backdrop,{ref:BackDropRef}),(0,jsx_runtime.jsx)(Container,{tabIndex:0,size,children})]})}Modal.displayName="Modal";try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{onModalClose:{defaultValue:null,description:"",name:"onModalClose",required:!0,type:{name:"() => void"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/index.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/index.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BORDER_THEME={fill:"var(--primary-color)",blank:"var(--primary-color)",gray:"#67727E"},TEXT_THEME={fill:"white",blank:"var(--primary-color)",gray:"white"},BACKGROUND_THEME={fill:"var(--primary-color)",blank:"white",gray:"#67727E"},Button=styled_components_browser_esm.zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{$theme:theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'},{value:'"gray"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useToggle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>useToggle});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useToggle=()=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return{isOpen,openComponent:()=>{setIsOpen(!0)},closeComponent:()=>{setIsOpen(!1)},toggleComponent:()=>{setIsOpen((prevIsOpen=>!prevIsOpen))}}}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
  `}}},"./src/assets/chevron-down.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-down.f97a5bb1.svg"},"./src/assets/chevron-up.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-up.a1eb858b.svg"}}]);
//# sourceMappingURL=components-common-Accordion-Accordion-stories.990cdfa6.iframe.bundle.js.map