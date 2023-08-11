"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[1117],{"./src/pages/post/PostDetail/InnerHeaderPart/InnerHeaderPart.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__,isNotWriterAndIsClosedCase:()=>isNotWriterAndIsClosedCase,isNotWriterAndIsNotClosedCase:()=>isNotWriterAndIsNotClosedCase,isWriterAndIsClosedCase:()=>isWriterAndIsClosedCase,isWriterAndIsNotClosedCase:()=>isWriterAndIsNotClosedCase});var _components_common_NarrowTemplateHeader__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/NarrowTemplateHeader/index.tsx"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/pages/post/PostDetail/InnerHeaderPart/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const meta={component:___WEBPACK_IMPORTED_MODULE_1__.Z,decorators:[storyFn=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_common_NarrowTemplateHeader__WEBPACK_IMPORTED_MODULE_0__.Z,{children:storyFn()})]},handleEvent={movePage:{moveWritePostPage:()=>{},moveVoteStatisticsPage:()=>{},movePostListPage:()=>{}},controlPost:{setEarlyClosePost:()=>{},deletePost:()=>{},reportPost:reason=>{},reportNickname:reason=>{}}},__WEBPACK_DEFAULT_EXPORT__=meta,isWriterAndIsClosedCase={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{isWriter:!0,isClosed:!0,handleEvent})},isNotWriterAndIsClosedCase={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{isWriter:!1,isClosed:!0,handleEvent})},isWriterAndIsNotClosedCase={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{isWriter:!0,isClosed:!1,handleEvent})},isNotWriterAndIsNotClosedCase={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{isWriter:!1,isClosed:!1,handleEvent})};isWriterAndIsClosedCase.parameters={...isWriterAndIsClosedCase.parameters,docs:{...isWriterAndIsClosedCase.parameters?.docs,source:{originalSource:"{\n  render: () => <InnerHeaderPart isWriter={true} isClosed={true} handleEvent={handleEvent} />\n}",...isWriterAndIsClosedCase.parameters?.docs?.source}}},isNotWriterAndIsClosedCase.parameters={...isNotWriterAndIsClosedCase.parameters,docs:{...isNotWriterAndIsClosedCase.parameters?.docs,source:{originalSource:"{\n  render: () => <InnerHeaderPart isWriter={false} isClosed={true} handleEvent={handleEvent} />\n}",...isNotWriterAndIsClosedCase.parameters?.docs?.source}}},isWriterAndIsNotClosedCase.parameters={...isWriterAndIsNotClosedCase.parameters,docs:{...isWriterAndIsNotClosedCase.parameters?.docs,source:{originalSource:"{\n  render: () => <InnerHeaderPart isWriter={true} isClosed={false} handleEvent={handleEvent} />\n}",...isWriterAndIsNotClosedCase.parameters?.docs?.source}}},isNotWriterAndIsNotClosedCase.parameters={...isNotWriterAndIsNotClosedCase.parameters,docs:{...isNotWriterAndIsNotClosedCase.parameters?.docs,source:{originalSource:"{\n  render: () => <InnerHeaderPart isWriter={false} isClosed={false} handleEvent={handleEvent} />\n}",...isNotWriterAndIsNotClosedCase.parameters?.docs?.source}}};const __namedExportsOrder=["isWriterAndIsClosedCase","isNotWriterAndIsClosedCase","isWriterAndIsNotClosedCase","isNotWriterAndIsNotClosedCase"]},"./src/components/ReportModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ReportModal});var useSelect=__webpack_require__("./src/hooks/useSelect.tsx"),Select=__webpack_require__("./src/components/common/Select/index.tsx"),TwoButtonModal=__webpack_require__("./src/components/common/TwoButtonModal/index.tsx");const REPORT_MESSAGE={BEHAVIOR:"부적절한 언행/혐오/차별적 표현이 포함되어있습니다.",SPAMMING:"도배성 내용이 포함되어있습니다.",ADVERTISING:"광고성 내용이 포함되어있습니다.",SENSUALITY:"음란성 내용이 포함되어 있습니다.",SPECIFIC_PERSON:"특정인이 거론되어있습니다.",PRIVACY:"개인정보가 포함되어있습니다."},REPORT_TYPE={POST:{name:"게시글 신고",reportMessageList:REPORT_MESSAGE},COMMENT:{name:"댓글 신고",reportMessageList:REPORT_MESSAGE},NICKNAME:{name:"닉네임 신고",reportMessageList:REPORT_MESSAGE}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ReportModal({reportType,handleCancelClick,handleReportClick}){const{name,reportMessageList}=REPORT_TYPE[reportType],defaultReportMessage=Object.keys(reportMessageList)[0],{selectedOption,handleOptionChange}=(0,useSelect.L)(defaultReportMessage);return(0,jsx_runtime.jsx)(TwoButtonModal.Z,{title:name,primaryButton:{text:"신고",handleClick:()=>{handleReportClick(selectedOption),handleCancelClick()}},secondaryButton:{text:"취소",handleClick:handleCancelClick},children:(0,jsx_runtime.jsx)(Select.Z,{"aria-label":`${name} 방법 선택`,optionList:reportMessageList,handleOptionChange,selectedOption:reportMessageList[selectedOption]})})}ReportModal.displayName="ReportModal";try{ReportModal.displayName="ReportModal",ReportModal.__docgenInfo={description:"",displayName:"ReportModal",props:{reportType:{defaultValue:null,description:"",name:"reportType",required:!0,type:{name:"enum",value:[{value:'"POST"'},{value:'"COMMENT"'},{value:'"NICKNAME"'}]}},handleCancelClick:{defaultValue:null,description:"",name:"handleCancelClick",required:!0,type:{name:"() => void"}},handleReportClick:{defaultValue:null,description:"",name:"handleReportClick",required:!0,type:{name:"(reason: string) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ReportModal/index.tsx#ReportModal"]={docgenInfo:ReportModal.__docgenInfo,name:"ReportModal",path:"src/components/ReportModal/index.tsx#ReportModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/DeleteModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>DeleteModal});var TwoButtonModal=__webpack_require__("./src/components/common/TwoButtonModal/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Description=styled_components_browser_esm.zo.p`
  color: #67727e;

  font: var(--text-caption);
  white-space: pre-wrap;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TARGET_FOR_DELETE={MEMBERSHIP:"계정을",POST:"게시글을",COMMENT:"댓글을"};function DeleteModal({target,handleCancelClick,handleDeleteClick}){return(0,jsx_runtime.jsx)(TwoButtonModal.Z,{title:`${TARGET_FOR_DELETE[target]} 삭제하기`,primaryButton:{text:"삭제",handleClick:()=>{handleDeleteClick(),handleCancelClick()}},secondaryButton:{text:"취소",handleClick:handleCancelClick},children:(0,jsx_runtime.jsx)(Description,{children:`${TARGET_FOR_DELETE[target]} 삭제하시겠습니까?\n${TARGET_FOR_DELETE[target]} 삭제하면 취소할 수 없습니다.`})})}DeleteModal.displayName="DeleteModal";try{DeleteModal.displayName="DeleteModal",DeleteModal.__docgenInfo={description:"",displayName:"DeleteModal",props:{target:{defaultValue:null,description:"",name:"target",required:!0,type:{name:"enum",value:[{value:'"MEMBERSHIP"'},{value:'"POST"'},{value:'"COMMENT"'}]}},handleCancelClick:{defaultValue:null,description:"",name:"handleCancelClick",required:!0,type:{name:"() => void"}},handleDeleteClick:{defaultValue:null,description:"",name:"handleDeleteClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/DeleteModal/index.tsx#DeleteModal"]={docgenInfo:DeleteModal.__docgenInfo,name:"DeleteModal",path:"src/components/common/DeleteModal/index.tsx#DeleteModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/HeaderTextButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>HeaderTextButton});const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  background-color: rgba(0, 0, 0, 0);
  color: var(--white);

  font: var(--text-caption);
  font-weight: 500;

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function HeaderTextButton({children,...rest}){return(0,jsx_runtime.jsx)(Button,{...rest,children})}HeaderTextButton.displayName="HeaderTextButton";try{HeaderTextButton.displayName="HeaderTextButton",HeaderTextButton.__docgenInfo={description:"",displayName:"HeaderTextButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/HeaderTextButton/index.tsx#HeaderTextButton"]={docgenInfo:HeaderTextButton.__docgenInfo,name:"HeaderTextButton",path:"src/components/common/HeaderTextButton/index.tsx#HeaderTextButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/IconButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>IconButton});const back_namespaceObject=__webpack_require__.p+"static/media/back.0d0cf282.svg",category_namespaceObject=__webpack_require__.p+"static/media/category.5dbd06d6.svg",search_white_namespaceObject=__webpack_require__.p+"static/media/search_white.74caf850.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  background-color: rgba(0, 0, 0, 0);

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ICON_CATEGORY={category:{name:"카테고리",url:category_namespaceObject},back:{name:"뒤로가기",url:back_namespaceObject},search:{name:"검색",url:search_white_namespaceObject}};function IconButton({category,...rest}){const src=ICON_CATEGORY[category].url,ariaLabelText=ICON_CATEGORY[category].name;return(0,jsx_runtime.jsx)(Button,{"aria-label":ariaLabelText,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:`${ariaLabelText} 버튼`})})}IconButton.displayName="IconButton";try{IconButton.displayName="IconButton",IconButton.__docgenInfo={description:"",displayName:"IconButton",props:{category:{defaultValue:null,description:"",name:"category",required:!0,type:{name:"enum",value:[{value:'"search"'},{value:'"category"'},{value:'"back"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/IconButton/index.tsx#IconButton"]={docgenInfo:IconButton.__docgenInfo,name:"IconButton",path:"src/components/common/IconButton/index.tsx#IconButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/NarrowTemplateHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>NarrowTemplateHeader});const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
  height: 55px;
  padding: 0 20px;

  position: fixed;
  top: 0;

  background-color: var(--header);
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function NarrowTemplateHeader({children}){return(0,jsx_runtime.jsx)(Container,{children})}NarrowTemplateHeader.displayName="NarrowTemplateHeader";try{NarrowTemplateHeader.displayName="NarrowTemplateHeader",NarrowTemplateHeader.__docgenInfo={description:"",displayName:"NarrowTemplateHeader",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"]={docgenInfo:NarrowTemplateHeader.__docgenInfo,name:"NarrowTemplateHeader",path:"src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/PostMenu/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PostMenu});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const COLOR_PALETTE={red:"var(--primary-color)",black:"#727171"},Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: max-content;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 6px;

  font: var(--text-caption);
`,Menu=styled_components_browser_esm.zo.button`
  padding: 10px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);

  color: ${({$color})=>COLOR_PALETTE[$color]};
  background-color: white;

  cursor: pointer;

  &:hover {
    background-color: var(--gray);
  }

  &:first-child {
    border-radius: 6px 6px 0 0;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
    border-bottom: none;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function PostMenu({menuList,handleMenuClick}){return(0,jsx_runtime.jsx)(Container,{children:menuList.map((({content,color,action})=>(0,jsx_runtime.jsx)(Menu,{type:"button",$color:color,onClick:event=>{event.stopPropagation(),handleMenuClick(action)},children:content},content)))})}PostMenu.displayName="PostMenu";try{PostMenu.displayName="PostMenu",PostMenu.__docgenInfo={description:"",displayName:"PostMenu",props:{menuList:{defaultValue:null,description:"",name:"menuList",required:!0,type:{name:"PostMenuItem[]"}},handleMenuClick:{defaultValue:null,description:"",name:"handleMenuClick",required:!0,type:{name:"(menu: PostAction) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/PostMenu/index.tsx#PostMenu"]={docgenInfo:PostMenu.__docgenInfo,name:"PostMenu",path:"src/components/common/PostMenu/index.tsx#PostMenu"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Select/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Select});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg");const SELECT_SELECTED="selected",SELECT_DISABLED="disabled",SELECT_DEFAULT="default";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{$theme:theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'},{value:'"gray"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/TagButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TagButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:{width:"80px",height:"40px",fontSize:"14px"},md:{width:"100px",height:"50px",fontSize:"20px"},lg:{width:"120px",height:"60px",fontSize:"24px"}},Button=styled_components_browser_esm.zo.button`
  display: block;

  width: ${props=>SIZE[props.$size].width};
  height: ${props=>SIZE[props.$size].height};
  border-radius: 0 0 5px 5px;

  background-color: var(--primary-color);
  color: var(--white);

  font-size: ${props=>SIZE[props.$size].fontSize};

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TagButton({size,...rest}){return(0,jsx_runtime.jsx)(Button,{$size:size,...rest,children:rest.children})}TagButton.displayName="TagButton";try{TagButton.displayName="TagButton",TagButton.__docgenInfo={description:"",displayName:"TagButton",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/TagButton/index.tsx#TagButton"]={docgenInfo:TagButton.__docgenInfo,name:"TagButton",path:"src/components/common/TagButton/index.tsx#TagButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/TwoButtonModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TwoButtonModal});var SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TwoButtonModal({title,primaryButton,secondaryButton,children}){const{text:primaryText,handleClick:primaryClick}=primaryButton,{text:secondaryText,handleClick:secondaryClick}=secondaryButton;return(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsxs)(ModalContainer,{children:[(0,jsx_runtime.jsx)(Title,{children:title}),children,(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:secondaryClick,theme:"gray",children:secondaryText})}),(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:primaryClick,theme:"fill",children:primaryText})})]})]})})}TwoButtonModal.displayName="TwoButtonModal";try{TwoButtonModal.displayName="TwoButtonModal",TwoButtonModal.__docgenInfo={description:"",displayName:"TwoButtonModal",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},primaryButton:{defaultValue:null,description:"",name:"primaryButton",required:!0,type:{name:"ButtonProps"}},secondaryButton:{defaultValue:null,description:"",name:"secondaryButton",required:!0,type:{name:"ButtonProps"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/TwoButtonModal/index.tsx#TwoButtonModal"]={docgenInfo:TwoButtonModal.__docgenInfo,name:"TwoButtonModal",path:"src/components/common/TwoButtonModal/index.tsx#TwoButtonModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useSelect.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>useSelect});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useSelect=initialOption=>{const[selectedOption,setSelectedOption]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOption);return{selectedOption,handleOptionChange:option=>{setSelectedOption(option)}}};try{useSelect.displayName="useSelect",useSelect.__docgenInfo={description:"",displayName:"useSelect",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useSelect.tsx#useSelect"]={docgenInfo:useSelect.__docgenInfo,name:"useSelect",path:"src/hooks/useSelect.tsx#useSelect"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useToggle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>useToggle});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useToggle=()=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return{isOpen,openComponent:()=>{setIsOpen(!0)},closeComponent:()=>{setIsOpen(!1)},toggleComponent:()=>{setIsOpen((prevIsOpen=>!prevIsOpen))}}}},"./src/pages/post/PostDetail/InnerHeaderPart/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>InnerHeaderPart});var react=__webpack_require__("./node_modules/react/index.js"),useToggle=__webpack_require__("./src/hooks/useToggle.tsx"),DeleteModal=__webpack_require__("./src/components/common/DeleteModal/index.tsx"),HeaderTextButton=__webpack_require__("./src/components/common/HeaderTextButton/index.tsx"),IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),PostMenu=__webpack_require__("./src/components/common/PostMenu/index.tsx"),TagButton=__webpack_require__("./src/components/common/TagButton/index.tsx"),ReportModal=__webpack_require__("./src/components/ReportModal/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const HeaderWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  gap: 30px;
`,TagButtonWrapper=styled_components_browser_esm.zo.div`
  margin-right: 10px;

  position: absolute;
  top: 55px;
  right: 10px;
`,MenuWrapper=styled_components_browser_esm.zo.div`
  margin-right: 10px;

  position: absolute;
  top: 45px;
  right: 10px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const menuList=[{color:"black",content:"닉네임 신고",action:"NICKNAME_REPORT"},{color:"black",content:"게시글 신고",action:"POST_REPORT"}];function InnerHeaderPart({isWriter,isClosed,handleEvent:{movePage,controlPost}}){const{moveWritePostPage,moveVoteStatisticsPage,movePostListPage}=movePage,{setEarlyClosePost,deletePost,reportPost,reportNickname}=controlPost,{isOpen,toggleComponent,closeComponent}=(0,useToggle.O)(),[action,setAction]=(0,react.useState)(null),handleMenuClick=action=>{closeComponent(),setAction(action)},handleCancelClick=()=>{setAction(null)};return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(IconButton.Z,{category:"back",onClick:movePostListPage}),(0,jsx_runtime.jsxs)(HeaderWrapper,{children:[isWriter?isClosed?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(HeaderTextButton.Z,{onClick:()=>handleMenuClick("DELETE"),children:"삭제"}),(0,jsx_runtime.jsx)(TagButtonWrapper,{children:(0,jsx_runtime.jsx)(TagButton.Z,{size:"sm",onClick:moveVoteStatisticsPage,children:"통계보기"})})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(HeaderTextButton.Z,{onClick:moveWritePostPage,children:"수정"}),(0,jsx_runtime.jsx)(HeaderTextButton.Z,{onClick:()=>handleMenuClick("DELETE"),children:"삭제"}),(0,jsx_runtime.jsx)(TagButtonWrapper,{children:(0,jsx_runtime.jsx)(TagButton.Z,{size:"sm",onClick:setEarlyClosePost,children:"조기마감"})})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(HeaderTextButton.Z,{onClick:toggleComponent,children:"신고"}),isOpen&&(0,jsx_runtime.jsx)(MenuWrapper,{children:(0,jsx_runtime.jsx)(PostMenu.Z,{menuList,handleMenuClick})})]}),"DELETE"===action&&(0,jsx_runtime.jsx)(DeleteModal.Z,{target:"POST",handleCancelClick,handleDeleteClick:deletePost}),"POST_REPORT"===action&&(0,jsx_runtime.jsx)(ReportModal.Z,{reportType:"POST",handleReportClick:reportPost,handleCancelClick}),"NICKNAME_REPORT"===action&&(0,jsx_runtime.jsx)(ReportModal.Z,{reportType:"NICKNAME",handleReportClick:reportNickname,handleCancelClick})]})]})}try{InnerHeaderPart.displayName="InnerHeaderPart",InnerHeaderPart.__docgenInfo={description:"",displayName:"InnerHeaderPart",props:{isWriter:{defaultValue:null,description:"",name:"isWriter",required:!0,type:{name:"boolean"}},isClosed:{defaultValue:null,description:"",name:"isClosed",required:!0,type:{name:"boolean"}},handleEvent:{defaultValue:null,description:"",name:"handleEvent",required:!0,type:{name:"{ movePage: Record<MovePageEvent, () => void>; controlPost: { setEarlyClosePost: () => void; deletePost: () => void; reportPost: (reason: string) => void; reportNickname: (reason: string) => void; }; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/post/PostDetail/InnerHeaderPart/index.tsx#InnerHeaderPart"]={docgenInfo:InnerHeaderPart.__docgenInfo,name:"InnerHeaderPart",path:"src/pages/post/PostDetail/InnerHeaderPart/index.tsx#InnerHeaderPart"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
//# sourceMappingURL=pages-post-PostDetail-InnerHeaderPart-InnerHeaderPart-stories.d4ede77e.iframe.bundle.js.map