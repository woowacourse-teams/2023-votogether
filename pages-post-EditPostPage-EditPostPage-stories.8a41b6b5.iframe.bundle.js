"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[4306],{"./src/pages/post/EditPostPage/EditPostPage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>EditPostPage_stories});var react=__webpack_require__("./node_modules/react/index.js"),ErrorBoundaryWithNarrowHeader=__webpack_require__("./src/pages/ErrorBoundaryWithNarrowHeader.tsx"),Layout=__webpack_require__("./src/components/common/Layout/index.tsx"),NarrowTemplateHeader=__webpack_require__("./src/components/common/NarrowTemplateHeader/index.tsx"),Skeleton=__webpack_require__("./src/components/common/Skeleton/index.tsx"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),postOption=__webpack_require__("./src/hooks/context/postOption.tsx"),useEditPost=__webpack_require__("./src/hooks/query/post/useEditPost.ts"),usePostDetail=__webpack_require__("./src/hooks/query/post/usePostDetail.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),Toast=__webpack_require__("./src/components/common/Toast/index.tsx"),PostForm=__webpack_require__("./src/components/PostForm/index.tsx"),path=__webpack_require__("./src/constants/path.ts"),post=__webpack_require__("./src/constants/post.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function EditPost(){const navigate=(0,dist.s0)(),{postId}=(0,dist.UO)(),{data}=(0,usePostDetail.S)(!0,Number(postId)),{mutate,isSuccess,isError,error}=(0,useEditPost.B)(Number(postId)),{isToastOpen,openToast,toastMessage}=(0,useToast.p)(),{setPostOption}=(0,react.useContext)(postOption.J);return(0,react.useEffect)((()=>{isSuccess&&(navigate(`${path.m.POST}/${postId}`),setPostOption({sorting:post.FQ.LATEST,status:post.Q_.PROGRESS}))}),[isSuccess,navigate,postId]),(0,react.useEffect)((()=>{if(isError&&error instanceof Error){const errorResponse=JSON.parse(error.message);openToast(errorResponse.message)}else;}),[isError,error]),(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(PostForm.Z,{data,mutate}),isToastOpen&&(0,jsx_runtime.jsx)(Toast.Z,{size:"md",position:"bottom",children:toastMessage})]})}var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const SkeletonWrapper=styled_components_browser_esm.zo.div`
  padding: 50px 10px 20px 10px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    padding: 30px 40px 20px 40px;
  }

  @media (min-width: ${theme.r.breakpoint.md}) {
    padding: 30px 80px 20px 80px;
  }
`;styled_components_browser_esm.zo.button`
  width: 30px;

  color: white;

  cursor: pointer;
`;function EditPostPage(){return(0,jsx_runtime.jsx)(Layout.Z,{isSidebarVisible:!1,children:(0,jsx_runtime.jsx)(ErrorBoundaryWithNarrowHeader.Z,{children:(0,jsx_runtime.jsx)(react.Suspense,{fallback:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(NarrowTemplateHeader.Z,{}),(0,jsx_runtime.jsx)(SkeletonWrapper,{children:(0,jsx_runtime.jsx)(Skeleton.Z,{isLarge:!0})})]}),children:(0,jsx_runtime.jsx)(EditPost,{})})})})}EditPostPage.displayName="EditPostPage";const EditPostPage_stories={component:EditPostPage},Default={render:()=>(0,jsx_runtime.jsx)(EditPostPage,{})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <EditPostPage />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/Layout/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Layout});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),Dashboard=__webpack_require__("./src/components/common/Dashboard/index.tsx"),WideHeader=__webpack_require__("./src/components/common/WideHeader/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  height: 100vh;
`,ContentContainer=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    padding-top: 70px;
  }
`,WideHeaderWrapper=styled_components_browser_esm.zo.div`
  width: 100%;

  position: fixed;
  top: 0;

  z-index: ${theme.r.zIndex.header};

  @media (max-width: ${theme.r.breakpoint.sm}) {
    display: none;
    visibility: hidden;
  }
`,DashboardWrapper=styled_components_browser_esm.zo.aside`
  width: 225px;
  height: 90vh;

  position: fixed;
  left: 0;

  @media (max-width: ${theme.r.breakpoint.sm}) {
    display: none;
    visibility: hidden;
  }
`,MainContainer=styled_components_browser_esm.zo.main`
  display: flex;
  justify-content: center;

  margin-top: 15px;
  width: 100%;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    margin-top: 0;
    padding-left: ${({$isSidebarVisible})=>$isSidebarVisible&&"225px"};
  }
`,ChildrenWrapper=styled_components_browser_esm.zo.div`
  width: 100%;
  max-width: ${({$isSidebarVisible})=>$isSidebarVisible&&"700px"};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Layout({children,isSidebarVisible}){const navigate=(0,dist.s0)();return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(WideHeaderWrapper,{children:(0,jsx_runtime.jsx)(WideHeader.Z,{handleLogoClick:()=>{navigate("/")}})}),(0,jsx_runtime.jsxs)(ContentContainer,{children:[isSidebarVisible&&(0,jsx_runtime.jsx)(DashboardWrapper,{children:(0,jsx_runtime.jsx)(Dashboard.Z,{})}),(0,jsx_runtime.jsx)(MainContainer,{$isSidebarVisible:isSidebarVisible,children:(0,jsx_runtime.jsx)(ChildrenWrapper,{$isSidebarVisible:isSidebarVisible,children})})]})]})}Layout.displayName="Layout";try{Layout.displayName="Layout",Layout.__docgenInfo={description:"",displayName:"Layout",props:{isSidebarVisible:{defaultValue:null,description:"",name:"isSidebarVisible",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Layout/index.tsx#Layout"]={docgenInfo:Layout.__docgenInfo,name:"Layout",path:"src/components/common/Layout/index.tsx#Layout"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/LogoButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LogoButton});var logo=__webpack_require__("./src/assets/logo.svg");const projectName_namespaceObject=__webpack_require__.p+"static/media/projectName.7b011954.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  display: flex;
  align-items: center;
  gap: 10px;

  background-color: rgba(0, 0, 0, 0);

  height: 100%;

  cursor: pointer;

  & :first-child {
    height: 100%;
    border-radius: 5px;
  }

  & :last-child {
    height: ${props=>"icon"!==props.content&&"60%"};
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const contentCategory={icon:{name:"로고 아이콘",url:logo},text:{name:"votogether",url:projectName_namespaceObject},full:{name:"votogether",url:""}};function LogoButton({content,...rest}){const src=contentCategory[content].url,ariaLabelText=contentCategory[content].name;return"full"===content?(0,jsx_runtime.jsxs)(Button,{content,"aria-label":ariaLabelText,...rest,children:[(0,jsx_runtime.jsx)("img",{src:logo,alt:"로고 아이콘"}),(0,jsx_runtime.jsx)("img",{src:projectName_namespaceObject,alt:"VoTogether"})]}):(0,jsx_runtime.jsx)(Button,{content,"aria-label":ariaLabelText,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:"로고 아이콘"})})}LogoButton.displayName="LogoButton";try{LogoButton.displayName="LogoButton",LogoButton.__docgenInfo={description:"",displayName:"LogoButton",props:{content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"enum",value:[{value:'"text"'},{value:'"icon"'},{value:'"full"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/LogoButton/index.tsx#LogoButton"]={docgenInfo:LogoButton.__docgenInfo,name:"LogoButton",path:"src/components/common/LogoButton/index.tsx#LogoButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SearchBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SearchBar});var path=__webpack_require__("./src/constants/path.ts"),post=__webpack_require__("./src/constants/post.ts");const search_black_namespaceObject=__webpack_require__.p+"static/media/search_black.af78e45d.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const formSize={sm:"170px",md:"250px",lg:"400px"},Form=styled_components_browser_esm.zo.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  width: ${props=>"free"===props.size?"100%":formSize[props.size]};
  height: 36px;
  padding: 5px 10px;
  border-radius: 5px;

  background-color: #cccccc;
  color: red;

  font-size: 1rem;
`,Input=styled_components_browser_esm.zo.input`
  width: 100%;
  height: 100%;
  outline: 0;

  background-color: rgba(0, 0, 0, 0);

  font: var(--text-caption);
  letter-spacing: 1px;
`,Button=styled_components_browser_esm.zo.button`
  background-color: rgba(0, 0, 0, 0);

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SearchBar({size,...rest}){return(0,jsx_runtime.jsxs)(Form,{size,action:path.m.SEARCH,children:[(0,jsx_runtime.jsx)(Input,{type:"search",name:post.Kn,...rest}),(0,jsx_runtime.jsx)(Button,{type:"submit",children:(0,jsx_runtime.jsx)("img",{src:search_black_namespaceObject,alt:"검색버튼"})})]})}SearchBar.displayName="SearchBar";try{SearchBar.displayName="SearchBar",SearchBar.__docgenInfo={description:"",displayName:"SearchBar",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SearchBar/index.tsx#SearchBar"]={docgenInfo:SearchBar.__docgenInfo,name:"SearchBar",path:"src/components/common/SearchBar/index.tsx#SearchBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/WideHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WideHeader});var LogoButton=__webpack_require__("./src/components/common/LogoButton/index.tsx"),SearchBar=__webpack_require__("./src/components/common/SearchBar/index.tsx");const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 70px;

  position: fixed;
  top: 0;

  background-color: var(--header);

  padding: 0 80px;

  & :first-child {
    height: 70%;

    & :last-child {
      height: 40%;
    }
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WideHeader({handleLogoClick}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(LogoButton.Z,{content:"full",onClick:handleLogoClick}),(0,jsx_runtime.jsx)(SearchBar.Z,{size:"sm"})]})}WideHeader.displayName="WideHeader";try{WideHeader.displayName="WideHeader",WideHeader.__docgenInfo={description:"",displayName:"WideHeader",props:{handleLogoClick:{defaultValue:null,description:"",name:"handleLogoClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/WideHeader/index.tsx#WideHeader"]={docgenInfo:WideHeader.__docgenInfo,name:"WideHeader",path:"src/components/common/WideHeader/index.tsx#WideHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/context/postOption.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>PostOptionContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_constants_post__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/post.ts");__webpack_require__("./node_modules/react/jsx-runtime.js");const PostOptionContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({postOption:{sorting:_constants_post__WEBPACK_IMPORTED_MODULE_1__.FQ.LATEST,status:_constants_post__WEBPACK_IMPORTED_MODULE_1__.Q_.PROGRESS},setPostOption:()=>{}});try{postOption.displayName="postOption",postOption.__docgenInfo={description:"",displayName:"postOption",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/context/postOption.tsx#postOption"]={docgenInfo:postOption.__docgenInfo,name:"postOption",path:"src/hooks/context/postOption.tsx#postOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/query/post/usePostDetail.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>usePostDetail});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),_api_post__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/api/post.ts"),_constants_queryKey__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/queryKey.ts");const usePostDetail=(isLoggedIn,postId)=>{const fetchApi=isLoggedIn?_api_post__WEBPACK_IMPORTED_MODULE_0__.xl:_api_post__WEBPACK_IMPORTED_MODULE_0__.Xv,{data,isError,isLoading,error}=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.a)([_constants_queryKey__WEBPACK_IMPORTED_MODULE_1__.l.POST_DETAIL,postId,isLoggedIn],(()=>fetchApi(postId)),{suspense:!0});return{data,isError,isLoading,error}}},"./src/pages/Error/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Error});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),Layout=__webpack_require__("./src/components/common/Layout/index.tsx"),LogoButton=__webpack_require__("./src/components/common/LogoButton/index.tsx"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Wrapper=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  position: relative;
`,Description=(styled_components_browser_esm.zo.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.r.zIndex.header};
`,styled_components_browser_esm.zo.p`
  width: 90%;
  margin-top: 60px;

  font: var(--text-title);
  text-align: center;
`),Text=styled_components_browser_esm.zo.p`
  width: 90%;

  color: gray;

  font: var(--text-body);
  text-align: center;
`,ButtonWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  width: 280px;
  height: 50px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Error({message}){const navigate=(0,dist.s0)();return(0,jsx_runtime.jsx)(Layout.Z,{isSidebarVisible:!1,children:(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(Description,{children:message||"요청 중 오류가 발생했습니다."}),(0,jsx_runtime.jsx)(LogoButton.Z,{content:"icon",style:{width:"100px",height:"100px"}}),(0,jsx_runtime.jsx)(Text,{children:"오류가 지속되는 경우 votogether@gmail.com 로 문의해주세요."}),(0,jsx_runtime.jsxs)(ButtonWrapper,{children:[(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"fill",onClick:()=>{navigate("/")},children:"홈으로 가기"}),(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"gray",onClick:()=>{window.location.reload()},children:"새로 고침"})]})]})})}Error.displayName="Error";try{Error.displayName="Error",Error.__docgenInfo={description:"",displayName:"Error",props:{message:{defaultValue:null,description:"",name:"message",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/Error/index.tsx#Error"]={docgenInfo:Error.__docgenInfo,name:"Error",path:"src/pages/Error/index.tsx#Error"})}catch(__react_docgen_typescript_loader_error){}},"./src/pages/ErrorBoundaryWithNarrowHeader.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _components_common_NarrowTemplateHeader__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/NarrowTemplateHeader/index.tsx"),_Error__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/pages/Error/index.tsx"),_ErrorBoundary__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/pages/ErrorBoundary.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");class ErrorBoundaryWithNarrowHeader extends _ErrorBoundary__WEBPACK_IMPORTED_MODULE_2__.Z{render(){return this.state.hasError?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_common_NarrowTemplateHeader__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Error__WEBPACK_IMPORTED_MODULE_1__.Z,{message:this.state.errorMessage})]}):this.props.children}}ErrorBoundaryWithNarrowHeader.displayName="ErrorBoundaryWithNarrowHeader";const __WEBPACK_DEFAULT_EXPORT__=ErrorBoundaryWithNarrowHeader;try{ErrorBoundaryWithNarrowHeader.displayName="ErrorBoundaryWithNarrowHeader",ErrorBoundaryWithNarrowHeader.__docgenInfo={description:"",displayName:"ErrorBoundaryWithNarrowHeader",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/ErrorBoundaryWithNarrowHeader.tsx#ErrorBoundaryWithNarrowHeader"]={docgenInfo:ErrorBoundaryWithNarrowHeader.__docgenInfo,name:"ErrorBoundaryWithNarrowHeader",path:"src/pages/ErrorBoundaryWithNarrowHeader.tsx#ErrorBoundaryWithNarrowHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/assets/logo.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/logo.9ee58604.svg"}}]);
//# sourceMappingURL=pages-post-EditPostPage-EditPostPage-stories.8a41b6b5.iframe.bundle.js.map