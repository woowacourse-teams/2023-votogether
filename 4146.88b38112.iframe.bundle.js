"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[4146],{"./src/api/report.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>reportContent});var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/fetch.ts");const reportContent=async reportData=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.ZL)("/report",reportData)},"./src/components/ReportModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ReportModal});var useSelect=__webpack_require__("./src/hooks/useSelect.tsx"),Select=__webpack_require__("./src/components/common/Select/index.tsx"),TwoButtonModal=__webpack_require__("./src/components/common/TwoButtonModal/index.tsx");const REPORT_MESSAGE={BEHAVIOR:"부적절한 언행/혐오/차별적 표현이 포함되어있습니다.",SPAMMING:"도배성 내용이 포함되어있습니다.",ADVERTISING:"광고성 내용이 포함되어있습니다.",SENSUALITY:"음란성 내용이 포함되어 있습니다.",SPECIFIC_PERSON:"특정인이 거론되어있습니다.",PRIVACY:"개인정보가 포함되어있습니다."},REPORT_TYPE={POST:{name:"게시글 신고",reportMessageList:REPORT_MESSAGE},COMMENT:{name:"댓글 신고",reportMessageList:REPORT_MESSAGE},NICKNAME:{name:"닉네임 신고",reportMessageList:REPORT_MESSAGE}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ReportModal({reportType,handleCancelClick,handleReportClick}){const{name,reportMessageList}=REPORT_TYPE[reportType],defaultReportMessage=Object.keys(reportMessageList)[0],{selectedOption,handleOptionChange}=(0,useSelect.L)(defaultReportMessage);return(0,jsx_runtime.jsx)(TwoButtonModal.Z,{title:name,primaryButton:{text:"신고",handleClick:()=>{handleReportClick(selectedOption),handleCancelClick()}},secondaryButton:{text:"취소",handleClick:handleCancelClick},children:(0,jsx_runtime.jsx)(Select.Z,{"aria-label":`${name} 방법 선택`,optionList:reportMessageList,handleOptionChange,selectedOption:reportMessageList[selectedOption]})})}ReportModal.displayName="ReportModal";try{ReportModal.displayName="ReportModal",ReportModal.__docgenInfo={description:"",displayName:"ReportModal",props:{reportType:{defaultValue:null,description:"",name:"reportType",required:!0,type:{name:"enum",value:[{value:'"POST"'},{value:'"COMMENT"'},{value:'"NICKNAME"'}]}},handleCancelClick:{defaultValue:null,description:"",name:"handleCancelClick",required:!0,type:{name:"() => void"}},handleReportClick:{defaultValue:null,description:"",name:"handleReportClick",required:!0,type:{name:"(reason: string) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ReportModal/index.tsx#ReportModal"]={docgenInfo:ReportModal.__docgenInfo,name:"ReportModal",path:"src/components/ReportModal/index.tsx#ReportModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/comment/CommentList/CommentItem/CommentMenu/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentMenu});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const COLOR_PALETTE={red:"var(--primary-color)",black:"#727171"},Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: max-content;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 6px;

  background-color: var(--white);

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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentMenu({menuList,handleMenuClick}){return(0,jsx_runtime.jsx)(Container,{children:menuList.map((({content,color,action})=>(0,jsx_runtime.jsx)(Menu,{type:"button",$color:color,onClick:event=>{event.stopPropagation(),handleMenuClick(action)},children:content},content)))})}CommentMenu.displayName="CommentMenu";try{CommentMenu.displayName="CommentMenu",CommentMenu.__docgenInfo={description:"",displayName:"CommentMenu",props:{menuList:{defaultValue:null,description:"",name:"menuList",required:!0,type:{name:"CommentMenuItem[]"}},handleMenuClick:{defaultValue:null,description:"",name:"handleMenuClick",required:!0,type:{name:"(menu: CommentAction) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentList/CommentItem/CommentMenu/index.tsx#CommentMenu"]={docgenInfo:CommentMenu.__docgenInfo,name:"CommentMenu",path:"src/components/comment/CommentList/CommentItem/CommentMenu/index.tsx#CommentMenu"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/comment/CommentList/CommentItem/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentItem});var react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),comment=__webpack_require__("./src/api/comment.ts"),queryKey=__webpack_require__("./src/constants/queryKey.ts");const useDeleteComment=(postId,commentId)=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isLoading,isError,error}=(0,useMutation.D)((()=>(0,comment.YF)(postId,commentId)),{onSuccess:()=>{queryClient.invalidateQueries([queryKey.l.POSTS,postId,queryKey.l.COMMENTS])},onError:error=>{window.console.log("Delete Comment error",error)}});return{mutate,isLoading,isError,error}};var useToast=__webpack_require__("./src/hooks/useToast.ts"),useToggle=__webpack_require__("./src/hooks/useToggle.tsx"),report=__webpack_require__("./src/api/report.ts"),CommentTextForm=__webpack_require__("./src/components/comment/CommentList/CommentTextForm/index.tsx"),DeleteModal=__webpack_require__("./src/components/common/DeleteModal/index.tsx"),Toast=__webpack_require__("./src/components/common/Toast/index.tsx"),ReportModal=__webpack_require__("./src/components/ReportModal/index.tsx");const ellipsis_horizontal_namespaceObject=__webpack_require__.p+"static/media/ellipsis-horizontal.194e7173.svg";var constants=__webpack_require__("./src/components/comment/CommentList/constants.ts"),CommentMenu=__webpack_require__("./src/components/comment/CommentList/CommentItem/CommentMenu/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  font: var(--text-caption);

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`,Header=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 24px;
  margin-bottom: 7px;
`,Title=styled_components_browser_esm.zo.span`
  font-weight: 500;
`,UserContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: end;
`,SubTitleContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;

  margin-left: 15px;
`,SubTitle=styled_components_browser_esm.zo.span`
  font: var(--text-small);
  font-weight: 400;

  color: var(--dark-gray);

  &:nth-child(2) {
    margin-left: 6px;
  }

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-caption);
  }
`,MenuWrapper=styled_components_browser_esm.zo.div`
  position: absolute;
  right: 0%;
`,Description=styled_components_browser_esm.zo.p`
  font-weight: 400;
  line-height: 24px;

  white-space: pre-wrap;
`,MenuContainer=styled_components_browser_esm.zo.div`
  width: 24px;
  position: relative;

  color: #888;

  cursor: pointer;
`,TextFormWrapper=styled_components_browser_esm.zo.div`
  margin-top: 12px;
`,Image=styled_components_browser_esm.zo.img`
  width: 100%;
  height: 100%;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentItem({comment,userType}){const{isOpen,toggleComponent,closeComponent}=(0,useToggle.O)(),{isToastOpen,openToast,toastMessage}=(0,useToast.p)(),{id,member,content,createdAt,isEdit}=comment,[action,setAction]=(0,react.useState)(null),params=(0,dist.UO)(),postId=Number(params.postId),{mutate,isError,error}=useDeleteComment(postId,id),handleCancelClick=()=>{setAction(null)};(0,react.useEffect)((()=>{if(isError&&error instanceof Error){const errorResponse=JSON.parse(error.message);openToast(errorResponse.message)}else;}),[isError,error]);const USER_TYPE=constants.PB[userType],isAllowedMenu=userType!==constants.GD.GUEST&&action!==constants._d.EDIT;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(Header,{children:[(0,jsx_runtime.jsxs)(UserContainer,{children:[(0,jsx_runtime.jsx)(Title,{children:member.nickname}),(0,jsx_runtime.jsxs)(SubTitleContainer,{children:[(0,jsx_runtime.jsx)(SubTitle,{children:createdAt}),isEdit&&(0,jsx_runtime.jsx)(SubTitle,{children:"(수정됨)"})]})]}),isAllowedMenu&&(0,jsx_runtime.jsxs)(MenuContainer,{"aria-label":"댓글 메뉴",onClick:toggleComponent,children:[(0,jsx_runtime.jsx)(Image,{src:ellipsis_horizontal_namespaceObject}),isOpen&&(0,jsx_runtime.jsx)(MenuWrapper,{children:(0,jsx_runtime.jsx)(CommentMenu.Z,{handleMenuClick:menu=>{closeComponent(),setAction(menu)},menuList:constants.H4[USER_TYPE]})})]})]}),action===constants._d.EDIT?(0,jsx_runtime.jsx)(TextFormWrapper,{children:(0,jsx_runtime.jsx)(CommentTextForm.Z,{commentId:id,initialComment:comment,handleCancelClick})}):(0,jsx_runtime.jsx)(Description,{children:content}),action===constants._d.DELETE&&(0,jsx_runtime.jsx)(DeleteModal.Z,{target:"COMMENT",handleCancelClick,handleDeleteClick:()=>{mutate()}}),action===constants._d.USER_REPORT&&(0,jsx_runtime.jsx)(ReportModal.Z,{reportType:"NICKNAME",handleReportClick:async reason=>{const reportData={type:"NICKNAME",id:member.id,reason};await(0,report.K)(reportData).then((res=>{openToast("작성자 닉네임을 신고했습니다.")})).catch((e=>{openToast(e instanceof Error?e.message:"작성자 닉네임 신고가 실패했습니다.")}))},handleCancelClick}),action===constants._d.COMMENT_REPORT&&(0,jsx_runtime.jsx)(ReportModal.Z,{reportType:"COMMENT",handleReportClick:async reason=>{const reportData={type:"COMMENT",id,reason};await(0,report.K)(reportData).then((res=>{openToast("댓글을 신고했습니다.")})).catch((e=>{openToast(e instanceof Error?e.message:"댓글 신고가 실패했습니다")}))},handleCancelClick}),isToastOpen&&(0,jsx_runtime.jsx)(Toast.Z,{size:"md",position:"bottom",children:toastMessage})]})}CommentItem.displayName="CommentItem";try{CommentItem.displayName="CommentItem",CommentItem.__docgenInfo={description:"",displayName:"CommentItem",props:{comment:{defaultValue:null,description:"",name:"comment",required:!0,type:{name:"Comment"}},userType:{defaultValue:null,description:"",name:"userType",required:!0,type:{name:"enum",value:[{value:'"GUEST"'},{value:'"NOT_WRITER"'},{value:'"WRITER"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentList/CommentItem/index.tsx#CommentItem"]={docgenInfo:CommentItem.__docgenInfo,name:"CommentItem",path:"src/components/comment/CommentList/CommentItem/index.tsx#CommentItem"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/comment/CommentList/CommentTextForm/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentTextForm});var react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),comment=__webpack_require__("./src/api/comment.ts"),queryKey=__webpack_require__("./src/constants/queryKey.ts");const useCreateComment=postId=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isSuccess,isLoading,isError,error}=(0,useMutation.D)((newComment=>(0,comment.Yr)(postId,newComment)),{onSuccess:()=>{queryClient.invalidateQueries([queryKey.l.POSTS,postId,queryKey.l.COMMENTS])},onError:error=>{window.console.log("createComment error",error)}});return{mutate,isSuccess,isLoading,isError,error}},useEditComment=(postId,commentId)=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isSuccess,isLoading,isError,error}=(0,useMutation.D)((updatedComment=>(0,comment.DF)(postId,commentId,updatedComment)),{onSuccess:()=>{queryClient.invalidateQueries([queryKey.l.POSTS,postId,queryKey.l.COMMENTS])},onError:error=>{window.console.log("댓글 수정에 실패했습니다. 다시 시도해주세요.",error)}});return{mutate,isSuccess,isLoading,isError,error}};var useText=__webpack_require__("./src/hooks/useText.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),Toast=__webpack_require__("./src/components/common/Toast/index.tsx");const COMMENT={MAX_LENGTH:200,MIN_LENGTH:1};var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentTextForm({commentId,initialComment,handleCancelClick}){const{text:content,handleTextChange,resetText}=(0,useText.X)(initialComment.content),{isToastOpen,openToast,toastMessage}=(0,useToast.p)(),params=(0,dist.UO)(),postId=Number(params.postId),{mutate:createComment,isSuccess:isCreateSuccess,isError:isCreateError,error:createError}=useCreateComment(postId),{mutate:editComment,isSuccess:isEditSuccess,isError:isEditError,error:editError}=useEditComment(postId,commentId),updateComment=-1!==initialComment.id?()=>{editComment({...initialComment,content})}:()=>{createComment({content})};return(0,react.useEffect)((()=>{isCreateSuccess&&resetText()}),[isCreateSuccess]),(0,react.useEffect)((()=>{isEditSuccess&&handleCancelClick&&handleCancelClick()}),[isEditSuccess]),(0,react.useEffect)((()=>{isCreateError&&createError instanceof Error&&openToast(createError.message)}),[isCreateError,createError]),(0,react.useEffect)((()=>{isEditError&&editError instanceof Error&&openToast(editError.message)}),[isEditError,editError,openToast]),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(TextArea,{value:content,onChange:e=>handleTextChange(e,COMMENT)}),(0,jsx_runtime.jsxs)(ButtonContainer,{children:[handleCancelClick&&(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:handleCancelClick,theme:"gray",type:"button",children:"취소"})}),(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:()=>updateComment(),theme:"blank",type:"button",children:"저장"})})]}),isToastOpen&&(0,jsx_runtime.jsx)(Toast.Z,{size:"md",position:"bottom",children:toastMessage})]})}CommentTextForm.displayName="CommentTextForm";try{CommentTextForm.displayName="CommentTextForm",CommentTextForm.__docgenInfo={description:"",displayName:"CommentTextForm",props:{commentId:{defaultValue:null,description:"",name:"commentId",required:!0,type:{name:"number"}},initialComment:{defaultValue:null,description:"",name:"initialComment",required:!0,type:{name:"Comment"}},handleCancelClick:{defaultValue:null,description:"",name:"handleCancelClick",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentList/CommentTextForm/index.tsx#CommentTextForm"]={docgenInfo:CommentTextForm.__docgenInfo,name:"CommentTextForm",path:"src/components/comment/CommentList/CommentTextForm/index.tsx#CommentTextForm"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/comment/CommentList/constants.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{GD:()=>COMMENT_USER,H4:()=>COMMENT_MENU,PB:()=>COMMENT_USER_MENU,_d:()=>COMMENT_ACTION});const COMMENT_USER={GUEST:"GUEST",NOT_WRITER:"NOT_WRITER",WRITER:"WRITER"},COMMENT_ACTION={DELETE:"delete",USER_REPORT:"userReport",COMMENT_REPORT:"commentReport",EDIT:"edit"},COMMENT_USER_MENU={[COMMENT_USER.GUEST]:COMMENT_USER.NOT_WRITER,[COMMENT_USER.NOT_WRITER]:COMMENT_USER.NOT_WRITER,[COMMENT_USER.WRITER]:COMMENT_USER.WRITER},COMMENT_MENU={[COMMENT_USER.NOT_WRITER]:[{color:"black",content:"닉네임 신고",action:COMMENT_ACTION.USER_REPORT},{color:"black",content:"댓글 신고",action:COMMENT_ACTION.COMMENT_REPORT}],[COMMENT_USER.WRITER]:[{content:"수정",color:"black",action:COMMENT_ACTION.EDIT},{content:"삭제",color:"red",action:COMMENT_ACTION.DELETE}]}},"./src/components/common/DeleteModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>DeleteModal});var TwoButtonModal=__webpack_require__("./src/components/common/TwoButtonModal/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Description=styled_components_browser_esm.zo.p`
  color: #67727e;

  font: var(--text-caption);
  white-space: pre-wrap;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TARGET_FOR_DELETE={MEMBERSHIP:"계정을",POST:"게시글을",COMMENT:"댓글을"};function DeleteModal({target,handleCancelClick,handleDeleteClick}){return(0,jsx_runtime.jsx)(TwoButtonModal.Z,{title:`${TARGET_FOR_DELETE[target]} 삭제하기`,primaryButton:{text:"삭제",handleClick:()=>{handleDeleteClick(),handleCancelClick()}},secondaryButton:{text:"취소",handleClick:handleCancelClick},children:(0,jsx_runtime.jsx)(Description,{children:`${TARGET_FOR_DELETE[target]} 삭제하시겠습니까?\n${TARGET_FOR_DELETE[target]} 삭제하면 취소할 수 없습니다.`})})}DeleteModal.displayName="DeleteModal";try{DeleteModal.displayName="DeleteModal",DeleteModal.__docgenInfo={description:"",displayName:"DeleteModal",props:{target:{defaultValue:null,description:"",name:"target",required:!0,type:{name:"enum",value:[{value:'"MEMBERSHIP"'},{value:'"POST"'},{value:'"COMMENT"'}]}},handleCancelClick:{defaultValue:null,description:"",name:"handleCancelClick",required:!0,type:{name:"() => void"}},handleDeleteClick:{defaultValue:null,description:"",name:"handleDeleteClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/DeleteModal/index.tsx#DeleteModal"]={docgenInfo:DeleteModal.__docgenInfo,name:"DeleteModal",path:"src/components/common/DeleteModal/index.tsx#DeleteModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Select/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Select});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg");const SELECT_SELECTED="selected",SELECT_DISABLED="disabled",SELECT_DEFAULT="default";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Select({selectedOption,optionList,handleOptionChange,isDisabled=!1,...rest}){const optionKeyList=Object.keys(optionList),[isOpen,setIsOpen]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(SelectedContainer,{onClick:()=>{isDisabled||setIsOpen((prev=>!prev))},$status:isDisabled?SELECT_DISABLED:isOpen?SELECT_SELECTED:SELECT_DEFAULT,...rest,children:[(0,jsx_runtime.jsx)("span",{children:selectedOption}),(0,jsx_runtime.jsx)(Image,{src:isOpen?chevron_up:chevron_down,alt:"",$isSelected:isOpen})]}),isOpen&&(0,jsx_runtime.jsx)(OptionListParent,{children:(0,jsx_runtime.jsx)(OptionListContainer,{children:optionKeyList.map((optionKey=>(0,jsx_runtime.jsx)(OptionContainer,{onClick:()=>(handleOptionChange(optionKey),void setIsOpen(!1)),children:optionList[optionKey]},optionKey)))})})]})}Select.displayName="Select";try{Select.displayName="Select",Select.__docgenInfo={description:"",displayName:"Select",props:{selectedOption:{defaultValue:null,description:"",name:"selectedOption",required:!0,type:{name:"string"}},optionList:{defaultValue:null,description:"",name:"optionList",required:!0,type:{name:"Record<T, string>"}},handleOptionChange:{defaultValue:null,description:"",name:"handleOptionChange",required:!0,type:{name:"(option: T) => void"}},isDisabled:{defaultValue:{value:"false"},description:"",name:"isDisabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Select/index.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/components/common/Select/index.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/TwoButtonModal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TwoButtonModal});var react=__webpack_require__("./node_modules/react/index.js"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TwoButtonModal({title,primaryButton,secondaryButton,children}){const BackDropRef=(0,react.useRef)(null),{text:primaryText,handleClick:primaryClick}=primaryButton,{text:secondaryText,handleClick:secondaryClick}=secondaryButton;return(0,react.useEffect)((()=>{const handler=e=>{e.target===BackDropRef.current&&secondaryClick()};return document.addEventListener("click",handler),()=>document.removeEventListener("click",handler)}),[BackDropRef,secondaryClick]),(0,jsx_runtime.jsx)(Container,{ref:BackDropRef,children:(0,jsx_runtime.jsxs)(ModalContainer,{children:[(0,jsx_runtime.jsx)(Title,{children:title}),children,(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:secondaryClick,theme:"gray",children:secondaryText})}),(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:primaryClick,theme:"fill",children:primaryText})})]})]})})}TwoButtonModal.displayName="TwoButtonModal";try{TwoButtonModal.displayName="TwoButtonModal",TwoButtonModal.__docgenInfo={description:"",displayName:"TwoButtonModal",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},primaryButton:{defaultValue:null,description:"",name:"primaryButton",required:!0,type:{name:"ButtonProps"}},secondaryButton:{defaultValue:null,description:"",name:"secondaryButton",required:!0,type:{name:"ButtonProps"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/TwoButtonModal/index.tsx#TwoButtonModal"]={docgenInfo:TwoButtonModal.__docgenInfo,name:"TwoButtonModal",path:"src/components/common/TwoButtonModal/index.tsx#TwoButtonModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useSelect.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>useSelect});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useSelect=initialOption=>{const[selectedOption,setSelectedOption]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOption);return{selectedOption,handleOptionChange:option=>{setSelectedOption(option)}}};try{useSelect.displayName="useSelect",useSelect.__docgenInfo={description:"",displayName:"useSelect",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useSelect.tsx#useSelect"]={docgenInfo:useSelect.__docgenInfo,name:"useSelect",path:"src/hooks/useSelect.tsx#useSelect"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useText.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>useText});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useText=originalText=>{const[text,setText]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(originalText);return{text,handleTextChange:(event,limit)=>{const{value}=event.target;if(value.length>limit.MAX_LENGTH)return event.target.setCustomValidity(`해당 입력값은 ${limit.MAX_LENGTH}자까지 입력 가능합니다.`),void event.target.reportValidity();setText(value),event.target.setCustomValidity("")},resetText:()=>{setText("")}}}},"./src/hooks/useToggle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>useToggle});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useToggle=()=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return{isOpen,openComponent:()=>{setIsOpen(!0)},closeComponent:()=>{setIsOpen(!1)},toggleComponent:()=>{setIsOpen((prevIsOpen=>!prevIsOpen))}}}}}]);
//# sourceMappingURL=4146.88b38112.iframe.bundle.js.map