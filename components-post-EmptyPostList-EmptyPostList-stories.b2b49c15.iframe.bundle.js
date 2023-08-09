"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[4356],{"./src/components/post/EmptyPostList/EmptyPostList.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AllKeyword:()=>AllKeyword,ClosedKeyword:()=>ClosedKeyword,Default:()=>Default,ProgressKeyword:()=>ProgressKeyword,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/post/EmptyPostList/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{status:"all"})},AllKeyword={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{status:"all",keyword:"갤럭시"})},ClosedKeyword={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{status:"closed",keyword:"갤럭시"})},ProgressKeyword={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{status:"progress",keyword:"갤럭시"})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  render: () => <EmptyPostList status="all" />\n}',...Default.parameters?.docs?.source}}},AllKeyword.parameters={...AllKeyword.parameters,docs:{...AllKeyword.parameters?.docs,source:{originalSource:'{\n  render: () => <EmptyPostList status="all" keyword="갤럭시" />\n}',...AllKeyword.parameters?.docs?.source}}},ClosedKeyword.parameters={...ClosedKeyword.parameters,docs:{...ClosedKeyword.parameters?.docs,source:{originalSource:'{\n  render: () => <EmptyPostList status="closed" keyword="갤럭시" />\n}',...ClosedKeyword.parameters?.docs?.source}}},ProgressKeyword.parameters={...ProgressKeyword.parameters,docs:{...ProgressKeyword.parameters?.docs,source:{originalSource:'{\n  render: () => <EmptyPostList status="progress" keyword="갤럭시" />\n}',...ProgressKeyword.parameters?.docs?.source}}};const __namedExportsOrder=["Default","AllKeyword","ClosedKeyword","ProgressKeyword"]},"./src/components/post/EmptyPostList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>EmptyPostList});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 30px;
`,Title=styled_components_browser_esm.zo.span`
  font: var(--text-body);
  font-weight: 600;

  @media (min-width: ${theme.r.breakpoint.md}) {
    font: var(--text-subtitle);
  }
`,Keyword=(0,styled_components_browser_esm.zo)(Title)`
  color: #ff3c3c;
`,TextCardContainer=styled_components_browser_esm.zo.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 30px 15px;

  font: var(--text-caption);

  @media (min-width: ${theme.r.breakpoint.md}) {
    font: var(--text-body);
  }
`,TextCard=styled_components_browser_esm.zo.li`
  list-style: disc;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function EmptyPostList({keyword,status}){return keyword?(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)("div",{children:["all"!==status&&(0,jsx_runtime.jsx)(Title,{children:"현재 조건에는"}),(0,jsx_runtime.jsxs)(Keyword,{children:["'",keyword,"'"]}),(0,jsx_runtime.jsx)(Title,{children:"와(과) 일치하는 검색결과가 없습니다."})]}),(0,jsx_runtime.jsxs)(TextCardContainer,{children:["all"!==status&&(0,jsx_runtime.jsx)(TextCard,{children:"전체 옵션으로 사용해보세요."}),(0,jsx_runtime.jsx)(TextCard,{children:"모든 단어의 철자가 정확한지 확인하세요."}),(0,jsx_runtime.jsx)(TextCard,{children:"다른 검색어를 사용해 보세요."}),(0,jsx_runtime.jsx)(TextCard,{children:"더 일반적인 검색어를 사용해 보세요."}),(0,jsx_runtime.jsx)(TextCard,{children:"키워드 수를 줄여보세요."})]})]}):(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsx)(Title,{children:"해당 되는 조건의 게시글이 없습니다."})})}EmptyPostList.displayName="EmptyPostList";try{EmptyPostList.displayName="EmptyPostList",EmptyPostList.__docgenInfo={description:"",displayName:"EmptyPostList",props:{status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:"enum",value:[{value:'"all"'},{value:'"progress"'},{value:'"closed"'}]}},keyword:{defaultValue:null,description:"",name:"keyword",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/post/EmptyPostList/index.tsx#EmptyPostList"]={docgenInfo:EmptyPostList.__docgenInfo,name:"EmptyPostList",path:"src/components/post/EmptyPostList/index.tsx#EmptyPostList"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{header:100,modal:200}}}}]);
//# sourceMappingURL=components-post-EmptyPostList-EmptyPostList-stories.b2b49c15.iframe.bundle.js.map