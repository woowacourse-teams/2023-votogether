"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[9993],{"./src/pages/MyInfo/MyInfo.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>MyInfo_stories});var react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),userInfo=__webpack_require__("./src/api/userInfo.ts"),queryKey=__webpack_require__("./src/constants/queryKey.ts");var useText=__webpack_require__("./src/hooks/useText.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),useToggle=__webpack_require__("./src/hooks/useToggle.tsx"),Accordion=__webpack_require__("./src/components/common/Accordion/index.tsx"),GuestProfile=__webpack_require__("./src/components/common/Dashboard/GuestProfile/index.tsx"),UserProfile=__webpack_require__("./src/components/common/Dashboard/UserProfile/index.tsx"),IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),Layout=__webpack_require__("./src/components/common/Layout/index.tsx"),NarrowTemplateHeader=__webpack_require__("./src/components/common/NarrowTemplateHeader/index.tsx"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),Toast=__webpack_require__("./src/components/common/Toast/index.tsx"),policyMessage=__webpack_require__("./src/constants/policyMessage.ts"),user=__webpack_require__("./src/constants/user.ts"),Modal=__webpack_require__("./src/components/common/Modal/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const ModalBody=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  width: 90%;
  margin: 40px 20px 0px 16px;

  font: var(--text-caption);
`,ModalTitle=styled_components_browser_esm.zo.div`
  font: var(--text-title);
`,ModalDescription=styled_components_browser_esm.zo.div`
  color: gray;
  font-size: 16px;
`,ButtonListWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;

  width: 90%;
  height: 50px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function DeleteMemberModal({handleModalClose,handleWithdrawalMembership}){return(0,jsx_runtime.jsx)(Modal.Z,{size:"sm",onModalClose:handleModalClose,children:(0,jsx_runtime.jsxs)(ModalBody,{children:[(0,jsx_runtime.jsx)(ModalTitle,{children:"정말 탈퇴하시겠어요?"}),(0,jsx_runtime.jsxs)(ModalDescription,{children:["탈퇴 버튼 클릭 시, ",(0,jsx_runtime.jsx)("br",{}),"계정은 삭제되며 복구되지 않아요.",(0,jsx_runtime.jsxs)("p",{children:["작성한 게시글과 투표 기록 등 ",(0,jsx_runtime.jsx)("br",{})," 서비스 사용 내역이 사라지므로 ",(0,jsx_runtime.jsx)("br",{}),"유의해주세요."]})]}),(0,jsx_runtime.jsxs)(ButtonListWrapper,{children:[(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:handleWithdrawalMembership,"aria-label":"회원 탈퇴",theme:"fill",children:"탈퇴"}),(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:handleModalClose,"aria-label":"회원 탈퇴",theme:"blank",children:"취소"})]})]})})}DeleteMemberModal.displayName="DeleteMemberModal";try{DeleteMemberModal.displayName="DeleteMemberModal",DeleteMemberModal.__docgenInfo={description:"",displayName:"DeleteMemberModal",props:{handleModalClose:{defaultValue:null,description:"",name:"handleModalClose",required:!0,type:{name:"() => void"}},handleWithdrawalMembership:{defaultValue:null,description:"",name:"handleWithdrawalMembership",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/MyInfo/DeleteMemberModal/index.tsx#DeleteMemberModal"]={docgenInfo:DeleteMemberModal.__docgenInfo,name:"DeleteMemberModal",path:"src/pages/MyInfo/DeleteMemberModal/index.tsx#DeleteMemberModal"})}catch(__react_docgen_typescript_loader_error){}var theme=__webpack_require__("./src/styles/theme.ts");const Wrapper=styled_components_browser_esm.zo.div`
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

  @media (min-width: ${theme.r.breakpoint.sm}) {
    padding-top: 20px;
  }
`,HeaderWrapper=styled_components_browser_esm.zo.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.r.zIndex.header};

  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: none;
  }
`,ProfileSection=styled_components_browser_esm.zo.section`
  width: 90%;
`,UserControlSection=styled_components_browser_esm.zo.section`
  width: 90%;
`,DescribeUl=styled_components_browser_esm.zo.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin: 0 0 20px 5px;
`,InputWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Input=styled_components_browser_esm.zo.input`
  width: 80%;
  border: 1px solid #f2f2f2;
  padding: 20px;
`,ButtonWrapper=styled_components_browser_esm.zo.div`
  width: 90px;
  height: 50px;
`;styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  width: 90%;
  margin: 40px 20px 0px 16px;

  font: var(--text-caption);
`,styled_components_browser_esm.zo.div`
  font: var(--text-title);
`,styled_components_browser_esm.zo.div`
  color: gray;
  font-size: 16px;
`,styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;

  width: 90%;
  height: 50px;
`;function MyInfo(){const navigate=(0,dist.s0)(),{mutate:modifyNickname,isSuccess:isModifyNicknameSuccess,isError:isModifyNicknameError,error:modifyNicknameError}=(()=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isLoading,isSuccess,isError,error}=(0,useMutation.D)({mutationFn:nickname=>(0,userInfo.K7)(nickname),onMutate:async newNickname=>{await queryClient.cancelQueries({queryKey:[queryKey.l.USER_INFO]});const previousNickname=queryClient.getQueryData([queryKey.l.USER_INFO]);return queryClient.setQueryData([queryKey.l.USER_INFO],newNickname),{previousNickname,newNickname}},onError:(error,__,context)=>{queryClient.setQueryData([queryKey.l.USER_INFO],context?.previousNickname),window.console.error("닉네임 변경에 실패했습니다.")},onSettled:()=>{queryClient.invalidateQueries({queryKey:[queryKey.l.USER_INFO]})}});return{mutate,isLoading,isSuccess,isError,error}})(),{mutate:withdrawalMembership,isSuccess:isWithdrawalMembershipSuccess,isError:isWithdrawalMembershipError,error:withdrawalMembershipError}=(()=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isLoading,isSuccess,isError,error}=(0,useMutation.D)({mutationFn:async()=>await(0,userInfo.N6)(),onSuccess:()=>{queryClient.invalidateQueries({queryKey:[queryKey.l.USER_INFO,!0]})},onError:()=>{window.console.error("회원 탈퇴에 실패했습니다."),alert("회원 탈퇴에 실패했습니다.")}});return{mutate,isLoading,isSuccess,isError,error}})(),{isToastOpen,openToast,toastMessage}=(0,useToast.p)(),{isOpen,openComponent,closeComponent}=(0,useToggle.O)(),{loggedInfo,clearLoggedInfo}=(0,react.useContext)(auth.V),{text:newNickname,handleTextChange:handleNicknameChange}=(0,useText.X)(loggedInfo.userInfo?.nickname??"");return(0,react.useEffect)((()=>{isModifyNicknameSuccess&&openToast("닉네임을 성공적으로 변경했습니다.")}),[isModifyNicknameSuccess]),(0,react.useEffect)((()=>{if(isModifyNicknameError&&modifyNicknameError instanceof Error){const errorResponse=JSON.parse(modifyNicknameError.message);openToast(errorResponse.message)}else;}),[isModifyNicknameError,modifyNicknameError]),(0,react.useEffect)((()=>{isWithdrawalMembershipSuccess&&(clearLoggedInfo(),navigate("/"))}),[isWithdrawalMembershipSuccess]),(0,react.useEffect)((()=>{if(isWithdrawalMembershipError&&withdrawalMembershipError instanceof Error){const errorResponse=JSON.parse(withdrawalMembershipError.message);openToast(errorResponse.message)}else;}),[isWithdrawalMembershipError,withdrawalMembershipError]),(0,jsx_runtime.jsx)(Layout.Z,{isSidebarVisible:!0,children:(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(HeaderWrapper,{children:(0,jsx_runtime.jsx)(NarrowTemplateHeader.Z,{children:(0,jsx_runtime.jsx)(IconButton.Z,{category:"back",onClick:()=>{navigate(-1)}})})}),(0,jsx_runtime.jsx)(ProfileSection,{children:loggedInfo.userInfo?(0,jsx_runtime.jsx)(UserProfile.Z,{userInfo:loggedInfo.userInfo}):(0,jsx_runtime.jsx)(GuestProfile.Z,{})}),(0,jsx_runtime.jsxs)(UserControlSection,{children:[(0,jsx_runtime.jsxs)(Accordion.Z,{title:"닉네임 변경",children:[(0,jsx_runtime.jsxs)(DescribeUl,{children:[(0,jsx_runtime.jsxs)("li",{children:["- ",policyMessage.Rp.LETTER_AMOUNT]}),(0,jsx_runtime.jsxs)("li",{children:["- ",policyMessage.Rp.LIMIT_LETTER_TYPE]}),(0,jsx_runtime.jsxs)("li",{children:["- ",policyMessage.Rp.LIMIT_CHANGING]}),(0,jsx_runtime.jsxs)("li",{children:["- ",policyMessage.Rp.NO_DUPLICATION]}),(0,jsx_runtime.jsxs)("li",{children:["- ",policyMessage.Rp.LIMIT_KOREAN]})]}),(0,jsx_runtime.jsxs)(InputWrapper,{children:[(0,jsx_runtime.jsx)(Input,{value:newNickname,onChange:e=>handleNicknameChange(e,user.O),placeholder:"새로운 닉네임을 입력해주세요"}),(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"닉네임 변경",theme:"fill",onClick:()=>{modifyNickname(newNickname)},children:"변경"})})]})]}),(0,jsx_runtime.jsxs)(Accordion.Z,{title:"회원 탈퇴",children:[(0,jsx_runtime.jsx)(ButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:openComponent,"aria-label":"회원 탈퇴",theme:"blank",children:"회원 탈퇴"})}),isOpen&&(0,jsx_runtime.jsx)(DeleteMemberModal,{handleModalClose:closeComponent,handleWithdrawalMembership:()=>{withdrawalMembership()}})]})]}),isToastOpen&&(0,jsx_runtime.jsx)(Toast.Z,{size:"md",position:"bottom",children:toastMessage})]})})}MyInfo.displayName="MyInfo";const MyInfo_stories={component:MyInfo},Default={render:()=>(0,jsx_runtime.jsx)(MyInfo,{})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <MyInfo />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/Accordion/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Accordion});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.ZP.div`
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
  display: ${props=>props.$isOpen?"block":"none"};
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Accordion({title,ariaLabel="메뉴",children}){const[isOpen,setIsOpen]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsxs)(Title,{"aria-label":isOpen?`${ariaLabel} 닫기`:`${ariaLabel} 열기`,tabIndex:0,onClick:()=>{setIsOpen(!isOpen)},"aria-controls":`${title}에 대한 내용`,children:[title,(0,jsx_runtime.jsx)(Image,{src:isOpen?chevron_up:chevron_down,alt:"",$isOpen:isOpen})]}),(0,jsx_runtime.jsx)(Content,{"aria-live":"polite",id:`${title}에 대한 내용`,$isOpen:isOpen,children})]})}Accordion.displayName="Accordion";try{Accordion.displayName="Accordion",Accordion.__docgenInfo={description:"",displayName:"Accordion",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},ariaLabel:{defaultValue:{value:"메뉴"},description:"",name:"ariaLabel",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/index.tsx#Accordion"]={docgenInfo:Accordion.__docgenInfo,name:"Accordion",path:"src/components/common/Accordion/index.tsx#Accordion"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/IconButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>IconButton});const back_namespaceObject=__webpack_require__.p+"static/media/back.0d0cf282.svg",category_namespaceObject=__webpack_require__.p+"static/media/category.5dbd06d6.svg",ranking_namespaceObject=__webpack_require__.p+"static/media/ranking.bc2e65d6.svg",retry_namespaceObject=__webpack_require__.p+"static/media/retry.d97418a2.svg",search_white_namespaceObject=__webpack_require__.p+"static/media/search_white.74caf850.svg",user_namespaceObject=__webpack_require__.p+"static/media/user.87af8a44.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;

  background-color: ${props=>props.$isRoundBackground?"var(--gray)":"rgba(0, 0, 0, 0)"};

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ICON_CATEGORY={category:{name:"카테고리",url:category_namespaceObject,isRoundBackground:!1},back:{name:"뒤로가기",url:back_namespaceObject,isRoundBackground:!1},search:{name:"검색",url:search_white_namespaceObject,isRoundBackground:!1},retry:{name:"다시시도",url:retry_namespaceObject,isRoundBackground:!1},userInfo:{name:"사용자 페이지 이동",url:user_namespaceObject,isRoundBackground:!0},ranking:{name:"랭킹 페이지 이동",url:ranking_namespaceObject,isRoundBackground:!1}};function IconButton({category,...rest}){const src=ICON_CATEGORY[category].url,ariaLabelText=ICON_CATEGORY[category].name;return(0,jsx_runtime.jsx)(Button,{"aria-label":ariaLabelText,$isRoundBackground:ICON_CATEGORY[category].isRoundBackground,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:`${ariaLabelText} 버튼`})})}IconButton.displayName="IconButton";try{IconButton.displayName="IconButton",IconButton.__docgenInfo={description:"",displayName:"IconButton",props:{category:{defaultValue:null,description:"",name:"category",required:!0,type:{name:"enum",value:[{value:'"search"'},{value:'"category"'},{value:'"back"'},{value:'"retry"'},{value:'"userInfo"'},{value:'"ranking"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/IconButton/index.tsx#IconButton"]={docgenInfo:IconButton.__docgenInfo,name:"IconButton",path:"src/components/common/IconButton/index.tsx#IconButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Layout/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Layout});var Dashboard=__webpack_require__("./src/components/common/Dashboard/index.tsx"),WideHeader=__webpack_require__("./src/components/common/WideHeader/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
  width: 225px;
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Layout({children,isSidebarVisible}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(WideHeaderWrapper,{children:(0,jsx_runtime.jsx)(WideHeader.Z,{})}),(0,jsx_runtime.jsxs)(ContentContainer,{children:[isSidebarVisible&&(0,jsx_runtime.jsx)(DashboardWrapper,{children:(0,jsx_runtime.jsx)(Dashboard.Z,{})}),(0,jsx_runtime.jsx)(MainContainer,{$isSidebarVisible:isSidebarVisible,children:(0,jsx_runtime.jsx)(ChildrenWrapper,{$isSidebarVisible:isSidebarVisible,children})})]})]})}Layout.displayName="Layout";try{Layout.displayName="Layout",Layout.__docgenInfo={description:"",displayName:"Layout",props:{isSidebarVisible:{defaultValue:null,description:"",name:"isSidebarVisible",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Layout/index.tsx#Layout"]={docgenInfo:Layout.__docgenInfo,name:"Layout",path:"src/components/common/Layout/index.tsx#Layout"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/LogoButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LogoButton});var logo=__webpack_require__("./src/assets/logo.svg");const projectName_namespaceObject=__webpack_require__.p+"static/media/projectName.7b011954.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const contentCategory={icon:{name:"보투게더 로고 아이콘",url:logo},text:{name:"보투게더 아이콘",url:projectName_namespaceObject},full:{name:"보투게더 아이콘",url:""}};function LogoButton({content,...rest}){const src=contentCategory[content].url,ariaLabelText=contentCategory[content].name;return"full"===content?(0,jsx_runtime.jsxs)(Button,{content,"aria-label":ariaLabelText,...rest,children:[(0,jsx_runtime.jsx)("img",{src:logo,alt:"로고 아이콘"}),(0,jsx_runtime.jsx)("img",{src:projectName_namespaceObject,alt:"보투게더 아이콘"})]}):(0,jsx_runtime.jsx)(Button,{content,"aria-label":ariaLabelText,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:"보투게더 아이콘"})})}LogoButton.displayName="LogoButton";try{LogoButton.displayName="LogoButton",LogoButton.__docgenInfo={description:"",displayName:"LogoButton",props:{content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"enum",value:[{value:'"text"'},{value:'"icon"'},{value:'"full"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/LogoButton/index.tsx#LogoButton"]={docgenInfo:LogoButton.__docgenInfo,name:"LogoButton",path:"src/components/common/LogoButton/index.tsx#LogoButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Modal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Modal});var react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const MODAL_SIZE={sm:"290px",md:"590px",lg:"700px"},All=styled_components_browser_esm.zo.div`
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
`,HiddenCloseButton=styled_components_browser_esm.zo.button`
  position: absolute;
  left: -10000px;
  top: -10000px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Modal({onModalClose,children,size}){const BackDropRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{const handler=e=>{e.target===BackDropRef.current&&onModalClose()};return document.addEventListener("click",handler),()=>document.removeEventListener("click",handler)}),[BackDropRef,onModalClose]),(0,jsx_runtime.jsxs)(All,{children:[(0,jsx_runtime.jsx)(HiddenCloseButton,{onClick:onModalClose,tabIndex:0,"aria-label":"팝업 창 닫기"}),(0,jsx_runtime.jsx)(Backdrop,{ref:BackDropRef}),(0,jsx_runtime.jsx)(Container,{tabIndex:0,size,children})]})}Modal.displayName="Modal";try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{onModalClose:{defaultValue:null,description:"",name:"onModalClose",required:!0,type:{name:"() => void"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/index.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/index.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/NarrowTemplateHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>NarrowTemplateHeader});const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function NarrowTemplateHeader({children}){return(0,jsx_runtime.jsx)(Container,{children})}NarrowTemplateHeader.displayName="NarrowTemplateHeader";try{NarrowTemplateHeader.displayName="NarrowTemplateHeader",NarrowTemplateHeader.__docgenInfo={description:"",displayName:"NarrowTemplateHeader",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"]={docgenInfo:NarrowTemplateHeader.__docgenInfo,name:"NarrowTemplateHeader",path:"src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SearchBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SearchBar});var useCurrentKeyword=__webpack_require__("./src/hooks/useCurrentKeyword.ts"),react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),post=__webpack_require__("./src/constants/post.ts"),getTrimmedWord=__webpack_require__("./src/utils/getTrimmedWord.ts"),useText=__webpack_require__("./src/hooks/useText.ts");const useSearch=(initialKeyword="")=>{const navigate=(0,dist.s0)(),searchInputRef=(0,react.useRef)(null),{text:keyword,setText:setKeyword,handleTextChange}=(0,useText.X)(initialKeyword);return{keyword,handleKeywordChange:event=>{searchInputRef.current&&handleTextChange(event,{MAX_LENGTH:post.ko,MIN_LENGTH:0})},handleSearchSubmit:event=>{if(event.preventDefault(),!searchInputRef.current)return;const trimmedKeyword=(0,getTrimmedWord.s)(keyword);if(keyword!==trimmedKeyword&&setKeyword(trimmedKeyword),""===trimmedKeyword)return searchInputRef.current.setCustomValidity("검색어를 입력해주세요"),void searchInputRef.current.reportValidity();navigate(`/search?keyword=${trimmedKeyword}`)},searchInputRef}};var path=__webpack_require__("./src/constants/path.ts");const search_black_namespaceObject=__webpack_require__.p+"static/media/search_black.af78e45d.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const formSize={sm:"170px",md:"250px",lg:"400px"},Form=styled_components_browser_esm.zo.form`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SearchBar({size,isOpen,...rest}){const{currentKeyword}=(0,useCurrentKeyword.H)(),{keyword,handleKeywordChange,handleSearchSubmit,searchInputRef}=useSearch(currentKeyword);return(0,jsx_runtime.jsxs)(Form,{size,action:path.m.SEARCH,onSubmit:handleSearchSubmit,children:[(0,jsx_runtime.jsx)(Input,{ref:searchInputRef,maxLength:post.ko+1,"aria-label":"게시글 제목 및 내용 검색창",type:"search",value:keyword,onChange:handleKeywordChange,autoComplete:"off",name:post.Kn,...rest}),(0,jsx_runtime.jsx)(Button,{type:"submit",children:(0,jsx_runtime.jsx)("img",{src:search_black_namespaceObject,alt:"검색버튼"})}),isOpen&&(0,jsx_runtime.jsx)(ScreenReaderDirection,{"aria-live":"polite",children:"검색창을 닫으려면 검색창 외부를 클릭해주세요."})]})}SearchBar.displayName="SearchBar";try{SearchBar.displayName="SearchBar",SearchBar.__docgenInfo={description:"",displayName:"SearchBar",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SearchBar/index.tsx#SearchBar"]={docgenInfo:SearchBar.__docgenInfo,name:"SearchBar",path:"src/components/common/SearchBar/index.tsx#SearchBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/WideHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WideHeader});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),path=__webpack_require__("./src/constants/path.ts"),IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),LogoButton=__webpack_require__("./src/components/common/LogoButton/index.tsx"),SearchBar=__webpack_require__("./src/components/common/SearchBar/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 70px;

  position: fixed;
  top: 0;

  background-color: var(--header);

  padding: 0 80px;
`,LogoWrapper=styled_components_browser_esm.zo.div`
  height: 50%;
`,Wrapper=styled_components_browser_esm.zo.div`
  display: flex;
  gap: 15px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WideHeader(){const navigate=(0,dist.s0)();return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(LogoWrapper,{children:(0,jsx_runtime.jsx)(LogoButton.Z,{content:"full",onClick:()=>{navigate("/")}})}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(SearchBar.Z,{size:"sm"}),(0,jsx_runtime.jsx)(IconButton.Z,{category:"userInfo",onClick:()=>{navigate(path.m.USER_INFO)}}),(0,jsx_runtime.jsx)(IconButton.Z,{category:"ranking",onClick:()=>{navigate(path.m.RANKING)}})]})]})}WideHeader.displayName="WideHeader"},"./src/constants/policyMessage.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K8:()=>CONTENT_PLACEHOLDER,NF:()=>POST_DEADLINE_POLICY,Nk:()=>POST_TITLE_POLICY,Rp:()=>NICKNAME_POLICY,kL:()=>POST_OPTION_POLICY});const NICKNAME_POLICY={LETTER_AMOUNT:"2자에서 15자 이내로 입력해주세요.",NO_DUPLICATION:"중복된 닉네임은 사용할 수 없습니다.",LIMIT_CHANGING:"닉네임 변경은 14일간 1회로 제한됩니다.",LIMIT_LETTER_TYPE:"한글/영어/숫자를 사용해 닉네임을 지어주세요.",LIMIT_KOREAN:"한글은 완전한 단어만 가능합니다."},POST_TITLE_POLICY={DEFAULT:"제목을 입력해주세요 (100자 이내)",LETTER_AMOUNT:"100자 이내로 입력해주세요."},POST_CONTENT_POLICY={DEFAULT:"내용을 입력해주세요 (1000자 이내)",LETTER_AMOUNT:"1000자 이내로 입력해주세요.",PHOTO_COUNT:"1장의 사진을 업로드 할 수 있습니다.",PHOTO_SHAPE:"사진은 정사각형으로 잘라져 업로드됩니다.",PHOTO_CAPACITY:"용량은 1.5MB으로 제한됩니다."},POST_OPTION_POLICY={DEFAULT:"선택지를 입력해주세요 (50자 이내)",LETTER_AMOUNT:"50자 이내로 입력해주세요.",AMOUNT:"2개 ~ 5개 선택지를 작성해주세요.",PHOTO_COUNT:"1장의 사진을 업로드 할 수 있습니다.",PHOTO_SHAPE:"사진은 정사각형으로 잘라져 업로드됩니다.",PHOTO_CAPACITY:"용량은 1.5MB으로 제한됩니다."},POST_DEADLINE_POLICY={DEFAULT:"3일 이내로 마감시간을 정해주세요."},CONTENT_PLACEHOLDER=[POST_CONTENT_POLICY.DEFAULT,POST_CONTENT_POLICY.PHOTO_COUNT,POST_CONTENT_POLICY.PHOTO_CAPACITY,POST_CONTENT_POLICY.PHOTO_SHAPE].join("\n - ")},"./src/constants/user.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>BIRTH_YEAR,O:()=>NICKNAME});const NICKNAME={MAX_LENGTH:15,MIN_LENGTH:2},BIRTH_YEAR={MAX_LENGTH:(new Date).getFullYear(),MIN_LENGTH:1900}},"./src/hooks/useText.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>useText});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useText=originalText=>{const[text,setText]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(originalText);return{text,setText,handleTextChange:(event,limit)=>{const{value}=event.target;if(value.length>limit.MAX_LENGTH)return event.target.setCustomValidity(`해당 입력값은 ${limit.MAX_LENGTH}자까지 입력 가능합니다.`),void event.target.reportValidity();setText(value),event.target.setCustomValidity("")},resetText:()=>{setText("")}}}},"./src/hooks/useToggle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>useToggle});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useToggle=(isInitialOpen=!1)=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(isInitialOpen);return{isOpen,openComponent:()=>{setIsOpen(!0)},closeComponent:()=>{setIsOpen(!1)},toggleComponent:()=>{setIsOpen((prevIsOpen=>!prevIsOpen))}}};try{useToggle.displayName="useToggle",useToggle.__docgenInfo={description:"",displayName:"useToggle",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useToggle.tsx#useToggle"]={docgenInfo:useToggle.__docgenInfo,name:"useToggle",path:"src/hooks/useToggle.tsx#useToggle"})}catch(__react_docgen_typescript_loader_error){}},"./src/assets/logo.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/logo.9ee58604.svg"}}]);
//# sourceMappingURL=pages-MyInfo-MyInfo-stories.7ecc6731.iframe.bundle.js.map