"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[7381],{"./src/pages/Ranking/PassionUser/PassionUser.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Guest:()=>Guest,User:()=>User,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/pages/Ranking/PassionUser/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},User={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{})},Guest={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{})};User.parameters={...User.parameters,docs:{...User.parameters?.docs,source:{originalSource:"{\n  render: () => <PassionUserRanking />\n}",...User.parameters?.docs?.source}}},Guest.parameters={...Guest.parameters,docs:{...Guest.parameters?.docs,source:{originalSource:"{\n  render: () => <PassionUserRanking />\n}",...Guest.parameters?.docs?.source}}};const __namedExportsOrder=["User","Guest"]},"./src/api/ranking.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$s:()=>getUserRanking,R5:()=>getPassionUserRanking,pO:()=>getPopularPostRanking});var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/fetch.ts");const getUserRanking=async isLoggedIn=>isLoggedIn?await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)("/members/me/ranking/passion"):null,getPassionUserRanking=async()=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)("/members/ranking/passion/guest"),getPopularPostRanking=async()=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)("/posts/ranking/popular/guest")},"./src/components/common/ErrorMessage/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ErrorMessage});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Wrapper=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  position: relative;
`,Title=(styled_components_browser_esm.zo.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.r.zIndex.header};

  @media (min-width: ${theme.r.breakpoint.md}) {
    display: none;
  }
`,styled_components_browser_esm.zo.h1`
  width: 90%;
  margin-top: 60px;

  font-size: 20px;
  font-weight: bold;

  text-align: center;
`),Description=styled_components_browser_esm.zo.p`
  width: 90%;
  margin: 20px 0;

  font: var(--text-body);
  text-align: center;
`;styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`,styled_components_browser_esm.zo.p`
  display: flex;
  justify-content: space-around;
  gap: 10px;

  padding: 12px;

  font: var(--text-body);
  font-weight: bold;
`,styled_components_browser_esm.zo.div`
  width: 120px;
  height: 50px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ErrorMessage({errorHandler}){return(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(Title,{children:"⚠ 잠시 후 다시 시도해주세요."}),(0,jsx_runtime.jsx)(Description,{children:"요청하신 데이터를 불러오는데 실패했습니다."})]})}ErrorMessage.displayName="ErrorMessage";try{ErrorMessage.displayName="ErrorMessage",ErrorMessage.__docgenInfo={description:"",displayName:"ErrorMessage",props:{errorHandler:{defaultValue:null,description:"",name:"errorHandler",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/ErrorMessage/index.tsx#ErrorMessage"]={docgenInfo:ErrorMessage.__docgenInfo,name:"ErrorMessage",path:"src/components/common/ErrorMessage/index.tsx#ErrorMessage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/LoadingSpinner/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LoadingSpinner});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:"10px",md:"15px",lg:"30px"},Animation=styled_components_browser_esm.F4`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function LoadingSpinner({size}){return(0,jsx_runtime.jsxs)(Container,{$size:size,"aria-label":"로딩 중입니다.",children:[(0,jsx_runtime.jsx)(Unit,{$size:size}),(0,jsx_runtime.jsx)(Unit,{$size:size}),(0,jsx_runtime.jsx)(Unit,{$size:size})]})}LoadingSpinner.displayName="LoadingSpinner";try{LoadingSpinner.displayName="LoadingSpinner",LoadingSpinner.__docgenInfo={description:"",displayName:"LoadingSpinner",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/LoadingSpinner/index.tsx#LoadingSpinner"]={docgenInfo:LoadingSpinner.__docgenInfo,name:"LoadingSpinner",path:"src/components/common/LoadingSpinner/index.tsx#LoadingSpinner"})}catch(__react_docgen_typescript_loader_error){}},"./src/pages/ErrorBoundary.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_ErrorMessage__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/ErrorMessage/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");class ErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.state={hasError:!1,errorMessage:""}}static getDerivedStateFromError(error){return{hasError:!0,errorMessage:error.message}}componentDidCatch(error,errorInfo){window.console.log(error,errorInfo)}render(){return this.state.hasError?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_common_ErrorMessage__WEBPACK_IMPORTED_MODULE_1__.Z,{}):this.props.children}}ErrorBoundary.displayName="ErrorBoundary";const __WEBPACK_DEFAULT_EXPORT__=ErrorBoundary;try{ErrorBoundary.displayName="ErrorBoundary",ErrorBoundary.__docgenInfo={description:"",displayName:"ErrorBoundary",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/ErrorBoundary.tsx#ErrorBoundary"]={docgenInfo:ErrorBoundary.__docgenInfo,name:"ErrorBoundary",path:"src/pages/ErrorBoundary.tsx#ErrorBoundary"})}catch(__react_docgen_typescript_loader_error){}},"./src/pages/Ranking/PassionUser/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PassionUserRanking});var react=__webpack_require__("./node_modules/react/index.js"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),ranking=__webpack_require__("./src/api/ranking.ts"),queryKey=__webpack_require__("./src/constants/queryKey.ts");const usePassionUserRanking=()=>{const{data,error,isLoading,isError}=(0,useQuery.a)([queryKey.l.PASSION_RANKING],ranking.R5,{suspense:!0});return{data,error,isLoading,isError}};var ErrorBoundary=__webpack_require__("./src/pages/ErrorBoundary.tsx"),LoadingSpinner=__webpack_require__("./src/components/common/LoadingSpinner/index.tsx"),first_rank=__webpack_require__("./src/assets/first-rank.svg"),second_rank=__webpack_require__("./src/assets/second-rank.svg"),third_rank=__webpack_require__("./src/assets/third-rank.svg"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Table=styled_components_browser_esm.zo.table`
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
`,LoadingSpinnerWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  padding: 0;
`;var auth=__webpack_require__("./src/hooks/context/auth.tsx");const useUserRanking=isLoggedIn=>{const{data,error,isLoading,isError}=(0,useQuery.a)([queryKey.l.USER_INFO,isLoggedIn,queryKey.l.PASSION_RANKING],(()=>(0,ranking.$s)(isLoggedIn)),{suspense:!0});return{data,error,isLoading,isError}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UserRanking(){const{loggedInfo}=(0,react.useContext)(auth.V),{isLoggedIn}=loggedInfo,{data:userRanking}=useUserRanking(isLoggedIn);return userRanking&&(0,jsx_runtime.jsxs)(Tr,{children:[(0,jsx_runtime.jsx)(Td,{children:userRanking.ranking}),(0,jsx_runtime.jsx)(Td,{children:userRanking.nickname}),(0,jsx_runtime.jsx)(Td,{children:userRanking.postCount}),(0,jsx_runtime.jsx)(Td,{children:userRanking.voteCount}),(0,jsx_runtime.jsx)(Td,{children:userRanking.score})]})}const columnNameList=["등수","닉네임","작성글 수","투표 수","점수"],rankIconUrl={1:first_rank,2:second_rank,3:third_rank};function PassionUserRanking(){const{data:rankerList}=usePassionUserRanking();return(0,jsx_runtime.jsxs)(Table,{children:[(0,jsx_runtime.jsx)(Tr,{children:columnNameList.map((text=>(0,jsx_runtime.jsx)(Th,{children:text},text)))}),rankerList&&new Array(10).fill(0).map(((_,index)=>{const ranker=rankerList[index]??{ranking:"",nickname:"",postCount:"",voteCount:"",score:""},rankIcon=rankIconUrl[ranker.ranking]&&(0,jsx_runtime.jsx)("img",{src:rankIconUrl[ranker.ranking],alt:ranker.ranking.toString()});return(0,jsx_runtime.jsxs)(Tr,{children:[(0,jsx_runtime.jsx)(RankingTd,{children:rankIcon??ranker.ranking}),(0,jsx_runtime.jsx)(Td,{children:ranker.nickname}),(0,jsx_runtime.jsx)(Td,{children:ranker.postCount}),(0,jsx_runtime.jsx)(Td,{children:ranker.voteCount}),(0,jsx_runtime.jsx)(Td,{children:ranker.score})]},ranker.ranking)})),(0,jsx_runtime.jsx)(ErrorBoundary.Z,{children:(0,jsx_runtime.jsx)(react.Suspense,{fallback:(0,jsx_runtime.jsx)(LoadingSpinnerWrapper,{children:(0,jsx_runtime.jsx)(LoadingSpinner.Z,{size:"sm"})}),children:(0,jsx_runtime.jsx)(UserRanking,{})})})]})}PassionUserRanking.displayName="PassionUserRanking"},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
//# sourceMappingURL=pages-Ranking-PassionUser-PassionUser-stories.6cee687d.iframe.bundle.js.map