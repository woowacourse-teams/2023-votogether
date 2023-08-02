"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[1660],{"./src/components/common/Layout/Layout.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{HiddenCategory:()=>HiddenCategory,VisibleCategory:()=>VisibleCategory,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Skeleton__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/Skeleton/index.tsx"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Layout/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_1__.Z},VisibleCategory={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.Z,{isSidebarVisible:!0,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{})]})},HiddenCategory={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.Z,{isSidebarVisible:!1,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{})]})};VisibleCategory.parameters={...VisibleCategory.parameters,docs:{...VisibleCategory.parameters?.docs,source:{originalSource:"{\n  render: () => <Layout isSidebarVisible={true}>\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n    </Layout>\n}",...VisibleCategory.parameters?.docs?.source}}},HiddenCategory.parameters={...HiddenCategory.parameters,docs:{...HiddenCategory.parameters?.docs,source:{originalSource:"{\n  render: () => <Layout isSidebarVisible={false}>\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n    </Layout>\n}",...HiddenCategory.parameters?.docs?.source}}};const __namedExportsOrder=["VisibleCategory","HiddenCategory"]},"./src/components/common/Layout/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Layout});var react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),Dashboard=__webpack_require__("./src/components/common/Dashboard/index.tsx"),WideHeader=__webpack_require__("./src/components/common/WideHeader/index.tsx");const MOCK_FAVORITE_CATEGORIES=[{id:12312,name:"음식",isFavorite:!1},{id:12,name:"연애",isFavorite:!0},{id:13,name:"패션",isFavorite:!0},{id:14,name:"금융",isFavorite:!1}];var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Layout({children,isSidebarVisible}){const navigate=(0,dist.s0)(),{loggedInfo}=(0,react.useContext)(auth.V),categoryList=MOCK_FAVORITE_CATEGORIES;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(WideHeaderWrapper,{children:(0,jsx_runtime.jsx)(WideHeader.Z,{handleLogoClick:()=>{navigate("/")}})}),(0,jsx_runtime.jsxs)(ContentContainer,{children:[isSidebarVisible&&(0,jsx_runtime.jsx)(DashboardWrapper,{children:(0,jsx_runtime.jsx)(Dashboard.Z,{userInfo:loggedInfo.userInfo,categoryList,selectedCategory:undefined,handleLogoutClick:()=>{}})}),(0,jsx_runtime.jsx)(MainContainer,{$isSidebarVisible:isSidebarVisible,children:(0,jsx_runtime.jsx)(ChildrenWrapper,{$isSidebarVisible:isSidebarVisible,children})})]})]})}Layout.displayName="Layout";try{Layout.displayName="Layout",Layout.__docgenInfo={description:"",displayName:"Layout",props:{isSidebarVisible:{defaultValue:null,description:"",name:"isSidebarVisible",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Layout/index.tsx#Layout"]={docgenInfo:Layout.__docgenInfo,name:"Layout",path:"src/components/common/Layout/index.tsx#Layout"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SearchBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SearchBar});var path=__webpack_require__("./src/constants/path.ts"),post=__webpack_require__("./src/constants/post.ts");const search_black_namespaceObject=__webpack_require__.p+"static/media/search_black.af78e45d.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const formSize={sm:"170px",md:"250px",lg:"400px"},Form=styled_components_browser_esm.zo.form`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SearchBar({size,...rest}){return(0,jsx_runtime.jsxs)(Form,{size,...rest,action:path.m.SEARCH,children:[(0,jsx_runtime.jsx)(Input,{type:"search",name:post.Kn}),(0,jsx_runtime.jsx)(Button,{type:"submit",children:(0,jsx_runtime.jsx)("img",{src:search_black_namespaceObject,alt:"검색버튼"})})]})}SearchBar.displayName="SearchBar";try{SearchBar.displayName="SearchBar",SearchBar.__docgenInfo={description:"",displayName:"SearchBar",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SearchBar/index.tsx#SearchBar"]={docgenInfo:SearchBar.__docgenInfo,name:"SearchBar",path:"src/components/common/SearchBar/index.tsx#SearchBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Skeleton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Skeleton});__webpack_require__("./node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const skeletonGradient=styled_components_browser_esm.F4`
    0% {
        background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
        background-color: rgba(165, 165, 165, 0.3);
    }
    
    100% {
        background-color: rgba(165, 165, 165, 0.1);
    }
`,Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 9px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    gap: 12px;
  }
`,Box=styled_components_browser_esm.zo.div`
  border-radius: 4px;

  -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
  animation: ${skeletonGradient} 1.8s infinite ease-in-out;
`,FirstBox=(0,styled_components_browser_esm.zo)(Box)`
  height: 110px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: 140px;
  }
`,SecondBox=(0,styled_components_browser_esm.zo)(Box)`
  height: 20px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: 30px;
  }
`,ThirdBox=(0,styled_components_browser_esm.zo)(Box)`
  height: 10px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: 15px;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Skeleton(){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(FirstBox,{}),(0,jsx_runtime.jsx)(SecondBox,{}),(0,jsx_runtime.jsx)(ThirdBox,{})]})}Skeleton.displayName="Skeleton"},"./src/components/common/WideHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WideHeader});var LogoButton=__webpack_require__("./src/components/common/LogoButton/index.tsx"),SearchBar=__webpack_require__("./src/components/common/SearchBar/index.tsx");const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WideHeader({handleLogoClick}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(LogoButton.Z,{content:"full",onClick:handleLogoClick}),(0,jsx_runtime.jsx)(SearchBar.Z,{size:"sm"})]})}WideHeader.displayName="WideHeader";try{WideHeader.displayName="WideHeader",WideHeader.__docgenInfo={description:"",displayName:"WideHeader",props:{handleLogoClick:{defaultValue:null,description:"",name:"handleLogoClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/WideHeader/index.tsx#WideHeader"]={docgenInfo:WideHeader.__docgenInfo,name:"WideHeader",path:"src/components/common/WideHeader/index.tsx#WideHeader"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-common-Layout-Layout-stories.1d4f35ce.iframe.bundle.js.map