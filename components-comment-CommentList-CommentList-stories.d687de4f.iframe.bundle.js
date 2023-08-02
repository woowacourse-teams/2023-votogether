"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[7295],{"./src/components/comment/CommentList/CommentList.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Guest:()=>Guest,Normal:()=>Normal,Writer:()=>Writer,__namedExportsOrder:()=>__namedExportsOrder,default:()=>CommentList_stories});var comment=__webpack_require__("./src/mocks/mockData/comment.ts"),react=__webpack_require__("./node_modules/react/index.js");var SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),scrollToTop=__webpack_require__("./src/utils/scrollToTop.ts"),CommentItem=__webpack_require__("./src/components/comment/CommentList/CommentItem/index.tsx"),CommentLoginSection=__webpack_require__("./src/components/comment/CommentList/CommentLoginSection/index.tsx"),CommentTextForm=__webpack_require__("./src/components/comment/CommentList/CommentTextForm/index.tsx"),constants=__webpack_require__("./src/components/comment/CommentList/constants.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div``,TextOrLoginWrapper=styled_components_browser_esm.zo.div`
  margin-top: 30px;
  padding: 40px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`,ListContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  padding-top: 25px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`,MoreButtonWrapper=styled_components_browser_esm.zo.div`
  width: 80px;
  height: 46px;
  margin: 25px auto 0 auto;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    width: 190px;
  }
`,ButtonContainer=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: end;

  padding: 20px 0;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    padding: 50px 0;
  }
`,TopButtonWrapper=styled_components_browser_esm.zo.div`
  width: 55px;
  height: 40px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    width: 64px;
    height: 46px;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentList({commentList,memberId,isGuest,postWriterName}){const{slicedCommentList,handleMoreComment,hasMoreComment}=(commentList=>{const[page,setPage]=(0,react.useState)(1),pageSize=10*page,hasMoreComment=commentList.length>pageSize;return{slicedCommentList:commentList.slice(0,pageSize),handleMoreComment:()=>{setPage((prevPage=>prevPage+1))},hasMoreComment}})(commentList);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(TextOrLoginWrapper,{children:isGuest?(0,jsx_runtime.jsx)(CommentLoginSection.Z,{name:postWriterName}):(0,jsx_runtime.jsx)(CommentTextForm.Z,{initialComment:""})}),(0,jsx_runtime.jsx)(ListContainer,{children:slicedCommentList.map((comment=>{return(0,jsx_runtime.jsx)(CommentItem.Z,{comment,userType:(writerId=comment.member.id,isGuest?constants.GD.GUEST:writerId===memberId?constants.GD.WRITER:constants.GD.NOT_WRITER)},comment.id);var writerId}))}),hasMoreComment&&(0,jsx_runtime.jsx)(MoreButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:handleMoreComment,theme:"fill",children:"더보기"})}),(0,jsx_runtime.jsx)(ButtonContainer,{children:(0,jsx_runtime.jsx)(TopButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:scrollToTop.k,theme:"blank",children:"TOP"})})})]})}CommentList.displayName="CommentList";try{CommentList.displayName="CommentList",CommentList.__docgenInfo={description:"",displayName:"CommentList",props:{commentList:{defaultValue:null,description:"",name:"commentList",required:!0,type:{name:"Comment[]"}},memberId:{defaultValue:null,description:"",name:"memberId",required:!0,type:{name:"number"}},isGuest:{defaultValue:null,description:"",name:"isGuest",required:!0,type:{name:"boolean"}},postWriterName:{defaultValue:null,description:"",name:"postWriterName",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentList/index.tsx#CommentList"]={docgenInfo:CommentList.__docgenInfo,name:"CommentList",path:"src/components/comment/CommentList/index.tsx#CommentList"})}catch(__react_docgen_typescript_loader_error){}const CommentList_stories={component:CommentList},Guest={render:()=>(0,jsx_runtime.jsx)(CommentList,{commentList:comment.I,memberId:0,isGuest:!0,postWriterName:"닉네임"})},Writer={render:()=>(0,jsx_runtime.jsx)(CommentList,{commentList:comment.I,memberId:comment.I[0].member.id,isGuest:!1,postWriterName:"닉네임"})},Normal={render:()=>(0,jsx_runtime.jsx)(CommentList,{commentList:comment.I,memberId:0,isGuest:!1,postWriterName:"닉네임"})};Guest.parameters={...Guest.parameters,docs:{...Guest.parameters?.docs,source:{originalSource:'{\n  render: () => <CommentList commentList={MOCK_TRANSFORMED_COMMENT_LIST} memberId={0} isGuest={true} postWriterName="닉네임" />\n}',...Guest.parameters?.docs?.source}}},Writer.parameters={...Writer.parameters,docs:{...Writer.parameters?.docs,source:{originalSource:'{\n  render: () => <CommentList commentList={MOCK_TRANSFORMED_COMMENT_LIST} memberId={MOCK_TRANSFORMED_COMMENT_LIST[0].member.id} isGuest={false} postWriterName="닉네임" />\n}',...Writer.parameters?.docs?.source}}},Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:'{\n  render: () => <CommentList commentList={MOCK_TRANSFORMED_COMMENT_LIST} memberId={0} isGuest={false} postWriterName="닉네임" />\n}',...Normal.parameters?.docs?.source}}};const __namedExportsOrder=["Guest","Writer","Normal"]},"./src/components/comment/CommentList/CommentLoginSection/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentLoginSectionSection});var path=__webpack_require__("./src/constants/path.ts");const kakao_login_large_namespaceObject=__webpack_require__.p+"static/media/kakao_login_large.0a33a8d0.svg";var dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.section`
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    padding: 0 20px;

    font-size: 2.4rem;
  }
`,Title=styled_components_browser_esm.zo.span`
  font-size: 2.2rem;
  font-weight: 600;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font-size: 2.4rem;
  }
`,SubTitle=styled_components_browser_esm.zo.span`
  margin-top: 10px;

  font: var(--text-caption);
  font-weight: 400;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`,LoginLink=(0,styled_components_browser_esm.zo)(dist.rU)`
  display: flex;
  justify-content: center;

  margin-top: 40px;
`,Image=styled_components_browser_esm.zo.img`
  width: 300px;
  height: 45px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentLoginSectionSection({name}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Title,{children:"대화에 참여하려면 회원가입"}),(0,jsx_runtime.jsxs)(SubTitle,{children:["로그인하여 ",name,"님의 고민에 대해 피드백을 제공해 보세요"]}),(0,jsx_runtime.jsx)(LoginLink,{to:path.m.LOGIN,children:(0,jsx_runtime.jsx)(Image,{src:kakao_login_large_namespaceObject,alt:"로그인 페이지로"})})]})}CommentLoginSectionSection.displayName="CommentLoginSectionSection";try{CommentLoginSection.displayName="CommentLoginSection",CommentLoginSection.__docgenInfo={description:"",displayName:"CommentLoginSection",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentList/CommentLoginSection/index.tsx#CommentLoginSection"]={docgenInfo:CommentLoginSection.__docgenInfo,name:"CommentLoginSection",path:"src/components/comment/CommentList/CommentLoginSection/index.tsx#CommentLoginSection"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/path.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>BASE_PATH,m:()=>PATH});const BASE_PATH={HOME:"/",LANDING:"/landing",LOGIN:"/login",POST:"/posts",USER:"/users",ADMIN:"/admin",SEARCH:"/search"},PATH={...BASE_PATH,POST_WRITE:`${BASE_PATH.POST}/write`,POST_VOTE_RESULT:`${BASE_PATH.POST}/result`,POST_CATEGORY:`${BASE_PATH.POST}/category`,USER_POST:`${BASE_PATH.USER}/posts`,USER_VOTE:`${BASE_PATH.USER}/votes`,USER_INFO:`${BASE_PATH.USER}/myPage`}},"./src/utils/scrollToTop.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>scrollToTop});const scrollToTop=()=>{window.scroll({top:0,behavior:"smooth"})}}}]);
//# sourceMappingURL=components-comment-CommentList-CommentList-stories.d687de4f.iframe.bundle.js.map