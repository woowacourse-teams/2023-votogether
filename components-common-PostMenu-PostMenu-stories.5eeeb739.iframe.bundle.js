"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[5089],{"./src/components/common/PostMenu/PostMenu.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/PostMenu/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},menuList=[{color:"black",content:"닉네임 신고",action:"NICKNAME_REPORT"},{color:"black",content:"게시글 신고",action:"POST_REPORT"}],Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{menuList,handleMenuClick:()=>{}})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <PostMenu menuList={menuList} handleMenuClick={() => {}} />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/PostMenu/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PostMenu});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const COLOR_PALETTE={red:"var(--primary-color)",black:"#727171"},Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function PostMenu({menuList,handleMenuClick}){return(0,jsx_runtime.jsx)(Container,{children:menuList.map((({content,color,action})=>(0,jsx_runtime.jsx)(Menu,{type:"button",$color:color,onClick:event=>{event.stopPropagation(),handleMenuClick(action)},children:content},content)))})}PostMenu.displayName="PostMenu";try{PostMenu.displayName="PostMenu",PostMenu.__docgenInfo={description:"",displayName:"PostMenu",props:{menuList:{defaultValue:null,description:"",name:"menuList",required:!0,type:{name:"PostMenuItem[]"}},handleMenuClick:{defaultValue:null,description:"",name:"handleMenuClick",required:!0,type:{name:"(menu: PostAction) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/PostMenu/index.tsx#PostMenu"]={docgenInfo:PostMenu.__docgenInfo,name:"PostMenu",path:"src/components/common/PostMenu/index.tsx#PostMenu"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-common-PostMenu-PostMenu-stories.5eeeb739.iframe.bundle.js.map