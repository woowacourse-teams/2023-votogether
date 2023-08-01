"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[2536],{"./src/pages/VoteStatistics/OptionStatistics/OptionStatistics.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultPage:()=>DefaultPage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/pages/VoteStatistics/OptionStatistics/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},MOCK_MAX_VOTE_OPTION={id:2,text:"",imageUrl:"https://source.unsplash.com/random",peopleCount:10,percent:10},DefaultPage={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{postId:1,voteOption:MOCK_MAX_VOTE_OPTION,isSelectedOption:!0,size:"sm"})};DefaultPage.parameters={...DefaultPage.parameters,docs:{...DefaultPage.parameters?.docs,source:{originalSource:'{\n  render: () => <OptionStatistics postId={1} voteOption={MOCK_MAX_VOTE_OPTION} isSelectedOption={true} size="sm" />\n}',...DefaultPage.parameters?.docs?.source}}};const __namedExportsOrder=["DefaultPage"]},"./src/api/voteResult.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>getOptionStatistics,a:()=>getPostStatistics});var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/fetch.ts");const getPostStatistics=async postId=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)(`/posts/${postId}/options`),getOptionStatistics=async({postId,optionId})=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)(`/posts/${postId}/options/${optionId}`)},"./src/components/VoteStatistics/GraphStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>GraphContainer,x:()=>Line});var styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_styles_theme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styles/theme.ts");const size={sm:{height:"200px",linePositionTop:"165px"},md:{height:"230px",linePositionTop:"194px"},lg:{height:"260px",linePositionTop:"224px"}},GraphContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
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
`;var TwoLineGraph=__webpack_require__("./src/components/VoteStatistics/TwoLineGraph/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const radioMode={all:"전체보기",gender:"성별보기"};function VoteStatistics({voteResult,size}){const[currentRadioMode,setCurrentRadioMode]=(0,react.useState)("all"),radioModeKey=Object.keys(radioMode),changeMode=e=>{const targetCategory=e.target.value;setCurrentRadioMode(targetCategory)},random=Date.now();return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(CategoryWrapper,{children:radioModeKey.map((mode=>(0,jsx_runtime.jsxs)(RadioLabel,{children:[(0,jsx_runtime.jsx)("input",{type:"radio",name:`radio-category-${random}`,value:mode,defaultChecked:mode===currentRadioMode,onClick:changeMode}),radioMode[mode]]},mode)))}),"all"===currentRadioMode&&(0,jsx_runtime.jsx)(OneLineGraph.Z,{size,voteResult}),"gender"===currentRadioMode&&(0,jsx_runtime.jsx)(TwoLineGraph.Z,{size,voteResult})]})}VoteStatistics.displayName="VoteStatistics";try{VoteStatistics.displayName="VoteStatistics",VoteStatistics.__docgenInfo={description:"",displayName:"VoteStatistics",props:{voteResult:{defaultValue:null,description:"",name:"voteResult",required:!0,type:{name:"VoteResult"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/VoteStatistics/index.tsx#VoteStatistics"]={docgenInfo:VoteStatistics.__docgenInfo,name:"VoteStatistics",path:"src/components/VoteStatistics/index.tsx#VoteStatistics"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/VoteStatistics/type.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{e:()=>AGE_OPTION});const AGE_OPTION=["underTeenager","teenager","twenties","thirties","forties","fifties","aboveFifties"]},"./src/components/common/LoadingSpinner/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LoadingSpinner});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:"10px",md:"15px",lg:"30px"},Animation=styled_components_browser_esm.F4`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function LoadingSpinner({size}){return(0,jsx_runtime.jsxs)(Container,{$size:size,children:[(0,jsx_runtime.jsx)(Unit,{$size:size}),(0,jsx_runtime.jsx)(Unit,{$size:size}),(0,jsx_runtime.jsx)(Unit,{$size:size})]})}LoadingSpinner.displayName="LoadingSpinner";try{LoadingSpinner.displayName="LoadingSpinner",LoadingSpinner.__docgenInfo={description:"",displayName:"LoadingSpinner",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/LoadingSpinner/index.tsx#LoadingSpinner"]={docgenInfo:LoadingSpinner.__docgenInfo,name:"LoadingSpinner",path:"src/components/common/LoadingSpinner/index.tsx#LoadingSpinner"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ProgressBar});__webpack_require__("./node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOption({handleVoteClick,text,isVoted,peopleCount,percent,isSelected,isPreview,imageUrl}){return(0,jsx_runtime.jsxs)(Container,{$isSelected:isSelected,onClick:handleVoteClick,children:[!isPreview&&imageUrl&&(0,jsx_runtime.jsx)(Image,{src:imageUrl,alt:text}),isPreview?(0,jsx_runtime.jsx)(PreviewContent,{children:text}):(0,jsx_runtime.jsx)(DetailContent,{children:text}),isVoted&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(ProgressContainer,{children:(0,jsx_runtime.jsx)(ProgressBar.Z,{percent,isSelected})}),(0,jsx_runtime.jsxs)(TextContainer,{children:[(0,jsx_runtime.jsxs)(PeopleText,{children:[peopleCount,"명"]}),(0,jsx_runtime.jsxs)(PercentText,{children:["(",percent.toFixed(1),"%)"]})]})]})]})}WrittenVoteOption.displayName="WrittenVoteOption";try{WrittenVoteOption.displayName="WrittenVoteOption",WrittenVoteOption.__docgenInfo={description:"",displayName:"WrittenVoteOption",props:{handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"() => void"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},isVoted:{defaultValue:null,description:"",name:"isVoted",required:!0,type:{name:"boolean"}},peopleCount:{defaultValue:null,description:"",name:"peopleCount",required:!0,type:{name:"number"}},percent:{defaultValue:null,description:"",name:"percent",required:!0,type:{name:"number"}},isSelected:{defaultValue:null,description:"",name:"isSelected",required:!0,type:{name:"boolean"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},imageUrl:{defaultValue:null,description:"",name:"imageUrl",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"]={docgenInfo:WrittenVoteOption.__docgenInfo,name:"WrittenVoteOption",path:"src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useFetch.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>useFetch});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useFetch=fetchFn=>{const[data,setData]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[errorMessage,setErrorMessage]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[isLoading,setIsLoading]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0),refetch=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setIsLoading(!0),setData(null),setErrorMessage(null),fetchFn().then((res=>{setData(res)})).catch((error=>{setErrorMessage(error.message)})).finally((()=>{setIsLoading(!1)}))}),[fetchFn]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{refetch()}),[]),{data,errorMessage,isLoading,refetch}}},"./src/pages/VoteStatistics/OptionStatistics/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>OptionStatistics});var react=__webpack_require__("./node_modules/react/index.js"),useFetch=__webpack_require__("./src/hooks/useFetch.ts"),api_voteResult=__webpack_require__("./src/api/voteResult.ts"),LoadingSpinner=__webpack_require__("./src/components/common/LoadingSpinner/index.tsx"),WrittenVoteOption=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx"),VoteStatistics=__webpack_require__("./src/components/VoteStatistics/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function OptionStatistics({postId,voteOption,isSelectedOption,size}){const[isStatisticsOpen,setIsStatisticsOpen]=(0,react.useState)(!1),{data:voteResult,errorMessage,isLoading}=(0,useFetch.i)((()=>(0,api_voteResult.L)({postId,optionId:voteOption.id})));return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(WrittenVoteOption.Z,{...voteOption,isPreview:!1,isVoted:!0,isSelected:isSelectedOption,handleVoteClick:()=>{setIsStatisticsOpen(!isStatisticsOpen)}},voteOption.id),(0,jsx_runtime.jsxs)(StatisticsContainer,{children:[isStatisticsOpen&&voteResult&&(0,jsx_runtime.jsx)(VoteStatistics.Z,{voteResult,size}),isStatisticsOpen&&isLoading&&(0,jsx_runtime.jsx)(LoadingWrapper,{children:(0,jsx_runtime.jsx)(LoadingSpinner.Z,{size:"sm"})}),isStatisticsOpen&&errorMessage]})]})}OptionStatistics.displayName="OptionStatistics";try{OptionStatistics.displayName="OptionStatistics",OptionStatistics.__docgenInfo={description:"",displayName:"OptionStatistics",props:{postId:{defaultValue:null,description:"",name:"postId",required:!0,type:{name:"number"}},isSelectedOption:{defaultValue:null,description:"",name:"isSelectedOption",required:!0,type:{name:"boolean"}},voteOption:{defaultValue:null,description:"",name:"voteOption",required:!0,type:{name:"WrittenVoteOptionType"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/VoteStatistics/OptionStatistics/index.tsx#OptionStatistics"]={docgenInfo:OptionStatistics.__docgenInfo,name:"OptionStatistics",path:"src/pages/VoteStatistics/OptionStatistics/index.tsx#OptionStatistics"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});const theme={breakpoint:{sm:"576px",md:"960px",lg:"1440px"},zIndex:{header:100,modal:200}}},"./src/utils/fetch.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$V:()=>multiPutFetch,Wq:()=>deleteFetch,XH:()=>patchFetch,ZL:()=>postFetch,hO:()=>multiPostFetch,wY:()=>getFetch});const headers={"Content-Type":"application/json;charset=utf-8",Authorization:"Bearer "},multiHeaders={"Content-Type":"multipart/form-data",Authorization:"Bearer "},getFetch=async url=>{const response=await fetch(url,{method:"GET",headers}),data=await response.json();if(!response.ok)throw new Error(data.message);return data},postFetch=async(url,body)=>{const response=await fetch(url,{method:"POST",body:JSON.stringify(body),headers}),data=await response.json();if(!response.ok)throw new Error(data.message);return data},patchFetch=async(url,body)=>{const response=await fetch(url,{method:"PATCH",headers,body:JSON.stringify(body)}),data=await response.json();if(!response.ok)throw new Error(data.message);return response},deleteFetch=async url=>await fetch(url,{method:"DELETE",headers}),multiPostFetch=async(url,body)=>{const response=await fetch(url,{method:"POST",body,headers:multiHeaders}),data=await response.json();if(!response.ok)throw new Error(data.message);return data},multiPutFetch=async(url,body)=>{const response=await fetch(url,{method:"PUT",body,headers:multiHeaders}),data=await response.json();if(!response.ok)throw new Error(data.message);return data}}}]);
//# sourceMappingURL=pages-VoteStatistics-OptionStatistics-OptionStatistics-stories.4c848866.iframe.bundle.js.map