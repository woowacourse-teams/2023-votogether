"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[5771],{"./node_modules/@tanstack/react-query/build/lib/useQuery.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>useQuery});var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),_tanstack_query_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/queryObserver.mjs"),_useBaseQuery_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useBaseQuery.mjs");function useQuery(arg1,arg2,arg3){const parsedOptions=(0,_tanstack_query_core__WEBPACK_IMPORTED_MODULE_0__._v)(arg1,arg2,arg3);return(0,_useBaseQuery_mjs__WEBPACK_IMPORTED_MODULE_1__.r)(parsedOptions,_tanstack_query_core__WEBPACK_IMPORTED_MODULE_2__.z)}},"./src/api/categoryList.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{CM:()=>addFavoriteCategory,a$:()=>getUserCategoryList,kD:()=>getGuestCategoryList,xh:()=>removeFavoriteCategory});var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/fetch.ts");const transformCategoryListResponse=categoryList=>categoryList.map((category=>({id:category.id,name:category.name,isFavorite:category.favorite}))),getUserCategoryList=async()=>{const categoryList=await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)("/categories");return transformCategoryListResponse(categoryList)},getGuestCategoryList=async()=>{const categoryList=await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)("/categories/guest");return transformCategoryListResponse(categoryList)},addFavoriteCategory=async categoryId=>{await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.ZL)(`/categories/${categoryId}/like`,"")},removeFavoriteCategory=async categoryId=>{await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.Wq)(`/categories/${categoryId}/like`)}},"./src/components/common/Dashboard/CategoryToggle/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CategoryToggle});var react=__webpack_require__("./node_modules/react/index.js"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),categoryList=__webpack_require__("./src/api/categoryList.ts"),queryKey=__webpack_require__("./src/constants/queryKey.ts");const useCategoryFavoriteToggle=()=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isLoading,isError,error}=(0,useMutation.D)((({id,isFavorite})=>isFavorite?(0,categoryList.xh)(id):(0,categoryList.CM)(id)),{onSuccess:()=>{queryClient.invalidateQueries([queryKey.l.CATEGORIES,"favorite"])},onError:error=>{window.console.log("Category favorite toggle error",error)}});return{mutate,isLoading,isError,error}};var chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CategoryToggle({title,categoryList,isInitialOpen=!0}){const[isToggleOpen,setIsToggleOpen]=(0,react.useState)(isInitialOpen),{mutate}=useCategoryFavoriteToggle();return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(TitleContainer,{onClick:()=>{setIsToggleOpen((prevIsToggleOpen=>!prevIsToggleOpen))},"aria-label":isToggleOpen?`${title} 닫기`:`${title} 열기`,type:"button",children:[(0,jsx_runtime.jsx)(TriangleImage,{src:isToggleOpen?chevron_up:chevron_down,alt:""}),(0,jsx_runtime.jsx)("span",{children:title})]}),isToggleOpen&&(0,jsx_runtime.jsxs)(CategoryList,{children:[0===categoryList.length&&(0,jsx_runtime.jsx)(Caption,{children:"현재 카테고리가 없습니다"}),categoryList.map((({id,name,isFavorite})=>(0,jsx_runtime.jsxs)(CategoryItem,{children:[(0,jsx_runtime.jsx)(Circle,{title:"즐겨찾기 버튼",onClick:()=>mutate({id,isFavorite}),$isFavorite:isFavorite}),(0,jsx_runtime.jsx)(CategoryNameLink,{to:`/posts/category/${id}`,children:name})]},id)))]})]})}CategoryToggle.displayName="CategoryToggle";try{CategoryToggle.displayName="CategoryToggle",CategoryToggle.__docgenInfo={description:"",displayName:"CategoryToggle",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},categoryList:{defaultValue:null,description:"",name:"categoryList",required:!0,type:{name:"Category[]"}},isInitialOpen:{defaultValue:{value:"true"},description:"",name:"isInitialOpen",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Dashboard/CategoryToggle/index.tsx#CategoryToggle"]={docgenInfo:CategoryToggle.__docgenInfo,name:"CategoryToggle",path:"src/components/common/Dashboard/CategoryToggle/index.tsx#CategoryToggle"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Dashboard/GuestProfile/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>GuestProfile});__webpack_require__("./node_modules/react/index.js");var dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),path=__webpack_require__("./src/constants/path.ts");const kakao_login_namespaceObject=__webpack_require__.p+"static/media/kakao_login.90f45a76.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),profileStyle=__webpack_require__("./src/components/common/Dashboard/profileStyle.ts");const Container=(0,styled_components_browser_esm.zo)(profileStyle.U)`
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
`;var UserProfile=__webpack_require__("./src/components/common/Dashboard/UserProfile/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Dashboard({userInfo,categoryList,selectedCategory="전체",handleLogoutClick}){const favoriteCategory=categoryList.filter((category=>!0===category.isFavorite)),allCategory=categoryList.filter((category=>!1===category.isFavorite));return(0,jsx_runtime.jsxs)(Container,{children:[userInfo?(0,jsx_runtime.jsx)(UserProfile.Z,{userInfo}):(0,jsx_runtime.jsx)(GuestProfile.Z,{}),(0,jsx_runtime.jsxs)(SelectCategoryWrapper,{children:[(0,jsx_runtime.jsx)(Circle,{}),(0,jsx_runtime.jsx)(SelectCategoryText,{children:selectedCategory})]}),(0,jsx_runtime.jsx)(ContentContainer,{children:(0,jsx_runtime.jsxs)(CategoryToggleContainer,{children:[userInfo&&(0,jsx_runtime.jsx)(CategoryToggle.Z,{title:"즐겨찾기",categoryList:favoriteCategory}),(0,jsx_runtime.jsx)(CategoryToggle.Z,{title:"카테고리 모아보기",categoryList:allCategory})]})}),userInfo&&(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"blank",onClick:handleLogoutClick,children:"로그아웃"})})]})}Dashboard.displayName="Dashboard";try{Dashboard.displayName="Dashboard",Dashboard.__docgenInfo={description:"",displayName:"Dashboard",props:{categoryList:{defaultValue:null,description:"",name:"categoryList",required:!0,type:{name:"Category[]"}},selectedCategory:{defaultValue:{value:"전체"},description:"",name:"selectedCategory",required:!1,type:{name:"string"}},handleLogoutClick:{defaultValue:null,description:"",name:"handleLogoutClick",required:!0,type:{name:"() => void"}},userInfo:{defaultValue:null,description:"",name:"userInfo",required:!1,type:{name:"User"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Dashboard/index.tsx#Dashboard"]={docgenInfo:Dashboard.__docgenInfo,name:"Dashboard",path:"src/components/common/Dashboard/index.tsx#Dashboard"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Dashboard/profileStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>ProfileContainer});const ProfileContainer=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
  display: flex;
  flex-direction: column;
  justify-content: end;

  width: 100%;
  height: 130px;
  padding: 16px 12px;
  border-radius: 4px;

  font: var(--text-body);

  background-color: var(--gray);
`},"./src/components/common/Layout/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Layout});var react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),useCategoryList=__webpack_require__("./src/hooks/query/category/useCategoryList.ts"),Dashboard=__webpack_require__("./src/components/common/Dashboard/index.tsx"),WideHeader=__webpack_require__("./src/components/common/WideHeader/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Layout({children,isSidebarVisible}){const navigate=(0,dist.s0)(),{loggedInfo}=(0,react.useContext)(auth.V),{data:categoryList}=(0,useCategoryList.J)(loggedInfo.isLogged);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(WideHeaderWrapper,{children:(0,jsx_runtime.jsx)(WideHeader.Z,{handleLogoClick:()=>{navigate("/")}})}),(0,jsx_runtime.jsxs)(ContentContainer,{children:[isSidebarVisible&&(0,jsx_runtime.jsx)(DashboardWrapper,{children:(0,jsx_runtime.jsx)(Dashboard.Z,{userInfo:loggedInfo.userInfo,categoryList:categoryList??[],selectedCategory:undefined,handleLogoutClick:()=>{}})}),(0,jsx_runtime.jsx)(MainContainer,{$isSidebarVisible:isSidebarVisible,children:(0,jsx_runtime.jsx)(ChildrenWrapper,{$isSidebarVisible:isSidebarVisible,children})})]})]})}Layout.displayName="Layout";try{Layout.displayName="Layout",Layout.__docgenInfo={description:"",displayName:"Layout",props:{isSidebarVisible:{defaultValue:null,description:"",name:"isSidebarVisible",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Layout/index.tsx#Layout"]={docgenInfo:Layout.__docgenInfo,name:"Layout",path:"src/components/common/Layout/index.tsx#Layout"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/LogoButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LogoButton});const logo_namespaceObject=__webpack_require__.p+"static/media/logo.9ee58604.svg",projectName_namespaceObject=__webpack_require__.p+"static/media/projectName.7b011954.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const contentCategory={icon:{name:"로고 아이콘",url:logo_namespaceObject},text:{name:"votogether",url:projectName_namespaceObject},full:{name:"votogether",url:""}};function LogoButton({content,...rest}){const src=contentCategory[content].url,ariaLabelText=contentCategory[content].name;return"full"===content?(0,jsx_runtime.jsxs)(Button,{content,"aria-label":ariaLabelText,...rest,children:[(0,jsx_runtime.jsx)("img",{src:logo_namespaceObject,alt:"로고 아이콘"}),(0,jsx_runtime.jsx)("img",{src:projectName_namespaceObject,alt:"VoTogether"})]}):(0,jsx_runtime.jsx)(Button,{content,"aria-label":ariaLabelText,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:"로고 아이콘"})})}LogoButton.displayName="LogoButton";try{LogoButton.displayName="LogoButton",LogoButton.__docgenInfo={description:"",displayName:"LogoButton",props:{content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"enum",value:[{value:'"text"'},{value:'"icon"'},{value:'"full"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/LogoButton/index.tsx#LogoButton"]={docgenInfo:LogoButton.__docgenInfo,name:"LogoButton",path:"src/components/common/LogoButton/index.tsx#LogoButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SearchBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SearchBar});var path=__webpack_require__("./src/constants/path.ts"),post=__webpack_require__("./src/constants/post.ts");const search_black_namespaceObject=__webpack_require__.p+"static/media/search_black.af78e45d.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const formSize={sm:"170px",md:"250px",lg:"400px"},Form=styled_components_browser_esm.zo.form`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SearchBar({size,...rest}){return(0,jsx_runtime.jsxs)(Form,{size,...rest,action:path.m.SEARCH,children:[(0,jsx_runtime.jsx)(Input,{type:"search",name:post.Kn}),(0,jsx_runtime.jsx)(Button,{type:"submit",children:(0,jsx_runtime.jsx)("img",{src:search_black_namespaceObject,alt:"검색버튼"})})]})}SearchBar.displayName="SearchBar";try{SearchBar.displayName="SearchBar",SearchBar.__docgenInfo={description:"",displayName:"SearchBar",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SearchBar/index.tsx#SearchBar"]={docgenInfo:SearchBar.__docgenInfo,name:"SearchBar",path:"src/components/common/SearchBar/index.tsx#SearchBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BORDER_THEME={fill:"var(--primary-color)",blank:"var(--primary-color)",gray:"#67727E"},TEXT_THEME={fill:"white",blank:"var(--primary-color)",gray:"white"},BACKGROUND_THEME={fill:"var(--primary-color)",blank:"white",gray:"#67727E"},Button=styled_components_browser_esm.zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{$theme:theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'},{value:'"gray"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/WideHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WideHeader});var LogoButton=__webpack_require__("./src/components/common/LogoButton/index.tsx"),SearchBar=__webpack_require__("./src/components/common/SearchBar/index.tsx");const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WideHeader({handleLogoClick}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(LogoButton.Z,{content:"full",onClick:handleLogoClick}),(0,jsx_runtime.jsx)(SearchBar.Z,{size:"sm"})]})}WideHeader.displayName="WideHeader";try{WideHeader.displayName="WideHeader",WideHeader.__docgenInfo={description:"",displayName:"WideHeader",props:{handleLogoClick:{defaultValue:null,description:"",name:"handleLogoClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/WideHeader/index.tsx#WideHeader"]={docgenInfo:WideHeader.__docgenInfo,name:"WideHeader",path:"src/components/common/WideHeader/index.tsx#WideHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/path.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>BASE_PATH,m:()=>PATH});const BASE_PATH={HOME:"/",LANDING:"/landing",LOGIN:"/login",POST:"/posts",USER:"/users",ADMIN:"/admin",SEARCH:"/search"},PATH={...BASE_PATH,POST_WRITE:`${BASE_PATH.POST}/write`,POST_VOTE_RESULT:`${BASE_PATH.POST}/result`,POST_CATEGORY:`${BASE_PATH.POST}/category`,USER_POST:`${BASE_PATH.USER}/posts`,USER_VOTE:`${BASE_PATH.USER}/votes`,USER_INFO:`${BASE_PATH.USER}/myPage`}},"./src/constants/post.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>DEFAULT_KEYWORD,Et:()=>POST_TITLE_MAX_LENGTH,FQ:()=>SORTING,It:()=>REQUEST_POST_KIND_URL,JH:()=>POST_TYPE,Kf:()=>REQUEST_STATUS_OPTION,Kn:()=>SEARCH_KEYWORD,Q_:()=>STATUS,ko:()=>SEARCH_KEYWORD_MAX_LENGTH,pl:()=>POST_DESCRIPTION_MAX_LENGTH,tL:()=>REQUEST_SORTING_OPTION,yE:()=>DEFAULT_CATEGORY_ID,zV:()=>POST_LIST_MAX_LENGTH});const STATUS={ALL:"all",PROGRESS:"progress",CLOSED:"closed"},SORTING={LATEST:"latest",POPULAR:"popular"},POST_TYPE={ALL:"posts",MY_POST:"myPost",MY_VOTE:"myVote",CATEGORY:"category",SEARCH:"search"},REQUEST_STATUS_OPTION={[STATUS.ALL]:"ALL",[STATUS.PROGRESS]:"PROGRESS",[STATUS.CLOSED]:"CLOSED"},REQUEST_SORTING_OPTION={[SORTING.LATEST]:"LATEST",[SORTING.POPULAR]:"HOT"},REQUEST_POST_KIND_URL={[POST_TYPE.ALL]:"posts",[POST_TYPE.MY_POST]:"posts/me",[POST_TYPE.MY_VOTE]:"posts/votes/me",[POST_TYPE.CATEGORY]:"posts/categories",[POST_TYPE.SEARCH]:"posts/search"},SEARCH_KEYWORD="keyword",POST_TITLE_MAX_LENGTH=100,POST_DESCRIPTION_MAX_LENGTH=1e3,SEARCH_KEYWORD_MAX_LENGTH=100,POST_LIST_MAX_LENGTH=10,DEFAULT_CATEGORY_ID=0,DEFAULT_KEYWORD=""},"./src/constants/queryKey.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>QUERY_KEY});const QUERY_KEY={POSTS:"posts",POST_DETAIL:"postDetail",COMMENTS:"comments",CATEGORIES:"categories",USER_INFO:"user_info"}},"./src/hooks/context/auth.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>AuthContext});var react=__webpack_require__("./node_modules/react/index.js"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),fetch=__webpack_require__("./src/utils/fetch.ts");const getUserInfo=async()=>(userInfo=>{const{nickname,postCount,userPoint,voteCount,badge}=userInfo;return{nickname,postCount,userPoint,voteCount,badge}})(await(0,fetch.wY)("/members/me"));var queryKey=__webpack_require__("./src/constants/queryKey.ts");var cookie=__webpack_require__("./src/utils/cookie/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const notLoggedInfo={isLogged:!1,accessToken:""},AuthContext=(0,react.createContext)({});function AuthProvider({children}){const[loggedInfo,setLoggedInfo]=(0,react.useState)(notLoggedInfo),{data:userInfo}=(isLogged=>{const{data,error,isLoading,isError}=(0,useQuery.a)([queryKey.l.USER_INFO,isLogged],getUserInfo);return{data,error,isLoading,isError}})(loggedInfo.isLogged);return(0,react.useEffect)((()=>{userInfo&&setLoggedInfo((origin=>({...origin,userInfo})))}),[userInfo]),(0,react.useEffect)((()=>{const accessToken=(0,cookie.CL)().accessToken;accessToken&&setLoggedInfo((origin=>({...origin,accessToken,isLogged:!0})))}),[]),(0,jsx_runtime.jsx)(AuthContext.Provider,{value:{loggedInfo,setLoggedInfo},children})}AuthProvider.displayName="AuthProvider";try{AuthProvider.displayName="AuthProvider",AuthProvider.__docgenInfo={description:"",displayName:"AuthProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/context/auth.tsx#AuthProvider"]={docgenInfo:AuthProvider.__docgenInfo,name:"AuthProvider",path:"src/hooks/context/auth.tsx#AuthProvider"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/query/category/useCategoryList.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>useCategoryList});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),_api_categoryList__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/api/categoryList.ts"),_constants_queryKey__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/queryKey.ts");const useCategoryList=isLoggedIn=>{const{data,error,isLoading,isError}=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.a)([_constants_queryKey__WEBPACK_IMPORTED_MODULE_1__.l.CATEGORIES],isLoggedIn?_api_categoryList__WEBPACK_IMPORTED_MODULE_0__.a$:_api_categoryList__WEBPACK_IMPORTED_MODULE_0__.kD);return{data,error,isLoading,isError}}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{header:100,modal:200}}},"./src/assets/chevron-down.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-down.f97a5bb1.svg"},"./src/assets/chevron-up.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-up.a1eb858b.svg"}}]);
//# sourceMappingURL=5771.c8d705ce.iframe.bundle.js.map