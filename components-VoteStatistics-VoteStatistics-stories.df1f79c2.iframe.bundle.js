"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[6841],{"./src/components/VoteStatistics/VoteStatistics.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SizeLg:()=>SizeLg,SizeMd:()=>SizeMd,SizeSm:()=>SizeSm,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _mocks_mockData_voteResult__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/mocks/mockData/voteResult.ts"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/VoteStatistics/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_1__.Z},SizeSm={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{size:"sm",voteResultResponse:_mocks_mockData_voteResult__WEBPACK_IMPORTED_MODULE_0__.O})},SizeMd={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{size:"md",voteResultResponse:_mocks_mockData_voteResult__WEBPACK_IMPORTED_MODULE_0__.O})},SizeLg={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{size:"lg",voteResultResponse:_mocks_mockData_voteResult__WEBPACK_IMPORTED_MODULE_0__.O})};SizeSm.parameters={...SizeSm.parameters,docs:{...SizeSm.parameters?.docs,source:{originalSource:'{\n  render: () => <VoteStatistics size="sm" voteResultResponse={MOCK_VOTE_RESULT} />\n}',...SizeSm.parameters?.docs?.source}}},SizeMd.parameters={...SizeMd.parameters,docs:{...SizeMd.parameters?.docs,source:{originalSource:'{\n  render: () => <VoteStatistics size="md" voteResultResponse={MOCK_VOTE_RESULT} />\n}',...SizeMd.parameters?.docs?.source}}},SizeLg.parameters={...SizeLg.parameters,docs:{...SizeLg.parameters?.docs,source:{originalSource:'{\n  render: () => <VoteStatistics size="lg" voteResultResponse={MOCK_VOTE_RESULT} />\n}',...SizeLg.parameters?.docs?.source}}};const __namedExportsOrder=["SizeSm","SizeMd","SizeLg"]},"./src/components/VoteStatistics/GraphStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{FV:()=>GraphContainer,lj:()=>GENDER_COLOR,x1:()=>Line});var styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_styles_theme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styles/theme.ts");const GENDER_COLOR={FEMALE:"var(--graph-color-purple)",MALE:"var(--graph-color-green)"},SIZE={sm:{height:"200px",linePositionTop:"165px"},md:{height:"230px",linePositionTop:"194px"},lg:{height:"260px",linePositionTop:"224px"}},GraphContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
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
`;var TwoLineGraph=__webpack_require__("./src/components/VoteStatistics/TwoLineGraph/index.tsx");const transVoteStatisticsFormat=voteResult=>{const{ageGroup,totalFemaleCount,totalMaleCount,totalVoteCount}=voteResult,newAgeGroup=ageGroup.map((ageResult=>(voteResult=>{const{ageGroup,femaleCount,maleCount,voteCount}=voteResult;return{name:ageGroup,female:femaleCount,male:maleCount,total:voteCount}})(ageResult)));return{ageGroup:newAgeGroup,female:totalFemaleCount,male:totalMaleCount,total:totalVoteCount}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const radioMode={all:"전체보기",gender:"성별보기"};function VoteStatistics({voteResultResponse,size}){const[currentRadioMode,setCurrentRadioMode]=(0,react.useState)("all"),radioModeKey=Object.keys(radioMode),voteResult=transVoteStatisticsFormat(voteResultResponse),changeMode=e=>{const targetCategory=e.target.value;setCurrentRadioMode(targetCategory)},random=Date.now();return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(CategoryWrapper,{children:radioModeKey.map((mode=>(0,jsx_runtime.jsxs)(RadioLabel,{children:[(0,jsx_runtime.jsx)("input",{type:"radio",name:`radio-category-${random}`,value:mode,defaultChecked:mode===currentRadioMode,onClick:changeMode}),radioMode[mode]]},mode)))}),(0,jsx_runtime.jsx)(GenderExplain,{"aria-label":"성별 조건",children:"gender"===currentRadioMode&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsx)(ColorIcon,{"aria-label":"성별 조건",$gender:"FEMALE"})," 여자"]}),(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsx)(ColorIcon,{"aria-label":"성별 조건",$gender:"MALE"})," 남자"]})]})}),"all"===currentRadioMode&&(0,jsx_runtime.jsx)(OneLineGraph.Z,{size,ageGroup:voteResult.ageGroup}),"gender"===currentRadioMode&&(0,jsx_runtime.jsx)(TwoLineGraph.Z,{size,ageGroup:voteResult.ageGroup})]})}VoteStatistics.displayName="VoteStatistics";try{VoteStatistics.displayName="VoteStatistics",VoteStatistics.__docgenInfo={description:"",displayName:"VoteStatistics",props:{voteResultResponse:{defaultValue:null,description:"",name:"voteResultResponse",required:!0,type:{name:"VoteResultResponse"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/VoteStatistics/index.tsx#VoteStatistics"]={docgenInfo:VoteStatistics.__docgenInfo,name:"VoteStatistics",path:"src/components/VoteStatistics/index.tsx#VoteStatistics"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
  0% {
      background-color: rgba(165, 165, 165, 0.1);
  }

  50% {
      background-color: rgba(165, 165, 165, 0.3);
  }
  
  100% {
      background-color: rgba(165, 165, 165, 0.1);
  }
  `,skeletonGradientWave:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
  to {
      background-position-x: -200%;
    }
  `}}}}]);
//# sourceMappingURL=components-VoteStatistics-VoteStatistics-stories.df1f79c2.iframe.bundle.js.map