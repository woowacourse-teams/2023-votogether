"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[7381],{"./src/pages/Ranking/PassionUser/PassionUser.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Guest:()=>Guest,User:()=>User,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/pages/Ranking/PassionUser/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},userRankingInfo={rank:1111,nickname:"wow",postCount:1,voteCount:3,score:8},rankerList=new Array(10).fill({rank:1,nickname:"gil-dong",postCount:11,voteCount:79,score:134}).map(((ranker,index)=>({...ranker,rank:index+1}))),User={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{rankerList,userRanking:userRankingInfo})},Guest={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{rankerList})};User.parameters={...User.parameters,docs:{...User.parameters?.docs,source:{originalSource:"{\n  render: () => <PassionUserRanking rankerList={rankerList} userRanking={userRankingInfo} />\n}",...User.parameters?.docs?.source}}},Guest.parameters={...Guest.parameters,docs:{...Guest.parameters?.docs,source:{originalSource:"{\n  render: () => <PassionUserRanking rankerList={rankerList} />\n}",...Guest.parameters?.docs?.source}}};const __namedExportsOrder=["User","Guest"]},"./src/pages/Ranking/PassionUser/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PassionUserRanking});var first_rank=__webpack_require__("./src/assets/first-rank.svg"),second_rank=__webpack_require__("./src/assets/second-rank.svg"),third_rank=__webpack_require__("./src/assets/third-rank.svg"),RankingTableStyle=__webpack_require__("./src/pages/Ranking/RankingTableStyle.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Table=styled_components_browser_esm.zo.table`
  width: 100%;

  font: var(--text-caption);
  text-align: center;

  & > :nth-child(12) {
    margin-top: 20px;
    padding: 3px 0;
    border-radius: 4px;

    background-color: var(--white);

    font-weight: 500;
  }
`,Tr=styled_components_browser_esm.zo.tr`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 1fr 1fr 1fr;
  align-items: center;
`,Th=styled_components_browser_esm.zo.th`
  padding: 10px 0;

  font: var(--text-body);
`,RankingTd=styled_components_browser_esm.zo.td`
  padding: 5px 0;
  height: auto;

  line-height: 0;
`,Td=styled_components_browser_esm.zo.td`
  padding: 10px 0;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const columnNameList=["등수","닉네임","작성글 수","투표 수","점수"],rankIconUrl={1:first_rank,2:second_rank,3:third_rank};function PassionUserRanking({rankerList,userRanking}){return(0,jsx_runtime.jsx)(RankingTableStyle.A,{children:(0,jsx_runtime.jsxs)(Table,{children:[(0,jsx_runtime.jsx)(Tr,{children:columnNameList.map((text=>(0,jsx_runtime.jsx)(Th,{children:text},text)))}),rankerList.map((ranker=>{const rankIcon=rankIconUrl[ranker.rank]&&(0,jsx_runtime.jsx)("img",{src:rankIconUrl[ranker.rank],alt:ranker.rank.toString()});return(0,jsx_runtime.jsxs)(Tr,{children:[(0,jsx_runtime.jsx)(RankingTd,{children:rankIcon??ranker.rank}),(0,jsx_runtime.jsx)(Td,{children:ranker.nickname}),(0,jsx_runtime.jsx)(Td,{children:ranker.postCount}),(0,jsx_runtime.jsx)(Td,{children:ranker.voteCount}),(0,jsx_runtime.jsx)(Td,{children:ranker.score})]},ranker.rank)})),userRanking&&(0,jsx_runtime.jsxs)(Tr,{children:[(0,jsx_runtime.jsx)(Td,{children:userRanking.rank}),(0,jsx_runtime.jsx)(Td,{children:userRanking.nickname}),(0,jsx_runtime.jsx)(Td,{children:userRanking.postCount}),(0,jsx_runtime.jsx)(Td,{children:userRanking.voteCount}),(0,jsx_runtime.jsx)(Td,{children:userRanking.score})]})]})})}PassionUserRanking.displayName="PassionUserRanking";try{PassionUser.displayName="PassionUser",PassionUser.__docgenInfo={description:"",displayName:"PassionUser",props:{rankerList:{defaultValue:null,description:"",name:"rankerList",required:!0,type:{name:"PassionUser[]"}},userRanking:{defaultValue:null,description:"",name:"userRanking",required:!1,type:{name:"PassionUser"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/Ranking/PassionUser/index.tsx#PassionUser"]={docgenInfo:PassionUser.__docgenInfo,name:"PassionUser",path:"src/pages/Ranking/PassionUser/index.tsx#PassionUser"})}catch(__react_docgen_typescript_loader_error){}},"./src/pages/Ranking/RankingTableStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Background});var styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_styles_theme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styles/theme.ts");const Background=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  height: fit-content;
  border-radius: 4px;

  background-color: var(--gray);

  padding: 15px 10px;

  @media (min-width: ${_styles_theme__WEBPACK_IMPORTED_MODULE_0__.r.breakpoint.sm}) {
    padding: 15px 15px;
  }
`},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
  `}}},"./src/assets/first-rank.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/first-rank.218349c4.svg"},"./src/assets/second-rank.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/second-rank.181f5249.svg"},"./src/assets/third-rank.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/third-rank.188589ee.svg"}}]);
//# sourceMappingURL=pages-Ranking-PassionUser-PassionUser-stories.1c17b988.iframe.bundle.js.map