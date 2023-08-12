"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[1660],{"./src/components/common/Layout/Layout.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{HiddenCategory:()=>HiddenCategory,VisibleCategory:()=>VisibleCategory,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Skeleton__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/Skeleton/index.tsx"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Layout/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_1__.Z},VisibleCategory={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.Z,{isSidebarVisible:!0,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1})]})},HiddenCategory={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.Z,{isSidebarVisible:!1,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Skeleton__WEBPACK_IMPORTED_MODULE_0__.Z,{isLarge:!1})]})};VisibleCategory.parameters={...VisibleCategory.parameters,docs:{...VisibleCategory.parameters?.docs,source:{originalSource:"{\n  render: () => <Layout isSidebarVisible={true}>\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n    </Layout>\n}",...VisibleCategory.parameters?.docs?.source}}},HiddenCategory.parameters={...HiddenCategory.parameters,docs:{...HiddenCategory.parameters?.docs,source:{originalSource:"{\n  render: () => <Layout isSidebarVisible={false}>\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n      <Skeleton isLarge={false} />\n    </Layout>\n}",...HiddenCategory.parameters?.docs?.source}}};const __namedExportsOrder=["VisibleCategory","HiddenCategory"]},"./src/components/common/Layout/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Layout});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),Dashboard=__webpack_require__("./src/components/common/Dashboard/index.tsx"),WideHeader=__webpack_require__("./src/components/common/WideHeader/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SearchBar({size,...rest}){return(0,jsx_runtime.jsxs)(Form,{size,...rest,action:path.m.SEARCH,children:[(0,jsx_runtime.jsx)(Input,{type:"search",name:post.Kn}),(0,jsx_runtime.jsx)(Button,{type:"submit",children:(0,jsx_runtime.jsx)("img",{src:search_black_namespaceObject,alt:"검색버튼"})})]})}SearchBar.displayName="SearchBar";try{SearchBar.displayName="SearchBar",SearchBar.__docgenInfo={description:"",displayName:"SearchBar",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SearchBar/index.tsx#SearchBar"]={docgenInfo:SearchBar.__docgenInfo,name:"SearchBar",path:"src/components/common/SearchBar/index.tsx#SearchBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/WideHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WideHeader});var LogoButton=__webpack_require__("./src/components/common/LogoButton/index.tsx"),SearchBar=__webpack_require__("./src/components/common/SearchBar/index.tsx");const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WideHeader({handleLogoClick}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(LogoButton.Z,{content:"full",onClick:handleLogoClick}),(0,jsx_runtime.jsx)(SearchBar.Z,{size:"sm"})]})}WideHeader.displayName="WideHeader";try{WideHeader.displayName="WideHeader",WideHeader.__docgenInfo={description:"",displayName:"WideHeader",props:{handleLogoClick:{defaultValue:null,description:"",name:"handleLogoClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/WideHeader/index.tsx#WideHeader"]={docgenInfo:WideHeader.__docgenInfo,name:"WideHeader",path:"src/components/common/WideHeader/index.tsx#WideHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/assets/logo.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/logo.9ee58604.svg"}}]);
//# sourceMappingURL=components-common-Layout-Layout-stories.811f36b5.iframe.bundle.js.map