"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[9993],{"./src/pages/MyInfo/MyInfo.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>MyInfo_stories});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),useToggle=__webpack_require__("./src/hooks/useToggle.tsx"),Accordion=__webpack_require__("./src/components/common/Accordion/index.tsx"),UserProfile=__webpack_require__("./src/components/common/Dashboard/UserProfile/index.tsx"),IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),Layout=__webpack_require__("./src/components/common/Layout/index.tsx"),Modal=__webpack_require__("./src/components/common/Modal/index.tsx"),NarrowTemplateHeader=__webpack_require__("./src/components/common/NarrowTemplateHeader/index.tsx"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Wrapper=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  padding-top: 55px;
  position: relative;

  @media (min-width: 768px) {
    padding-top: 20px;
  }

  @media (min-width: ${theme.r.breakpoint.md}) {
    padding-top: 20px;
  }
`,HeaderWrapper=styled_components_browser_esm.zo.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.r.zIndex.header};

  @media (min-width: ${theme.r.breakpoint.md}) {
    display: none;
  }
`,ProfileSection=styled_components_browser_esm.zo.section`
  width: 90%;
`,UserControlSection=styled_components_browser_esm.zo.section`
  width: 90%;
`,ButtonWrapper=styled_components_browser_esm.zo.div`
  width: 90px;
  height: 50px;
`,Input=styled_components_browser_esm.zo.input`
  width: 80%;
  border: 1px solid #f2f2f2;
  padding: 20px;
`,ModalBody=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  width: 90%;
  margin: 40px 20px 0px 16px;

  font: var(--text-caption);
`,ModalTitle=styled_components_browser_esm.zo.div`
  font: var(--text-title);
`,ModalDescription=styled_components_browser_esm.zo.div`
  font: var(--text-body);
`,ButtonListWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;

  width: 90%;
  height: 50px;

  margin-top: 20px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function MyInfo(){const navigate=(0,dist.s0)(),{isOpen,openComponent,closeComponent}=(0,useToggle.O)();return(0,jsx_runtime.jsx)(Layout.Z,{isSidebarVisible:!0,children:(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(HeaderWrapper,{children:(0,jsx_runtime.jsx)(NarrowTemplateHeader.Z,{children:(0,jsx_runtime.jsx)(IconButton.Z,{category:"back",onClick:()=>{navigate(-1)}})})}),(0,jsx_runtime.jsx)(ProfileSection,{children:(0,jsx_runtime.jsx)(UserProfile.Z,{userInfo:{nickname:"우아한 코끼리",postCount:4,voteCount:128,userPoint:200}})}),(0,jsx_runtime.jsxs)(UserControlSection,{children:[(0,jsx_runtime.jsxs)(Accordion.Z,{title:"닉네임 변경",children:[(0,jsx_runtime.jsx)(Input,{placeholder:"새로운 닉네임을 입력해주세요"}),(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"닉네임 변경",theme:"fill",children:"변경"})})]}),(0,jsx_runtime.jsxs)(Accordion.Z,{title:"회원 탈퇴",children:[(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:openComponent,"aria-label":"회원 탈퇴",theme:"blank",children:"회원 탈퇴"})}),isOpen&&(0,jsx_runtime.jsx)(Modal.Z,{size:"sm",onModalClose:closeComponent,children:(0,jsx_runtime.jsxs)(ModalBody,{children:[(0,jsx_runtime.jsx)(ModalTitle,{children:"정말 탈퇴하시겠어요?"}),(0,jsx_runtime.jsxs)(ModalDescription,{children:["탈퇴 버튼 클릭 시, ",(0,jsx_runtime.jsx)("br",{}),"계정은 삭제되며 복구되지 않아요."]}),(0,jsx_runtime.jsxs)(ButtonListWrapper,{children:[(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"회원 탈퇴",theme:"fill",children:"탈퇴"}),(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:closeComponent,"aria-label":"회원 탈퇴",theme:"blank",children:"취소"})]})]})})]})]})]})})}MyInfo.displayName="MyInfo";const MyInfo_stories={component:MyInfo},Default={render:()=>(0,jsx_runtime.jsx)(MyInfo,{})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <MyInfo />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/Accordion/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Accordion});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.ZP.div`
  width: 100%;

  font: var(--text-caption);
`,Title=styled_components_browser_esm.ZP.div`
  display: flex;
  justify-content: space-between;

  border: 1px solid #f2f2f2;
  border-radius: 7px 7px 0 0;
  padding: 16px;

  background-color: #ffffff;

  &:hover {
    background-color: #f2f2f2;
  }
  cursor: pointer;
`,Content=styled_components_browser_esm.ZP.div`
  display: ${props=>props.$isOpen?"flex":"none"};
  justify-content: space-between;

  border: 1px solid #f2f2f2;
  border-radius: 0 0 7px 7px;
  padding: 16px;

  opacity: ${props=>props.$isOpen?1:0};
  animation: ${props=>props.$isOpen?fadeIn:fadeOut} 0.2s ease-in-out;
`,Image=styled_components_browser_esm.ZP.img`
  width: 20px;
  height: 20px;
`,fadeIn=styled_components_browser_esm.F4`
  from {
    opacity: 0;
    height: 0;
  }
  to {
    opacity: 1;
    height: auto;
  }
`,fadeOut=styled_components_browser_esm.F4`
  from {
    opacity: 1;
    height: auto;
  }
  to {
    opacity: 0;
    height: 0;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Accordion({title,children}){const[isOpen,setIsOpen]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(Wrapper,{"aria-label":"Accordion",children:[(0,jsx_runtime.jsxs)(Title,{onClick:()=>{setIsOpen(!isOpen)},"aria-controls":`${title}에 대한 내용`,children:[title,(0,jsx_runtime.jsx)(Image,{src:isOpen?chevron_up:chevron_down,alt:"",$isOpen:isOpen})]}),(0,jsx_runtime.jsx)(Content,{id:`${title}에 대한 내용`,$isOpen:isOpen,children})]})}Accordion.displayName="Accordion";try{Accordion.displayName="Accordion",Accordion.__docgenInfo={description:"",displayName:"Accordion",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/index.tsx#Accordion"]={docgenInfo:Accordion.__docgenInfo,name:"Accordion",path:"src/components/common/Accordion/index.tsx#Accordion"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/IconButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>IconButton});const back_namespaceObject=__webpack_require__.p+"static/media/back.0d0cf282.svg",category_namespaceObject=__webpack_require__.p+"static/media/category.5dbd06d6.svg",search_white_namespaceObject=__webpack_require__.p+"static/media/search_white.74caf850.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  background-color: rgba(0, 0, 0, 0);

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ICON_CATEGORY={category:{name:"카테고리",url:category_namespaceObject},back:{name:"뒤로가기",url:back_namespaceObject},search:{name:"검색",url:search_white_namespaceObject}};function IconButton({category,...rest}){const src=ICON_CATEGORY[category].url,ariaLabelText=ICON_CATEGORY[category].name;return(0,jsx_runtime.jsx)(Button,{"aria-label":ariaLabelText,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:`${ariaLabelText} 버튼`})})}IconButton.displayName="IconButton";try{IconButton.displayName="IconButton",IconButton.__docgenInfo={description:"",displayName:"IconButton",props:{category:{defaultValue:null,description:"",name:"category",required:!0,type:{name:"enum",value:[{value:'"search"'},{value:'"category"'},{value:'"back"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/IconButton/index.tsx#IconButton"]={docgenInfo:IconButton.__docgenInfo,name:"IconButton",path:"src/components/common/IconButton/index.tsx#IconButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Layout/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Layout});var react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),Dashboard=__webpack_require__("./src/components/common/Dashboard/index.tsx"),WideHeader=__webpack_require__("./src/components/common/WideHeader/index.tsx");const MOCK_FAVORITE_CATEGORIES=[{id:12312,name:"음식",isFavorite:!1},{id:12,name:"연애",isFavorite:!0},{id:13,name:"패션",isFavorite:!0},{id:14,name:"금융",isFavorite:!1}];var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Layout({children,isSidebarVisible}){const navigate=(0,dist.s0)(),{loggedInfo}=(0,react.useContext)(auth.V),categoryList=MOCK_FAVORITE_CATEGORIES;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(WideHeaderWrapper,{children:(0,jsx_runtime.jsx)(WideHeader.Z,{handleLogoClick:()=>{navigate("/")}})}),(0,jsx_runtime.jsxs)(ContentContainer,{children:[isSidebarVisible&&(0,jsx_runtime.jsx)(DashboardWrapper,{children:(0,jsx_runtime.jsx)(Dashboard.Z,{userInfo:loggedInfo.userInfo,categoryList,selectedCategory:undefined,handleLogoutClick:()=>{}})}),(0,jsx_runtime.jsx)(MainContainer,{$isSidebarVisible:isSidebarVisible,children:(0,jsx_runtime.jsx)(ChildrenWrapper,{$isSidebarVisible:isSidebarVisible,children})})]})]})}Layout.displayName="Layout";try{Layout.displayName="Layout",Layout.__docgenInfo={description:"",displayName:"Layout",props:{isSidebarVisible:{defaultValue:null,description:"",name:"isSidebarVisible",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Layout/index.tsx#Layout"]={docgenInfo:Layout.__docgenInfo,name:"Layout",path:"src/components/common/Layout/index.tsx#Layout"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Modal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Modal});var react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const MODAL_SIZE={sm:"290px",md:"590px",lg:"700px"},All=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;
`,Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.35);
`,Container=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-rows: 1fr 6fr;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: ${props=>MODAL_SIZE[props.size]};
  height: 290px;
  border-radius: 12px;
  border: 2px solid #f6f6f6;
  padding: 5px;

  background-color: white;

  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Modal({onModalClose,children,size}){const BackDropRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{const handler=e=>{e.target===BackDropRef.current&&onModalClose()};return document.addEventListener("click",handler),()=>document.removeEventListener("click",handler)}),[BackDropRef,onModalClose]),(0,jsx_runtime.jsxs)(All,{children:[(0,jsx_runtime.jsx)(Backdrop,{ref:BackDropRef}),(0,jsx_runtime.jsx)(Container,{size,children})]})}Modal.displayName="Modal";try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{onModalClose:{defaultValue:null,description:"",name:"onModalClose",required:!0,type:{name:"() => void"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/index.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/index.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/NarrowTemplateHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>NarrowTemplateHeader});const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function NarrowTemplateHeader({children}){return(0,jsx_runtime.jsx)(Container,{children})}NarrowTemplateHeader.displayName="NarrowTemplateHeader";try{NarrowTemplateHeader.displayName="NarrowTemplateHeader",NarrowTemplateHeader.__docgenInfo={description:"",displayName:"NarrowTemplateHeader",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"]={docgenInfo:NarrowTemplateHeader.__docgenInfo,name:"NarrowTemplateHeader",path:"src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SearchBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SearchBar});var path=__webpack_require__("./src/constants/path.ts"),post=__webpack_require__("./src/constants/post.ts");const search_black_namespaceObject=__webpack_require__.p+"static/media/search_black.af78e45d.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const formSize={sm:"170px",md:"250px",lg:"400px"},Form=styled_components_browser_esm.zo.form`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WideHeader({handleLogoClick}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(LogoButton.Z,{content:"full",onClick:handleLogoClick}),(0,jsx_runtime.jsx)(SearchBar.Z,{size:"sm"})]})}WideHeader.displayName="WideHeader";try{WideHeader.displayName="WideHeader",WideHeader.__docgenInfo={description:"",displayName:"WideHeader",props:{handleLogoClick:{defaultValue:null,description:"",name:"handleLogoClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/WideHeader/index.tsx#WideHeader"]={docgenInfo:WideHeader.__docgenInfo,name:"WideHeader",path:"src/components/common/WideHeader/index.tsx#WideHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useToggle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>useToggle});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useToggle=()=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return{isOpen,openComponent:()=>{setIsOpen(!0)},closeComponent:()=>{setIsOpen(!1)},toggleComponent:()=>{setIsOpen((prevIsOpen=>!prevIsOpen))}}}}}]);
//# sourceMappingURL=pages-MyInfo-MyInfo-stories.fef11c4c.iframe.bundle.js.map