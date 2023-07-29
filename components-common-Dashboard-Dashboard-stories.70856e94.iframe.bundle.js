"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[4357],{"./src/components/common/Dashboard/Dashboard.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FavoriteCategory:()=>FavoriteCategory,Guest:()=>Guest,LoggedIn:()=>LoggedIn,LongCategoryList:()=>LongCategoryList,SelectedCategory:()=>SelectedCategory,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/Dashboard/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},MOCK_USER_INFO={nickname:"우아한 코끼리",postCount:4,voteCount:128,userPoint:200},MOCK_CATEGORIES=[{id:12312,name:"음식",isFavorite:!1},{id:12,name:"연애",isFavorite:!1},{id:13,name:"패션",isFavorite:!1},{id:14,name:"금융",isFavorite:!1}],MOCK_FAVORITE_CATEGORIES=[{id:12312,name:"음식",isFavorite:!1},{id:12,name:"연애",isFavorite:!0},{id:13,name:"패션",isFavorite:!0},{id:14,name:"금융",isFavorite:!1}],MOCK_LONG_CATEGORIES=[{id:12312,name:"음식",isFavorite:!1},{id:12,name:"연애",isFavorite:!0},{id:13,name:"패션",isFavorite:!0},{id:14,name:"금융",isFavorite:!1},{id:12312,name:"음식",isFavorite:!1},{id:12,name:"연애",isFavorite:!0},{id:13,name:"패션",isFavorite:!0},{id:14,name:"금융",isFavorite:!1},{id:12312,name:"음식",isFavorite:!1},{id:12,name:"연애",isFavorite:!0},{id:13,name:"패션",isFavorite:!0},{id:14,name:"금융",isFavorite:!1},{id:12312,name:"음식",isFavorite:!1},{id:12,name:"연애",isFavorite:!0},{id:13,name:"패션",isFavorite:!0},{id:14,name:"금융",isFavorite:!1},{id:12312,name:"음식",isFavorite:!1},{id:12,name:"연애",isFavorite:!0},{id:13,name:"패션",isFavorite:!0},{id:14,name:"금융",isFavorite:!1},{id:12312,name:"음식",isFavorite:!1},{id:12,name:"연애",isFavorite:!0},{id:13,name:"패션",isFavorite:!0},{id:14,name:"금융",isFavorite:!1}],LoggedIn={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{userInfo:MOCK_USER_INFO,categoryList:MOCK_CATEGORIES,handleFavoriteClick:()=>{},handleLogoutClick:()=>{}})},FavoriteCategory={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{userInfo:MOCK_USER_INFO,categoryList:MOCK_FAVORITE_CATEGORIES,handleFavoriteClick:()=>{},handleLogoutClick:()=>{}})},SelectedCategory={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{userInfo:MOCK_USER_INFO,categoryList:MOCK_FAVORITE_CATEGORIES,selectedCategory:"패션",handleFavoriteClick:()=>{},handleLogoutClick:()=>{}})},LongCategoryList={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{userInfo:MOCK_USER_INFO,categoryList:MOCK_LONG_CATEGORIES,handleFavoriteClick:()=>{},handleLogoutClick:()=>{}})},Guest={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{categoryList:MOCK_CATEGORIES,handleFavoriteClick:()=>{},handleLogoutClick:()=>{}})};LoggedIn.parameters={...LoggedIn.parameters,docs:{...LoggedIn.parameters?.docs,source:{originalSource:"{\n  render: () => <Dashboard userInfo={MOCK_USER_INFO} categoryList={MOCK_CATEGORIES} handleFavoriteClick={() => {}} handleLogoutClick={() => {}} />\n}",...LoggedIn.parameters?.docs?.source}}},FavoriteCategory.parameters={...FavoriteCategory.parameters,docs:{...FavoriteCategory.parameters?.docs,source:{originalSource:"{\n  render: () => <Dashboard userInfo={MOCK_USER_INFO} categoryList={MOCK_FAVORITE_CATEGORIES} handleFavoriteClick={() => {}} handleLogoutClick={() => {}} />\n}",...FavoriteCategory.parameters?.docs?.source}}},SelectedCategory.parameters={...SelectedCategory.parameters,docs:{...SelectedCategory.parameters?.docs,source:{originalSource:'{\n  render: () => <Dashboard userInfo={MOCK_USER_INFO} categoryList={MOCK_FAVORITE_CATEGORIES} selectedCategory="패션" handleFavoriteClick={() => {}} handleLogoutClick={() => {}} />\n}',...SelectedCategory.parameters?.docs?.source}}},LongCategoryList.parameters={...LongCategoryList.parameters,docs:{...LongCategoryList.parameters?.docs,source:{originalSource:"{\n  render: () => <Dashboard userInfo={MOCK_USER_INFO} categoryList={MOCK_LONG_CATEGORIES} handleFavoriteClick={() => {}} handleLogoutClick={() => {}} />\n}",...LongCategoryList.parameters?.docs?.source}}},Guest.parameters={...Guest.parameters,docs:{...Guest.parameters?.docs,source:{originalSource:"{\n  render: () => <Dashboard categoryList={MOCK_CATEGORIES} handleFavoriteClick={() => {}} handleLogoutClick={() => {}} />\n}",...Guest.parameters?.docs?.source}}};const __namedExportsOrder=["LoggedIn","FavoriteCategory","SelectedCategory","LongCategoryList","Guest"]},"./src/components/common/Dashboard/CategoryToggle/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CategoryToggle});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  font: var(--text-caption);

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`,TitleContainer=styled_components_browser_esm.zo.button`
  display: flex;
  align-items: center;

  font: inherit;

  cursor: pointer;
`,TriangleImage=styled_components_browser_esm.zo.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`,CategoryList=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 16px 12px;
`,CategoryItem=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
`,Circle=styled_components_browser_esm.zo.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;

  background-color: ${({$isFavorite})=>$isFavorite?"var(--primary-color)":"#CCCCCC"};

  cursor: pointer;
`,Caption=styled_components_browser_esm.zo.span`
  font: var(--text-caption);

  color: var(--dark-gray);
`,CategoryNameLink=(0,styled_components_browser_esm.zo)(dist.rU)`
  text-decoration: none;

  color: inherit;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CategoryToggle({title,categoryList,handleFavoriteClick,isInitialOpen=!0}){const[isToggleOpen,setIsToggleOpen]=(0,react.useState)(isInitialOpen);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(TitleContainer,{onClick:()=>{setIsToggleOpen((prevIsToggleOpen=>!prevIsToggleOpen))},"aria-label":isToggleOpen?`${title} 닫기`:`${title} 열기`,type:"button",children:[(0,jsx_runtime.jsx)(TriangleImage,{src:isToggleOpen?chevron_up:chevron_down,alt:""}),(0,jsx_runtime.jsx)("span",{children:title})]}),isToggleOpen&&(0,jsx_runtime.jsxs)(CategoryList,{children:[0===categoryList.length&&(0,jsx_runtime.jsx)(Caption,{children:"현재 카테고리가 없습니다"}),categoryList.map((({id,name,isFavorite})=>(0,jsx_runtime.jsxs)(CategoryItem,{children:[(0,jsx_runtime.jsx)(Circle,{title:"즐겨찾기 버튼",onClick:()=>handleFavoriteClick(id),$isFavorite:isFavorite}),(0,jsx_runtime.jsx)(CategoryNameLink,{to:`/posts/category/${id}`,children:name})]},id)))]})]})}CategoryToggle.displayName="CategoryToggle";try{CategoryToggle.displayName="CategoryToggle",CategoryToggle.__docgenInfo={description:"",displayName:"CategoryToggle",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},categoryList:{defaultValue:null,description:"",name:"categoryList",required:!0,type:{name:"Category[]"}},handleFavoriteClick:{defaultValue:null,description:"",name:"handleFavoriteClick",required:!0,type:{name:"(categoryId: number) => void"}},isInitialOpen:{defaultValue:{value:"true"},description:"",name:"isInitialOpen",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Dashboard/CategoryToggle/index.tsx#CategoryToggle"]={docgenInfo:CategoryToggle.__docgenInfo,name:"CategoryToggle",path:"src/components/common/Dashboard/CategoryToggle/index.tsx#CategoryToggle"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Dashboard/GuestProfile/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>GuestProfile});__webpack_require__("./node_modules/react/index.js");var dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),path=__webpack_require__("./src/constants/path.ts");const kakao_login_namespaceObject=__webpack_require__.p+"static/media/kakao_login.90f45a76.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),profileStyle=__webpack_require__("./src/components/common/Dashboard/profileStyle.ts");const Container=(0,styled_components_browser_esm.zo)(profileStyle.U)`
  align-items: center;
`,Image=styled_components_browser_esm.zo.img`
  width: 183px;
  height: 40px;
`,TextCard=styled_components_browser_esm.zo.span`
  margin-top: 20px;

  font: var(--text-caption);

  color: var(--dark-gray);
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function GuestProfile(){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(dist.rU,{to:path.G.LOGIN,children:(0,jsx_runtime.jsx)(Image,{src:kakao_login_namespaceObject,alt:"로그인 페이지로 이동"})}),(0,jsx_runtime.jsx)(TextCard,{children:"로그인 후 이용할 수 있습니다"})]})}GuestProfile.displayName="GuestProfile"},"./src/components/common/Dashboard/UserProfile/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>UserProfile});__webpack_require__("./node_modules/react/index.js");var path=__webpack_require__("./src/constants/path.ts"),profileStyle=__webpack_require__("./src/components/common/Dashboard/profileStyle.ts"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Badge=styled_components_browser_esm.zo.span`
  margin-bottom: 7px;
`,NickName=styled_components_browser_esm.zo.span`
  margin-bottom: 12px;

  font: var(--text-title);

  color: var(--red);
`,UserInfoContainer=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
`,TextCardContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
`,TextCardLink=(0,styled_components_browser_esm.zo)(dist.rU)`
  display: flex;
  flex-direction: column;

  text-decoration: none;

  color: initial;
`,TextCardTitle=styled_components_browser_esm.zo.span`
  font: var(--text-caption);
`,TextCardContent=styled_components_browser_esm.zo.span`
  font: var(--text-caption);
  text-align: center;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UserProfile({userInfo}){const{nickname,userPoint,postCount,voteCount,badge}=userInfo;return(0,jsx_runtime.jsxs)(profileStyle.U,{children:[badge&&(0,jsx_runtime.jsxs)(Badge,{children:["[",badge,"]"]}),(0,jsx_runtime.jsx)(NickName,{children:nickname}),(0,jsx_runtime.jsxs)(UserInfoContainer,{children:[(0,jsx_runtime.jsxs)(TextCardContainer,{children:[(0,jsx_runtime.jsx)(TextCardTitle,{children:"포인트"}),(0,jsx_runtime.jsx)(TextCardContent,{children:userPoint})]}),(0,jsx_runtime.jsxs)(TextCardLink,{to:path.m.USER_POST,children:[(0,jsx_runtime.jsx)(TextCardTitle,{children:"작성글"}),(0,jsx_runtime.jsx)(TextCardContent,{children:postCount})]}),(0,jsx_runtime.jsxs)(TextCardLink,{to:path.m.USER_VOTE,children:[(0,jsx_runtime.jsx)(TextCardTitle,{children:"투표수"}),(0,jsx_runtime.jsx)(TextCardContent,{children:voteCount})]})]})]})}UserProfile.displayName="UserProfile";try{UserProfile.displayName="UserProfile",UserProfile.__docgenInfo={description:"",displayName:"UserProfile",props:{userInfo:{defaultValue:null,description:"",name:"userInfo",required:!0,type:{name:"User"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Dashboard/UserProfile/index.tsx#UserProfile"]={docgenInfo:UserProfile.__docgenInfo,name:"UserProfile",path:"src/components/common/Dashboard/UserProfile/index.tsx#UserProfile"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Dashboard/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Dashboard});__webpack_require__("./node_modules/react/index.js");var SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),CategoryToggle=__webpack_require__("./src/components/common/Dashboard/CategoryToggle/index.tsx"),GuestProfile=__webpack_require__("./src/components/common/Dashboard/GuestProfile/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 225px;
  height: 100vh;
  padding: 20px;
  border-right: 2px solid var(--gray);

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: 100%;
  }
`,ContentContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  width: 100%;
  margin-bottom: 85px;

  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`,ButtonWrapper=styled_components_browser_esm.zo.div`
  width: 90px;
  height: 40px;

  position: absolute;
  bottom: 30px;
`,SelectCategoryWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-self: start;

  width: 100%;
  border-bottom: 2px solid var(--gray);
  padding-bottom: 20px;
  margin-top: 32px;
`,Circle=styled_components_browser_esm.zo.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;

  background-color: var(--red);
`,SelectCategoryText=styled_components_browser_esm.zo.span`
  font: var(--text-body);
`,CategoryToggleContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding-top: 20px;
`;var UserProfile=__webpack_require__("./src/components/common/Dashboard/UserProfile/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Dashboard({userInfo,categoryList,selectedCategory="전체",handleFavoriteClick,handleLogoutClick}){const favoriteCategory=categoryList.filter((category=>!0===category.isFavorite)),allCategory=categoryList.filter((category=>!1===category.isFavorite));return(0,jsx_runtime.jsxs)(Container,{children:[userInfo?(0,jsx_runtime.jsx)(UserProfile.Z,{userInfo}):(0,jsx_runtime.jsx)(GuestProfile.Z,{}),(0,jsx_runtime.jsxs)(SelectCategoryWrapper,{children:[(0,jsx_runtime.jsx)(Circle,{}),(0,jsx_runtime.jsx)(SelectCategoryText,{children:selectedCategory})]}),(0,jsx_runtime.jsx)(ContentContainer,{children:(0,jsx_runtime.jsxs)(CategoryToggleContainer,{children:[userInfo&&(0,jsx_runtime.jsx)(CategoryToggle.Z,{title:"즐겨찾기",categoryList:favoriteCategory,handleFavoriteClick}),(0,jsx_runtime.jsx)(CategoryToggle.Z,{title:"카테고리 모아보기",categoryList:allCategory,handleFavoriteClick})]})}),userInfo&&(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"blank",onClick:handleLogoutClick,children:"로그아웃"})})]})}Dashboard.displayName="Dashboard";try{Dashboard.displayName="Dashboard",Dashboard.__docgenInfo={description:"",displayName:"Dashboard",props:{categoryList:{defaultValue:null,description:"",name:"categoryList",required:!0,type:{name:"Category[]"}},selectedCategory:{defaultValue:{value:"전체"},description:"",name:"selectedCategory",required:!1,type:{name:"string"}},handleFavoriteClick:{defaultValue:null,description:"",name:"handleFavoriteClick",required:!0,type:{name:"(categoryId: number) => void"}},handleLogoutClick:{defaultValue:null,description:"",name:"handleLogoutClick",required:!0,type:{name:"() => void"}},userInfo:{defaultValue:null,description:"",name:"userInfo",required:!1,type:{name:"User"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Dashboard/index.tsx#Dashboard"]={docgenInfo:Dashboard.__docgenInfo,name:"Dashboard",path:"src/components/common/Dashboard/index.tsx#Dashboard"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Dashboard/profileStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>ProfileContainer});const ProfileContainer=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
  display: flex;
  flex-direction: column;
  justify-content: end;

  width: 100%;
  height: 130px;
  padding: 16px 12px;
  border-radius: 4px;

  font: var(--text-body);

  background-color: var(--gray);
`},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  display: block;

  width: 100%;
  height: 100%;
  border: 2px solid var(--primary-color);
  border-radius: 5px;

  background-color: ${props=>"blank"===props.theme?"rgba(0,0,0,0)":"var(--primary-color)"};
  color: ${props=>"blank"===props.theme?"var(--primary-color)":"var(--white)"};

  font: var(--text-body);

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/path.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>BASE_PATH,m:()=>PATH});const BASE_PATH={HOME:"/",LANDING:"/landing",LOGIN:"/login",POST:"/posts",USER:"/users",ADMIN:"/admin",SEARCH:"/search"},PATH={...BASE_PATH,POST_WRITE:`${BASE_PATH.POST}/write`,POST_VOTE_RESULT:`${BASE_PATH.POST}/result`,POST_CATEGORY:`${BASE_PATH.POST}/category`,USER_POST:`${BASE_PATH.USER}/posts`,USER_VOTE:`${BASE_PATH.USER}/votes`,USER_INFO:`${BASE_PATH.USER}/myPage`}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});const theme={breakpoint:{sm:"576px",md:"960px",lg:"1440px"},zIndex:{header:100,modal:200}}},"./src/assets/chevron-down.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-down.f97a5bb1.svg"},"./src/assets/chevron-up.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-up.a1eb858b.svg"}}]);
//# sourceMappingURL=components-common-Dashboard-Dashboard-stories.70856e94.iframe.bundle.js.map