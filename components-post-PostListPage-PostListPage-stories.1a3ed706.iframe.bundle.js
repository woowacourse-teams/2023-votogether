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
`,AddButtonWrapper=(0,styled_components_browser_esm.zo)(dist.rU)`
  text-decoration: none;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function PostListPage(){const{drawerRef,closeDrawer,openDrawer}=(0,useDrawer.y)("left");return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(HeaderWrapper,{children:(0,jsx_runtime.jsx)(NarrowMainHeader.Z,{handleMenuOpenClick:openDrawer})}),(0,jsx_runtime.jsx)(DrawerWrapper,{children:(0,jsx_runtime.jsx)(Drawer.Z,{handleDrawerClose:closeDrawer,placement:"left",width:"225px",ref:drawerRef,children:(0,jsx_runtime.jsx)(Dashboard.Z,{})})}),(0,jsx_runtime.jsx)(ErrorBoundary.Z,{children:(0,jsx_runtime.jsx)(react.Suspense,{fallback:(0,jsx_runtime.jsx)(Skeleton.Z,{isLarge:!0}),children:(0,jsx_runtime.jsx)(PostList.Z,{})})}),(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(UpButton.Z,{onClick:scrollToTop.n}),(0,jsx_runtime.jsx)(AddButtonWrapper,{to:path.m.POST_WRITE,children:(0,jsx_runtime.jsx)(AddButton.Z,{size:"lg"})})]})]})}PostListPage.displayName="PostListPage";const PostListPage_stories={component:PostListPage},Default={render:()=>(0,jsx_runtime.jsx)(PostListPage,{})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <PostListPage />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/AddButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>AddButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:{button:"25px",font:"13px"},md:{button:"40px",font:"30px"},lg:{button:"60px",font:"50px"}},Button=styled_components_browser_esm.zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SearchBar({size,isOpen,...rest}){const{currentKeyword}=(0,useCurrentKeyword.H)(),{keyword,handleKeywordChange,handleSearchSubmit,searchInputRef}=useSearch(currentKeyword);return(0,jsx_runtime.jsxs)(Form,{size,action:path.m.SEARCH,onSubmit:handleSearchSubmit,children:[(0,jsx_runtime.jsx)(Input,{ref:searchInputRef,maxLength:post.ko+1,"aria-label":"게시글 제목 및 내용 검색창",type:"search",value:keyword,onChange:handleKeywordChange,autoComplete:"off",name:post.Kn,...rest}),(0,jsx_runtime.jsx)(Button,{type:"submit",children:(0,jsx_runtime.jsx)("img",{src:search_black_namespaceObject,alt:"검색버튼"})}),isOpen&&(0,jsx_runtime.jsx)(ScreenReaderDirection,{"aria-live":"polite",children:"검색창을 닫으려면 검색창 외부를 클릭해주세요."})]})}SearchBar.displayName="SearchBar";try{SearchBar.displayName="SearchBar",SearchBar.__docgenInfo={description:"",displayName:"SearchBar",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SearchBar/index.tsx#SearchBar"]={docgenInfo:SearchBar.__docgenInfo,name:"SearchBar",path:"src/components/common/SearchBar/index.tsx#SearchBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Select/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Select});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg");const SELECT_SELECTED="selected",SELECT_DISABLED="disabled",SELECT_DEFAULT="default";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  font: var(--text-caption);

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`,SELECTED_CSS_OPTION={selected:{border:"2px solid #60a5fa",color:"var(--slate)",cursor:"pointer"},disabled:{border:"1px solid var(--slate)",color:"var(--slate)",cursor:"not-allowed"},default:{border:"1px solid var(--slate)",color:"",cursor:"pointer"}},SelectedContainer=styled_components_browser_esm.zo.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 8px;
  border: ${({$status})=>SELECTED_CSS_OPTION[$status].border};
  border-radius: 4px;

  font: inherit;

  color: ${({$status})=>SELECTED_CSS_OPTION[$status].color};

  cursor: ${({$status})=>SELECTED_CSS_OPTION[$status].cursor};
`,OptionListParent=styled_components_browser_esm.zo.div`
  position: relative;

  z-index: ${theme.r.zIndex.select};
`,OptionListContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  border: 1px solid var(--slate);
  border-radius: 4px;

  position: absolute;
  top: 4px;

  background-color: var(--white);
`,OptionContainer=styled_components_browser_esm.zo.div`
  padding: 8px;

  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`,Image=styled_components_browser_esm.zo.img`
  width: 20px;
  height: 20px;
  border-left: 1px solid var(--slate);
  padding-left: 8px;
`,ScreenReaderDirection=styled_components_browser_esm.zo.p`
  position: absolute;
  left: -9999px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Select({selectedOption,optionList,handleOptionChange,isDisabled=!1,...rest}){const optionKeyList=Object.keys(optionList),[isOpen,setIsOpen]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(SelectedContainer,{onClick:()=>{isDisabled||setIsOpen((prev=>!prev))},$status:isDisabled?SELECT_DISABLED:isOpen?SELECT_SELECTED:SELECT_DEFAULT,...rest,children:[(0,jsx_runtime.jsx)("span",{children:selectedOption}),(0,jsx_runtime.jsx)(Image,{src:isOpen?chevron_up:chevron_down,alt:"",$isSelected:isOpen})]}),isOpen&&(0,jsx_runtime.jsx)(ScreenReaderDirection,{"aria-live":"polite",children:"이 요소를 닫으려면 한번 더 클릭해주세요."}),isOpen&&(0,jsx_runtime.jsx)(OptionListParent,{children:(0,jsx_runtime.jsx)(OptionListContainer,{children:optionKeyList.map((optionKey=>(0,jsx_runtime.jsx)(OptionContainer,{tabIndex:0,onClick:()=>(handleOptionChange(optionKey),void setIsOpen(!1)),children:optionList[optionKey]},optionKey)))})})]})}Select.displayName="Select";try{Select.displayName="Select",Select.__docgenInfo={description:"",displayName:"Select",props:{selectedOption:{defaultValue:null,description:"",name:"selectedOption",required:!0,type:{name:"string"}},optionList:{defaultValue:null,description:"",name:"optionList",required:!0,type:{name:"Record<T, string>"}},handleOptionChange:{defaultValue:null,description:"",name:"handleOptionChange",required:!0,type:{name:"(option: T) => void"}},isDisabled:{defaultValue:{value:"false"},description:"",name:"isDisabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Select/index.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/components/common/Select/index.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/UpButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>UpButton});__webpack_require__("./node_modules/react/index.js");const chevron_up_primary_namespaceObject=__webpack_require__.p+"static/media/chevron_up_primary.2a8f784f.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  width: 60px;
  height: 60px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;

  background-color: var(--white);

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UpButton({...rest}){return(0,jsx_runtime.jsx)(Button,{...rest,children:(0,jsx_runtime.jsx)("img",{src:chevron_up_primary_namespaceObject,alt:"페이지 최상단으로 스크롤 올리기"})})}UpButton.displayName="UpButton";try{UpButton.displayName="UpButton",UpButton.__docgenInfo={description:"",displayName:"UpButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/UpButton/index.tsx#UpButton"]={docgenInfo:UpButton.__docgenInfo,name:"UpButton",path:"src/components/common/UpButton/index.tsx#UpButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/post/EmptyPostList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>EmptyPostList});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function EmptyPostList({keyword,status}){return keyword?(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)("div",{children:["all"!==status&&(0,jsx_runtime.jsx)(Title,{children:"현재 조건에는"}),(0,jsx_runtime.jsxs)(Keyword,{children:["'",keyword,"'"]}),(0,jsx_runtime.jsx)(Title,{children:"와(과) 일치하는 검색결과가 없습니다."})]}),(0,jsx_runtime.jsxs)(TextCardContainer,{children:["all"!==status&&(0,jsx_runtime.jsx)(TextCard,{children:"전체 옵션으로 사용해보세요."}),(0,jsx_runtime.jsx)(TextCard,{children:"모든 단어의 철자가 정확한지 확인하세요."}),(0,jsx_runtime.jsx)(TextCard,{children:"다른 검색어를 사용해 보세요."}),(0,jsx_runtime.jsx)(TextCard,{children:"더 일반적인 검색어를 사용해 보세요."}),(0,jsx_runtime.jsx)(TextCard,{children:"키워드 수를 줄여보세요."})]})]}):(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsx)(Title,{children:"해당 되는 조건의 게시글이 없습니다."})})}EmptyPostList.displayName="EmptyPostList";try{EmptyPostList.displayName="EmptyPostList",EmptyPostList.__docgenInfo={description:"",displayName:"EmptyPostList",props:{status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:"enum",value:[{value:'"all"'},{value:'"progress"'},{value:'"closed"'}]}},keyword:{defaultValue:null,description:"",name:"keyword",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/post/EmptyPostList/index.tsx#EmptyPostList"]={docgenInfo:EmptyPostList.__docgenInfo,name:"EmptyPostList",path:"src/components/post/EmptyPostList/index.tsx#EmptyPostList"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/post/PostList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PostList});var react=__webpack_require__("./node_modules/react/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),context_postOption=__webpack_require__("./src/hooks/context/postOption.tsx"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),queryObserver=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/queryObserver.mjs"),infiniteQueryBehavior=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/infiniteQueryBehavior.mjs");class InfiniteQueryObserver extends queryObserver.z{constructor(client,options){super(client,options)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(options,notifyOptions){super.setOptions({...options,behavior:(0,infiniteQueryBehavior.Gm)()},notifyOptions)}getOptimisticResult(options){return options.behavior=(0,infiniteQueryBehavior.Gm)(),super.getOptimisticResult(options)}fetchNextPage({pageParam,...options}={}){return this.fetch({...options,meta:{fetchMore:{direction:"forward",pageParam}}})}fetchPreviousPage({pageParam,...options}={}){return this.fetch({...options,meta:{fetchMore:{direction:"backward",pageParam}}})}createResult(query,options){var _state$fetchMeta,_state$fetchMeta$fetc,_state$fetchMeta2,_state$fetchMeta2$fet,_state$data,_state$data2;const{state}=query,result=super.createResult(query,options),{isFetching,isRefetching}=result,isFetchingNextPage=isFetching&&"forward"===(null==(_state$fetchMeta=state.fetchMeta)||null==(_state$fetchMeta$fetc=_state$fetchMeta.fetchMore)?void 0:_state$fetchMeta$fetc.direction),isFetchingPreviousPage=isFetching&&"backward"===(null==(_state$fetchMeta2=state.fetchMeta)||null==(_state$fetchMeta2$fet=_state$fetchMeta2.fetchMore)?void 0:_state$fetchMeta2$fet.direction);return{...result,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:(0,infiniteQueryBehavior.Qy)(options,null==(_state$data=state.data)?void 0:_state$data.pages),hasPreviousPage:(0,infiniteQueryBehavior.ZF)(options,null==(_state$data2=state.data)?void 0:_state$data2.pages),isFetchingNextPage,isFetchingPreviousPage,isRefetching:isRefetching&&!isFetchingNextPage&&!isFetchingPreviousPage}}}var useBaseQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useBaseQuery.mjs");var post=__webpack_require__("./src/constants/post.ts"),fetch=__webpack_require__("./src/utils/fetch.ts"),api_post=__webpack_require__("./src/api/post.ts");const getPostList=async(requiredOption,optionalOption)=>{const{pageNumber}=requiredOption,postListUrl=((requiredOption,optionalOption)=>{const{pageNumber,postSorting,postStatus,postType,isLoggedIn}=requiredOption,{categoryId,keyword}=optionalOption,requestedStatus=post.Kf[postStatus],requestedSorting=post.tL[postSorting],POST_BASE_URL=`/${post.It[postType]}${isLoggedIn?"":"/guest"}`,OPTION_URL=`postClosingType=${requestedStatus}&postSortType=${requestedSorting}&page=${pageNumber}`;return categoryId>0&&postType===post.JH.CATEGORY?`${POST_BASE_URL}?${OPTION_URL}&category=${categoryId}`:postType===post.JH.SEARCH?`${POST_BASE_URL}?${post.Kn}=${keyword}&${OPTION_URL}`:`${POST_BASE_URL}?${OPTION_URL}`})(requiredOption,optionalOption);return{pageNumber,postList:(await(0,fetch.wY)(postListUrl)).map((post=>(0,api_post.wQ)(post)))}};var queryKey=__webpack_require__("./src/constants/queryKey.ts");const usePostList=(requiredOption,optionalOption)=>{const{postSorting,postStatus,isLoggedIn,postType}=requiredOption,{categoryId,keyword}=optionalOption,{data,error,fetchNextPage,hasNextPage,isFetchingNextPage}=function useInfiniteQuery(arg1,arg2,arg3){const options=(0,utils._v)(arg1,arg2,arg3);return(0,useBaseQuery.r)(options,InfiniteQueryObserver)}([queryKey.l.POSTS,postSorting,postStatus,categoryId,keyword,isLoggedIn,postType],(({pageParam=0})=>getPostList({...requiredOption,pageNumber:pageParam},optionalOption)),{getNextPageParam:lastPage=>{if(lastPage.postList.length===post.zV)return lastPage.pageNumber+1},suspense:!0});return{data,error,fetchNextPage,hasNextPage,isFetchingNextPage,isPostListEmpty:0===data?.pages[0].postList.length}},useIntersectionObserver=options=>{const[isIntersecting,setIsIntersecting]=(0,react.useState)(!1),targetRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{const target=targetRef.current;if(!target)return;const observer=new IntersectionObserver((([entry])=>{setIsIntersecting(entry.isIntersecting)}),options);return targetRef.current&&observer.observe(target),()=>{target&&observer.unobserve(target)}}),[options,targetRef]),{targetRef,isIntersecting}};try{useIntersectionObserver.displayName="useIntersectionObserver",useIntersectionObserver.__docgenInfo={description:"",displayName:"useIntersectionObserver",props:{root:{defaultValue:null,description:"",name:"root",required:!0,type:{name:"Element | Document | null"}},rootMargin:{defaultValue:null,description:"",name:"rootMargin",required:!0,type:{name:"string"}},thresholds:{defaultValue:null,description:"",name:"thresholds",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useIntersectionObserver.tsx#useIntersectionObserver"]={docgenInfo:useIntersectionObserver.__docgenInfo,name:"useIntersectionObserver",path:"src/hooks/useIntersectionObserver.tsx#useIntersectionObserver"})}catch(__react_docgen_typescript_loader_error){}var usePostRequestInfo=__webpack_require__("./src/hooks/usePostRequestInfo.ts"),useSelect=__webpack_require__("./src/hooks/useSelect.tsx"),Post=__webpack_require__("./src/components/common/Post/index.tsx"),Select=__webpack_require__("./src/components/common/Select/index.tsx"),Skeleton=__webpack_require__("./src/components/common/Skeleton/index.tsx");const STATUS_OPTION={[post.Q_.ALL]:"전체",[post.Q_.PROGRESS]:"진행중",[post.Q_.CLOSED]:"마감완료"},SORTING_OPTION={[post.FQ.POPULAR]:"인기순",[post.FQ.LATEST]:"최신순"};var EmptyPostList=__webpack_require__("./src/components/post/EmptyPostList/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
`,SelectContainer=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  padding: 20px 20px 30px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  @media (min-width: ${theme.r.breakpoint.sm}) {
    padding: 40px 20px;
  }
`,PostListContainer=styled_components_browser_esm.zo.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding: 30px 20px;

  > li {
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`,SelectWrapper=styled_components_browser_esm.zo.div`
  width: 110px;

  position: absolute;

  &:first-child {
    left: 20px;
  }
  &:last-child {
    right: 20px;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function PostList(){const{postType,postOptionalOption}=(0,usePostRequestInfo.Y)(),{loggedInfo}=(0,react.useContext)(auth.V),{targetRef,isIntersecting}=useIntersectionObserver({root:null,rootMargin:"",thresholds:.1}),{postOption,setPostOption}=(0,react.useContext)(context_postOption.J),{selectedOption:selectedStatusOption,handleOptionChange:handleStatusOptionChange}=(0,useSelect.L)(postOption.status),{selectedOption:selectedSortingOption,handleOptionChange:handleSortingOptionChange}=(0,useSelect.L)(postOption.sorting),{data,fetchNextPage,hasNextPage,isFetchingNextPage,isPostListEmpty}=usePostList({postType,postSorting:selectedSortingOption,postStatus:selectedStatusOption,isLoggedIn:loggedInfo.isLoggedIn},postOptionalOption);return(0,react.useEffect)((()=>{isIntersecting&&hasNextPage&&fetchNextPage()}),[isIntersecting,fetchNextPage,hasNextPage]),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(SelectContainer,{children:[(0,jsx_runtime.jsx)(SelectWrapper,{children:(0,jsx_runtime.jsx)(Select.Z,{"aria-label":`마감 여부로 게시글 정렬 선택, 현재 옵션은 ${STATUS_OPTION[selectedStatusOption]}`,handleOptionChange:value=>{setPostOption({...postOption,status:value}),handleStatusOptionChange(value)},optionList:STATUS_OPTION,selectedOption:STATUS_OPTION[selectedStatusOption]})}),(0,jsx_runtime.jsx)(SelectWrapper,{children:(0,jsx_runtime.jsx)(Select.Z,{"aria-label":`인기순/최신순으로 게시글 정렬 선택, 현재 옵션은 ${SORTING_OPTION[selectedSortingOption]}`,handleOptionChange:value=>{setPostOption({...postOption,sorting:value}),handleSortingOptionChange(value)},optionList:SORTING_OPTION,selectedOption:SORTING_OPTION[selectedSortingOption]})})]}),(0,jsx_runtime.jsxs)(PostListContainer,{children:[isPostListEmpty&&(0,jsx_runtime.jsx)(EmptyPostList.Z,{status:selectedStatusOption,keyword:postOptionalOption.keyword}),data?.pages.map(((postListInfo,pageIndex)=>(0,jsx_runtime.jsx)(react.Fragment,{children:postListInfo.postList.map(((post,index)=>7===index?(0,jsx_runtime.jsx)("div",{ref:targetRef,children:(0,jsx_runtime.jsx)(Post.Z,{isPreview:!0,postInfo:post})},post.postId):(0,jsx_runtime.jsx)(Post.Z,{isPreview:!0,postInfo:post},post.postId)))},pageIndex))),isFetchingNextPage&&(0,jsx_runtime.jsx)(Skeleton.Z,{isLarge:!1})]})]})}PostList.displayName="PostList"},"./src/hooks/context/postOption.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>PostOptionContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_constants_post__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/post.ts");__webpack_require__("./node_modules/react/jsx-runtime.js");const PostOptionContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({postOption:{sorting:_constants_post__WEBPACK_IMPORTED_MODULE_1__.FQ.LATEST,status:_constants_post__WEBPACK_IMPORTED_MODULE_1__.Q_.PROGRESS},setPostOption:()=>{}});try{postOption.displayName="postOption",postOption.__docgenInfo={description:"",displayName:"postOption",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/context/postOption.tsx#postOption"]={docgenInfo:postOption.__docgenInfo,name:"postOption",path:"src/hooks/context/postOption.tsx#postOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useDrawer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>useDrawer});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useDrawer=placement=>{const drawerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{drawerRef.current&&(drawerRef.current.style.transform="left"===placement?"translateX(-100%)":"translateX(100%)")}),[]),{drawerRef,openDrawer:()=>{drawerRef.current&&(drawerRef.current.showModal(),drawerRef.current.style.transform="translateX(0)")},closeDrawer:()=>{drawerRef.current&&(drawerRef.current.style.transform="left"===placement?"translateX(-100%)":"translateX(100%)",setTimeout((()=>{drawerRef.current&&drawerRef.current.close()}),300))}}};try{useDrawer.displayName="useDrawer",useDrawer.__docgenInfo={description:"",displayName:"useDrawer",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useDrawer.tsx#useDrawer"]={docgenInfo:useDrawer.__docgenInfo,name:"useDrawer",path:"src/hooks/useDrawer.tsx#useDrawer"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useSelect.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>useSelect});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useSelect=initialOption=>{const[selectedOption,setSelectedOption]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOption);return{selectedOption,handleOptionChange:option=>{setSelectedOption(option)}}};try{useSelect.displayName="useSelect",useSelect.__docgenInfo={description:"",displayName:"useSelect",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useSelect.tsx#useSelect"]={docgenInfo:useSelect.__docgenInfo,name:"useSelect",path:"src/hooks/useSelect.tsx#useSelect"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useText.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>useText});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useText=originalText=>{const[text,setText]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(originalText);return{text,setText,handleTextChange:(event,limit)=>{const{value}=event.target;if(value.length>limit.MAX_LENGTH)return event.target.setCustomValidity(`해당 입력값은 ${limit.MAX_LENGTH}자까지 입력 가능합니다.`),void event.target.reportValidity();setText(value),event.target.setCustomValidity("")},resetText:()=>{setText("")}}}},"./src/hooks/useToggle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>useToggle});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useToggle=()=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return{isOpen,openComponent:()=>{setIsOpen(!0)},closeComponent:()=>{setIsOpen(!1)},toggleComponent:()=>{setIsOpen((prevIsOpen=>!prevIsOpen))}}}},"./src/utils/scrollToTop.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>smoothScrollToTop});const smoothScrollToTop=()=>{window.scroll({top:0,behavior:"smooth"})}},"./src/assets/logo.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/logo.9ee58604.svg"}}]);
//# sourceMappingURL=components-post-PostListPage-PostListPage-stories.1a3ed706.iframe.bundle.js.map