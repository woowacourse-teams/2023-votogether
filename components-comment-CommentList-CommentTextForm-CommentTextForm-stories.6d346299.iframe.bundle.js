"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[9742],{"./node_modules/@tanstack/react-query/build/lib/useMutation.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>useMutation});var react=__webpack_require__("./node_modules/react/index.js"),useSyncExternalStore=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),mutation=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/mutation.mjs"),notifyManager=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs"),subscribable=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");class MutationObserver extends subscribable.l{constructor(client,options){super(),this.client=client,this.setOptions(options),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(options){var _this$currentMutation;const prevOptions=this.options;this.options=this.client.defaultMutationOptions(options),(0,utils.VS)(prevOptions,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(_this$currentMutation=this.currentMutation)||_this$currentMutation.setOptions(this.options)}onUnsubscribe(){var _this$currentMutation2;this.hasListeners()||(null==(_this$currentMutation2=this.currentMutation)||_this$currentMutation2.removeObserver(this))}onMutationUpdate(action){this.updateResult();const notifyOptions={listeners:!0};"success"===action.type?notifyOptions.onSuccess=!0:"error"===action.type&&(notifyOptions.onError=!0),this.notify(notifyOptions)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(variables,options){return this.mutateOptions=options,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:void 0!==variables?variables:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){const state=this.currentMutation?this.currentMutation.state:(0,mutation.R)(),result={...state,isLoading:"loading"===state.status,isSuccess:"success"===state.status,isError:"error"===state.status,isIdle:"idle"===state.status,mutate:this.mutate,reset:this.reset};this.currentResult=result}notify(options){notifyManager.V.batch((()=>{var _this$mutateOptions$o,_this$mutateOptions,_this$mutateOptions$o2,_this$mutateOptions2;if(this.mutateOptions&&this.hasListeners())if(options.onSuccess)null==(_this$mutateOptions$o=(_this$mutateOptions=this.mutateOptions).onSuccess)||_this$mutateOptions$o.call(_this$mutateOptions,this.currentResult.data,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o2=(_this$mutateOptions2=this.mutateOptions).onSettled)||_this$mutateOptions$o2.call(_this$mutateOptions2,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context);else if(options.onError){var _this$mutateOptions$o3,_this$mutateOptions3,_this$mutateOptions$o4,_this$mutateOptions4;null==(_this$mutateOptions$o3=(_this$mutateOptions3=this.mutateOptions).onError)||_this$mutateOptions$o3.call(_this$mutateOptions3,this.currentResult.error,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o4=(_this$mutateOptions4=this.mutateOptions).onSettled)||_this$mutateOptions$o4.call(_this$mutateOptions4,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context)}options.listeners&&this.listeners.forEach((({listener})=>{listener(this.currentResult)}))}))}}var QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),lib_utils=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/utils.mjs");function useMutation(arg1,arg2,arg3){const options=(0,utils.lV)(arg1,arg2,arg3),queryClient=(0,QueryClientProvider.NL)({context:options.context}),[observer]=react.useState((()=>new MutationObserver(queryClient,options)));react.useEffect((()=>{observer.setOptions(options)}),[observer,options]);const result=(0,useSyncExternalStore.$)(react.useCallback((onStoreChange=>observer.subscribe(notifyManager.V.batchCalls(onStoreChange))),[observer]),(()=>observer.getCurrentResult()),(()=>observer.getCurrentResult())),mutate=react.useCallback(((variables,mutateOptions)=>{observer.mutate(variables,mutateOptions).catch(noop)}),[observer]);if(result.error&&(0,lib_utils.L)(observer.options.useErrorBoundary,[result.error]))throw result.error;return{...result,mutate,mutateAsync:result.mutate}}function noop(){}},"./src/components/comment/CommentList/CommentTextForm/CommentTextForm.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{EditForm:()=>EditForm,InitForm:()=>InitForm,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _mocks_mockData_comment__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/mocks/mockData/comment.ts"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/comment/CommentList/CommentTextForm/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_1__.Z},initialComment={id:-1,member:{id:-1,nickname:""},content:"",createdAt:"",isEdit:!1},InitForm={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{commentId:-1,initialComment})},EditForm={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{commentId:_mocks_mockData_comment__WEBPACK_IMPORTED_MODULE_0__.I[0].id,initialComment:_mocks_mockData_comment__WEBPACK_IMPORTED_MODULE_0__.I[0],handleCancelClick:()=>{}})};InitForm.parameters={...InitForm.parameters,docs:{...InitForm.parameters?.docs,source:{originalSource:"{\n  render: () => <CommentTextForm commentId={-1} initialComment={initialComment} />\n}",...InitForm.parameters?.docs?.source}}},EditForm.parameters={...EditForm.parameters,docs:{...EditForm.parameters?.docs,source:{originalSource:"{\n  render: () => <CommentTextForm commentId={MOCK_TRANSFORMED_COMMENT_LIST[0].id} initialComment={MOCK_TRANSFORMED_COMMENT_LIST[0]} handleCancelClick={() => {}} />\n}",...EditForm.parameters?.docs?.source}}};const __namedExportsOrder=["InitForm","EditForm"]},"./src/components/comment/CommentList/CommentTextForm/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentTextForm});var react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),comment=__webpack_require__("./src/api/comment.ts"),queryKey=__webpack_require__("./src/constants/queryKey.ts");const useCreateComment=postId=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isSuccess,isLoading,isError,error}=(0,useMutation.D)((newComment=>(0,comment.Yr)(postId,newComment)),{onSuccess:()=>{queryClient.invalidateQueries([queryKey.l.POSTS,postId,queryKey.l.COMMENTS])},onError:error=>{window.console.log("createComment error",error)}});return{mutate,isSuccess,isLoading,isError,error}},useEditComment=(postId,commentId)=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isSuccess,isLoading,isError,error}=(0,useMutation.D)((updatedComment=>(0,comment.DF)(postId,commentId,updatedComment)),{onSuccess:()=>{queryClient.invalidateQueries([queryKey.l.POSTS,postId,queryKey.l.COMMENTS])},onError:error=>{window.console.log("댓글 수정에 실패했습니다. 다시 시도해주세요.",error)}});return{mutate,isSuccess,isLoading,isError,error}};var useText=__webpack_require__("./src/hooks/useText.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),Toast=__webpack_require__("./src/components/common/Toast/index.tsx");const COMMENT={MAX_LENGTH:200,MIN_LENGTH:1};var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentTextForm({commentId,initialComment,handleCancelClick}){const{text:content,handleTextChange,resetText}=(0,useText.X)(initialComment.content),{isToastOpen,openToast,toastMessage}=(0,useToast.p)(),params=(0,dist.UO)(),postId=Number(params.postId),isEdit=-1!==initialComment.id,{mutate:createComment,isSuccess:isCreateSuccess,isError:isCreateError,error:createError}=useCreateComment(postId),{mutate:editComment,isSuccess:isEditSuccess,isError:isEditError,error:editError}=useEditComment(postId,commentId),updateComment=isEdit?()=>{editComment({...initialComment,content})}:()=>{createComment({content})};return(0,react.useEffect)((()=>{isCreateSuccess&&resetText()}),[isCreateSuccess]),(0,react.useEffect)((()=>{isEditSuccess&&handleCancelClick&&handleCancelClick()}),[isEditSuccess]),(0,react.useEffect)((()=>{isCreateError&&createError instanceof Error&&openToast(createError.message)}),[isCreateError,createError]),(0,react.useEffect)((()=>{isEditError&&editError instanceof Error&&openToast(editError.message)}),[isEditError,editError]),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(TextArea,{"aria-label":isEdit?"댓글 수정":"댓글 작성",value:content,onChange:e=>handleTextChange(e,COMMENT)}),(0,jsx_runtime.jsxs)(ButtonContainer,{children:[isEdit&&(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"댓글 취소",onClick:handleCancelClick,theme:"gray",type:"button",children:"취소"})}),(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"댓글 저장",onClick:()=>updateComment(),theme:"blank",type:"button",children:"저장"})})]}),isToastOpen&&(0,jsx_runtime.jsx)(Toast.Z,{size:"md",position:"bottom",children:toastMessage})]})}CommentTextForm.displayName="CommentTextForm";try{CommentTextForm.displayName="CommentTextForm",CommentTextForm.__docgenInfo={description:"",displayName:"CommentTextForm",props:{commentId:{defaultValue:null,description:"",name:"commentId",required:!0,type:{name:"number"}},initialComment:{defaultValue:null,description:"",name:"initialComment",required:!0,type:{name:"Comment"}},handleCancelClick:{defaultValue:null,description:"",name:"handleCancelClick",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentList/CommentTextForm/index.tsx#CommentTextForm"]={docgenInfo:CommentTextForm.__docgenInfo,name:"CommentTextForm",path:"src/components/comment/CommentList/CommentTextForm/index.tsx#CommentTextForm"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BORDER_THEME={fill:"var(--primary-color)",blank:"var(--primary-color)",gray:"#67727E"},TEXT_THEME={fill:"white",blank:"var(--primary-color)",gray:"white"},BACKGROUND_THEME={fill:"var(--primary-color)",blank:"white",gray:"#67727E"},Button=styled_components_browser_esm.zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{$theme:theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'},{value:'"gray"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Toast/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Toast});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),animation=__webpack_require__("./src/constants/animation.ts"),theme=__webpack_require__("./src/styles/theme.ts"),ToastNSnackBarStyle=__webpack_require__("./src/components/common/ToastNSnackBarStyle.ts");const fadeInOutAnimation=styled_components_browser_esm.F4`
  0%, 100%{
    opacity: 0;
  }
  10%, 90% {
    opacity: 1;
  }
`,Wrapper=styled_components_browser_esm.zo.div`
  position: fixed;

  top: ${props=>ToastNSnackBarStyle.V[props.$position]};
`,Content=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${props=>ToastNSnackBarStyle.m[props.$size].width};
  height: ${props=>ToastNSnackBarStyle.m[props.$size].height};
  border-radius: 4px;

  background-color: rgba(0, 0, 0, 0.5);
  color: var(--white);

  font: var(--text-caption);
  letter-spacing: 1px;

  animation: ${fadeInOutAnimation} ${animation.d}s linear infinite;

  z-index: ${theme.r.zIndex.modal};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Toast({children,size,position}){return(0,jsx_runtime.jsx)(Wrapper,{$position:position,children:(0,jsx_runtime.jsx)(Content,{"aria-live":"polite",$size:size,children})})}Toast.displayName="Toast";try{Toast.displayName="Toast",Toast.__docgenInfo={description:"",displayName:"Toast",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Toast/index.tsx#Toast"]={docgenInfo:Toast.__docgenInfo,name:"Toast",path:"src/components/common/Toast/index.tsx#Toast"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/ToastNSnackBarStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>POSITION,m:()=>SQUARE_SIZE});const POSITION={top:"25%",bottom:"85%"},SQUARE_SIZE={sm:{width:"250px",height:"40px"},md:{width:"400px",height:"40px"},lg:{width:"500px",height:"45px"},free:{width:"80%",height:"50px"}}},"./src/constants/animation.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>TOAST_TIME});const TOAST_TIME=3},"./src/hooks/useText.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>useText});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useText=originalText=>{const[text,setText]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(originalText);return{text,setText,handleTextChange:(event,limit)=>{const{value}=event.target;if(value.length>limit.MAX_LENGTH)return event.target.setCustomValidity(`해당 입력값은 ${limit.MAX_LENGTH}자까지 입력 가능합니다.`),void event.target.reportValidity();setText(value),event.target.setCustomValidity("")},resetText:()=>{setText("")}}}},"./src/hooks/useToast.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>useToast});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_constants_animation__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/animation.ts");const useToast=()=>{const[isToastOpen,setIsToastOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[toastMessage,setToastMessage]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),timeIdRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),clear=()=>{timeIdRef.current&&window.clearTimeout(timeIdRef.current)};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>clear),[]),{isToastOpen,toastMessage,openToast:message=>{clear(),setIsToastOpen(!0),setToastMessage(message),timeIdRef.current=window.setTimeout((()=>{setIsToastOpen(!1)}),1e3*_constants_animation__WEBPACK_IMPORTED_MODULE_1__.d)}}}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
//# sourceMappingURL=components-comment-CommentList-CommentTextForm-CommentTextForm-stories.6d346299.iframe.bundle.js.map