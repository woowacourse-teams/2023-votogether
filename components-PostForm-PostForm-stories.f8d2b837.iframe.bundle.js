"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[3278],{"./node_modules/@tanstack/react-query/build/lib/useMutation.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>useMutation});var react=__webpack_require__("./node_modules/react/index.js"),useSyncExternalStore=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),mutation=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/mutation.mjs"),notifyManager=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs"),subscribable=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");class MutationObserver extends subscribable.l{constructor(client,options){super(),this.client=client,this.setOptions(options),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(options){var _this$currentMutation;const prevOptions=this.options;this.options=this.client.defaultMutationOptions(options),(0,utils.VS)(prevOptions,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(_this$currentMutation=this.currentMutation)||_this$currentMutation.setOptions(this.options)}onUnsubscribe(){var _this$currentMutation2;this.hasListeners()||(null==(_this$currentMutation2=this.currentMutation)||_this$currentMutation2.removeObserver(this))}onMutationUpdate(action){this.updateResult();const notifyOptions={listeners:!0};"success"===action.type?notifyOptions.onSuccess=!0:"error"===action.type&&(notifyOptions.onError=!0),this.notify(notifyOptions)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(variables,options){return this.mutateOptions=options,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:void 0!==variables?variables:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){const state=this.currentMutation?this.currentMutation.state:(0,mutation.R)(),result={...state,isLoading:"loading"===state.status,isSuccess:"success"===state.status,isError:"error"===state.status,isIdle:"idle"===state.status,mutate:this.mutate,reset:this.reset};this.currentResult=result}notify(options){notifyManager.V.batch((()=>{var _this$mutateOptions$o,_this$mutateOptions,_this$mutateOptions$o2,_this$mutateOptions2;if(this.mutateOptions&&this.hasListeners())if(options.onSuccess)null==(_this$mutateOptions$o=(_this$mutateOptions=this.mutateOptions).onSuccess)||_this$mutateOptions$o.call(_this$mutateOptions,this.currentResult.data,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o2=(_this$mutateOptions2=this.mutateOptions).onSettled)||_this$mutateOptions$o2.call(_this$mutateOptions2,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context);else if(options.onError){var _this$mutateOptions$o3,_this$mutateOptions3,_this$mutateOptions$o4,_this$mutateOptions4;null==(_this$mutateOptions$o3=(_this$mutateOptions3=this.mutateOptions).onError)||_this$mutateOptions$o3.call(_this$mutateOptions3,this.currentResult.error,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o4=(_this$mutateOptions4=this.mutateOptions).onSettled)||_this$mutateOptions$o4.call(_this$mutateOptions4,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context)}options.listeners&&this.listeners.forEach((({listener})=>{listener(this.currentResult)}))}))}}var QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),lib_utils=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/utils.mjs");function useMutation(arg1,arg2,arg3){const options=(0,utils.lV)(arg1,arg2,arg3),queryClient=(0,QueryClientProvider.NL)({context:options.context}),[observer]=react.useState((()=>new MutationObserver(queryClient,options)));react.useEffect((()=>{observer.setOptions(options)}),[observer,options]);const result=(0,useSyncExternalStore.$)(react.useCallback((onStoreChange=>observer.subscribe(notifyManager.V.batchCalls(onStoreChange))),[observer]),(()=>observer.getCurrentResult()),(()=>observer.getCurrentResult())),mutate=react.useCallback(((variables,mutateOptions)=>{observer.mutate(variables,mutateOptions).catch(noop)}),[observer]);if(result.error&&(0,lib_utils.L)(observer.options.useErrorBoundary,[result.error]))throw result.error;return{...result,mutate,mutateAsync:result.mutate}}function noop(){}},"./src/components/PostForm/PostForm.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NewPost:()=>NewPost,OldPost:()=>OldPost,__namedExportsOrder:()=>__namedExportsOrder,default:()=>PostForm_stories});var QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),api_post=__webpack_require__("./src/api/post.ts"),queryKey=__webpack_require__("./src/constants/queryKey.ts");var useEditPost=__webpack_require__("./src/hooks/query/post/useEditPost.ts"),PostForm=__webpack_require__("./src/components/PostForm/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const PostForm_stories={component:PostForm.Z},MOCK_DATA={postId:1,title:"당신의 최애 동물에 투표하세요!",writer:{id:15216,nickname:"jero"},content:"한자로 견(犬)·구(狗) 등으로 표기한다. 포유류 중 가장 오래된 가축으로 거의 전세계에서 사육되며 약 400여 품종이 있다.  개는 이리·자칼(jackal) 등이 조상이라고 하는데, 이는 개와 교배하여 계대(繼代) 번식의 가능성이 있는 새끼를 낳을 수 있다는 것을 뜻한다. 즉 개에 이들의 혈액이 혼혈될 가능성이 있다는 것이다. 그러나 두개골이나 치아의 구조를 보면 개는 혼합된 것이 아니며, 또 그들 중의 어느 것에서 생긴 것이라고도 여겨지지 않는다. 아마도 개는 오스트레일리아에 야생하는 딩고(dingo)나 남아시아에 반야생상태로 서식하는 개와 흡사한, 절멸된 야생종에서 생긴 것으로 추측된다.",imageUrl:"",category:[{id:13215,name:"음식"},{id:13217,name:"게임"},{id:13219,name:"연예"}],createTime:"2023-07-18 12:40",deadline:"2023-08-15 12:40",voteInfo:{selectedOptionId:1,allPeopleCount:0,options:[{id:Math.floor(1e5*Math.random()),text:"햄스터가 세상을 구한다.",imageUrl:"",peopleCount:0,percent:20},{id:Math.floor(1e5*Math.random()),text:"강아지가 세상을 구한다.",imageUrl:"",peopleCount:0,percent:10},{id:Math.floor(1e5*Math.random()),text:"고양이가 세상을 구한다.",imageUrl:"https://source.unsplash.com/random",peopleCount:0,percent:10}]}},NewPost=()=>{const{mutate}=(()=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isLoading,isSuccess,isError,error}=(0,useMutation.D)((post=>(0,api_post.qb)(post)),{onSuccess:()=>{queryClient.invalidateQueries([queryKey.l.USER_INFO,!0])},onError:error=>{window.console.log("createPost error",error)}});return{mutate,isLoading,isSuccess,isError,error}})();return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(PostForm.Z,{mutate})})},OldPost=()=>{const{mutate}=(0,useEditPost.B)(1);return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(PostForm.Z,{data:MOCK_DATA,mutate})})};NewPost.parameters={...NewPost.parameters,docs:{...NewPost.parameters?.docs,source:{originalSource:"() => {\n  const {\n    mutate\n  } = useCreatePost();\n  return <>\n      <PostForm mutate={mutate} />\n    </>;\n}",...NewPost.parameters?.docs?.source}}},OldPost.parameters={...OldPost.parameters,docs:{...OldPost.parameters?.docs,source:{originalSource:"() => {\n  const examplePostId = 1;\n  const {\n    mutate\n  } = useEditPost(examplePostId);\n  return <>\n      <PostForm data={MOCK_DATA} mutate={mutate} />\n    </>;\n}",...OldPost.parameters?.docs?.source}}};const __namedExportsOrder=["NewPost","OldPost"]},"./src/api/categoryList.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{CM:()=>addFavoriteCategory,a$:()=>getUserCategoryList,kD:()=>getGuestCategoryList,xh:()=>removeFavoriteCategory});var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/fetch.ts");const transformCategoryListResponse=categoryList=>categoryList.map((category=>({id:category.id,name:category.name,isFavorite:category.isFavorite}))),getUserCategoryList=async()=>{const categoryList=await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)("/categories");return transformCategoryListResponse(categoryList)},getGuestCategoryList=async()=>{const categoryList=await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)("/categories/guest");return transformCategoryListResponse(categoryList)},addFavoriteCategory=async categoryId=>{await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.ZL)(`/categories/${categoryId}/like`,"")},removeFavoriteCategory=async categoryId=>{await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.Wq)(`/categories/${categoryId}/like`)}},"./src/components/common/ErrorMessage/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ErrorMessage});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Wrapper=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  position: relative;
`,Title=(styled_components_browser_esm.zo.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.r.zIndex.header};

  @media (min-width: ${theme.r.breakpoint.md}) {
    display: none;
  }
`,styled_components_browser_esm.zo.h1`
  width: 90%;
  margin-top: 60px;

  font-size: 20px;
  font-weight: bold;

  text-align: center;
`),Description=styled_components_browser_esm.zo.p`
  width: 90%;
  margin: 20px 0;

  font: var(--text-body);
  text-align: center;
`;styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`,styled_components_browser_esm.zo.p`
  display: flex;
  justify-content: space-around;
  gap: 10px;

  padding: 12px;

  font: var(--text-body);
  font-weight: bold;
`,styled_components_browser_esm.zo.div`
  width: 120px;
  height: 50px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ErrorMessage({errorHandler}){return(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(Title,{children:"⚠ 잠시 후 다시 시도해주세요."}),(0,jsx_runtime.jsx)(Description,{children:"요청하신 데이터를 불러오는데 실패했습니다."})]})}ErrorMessage.displayName="ErrorMessage";try{ErrorMessage.displayName="ErrorMessage",ErrorMessage.__docgenInfo={description:"",displayName:"ErrorMessage",props:{errorHandler:{defaultValue:null,description:"",name:"errorHandler",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/ErrorMessage/index.tsx#ErrorMessage"]={docgenInfo:ErrorMessage.__docgenInfo,name:"ErrorMessage",path:"src/components/common/ErrorMessage/index.tsx#ErrorMessage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BORDER_THEME={fill:"var(--primary-color)",blank:"var(--primary-color)",gray:"#67727E"},TEXT_THEME={fill:"white",blank:"var(--primary-color)",gray:"white"},BACKGROUND_THEME={fill:"var(--primary-color)",blank:"white",gray:"#67727E"},Button=styled_components_browser_esm.zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Toast({children,size,position}){return(0,jsx_runtime.jsx)(Wrapper,{$position:position,children:(0,jsx_runtime.jsx)(Content,{$size:size,children})})}Toast.displayName="Toast";try{Toast.displayName="Toast",Toast.__docgenInfo={description:"",displayName:"Toast",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Toast/index.tsx#Toast"]={docgenInfo:Toast.__docgenInfo,name:"Toast",path:"src/components/common/Toast/index.tsx#Toast"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/ToastNSnackBarStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>POSITION,m:()=>SQUARE_SIZE});const POSITION={top:"25%",bottom:"85%"},SQUARE_SIZE={sm:{width:"250px",height:"40px"},md:{width:"400px",height:"40px"},lg:{width:"500px",height:"45px"},free:{width:"80%",height:"50px"}}},"./src/constants/animation.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>TOAST_TIME});const TOAST_TIME=3},"./src/constants/path.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>BASE_PATH,m:()=>PATH});const BASE_PATH={HOME:"/",LANDING:"/landing",LOGIN:"/login",POST:"/posts",USER:"/users",ADMIN:"/admin",SEARCH:"/search"},PATH={...BASE_PATH,POST_WRITE:`${BASE_PATH.POST}/write`,POST_VOTE_RESULT:`${BASE_PATH.POST}/result`,POST_CATEGORY:`${BASE_PATH.POST}/category`,USER_POST:`${BASE_PATH.USER}/posts`,USER_VOTE:`${BASE_PATH.USER}/votes`,USER_INFO:`${BASE_PATH.USER}/myPage`,USER_INFO_REGISTER:`${BASE_PATH.USER}/register`}},"./src/constants/post.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B9:()=>POST_CONTENT,D:()=>DEFAULT_KEYWORD,FQ:()=>SORTING,It:()=>REQUEST_POST_KIND_URL,JH:()=>POST_TYPE,Kf:()=>REQUEST_STATUS_OPTION,Kn:()=>SEARCH_KEYWORD,Pi:()=>POST_TITLE,Q_:()=>STATUS,cb:()=>CATEGORY_COUNT_LIMIT,f_:()=>IMAGE_BASE_URL,ko:()=>SEARCH_KEYWORD_MAX_LENGTH,tL:()=>REQUEST_SORTING_OPTION,yE:()=>DEFAULT_CATEGORY_ID,zV:()=>POST_LIST_MAX_LENGTH});const STATUS={ALL:"all",PROGRESS:"progress",CLOSED:"closed"},SORTING={LATEST:"latest",POPULAR:"popular"},POST_TYPE={ALL:"posts",MY_POST:"myPost",MY_VOTE:"myVote",CATEGORY:"category",SEARCH:"search"},REQUEST_STATUS_OPTION={[STATUS.ALL]:"ALL",[STATUS.PROGRESS]:"PROGRESS",[STATUS.CLOSED]:"CLOSED"},REQUEST_SORTING_OPTION={[SORTING.LATEST]:"LATEST",[SORTING.POPULAR]:"HOT"},REQUEST_POST_KIND_URL={[POST_TYPE.ALL]:"posts",[POST_TYPE.MY_POST]:"posts/me",[POST_TYPE.MY_VOTE]:"posts/votes/me",[POST_TYPE.CATEGORY]:"posts",[POST_TYPE.SEARCH]:"posts/search"},SEARCH_KEYWORD="keyword",POST_TITLE={MAX_LENGTH:100,MIN_LENGTH:2},POST_CONTENT={MAX_LENGTH:1e3,MIN_LENGTH:2},SEARCH_KEYWORD_MAX_LENGTH=100,POST_LIST_MAX_LENGTH=10,DEFAULT_CATEGORY_ID=0,DEFAULT_KEYWORD="",CATEGORY_COUNT_LIMIT=3,IMAGE_BASE_URL=`${"".replace(/api\./,"")}/`},"./src/hooks/query/category/useCategoryList.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>useCategoryList});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),_api_categoryList__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/api/categoryList.ts"),_constants_queryKey__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/queryKey.ts");const useCategoryList=isLoggedIn=>{const{data,error,isLoading,isError}=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.a)([_constants_queryKey__WEBPACK_IMPORTED_MODULE_1__.l.CATEGORIES,isLoggedIn],isLoggedIn?_api_categoryList__WEBPACK_IMPORTED_MODULE_0__.a$:_api_categoryList__WEBPACK_IMPORTED_MODULE_0__.kD,{cacheTime:36e5,staleTime:36e5,suspense:!0});return{data,error,isLoading,isError}}},"./src/hooks/useToast.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>useToast});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_constants_animation__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/animation.ts");const useToast=()=>{const[isToastOpen,setIsToastOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[toastMessage,setToastMessage]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),timeIdRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),clear=()=>{timeIdRef.current&&window.clearTimeout(timeIdRef.current)};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>clear),[]),{isToastOpen,toastMessage,openToast:message=>{clear(),setIsToastOpen(!0),setToastMessage(message),timeIdRef.current=window.setTimeout((()=>{setIsToastOpen(!1)}),1e3*_constants_animation__WEBPACK_IMPORTED_MODULE_1__.d)}}}},"./src/pages/ErrorBoundary.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_ErrorMessage__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/ErrorMessage/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");class ErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state={hasError:!1,errorMessage:""}}static getDerivedStateFromError(error){return{hasError:!0,errorMessage:error.message}}componentDidCatch(error,errorInfo){window.console.log(error,errorInfo)}render(){return this.state.hasError?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_common_ErrorMessage__WEBPACK_IMPORTED_MODULE_1__.Z,{}):this.props.children}}ErrorBoundary.displayName="ErrorBoundary";const __WEBPACK_DEFAULT_EXPORT__=ErrorBoundary;try{ErrorBoundary.displayName="ErrorBoundary",ErrorBoundary.__docgenInfo={description:"",displayName:"ErrorBoundary",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/ErrorBoundary.tsx#ErrorBoundary"]={docgenInfo:ErrorBoundary.__docgenInfo,name:"ErrorBoundary",path:"src/pages/ErrorBoundary.tsx#ErrorBoundary"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
//# sourceMappingURL=components-PostForm-PostForm-stories.f8d2b837.iframe.bundle.js.map