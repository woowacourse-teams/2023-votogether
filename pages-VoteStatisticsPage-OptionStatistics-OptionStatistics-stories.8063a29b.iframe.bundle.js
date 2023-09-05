"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[8525],{"./src/pages/VoteStatisticsPage/OptionStatistics/OptionStatistics.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultPage:()=>DefaultPage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/pages/VoteStatisticsPage/OptionStatistics/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},MOCK_MAX_VOTE_OPTION={id:2,text:"",imageUrl:"https://source.unsplash.com/random",peopleCount:10,percent:10},DefaultPage={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{postId:1,voteOption:MOCK_MAX_VOTE_OPTION,isSelectedOption:!0,size:"sm"})};DefaultPage.parameters={...DefaultPage.parameters,docs:{...DefaultPage.parameters?.docs,source:{originalSource:'{\n  render: () => <OptionStatistics postId={1} voteOption={MOCK_MAX_VOTE_OPTION} isSelectedOption={true} size="sm" />\n}',...DefaultPage.parameters?.docs?.source}}};const __namedExportsOrder=["DefaultPage"]},"./src/api/voteResult.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>getOptionStatistics,a:()=>getPostStatistics});var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/fetch.ts");const getPostStatistics=async postId=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)(`/posts/${postId}/options`),getOptionStatistics=async({postId,optionId})=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)(`/posts/${postId}/options/${optionId}`)},"./src/components/VoteStatistics/GraphStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{FV:()=>GraphContainer,lj:()=>GENDER_COLOR,x1:()=>Line});var styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_styles_theme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styles/theme.ts");const GENDER_COLOR={FEMALE:"var(--graph-color-purple)",MALE:"var(--graph-color-green)"},SIZE={sm:{height:"200px",linePositionTop:"165px"},md:{height:"230px",linePositionTop:"194px"},lg:{height:"260px",linePositionTop:"224px"}},GraphContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
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
`;var TwoLineGraph=__webpack_require__("./src/components/VoteStatistics/TwoLineGraph/index.tsx");const transVoteStatisticsFormat=voteResult=>{const{ageGroup,totalFemaleCount,totalMaleCount,totalVoteCount}=voteResult,newAgeGroup=ageGroup.map((ageResult=>(voteResult=>{const{ageGroup,femaleCount,maleCount,voteCount}=voteResult;return{name:ageGroup,female:femaleCount,male:maleCount,total:voteCount}})(ageResult)));return{ageGroup:newAgeGroup,female:totalFemaleCount,male:totalMaleCount,total:totalVoteCount}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const radioMode={all:"전체보기",gender:"성별보기"};function VoteStatistics({voteResultResponse,size}){const[currentRadioMode,setCurrentRadioMode]=(0,react.useState)("all"),radioModeKey=Object.keys(radioMode),voteResult=transVoteStatisticsFormat(voteResultResponse),changeMode=e=>{const targetCategory=e.target.value;setCurrentRadioMode(targetCategory)},random=Date.now();return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(CategoryWrapper,{children:radioModeKey.map((mode=>(0,jsx_runtime.jsxs)(RadioLabel,{children:[(0,jsx_runtime.jsx)("input",{type:"radio",name:`radio-category-${random}`,value:mode,defaultChecked:mode===currentRadioMode,onClick:changeMode}),radioMode[mode]]},mode)))}),(0,jsx_runtime.jsx)(GenderExplain,{"aria-label":"성별 조건",children:"gender"===currentRadioMode&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsx)(ColorIcon,{"aria-label":"성별 조건",$gender:"FEMALE"})," 여자"]}),(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsx)(ColorIcon,{"aria-label":"성별 조건",$gender:"MALE"})," 남자"]})]})}),"all"===currentRadioMode&&(0,jsx_runtime.jsx)(OneLineGraph.Z,{size,ageGroup:voteResult.ageGroup}),"gender"===currentRadioMode&&(0,jsx_runtime.jsx)(TwoLineGraph.Z,{size,ageGroup:voteResult.ageGroup})]})}VoteStatistics.displayName="VoteStatistics";try{VoteStatistics.displayName="VoteStatistics",VoteStatistics.__docgenInfo={description:"",displayName:"VoteStatistics",props:{voteResultResponse:{defaultValue:null,description:"",name:"voteResultResponse",required:!0,type:{name:"VoteResultResponse"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/VoteStatistics/index.tsx#VoteStatistics"]={docgenInfo:VoteStatistics.__docgenInfo,name:"VoteStatistics",path:"src/components/VoteStatistics/index.tsx#VoteStatistics"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/LoadingSpinner/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LoadingSpinner});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:"10px",md:"15px",lg:"30px"},Animation=styled_components_browser_esm.F4`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function LoadingSpinner({size}){return(0,jsx_runtime.jsxs)(Container,{$size:size,"aria-label":"로딩 중입니다.",children:[(0,jsx_runtime.jsx)(Unit,{$size:size}),(0,jsx_runtime.jsx)(Unit,{$size:size}),(0,jsx_runtime.jsx)(Unit,{$size:size})]})}LoadingSpinner.displayName="LoadingSpinner";try{LoadingSpinner.displayName="LoadingSpinner",LoadingSpinner.__docgenInfo={description:"",displayName:"LoadingSpinner",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/LoadingSpinner/index.tsx#LoadingSpinner"]={docgenInfo:LoadingSpinner.__docgenInfo,name:"LoadingSpinner",path:"src/components/common/LoadingSpinner/index.tsx#LoadingSpinner"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Toast/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Toast});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),animation=__webpack_require__("./src/constants/animation.ts"),theme=__webpack_require__("./src/styles/theme.ts"),ToastNSnackBarStyle=__webpack_require__("./src/components/common/ToastNSnackBarStyle.ts");const fadeInOutAnimation=styled_components_browser_esm.F4`
  0%, 100%{
    opacity: 0;
  }
  10%, 90% {
    opacity: 1;
  }
`,Wrapper=styled_components_browser_esm.zo.div`
  position: fixed;

  top: ${props=>ToastNSnackBarStyle.V[props.$position]};
`,Content=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${props=>ToastNSnackBarStyle.m[props.$size].width};
  height: ${props=>ToastNSnackBarStyle.m[props.$size].height};
  border-radius: 4px;

  background-color: rgba(0, 0, 0, 0.5);
  color: var(--white);

  font: var(--text-caption);
  letter-spacing: 1px;

  animation: ${fadeInOutAnimation} ${animation.d}s linear infinite;

  z-index: ${theme.r.zIndex.modal};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Toast({children,size,position}){return(0,jsx_runtime.jsx)(Wrapper,{$position:position,children:(0,jsx_runtime.jsx)(Content,{"aria-live":"polite",$size:size,children})})}Toast.displayName="Toast";try{Toast.displayName="Toast",Toast.__docgenInfo={description:"",displayName:"Toast",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Toast/index.tsx#Toast"]={docgenInfo:Toast.__docgenInfo,name:"Toast",path:"src/components/common/Toast/index.tsx#Toast"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/ToastNSnackBarStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>POSITION,m:()=>SQUARE_SIZE});const POSITION={top:"25%",bottom:"85%"},SQUARE_SIZE={sm:{width:"250px",height:"40px"},md:{width:"400px",height:"40px"},lg:{width:"500px",height:"45px"},free:{width:"80%",height:"50px"}}},"./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ProgressBar});__webpack_require__("./node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOption({handleVoteClick,text,isStatisticsVisible,peopleCount,percent,isSelected,isPreview,imageUrl,ariaLabel}){return(0,jsx_runtime.jsxs)(Container,{"aria-live":isSelected?"polite":"off","aria-label":ariaLabel,$isSelected:isSelected,onClick:handleVoteClick,children:[!isPreview&&imageUrl&&(0,jsx_runtime.jsx)(Image,{src:(0,convertImageUrlToServerUrl.B)(imageUrl),alt:"선택지에 포함된 이미지"}),isPreview?(0,jsx_runtime.jsx)(PreviewContent,{children:text}):(0,jsx_runtime.jsx)(DetailContent,{children:text}),isStatisticsVisible&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(ProgressContainer,{children:(0,jsx_runtime.jsx)(ProgressBar.Z,{percent,isSelected})}),(0,jsx_runtime.jsxs)(TextContainer,{children:[(0,jsx_runtime.jsxs)(PeopleText,{"aria-hidden":"true",children:[peopleCount,"명"]}),(0,jsx_runtime.jsxs)(PercentText,{"aria-hidden":"true",children:["(",percent.toFixed(1),"%)"]})]})]})]})}WrittenVoteOption.displayName="WrittenVoteOption";try{WrittenVoteOption.displayName="WrittenVoteOption",WrittenVoteOption.__docgenInfo={description:"",displayName:"WrittenVoteOption",props:{handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"() => void"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},isStatisticsVisible:{defaultValue:null,description:"",name:"isStatisticsVisible",required:!0,type:{name:"boolean"}},peopleCount:{defaultValue:null,description:"",name:"peopleCount",required:!0,type:{name:"number"}},percent:{defaultValue:null,description:"",name:"percent",required:!0,type:{name:"number"}},isSelected:{defaultValue:null,description:"",name:"isSelected",required:!0,type:{name:"boolean"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},imageUrl:{defaultValue:null,description:"",name:"imageUrl",required:!0,type:{name:"string"}},ariaLabel:{defaultValue:null,description:"",name:"ariaLabel",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"]={docgenInfo:WrittenVoteOption.__docgenInfo,name:"WrittenVoteOption",path:"src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/animation.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>TOAST_TIME});const TOAST_TIME=3},"./src/constants/post.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B9:()=>POST_CONTENT,D:()=>DEFAULT_KEYWORD,FQ:()=>SORTING,It:()=>REQUEST_POST_KIND_URL,JH:()=>POST_TYPE,Kf:()=>REQUEST_STATUS_OPTION,Kn:()=>SEARCH_KEYWORD,Pi:()=>POST_TITLE,Q_:()=>STATUS,cb:()=>CATEGORY_COUNT_LIMIT,f_:()=>IMAGE_BASE_URL,ko:()=>SEARCH_KEYWORD_MAX_LENGTH,tL:()=>REQUEST_SORTING_OPTION,yE:()=>DEFAULT_CATEGORY_ID,zV:()=>POST_LIST_MAX_LENGTH});const STATUS={ALL:"all",PROGRESS:"progress",CLOSED:"closed"},SORTING={LATEST:"latest",POPULAR:"popular"},POST_TYPE={ALL:"posts",MY_POST:"myPost",MY_VOTE:"myVote",CATEGORY:"category",SEARCH:"search"},REQUEST_STATUS_OPTION={[STATUS.ALL]:"ALL",[STATUS.PROGRESS]:"PROGRESS",[STATUS.CLOSED]:"CLOSED"},REQUEST_SORTING_OPTION={[SORTING.LATEST]:"LATEST",[SORTING.POPULAR]:"HOT"},REQUEST_POST_KIND_URL={[POST_TYPE.ALL]:"posts",[POST_TYPE.MY_POST]:"posts/me",[POST_TYPE.MY_VOTE]:"posts/votes/me",[POST_TYPE.CATEGORY]:"posts",[POST_TYPE.SEARCH]:"posts/search"},SEARCH_KEYWORD="keyword",POST_TITLE={MAX_LENGTH:100,MIN_LENGTH:2},POST_CONTENT={MAX_LENGTH:1e3,MIN_LENGTH:2},SEARCH_KEYWORD_MAX_LENGTH=100,POST_LIST_MAX_LENGTH=10,DEFAULT_CATEGORY_ID=0,DEFAULT_KEYWORD="",CATEGORY_COUNT_LIMIT=3,IMAGE_BASE_URL=`${"".replace(/api\./,"")}/`},"./src/hooks/useFetch.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>useFetch});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useFetch=fetchFn=>{const[data,setData]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[errorMessage,setErrorMessage]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[isLoading,setIsLoading]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0),refetch=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setIsLoading(!0),setData(null),setErrorMessage(null),fetchFn().then((res=>{setData(res)})).catch((error=>{setErrorMessage(error.message)})).finally((()=>{setIsLoading(!1)}))}),[fetchFn]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{refetch()}),[]),{data,errorMessage,isLoading,refetch}}},"./src/hooks/useToast.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>useToast});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_constants_animation__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/animation.ts");const useToast=()=>{const[isToastOpen,setIsToastOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[toastMessage,setToastMessage]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),timeIdRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),clear=()=>{timeIdRef.current&&window.clearTimeout(timeIdRef.current)};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>clear),[]),{isToastOpen,toastMessage,openToast:message=>{clear(),setIsToastOpen(!0),setToastMessage(message),timeIdRef.current=window.setTimeout((()=>{setIsToastOpen(!1)}),1e3*_constants_animation__WEBPACK_IMPORTED_MODULE_1__.d)}}}},"./src/pages/VoteStatisticsPage/OptionStatistics/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>OptionStatistics});var react=__webpack_require__("./node_modules/react/index.js"),useFetch=__webpack_require__("./src/hooks/useFetch.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),api_voteResult=__webpack_require__("./src/api/voteResult.ts"),LoadingSpinner=__webpack_require__("./src/components/common/LoadingSpinner/index.tsx"),Toast=__webpack_require__("./src/components/common/Toast/index.tsx"),WrittenVoteOption=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx"),VoteStatistics=__webpack_require__("./src/components/VoteStatistics/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function OptionStatistics({postId,voteOption,isSelectedOption,size}){const[isStatisticsOpen,setIsStatisticsOpen]=(0,react.useState)(!1),{isToastOpen,openToast,toastMessage}=(0,useToast.p)(),{data:voteResult,errorMessage,isLoading}=(0,useFetch.i)((()=>(0,api_voteResult.L)({postId,optionId:voteOption.id})));return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(WrittenVoteOption.Z,{ariaLabel:"투표 통계",...voteOption,isPreview:!1,isStatisticsVisible:!0,isSelected:isSelectedOption,handleVoteClick:()=>{if(!voteResult)return openToast("투표 통계 불러오기를 실패했습니다.");setIsStatisticsOpen(!isStatisticsOpen)}},voteOption.id),(0,jsx_runtime.jsxs)(StatisticsContainer,{children:[!isStatisticsOpen&&(0,jsx_runtime.jsx)(ScreenReaderDirection,{children:"투표 선택지를 클릭하여 투표 통계를 열어 확인할 수 있습니다."}),isStatisticsOpen&&voteResult&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(ScreenReaderDirection,{children:"투표 선택지를 클릭하여 투표 통계를 닫을 수 있습니다."}),(0,jsx_runtime.jsx)(VoteStatistics.Z,{voteResultResponse:voteResult,size})]}),isStatisticsOpen&&isLoading&&(0,jsx_runtime.jsx)(LoadingWrapper,{children:(0,jsx_runtime.jsx)(LoadingSpinner.Z,{size:"sm"})}),isStatisticsOpen&&errorMessage]}),isToastOpen&&(0,jsx_runtime.jsx)(Toast.Z,{size:"md",position:"bottom",children:toastMessage})]})}OptionStatistics.displayName="OptionStatistics";try{OptionStatistics.displayName="OptionStatistics",OptionStatistics.__docgenInfo={description:"",displayName:"OptionStatistics",props:{postId:{defaultValue:null,description:"",name:"postId",required:!0,type:{name:"number"}},isSelectedOption:{defaultValue:null,description:"",name:"isSelectedOption",required:!0,type:{name:"boolean"}},voteOption:{defaultValue:null,description:"",name:"voteOption",required:!0,type:{name:"WrittenVoteOptionType"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/VoteStatisticsPage/OptionStatistics/index.tsx#OptionStatistics"]={docgenInfo:OptionStatistics.__docgenInfo,name:"OptionStatistics",path:"src/pages/VoteStatisticsPage/OptionStatistics/index.tsx#OptionStatistics"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
  `}}},"./src/utils/post/convertImageUrlToServerUrl.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>convertImageUrlToServerUrl,X:()=>convertServerUrlToImageUrl});var _constants_post__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/constants/post.ts");const convertImageUrlToServerUrl=imageUrl=>`${_constants_post__WEBPACK_IMPORTED_MODULE_0__.f_}${imageUrl}`,convertServerUrlToImageUrl=imageUrl=>imageUrl.replace(_constants_post__WEBPACK_IMPORTED_MODULE_0__.f_,"")}}]);
//# sourceMappingURL=pages-VoteStatisticsPage-OptionStatistics-OptionStatistics-stories.8063a29b.iframe.bundle.js.map