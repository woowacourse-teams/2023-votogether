"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[2175],{"./src/pages/Ranking/PopularPost/PopularPost.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/pages/Ranking/PopularPost/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.Z},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <PopularPost />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/api/ranking.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$s:()=>getUserRanking,R5:()=>getPassionUserRanking,pO:()=>getPopularPostRanking});var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/fetch.ts");const getUserRanking=async isLoggedIn=>isLoggedIn?await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)("/members/me/ranking/passion"):null,getPassionUserRanking=async()=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)("/members/ranking/passion/guest"),getPopularPostRanking=async()=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)("/posts/ranking/popular/guest")},"./src/constants/path.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>BASE_PATH,m:()=>PATH});const BASE_PATH={HOME:"/",LANDING:"/landing",LOGIN:"/login",POST:"/posts",USER:"/users",ADMIN:"/admin",SEARCH:"/search",RANKING:"/ranking"},PATH={...BASE_PATH,POST_WRITE:`${BASE_PATH.POST}/write`,POST_VOTE_RESULT:`${BASE_PATH.POST}/result`,POST_CATEGORY:`${BASE_PATH.POST}/category`,USER_POST:`${BASE_PATH.USER}/posts`,USER_VOTE:`${BASE_PATH.USER}/votes`,USER_INFO:`${BASE_PATH.USER}/myPage`,USER_INFO_REGISTER:`${BASE_PATH.USER}/register`}},"./src/pages/Ranking/PopularPost/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PopularPost});var dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),ranking=__webpack_require__("./src/api/ranking.ts"),queryKey=__webpack_require__("./src/constants/queryKey.ts");const usePopularPostRanking=()=>{const{data,error,isLoading,isError}=(0,useQuery.a)([queryKey.l.POPULAR_RANKING],ranking.pO,{suspense:!0});return{data,error,isLoading,isError}};var path=__webpack_require__("./src/constants/path.ts"),first_rank=__webpack_require__("./src/assets/first-rank.svg"),second_rank=__webpack_require__("./src/assets/second-rank.svg"),third_rank=__webpack_require__("./src/assets/third-rank.svg"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Table=styled_components_browser_esm.zo.table`
  width: 100%;

  font: var(--text-caption);
  text-align: center;
`,Tr=styled_components_browser_esm.zo.tr`
  display: grid;
  grid-template-columns: 0.5fr 1fr 3fr 1fr;
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

  > a {
    display: -webkit-box;

    text-decoration-line: underline;
    text-underline-offset: 0.2em;
    text-overflow: ellipsis;
    word-break: break-word;

    overflow: hidden;

    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const rankIconUrl={1:first_rank,2:second_rank,3:third_rank},columnNameList=["등수","닉네임","글 제목","투표 수"];function PopularPost(){const{data:rankingPostList}=usePopularPostRanking();return(0,jsx_runtime.jsxs)(Table,{children:[(0,jsx_runtime.jsx)(Tr,{children:columnNameList.map((text=>(0,jsx_runtime.jsx)(Th,{children:text},text)))}),rankingPostList&&rankingPostList.map((rankingPost=>{const rankIcon=rankIconUrl[rankingPost.ranking]&&(0,jsx_runtime.jsx)("img",{src:rankIconUrl[rankingPost.ranking],alt:rankingPost.ranking.toString()});return(0,jsx_runtime.jsxs)(Tr,{children:[(0,jsx_runtime.jsx)(RankingTd,{children:rankIcon??rankingPost.ranking}),(0,jsx_runtime.jsx)(Td,{children:rankingPost.post.writer}),(0,jsx_runtime.jsx)(Td,{children:(0,jsx_runtime.jsx)(dist.rU,{to:`${path.m.POST}/${rankingPost.post.id}`,children:rankingPost.post.title})}),(0,jsx_runtime.jsx)(Td,{children:rankingPost.post.voteCount})]},rankingPost.ranking)}))]})}PopularPost.displayName="PopularPost"},"./src/assets/first-rank.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/first-rank.218349c4.svg"},"./src/assets/second-rank.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/second-rank.181f5249.svg"},"./src/assets/third-rank.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/third-rank.188589ee.svg"}}]);
//# sourceMappingURL=pages-Ranking-PopularPost-PopularPost-stories.1a0a9eb8.iframe.bundle.js.map