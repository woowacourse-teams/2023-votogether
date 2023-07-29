"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[5696],{"./src/pages/VoteStatistics/VoteStatistics.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultPage:()=>DefaultPage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>VoteStatistics_stories});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),useFetch=__webpack_require__("./src/hooks/useFetch.ts"),post=__webpack_require__("./src/api/post.ts"),api_voteResult=__webpack_require__("./src/api/voteResult.ts"),IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),Layout=__webpack_require__("./src/components/common/Layout/index.tsx"),LoadingSpinner=__webpack_require__("./src/components/common/LoadingSpinner/index.tsx"),NarrowTemplateHeader=__webpack_require__("./src/components/common/NarrowTemplateHeader/index.tsx"),VoteStatistics=__webpack_require__("./src/components/VoteStatistics/index.tsx"),OptionStatistics=__webpack_require__("./src/pages/VoteStatistics/OptionStatistics/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 50px;
  margin-bottom: 20px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    margin-top: 30px;
  }
`,HeaderWrapper=styled_components_browser_esm.zo.div`
  position: fixed;
  z-index: ${theme.r.zIndex.header};

  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: none;
  }
`,PageHeader=styled_components_browser_esm.zo.div`
  margin: 15px;

  font: var(--text-title);
`,OptionContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`,LoadingWrapper=styled_components_browser_esm.zo.div`
  display: flex;

  height: 100px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function VoteStatisticsPage(){const navigate=(0,dist.s0)(),{data:postDetail,errorMessage:postError,isLoading:isPostLoading}=(0,useFetch.i)((()=>(0,post.xl)(1))),{data:voteResult,errorMessage:voteResultError,isLoading:isVoteResultLoading}=(0,useFetch.i)((()=>(0,api_voteResult.a)(1)));return(0,jsx_runtime.jsxs)(Layout.Z,{isSidebarVisible:!0,children:[(0,jsx_runtime.jsx)(HeaderWrapper,{children:(0,jsx_runtime.jsx)(NarrowTemplateHeader.Z,{children:(0,jsx_runtime.jsx)(IconButton.Z,{category:"back",onClick:()=>{navigate("/posts/1")}})})}),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(PageHeader,{children:"투표 통계"}),postError&&(0,jsx_runtime.jsx)("div",{children:postError}),isPostLoading&&(0,jsx_runtime.jsx)(LoadingWrapper,{children:(0,jsx_runtime.jsx)(LoadingSpinner.Z,{size:"md"})}),postDetail&&(0,jsx_runtime.jsxs)(OptionContainer,{children:[voteResultError&&(0,jsx_runtime.jsx)("div",{children:voteResultError}),isVoteResultLoading&&(0,jsx_runtime.jsx)(LoadingWrapper,{children:(0,jsx_runtime.jsx)(LoadingSpinner.Z,{size:"sm"})}),voteResult&&(0,jsx_runtime.jsx)(VoteStatistics.Z,{voteResult,size:"md"}),postDetail.voteInfo.options.map((option=>{const{postId,voteInfo}=postDetail;return(0,jsx_runtime.jsx)(OptionStatistics.Z,{postId,isSelectedOption:voteInfo.selectedOptionId===option.id,voteOption:option,size:"sm"},option.id)}))]})]})]})}VoteStatisticsPage.displayName="VoteStatisticsPage";const VoteStatistics_stories={component:VoteStatisticsPage},DefaultPage={render:()=>(0,jsx_runtime.jsx)(VoteStatisticsPage,{})};DefaultPage.parameters={...DefaultPage.parameters,docs:{...DefaultPage.parameters?.docs,source:{originalSource:"{\n  render: () => <VoteStatisticsPage />\n}",...DefaultPage.parameters?.docs?.source}}};const __namedExportsOrder=["DefaultPage"]},"./src/api/post.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Gi:()=>votePost,M8:()=>removePost,dq:()=>editPost,hQ:()=>changeVotedOption,qb:()=>createPost,xl:()=>getPost,yx:()=>setEarlyClosePost});var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/fetch.ts");const votePost=async(postId,optionId)=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.ZL)(`/posts/${postId}/options/${optionId}`,""),changeVotedOption=async(postId,optionData)=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.XH)(`/posts/${postId}/options?source=${optionData.originOptionId}&target=${optionData.newOptionId}`),getPost=async postId=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)(`/posts/${postId}`),createPost=async newPost=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.hO)("/posts",newPost),editPost=async(postId,updatedPost)=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.$V)(`/posts/${postId}`,updatedPost),removePost=async postId=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.Wq)(`/posts/${postId}`),setEarlyClosePost=async postId=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.XH)(`/posts/${postId}/close`)},"./src/api/voteResult.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>getOptionStatistics,a:()=>getPostStatistics});var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/fetch.ts");const getPostStatistics=async postId=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)(`/posts/${postId}/options`),getOptionStatistics=async({postId,optionId})=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)(`/posts/${postId}/options/${optionId}`)},"./src/components/VoteStatistics/GraphStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>GraphContainer,x:()=>Line});var styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_styles_theme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styles/theme.ts");const size={sm:{height:"200px",linePositionTop:"165px"},md:{height:"230px",linePositionTop:"194px"},lg:{height:"260px",linePositionTop:"224px"}},GraphContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  display: flex;

  height: ${props=>`${size[props.$size].height}`};

  position: relative;

  font: var(--text-small);

  @media (min-width: ${_styles_theme__WEBPACK_IMPORTED_MODULE_0__.r.breakpoint.sm}) {
    font: var(--text-caption);
  }
`,Line=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  width: 100%;
  border-bottom: 2px solid black;

  position: absolute;
  top: ${props=>`${size[props.$size].linePositionTop}`};
`},"./src/components/VoteStatistics/OneLineGraph/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>OneLineGraph});var GraphStyle=__webpack_require__("./src/components/VoteStatistics/GraphStyle.ts"),type=__webpack_require__("./src/components/VoteStatistics/type.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const OptionContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;

  width: ${props=>"sm"===props.$size?"30px":"md"===props.$size?"40px":"50px"};

  & > :last-child {
    height: 30px;

    text-align: center;
    word-break: keep-all;
  }

  @media (min-width: ${theme.r.breakpoint.sm}) {
    width: ${props=>"sm"===props.$size?"40px":"md"===props.$size?"50px":"60px"};
  }
`,OptionLength=styled_components_browser_esm.zo.div`
  height: ${props=>.8*props.$amount+"%"};
  width: 40%;
  border-radius: 5px 5px 0 0;

  background-color: var(--primary-color);
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function OneLineGraph({voteResult,size}){const maxVoteAmount=Math.max(...Object.values(voteResult.age).map((voteResult=>voteResult.total)));return(0,jsx_runtime.jsxs)(GraphStyle.F,{$size:size,children:[(0,jsx_runtime.jsx)(GraphStyle.x,{$size:size}),type.e.map((option=>{const voteResultFilteredByAge=voteResult.age[option],amount=Math.floor(voteResultFilteredByAge.total/maxVoteAmount*100);return(0,jsx_runtime.jsxs)(OptionContainer,{$size:size,children:[(0,jsx_runtime.jsx)("span",{"aria-label":"투표한 인원",children:voteResultFilteredByAge.total}),(0,jsx_runtime.jsx)(OptionLength,{$amount:amount}),(0,jsx_runtime.jsx)("span",{"aria-label":"투표한 나이대",children:voteResultFilteredByAge.name})]},option)}))]})}OneLineGraph.displayName="OneLineGraph";try{OneLineGraph.displayName="OneLineGraph",OneLineGraph.__docgenInfo={description:"",displayName:"OneLineGraph",props:{voteResult:{defaultValue:null,description:"",name:"voteResult",required:!0,type:{name:"VoteResult"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/VoteStatistics/OneLineGraph/index.tsx#OneLineGraph"]={docgenInfo:OneLineGraph.__docgenInfo,name:"OneLineGraph",path:"src/components/VoteStatistics/OneLineGraph/index.tsx#OneLineGraph"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/VoteStatistics/TwoLineGraph/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TwoLineGraph});var GraphStyle=__webpack_require__("./src/components/VoteStatistics/GraphStyle.ts"),type=__webpack_require__("./src/components/VoteStatistics/type.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const OptionContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;

  width: ${props=>"sm"===props.$size?"30px":"md"===props.$size?"40px":"50px"};

  & > :last-child {
    height: 30px;

    text-align: center;
    word-break: keep-all;
  }

  @media (min-width: ${theme.r.breakpoint.sm}) {
    width: ${props=>"sm"===props.$size?"40px":"md"===props.$size?"50px":"60px"};
  }
`,DataWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;

  height: 90%;
  width: 50px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    width: 60px;
  }
`,OptionLengthWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;

  height: 100%;
  width: 20%;

  & > :first-child {
    position: relative;
    left: ${props=>"male"===props.$gender&&"3px"};
    right: ${props=>"female"===props.$gender&&"3px"};
  }
`,OptionLength=styled_components_browser_esm.zo.div`
  height: ${props=>`${props.$amount}% `};
  width: 100%;
  border-radius: 5px 5px 0 0;

  background-color: ${props=>"female"===props.$gender?"var(--graph-color-purple)":"var(--graph-color-green)"};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TwoLineGraph({voteResult,size}){const maxVoteAmount=Math.max(...Object.values(voteResult.age).map((voteResult=>Math.max(voteResult.female,voteResult.male))));return(0,jsx_runtime.jsxs)(GraphStyle.F,{$size:size,children:[(0,jsx_runtime.jsx)(GraphStyle.x,{$size:size}),type.e.map((option=>{const voteResultFilteredByAge=voteResult.age[option];return(0,jsx_runtime.jsxs)(OptionContainer,{$size:size,children:[(0,jsx_runtime.jsxs)(DataWrapper,{children:[(0,jsx_runtime.jsxs)(OptionLengthWrapper,{$gender:"female",children:[(0,jsx_runtime.jsx)("span",{"aria-label":"투표한 여자수",children:voteResultFilteredByAge.female}),(0,jsx_runtime.jsx)(OptionLength,{$amount:voteResultFilteredByAge.female/maxVoteAmount*100,$gender:"female"})]}),(0,jsx_runtime.jsxs)(OptionLengthWrapper,{$gender:"male",children:[(0,jsx_runtime.jsx)("span",{"aria-label":"투표한 남자수",children:voteResultFilteredByAge.male}),(0,jsx_runtime.jsx)(OptionLength,{$amount:voteResultFilteredByAge.male/maxVoteAmount*100,$gender:"male"})]})]}),(0,jsx_runtime.jsx)("span",{"aria-label":"투표한 나이대",children:voteResultFilteredByAge.name})]},option)}))]})}TwoLineGraph.displayName="TwoLineGraph";try{TwoLineGraph.displayName="TwoLineGraph",TwoLineGraph.__docgenInfo={description:"",displayName:"TwoLineGraph",props:{voteResult:{defaultValue:null,description:"",name:"voteResult",required:!0,type:{name:"VoteResult"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/VoteStatistics/TwoLineGraph/index.tsx#TwoLineGraph"]={docgenInfo:TwoLineGraph.__docgenInfo,name:"TwoLineGraph",path:"src/components/VoteStatistics/TwoLineGraph/index.tsx#TwoLineGraph"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/VoteStatistics/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>VoteStatistics});var react=__webpack_require__("./node_modules/react/index.js"),OneLineGraph=__webpack_require__("./src/components/VoteStatistics/OneLineGraph/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  font: var(--text-small);

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-caption);
  }
`,CategoryWrapper=styled_components_browser_esm.zo.fieldset`
  display: flex;
  gap: 10px;
`,RadioLabel=styled_components_browser_esm.zo.label`
  display: flex;
  gap: 5px;
`;var TwoLineGraph=__webpack_require__("./src/components/VoteStatistics/TwoLineGraph/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const radioMode={all:"전체보기",gender:"성별보기"};function VoteStatistics({voteResult,size}){const[currentRadioMode,setCurrentRadioMode]=(0,react.useState)("all"),radioModeKey=Object.keys(radioMode),changeMode=e=>{const targetCategory=e.target.value;setCurrentRadioMode(targetCategory)},random=Date.now();return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(CategoryWrapper,{children:radioModeKey.map((mode=>(0,jsx_runtime.jsxs)(RadioLabel,{children:[(0,jsx_runtime.jsx)("input",{type:"radio",name:`radio-category-${random}`,value:mode,defaultChecked:mode===currentRadioMode,onClick:changeMode}),radioMode[mode]]},mode)))}),"all"===currentRadioMode&&(0,jsx_runtime.jsx)(OneLineGraph.Z,{size,voteResult}),"gender"===currentRadioMode&&(0,jsx_runtime.jsx)(TwoLineGraph.Z,{size,voteResult})]})}VoteStatistics.displayName="VoteStatistics";try{VoteStatistics.displayName="VoteStatistics",VoteStatistics.__docgenInfo={description:"",displayName:"VoteStatistics",props:{voteResult:{defaultValue:null,description:"",name:"voteResult",required:!0,type:{name:"VoteResult"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/VoteStatistics/index.tsx#VoteStatistics"]={docgenInfo:VoteStatistics.__docgenInfo,name:"VoteStatistics",path:"src/components/VoteStatistics/index.tsx#VoteStatistics"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/VoteStatistics/type.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{e:()=>AGE_OPTION});const AGE_OPTION=["underTeenager","teenager","twenties","thirties","forties","fifties","aboveFifties"]},"./src/components/common/Dashboard/CategoryToggle/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CategoryToggle});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`},"./src/components/common/IconButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>IconButton});const back_namespaceObject=__webpack_require__.p+"static/media/back.0d0cf282.svg",category_namespaceObject=__webpack_require__.p+"static/media/category.5dbd06d6.svg",search_white_namespaceObject=__webpack_require__.p+"static/media/search_white.74caf850.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  background-color: rgba(0, 0, 0, 0);

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ICON_CATEGORY={category:{name:"카테고리",url:category_namespaceObject},back:{name:"뒤로가기",url:back_namespaceObject},search:{name:"검색",url:search_white_namespaceObject}};function IconButton({category,...rest}){const src=ICON_CATEGORY[category].url,ariaLabelText=ICON_CATEGORY[category].name;return(0,jsx_runtime.jsx)(Button,{"aria-label":ariaLabelText,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:`${ariaLabelText} 버튼`})})}IconButton.displayName="IconButton";try{IconButton.displayName="IconButton",IconButton.__docgenInfo={description:"",displayName:"IconButton",props:{category:{defaultValue:null,description:"",name:"category",required:!0,type:{name:"enum",value:[{value:'"search"'},{value:'"category"'},{value:'"back"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/IconButton/index.tsx#IconButton"]={docgenInfo:IconButton.__docgenInfo,name:"IconButton",path:"src/components/common/IconButton/index.tsx#IconButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Layout/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Layout});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),Dashboard=__webpack_require__("./src/components/common/Dashboard/index.tsx"),WideHeader=__webpack_require__("./src/components/common/WideHeader/index.tsx"),category=__webpack_require__("./src/mocks/mockData/category.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Layout({children,isSidebarVisible}){const navigate=(0,dist.s0)(),categoryList=category.A;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(WideHeaderWrapper,{children:(0,jsx_runtime.jsx)(WideHeader.Z,{handleLogoClick:()=>{navigate("/")}})}),(0,jsx_runtime.jsxs)(ContentContainer,{children:[isSidebarVisible&&(0,jsx_runtime.jsx)(DashboardWrapper,{children:(0,jsx_runtime.jsx)(Dashboard.Z,{userInfo:undefined,categoryList,selectedCategory:undefined,handleFavoriteClick:()=>{},handleLogoutClick:()=>{}})}),(0,jsx_runtime.jsx)(MainContainer,{$isSidebarVisible:isSidebarVisible,children:(0,jsx_runtime.jsx)(ChildrenWrapper,{$isSidebarVisible:isSidebarVisible,children})})]})]})}Layout.displayName="Layout";try{Layout.displayName="Layout",Layout.__docgenInfo={description:"",displayName:"Layout",props:{isSidebarVisible:{defaultValue:null,description:"",name:"isSidebarVisible",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Layout/index.tsx#Layout"]={docgenInfo:Layout.__docgenInfo,name:"Layout",path:"src/components/common/Layout/index.tsx#Layout"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/LoadingSpinner/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LoadingSpinner});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:"10px",md:"15px",lg:"30px"},Animation=styled_components_browser_esm.F4`
to {
  transform: translate(0, -15px);
}
`,Container=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > :nth-child(2) {
    animation-delay: 0.1s;
    margin: 0 ${props=>SIZE[props.$size]};
  }

  & > :nth-child(3) {
    animation-delay: 0.2s;
  }
`,Unit=styled_components_browser_esm.zo.div`
  width: ${props=>SIZE[props.$size]};
  height: ${props=>SIZE[props.$size]};
  border-radius: 50%;

  background-color: #747474;

  animation: ${Animation} 0.5s ease-in-out infinite alternate;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function LoadingSpinner({size}){return(0,jsx_runtime.jsxs)(Container,{$size:size,children:[(0,jsx_runtime.jsx)(Unit,{$size:size}),(0,jsx_runtime.jsx)(Unit,{$size:size}),(0,jsx_runtime.jsx)(Unit,{$size:size})]})}LoadingSpinner.displayName="LoadingSpinner";try{LoadingSpinner.displayName="LoadingSpinner",LoadingSpinner.__docgenInfo={description:"",displayName:"LoadingSpinner",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/LoadingSpinner/index.tsx#LoadingSpinner"]={docgenInfo:LoadingSpinner.__docgenInfo,name:"LoadingSpinner",path:"src/components/common/LoadingSpinner/index.tsx#LoadingSpinner"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/LogoButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LogoButton});const logo_namespaceObject=__webpack_require__.p+"static/media/logo.9ee58604.svg",projectName_namespaceObject=__webpack_require__.p+"static/media/projectName.7b011954.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const contentCategory={icon:{name:"로고 아이콘",url:logo_namespaceObject},text:{name:"votogether",url:projectName_namespaceObject},full:{name:"votogether",url:""}};function LogoButton({content,...rest}){const src=contentCategory[content].url,ariaLabelText=contentCategory[content].name;return"full"===content?(0,jsx_runtime.jsxs)(Button,{content,"aria-label":ariaLabelText,...rest,children:[(0,jsx_runtime.jsx)("img",{src:logo_namespaceObject,alt:"로고 아이콘"}),(0,jsx_runtime.jsx)("img",{src:projectName_namespaceObject,alt:"VoTogether"})]}):(0,jsx_runtime.jsx)(Button,{content,"aria-label":ariaLabelText,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:"로고 아이콘"})})}LogoButton.displayName="LogoButton";try{LogoButton.displayName="LogoButton",LogoButton.__docgenInfo={description:"",displayName:"LogoButton",props:{content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"enum",value:[{value:'"text"'},{value:'"icon"'},{value:'"full"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/LogoButton/index.tsx#LogoButton"]={docgenInfo:LogoButton.__docgenInfo,name:"LogoButton",path:"src/components/common/LogoButton/index.tsx#LogoButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/NarrowTemplateHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>NarrowTemplateHeader});const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function NarrowTemplateHeader({children}){return(0,jsx_runtime.jsx)(Container,{children})}NarrowTemplateHeader.displayName="NarrowTemplateHeader";try{NarrowTemplateHeader.displayName="NarrowTemplateHeader",NarrowTemplateHeader.__docgenInfo={description:"",displayName:"NarrowTemplateHeader",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"]={docgenInfo:NarrowTemplateHeader.__docgenInfo,name:"NarrowTemplateHeader",path:"src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SearchBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SearchBar});const search_black_namespaceObject=__webpack_require__.p+"static/media/search_black.af78e45d.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const formSize={sm:"170px",md:"250px",lg:"400px"},Form=styled_components_browser_esm.zo.form`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SearchBar({size,...rest}){return(0,jsx_runtime.jsxs)(Form,{size,...rest,children:[(0,jsx_runtime.jsx)(Input,{type:"text"}),(0,jsx_runtime.jsx)(Button,{type:"submit",children:(0,jsx_runtime.jsx)("img",{src:search_black_namespaceObject,alt:"검색버튼"})})]})}SearchBar.displayName="SearchBar";try{SearchBar.displayName="SearchBar",SearchBar.__docgenInfo={description:"",displayName:"SearchBar",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SearchBar/index.tsx#SearchBar"]={docgenInfo:SearchBar.__docgenInfo,name:"SearchBar",path:"src/components/common/SearchBar/index.tsx#SearchBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  display: block;

  width: 100%;
  height: 100%;
  border: 2px solid var(--primary-color);
  border-radius: 5px;

  background-color: ${props=>"blank"===props.theme?"rgba(0,0,0,0)":"var(--primary-color)"};
  color: ${props=>"blank"===props.theme?"var(--primary-color)":"var(--white)"};

  font: var(--text-body);

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/WideHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WideHeader});var LogoButton=__webpack_require__("./src/components/common/LogoButton/index.tsx"),SearchBar=__webpack_require__("./src/components/common/SearchBar/index.tsx");const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WideHeader({handleLogoClick}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(LogoButton.Z,{content:"full",onClick:handleLogoClick}),(0,jsx_runtime.jsx)(SearchBar.Z,{size:"sm"})]})}WideHeader.displayName="WideHeader";try{WideHeader.displayName="WideHeader",WideHeader.__docgenInfo={description:"",displayName:"WideHeader",props:{handleLogoClick:{defaultValue:null,description:"",name:"handleLogoClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/WideHeader/index.tsx#WideHeader"]={docgenInfo:WideHeader.__docgenInfo,name:"WideHeader",path:"src/components/common/WideHeader/index.tsx#WideHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ProgressBar});__webpack_require__("./node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  border-radius: 4px;

  height: 8px;

  background-color: rgba(0, 0, 0, 0.15);
`,Bar=styled_components_browser_esm.zo.div`
  border-radius: 4px;

  width: ${({progress})=>`${progress}%`};
  height: 8px;

  background-color: ${({$isSelected})=>$isSelected?"var(--primary-color)":"#9F9F9F"};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ProgressBar({percent,isSelected}){return(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsx)(Bar,{progress:percent,$isSelected:isSelected})})}ProgressBar.displayName="ProgressBar";try{ProgressBar.displayName="ProgressBar",ProgressBar.__docgenInfo={description:"",displayName:"ProgressBar",props:{percent:{defaultValue:null,description:"",name:"percent",required:!0,type:{name:"number"}},isSelected:{defaultValue:null,description:"",name:"isSelected",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx#ProgressBar"]={docgenInfo:ProgressBar.__docgenInfo,name:"ProgressBar",path:"src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx#ProgressBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WrittenVoteOption});__webpack_require__("./node_modules/react/index.js");var ProgressBar=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.li`
  display: flex;
  flex-direction: column;

  border: ${({$isSelected})=>$isSelected?"2px solid var(--primary-color)":"1px solid rgba(0, 0, 0, 0.1)"};
  border-radius: 4px;
  padding: 10px 15px;

  color: #5b5b5b;

  cursor: pointer;

  @media (min-width: ${theme.r.breakpoint.md}) {
    padding: 15px 25px;
  }
`,Image=styled_components_browser_esm.zo.img`
  border-radius: 4px;
  margin-bottom: 10px;

  width: 100%;

  aspect-ratio: 1/1;
  object-fit: cover;

  @media (min-width: ${theme.r.breakpoint.md}) {
    margin-bottom: 20px;
  }
`,PreviewContent=styled_components_browser_esm.zo.p`
  display: -webkit-box;

  font: var(--text-caption);
  font-weight: 500;
  text-overflow: ellipsis;
  word-break: break-word;

  overflow: hidden;

  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;

  @media (min-width: ${theme.r.breakpoint.md}) {
    font: var(--text-body);
  }
`,DetailContent=styled_components_browser_esm.zo.p`
  font: var(--text-caption);
  font-weight: 500;

  @media (min-width: ${theme.r.breakpoint.md}) {
    font: var(--text-body);
  }
`,ProgressContainer=styled_components_browser_esm.zo.div`
  margin-top: 12px;

  @media (min-width: ${theme.r.breakpoint.md}) {
    margin-top: 18px;
  }
`,TextContainer=styled_components_browser_esm.zo.div`
  margin-top: 8px;

  text-align: end;
  font-weight: 500;

  @media (min-width: ${theme.r.breakpoint.md}) {
    margin-top: 12px;

    font: var(--text-body);
  }
`,PeopleText=styled_components_browser_esm.zo.span`
  font: var(--text-caption);

  @media (min-width: ${theme.r.breakpoint.md}) {
    font: var(--text-body);
  }
`,PercentText=styled_components_browser_esm.zo.span`
  margin-left: 4px;

  font: var(--text-small);

  opacity: 0.7;

  @media (min-width: ${theme.r.breakpoint.md}) {
    font: var(--text-caption);
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOption({handleVoteClick,text,isVoted,peopleCount,percent,isSelected,isPreview,imageUrl}){return(0,jsx_runtime.jsxs)(Container,{$isSelected:isSelected,onClick:handleVoteClick,children:[!isPreview&&imageUrl&&(0,jsx_runtime.jsx)(Image,{src:imageUrl,alt:text}),isPreview?(0,jsx_runtime.jsx)(PreviewContent,{children:text}):(0,jsx_runtime.jsx)(DetailContent,{children:text}),isVoted&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(ProgressContainer,{children:(0,jsx_runtime.jsx)(ProgressBar.Z,{percent,isSelected})}),(0,jsx_runtime.jsxs)(TextContainer,{children:[(0,jsx_runtime.jsxs)(PeopleText,{children:[peopleCount,"명"]}),(0,jsx_runtime.jsxs)(PercentText,{children:["(",percent.toFixed(1),"%)"]})]})]})]})}WrittenVoteOption.displayName="WrittenVoteOption";try{WrittenVoteOption.displayName="WrittenVoteOption",WrittenVoteOption.__docgenInfo={description:"",displayName:"WrittenVoteOption",props:{handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"() => void"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},isVoted:{defaultValue:null,description:"",name:"isVoted",required:!0,type:{name:"boolean"}},peopleCount:{defaultValue:null,description:"",name:"peopleCount",required:!0,type:{name:"number"}},percent:{defaultValue:null,description:"",name:"percent",required:!0,type:{name:"number"}},isSelected:{defaultValue:null,description:"",name:"isSelected",required:!0,type:{name:"boolean"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},imageUrl:{defaultValue:null,description:"",name:"imageUrl",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"]={docgenInfo:WrittenVoteOption.__docgenInfo,name:"WrittenVoteOption",path:"src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/path.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>BASE_PATH,m:()=>PATH});const BASE_PATH={HOME:"/",LANDING:"/landing",LOGIN:"/login",POST:"/posts",USER:"/users",ADMIN:"/admin",SEARCH:"/search"},PATH={...BASE_PATH,POST_WRITE:`${BASE_PATH.POST}/write`,POST_VOTE_RESULT:`${BASE_PATH.POST}/result`,POST_CATEGORY:`${BASE_PATH.POST}/category`,USER_POST:`${BASE_PATH.USER}/posts`,USER_VOTE:`${BASE_PATH.USER}/votes`,USER_INFO:`${BASE_PATH.USER}/myPage`}},"./src/hooks/useFetch.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>useFetch});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useFetch=fetchFn=>{const[data,setData]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[errorMessage,setErrorMessage]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[isLoading,setIsLoading]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0),refetch=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setIsLoading(!0),setData(null),setErrorMessage(null),fetchFn().then((res=>{setData(res)})).catch((error=>{setErrorMessage(error.message)})).finally((()=>{setIsLoading(!1)}))}),[fetchFn]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{refetch()}),[]),{data,errorMessage,isLoading,refetch}}},"./src/mocks/mockData/category.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>MOCK_FAVORITE_CATEGORIES});const MOCK_FAVORITE_CATEGORIES=[{id:12312,name:"음식",isFavorite:!1},{id:12,name:"연애",isFavorite:!0},{id:13,name:"패션",isFavorite:!0},{id:14,name:"금융",isFavorite:!1}]},"./src/pages/VoteStatistics/OptionStatistics/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>OptionStatistics});var react=__webpack_require__("./node_modules/react/index.js"),useFetch=__webpack_require__("./src/hooks/useFetch.ts"),api_voteResult=__webpack_require__("./src/api/voteResult.ts"),LoadingSpinner=__webpack_require__("./src/components/common/LoadingSpinner/index.tsx"),WrittenVoteOption=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx"),VoteStatistics=__webpack_require__("./src/components/VoteStatistics/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;

  width: 95%;
  border-radius: 10px;

  background-color: #f6f6f6;

  font: var(--text-title);
`,StatisticsContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    padding: 30px;
  }
`,LoadingWrapper=styled_components_browser_esm.zo.div`
  display: flex;

  height: 100px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function OptionStatistics({postId,voteOption,isSelectedOption,size}){const[isStatisticsOpen,setIsStatisticsOpen]=(0,react.useState)(!1),{data:voteResult,errorMessage,isLoading}=(0,useFetch.i)((()=>(0,api_voteResult.L)({postId,optionId:voteOption.id})));return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(WrittenVoteOption.Z,{...voteOption,isPreview:!1,isVoted:!0,isSelected:isSelectedOption,handleVoteClick:()=>{setIsStatisticsOpen(!isStatisticsOpen)}},voteOption.id),(0,jsx_runtime.jsxs)(StatisticsContainer,{children:[isStatisticsOpen&&voteResult&&(0,jsx_runtime.jsx)(VoteStatistics.Z,{voteResult,size}),isStatisticsOpen&&isLoading&&(0,jsx_runtime.jsx)(LoadingWrapper,{children:(0,jsx_runtime.jsx)(LoadingSpinner.Z,{size:"sm"})}),isStatisticsOpen&&errorMessage]})]})}OptionStatistics.displayName="OptionStatistics";try{OptionStatistics.displayName="OptionStatistics",OptionStatistics.__docgenInfo={description:"",displayName:"OptionStatistics",props:{postId:{defaultValue:null,description:"",name:"postId",required:!0,type:{name:"number"}},isSelectedOption:{defaultValue:null,description:"",name:"isSelectedOption",required:!0,type:{name:"boolean"}},voteOption:{defaultValue:null,description:"",name:"voteOption",required:!0,type:{name:"WrittenVoteOptionType"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/VoteStatistics/OptionStatistics/index.tsx#OptionStatistics"]={docgenInfo:OptionStatistics.__docgenInfo,name:"OptionStatistics",path:"src/pages/VoteStatistics/OptionStatistics/index.tsx#OptionStatistics"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});const theme={breakpoint:{sm:"576px",md:"960px",lg:"1440px"},zIndex:{header:100,modal:200}}},"./src/utils/fetch.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$V:()=>multiPutFetch,Wq:()=>deleteFetch,XH:()=>patchFetch,ZL:()=>postFetch,hO:()=>multiPostFetch,wY:()=>getFetch});const headers={"Content-Type":"application/json;charset=utf-8",Authorization:"Bearer "},multiHeaders={"Content-Type":"multipart/form-data",Authorization:"Bearer "},getFetch=async url=>{const response=await fetch(url,{method:"GET",headers}),data=await response.json();if(!response.ok)throw new Error(data.message);return data},postFetch=async(url,body)=>{const response=await fetch(url,{method:"POST",body:JSON.stringify(body),headers}),data=await response.json();if(!response.ok)throw new Error(data.message);return data},patchFetch=async url=>{const response=await fetch(url,{method:"PATCH",headers}),data=await response.json();if(!response.ok)throw new Error(data.message)},deleteFetch=async url=>{const response=await fetch(url,{method:"DELETE",headers}),data=await response.json();if(!response.ok)throw new Error(data.message)},multiPostFetch=async(url,body)=>{const response=await fetch(url,{method:"POST",body,headers:multiHeaders}),data=await response.json();if(!response.ok)throw new Error(data.message);return data},multiPutFetch=async(url,body)=>{const response=await fetch(url,{method:"PUT",body,headers:multiHeaders}),data=await response.json();if(!response.ok)throw new Error(data.message);return data}},"./src/assets/chevron-down.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-down.f97a5bb1.svg"},"./src/assets/chevron-up.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-up.a1eb858b.svg"}}]);
//# sourceMappingURL=pages-VoteStatistics-VoteStatistics-stories.041c809d.iframe.bundle.js.map