"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[3784],{"./src/components/comment/CommentList/CommentItem/CommentMenu/CommentMenu.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NotWriterUser:()=>NotWriterUser,WriterUser:()=>WriterUser,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _constants__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/comment/CommentList/constants.ts"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/comment/CommentList/CommentItem/CommentMenu/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_1__.Z},WriterUser={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{menuList:_constants__WEBPACK_IMPORTED_MODULE_0__.H4.WRITER,handleMenuClick:()=>{}})},NotWriterUser={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{menuList:_constants__WEBPACK_IMPORTED_MODULE_0__.H4.NOT_WRITER,handleMenuClick:()=>{}})};WriterUser.parameters={...WriterUser.parameters,docs:{...WriterUser.parameters?.docs,source:{originalSource:"{\n  render: () => <CommentMenu menuList={COMMENT_MENU.WRITER} handleMenuClick={() => {}} />\n}",...WriterUser.parameters?.docs?.source}}},NotWriterUser.parameters={...NotWriterUser.parameters,docs:{...NotWriterUser.parameters?.docs,source:{originalSource:"{\n  render: () => <CommentMenu menuList={COMMENT_MENU.NOT_WRITER} handleMenuClick={() => {}} />\n}",...NotWriterUser.parameters?.docs?.source}}};const __namedExportsOrder=["WriterUser","NotWriterUser"]},"./src/components/comment/CommentList/CommentItem/CommentMenu/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentMenu});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const COLOR_PALETTE={red:"var(--primary-color)",black:"#727171"},Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentMenu({menuList,handleMenuClick}){return(0,jsx_runtime.jsx)(Container,{children:menuList.map((({content,color,action})=>(0,jsx_runtime.jsx)(Menu,{type:"button",tabIndex:0,"aria-label":`댓글 ${content}`,$color:color,onClick:event=>{event.stopPropagation(),handleMenuClick(action)},children:content},content)))})}CommentMenu.displayName="CommentMenu";try{CommentMenu.displayName="CommentMenu",CommentMenu.__docgenInfo={description:"",displayName:"CommentMenu",props:{menuList:{defaultValue:null,description:"",name:"menuList",required:!0,type:{name:"CommentMenuItem[]"}},handleMenuClick:{defaultValue:null,description:"",name:"handleMenuClick",required:!0,type:{name:"(menu: CommentAction) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentList/CommentItem/CommentMenu/index.tsx#CommentMenu"]={docgenInfo:CommentMenu.__docgenInfo,name:"CommentMenu",path:"src/components/comment/CommentList/CommentItem/CommentMenu/index.tsx#CommentMenu"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/comment/CommentList/constants.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{GD:()=>COMMENT_USER,H4:()=>COMMENT_MENU,PB:()=>COMMENT_USER_MENU,_d:()=>COMMENT_ACTION});const COMMENT_USER={GUEST:"GUEST",NOT_WRITER:"NOT_WRITER",WRITER:"WRITER"},COMMENT_ACTION={DELETE:"delete",USER_REPORT:"userReport",COMMENT_REPORT:"commentReport",EDIT:"edit"},COMMENT_USER_MENU={[COMMENT_USER.GUEST]:COMMENT_USER.NOT_WRITER,[COMMENT_USER.NOT_WRITER]:COMMENT_USER.NOT_WRITER,[COMMENT_USER.WRITER]:COMMENT_USER.WRITER},COMMENT_MENU={[COMMENT_USER.NOT_WRITER]:[{color:"black",content:"닉네임 신고",action:COMMENT_ACTION.USER_REPORT},{color:"black",content:"댓글 신고",action:COMMENT_ACTION.COMMENT_REPORT}],[COMMENT_USER.WRITER]:[{content:"수정",color:"black",action:COMMENT_ACTION.EDIT},{content:"삭제",color:"red",action:COMMENT_ACTION.DELETE}]}}}]);
//# sourceMappingURL=components-comment-CommentList-CommentItem-CommentMenu-CommentMenu-stories.eb3141aa.iframe.bundle.js.map