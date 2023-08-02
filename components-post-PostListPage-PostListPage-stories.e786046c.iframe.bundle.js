"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[6423],{"./src/components/post/PostListPage/PostListPage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>PostListPage_stories});var react=__webpack_require__("./node_modules/react/index.js"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),queryObserver=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/queryObserver.mjs"),useBaseQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useBaseQuery.mjs");function useQuery(arg1,arg2,arg3){const parsedOptions=(0,utils._v)(arg1,arg2,arg3);return(0,useBaseQuery.r)(parsedOptions,queryObserver.z)}var categoryList=__webpack_require__("./src/api/wus/categoryList.ts"),queryKey=__webpack_require__("./src/constants/queryKey.ts");const useCategoryList=isLoggedIn=>{const{data,error,isLoading,isError}=useQuery([queryKey.l.CATEGORIES],isLoggedIn?categoryList.a$:categoryList.kD);return{data,error,isLoading,isError}};var fetch=__webpack_require__("./src/utils/fetch.ts");const BASE_URL="MISSING_ENV_VAR".VOTOGETHER_MOCKING_URL,getUserInfo=async()=>(userInfo=>{const{nickname,postCount,userPoint,voteCount,badge}=userInfo;return{nickname,postCount,userPoint,voteCount,badge}})(await(0,fetch.wY)(`${BASE_URL}/members/me`));var useDrawer=__webpack_require__("./src/hooks/useDrawer.tsx"),AddButton=__webpack_require__("./src/components/common/AddButton/index.tsx"),Dashboard=__webpack_require__("./src/components/common/Dashboard/index.tsx"),Drawer=__webpack_require__("./src/components/common/Drawer/index.tsx"),NarrowMainHeader=__webpack_require__("./src/components/common/NarrowMainHeader/index.tsx"),Skeleton=__webpack_require__("./src/components/common/Skeleton/index.tsx"),UpButton=__webpack_require__("./src/components/common/UpButton/index.tsx"),PostList=__webpack_require__("./src/components/post/PostList/index.tsx"),path=__webpack_require__("./src/constants/path.ts"),scrollToTop=__webpack_require__("./src/utils/scrollToTop.ts"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  padding-top: 55px;
  position: relative;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    padding-top: 0px;
  }
`,HeaderWrapper=styled_components_browser_esm.zo.div`
  width: 100%;

  position: fixed;
  top: 0;

  z-index: ${theme.r.zIndex.header};

  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: none;
    visibility: hidden;
  }
`,DrawerWrapper=styled_components_browser_esm.zo.div`
  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: none;
    visibility: hidden;
  }
`,ButtonContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 20px;

  position: sticky;
  bottom: 24px;
`,AddButtonWrapper=(0,styled_components_browser_esm.zo)(dist.rU)`
  text-decoration: none;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function PostListPage(){const{drawerRef,closeDrawer,openDrawer}=(0,useDrawer.y)("left"),{data:categoryList}=useCategoryList(!0),{data:userInfo}=(()=>{const{data,error,isLoading,isError}=useQuery([queryKey.l.USER_INFO],getUserInfo);return{data,error,isLoading,isError}})();return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(HeaderWrapper,{children:(0,jsx_runtime.jsx)(NarrowMainHeader.Z,{handleMenuOpenClick:openDrawer})}),(0,jsx_runtime.jsx)(DrawerWrapper,{children:(0,jsx_runtime.jsx)(Drawer.Z,{handleDrawerClose:closeDrawer,placement:"left",width:"225px",ref:drawerRef,children:(0,jsx_runtime.jsx)(Dashboard.Z,{userInfo,categoryList:categoryList??[],handleLogoutClick:()=>{}})})}),(0,jsx_runtime.jsx)(react.Suspense,{fallback:(0,jsx_runtime.jsx)(Skeleton.Z,{}),children:(0,jsx_runtime.jsx)(PostList.Z,{})}),(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(UpButton.Z,{onClick:scrollToTop.k}),(0,jsx_runtime.jsx)(AddButtonWrapper,{to:path.m.POST_WRITE,children:(0,jsx_runtime.jsx)(AddButton.Z,{size:"lg"})})]})]})}PostListPage.displayName="PostListPage";const PostListPage_stories={component:PostListPage},Default={render:()=>(0,jsx_runtime.jsx)(PostListPage,{})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <PostListPage />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/AddButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>AddButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:{button:"25px",font:"13px"},md:{button:"40px",font:"30px"},lg:{button:"60px",font:"50px"}},Button=styled_components_browser_esm.zo.button`
  display: block;

  width: ${props=>SIZE[props.size].button};
  height: ${props=>SIZE[props.size].button};
  border-radius: 50%;

  background-color: var(--primary-color);
  color: var(--white);

  font-size: ${props=>SIZE[props.size].font};

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function AddButton({size,...rest}){return(0,jsx_runtime.jsx)(Button,{size,"aria-label":"더하기",...rest,children:"+"})}AddButton.displayName="AddButton";try{AddButton.displayName="AddButton",AddButton.__docgenInfo={description:"",displayName:"AddButton",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/AddButton/index.tsx#AddButton"]={docgenInfo:AddButton.__docgenInfo,name:"AddButton",path:"src/components/common/AddButton/index.tsx#AddButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/UpButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>UpButton});__webpack_require__("./node_modules/react/index.js");const chevron_up_primary_namespaceObject=__webpack_require__.p+"static/media/chevron_up_primary.2a8f784f.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  width: 60px;
  height: 60px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;

  background-color: var(--white);

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UpButton({...rest}){return(0,jsx_runtime.jsx)(Button,{...rest,children:(0,jsx_runtime.jsx)("img",{src:chevron_up_primary_namespaceObject,alt:""})})}UpButton.displayName="UpButton";try{UpButton.displayName="UpButton",UpButton.__docgenInfo={description:"",displayName:"UpButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/UpButton/index.tsx#UpButton"]={docgenInfo:UpButton.__docgenInfo,name:"UpButton",path:"src/components/common/UpButton/index.tsx#UpButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/scrollToTop.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>scrollToTop});const scrollToTop=()=>{window.scroll({top:0,behavior:"smooth"})}}}]);
//# sourceMappingURL=components-post-PostListPage-PostListPage-stories.e786046c.iframe.bundle.js.map