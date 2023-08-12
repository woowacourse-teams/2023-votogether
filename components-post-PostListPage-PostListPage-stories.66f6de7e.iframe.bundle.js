"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[6423],{"./src/components/post/PostListPage/PostListPage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>PostListPage_stories});var react=__webpack_require__("./node_modules/react/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),useCategoryList=__webpack_require__("./src/hooks/query/category/useCategoryList.ts"),useDrawer=__webpack_require__("./src/hooks/useDrawer.tsx"),usePostRequestInfo=__webpack_require__("./src/hooks/usePostRequestInfo.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");class ErrorBoundary extends react.Component{#errorMessage="";constructor(props){super(props),this.state={hasError:!1}}static getDerivedStateFromError(error){return{hasError:!0}}componentDidCatch(error,errorInfo){window.console.log(error,errorInfo),this.#errorMessage=error.message}render(){return this.state.hasError?(0,jsx_runtime.jsx)("div",{children:this.#errorMessage}):this.props.children}}ErrorBoundary.displayName="ErrorBoundary";const pages_ErrorBoundary=ErrorBoundary;try{ErrorBoundary.displayName="ErrorBoundary",ErrorBoundary.__docgenInfo={description:"",displayName:"ErrorBoundary",props:{fallback:{defaultValue:null,description:"",name:"fallback",required:!0,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/ErrorBoundary.tsx#ErrorBoundary"]={docgenInfo:ErrorBoundary.__docgenInfo,name:"ErrorBoundary",path:"src/pages/ErrorBoundary.tsx#ErrorBoundary"})}catch(__react_docgen_typescript_loader_error){}var AddButton=__webpack_require__("./src/components/common/AddButton/index.tsx"),Dashboard=__webpack_require__("./src/components/common/Dashboard/index.tsx"),Drawer=__webpack_require__("./src/components/common/Drawer/index.tsx"),NarrowMainHeader=__webpack_require__("./src/components/common/NarrowMainHeader/index.tsx"),Skeleton=__webpack_require__("./src/components/common/Skeleton/index.tsx"),UpButton=__webpack_require__("./src/components/common/UpButton/index.tsx"),PostList=__webpack_require__("./src/components/post/PostList/index.tsx"),path=__webpack_require__("./src/constants/path.ts"),getSelectedState=__webpack_require__("./src/utils/post/getSelectedState.ts"),scrollToTop=__webpack_require__("./src/utils/scrollToTop.ts"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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

  position: sticky;
  bottom: 24px;
`,AddButtonWrapper=(0,styled_components_browser_esm.zo)(dist.rU)`
  text-decoration: none;
`;function PostListPage(){const{drawerRef,closeDrawer,openDrawer}=(0,useDrawer.y)("left"),{isLoggedIn:isLogged,userInfo}=(0,react.useContext)(auth.V).loggedInfo,{data:categoryList}=(0,useCategoryList.J)(isLogged),{postOptionalOption,postType}=(0,usePostRequestInfo.Y)(),{categoryId,keyword}=postOptionalOption,selectedState=(0,getSelectedState.L)({categoryId,keyword,categoryList:categoryList??[],postType});return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(HeaderWrapper,{children:(0,jsx_runtime.jsx)(NarrowMainHeader.Z,{handleMenuOpenClick:openDrawer})}),(0,jsx_runtime.jsx)(DrawerWrapper,{children:(0,jsx_runtime.jsx)(Drawer.Z,{handleDrawerClose:closeDrawer,placement:"left",width:"225px",ref:drawerRef,children:(0,jsx_runtime.jsx)(Dashboard.Z,{userInfo,categoryList:categoryList??[],handleLogoutClick:()=>{},selectedState})})}),(0,jsx_runtime.jsx)(pages_ErrorBoundary,{fallback:(0,jsx_runtime.jsx)("div",{children:"에러발생"}),children:(0,jsx_runtime.jsx)(react.Suspense,{fallback:(0,jsx_runtime.jsx)(Skeleton.Z,{isLarge:!0}),children:(0,jsx_runtime.jsx)(PostList.Z,{})})}),(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(UpButton.Z,{onClick:scrollToTop.k}),(0,jsx_runtime.jsx)(AddButtonWrapper,{to:path.m.POST_WRITE,children:(0,jsx_runtime.jsx)(AddButton.Z,{size:"lg"})})]})]})}PostListPage.displayName="PostListPage";const PostListPage_stories={component:PostListPage},Default={render:()=>(0,jsx_runtime.jsx)(PostListPage,{})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <PostListPage />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/AddButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>AddButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:{button:"25px",font:"13px"},md:{button:"40px",font:"30px"},lg:{button:"60px",font:"50px"}},Button=styled_components_browser_esm.zo.button`
  display: block;

  width: ${props=>SIZE[props.size].button};
  height: ${props=>SIZE[props.size].button};
  border-radius: 50%;

  background-color: var(--primary-color);
  color: var(--white);

  font-size: ${props=>SIZE[props.size].font};

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function AddButton({size,...rest}){return(0,jsx_runtime.jsx)(Button,{size,"aria-label":"더하기",...rest,children:"+"})}AddButton.displayName="AddButton";try{AddButton.displayName="AddButton",AddButton.__docgenInfo={description:"",displayName:"AddButton",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/AddButton/index.tsx#AddButton"]={docgenInfo:AddButton.__docgenInfo,name:"AddButton",path:"src/components/common/AddButton/index.tsx#AddButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Drawer/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>common_Drawer});var react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Dialog=styled_components_browser_esm.zo.dialog`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const common_Drawer=(0,react.forwardRef)((function Drawer({handleDrawerClose,width,placement,children},ref){const handleCloseClick=event=>{const modalBoundary=event.currentTarget.getBoundingClientRect();(modalBoundary.left>event.clientX||modalBoundary.right<event.clientX||modalBoundary.top>event.clientY||modalBoundary.bottom<event.clientY)&&handleDrawerClose()};return(0,jsx_runtime.jsx)(Dialog,{ref,$placement:placement,$width:width,onKeyDown:event=>{event.preventDefault(),event.currentTarget.open&&"Escape"===event.key&&handleDrawerClose()},onClose:handleCloseClick,onClick:handleCloseClick,children})}));try{Drawer.displayName="Drawer",Drawer.__docgenInfo={description:"",displayName:"Drawer",props:{handleDrawerClose:{defaultValue:null,description:"",name:"handleDrawerClose",required:!0,type:{name:"() => void"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"string"}},placement:{defaultValue:null,description:"",name:"placement",required:!0,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Drawer/index.tsx#Drawer"]={docgenInfo:Drawer.__docgenInfo,name:"Drawer",path:"src/components/common/Drawer/index.tsx#Drawer"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/IconButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>IconButton});const back_namespaceObject=__webpack_require__.p+"static/media/back.0d0cf282.svg",category_namespaceObject=__webpack_require__.p+"static/media/category.5dbd06d6.svg",retry_namespaceObject=__webpack_require__.p+"static/media/retry.ed31509f.svg",search_white_namespaceObject=__webpack_require__.p+"static/media/search_white.74caf850.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  background-color: rgba(0, 0, 0, 0);

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ICON_CATEGORY={category:{name:"카테고리",url:category_namespaceObject},back:{name:"뒤로가기",url:back_namespaceObject},search:{name:"검색",url:search_white_namespaceObject},retry:{name:"다시시도",url:retry_namespaceObject}};function IconButton({category,...rest}){const src=ICON_CATEGORY[category].url,ariaLabelText=ICON_CATEGORY[category].name;return(0,jsx_runtime.jsx)(Button,{"aria-label":ariaLabelText,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:`${ariaLabelText} 버튼`})})}IconButton.displayName="IconButton";try{IconButton.displayName="IconButton",IconButton.__docgenInfo={description:"",displayName:"IconButton",props:{category:{defaultValue:null,description:"",name:"category",required:!0,type:{name:"enum",value:[{value:'"search"'},{value:'"category"'},{value:'"back"'},{value:'"retry"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/IconButton/index.tsx#IconButton"]={docgenInfo:IconButton.__docgenInfo,name:"IconButton",path:"src/components/common/IconButton/index.tsx#IconButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/NarrowMainHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>NarrowMainHeader});var IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),LogoButton=__webpack_require__("./src/components/common/LogoButton/index.tsx");const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function NarrowMainHeader({handleMenuOpenClick}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(IconButton.Z,{category:"category",onClick:handleMenuOpenClick}),(0,jsx_runtime.jsx)(LogoButton.Z,{content:"icon"}),(0,jsx_runtime.jsx)(IconButton.Z,{category:"search"})]})}NarrowMainHeader.displayName="NarrowMainHeader";try{NarrowMainHeader.displayName="NarrowMainHeader",NarrowMainHeader.__docgenInfo={description:"",displayName:"NarrowMainHeader",props:{handleMenuOpenClick:{defaultValue:null,description:"",name:"handleMenuOpenClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/NarrowMainHeader/index.tsx#NarrowMainHeader"]={docgenInfo:NarrowMainHeader.__docgenInfo,name:"NarrowMainHeader",path:"src/components/common/NarrowMainHeader/index.tsx#NarrowMainHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/UpButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>UpButton});__webpack_require__("./node_modules/react/index.js");const chevron_up_primary_namespaceObject=__webpack_require__.p+"static/media/chevron_up_primary.2a8f784f.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  width: 60px;
  height: 60px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;

  background-color: var(--white);

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UpButton({...rest}){return(0,jsx_runtime.jsx)(Button,{...rest,children:(0,jsx_runtime.jsx)("img",{src:chevron_up_primary_namespaceObject,alt:""})})}UpButton.displayName="UpButton";try{UpButton.displayName="UpButton",UpButton.__docgenInfo={description:"",displayName:"UpButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/UpButton/index.tsx#UpButton"]={docgenInfo:UpButton.__docgenInfo,name:"UpButton",path:"src/components/common/UpButton/index.tsx#UpButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useDrawer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>useDrawer});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useDrawer=placement=>{const drawerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{drawerRef.current&&(drawerRef.current.style.transform="left"===placement?"translateX(-100%)":"translateX(100%)")}),[]),{drawerRef,openDrawer:()=>{drawerRef.current&&(drawerRef.current.showModal(),drawerRef.current.style.transform="translateX(0)")},closeDrawer:()=>{drawerRef.current&&(drawerRef.current.style.transform="left"===placement?"translateX(-100%)":"translateX(100%)",setTimeout((()=>{drawerRef.current&&drawerRef.current.close()}),300))}}};try{useDrawer.displayName="useDrawer",useDrawer.__docgenInfo={description:"",displayName:"useDrawer",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useDrawer.tsx#useDrawer"]={docgenInfo:useDrawer.__docgenInfo,name:"useDrawer",path:"src/hooks/useDrawer.tsx#useDrawer"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/scrollToTop.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>scrollToTop});const scrollToTop=()=>{window.scroll({top:0,behavior:"smooth"})}}}]);
//# sourceMappingURL=components-post-PostListPage-PostListPage-stories.66f6de7e.iframe.bundle.js.map