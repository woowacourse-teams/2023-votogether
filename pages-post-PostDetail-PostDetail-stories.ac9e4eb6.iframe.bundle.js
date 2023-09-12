"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[8927],{"./src/pages/post/PostDetail/PostDetail.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WriterCase:()=>WriterCase,__namedExportsOrder:()=>__namedExportsOrder,default:()=>PostDetail_stories});var react=__webpack_require__("./node_modules/react/index.js"),ErrorBoundaryWithNarrowHeader=__webpack_require__("./src/pages/ErrorBoundaryWithNarrowHeader.tsx"),Layout=__webpack_require__("./src/components/common/Layout/index.tsx"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),post=__webpack_require__("./src/api/post.ts"),queryKey=__webpack_require__("./src/constants/queryKey.ts");const useDeletePost=(postId,isLogged)=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isSuccess,isError,error}=(0,useMutation.D)({mutationFn:()=>(0,post.fR)(postId),onSuccess:()=>{queryClient.invalidateQueries([queryKey.l.USER_INFO,isLogged])},onError:error=>{window.console.log("게시물 삭제에 실패했습니다.",error)}});return{mutate,isSuccess,isError,error}},useEarlyClosePost=postId=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isError,error}=(0,useMutation.D)({mutationFn:()=>(0,post.yx)(postId),onSuccess:()=>{queryClient.invalidateQueries([queryKey.l.POST_DETAIL,postId,true])},onError:error=>{window.console.log("조기마감에 실패했습니다.",error)}});return{mutate,isError,error}};var usePostDetail=__webpack_require__("./src/hooks/query/post/usePostDetail.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),report=__webpack_require__("./src/api/report.ts"),ErrorBoundary=__webpack_require__("./src/pages/ErrorBoundary.tsx"),CommentList=__webpack_require__("./src/components/comment/CommentList/index.tsx"),NarrowTemplateHeader=__webpack_require__("./src/components/common/NarrowTemplateHeader/index.tsx"),Post=__webpack_require__("./src/components/common/Post/index.tsx"),Skeleton=__webpack_require__("./src/components/common/Skeleton/index.tsx"),Toast=__webpack_require__("./src/components/common/Toast/index.tsx"),time=__webpack_require__("./src/utils/time.ts"),BottomButtonPart=__webpack_require__("./src/pages/post/PostDetail/BottomButtonPart/index.tsx"),InnerHeaderPart=__webpack_require__("./src/pages/post/PostDetail/InnerHeaderPart/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const HeaderContainer=styled_components_browser_esm.zo.header`
  position: fixed;
  width: 100%;
  top: 0;

  z-index: ${theme.r.zIndex.header};

  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: none;
  }
`,MainContainer=styled_components_browser_esm.zo.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 70px 10px 20px 10px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    margin-top: 30px;
  }
`,BottomContainer=styled_components_browser_esm.zo.div`
  margin: 10px;
  margin-bottom: 30px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function PostDetail(){const navigate=(0,dist.s0)(),params=(0,dist.UO)(),postId=Number(params.postId),{isToastOpen,openToast,toastMessage}=(0,useToast.p)(),{loggedInfo}=(0,react.useContext)(auth.V),memberId=loggedInfo.id,{data:postData}=(0,usePostDetail.S)(loggedInfo.isLoggedIn,postId),{mutate:deletePost,isSuccess:isDeleteSuccess,isError:isDeleteError,error:deleteError}=useDeletePost(postId,loggedInfo.isLoggedIn),{mutate:earlyClosePost}=useEarlyClosePost(postId),postDataFallback=postData??{},isWriter=postDataFallback.writer.id===memberId,isClosed=(0,time.gr)(postDataFallback.deadline),movePage={moveWritePostPage:()=>{postDataFallback.voteInfo.allPeopleCount?openToast("투표한 사용자가 있어 글 수정이 불가합니다."):navigate(`/posts/write/${postId}`)},moveVoteStatisticsPage:()=>{navigate(`/posts/result/${postId}`)},movePostListPage:()=>{navigate("/")}},controlPost={setEarlyClosePost:earlyClosePost,deletePost:()=>{postDataFallback.voteInfo.allPeopleCount>=20?openToast("20인 이상 투표한 게시물은 삭제할 수 없습니다."):deletePost()},reportPost:async reason=>{const reportData={type:"POST",id:postId,reason};await(0,report.K)(reportData).then((res=>{openToast("게시물을 신고했습니다.")})).catch((e=>{if(e instanceof Error){const errorResposne=JSON.parse(e.message);openToast(errorResposne.message)}else openToast("게시글 신고가 실패했습니다.")}))},reportNickname:async reason=>{const reportData={type:"NICKNAME",id:postDataFallback.writer.id,reason};await(0,report.K)(reportData).then((res=>{openToast("작성자 닉네임을 신고했습니다.")})).catch((e=>{if(e instanceof Error){const errorResposne=JSON.parse(e.message);openToast(errorResposne.message)}else openToast("작성자 닉네임 신고가 실패했습니다.")}))}};return(0,react.useEffect)((()=>{isDeleteError&&deleteError instanceof Error&&openToast(deleteError.message)}),[isDeleteError,deleteError]),(0,react.useEffect)((()=>{isDeleteSuccess&&navigate("/")}),[isDeleteSuccess,navigate]),(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(HeaderContainer,{children:(0,jsx_runtime.jsx)(NarrowTemplateHeader.Z,{children:(0,jsx_runtime.jsx)(InnerHeaderPart.Z,{isClosed,isWriter,handleEvent:{movePage,controlPost}})})}),(0,jsx_runtime.jsxs)(MainContainer,{children:[(0,jsx_runtime.jsx)(Post.Z,{postInfo:postDataFallback,isPreview:!1}),(0,jsx_runtime.jsx)(BottomButtonPart.Z,{isClosed,isWriter,handleEvent:{movePage,controlPost,openToast}})]}),(0,jsx_runtime.jsx)(BottomContainer,{children:(0,jsx_runtime.jsx)(ErrorBoundary.Z,{children:(0,jsx_runtime.jsx)(react.Suspense,{fallback:(0,jsx_runtime.jsx)(Skeleton.Z,{isLarge:!1}),children:(0,jsx_runtime.jsx)(CommentList.Z,{postId,postWriterName:postDataFallback.writer.nickname})})})}),isToastOpen&&(0,jsx_runtime.jsx)(Toast.Z,{size:"md",position:"bottom",children:toastMessage})]})}var IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx");const Container=styled_components_browser_esm.zo.div`
  margin-top: 70px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    margin-top: 30px;
  }
`,style_HeaderContainer=styled_components_browser_esm.zo.div`
  position: fixed;
  width: 100%;
  top: 0;

  z-index: ${theme.r.zIndex.header};

  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: none;
  }
`,SkeletonWrapper=styled_components_browser_esm.zo.div`
  padding: 0 10px;
`;function PostDetailFallback(){const navigate=(0,dist.s0)();return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(style_HeaderContainer,{children:(0,jsx_runtime.jsx)(NarrowTemplateHeader.Z,{children:(0,jsx_runtime.jsx)(IconButton.Z,{category:"back",onClick:()=>{navigate(-1)}})})}),(0,jsx_runtime.jsx)(SkeletonWrapper,{children:(0,jsx_runtime.jsx)(Skeleton.Z,{isLarge:!0})})]})}function PostDetailPage(){return(0,jsx_runtime.jsx)(Layout.Z,{isSidebarVisible:!0,children:(0,jsx_runtime.jsx)(ErrorBoundaryWithNarrowHeader.Z,{children:(0,jsx_runtime.jsx)(react.Suspense,{fallback:(0,jsx_runtime.jsx)(PostDetailFallback,{}),children:(0,jsx_runtime.jsx)(PostDetail,{})})})})}PostDetailFallback.displayName="PostDetailFallback",PostDetailPage.displayName="PostDetailPage";const PostDetail_stories={component:PostDetailPage},WriterCase={render:()=>(0,jsx_runtime.jsx)(PostDetailPage,{})};WriterCase.parameters={...WriterCase.parameters,docs:{...WriterCase.parameters?.docs,source:{originalSource:"{\n  render: () => <PostDetailPage />\n}",...WriterCase.parameters?.docs?.source}}};const __namedExportsOrder=["WriterCase"]},"./src/components/comment/CommentList/CommentLoginSection/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentLoginSectionSection});var path=__webpack_require__("./src/constants/path.ts");const kakao_login_large_namespaceObject=__webpack_require__.p+"static/media/kakao_login_large.0a33a8d0.svg";var dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.section`
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
`,SubTitle=styled_components_browser_esm.zo.p`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CommentLoginSectionSection({name}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Title,{children:"대화에 참여하려면 회원가입"}),(0,jsx_runtime.jsxs)(SubTitle,{children:["로그인하여 ",name,"님의 이야기에 대해 피드백을 제공해 보세요"]}),(0,jsx_runtime.jsx)(LoginLink,{to:path.m.LOGIN,"aria-label":"카카오 로그인 페이지로 이동",children:(0,jsx_runtime.jsx)(Image,{src:kakao_login_large_namespaceObject,alt:"로그인 페이지로"})})]})}CommentLoginSectionSection.displayName="CommentLoginSectionSection";try{CommentLoginSection.displayName="CommentLoginSection",CommentLoginSection.__docgenInfo={description:"",displayName:"CommentLoginSection",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentList/CommentLoginSection/index.tsx#CommentLoginSection"]={docgenInfo:CommentLoginSection.__docgenInfo,name:"CommentLoginSection",path:"src/components/comment/CommentList/CommentLoginSection/index.tsx#CommentLoginSection"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/comment/CommentList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CommentList});var react=__webpack_require__("./node_modules/react/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),comment=__webpack_require__("./src/api/comment.ts"),queryKey=__webpack_require__("./src/constants/queryKey.ts");const useCommentList=postId=>{const{data,error,isLoading}=(0,useQuery.a)([queryKey.l.POSTS,postId,queryKey.l.COMMENTS],(()=>(0,comment.Rw)(postId)),{suspense:!0});return{data,error,isLoading}},useMoreComment=commentList=>{const[page,setPage]=(0,react.useState)(1),pageSize=10*page,hasMoreComment=commentList.length>pageSize;return{slicedCommentList:commentList.slice(0,pageSize),handleMoreComment:()=>{setPage((prevPage=>prevPage+1))},hasMoreComment}};var SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),scrollToTop=__webpack_require__("./src/utils/scrollToTop.ts"),CommentItem=__webpack_require__("./src/components/comment/CommentList/CommentItem/index.tsx"),CommentLoginSection=__webpack_require__("./src/components/comment/CommentList/CommentLoginSection/index.tsx"),CommentTextForm=__webpack_require__("./src/components/comment/CommentList/CommentTextForm/index.tsx"),constants=__webpack_require__("./src/components/comment/CommentList/constants.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div``,TextOrLoginWrapper=styled_components_browser_esm.zo.div`
  margin-top: 30px;
  padding: 40px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`,ListContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  padding-top: 25px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);

  position: relative;
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
`,HiddenInput=styled_components_browser_esm.zo.input`
  position: absolute;
  bottom: 0;

  color: white;
  z-index: -1;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const initialComment={id:-1,member:{id:-1,nickname:""},content:"",createdAt:"",isEdit:!1};function CommentList({postId,postWriterName}){const inputRef=(0,react.useRef)(null),{data:commentList}=useCommentList(postId),{loggedInfo}=(0,react.useContext)(auth.V),{isLoggedIn,id:memberId}=loggedInfo,isGuest=!isLoggedIn,{slicedCommentList,handleMoreComment,hasMoreComment}=useMoreComment(commentList??[]),getUserType=writerId=>isGuest?constants.GD.GUEST:writerId===memberId?constants.GD.WRITER:constants.GD.NOT_WRITER;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(TextOrLoginWrapper,{children:isGuest?(0,jsx_runtime.jsx)(CommentLoginSection.Z,{name:postWriterName}):(0,jsx_runtime.jsx)(CommentTextForm.Z,{commentId:-1,initialComment})}),(0,jsx_runtime.jsx)(ListContainer,{children:slicedCommentList.map(((comment,index)=>index%10==9?(0,jsx_runtime.jsxs)(react.Fragment,{children:[(0,jsx_runtime.jsx)(CommentItem.Z,{comment,userType:getUserType(comment.member.id)}),(0,jsx_runtime.jsx)(HiddenInput,{ref:inputRef,maxLength:0,"aria-label":`${index+1}번째 댓글입니다`,role:"contentinfo",inputMode:"none"})]},comment.id):(0,jsx_runtime.jsx)(CommentItem.Z,{comment,userType:getUserType(comment.member.id)},comment.id)))}),hasMoreComment&&(0,jsx_runtime.jsx)(MoreButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:()=>{inputRef.current&&(handleMoreComment(),inputRef.current.focus(),inputRef.current.ariaLabel="더보기 버튼을 눌러 댓글이 추가되었습니다")},theme:"fill","aria-label":"댓글 더보기",children:"더보기"})}),(0,jsx_runtime.jsx)(ButtonContainer,{children:(0,jsx_runtime.jsx)(TopButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:scrollToTop.n,theme:"blank",children:"TOP"})})})]})}CommentList.displayName="CommentList";try{CommentList.displayName="CommentList",CommentList.__docgenInfo={description:"",displayName:"CommentList",props:{postId:{defaultValue:null,description:"",name:"postId",required:!0,type:{name:"number"}},postWriterName:{defaultValue:null,description:"",name:"postWriterName",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/comment/CommentList/index.tsx#CommentList"]={docgenInfo:CommentList.__docgenInfo,name:"CommentList",path:"src/components/comment/CommentList/index.tsx#CommentList"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/HeaderTextButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>HeaderTextButton});const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  background-color: rgba(0, 0, 0, 0);
  color: var(--white);

  font: var(--text-caption);
  font-weight: 500;

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function HeaderTextButton({children,...rest}){return(0,jsx_runtime.jsx)(Button,{...rest,children})}HeaderTextButton.displayName="HeaderTextButton";try{HeaderTextButton.displayName="HeaderTextButton",HeaderTextButton.__docgenInfo={description:"",displayName:"HeaderTextButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/HeaderTextButton/index.tsx#HeaderTextButton"]={docgenInfo:HeaderTextButton.__docgenInfo,name:"HeaderTextButton",path:"src/components/common/HeaderTextButton/index.tsx#HeaderTextButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/IconButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>IconButton});const back_namespaceObject=__webpack_require__.p+"static/media/back.0d0cf282.svg",category_namespaceObject=__webpack_require__.p+"static/media/category.5dbd06d6.svg",ranking_namespaceObject=__webpack_require__.p+"static/media/ranking.bc2e65d6.svg",retry_namespaceObject=__webpack_require__.p+"static/media/retry.d97418a2.svg",search_white_namespaceObject=__webpack_require__.p+"static/media/search_white.74caf850.svg",user_namespaceObject=__webpack_require__.p+"static/media/user.87af8a44.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function NarrowTemplateHeader({children}){return(0,jsx_runtime.jsx)(Container,{children})}NarrowTemplateHeader.displayName="NarrowTemplateHeader";try{NarrowTemplateHeader.displayName="NarrowTemplateHeader",NarrowTemplateHeader.__docgenInfo={description:"",displayName:"NarrowTemplateHeader",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"]={docgenInfo:NarrowTemplateHeader.__docgenInfo,name:"NarrowTemplateHeader",path:"src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Post/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Post});var react=__webpack_require__("./node_modules/react/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),post=__webpack_require__("./src/api/post.ts"),constants_queryKey=__webpack_require__("./src/constants/queryKey.ts");const useCreateVote=({isPreview,postId})=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isError,error}=(0,useMutation.D)({mutationFn:optionId=>(0,post.Gi)(postId,optionId),onSuccess:()=>{queryClient.invalidateQueries([constants_queryKey.l.USER_INFO,!0]),isPreview?queryClient.invalidateQueries({predicate:({queryKey})=>queryKey[0]===constants_queryKey.l.POSTS}):queryClient.invalidateQueries([constants_queryKey.l.POST_DETAIL,postId,true])},onError:error=>{window.console.log("투표 선택지 생성에 실패했습니다.",error)}});return{mutate,isError,error}},useEditVote=({isPreview,postId})=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isError,error}=(0,useMutation.D)({mutationFn:optionData=>(0,post.hQ)(postId,optionData),onSuccess:()=>{isPreview?queryClient.invalidateQueries({predicate:({queryKey})=>queryKey[0]===constants_queryKey.l.POSTS}):queryClient.invalidateQueries([constants_queryKey.l.POST_DETAIL,postId,true])},onError:error=>{window.console.log("투표 선택지 생성에 실패했습니다.",error)}});return{mutate,isError,error}};var useToast=__webpack_require__("./src/hooks/useToast.ts"),WrittenVoteOptionList=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/index.tsx"),path=__webpack_require__("./src/constants/path.ts");const POST={NOT_VOTE:0};var convertImageUrlToServerUrl=__webpack_require__("./src/utils/post/convertImageUrlToServerUrl.ts"),time=__webpack_require__("./src/utils/time.ts"),photo_white=__webpack_require__("./src/assets/photo_white.svg"),Toast=__webpack_require__("./src/components/common/Toast/index.tsx"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.li`
  width: 100%;

  position: relative;

  font: var(--text-small);
  letter-spacing: 0.5px;
  line-height: 1.5;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-caption);
  }
`,Category=styled_components_browser_esm.zo.span`
  font: var(--text-small);

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-caption);
  }
`,ImageIconWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 15px;
  height: 15px;
  border-radius: 50%;

  position: absolute;
  right: 25px;
  top: 0;

  background-color: var(--header);
`,ImageIcon=styled_components_browser_esm.zo.img`
  width: 13px;
  height: 13px;
`,ActivateState=styled_components_browser_esm.zo.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;

  position: absolute;
  right: 0;
  top: 0;

  background-color: ${({$isActive})=>$isActive?"var(--active-post)":"var(--dark-gray)"};
`,Title=styled_components_browser_esm.zo.p`
  display: -webkit-box;

  font: var(--text-title);
  text-overflow: ellipsis;
  word-break: break-word;

  overflow: hidden;

  -webkit-line-clamp: ${props=>props.$isPreview&&"2"};
  -webkit-box-orient: vertical;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font-size: 2.2rem;
  }
`,Wrapper=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font: var(--text-small);

  & > :nth-child(2) {
    margin-left: 10px;
  }

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-caption);
  }
`,Content=styled_components_browser_esm.zo.p`
  display: -webkit-box;

  margin: 10px 0;

  font: var(--text-caption);
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: pre-wrap;

  overflow: hidden;

  -webkit-line-clamp: ${props=>props.$isPreview&&"10"};
  -webkit-box-orient: vertical;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`,DetailLink=(0,styled_components_browser_esm.zo)(dist.rU)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  pointer-events: ${({$isPreview})=>!$isPreview&&"none"};
`,Image=styled_components_browser_esm.zo.img`
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;

  aspect-ratio: 1/1;
  object-fit: cover;

  @media (min-width: ${theme.r.breakpoint.md}) {
    margin-bottom: 20px;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Post({postInfo,isPreview}){const{postId,category,imageUrl,title,writer,createTime,deadline,content,voteInfo}=postInfo,{loggedInfo}=(0,react.useContext)(auth.V),{isToastOpen,openToast,toastMessage}=(0,useToast.p)(),{mutate:createVote,isError:isCreateError,error:createError}=useCreateVote({isPreview,postId}),{mutate:editVote,isError:isEditError,error:editError}=useEditVote({isPreview,postId}),isActive=!(0,time.gr)(deadline),isStatisticsVisible=writer.id===loggedInfo.id||!isActive||voteInfo.selectedOptionId!==POST.NOT_VOTE;(0,react.useEffect)((()=>{isCreateError&&createError instanceof Error&&openToast(createError.message)}),[isCreateError,createError]),(0,react.useEffect)((()=>{isEditError&&editError instanceof Error&&openToast(editError.message)}),[isEditError,editError]);const isPreviewTabIndex=isPreview?void 0:0;return(0,jsx_runtime.jsxs)(Container,{as:isPreview?"li":"div",children:[(0,jsx_runtime.jsxs)(DetailLink,{as:isPreview?"":"main",to:isPreview?`${path.m.POST}/${postId}`:"#",$isPreview:isPreview,onClick:e=>{isPreview||e.preventDefault()},"aria-describedby":isPreview?"해당 게시물의 상세페이지로 이동하기":"현재 상세페이지이므로 사용할 수 없습니다.",children:[(0,jsx_runtime.jsx)(Category,{tabIndex:isPreviewTabIndex,"aria-label":`카테고리 ${category.map((category=>category.name)).join("|")}`,children:category.map((category=>category.name)).join(" | ")}),isPreview&&(""!==imageUrl||voteInfo.options.map((option=>option.imageUrl)).some((url=>""!==url)))&&(0,jsx_runtime.jsx)(ImageIconWrapper,{children:(0,jsx_runtime.jsx)(ImageIcon,{src:photo_white,alt:"해당 게시물은 사진을 포함하고 있습니다."})}),(0,jsx_runtime.jsx)(ActivateState,{tabIndex:isPreviewTabIndex,role:"status","aria-label":"게시글 "+(isActive?"진행중":"마감완료"),$isActive:isActive}),(0,jsx_runtime.jsx)(Title,{tabIndex:isPreviewTabIndex,"aria-label":`게시글 제목: ${title}`,$isPreview:isPreview,children:title}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)("span",{"aria-label":`작성자 ${writer.nickname}`,tabIndex:isPreviewTabIndex,children:writer.nickname}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)("span",{"aria-label":`작성일시 ${(0,time.Ox)(createTime)}`,tabIndex:isPreviewTabIndex,children:(0,time.Ox)(createTime)}),(0,jsx_runtime.jsx)("span",{"aria-label":`투표 마감일시 ${isActive?(0,time.Ox)(deadline):"마감 완료"}`,tabIndex:isPreviewTabIndex,children:isActive?(0,time.Ox)(deadline):"마감 완료"})]})]}),(0,jsx_runtime.jsx)(Content,{tabIndex:isPreviewTabIndex,"aria-label":`내용: ${content}`,$isPreview:isPreview,children:content}),!isPreview&&imageUrl&&(0,jsx_runtime.jsx)(Image,{src:(0,convertImageUrlToServerUrl.B)(imageUrl),alt:"본문에 포함된 이미지"})]}),(0,jsx_runtime.jsx)(WrittenVoteOptionList.Z,{isStatisticsVisible,selectedOptionId:voteInfo.selectedOptionId,handleVoteClick:newOptionId=>{loggedInfo.isLoggedIn?isActive?writer.nickname!==loggedInfo.userInfo?.nickname?voteInfo.selectedOptionId!==newOptionId&&(voteInfo.selectedOptionId!==POST.NOT_VOTE?editVote({originOptionId:voteInfo.selectedOptionId,newOptionId}):createVote(newOptionId)):openToast("내가 쓴 글에는 투표를 할 수 없습니다."):openToast("마감된 게시글에는 투표를 할 수 없습니다."):openToast("투표는 로그인 후에 이용하실 수 있습니다.")},isPreview,voteOptionList:voteInfo.options}),isToastOpen&&(0,jsx_runtime.jsx)(Toast.Z,{size:"md",position:"bottom",children:toastMessage})]})}Post.displayName="Post";try{Post.displayName="Post",Post.__docgenInfo={description:"",displayName:"Post",props:{postInfo:{defaultValue:null,description:"",name:"postInfo",required:!0,type:{name:"PostInfo"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Post/index.tsx#Post"]={docgenInfo:Post.__docgenInfo,name:"Post",path:"src/components/common/Post/index.tsx#Post"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/PostMenu/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PostMenu});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const COLOR_PALETTE={red:"var(--primary-color)",black:"#727171"},Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: max-content;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 6px;

  background-color: var(--white);

  font: var(--text-caption);
`,Menu=styled_components_browser_esm.zo.button`
  padding: 10px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);

  color: ${({$color})=>COLOR_PALETTE[$color]};
  background-color: white;

  cursor: pointer;

  &:hover {
    background-color: var(--gray);
  }

  &:first-child {
    border-radius: 6px 6px 0 0;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
    border-bottom: none;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function PostMenu({menuList,handleMenuClick}){return(0,jsx_runtime.jsx)(Container,{children:menuList.map((({content,color,action})=>(0,jsx_runtime.jsx)(Menu,{type:"button",$color:color,onClick:event=>{event.stopPropagation(),handleMenuClick(action)},children:content},content)))})}PostMenu.displayName="PostMenu";try{PostMenu.displayName="PostMenu",PostMenu.__docgenInfo={description:"",displayName:"PostMenu",props:{menuList:{defaultValue:null,description:"",name:"menuList",required:!0,type:{name:"PostMenuItem[]"}},handleMenuClick:{defaultValue:null,description:"",name:"handleMenuClick",required:!0,type:{name:"(menu: PostAction) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/PostMenu/index.tsx#PostMenu"]={docgenInfo:PostMenu.__docgenInfo,name:"PostMenu",path:"src/components/common/PostMenu/index.tsx#PostMenu"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SearchBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SearchBar});var useCurrentKeyword=__webpack_require__("./src/hooks/useCurrentKeyword.ts"),react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),post=__webpack_require__("./src/constants/post.ts"),getTrimmedWord=__webpack_require__("./src/utils/getTrimmedWord.ts"),useText=__webpack_require__("./src/hooks/useText.ts");const useSearch=(initialKeyword="")=>{const navigate=(0,dist.s0)(),searchInputRef=(0,react.useRef)(null),{text:keyword,setText:setKeyword,handleTextChange}=(0,useText.X)(initialKeyword);return{keyword,handleKeywordChange:event=>{searchInputRef.current&&handleTextChange(event,{MAX_LENGTH:post.ko,MIN_LENGTH:0})},handleSearchSubmit:event=>{if(event.preventDefault(),!searchInputRef.current)return;const trimmedKeyword=(0,getTrimmedWord.s)(keyword);if(keyword!==trimmedKeyword&&setKeyword(trimmedKeyword),""===trimmedKeyword)return searchInputRef.current.setCustomValidity("검색어를 입력해주세요"),void searchInputRef.current.reportValidity();navigate(`/search?keyword=${trimmedKeyword}`)},searchInputRef}};var path=__webpack_require__("./src/constants/path.ts");const search_black_namespaceObject=__webpack_require__.p+"static/media/search_black.af78e45d.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const formSize={sm:"170px",md:"250px",lg:"400px"},Form=styled_components_browser_esm.zo.form`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SearchBar({size,isOpen,...rest}){const{currentKeyword}=(0,useCurrentKeyword.H)(),{keyword,handleKeywordChange,handleSearchSubmit,searchInputRef}=useSearch(currentKeyword);return(0,jsx_runtime.jsxs)(Form,{size,action:path.m.SEARCH,onSubmit:handleSearchSubmit,children:[(0,jsx_runtime.jsx)(Input,{ref:searchInputRef,maxLength:post.ko+1,"aria-label":"게시글 제목 및 내용 검색창",type:"search",value:keyword,onChange:handleKeywordChange,autoComplete:"off",name:post.Kn,...rest}),(0,jsx_runtime.jsx)(Button,{type:"submit",children:(0,jsx_runtime.jsx)("img",{src:search_black_namespaceObject,alt:"검색버튼"})}),isOpen&&(0,jsx_runtime.jsx)(ScreenReaderDirection,{"aria-live":"polite",children:"검색창을 닫으려면 검색창 외부를 클릭해주세요."})]})}SearchBar.displayName="SearchBar";try{SearchBar.displayName="SearchBar",SearchBar.__docgenInfo={description:"",displayName:"SearchBar",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SearchBar/index.tsx#SearchBar"]={docgenInfo:SearchBar.__docgenInfo,name:"SearchBar",path:"src/components/common/SearchBar/index.tsx#SearchBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/TagButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TagButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:{width:"80px",height:"40px",fontSize:"14px"},md:{width:"100px",height:"50px",fontSize:"20px"},lg:{width:"120px",height:"60px",fontSize:"24px"}},Button=styled_components_browser_esm.zo.button`
  display: block;

  width: ${props=>SIZE[props.$size].width};
  height: ${props=>SIZE[props.$size].height};
  border-radius: 0 0 5px 5px;

  background-color: var(--primary-color);
  color: var(--white);

  font-size: ${props=>SIZE[props.$size].fontSize};

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TagButton({size,...rest}){return(0,jsx_runtime.jsx)(Button,{$size:size,...rest,children:rest.children})}TagButton.displayName="TagButton";try{TagButton.displayName="TagButton",TagButton.__docgenInfo={description:"",displayName:"TagButton",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/TagButton/index.tsx#TagButton"]={docgenInfo:TagButton.__docgenInfo,name:"TagButton",path:"src/components/common/TagButton/index.tsx#TagButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/WideHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WideHeader});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),path=__webpack_require__("./src/constants/path.ts"),IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),LogoButton=__webpack_require__("./src/components/common/LogoButton/index.tsx"),SearchBar=__webpack_require__("./src/components/common/SearchBar/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOption({handleVoteClick,text,isStatisticsVisible,peopleCount,percent,isSelected,isPreview,imageUrl,ariaLabel}){return(0,jsx_runtime.jsxs)(Container,{"aria-live":isSelected?"polite":"off","aria-label":ariaLabel,$isSelected:isSelected,onClick:handleVoteClick,children:[!isPreview&&imageUrl&&(0,jsx_runtime.jsx)(Image,{src:(0,convertImageUrlToServerUrl.B)(imageUrl),alt:"선택지에 포함된 이미지"}),isPreview?(0,jsx_runtime.jsx)(PreviewContent,{children:text}):(0,jsx_runtime.jsx)(DetailContent,{children:text}),isStatisticsVisible&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(ProgressContainer,{children:(0,jsx_runtime.jsx)(ProgressBar.Z,{percent,isSelected})}),(0,jsx_runtime.jsxs)(TextContainer,{children:[(0,jsx_runtime.jsxs)(PeopleText,{"aria-hidden":"true",children:[peopleCount,"명"]}),(0,jsx_runtime.jsxs)(PercentText,{"aria-hidden":"true",children:["(",percent.toFixed(1),"%)"]})]})]})]})}WrittenVoteOption.displayName="WrittenVoteOption";try{WrittenVoteOption.displayName="WrittenVoteOption",WrittenVoteOption.__docgenInfo={description:"",displayName:"WrittenVoteOption",props:{handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"() => void"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},isStatisticsVisible:{defaultValue:null,description:"",name:"isStatisticsVisible",required:!0,type:{name:"boolean"}},peopleCount:{defaultValue:null,description:"",name:"peopleCount",required:!0,type:{name:"number"}},percent:{defaultValue:null,description:"",name:"percent",required:!0,type:{name:"number"}},isSelected:{defaultValue:null,description:"",name:"isSelected",required:!0,type:{name:"boolean"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},imageUrl:{defaultValue:null,description:"",name:"imageUrl",required:!0,type:{name:"string"}},ariaLabel:{defaultValue:null,description:"",name:"ariaLabel",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"]={docgenInfo:WrittenVoteOption.__docgenInfo,name:"WrittenVoteOption",path:"src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WrittenVoteOptionList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WrittenVoteOptionList});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const VoteOptionListContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  @media (min-width: ${theme.r.breakpoint.md}) {
    gap: 18px;
  }
`;var WrittenVoteOption=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOptionList({isPreview,isStatisticsVisible,voteOptionList,selectedOptionId,handleVoteClick}){return(0,jsx_runtime.jsx)(VoteOptionListContainer,{"aria-label":"투표 선택지",children:voteOptionList.map(((voteOption,index)=>{const isSelected=selectedOptionId===voteOption.id;return(0,jsx_runtime.jsx)(WrittenVoteOption.Z,{ariaLabel:`선택지 내용: ${voteOption.text}, 선택지 순서: ${index+1}번 , \n            ${isStatisticsVisible?`투표한 인원: ${voteOption.peopleCount}명, 전체 투표 중 차지 비율: ${voteOption.percent}%, `:""}\n            ${isSelected?"투표 완료한 선택지 상태":"투표하지 않은 선택지 상태"}\n            `,...voteOption,isPreview,isStatisticsVisible,isSelected,handleVoteClick:()=>handleVoteClick(voteOption.id)},voteOption.id)}))})}WrittenVoteOptionList.displayName="WrittenVoteOptionList";try{WrittenVoteOptionList.displayName="WrittenVoteOptionList",WrittenVoteOptionList.__docgenInfo={description:"",displayName:"WrittenVoteOptionList",props:{isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},isStatisticsVisible:{defaultValue:null,description:"",name:"isStatisticsVisible",required:!0,type:{name:"boolean"}},selectedOptionId:{defaultValue:null,description:"",name:"selectedOptionId",required:!0,type:{name:"number"}},voteOptionList:{defaultValue:null,description:"",name:"voteOptionList",required:!0,type:{name:"WrittenVoteOptionType[]"}},handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"(newOptionId: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/index.tsx#WrittenVoteOptionList"]={docgenInfo:WrittenVoteOptionList.__docgenInfo,name:"WrittenVoteOptionList",path:"src/components/optionList/WrittenVoteOptionList/index.tsx#WrittenVoteOptionList"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/query/post/usePostDetail.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>usePostDetail});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),_api_post__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/api/post.ts"),_constants_queryKey__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/queryKey.ts");const usePostDetail=(isLoggedIn,postId)=>{const fetchApi=isLoggedIn?_api_post__WEBPACK_IMPORTED_MODULE_0__.xl:_api_post__WEBPACK_IMPORTED_MODULE_0__.Xv,{data,isError,isLoading,error}=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.a)([_constants_queryKey__WEBPACK_IMPORTED_MODULE_1__.l.POST_DETAIL,postId,isLoggedIn],(()=>fetchApi(postId)),{suspense:!0});return{data,isError,isLoading,error}}},"./src/pages/Error/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Error});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),Layout=__webpack_require__("./src/components/common/Layout/index.tsx"),LogoButton=__webpack_require__("./src/components/common/LogoButton/index.tsx"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Wrapper=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  position: relative;
`,Description=(styled_components_browser_esm.zo.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.r.zIndex.header};
`,styled_components_browser_esm.zo.p`
  width: 90%;
  margin-top: 60px;

  font: var(--text-title);
  text-align: center;
`),Text=styled_components_browser_esm.zo.p`
  width: 90%;

  color: gray;

  font: var(--text-body);
  text-align: center;
`,ButtonWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  width: 280px;
  height: 50px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Error({message}){const navigate=(0,dist.s0)();return(0,jsx_runtime.jsx)(Layout.Z,{isSidebarVisible:!1,children:(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(Description,{children:message||"요청 중 오류가 발생했습니다."}),(0,jsx_runtime.jsx)(LogoButton.Z,{content:"icon",style:{width:"100px",height:"100px"}}),(0,jsx_runtime.jsx)(Text,{children:"오류가 지속되는 경우 votogether2023@gmail.com 로 문의해주세요."}),(0,jsx_runtime.jsxs)(ButtonWrapper,{children:[(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"fill",onClick:()=>{navigate("/")},children:"홈으로 가기"}),(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"gray",onClick:()=>{window.location.reload()},children:"새로 고침"})]})]})})}Error.displayName="Error";try{Error.displayName="Error",Error.__docgenInfo={description:"",displayName:"Error",props:{message:{defaultValue:null,description:"",name:"message",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/Error/index.tsx#Error"]={docgenInfo:Error.__docgenInfo,name:"Error",path:"src/pages/Error/index.tsx#Error"})}catch(__react_docgen_typescript_loader_error){}},"./src/pages/ErrorBoundaryWithNarrowHeader.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _components_common_NarrowTemplateHeader__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/NarrowTemplateHeader/index.tsx"),_Error__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/pages/Error/index.tsx"),_ErrorBoundary__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/pages/ErrorBoundary.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");class ErrorBoundaryWithNarrowHeader extends _ErrorBoundary__WEBPACK_IMPORTED_MODULE_2__.Z{render(){return this.state.hasError?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_common_NarrowTemplateHeader__WEBPACK_IMPORTED_MODULE_0__.Z,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Error__WEBPACK_IMPORTED_MODULE_1__.Z,{message:this.state.errorMessage})]}):this.props.children}}ErrorBoundaryWithNarrowHeader.displayName="ErrorBoundaryWithNarrowHeader";const __WEBPACK_DEFAULT_EXPORT__=ErrorBoundaryWithNarrowHeader;try{ErrorBoundaryWithNarrowHeader.displayName="ErrorBoundaryWithNarrowHeader",ErrorBoundaryWithNarrowHeader.__docgenInfo={description:"",displayName:"ErrorBoundaryWithNarrowHeader",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/ErrorBoundaryWithNarrowHeader.tsx#ErrorBoundaryWithNarrowHeader"]={docgenInfo:ErrorBoundaryWithNarrowHeader.__docgenInfo,name:"ErrorBoundaryWithNarrowHeader",path:"src/pages/ErrorBoundaryWithNarrowHeader.tsx#ErrorBoundaryWithNarrowHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/pages/post/PostDetail/BottomButtonPart/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>BottomButtonPart});var react=__webpack_require__("./node_modules/react/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),DeleteModal=__webpack_require__("./src/components/common/DeleteModal/index.tsx"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),ReportModal=__webpack_require__("./src/components/ReportModal/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BottomButtonContainer=styled_components_browser_esm.zo.div`
  display: none;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: flex;
    width: 90%;
    height: 40px;
    margin-top: 40px;
    gap: 10px;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function BottomButtonPart({isWriter,isClosed,handleEvent:{movePage,controlPost,openToast}}){const{loggedInfo}=(0,react.useContext)(auth.V),{moveWritePostPage,moveVoteStatisticsPage}=movePage,{setEarlyClosePost,deletePost,reportPost,reportNickname}=controlPost,[action,setAction]=(0,react.useState)(null),handleActionButtonClick=action=>{loggedInfo.isLoggedIn?setAction(action):openToast("로그인 후에 기능을 이용해주세요.")},handleCancelClick=()=>{setAction(null)};return(0,jsx_runtime.jsxs)(BottomButtonContainer,{children:[isWriter?isClosed?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"게시글 통계보기",theme:"fill",onClick:moveVoteStatisticsPage,children:"통계보기"}),(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"게시글 삭제",theme:"fill",onClick:()=>handleActionButtonClick("DELETE"),children:"삭 제"})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"게시글 조기마감",theme:"fill",onClick:setEarlyClosePost,children:"조기마감"}),(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"게시글 수정",theme:"blank",onClick:moveWritePostPage,children:"수 정"}),(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"게시글 삭제",theme:"fill",onClick:()=>handleActionButtonClick("DELETE"),children:"삭 제"})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"fill",onClick:()=>handleActionButtonClick("POST_REPORT"),children:"게시물 신고"}),(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"fill",onClick:()=>handleActionButtonClick("NICKNAME_REPORT"),children:"작성자 닉네임 신고"})]}),"DELETE"===action&&(0,jsx_runtime.jsx)(DeleteModal.Z,{target:"POST",handleCancelClick,handleDeleteClick:deletePost}),"POST_REPORT"===action&&(0,jsx_runtime.jsx)(ReportModal.Z,{reportType:"POST",handleReportClick:reportPost,handleCancelClick}),"NICKNAME_REPORT"===action&&(0,jsx_runtime.jsx)(ReportModal.Z,{reportType:"NICKNAME",handleReportClick:reportNickname,handleCancelClick})]})}BottomButtonPart.displayName="BottomButtonPart";try{BottomButtonPart.displayName="BottomButtonPart",BottomButtonPart.__docgenInfo={description:"",displayName:"BottomButtonPart",props:{isWriter:{defaultValue:null,description:"",name:"isWriter",required:!0,type:{name:"boolean"}},isClosed:{defaultValue:null,description:"",name:"isClosed",required:!0,type:{name:"boolean"}},handleEvent:{defaultValue:null,description:"",name:"handleEvent",required:!0,type:{name:"{ movePage: Record<MovePageEvent, () => void>; controlPost: { setEarlyClosePost: () => void; deletePost: () => void; reportPost: (reason: string) => void; reportNickname: (reason: string) => void; }; openToast: (text: string) => void; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/post/PostDetail/BottomButtonPart/index.tsx#BottomButtonPart"]={docgenInfo:BottomButtonPart.__docgenInfo,name:"BottomButtonPart",path:"src/pages/post/PostDetail/BottomButtonPart/index.tsx#BottomButtonPart"})}catch(__react_docgen_typescript_loader_error){}},"./src/pages/post/PostDetail/InnerHeaderPart/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>InnerHeaderPart});var react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),useToggle=__webpack_require__("./src/hooks/useToggle.tsx"),DeleteModal=__webpack_require__("./src/components/common/DeleteModal/index.tsx"),HeaderTextButton=__webpack_require__("./src/components/common/HeaderTextButton/index.tsx"),IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),PostMenu=__webpack_require__("./src/components/common/PostMenu/index.tsx"),TagButton=__webpack_require__("./src/components/common/TagButton/index.tsx"),ReportModal=__webpack_require__("./src/components/ReportModal/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const HeaderWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  gap: 30px;
`,TagButtonWrapper=styled_components_browser_esm.zo.div`
  margin-right: 10px;

  position: absolute;
  top: 55px;
  right: 10px;
`,MenuWrapper=styled_components_browser_esm.zo.div`
  margin-right: 10px;

  position: absolute;
  top: 45px;
  right: 10px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const menuList=[{color:"black",content:"닉네임 신고",action:"NICKNAME_REPORT"},{color:"black",content:"게시글 신고",action:"POST_REPORT"}];function InnerHeaderPart({isWriter,isClosed,handleEvent:{movePage,controlPost}}){const navigate=(0,dist.s0)(),{moveWritePostPage,moveVoteStatisticsPage}=movePage,{setEarlyClosePost,deletePost,reportPost,reportNickname}=controlPost,{isOpen,toggleComponent,closeComponent}=(0,useToggle.O)(),[action,setAction]=(0,react.useState)(null),handleMenuClick=action=>{closeComponent(),setAction(action)},handleCancelClick=()=>{setAction(null)};return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(IconButton.Z,{category:"back",onClick:()=>{navigate(-1)}}),(0,jsx_runtime.jsxs)(HeaderWrapper,{children:[isWriter?isClosed?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(HeaderTextButton.Z,{"aria-label":"게시글 삭제",onClick:()=>handleMenuClick("DELETE"),children:"삭제"}),(0,jsx_runtime.jsx)(TagButtonWrapper,{children:(0,jsx_runtime.jsx)(TagButton.Z,{"aria-label":"게시글 통계보기",size:"sm",onClick:moveVoteStatisticsPage,children:"통계보기"})})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(HeaderTextButton.Z,{"aria-label":"게시글 수정",onClick:moveWritePostPage,children:"수정"}),(0,jsx_runtime.jsx)(HeaderTextButton.Z,{"aria-label":"게시글 삭제",onClick:()=>handleMenuClick("DELETE"),children:"삭제"}),(0,jsx_runtime.jsx)(TagButtonWrapper,{children:(0,jsx_runtime.jsx)(TagButton.Z,{"aria-label":"게시글 조기마감",size:"sm",onClick:setEarlyClosePost,children:"조기마감"})})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(HeaderTextButton.Z,{"aria-label":isOpen?"게시글 신고 메뉴 닫기":"게시글 신고 메뉴 열기",onClick:toggleComponent,children:"신고"}),isOpen&&(0,jsx_runtime.jsx)(MenuWrapper,{children:(0,jsx_runtime.jsx)(PostMenu.Z,{menuList,handleMenuClick})})]}),"DELETE"===action&&(0,jsx_runtime.jsx)(DeleteModal.Z,{target:"POST",handleCancelClick,handleDeleteClick:deletePost}),"POST_REPORT"===action&&(0,jsx_runtime.jsx)(ReportModal.Z,{reportType:"POST",handleReportClick:reportPost,handleCancelClick}),"NICKNAME_REPORT"===action&&(0,jsx_runtime.jsx)(ReportModal.Z,{reportType:"NICKNAME",handleReportClick:reportNickname,handleCancelClick})]})]})}try{InnerHeaderPart.displayName="InnerHeaderPart",InnerHeaderPart.__docgenInfo={description:"",displayName:"InnerHeaderPart",props:{isWriter:{defaultValue:null,description:"",name:"isWriter",required:!0,type:{name:"boolean"}},isClosed:{defaultValue:null,description:"",name:"isClosed",required:!0,type:{name:"boolean"}},handleEvent:{defaultValue:null,description:"",name:"handleEvent",required:!0,type:{name:"{ movePage: Record<MovePageEvent, () => void>; controlPost: { setEarlyClosePost: () => void; deletePost: () => void; reportPost: (reason: string) => void; reportNickname: (reason: string) => void; }; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/post/PostDetail/InnerHeaderPart/index.tsx#InnerHeaderPart"]={docgenInfo:InnerHeaderPart.__docgenInfo,name:"InnerHeaderPart",path:"src/pages/post/PostDetail/InnerHeaderPart/index.tsx#InnerHeaderPart"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/post/convertImageUrlToServerUrl.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>convertImageUrlToServerUrl,X:()=>convertServerUrlToImageUrl});var _constants_post__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/constants/post.ts");const convertImageUrlToServerUrl=imageUrl=>`${_constants_post__WEBPACK_IMPORTED_MODULE_0__.f_}${imageUrl}`,convertServerUrlToImageUrl=imageUrl=>imageUrl.replace(_constants_post__WEBPACK_IMPORTED_MODULE_0__.f_,"")},"./src/utils/scrollToTop.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>smoothScrollToTop});const smoothScrollToTop=()=>{window.scroll({top:0,behavior:"smooth"})}},"./src/assets/logo.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/logo.9ee58604.svg"},"./src/assets/photo_white.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/photo_white.830f687b.svg"}}]);
//# sourceMappingURL=pages-post-PostDetail-PostDetail-stories.ac9e4eb6.iframe.bundle.js.map