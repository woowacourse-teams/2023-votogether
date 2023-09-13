"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[144],{"./src/components/common/Dashboard/UserProfile/UserProfile.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Badge:()=>Badge,NoBadge:()=>NoBadge,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/Dashboard/UserProfile/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},MOCK_USER_INFO={nickname:"우아한 코끼리",gender:"MALE",birthYear:1989,postCount:4,voteCount:128},NoBadge={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{userInfo:MOCK_USER_INFO})},Badge={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{userInfo:MOCK_USER_INFO})};NoBadge.parameters={...NoBadge.parameters,docs:{...NoBadge.parameters?.docs,source:{originalSource:"{\n  render: () => <UserProfile userInfo={MOCK_USER_INFO} />\n}",...NoBadge.parameters?.docs?.source}}},Badge.parameters={...Badge.parameters,docs:{...Badge.parameters?.docs,source:{originalSource:"{\n  render: () => <UserProfile userInfo={MOCK_USER_INFO} />\n}",...Badge.parameters?.docs?.source}}};const __namedExportsOrder=["NoBadge","Badge"]},"./src/components/common/Dashboard/UserProfile/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>UserProfile});var path=__webpack_require__("./src/constants/path.ts"),profileStyle=__webpack_require__("./src/components/common/Dashboard/profileStyle.ts"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");styled_components_browser_esm.zo.span`
  margin-bottom: 7px;
`;const NickName=styled_components_browser_esm.zo.span`
  margin-bottom: 12px;
  margin-left: 5px;

  font: var(--text-title);

  color: var(--red);
`,UserInfoContainer=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-around;
`,TextCardLink=(styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
`,(0,styled_components_browser_esm.zo)(dist.rU)`
  display: flex;
  flex-direction: column;

  text-decoration: none;

  color: initial;
`),TextCardTitle=styled_components_browser_esm.zo.span`
  font: var(--text-caption);
`,TextCardContent=styled_components_browser_esm.zo.span`
  font: var(--text-caption);
  text-align: center;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UserProfile({userInfo}){const{nickname,postCount,voteCount}=userInfo;return(0,jsx_runtime.jsxs)(profileStyle.U,{role:"region","aria-label":"회원 프로필",children:[(0,jsx_runtime.jsx)(NickName,{children:nickname}),(0,jsx_runtime.jsxs)(UserInfoContainer,{children:[(0,jsx_runtime.jsxs)(TextCardLink,{to:path.m.USER_POST,children:[(0,jsx_runtime.jsx)(TextCardTitle,{children:"작성글"}),(0,jsx_runtime.jsx)(TextCardContent,{children:postCount})]}),(0,jsx_runtime.jsxs)(TextCardLink,{to:path.m.USER_VOTE,children:[(0,jsx_runtime.jsx)(TextCardTitle,{children:"투표수"}),(0,jsx_runtime.jsx)(TextCardContent,{children:voteCount})]})]})]})}UserProfile.displayName="UserProfile";try{UserProfile.displayName="UserProfile",UserProfile.__docgenInfo={description:"",displayName:"UserProfile",props:{userInfo:{defaultValue:null,description:"",name:"userInfo",required:!0,type:{name:"User"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Dashboard/UserProfile/index.tsx#UserProfile"]={docgenInfo:UserProfile.__docgenInfo,name:"UserProfile",path:"src/components/common/Dashboard/UserProfile/index.tsx#UserProfile"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Dashboard/profileStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>ProfileContainer});const ProfileContainer=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 100%;
  height: 130px;
  padding: 16px 12px;
  border-radius: 4px;

  font: var(--text-body);

  background-color: var(--gray);
`},"./src/constants/path.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>BASE_PATH,m:()=>PATH});const BASE_PATH={HOME:"/",LANDING:"/landing",LOGIN:"/login",POST:"/posts",USER:"/users",ADMIN:"/admin",SEARCH:"/search",RANKING:"/ranking",ANNOUNCEMENT:"/announcements"},PATH={...BASE_PATH,POST_WRITE:`${BASE_PATH.POST}/write`,POST_VOTE_RESULT:`${BASE_PATH.POST}/result`,POST_CATEGORY:`${BASE_PATH.POST}/category`,USER_POST:`${BASE_PATH.USER}/posts`,USER_VOTE:`${BASE_PATH.USER}/votes`,USER_INFO:`${BASE_PATH.USER}/myPage`,USER_INFO_REGISTER:`${BASE_PATH.USER}/register`}}}]);
//# sourceMappingURL=components-common-Dashboard-UserProfile-UserProfile-stories.0744248e.iframe.bundle.js.map