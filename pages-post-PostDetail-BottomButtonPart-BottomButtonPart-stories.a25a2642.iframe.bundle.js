"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[9594],{"./src/pages/post/PostDetail/BottomButtonPart/BottomButtonPart.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__,isNotWriterAndIsClosedCase:()=>isNotWriterAndIsClosedCase,isNotWriterAndIsNotClosedCase:()=>isNotWriterAndIsNotClosedCase,isWriterAndIsClosedCase:()=>isWriterAndIsClosedCase,isWriterAndIsNotClosedCase:()=>isWriterAndIsNotClosedCase});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/pages/post/PostDetail/BottomButtonPart/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const meta={component:___WEBPACK_IMPORTED_MODULE_0__.Z},handleEvent={movePage:{moveWritePostPage:()=>{},moveVoteStatisticsPage:()=>{},movePostListPage:()=>{}},controlPost:{setEarlyClosePost:()=>{},deletePost:()=>{},reportPost:reason=>{},reportNickname:reason=>{}},openToast:()=>{}},__WEBPACK_DEFAULT_EXPORT__=meta,isWriterAndIsClosedCase={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{isWriter:!0,isClosed:!0,handleEvent})},isNotWriterAndIsClosedCase={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{isWriter:!1,isClosed:!0,handleEvent})},isWriterAndIsNotClosedCase={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{isWriter:!0,isClosed:!1,handleEvent})},isNotWriterAndIsNotClosedCase={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{isWriter:!1,isClosed:!1,handleEvent})};isWriterAndIsClosedCase.parameters={...isWriterAndIsClosedCase.parameters,docs:{...isWriterAndIsClosedCase.parameters?.docs,source:{originalSource:"{\n  render: () => <BottomButtonPart isWriter={true} isClosed={true} handleEvent={handleEvent} />\n}",...isWriterAndIsClosedCase.parameters?.docs?.source}}},isNotWriterAndIsClosedCase.parameters={...isNotWriterAndIsClosedCase.parameters,docs:{...isNotWriterAndIsClosedCase.parameters?.docs,source:{originalSource:"{\n  render: () => <BottomButtonPart isWriter={false} isClosed={true} handleEvent={handleEvent} />\n}",...isNotWriterAndIsClosedCase.parameters?.docs?.source}}},isWriterAndIsNotClosedCase.parameters={...isWriterAndIsNotClosedCase.parameters,docs:{...isWriterAndIsNotClosedCase.parameters?.docs,source:{originalSource:"{\n  render: () => <BottomButtonPart isWriter={true} isClosed={false} handleEvent={handleEvent} />\n}",...isWriterAndIsNotClosedCase.parameters?.docs?.source}}},isNotWriterAndIsNotClosedCase.parameters={...isNotWriterAndIsNotClosedCase.parameters,docs:{...isNotWriterAndIsNotClosedCase.parameters?.docs,source:{originalSource:"{\n  render: () => <BottomButtonPart isWriter={false} isClosed={false} handleEvent={handleEvent} />\n}",...isNotWriterAndIsNotClosedCase.parameters?.docs?.source}}};const __namedExportsOrder=["isWriterAndIsClosedCase","isNotWriterAndIsClosedCase","isWriterAndIsNotClosedCase","isNotWriterAndIsNotClosedCase"]},"./src/components/ReportModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ReportModal});var useSelect=__webpack_require__("./src/hooks/useSelect.tsx"),Select=__webpack_require__("./src/components/common/Select/index.tsx"),TwoButtonModal=__webpack_require__("./src/components/common/TwoButtonModal/index.tsx");const REPORT_MESSAGE={BEHAVIOR:"부적절한 언행/혐오/차별적 표현이 포함되어있습니다.",SPAMMING:"도배성 내용이 포함되어있습니다.",ADVERTISING:"광고성 내용이 포함되어있습니다.",SENSUALITY:"음란성 내용이 포함되어 있습니다.",SPECIFIC_PERSON:"특정인이 거론되어있습니다.",PRIVACY:"개인정보가 포함되어있습니다."},REPORT_TYPE={POST:{name:"게시글 신고",reportMessageList:REPORT_MESSAGE},COMMENT:{name:"댓글 신고",reportMessageList:REPORT_MESSAGE},NICKNAME:{name:"닉네임 신고",reportMessageList:REPORT_MESSAGE}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ReportModal({reportType,handleCancelClick,handleReportClick}){const{name,reportMessageList}=REPORT_TYPE[reportType],defaultReportMessage=Object.keys(reportMessageList)[0],{selectedOption,handleOptionChange}=(0,useSelect.L)(defaultReportMessage);return(0,jsx_runtime.jsx)(TwoButtonModal.Z,{title:name,primaryButton:{text:"신고",handleClick:()=>{handleReportClick(selectedOption),handleCancelClick()}},secondaryButton:{text:"취소",handleClick:handleCancelClick},children:(0,jsx_runtime.jsx)(Select.Z,{"aria-label":`${name} 방법 선택`,optionList:reportMessageList,handleOptionChange,selectedOption:reportMessageList[selectedOption]})})}ReportModal.displayName="ReportModal";try{ReportModal.displayName="ReportModal",ReportModal.__docgenInfo={description:"",displayName:"ReportModal",props:{reportType:{defaultValue:null,description:"",name:"reportType",required:!0,type:{name:"enum",value:[{value:'"POST"'},{value:'"COMMENT"'},{value:'"NICKNAME"'}]}},handleCancelClick:{defaultValue:null,description:"",name:"handleCancelClick",required:!0,type:{name:"() => void"}},handleReportClick:{defaultValue:null,description:"",name:"handleReportClick",required:!0,type:{name:"(reason: string) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ReportModal/index.tsx#ReportModal"]={docgenInfo:ReportModal.__docgenInfo,name:"ReportModal",path:"src/components/ReportModal/index.tsx#ReportModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/DeleteModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>DeleteModal});var TwoButtonModal=__webpack_require__("./src/components/common/TwoButtonModal/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Description=styled_components_browser_esm.zo.p`
  color: #67727e;

  font: var(--text-caption);
  white-space: pre-wrap;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TARGET_FOR_DELETE={MEMBERSHIP:"계정을",POST:"게시글을",COMMENT:"댓글을"};function DeleteModal({target,handleCancelClick,handleDeleteClick}){return(0,jsx_runtime.jsx)(TwoButtonModal.Z,{title:`${TARGET_FOR_DELETE[target]} 삭제하기`,primaryButton:{text:"삭제",handleClick:()=>{handleDeleteClick(),handleCancelClick()}},secondaryButton:{text:"취소",handleClick:handleCancelClick},children:(0,jsx_runtime.jsx)(Description,{tabIndex:0,children:`${TARGET_FOR_DELETE[target]} 삭제하시겠습니까?\n${TARGET_FOR_DELETE[target]} 삭제하면 취소할 수 없습니다.`})})}DeleteModal.displayName="DeleteModal";try{DeleteModal.displayName="DeleteModal",DeleteModal.__docgenInfo={description:"",displayName:"DeleteModal",props:{target:{defaultValue:null,description:"",name:"target",required:!0,type:{name:"enum",value:[{value:'"MEMBERSHIP"'},{value:'"POST"'},{value:'"COMMENT"'}]}},handleCancelClick:{defaultValue:null,description:"",name:"handleCancelClick",required:!0,type:{name:"() => void"}},handleDeleteClick:{defaultValue:null,description:"",name:"handleDeleteClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/DeleteModal/index.tsx#DeleteModal"]={docgenInfo:DeleteModal.__docgenInfo,name:"DeleteModal",path:"src/components/common/DeleteModal/index.tsx#DeleteModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Select/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Select});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg");const SELECT_SELECTED="selected",SELECT_DISABLED="disabled",SELECT_DEFAULT="default";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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

  z-index: ${theme.r.zIndex.select};
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
`,ScreenReaderDirection=styled_components_browser_esm.zo.p`
  position: absolute;
  left: -9999px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Select({selectedOption,optionList,handleOptionChange,isDisabled=!1,...rest}){const optionKeyList=Object.keys(optionList),[isOpen,setIsOpen]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(SelectedContainer,{onClick:()=>{isDisabled||setIsOpen((prev=>!prev))},$status:isDisabled?SELECT_DISABLED:isOpen?SELECT_SELECTED:SELECT_DEFAULT,...rest,children:[(0,jsx_runtime.jsx)("span",{children:selectedOption}),(0,jsx_runtime.jsx)(Image,{src:isOpen?chevron_up:chevron_down,alt:"",$isSelected:isOpen})]}),isOpen&&(0,jsx_runtime.jsx)(ScreenReaderDirection,{"aria-live":"polite",children:"이 요소를 닫으려면 한번 더 클릭해주세요."}),isOpen&&(0,jsx_runtime.jsx)(OptionListParent,{children:(0,jsx_runtime.jsx)(OptionListContainer,{children:optionKeyList.map((optionKey=>(0,jsx_runtime.jsx)(OptionContainer,{tabIndex:0,onClick:()=>(handleOptionChange(optionKey),void setIsOpen(!1)),children:optionList[optionKey]},optionKey)))})})]})}Select.displayName="Select";try{Select.displayName="Select",Select.__docgenInfo={description:"",displayName:"Select",props:{selectedOption:{defaultValue:null,description:"",name:"selectedOption",required:!0,type:{name:"string"}},optionList:{defaultValue:null,description:"",name:"optionList",required:!0,type:{name:"Record<T, string>"}},handleOptionChange:{defaultValue:null,description:"",name:"handleOptionChange",required:!0,type:{name:"(option: T) => void"}},isDisabled:{defaultValue:{value:"false"},description:"",name:"isDisabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Select/index.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/components/common/Select/index.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BORDER_THEME={fill:"var(--primary-color)",blank:"var(--primary-color)",gray:"#67727E"},TEXT_THEME={fill:"white",blank:"var(--primary-color)",gray:"white"},BACKGROUND_THEME={fill:"var(--primary-color)",blank:"white",gray:"#67727E"},Button=styled_components_browser_esm.zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{$theme:theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'},{value:'"gray"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/TwoButtonModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TwoButtonModal});var react=__webpack_require__("./node_modules/react/index.js"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TwoButtonModal({title,primaryButton,secondaryButton,children}){const BackDropRef=(0,react.useRef)(null),{text:primaryText,handleClick:primaryClick}=primaryButton,{text:secondaryText,handleClick:secondaryClick}=secondaryButton;return(0,react.useEffect)((()=>{const handler=e=>{e.target===BackDropRef.current&&secondaryClick()};return document.addEventListener("click",handler),()=>document.removeEventListener("click",handler)}),[BackDropRef,secondaryClick]),(0,jsx_runtime.jsx)(Container,{ref:BackDropRef,children:(0,jsx_runtime.jsxs)(ModalContainer,{children:[(0,jsx_runtime.jsx)(Title,{"aria-label":`제목: ${title}`,tabIndex:0,children:title}),children,(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:secondaryClick,theme:"gray",children:secondaryText})}),(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:primaryClick,theme:"fill",children:primaryText})})]})]})})}TwoButtonModal.displayName="TwoButtonModal";try{TwoButtonModal.displayName="TwoButtonModal",TwoButtonModal.__docgenInfo={description:"",displayName:"TwoButtonModal",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},primaryButton:{defaultValue:null,description:"",name:"primaryButton",required:!0,type:{name:"ButtonProps"}},secondaryButton:{defaultValue:null,description:"",name:"secondaryButton",required:!0,type:{name:"ButtonProps"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/TwoButtonModal/index.tsx#TwoButtonModal"]={docgenInfo:TwoButtonModal.__docgenInfo,name:"TwoButtonModal",path:"src/components/common/TwoButtonModal/index.tsx#TwoButtonModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useSelect.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>useSelect});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useSelect=initialOption=>{const[selectedOption,setSelectedOption]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOption);return{selectedOption,handleOptionChange:option=>{setSelectedOption(option)}}};try{useSelect.displayName="useSelect",useSelect.__docgenInfo={description:"",displayName:"useSelect",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useSelect.tsx#useSelect"]={docgenInfo:useSelect.__docgenInfo,name:"useSelect",path:"src/hooks/useSelect.tsx#useSelect"})}catch(__react_docgen_typescript_loader_error){}},"./src/pages/post/PostDetail/BottomButtonPart/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>BottomButtonPart});var react=__webpack_require__("./node_modules/react/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),DeleteModal=__webpack_require__("./src/components/common/DeleteModal/index.tsx"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),ReportModal=__webpack_require__("./src/components/ReportModal/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BottomButtonContainer=styled_components_browser_esm.zo.div`
  display: none;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: flex;
    width: 90%;
    height: 40px;
    margin-top: 40px;
    gap: 10px;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function BottomButtonPart({isWriter,isClosed,handleEvent:{movePage,controlPost,openToast}}){const{loggedInfo}=(0,react.useContext)(auth.V),{moveWritePostPage,moveVoteStatisticsPage}=movePage,{setEarlyClosePost,deletePost,reportPost,reportNickname}=controlPost,[action,setAction]=(0,react.useState)(null),handleActionButtonClick=action=>{loggedInfo.isLoggedIn?setAction(action):openToast("로그인 후에 기능을 이용해주세요.")},handleCancelClick=()=>{setAction(null)};return(0,jsx_runtime.jsxs)(BottomButtonContainer,{children:[isWriter?isClosed?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"게시글 통계보기",theme:"fill",onClick:moveVoteStatisticsPage,children:"통계보기"}),(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"게시글 삭제",theme:"fill",onClick:()=>handleActionButtonClick("DELETE"),children:"삭 제"})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"게시글 조기마감",theme:"fill",onClick:setEarlyClosePost,children:"조기마감"}),(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"게시글 수정",theme:"blank",onClick:moveWritePostPage,children:"수 정"}),(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"게시글 삭제",theme:"fill",onClick:()=>handleActionButtonClick("DELETE"),children:"삭 제"})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"fill",onClick:()=>handleActionButtonClick("POST_REPORT"),children:"게시물 신고"}),(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"fill",onClick:()=>handleActionButtonClick("NICKNAME_REPORT"),children:"작성자 닉네임 신고"})]}),"DELETE"===action&&(0,jsx_runtime.jsx)(DeleteModal.Z,{target:"POST",handleCancelClick,handleDeleteClick:deletePost}),"POST_REPORT"===action&&(0,jsx_runtime.jsx)(ReportModal.Z,{reportType:"POST",handleReportClick:reportPost,handleCancelClick}),"NICKNAME_REPORT"===action&&(0,jsx_runtime.jsx)(ReportModal.Z,{reportType:"NICKNAME",handleReportClick:reportNickname,handleCancelClick})]})}BottomButtonPart.displayName="BottomButtonPart";try{BottomButtonPart.displayName="BottomButtonPart",BottomButtonPart.__docgenInfo={description:"",displayName:"BottomButtonPart",props:{isWriter:{defaultValue:null,description:"",name:"isWriter",required:!0,type:{name:"boolean"}},isClosed:{defaultValue:null,description:"",name:"isClosed",required:!0,type:{name:"boolean"}},handleEvent:{defaultValue:null,description:"",name:"handleEvent",required:!0,type:{name:"{ movePage: Record<MovePageEvent, () => void>; controlPost: { setEarlyClosePost: () => void; deletePost: () => void; reportPost: (reason: string) => void; reportNickname: (reason: string) => void; }; openToast: (text: string) => void; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/post/PostDetail/BottomButtonPart/index.tsx#BottomButtonPart"]={docgenInfo:BottomButtonPart.__docgenInfo,name:"BottomButtonPart",path:"src/pages/post/PostDetail/BottomButtonPart/index.tsx#BottomButtonPart"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
//# sourceMappingURL=pages-post-PostDetail-BottomButtonPart-BottomButtonPart-stories.a25a2642.iframe.bundle.js.map