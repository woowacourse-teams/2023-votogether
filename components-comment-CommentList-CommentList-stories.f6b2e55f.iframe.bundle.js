"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[7295],{"./node_modules/@tanstack/react-query/build/lib/useMutation.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>useMutation});var react=__webpack_require__("./node_modules/react/index.js"),useSyncExternalStore=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),mutation=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/mutation.mjs"),notifyManager=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs"),subscribable=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");class MutationObserver extends subscribable.l{constructor(client,options){super(),this.client=client,this.setOptions(options),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(options){var _this$currentMutation;const prevOptions=this.options;this.options=this.client.defaultMutationOptions(options),(0,utils.VS)(prevOptions,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(_this$currentMutation=this.currentMutation)||_this$currentMutation.setOptions(this.options)}onUnsubscribe(){var _this$currentMutation2;this.hasListeners()||(null==(_this$currentMutation2=this.currentMutation)||_this$currentMutation2.removeObserver(this))}onMutationUpdate(action){this.updateResult();const notifyOptions={listeners:!0};"success"===action.type?notifyOptions.onSuccess=!0:"error"===action.type&&(notifyOptions.onError=!0),this.notify(notifyOptions)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(variables,options){return this.mutateOptions=options,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:void 0!==variables?variables:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){const state=this.currentMutation?this.currentMutation.state:(0,mutation.R)(),result={...state,isLoading:"loading"===state.status,isSuccess:"success"===state.status,isError:"error"===state.status,isIdle:"idle"===state.status,mutate:this.mutate,reset:this.reset};this.currentResult=result}notify(options){notifyManager.V.batch((()=>{var _this$mutateOptions$o,_this$mutateOptions,_this$mutateOptions$o2,_this$mutateOptions2;if(this.mutateOptions&&this.hasListeners())if(options.onSuccess)null==(_this$mutateOptions$o=(_this$mutateOptions=this.mutateOptions).onSuccess)||_this$mutateOptions$o.call(_this$mutateOptions,this.currentResult.data,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o2=(_this$mutateOptions2=this.mutateOptions).onSettled)||_this$mutateOptions$o2.call(_this$mutateOptions2,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context);else if(options.onError){var _this$mutateOptions$o3,_this$mutateOptions3,_this$mutateOptions$o4,_this$mutateOptions4;null==(_this$mutateOptions$o3=(_this$mutateOptions3=this.mutateOptions).onError)||_this$mutateOptions$o3.call(_this$mutateOptions3,this.currentResult.error,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o4=(_this$mutateOptions4=this.mutateOptions).onSettled)||_this$mutateOptions$o4.call(_this$mutateOptions4,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context)}options.listeners&&this.listeners.forEach((({listener})=>{listener(this.currentResult)}))}))}}var QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),lib_utils=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/utils.mjs");function useMutation(arg1,arg2,arg3){const options=(0,utils.lV)(arg1,arg2,arg3),queryClient=(0,QueryClientProvider.NL)({context:options.context}),[observer]=react.useState((()=>new MutationObserver(queryClient,options)));react.useEffect((()=>{observer.setOptions(options)}),[observer,options]);const result=(0,useSyncExternalStore.$)(react.useCallback((onStoreChange=>observer.subscribe(notifyManager.V.batchCalls(onStoreChange))),[observer]),(()=>observer.getCurrentResult()),(()=>observer.getCurrentResult())),mutate=react.useCallback(((variables,mutateOptions)=>{observer.mutate(variables,mutateOptions).catch(noop)}),[observer]);if(result.error&&(0,lib_utils.L)(observer.options.useErrorBoundary,[result.error]))throw result.error;return{...result,mutate,mutateAsync:result.mutate}}function noop(){}},"./src/components/comment/CommentList/CommentList.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/comment/CommentList/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{postId:1,postWriterName:"닉네임"})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  render: () => <CommentList postId={1} postWriterName="닉네임" />\n}',...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/comment/CommentList/CommentLoginSection/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentLoginSectionSection});var path=__webpack_require__("./src/constants/path.ts");const kakao_login_large_namespaceObject=__webpack_require__.p+"static/media/kakao_login_large.0a33a8d0.svg";var dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.section`
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    padding: 0 20px;

    font-size: 2.4rem;
  }
`,Title=styled_components_browser_esm.zo.span`
  font-size: 2.2rem;
  font-weight: 600;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font-size: 2.4rem;
  }
`,SubTitle=styled_components_browser_esm.zo.span`
  margin-top: 10px;

  font: var(--text-caption);
  font-weight: 400;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`,LoginLink=(0,styled_components_browser_esm.zo)(dist.rU)`
  display: flex;
  justify-content: center;

  margin-top: 40px;
`,Image=styled_components_browser_esm.zo.img`
  width: 300px;
  height: 45px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentLoginSectionSection({name}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Title,{children:"대화에 참여하려면 회원가입"}),(0,jsx_runtime.jsxs)(SubTitle,{children:["로그인하여 ",name,"님의 이야기에 대해 피드백을 제공해 보세요"]}),(0,jsx_runtime.jsx)(LoginLink,{to:path.m.LOGIN,children:(0,jsx_runtime.jsx)(Image,{src:kakao_login_large_namespaceObject,alt:"로그인 페이지로"})})]})}CommentLoginSectionSection.displayName="CommentLoginSectionSection";try{CommentLoginSection.displayName="CommentLoginSection",CommentLoginSection.__docgenInfo={description:"",displayName:"CommentLoginSection",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentList/CommentLoginSection/index.tsx#CommentLoginSection"]={docgenInfo:CommentLoginSection.__docgenInfo,name:"CommentLoginSection",path:"src/components/comment/CommentList/CommentLoginSection/index.tsx#CommentLoginSection"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/comment/CommentList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentList});var react=__webpack_require__("./node_modules/react/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),comment=__webpack_require__("./src/api/comment.ts"),queryKey=__webpack_require__("./src/constants/queryKey.ts");const useCommentList=postId=>{const{data,error,isLoading}=(0,useQuery.a)([queryKey.l.POSTS,postId,queryKey.l.COMMENTS],(()=>(0,comment.Rw)(postId)),{suspense:!0});return{data,error,isLoading}},useMoreComment=commentList=>{const[page,setPage]=(0,react.useState)(1),pageSize=10*page,hasMoreComment=commentList.length>pageSize;return{slicedCommentList:commentList.slice(0,pageSize),handleMoreComment:()=>{setPage((prevPage=>prevPage+1))},hasMoreComment}};var SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),scrollToTop=__webpack_require__("./src/utils/scrollToTop.ts"),CommentItem=__webpack_require__("./src/components/comment/CommentList/CommentItem/index.tsx"),CommentLoginSection=__webpack_require__("./src/components/comment/CommentList/CommentLoginSection/index.tsx"),CommentTextForm=__webpack_require__("./src/components/comment/CommentList/CommentTextForm/index.tsx"),constants=__webpack_require__("./src/components/comment/CommentList/constants.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div``,TextOrLoginWrapper=styled_components_browser_esm.zo.div`
  margin-top: 30px;
  padding: 40px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`,ListContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  padding-top: 25px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`,MoreButtonWrapper=styled_components_browser_esm.zo.div`
  width: 80px;
  height: 46px;
  margin: 25px auto 0 auto;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    width: 190px;
  }
`,ButtonContainer=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: end;

  padding: 20px 0;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    padding: 50px 0;
  }
`,TopButtonWrapper=styled_components_browser_esm.zo.div`
  width: 55px;
  height: 40px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    width: 64px;
    height: 46px;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const initialComment={id:-1,member:{id:-1,nickname:""},content:"",createdAt:"",isEdit:!1};function CommentList({postId,postWriterName}){const{data:commentList}=useCommentList(postId),{loggedInfo}=(0,react.useContext)(auth.V),{isLoggedIn,id:memberId}=loggedInfo,isGuest=!isLoggedIn,{slicedCommentList,handleMoreComment,hasMoreComment}=useMoreComment(commentList??[]);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(TextOrLoginWrapper,{children:isGuest?(0,jsx_runtime.jsx)(CommentLoginSection.Z,{name:postWriterName}):(0,jsx_runtime.jsx)(CommentTextForm.Z,{commentId:-1,initialComment})}),(0,jsx_runtime.jsx)(ListContainer,{children:slicedCommentList.map((comment=>{return(0,jsx_runtime.jsx)(CommentItem.Z,{comment,userType:(writerId=comment.member.id,isGuest?constants.GD.GUEST:writerId===memberId?constants.GD.WRITER:constants.GD.NOT_WRITER)},comment.id);var writerId}))}),hasMoreComment&&(0,jsx_runtime.jsx)(MoreButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:handleMoreComment,theme:"fill",children:"더보기"})}),(0,jsx_runtime.jsx)(ButtonContainer,{children:(0,jsx_runtime.jsx)(TopButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:scrollToTop.n,theme:"blank",children:"TOP"})})})]})}CommentList.displayName="CommentList";try{CommentList.displayName="CommentList",CommentList.__docgenInfo={description:"",displayName:"CommentList",props:{postId:{defaultValue:null,description:"",name:"postId",required:!0,type:{name:"number"}},postWriterName:{defaultValue:null,description:"",name:"postWriterName",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentList/index.tsx#CommentList"]={docgenInfo:CommentList.__docgenInfo,name:"CommentList",path:"src/components/comment/CommentList/index.tsx#CommentList"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BORDER_THEME={fill:"var(--primary-color)",blank:"var(--primary-color)",gray:"#67727E"},TEXT_THEME={fill:"white",blank:"var(--primary-color)",gray:"white"},BACKGROUND_THEME={fill:"var(--primary-color)",blank:"white",gray:"#67727E"},Button=styled_components_browser_esm.zo.button`
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
  border-radius: 4px;

  background-color: rgba(0, 0, 0, 0.5);
  color: var(--white);

  font: var(--text-caption);
  letter-spacing: 1px;

  animation: ${fadeInOutAnimation} ${animation.d}s linear infinite;

  z-index: ${theme.r.zIndex.modal};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Toast({children,size,position}){return(0,jsx_runtime.jsx)(Wrapper,{$position:position,children:(0,jsx_runtime.jsx)(Content,{$size:size,children})})}Toast.displayName="Toast";try{Toast.displayName="Toast",Toast.__docgenInfo={description:"",displayName:"Toast",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Toast/index.tsx#Toast"]={docgenInfo:Toast.__docgenInfo,name:"Toast",path:"src/components/common/Toast/index.tsx#Toast"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/ToastNSnackBarStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>POSITION,m:()=>SQUARE_SIZE});const POSITION={top:"25%",bottom:"85%"},SQUARE_SIZE={sm:{width:"250px",height:"40px"},md:{width:"400px",height:"40px"},lg:{width:"500px",height:"45px"},free:{width:"80%",height:"50px"}}},"./src/constants/animation.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>TOAST_TIME});const TOAST_TIME=3},"./src/constants/path.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>BASE_PATH,m:()=>PATH});const BASE_PATH={HOME:"/",LANDING:"/landing",LOGIN:"/login",POST:"/posts",USER:"/users",ADMIN:"/admin",SEARCH:"/search"},PATH={...BASE_PATH,POST_WRITE:`${BASE_PATH.POST}/write`,POST_VOTE_RESULT:`${BASE_PATH.POST}/result`,POST_CATEGORY:`${BASE_PATH.POST}/category`,USER_POST:`${BASE_PATH.USER}/posts`,USER_VOTE:`${BASE_PATH.USER}/votes`,USER_INFO:`${BASE_PATH.USER}/myPage`,USER_INFO_REGISTER:`${BASE_PATH.USER}/register`}},"./src/hooks/useToast.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>useToast});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_constants_animation__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/animation.ts");const useToast=()=>{const[isToastOpen,setIsToastOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[toastMessage,setToastMessage]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),timeIdRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),clear=()=>{timeIdRef.current&&window.clearTimeout(timeIdRef.current)};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>clear),[]),{isToastOpen,toastMessage,openToast:message=>{clear(),setIsToastOpen(!0),setToastMessage(message),timeIdRef.current=window.setTimeout((()=>{setIsToastOpen(!1)}),1e3*_constants_animation__WEBPACK_IMPORTED_MODULE_1__.d)}}}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
  `}}},"./src/utils/scrollToTop.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>smoothScrollToTop});const smoothScrollToTop=()=>{window.scroll({top:0,behavior:"smooth"})}},"./src/assets/chevron-down.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-down.f97a5bb1.svg"},"./src/assets/chevron-up.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-up.a1eb858b.svg"}}]);
//# sourceMappingURL=components-comment-CommentList-CommentList-stories.f6b2e55f.iframe.bundle.js.map