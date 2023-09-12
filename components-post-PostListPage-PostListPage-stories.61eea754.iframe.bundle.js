"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[6423],{"./src/components/post/PostListPage/PostListPage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>PostListPage_stories});var react=__webpack_require__("./node_modules/react/index.js"),useDrawer=__webpack_require__("./src/hooks/useDrawer.tsx"),ErrorBoundary=__webpack_require__("./src/pages/ErrorBoundary.tsx"),AddButton=__webpack_require__("./src/components/common/AddButton/index.tsx"),Dashboard=__webpack_require__("./src/components/common/Dashboard/index.tsx"),Drawer=__webpack_require__("./src/components/common/Drawer/index.tsx"),NarrowMainHeader=__webpack_require__("./src/components/common/NarrowMainHeader/index.tsx"),Skeleton=__webpack_require__("./src/components/common/Skeleton/index.tsx"),UpButton=__webpack_require__("./src/components/common/UpButton/index.tsx"),PostList=__webpack_require__("./src/components/post/PostList/index.tsx"),path=__webpack_require__("./src/constants/path.ts"),scrollToTop=__webpack_require__("./src/utils/scrollToTop.ts"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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

  width: 62px;
  padding-right: 10px;

  position: fixed;
  left: 90%;
  bottom: 24px;

  @media (max-width: ${theme.r.breakpoint.sm}) {
    left: 83%;
  }

  @media (max-width: 281px) {
    left: 78%;
  }
`,AddButtonWrapper=(0,styled_components_browser_esm.zo)(dist.rU)`
  text-decoration: none;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function PostListPage(){const{drawerRef,closeDrawer,openDrawer}=(0,useDrawer.y)("left");return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(HeaderWrapper,{children:(0,jsx_runtime.jsx)(NarrowMainHeader.Z,{handleMenuOpenClick:openDrawer})}),(0,jsx_runtime.jsx)(DrawerWrapper,{children:(0,jsx_runtime.jsx)(Drawer.Z,{handleDrawerClose:closeDrawer,placement:"left",width:"225px",ref:drawerRef,children:(0,jsx_runtime.jsx)(Dashboard.Z,{})})}),(0,jsx_runtime.jsx)(ErrorBoundary.Z,{children:(0,jsx_runtime.jsx)(react.Suspense,{fallback:(0,jsx_runtime.jsx)(Skeleton.Z,{isLarge:!0}),children:(0,jsx_runtime.jsx)(PostList.Z,{})})}),(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(UpButton.Z,{onClick:scrollToTop.n}),(0,jsx_runtime.jsx)(AddButtonWrapper,{to:path.m.POST_WRITE,children:(0,jsx_runtime.jsx)(AddButton.Z,{size:"lg","aria-label":"게시글 작성 페이지로 이동"})})]})]})}PostListPage.displayName="PostListPage";const PostListPage_stories={component:PostListPage},Default={render:()=>(0,jsx_runtime.jsx)(PostListPage,{})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <PostListPage />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/AddButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>AddButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:{button:"25px",font:"13px"},md:{button:"40px",font:"30px"},lg:{button:"60px",font:"50px"}},Button=styled_components_browser_esm.zo.button`
  display: block;

  width: ${props=>SIZE[props.size].button};
  height: ${props=>SIZE[props.size].button};
  border-radius: 50%;

  background-color: var(--primary-color);
  color: var(--white);

  font-size: ${props=>SIZE[props.size].font};

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function AddButton({size,...rest}){return(0,jsx_runtime.jsx)(Button,{size,"aria-label":"더하기",...rest,children:"+"})}AddButton.displayName="AddButton";try{AddButton.displayName="AddButton",AddButton.__docgenInfo={description:"",displayName:"AddButton",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/AddButton/index.tsx#AddButton"]={docgenInfo:AddButton.__docgenInfo,name:"AddButton",path:"src/components/common/AddButton/index.tsx#AddButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Drawer/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>common_Drawer});var react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const CloseButton=styled_components_browser_esm.zo.button`
  position: absolute;
  top: 0;
  right: 99999px;
`,Dialog=styled_components_browser_esm.zo.dialog`
  width: ${({$width})=>$width};
  min-height: 100%;

  position: fixed;
  top: 0;
  left: ${({$placement})=>"left"===$placement?"0":"auto"};
  right: ${({$placement})=>"right"===$placement?"0":"auto"};

  overflow: hidden;

  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  z-index: ${theme.r.zIndex.modal};

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.35);
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const common_Drawer=(0,react.forwardRef)((function Drawer({handleDrawerClose,width,placement,children},ref){const handleCloseClick=event=>{const modalBoundary=event.currentTarget.getBoundingClientRect();(modalBoundary.left>event.clientX||modalBoundary.right<event.clientX||modalBoundary.top>event.clientY||modalBoundary.bottom<event.clientY)&&handleDrawerClose()};return(0,jsx_runtime.jsxs)(Dialog,{tabIndex:1,"aria-label":"사용자 정보 및 카테고리 정보가 있는 사이드바가 열렸습니다. 사이드바 닫기 버튼을 누르거나 ESC를 누르면 닫을 수 있습니다.","aria-modal":!0,ref,$placement:placement,$width:width,onKeyDown:event=>{event.preventDefault(),event.currentTarget.open&&"Escape"===event.key&&handleDrawerClose()},onClose:handleCloseClick,onClick:handleCloseClick,children:[(0,jsx_runtime.jsx)(CloseButton,{onClick:handleDrawerClose,children:"사이드바 닫기버튼"}),children,(0,jsx_runtime.jsx)("div",{style:{backgroundColor:"red",width:"100%",height:"100%"}})]})}));try{Drawer.displayName="Drawer",Drawer.__docgenInfo={description:"",displayName:"Drawer",props:{handleDrawerClose:{defaultValue:null,description:"",name:"handleDrawerClose",required:!0,type:{name:"() => void"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"string"}},placement:{defaultValue:null,description:"",name:"placement",required:!0,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Drawer/index.tsx#Drawer"]={docgenInfo:Drawer.__docgenInfo,name:"Drawer",path:"src/components/common/Drawer/index.tsx#Drawer"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/IconButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>IconButton});const back_namespaceObject=__webpack_require__.p+"static/media/back.0d0cf282.svg",category_namespaceObject=__webpack_require__.p+"static/media/category.5dbd06d6.svg",ranking_namespaceObject=__webpack_require__.p+"static/media/ranking.bc2e65d6.svg",retry_namespaceObject=__webpack_require__.p+"static/media/retry.d97418a2.svg",search_white_namespaceObject=__webpack_require__.p+"static/media/search_white.74caf850.svg",user_namespaceObject=__webpack_require__.p+"static/media/user.87af8a44.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;

  background-color: ${props=>props.$isRoundBackground?"var(--gray)":"rgba(0, 0, 0, 0)"};

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ICON_CATEGORY={category:{name:"카테고리",url:category_namespaceObject,isRoundBackground:!1},back:{name:"뒤로가기",url:back_namespaceObject,isRoundBackground:!1},search:{name:"검색",url:search_white_namespaceObject,isRoundBackground:!1},retry:{name:"다시시도",url:retry_namespaceObject,isRoundBackground:!1},userInfo:{name:"사용자 페이지 이동",url:user_namespaceObject,isRoundBackground:!0},ranking:{name:"랭킹 페이지 이동",url:ranking_namespaceObject,isRoundBackground:!1}};function IconButton({category,...rest}){const src=ICON_CATEGORY[category].url,ariaLabelText=ICON_CATEGORY[category].name;return(0,jsx_runtime.jsx)(Button,{"aria-label":ariaLabelText,$isRoundBackground:ICON_CATEGORY[category].isRoundBackground,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:`${ariaLabelText} 버튼`})})}IconButton.displayName="IconButton";try{IconButton.displayName="IconButton",IconButton.__docgenInfo={description:"",displayName:"IconButton",props:{category:{defaultValue:null,description:"",name:"category",required:!0,type:{name:"enum",value:[{value:'"search"'},{value:'"category"'},{value:'"back"'},{value:'"retry"'},{value:'"userInfo"'},{value:'"ranking"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/IconButton/index.tsx#IconButton"]={docgenInfo:IconButton.__docgenInfo,name:"IconButton",path:"src/components/common/IconButton/index.tsx#IconButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/LogoButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LogoButton});var logo=__webpack_require__("./src/assets/logo.svg");const projectName_namespaceObject=__webpack_require__.p+"static/media/projectName.7b011954.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const contentCategory={icon:{name:"보투게더 로고 아이콘",url:logo},text:{name:"보투게더 아이콘",url:projectName_namespaceObject},full:{name:"보투게더 아이콘",url:""}};function LogoButton({content,...rest}){const src=contentCategory[content].url,ariaLabelText=contentCategory[content].name;return"full"===content?(0,jsx_runtime.jsxs)(Button,{content,"aria-label":ariaLabelText,...rest,children:[(0,jsx_runtime.jsx)("img",{src:logo,alt:"로고 아이콘"}),(0,jsx_runtime.jsx)("img",{src:projectName_namespaceObject,alt:"보투게더 아이콘"})]}):(0,jsx_runtime.jsx)(Button,{content,"aria-label":ariaLabelText,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:"보투게더 아이콘"})})}LogoButton.displayName="LogoButton";try{LogoButton.displayName="LogoButton",LogoButton.__docgenInfo={description:"",displayName:"LogoButton",props:{content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"enum",value:[{value:'"text"'},{value:'"icon"'},{value:'"full"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/LogoButton/index.tsx#LogoButton"]={docgenInfo:LogoButton.__docgenInfo,name:"LogoButton",path:"src/components/common/LogoButton/index.tsx#LogoButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/NarrowMainHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>NarrowMainHeader});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),useToggle=__webpack_require__("./src/hooks/useToggle.tsx"),path=__webpack_require__("./src/constants/path.ts"),IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),LogoButton=__webpack_require__("./src/components/common/LogoButton/index.tsx"),SearchBar=__webpack_require__("./src/components/common/SearchBar/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
  height: 55px;
  padding: 0 20px;

  position: fixed;
  top: 0;

  background-color: var(--header);

  & > :nth-child(2) {
    margin-right: auto;
    height: 60%;
  }
`,Background=styled_components_browser_esm.zo.div`
  width: 100%;
  height: 100vh;

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function NarrowMainHeader({handleMenuOpenClick}){const{isOpen:isSearchInputOpen,openComponent:openSearchInput,closeComponent:closeSearchInput}=(0,useToggle.O)(),navigate=(0,dist.s0)();return isSearchInputOpen?(0,jsx_runtime.jsx)(Background,{onClick:closeSearchInput,children:(0,jsx_runtime.jsx)(Container,{onClick:event=>event.stopPropagation(),children:(0,jsx_runtime.jsx)(SearchBar.Z,{size:"free",isOpen:isSearchInputOpen,autoFocus:!0})})}):(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(IconButton.Z,{category:"category",onClick:handleMenuOpenClick}),(0,jsx_runtime.jsx)(LogoButton.Z,{content:"icon",onClick:()=>{navigate("/")}}),(0,jsx_runtime.jsx)(IconButton.Z,{category:"search",onClick:openSearchInput}),(0,jsx_runtime.jsx)(IconButton.Z,{category:"userInfo",onClick:()=>{navigate(path.m.USER_INFO)}}),(0,jsx_runtime.jsx)(IconButton.Z,{category:"ranking",onClick:()=>{navigate(path.m.RANKING)}})]})}try{NarrowMainHeader.displayName="NarrowMainHeader",NarrowMainHeader.__docgenInfo={description:"",displayName:"NarrowMainHeader",props:{handleMenuOpenClick:{defaultValue:null,description:"",name:"handleMenuOpenClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/NarrowMainHeader/index.tsx#NarrowMainHeader"]={docgenInfo:NarrowMainHeader.__docgenInfo,name:"NarrowMainHeader",path:"src/components/common/NarrowMainHeader/index.tsx#NarrowMainHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SearchBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SearchBar});var useCurrentKeyword=__webpack_require__("./src/hooks/useCurrentKeyword.ts"),react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),post=__webpack_require__("./src/constants/post.ts"),getTrimmedWord=__webpack_require__("./src/utils/getTrimmedWord.ts"),useText=__webpack_require__("./src/hooks/useText.ts");const useSearch=(initialKeyword="")=>{const navigate=(0,dist.s0)(),searchInputRef=(0,react.useRef)(null),{text:keyword,setText:setKeyword,handleTextChange}=(0,useText.X)(initialKeyword);return{keyword,handleKeywordChange:event=>{searchInputRef.current&&handleTextChange(event,{MAX_LENGTH:post.ko,MIN_LENGTH:0})},handleSearchSubmit:event=>{if(event.preventDefault(),!searchInputRef.current)return;const trimmedKeyword=(0,getTrimmedWord.s)(keyword);if(keyword!==trimmedKeyword&&setKeyword(trimmedKeyword),""===trimmedKeyword)return searchInputRef.current.setCustomValidity("검색어를 입력해주세요"),void searchInputRef.current.reportValidity();navigate(`/search?keyword=${trimmedKeyword}`)},searchInputRef}};var path=__webpack_require__("./src/constants/path.ts");const search_black_namespaceObject=__webpack_require__.p+"static/media/search_black.af78e45d.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const formSize={sm:"170px",md:"250px",lg:"400px"},Form=styled_components_browser_esm.zo.form`
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
`,ScreenReaderDirection=styled_components_browser_esm.zo.p`
  position: absolute;
  left: -9999px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SearchBar({size,isOpen,...rest}){const{currentKeyword}=(0,useCurrentKeyword.H)(),{keyword,handleKeywordChange,handleSearchSubmit,searchInputRef}=useSearch(currentKeyword);return(0,jsx_runtime.jsxs)(Form,{size,action:path.m.SEARCH,onSubmit:handleSearchSubmit,children:[(0,jsx_runtime.jsx)(Input,{ref:searchInputRef,maxLength:post.ko+1,"aria-label":"게시글 제목 및 내용 검색창",type:"search",value:keyword,onChange:handleKeywordChange,autoComplete:"off",name:post.Kn,...rest}),(0,jsx_runtime.jsx)(Button,{type:"submit",children:(0,jsx_runtime.jsx)("img",{src:search_black_namespaceObject,alt:"검색버튼"})}),isOpen&&(0,jsx_runtime.jsx)(ScreenReaderDirection,{"aria-live":"polite",children:"검색창을 닫으려면 검색창 외부를 클릭해주세요."})]})}SearchBar.displayName="SearchBar";try{SearchBar.displayName="SearchBar",SearchBar.__docgenInfo={description:"",displayName:"SearchBar",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SearchBar/index.tsx#SearchBar"]={docgenInfo:SearchBar.__docgenInfo,name:"SearchBar",path:"src/components/common/SearchBar/index.tsx#SearchBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/UpButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>UpButton});__webpack_require__("./node_modules/react/index.js");const chevron_up_primary_namespaceObject=__webpack_require__.p+"static/media/chevron_up_primary.2a8f784f.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  width: 60px;
  height: 60px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;

  background-color: var(--white);

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UpButton({...rest}){return(0,jsx_runtime.jsx)(Button,{...rest,children:(0,jsx_runtime.jsx)("img",{src:chevron_up_primary_namespaceObject,alt:"페이지 최상단으로 스크롤 올리기"})})}UpButton.displayName="UpButton";try{UpButton.displayName="UpButton",UpButton.__docgenInfo={description:"",displayName:"UpButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/UpButton/index.tsx#UpButton"]={docgenInfo:UpButton.__docgenInfo,name:"UpButton",path:"src/components/common/UpButton/index.tsx#UpButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useDrawer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>useDrawer});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useDrawer=placement=>{const drawerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{drawerRef.current&&(drawerRef.current.style.transform="left"===placement?"translateX(-100%)":"translateX(100%)")}),[]),{drawerRef,openDrawer:()=>{drawerRef.current&&(drawerRef.current.showModal(),drawerRef.current.style.transform="translateX(0)")},closeDrawer:()=>{drawerRef.current&&(drawerRef.current.style.transform="left"===placement?"translateX(-100%)":"translateX(100%)",setTimeout((()=>{drawerRef.current&&drawerRef.current.close()}),300))}}};try{useDrawer.displayName="useDrawer",useDrawer.__docgenInfo={description:"",displayName:"useDrawer",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useDrawer.tsx#useDrawer"]={docgenInfo:useDrawer.__docgenInfo,name:"useDrawer",path:"src/hooks/useDrawer.tsx#useDrawer"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useText.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>useText});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useText=originalText=>{const[text,setText]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(originalText);return{text,setText,handleTextChange:(event,limit)=>{const{value}=event.target;if(value.length>limit.MAX_LENGTH)return event.target.setCustomValidity(`해당 입력값은 ${limit.MAX_LENGTH}자까지 입력 가능합니다.`),void event.target.reportValidity();setText(value),event.target.setCustomValidity("")},resetText:()=>{setText("")}}}},"./src/hooks/useToggle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>useToggle});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useToggle=()=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return{isOpen,openComponent:()=>{setIsOpen(!0)},closeComponent:()=>{setIsOpen(!1)},toggleComponent:()=>{setIsOpen((prevIsOpen=>!prevIsOpen))}}}},"./src/utils/scrollToTop.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>smoothScrollToTop});const smoothScrollToTop=()=>{window.scroll({top:0,behavior:"smooth"})}},"./src/assets/logo.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/logo.9ee58604.svg"}}]);
//# sourceMappingURL=components-post-PostListPage-PostListPage-stories.61eea754.iframe.bundle.js.map