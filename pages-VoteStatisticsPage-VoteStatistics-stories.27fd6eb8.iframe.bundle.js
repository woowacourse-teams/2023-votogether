"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[5699],{"./src/pages/VoteStatisticsPage/VoteStatistics.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultPage:()=>DefaultPage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>VoteStatistics_stories});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),useFetch=__webpack_require__("./src/hooks/useFetch.ts"),post=__webpack_require__("./src/api/post.ts"),voteResult=__webpack_require__("./src/api/voteResult.ts"),ErrorMessage=__webpack_require__("./src/components/common/ErrorMessage/index.tsx"),IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),Layout=__webpack_require__("./src/components/common/Layout/index.tsx"),NarrowTemplateHeader=__webpack_require__("./src/components/common/NarrowTemplateHeader/index.tsx"),Skeleton=__webpack_require__("./src/components/common/Skeleton/index.tsx"),VoteStatistics=__webpack_require__("./src/components/VoteStatistics/index.tsx"),path=__webpack_require__("./src/constants/path.ts"),checkWriter=__webpack_require__("./src/utils/post/checkWriter.ts"),OptionStatistics=__webpack_require__("./src/pages/VoteStatisticsPage/OptionStatistics/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 50px;
  margin-bottom: 20px;

  & > * {
    width: 100%;
  }

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

  text-align: center;
  font: var(--text-title);
`,OptionContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`,LoadingWrapper=styled_components_browser_esm.zo.div`
  display: flex;

  height: 100px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function VoteStatisticsPage(){const params=(0,dist.UO)(),postId=Number(params.postId),navigate=(0,dist.s0)(),{data:postDetail,errorMessage:postError,isLoading:isPostLoading}=(0,useFetch.i)((()=>(0,post.xl)(postId))),{data:voteResultResponse,errorMessage:voteResultError,isLoading:isVoteResultLoading}=(0,useFetch.i)((()=>(0,voteResult.a)(postId)));return postDetail&&!(0,checkWriter.C)(postDetail.writer.id)?(0,jsx_runtime.jsx)(dist.Fg,{to:path.m.HOME}):(0,jsx_runtime.jsxs)(Layout.Z,{isSidebarVisible:!0,children:[(0,jsx_runtime.jsx)(HeaderWrapper,{children:(0,jsx_runtime.jsx)(NarrowTemplateHeader.Z,{children:(0,jsx_runtime.jsx)(IconButton.Z,{category:"back",onClick:()=>navigate(-1)})})}),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(PageHeader,{children:"투표 통계"}),postError&&(0,jsx_runtime.jsx)(ErrorMessage.Z,{}),isPostLoading&&(0,jsx_runtime.jsx)(LoadingWrapper,{children:(0,jsx_runtime.jsx)(Skeleton.Z,{isLarge:!0})}),postDetail&&(0,jsx_runtime.jsxs)(OptionContainer,{children:[voteResultError&&(0,jsx_runtime.jsx)(ErrorMessage.Z,{}),isVoteResultLoading&&(0,jsx_runtime.jsx)(LoadingWrapper,{children:(0,jsx_runtime.jsx)(Skeleton.Z,{isLarge:!0})}),voteResultResponse&&(0,jsx_runtime.jsx)(VoteStatistics.Z,{voteResultResponse,size:"md"}),postDetail.voteInfo.options.map((option=>{const{postId,voteInfo}=postDetail;return(0,jsx_runtime.jsx)(OptionStatistics.Z,{postId,isSelectedOption:voteInfo.selectedOptionId===option.id,voteOption:option,size:"sm"},option.id)}))]})]})]})}VoteStatisticsPage.displayName="VoteStatisticsPage";const VoteStatistics_stories={component:VoteStatisticsPage},DefaultPage={render:()=>(0,jsx_runtime.jsx)(VoteStatisticsPage,{})};DefaultPage.parameters={...DefaultPage.parameters,docs:{...DefaultPage.parameters?.docs,source:{originalSource:"{\n  render: () => <VoteStatisticsPage />\n}",...DefaultPage.parameters?.docs?.source}}};const __namedExportsOrder=["DefaultPage"]},"./src/api/voteResult.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>getOptionStatistics,a:()=>getPostStatistics});var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/fetch.ts");const getPostStatistics=async postId=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)(`/posts/${postId}/options`),getOptionStatistics=async({postId,optionId})=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)(`/posts/${postId}/options/${optionId}`)},"./src/components/VoteStatistics/GraphStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{FV:()=>GraphContainer,lj:()=>GENDER_COLOR,x1:()=>Line});var styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_styles_theme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styles/theme.ts");const GENDER_COLOR={FEMALE:"var(--graph-color-purple)",MALE:"var(--graph-color-green)"},SIZE={sm:{height:"200px",linePositionTop:"165px"},md:{height:"230px",linePositionTop:"194px"},lg:{height:"260px",linePositionTop:"224px"}},GraphContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  display: flex;

  height: ${props=>`${SIZE[props.$size].height}`};

  position: relative;

  font: var(--text-small);

  @media (min-width: ${_styles_theme__WEBPACK_IMPORTED_MODULE_0__.r.breakpoint.sm}) {
    font: var(--text-caption);
  }
`,Line=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  width: 100%;
  border-bottom: 2px solid black;

  position: absolute;
  top: ${props=>`${SIZE[props.$size].linePositionTop}`};
`},"./src/components/VoteStatistics/OneLineGraph/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>OneLineGraph});var GraphStyle=__webpack_require__("./src/components/VoteStatistics/GraphStyle.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const OptionContainer=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function OneLineGraph({ageGroup,size}){const maxVoteAmount=Math.max(...ageGroup.map((age=>age.total)));return(0,jsx_runtime.jsxs)(GraphStyle.FV,{$size:size,children:[(0,jsx_runtime.jsx)(GraphStyle.x1,{$size:size}),ageGroup.map((ageResult=>{const amount=Math.floor(ageResult.total/maxVoteAmount*100);return(0,jsx_runtime.jsxs)(OptionContainer,{$size:size,children:[(0,jsx_runtime.jsx)("span",{"aria-label":`${ageResult.name}에서 ${ageResult.total}명이 투표`,children:ageResult.total}),(0,jsx_runtime.jsx)(OptionLength,{$amount:amount}),(0,jsx_runtime.jsx)("span",{"aria-hidden":"true",children:ageResult.name})]},ageResult.name)}))]})}OneLineGraph.displayName="OneLineGraph";try{OneLineGraph.displayName="OneLineGraph",OneLineGraph.__docgenInfo={description:"",displayName:"OneLineGraph",props:{ageGroup:{defaultValue:null,description:"",name:"ageGroup",required:!0,type:{name:"VoteDetailResult[]"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/VoteStatistics/OneLineGraph/index.tsx#OneLineGraph"]={docgenInfo:OneLineGraph.__docgenInfo,name:"OneLineGraph",path:"src/components/VoteStatistics/OneLineGraph/index.tsx#OneLineGraph"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/VoteStatistics/TwoLineGraph/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TwoLineGraph});var GraphStyle=__webpack_require__("./src/components/VoteStatistics/GraphStyle.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const OptionContainer=styled_components_browser_esm.zo.div`
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
    left: ${props=>"MALE"===props.$gender&&"3px"};
    right: ${props=>"FEMALE"===props.$gender&&"3px"};
  }
`,OptionLength=styled_components_browser_esm.zo.div`
  height: ${props=>`${props.$amount}% `};
  width: 100%;
  border-radius: 5px 5px 0 0;

  background-color: ${props=>GraphStyle.lj[props.$gender]};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TwoLineGraph({ageGroup,size}){const maxVoteAmount=Math.max(...ageGroup.map((voteResult=>Math.max(voteResult.female,voteResult.male))));return(0,jsx_runtime.jsxs)(GraphStyle.FV,{$size:size,children:[(0,jsx_runtime.jsx)(GraphStyle.x1,{$size:size}),ageGroup.map((ageResult=>(0,jsx_runtime.jsxs)(OptionContainer,{$size:size,children:[(0,jsx_runtime.jsxs)(DataWrapper,{children:[(0,jsx_runtime.jsxs)(OptionLengthWrapper,{$gender:"FEMALE",children:[(0,jsx_runtime.jsx)("span",{"aria-label":`${ageResult.name}에서 ${ageResult.female}명의 여성이 투표`,children:ageResult.female}),(0,jsx_runtime.jsx)(OptionLength,{$amount:ageResult.female/maxVoteAmount*100,$gender:"FEMALE"})]}),(0,jsx_runtime.jsxs)(OptionLengthWrapper,{$gender:"MALE",children:[(0,jsx_runtime.jsx)("span",{"aria-label":`${ageResult.name}에서 ${ageResult.male}명의 남성이 투표`,children:ageResult.male}),(0,jsx_runtime.jsx)(OptionLength,{$amount:ageResult.male/maxVoteAmount*100,$gender:"MALE"})]})]}),(0,jsx_runtime.jsx)("span",{"aria-hidden":"true",children:ageResult.name})]},ageResult.name)))]})}TwoLineGraph.displayName="TwoLineGraph";try{TwoLineGraph.displayName="TwoLineGraph",TwoLineGraph.__docgenInfo={description:"",displayName:"TwoLineGraph",props:{ageGroup:{defaultValue:null,description:"",name:"ageGroup",required:!0,type:{name:"VoteDetailResult[]"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/VoteStatistics/TwoLineGraph/index.tsx#TwoLineGraph"]={docgenInfo:TwoLineGraph.__docgenInfo,name:"TwoLineGraph",path:"src/components/VoteStatistics/TwoLineGraph/index.tsx#TwoLineGraph"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/VoteStatistics/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>VoteStatistics});var react=__webpack_require__("./node_modules/react/index.js"),OneLineGraph=__webpack_require__("./src/components/VoteStatistics/OneLineGraph/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts"),GraphStyle=__webpack_require__("./src/components/VoteStatistics/GraphStyle.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

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
`,GenderExplain=styled_components_browser_esm.zo.span`
  display: flex;
  gap: 10px;

  height: 20px;

  & > * {
    display: flex;
    align-items: center;
    gap: 3px;

    line-height: initial;
  }
`,ColorIcon=styled_components_browser_esm.zo.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;

  background-color: ${props=>GraphStyle.lj[props.$gender]};
`;var TwoLineGraph=__webpack_require__("./src/components/VoteStatistics/TwoLineGraph/index.tsx");const transVoteStatisticsFormat=voteResult=>{const{ageGroup,totalFemaleCount,totalMaleCount,totalVoteCount}=voteResult,newAgeGroup=ageGroup.map((ageResult=>(voteResult=>{const{ageGroup,femaleCount,maleCount,voteCount}=voteResult;return{name:ageGroup,female:femaleCount,male:maleCount,total:voteCount}})(ageResult)));return{ageGroup:newAgeGroup,female:totalFemaleCount,male:totalMaleCount,total:totalVoteCount}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const radioMode={all:"전체보기",gender:"성별보기"};function VoteStatistics({voteResultResponse,size}){const[currentRadioMode,setCurrentRadioMode]=(0,react.useState)("all"),radioModeKey=Object.keys(radioMode),voteResult=transVoteStatisticsFormat(voteResultResponse),changeMode=e=>{const targetCategory=e.target.value;setCurrentRadioMode(targetCategory)},random=Date.now();return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(CategoryWrapper,{children:radioModeKey.map((mode=>(0,jsx_runtime.jsxs)(RadioLabel,{children:[(0,jsx_runtime.jsx)("input",{type:"radio",name:`radio-category-${random}`,value:mode,defaultChecked:mode===currentRadioMode,onClick:changeMode}),radioMode[mode]]},mode)))}),(0,jsx_runtime.jsx)(GenderExplain,{"aria-label":"성별 조건",children:"gender"===currentRadioMode&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsx)(ColorIcon,{"aria-label":"성별 조건",$gender:"FEMALE"})," 여자"]}),(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsx)(ColorIcon,{"aria-label":"성별 조건",$gender:"MALE"})," 남자"]})]})}),"all"===currentRadioMode&&(0,jsx_runtime.jsx)(OneLineGraph.Z,{size,ageGroup:voteResult.ageGroup}),"gender"===currentRadioMode&&(0,jsx_runtime.jsx)(TwoLineGraph.Z,{size,ageGroup:voteResult.ageGroup})]})}VoteStatistics.displayName="VoteStatistics";try{VoteStatistics.displayName="VoteStatistics",VoteStatistics.__docgenInfo={description:"",displayName:"VoteStatistics",props:{voteResultResponse:{defaultValue:null,description:"",name:"voteResultResponse",required:!0,type:{name:"VoteResultResponse"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/VoteStatistics/index.tsx#VoteStatistics"]={docgenInfo:VoteStatistics.__docgenInfo,name:"VoteStatistics",path:"src/components/VoteStatistics/index.tsx#VoteStatistics"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/IconButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>IconButton});const back_namespaceObject=__webpack_require__.p+"static/media/back.0d0cf282.svg",category_namespaceObject=__webpack_require__.p+"static/media/category.5dbd06d6.svg",ranking_namespaceObject=__webpack_require__.p+"static/media/ranking.bc2e65d6.svg",retry_namespaceObject=__webpack_require__.p+"static/media/retry.d97418a2.svg",search_white_namespaceObject=__webpack_require__.p+"static/media/search_white.74caf850.svg",user_namespaceObject=__webpack_require__.p+"static/media/user.87af8a44.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Layout({children,isSidebarVisible}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(WideHeaderWrapper,{children:(0,jsx_runtime.jsx)(WideHeader.Z,{})}),(0,jsx_runtime.jsxs)(ContentContainer,{children:[isSidebarVisible&&(0,jsx_runtime.jsx)(DashboardWrapper,{children:(0,jsx_runtime.jsx)(Dashboard.Z,{})}),(0,jsx_runtime.jsx)(MainContainer,{$isSidebarVisible:isSidebarVisible,children:(0,jsx_runtime.jsx)(ChildrenWrapper,{$isSidebarVisible:isSidebarVisible,children})})]})]})}Layout.displayName="Layout";try{Layout.displayName="Layout",Layout.__docgenInfo={description:"",displayName:"Layout",props:{isSidebarVisible:{defaultValue:null,description:"",name:"isSidebarVisible",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Layout/index.tsx#Layout"]={docgenInfo:Layout.__docgenInfo,name:"Layout",path:"src/components/common/Layout/index.tsx#Layout"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/LoadingSpinner/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LoadingSpinner});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:"10px",md:"15px",lg:"30px"},Animation=styled_components_browser_esm.F4`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function LoadingSpinner({size}){return(0,jsx_runtime.jsxs)(Container,{$size:size,"aria-label":"로딩 중입니다.",children:[(0,jsx_runtime.jsx)(Unit,{$size:size}),(0,jsx_runtime.jsx)(Unit,{$size:size}),(0,jsx_runtime.jsx)(Unit,{$size:size})]})}LoadingSpinner.displayName="LoadingSpinner";try{LoadingSpinner.displayName="LoadingSpinner",LoadingSpinner.__docgenInfo={description:"",displayName:"LoadingSpinner",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/LoadingSpinner/index.tsx#LoadingSpinner"]={docgenInfo:LoadingSpinner.__docgenInfo,name:"LoadingSpinner",path:"src/components/common/LoadingSpinner/index.tsx#LoadingSpinner"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/LogoButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LogoButton});var logo=__webpack_require__("./src/assets/logo.svg");const projectName_namespaceObject=__webpack_require__.p+"static/media/projectName.7b011954.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const contentCategory={icon:{name:"보투게더 로고 아이콘",url:logo},text:{name:"보투게더 아이콘",url:projectName_namespaceObject},full:{name:"보투게더 아이콘",url:""}};function LogoButton({content,...rest}){const src=contentCategory[content].url,ariaLabelText=contentCategory[content].name;return"full"===content?(0,jsx_runtime.jsxs)(Button,{content,"aria-label":ariaLabelText,...rest,children:[(0,jsx_runtime.jsx)("img",{src:logo,alt:"로고 아이콘"}),(0,jsx_runtime.jsx)("img",{src:projectName_namespaceObject,alt:"보투게더 아이콘"})]}):(0,jsx_runtime.jsx)(Button,{content,"aria-label":ariaLabelText,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:"보투게더 아이콘"})})}LogoButton.displayName="LogoButton";try{LogoButton.displayName="LogoButton",LogoButton.__docgenInfo={description:"",displayName:"LogoButton",props:{content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"enum",value:[{value:'"text"'},{value:'"icon"'},{value:'"full"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/LogoButton/index.tsx#LogoButton"]={docgenInfo:LogoButton.__docgenInfo,name:"LogoButton",path:"src/components/common/LogoButton/index.tsx#LogoButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/NarrowTemplateHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>NarrowTemplateHeader});const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WideHeader(){const navigate=(0,dist.s0)();return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(LogoWrapper,{children:(0,jsx_runtime.jsx)(LogoButton.Z,{content:"full",onClick:()=>{navigate("/")}})}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(SearchBar.Z,{size:"sm"}),(0,jsx_runtime.jsx)(IconButton.Z,{category:"userInfo",onClick:()=>{navigate(path.m.USER_INFO)}}),(0,jsx_runtime.jsx)(IconButton.Z,{category:"ranking",onClick:()=>{navigate(path.m.RANKING)}})]})]})}WideHeader.displayName="WideHeader"},"./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ProgressBar});__webpack_require__("./node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  border-radius: 4px;

  height: 8px;

  background-color: rgba(0, 0, 0, 0.15);
`,Bar=styled_components_browser_esm.zo.div`
  border-radius: 4px;

  width: ${({progress})=>`${progress}%`};
  height: 8px;

  background-color: ${({$isSelected})=>$isSelected?"var(--primary-color)":"#9F9F9F"};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ProgressBar({percent,isSelected}){return(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsx)(Bar,{progress:percent,$isSelected:isSelected})})}ProgressBar.displayName="ProgressBar";try{ProgressBar.displayName="ProgressBar",ProgressBar.__docgenInfo={description:"",displayName:"ProgressBar",props:{percent:{defaultValue:null,description:"",name:"percent",required:!0,type:{name:"number"}},isSelected:{defaultValue:null,description:"",name:"isSelected",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx#ProgressBar"]={docgenInfo:ProgressBar.__docgenInfo,name:"ProgressBar",path:"src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx#ProgressBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WrittenVoteOption});var convertImageUrlToServerUrl=__webpack_require__("./src/utils/post/convertImageUrlToServerUrl.ts"),ProgressBar=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.button`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  border: ${({$isSelected})=>$isSelected?"2px solid var(--primary-color)":"1px solid rgba(0, 0, 0, 0.1)"};
  border-radius: 4px;
  padding: 10px 15px;

  color: #5b5b5b;

  text-align: left;

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

  color: var(--text-dark-gray);

  font: var(--text-small);

  @media (min-width: ${theme.r.breakpoint.md}) {
    font: var(--text-caption);
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOption({handleVoteClick,text,isStatisticsVisible,peopleCount,percent,isSelected,isPreview,imageUrl,ariaLabel}){return(0,jsx_runtime.jsxs)(Container,{"aria-live":isSelected?"polite":"off","aria-label":ariaLabel,$isSelected:isSelected,onClick:handleVoteClick,children:[!isPreview&&imageUrl&&(0,jsx_runtime.jsx)(Image,{src:(0,convertImageUrlToServerUrl.B)(imageUrl),alt:"선택지에 포함된 이미지"}),isPreview?(0,jsx_runtime.jsx)(PreviewContent,{children:text}):(0,jsx_runtime.jsx)(DetailContent,{children:text}),isStatisticsVisible&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(ProgressContainer,{children:(0,jsx_runtime.jsx)(ProgressBar.Z,{percent,isSelected})}),(0,jsx_runtime.jsxs)(TextContainer,{children:[(0,jsx_runtime.jsxs)(PeopleText,{"aria-hidden":"true",children:[peopleCount,"명"]}),(0,jsx_runtime.jsxs)(PercentText,{"aria-hidden":"true",children:["(",percent.toFixed(1),"%)"]})]})]})]})}WrittenVoteOption.displayName="WrittenVoteOption";try{WrittenVoteOption.displayName="WrittenVoteOption",WrittenVoteOption.__docgenInfo={description:"",displayName:"WrittenVoteOption",props:{handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"() => void"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},isStatisticsVisible:{defaultValue:null,description:"",name:"isStatisticsVisible",required:!0,type:{name:"boolean"}},peopleCount:{defaultValue:null,description:"",name:"peopleCount",required:!0,type:{name:"number"}},percent:{defaultValue:null,description:"",name:"percent",required:!0,type:{name:"number"}},isSelected:{defaultValue:null,description:"",name:"isSelected",required:!0,type:{name:"boolean"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},imageUrl:{defaultValue:null,description:"",name:"imageUrl",required:!0,type:{name:"string"}},ariaLabel:{defaultValue:null,description:"",name:"ariaLabel",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"]={docgenInfo:WrittenVoteOption.__docgenInfo,name:"WrittenVoteOption",path:"src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useFetch.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>useFetch});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useFetch=fetchFn=>{const[data,setData]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[errorMessage,setErrorMessage]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[isLoading,setIsLoading]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0),refetch=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setIsLoading(!0),setData(null),setErrorMessage(null),fetchFn().then((res=>{setData(res)})).catch((error=>{setErrorMessage(error.message)})).finally((()=>{setIsLoading(!1)}))}),[fetchFn]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{refetch()}),[]),{data,errorMessage,isLoading,refetch}}},"./src/hooks/useText.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>useText});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useText=originalText=>{const[text,setText]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(originalText);return{text,setText,handleTextChange:(event,limit)=>{const{value}=event.target;if(value.length>limit.MAX_LENGTH)return event.target.setCustomValidity(`해당 입력값은 ${limit.MAX_LENGTH}자까지 입력 가능합니다.`),void event.target.reportValidity();setText(value),event.target.setCustomValidity("")},resetText:()=>{setText("")},addText:newTextToAdd=>{setText(text+newTextToAdd)}}}},"./src/pages/VoteStatisticsPage/OptionStatistics/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>OptionStatistics});var react=__webpack_require__("./node_modules/react/index.js"),useFetch=__webpack_require__("./src/hooks/useFetch.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),api_voteResult=__webpack_require__("./src/api/voteResult.ts"),LoadingSpinner=__webpack_require__("./src/components/common/LoadingSpinner/index.tsx"),Toast=__webpack_require__("./src/components/common/Toast/index.tsx"),WrittenVoteOption=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx"),VoteStatistics=__webpack_require__("./src/components/VoteStatistics/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`,ScreenReaderDirection=styled_components_browser_esm.zo.p`
  position: absolute;
  left: -9999px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function OptionStatistics({postId,voteOption,isSelectedOption,size}){const[isStatisticsOpen,setIsStatisticsOpen]=(0,react.useState)(!1),{isToastOpen,openToast,toastMessage}=(0,useToast.p)(),{data:voteResult,errorMessage,isLoading}=(0,useFetch.i)((()=>(0,api_voteResult.L)({postId,optionId:voteOption.id})));return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(WrittenVoteOption.Z,{ariaLabel:"투표 통계",...voteOption,isPreview:!1,isStatisticsVisible:!0,isSelected:isSelectedOption,handleVoteClick:()=>{if(!voteResult)return openToast("투표 통계 불러오기를 실패했습니다.");setIsStatisticsOpen(!isStatisticsOpen)}},voteOption.id),(0,jsx_runtime.jsxs)(StatisticsContainer,{children:[!isStatisticsOpen&&(0,jsx_runtime.jsx)(ScreenReaderDirection,{children:"투표 선택지를 클릭하여 투표 통계를 열어 확인할 수 있습니다."}),isStatisticsOpen&&voteResult&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(ScreenReaderDirection,{children:"투표 선택지를 클릭하여 투표 통계를 닫을 수 있습니다."}),(0,jsx_runtime.jsx)(VoteStatistics.Z,{voteResultResponse:voteResult,size})]}),isStatisticsOpen&&isLoading&&(0,jsx_runtime.jsx)(LoadingWrapper,{children:(0,jsx_runtime.jsx)(LoadingSpinner.Z,{size:"sm"})}),isStatisticsOpen&&errorMessage]}),isToastOpen&&(0,jsx_runtime.jsx)(Toast.Z,{size:"md",position:"bottom",children:toastMessage})]})}OptionStatistics.displayName="OptionStatistics";try{OptionStatistics.displayName="OptionStatistics",OptionStatistics.__docgenInfo={description:"",displayName:"OptionStatistics",props:{postId:{defaultValue:null,description:"",name:"postId",required:!0,type:{name:"number"}},isSelectedOption:{defaultValue:null,description:"",name:"isSelectedOption",required:!0,type:{name:"boolean"}},voteOption:{defaultValue:null,description:"",name:"voteOption",required:!0,type:{name:"WrittenVoteOptionType"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/VoteStatisticsPage/OptionStatistics/index.tsx#OptionStatistics"]={docgenInfo:OptionStatistics.__docgenInfo,name:"OptionStatistics",path:"src/pages/VoteStatisticsPage/OptionStatistics/index.tsx#OptionStatistics"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/post/checkWriter.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>checkWriter});var _constants_localStorage__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/localStorage.ts"),_utils_localStorage__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/localStorage.ts"),_utils_token_decodeToken__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/utils/token/decodeToken.ts");function checkWriter(writerId){const accessToken=(0,_utils_localStorage__WEBPACK_IMPORTED_MODULE_0__.$o)(_constants_localStorage__WEBPACK_IMPORTED_MODULE_1__.W);if(!accessToken)return!1;return writerId===(0,_utils_token_decodeToken__WEBPACK_IMPORTED_MODULE_2__.T)(accessToken).memberId}},"./src/utils/post/convertImageUrlToServerUrl.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>convertImageUrlToServerUrl,X:()=>convertServerUrlToImageUrl});var _constants_post__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/constants/post.ts");const convertImageUrlToServerUrl=imageUrl=>`${_constants_post__WEBPACK_IMPORTED_MODULE_0__.f_}${imageUrl}`,convertServerUrlToImageUrl=imageUrl=>imageUrl.replace(_constants_post__WEBPACK_IMPORTED_MODULE_0__.f_,"")},"./src/assets/logo.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/logo.9ee58604.svg"}}]);
//# sourceMappingURL=pages-VoteStatisticsPage-VoteStatistics-stories.27fd6eb8.iframe.bundle.js.map