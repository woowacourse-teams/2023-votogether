"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[8927],{"./src/pages/post/PostDetail/PostDetail.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WriterCase:()=>WriterCase,__namedExportsOrder:()=>__namedExportsOrder,default:()=>PostDetail_stories});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),useFetch=__webpack_require__("./src/hooks/useFetch.ts"),post=__webpack_require__("./src/api/post.ts"),Layout=__webpack_require__("./src/components/common/Layout/index.tsx"),NarrowTemplateHeader=__webpack_require__("./src/components/common/NarrowTemplateHeader/index.tsx"),Post=__webpack_require__("./src/components/common/Post/index.tsx"),mockData=__webpack_require__("./src/components/common/Post/mockData.ts");const checkClosedPost=deadline=>(()=>{const now=new Date,year=now.getFullYear(),month=String(now.getMonth()+1).padStart(2,"0"),day=String(now.getDate()).padStart(2,"0"),hours=String(now.getHours()).padStart(2,"0"),minutes=String(now.getMinutes()).padStart(2,"0");return Number(`${year}${month}${day}${hours}${minutes}`)})()>=(date=>{const dateComponents=date.split(" "),datePieces=dateComponents[0].split("-"),timePieces=dateComponents[1].split(":");return Number([...datePieces,...timePieces].join(""))})(deadline);var BottomButtonPart=__webpack_require__("./src/pages/post/PostDetail/BottomButtonPart/index.tsx"),InnerHeaderPart=__webpack_require__("./src/pages/post/PostDetail/InnerHeaderPart/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 70px 10px 20px 10px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    margin-top: 30px;
  }
`,HeaderContainer=styled_components_browser_esm.zo.div`
  position: fixed;
  width: 100%;
  top: 0;

  z-index: ${theme.r.zIndex.header};

  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: none;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function PostDetailPage(){const navigate=(0,dist.s0)(),params=(0,dist.UO)(),postId=Number(params.postId),{data:postData,errorMessage,isLoading,refetch}=(0,useFetch.i)((()=>(0,post.xl)(postId)));if(!postData)return(0,jsx_runtime.jsxs)(Layout.Z,{isSidebarVisible:!0,children:[(0,jsx_runtime.jsx)(HeaderContainer,{children:(0,jsx_runtime.jsx)(NarrowTemplateHeader.Z,{children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{})})}),(0,jsx_runtime.jsxs)(Container,{children:[isLoading&&"loading",errorMessage&&errorMessage]})]});if(isLoading)return(0,jsx_runtime.jsx)("div",{children:"로딩중"});const isWriter=12121221===postData.writer.id,isClosed=checkClosedPost(postData.deadline),movePage={moveWritePostPage:()=>{postData.voteInfo.allPeopleCount&&alert("투표한 사용자가 있어 글 수정이 불가합니다."),navigate(`/posts/write/${postId}`)},moveVoteStatisticsPage:()=>{navigate(`/posts/result/${postId}`)},movePostListPage:()=>{navigate("/")}},controlPost={setEarlyClosePost:async()=>{await(0,post.yx)(postId).catch((error=>alert(error.message))).then((res=>{alert("게시물을 즉시마감했습니다."),refetch()}))},removePost:async()=>{isClosed||alert("마감된 게시물만 삭제 가능합니다."),await(0,post.M8)(postId).catch((error=>alert(error.message))).then((res=>alert("게시물을 삭제했습니다.")))},reportPost:()=>{}};return(0,jsx_runtime.jsxs)(Layout.Z,{isSidebarVisible:!0,children:[(0,jsx_runtime.jsx)(HeaderContainer,{children:(0,jsx_runtime.jsx)(NarrowTemplateHeader.Z,{children:(0,jsx_runtime.jsx)(InnerHeaderPart.Z,{isClosed,isWriter,handleEvent:{movePage,controlPost}})})}),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Post.Z,{postInfo:mockData.V,isPreview:!1}),(0,jsx_runtime.jsx)(BottomButtonPart.Z,{isClosed,isWriter,handleEvent:{movePage,controlPost}})]})]})}PostDetailPage.displayName="PostDetailPage";const PostDetail_stories={component:PostDetailPage},WriterCase={render:()=>(0,jsx_runtime.jsx)(PostDetailPage,{})};WriterCase.parameters={...WriterCase.parameters,docs:{...WriterCase.parameters?.docs,source:{originalSource:"{\n  render: () => <PostDetailPage />\n}",...WriterCase.parameters?.docs?.source}}};const __namedExportsOrder=["WriterCase"]},"./src/components/common/HeaderTextButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>HeaderTextButton});const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  background-color: rgba(0, 0, 0, 0);
  color: var(--white);

  font: var(--text-caption);
  font-weight: 500;

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function HeaderTextButton({children,...rest}){return(0,jsx_runtime.jsx)(Button,{...rest,children})}HeaderTextButton.displayName="HeaderTextButton";try{HeaderTextButton.displayName="HeaderTextButton",HeaderTextButton.__docgenInfo={description:"",displayName:"HeaderTextButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/HeaderTextButton/index.tsx#HeaderTextButton"]={docgenInfo:HeaderTextButton.__docgenInfo,name:"HeaderTextButton",path:"src/components/common/HeaderTextButton/index.tsx#HeaderTextButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/IconButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>IconButton});const back_namespaceObject=__webpack_require__.p+"static/media/back.0d0cf282.svg",category_namespaceObject=__webpack_require__.p+"static/media/category.5dbd06d6.svg",search_white_namespaceObject=__webpack_require__.p+"static/media/search_white.74caf850.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  background-color: rgba(0, 0, 0, 0);

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ICON_CATEGORY={category:{name:"카테고리",url:category_namespaceObject},back:{name:"뒤로가기",url:back_namespaceObject},search:{name:"검색",url:search_white_namespaceObject}};function IconButton({category,...rest}){const src=ICON_CATEGORY[category].url,ariaLabelText=ICON_CATEGORY[category].name;return(0,jsx_runtime.jsx)(Button,{"aria-label":ariaLabelText,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:`${ariaLabelText} 버튼`})})}IconButton.displayName="IconButton";try{IconButton.displayName="IconButton",IconButton.__docgenInfo={description:"",displayName:"IconButton",props:{category:{defaultValue:null,description:"",name:"category",required:!0,type:{name:"enum",value:[{value:'"search"'},{value:'"category"'},{value:'"back"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/IconButton/index.tsx#IconButton"]={docgenInfo:IconButton.__docgenInfo,name:"IconButton",path:"src/components/common/IconButton/index.tsx#IconButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/NarrowTemplateHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>NarrowTemplateHeader});const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function NarrowTemplateHeader({children}){return(0,jsx_runtime.jsx)(Container,{children})}NarrowTemplateHeader.displayName="NarrowTemplateHeader";try{NarrowTemplateHeader.displayName="NarrowTemplateHeader",NarrowTemplateHeader.__docgenInfo={description:"",displayName:"NarrowTemplateHeader",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"]={docgenInfo:NarrowTemplateHeader.__docgenInfo,name:"NarrowTemplateHeader",path:"src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Post/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Post});var post=__webpack_require__("./src/api/post.ts"),WrittenVoteOptionList=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/index.tsx"),path=__webpack_require__("./src/constants/path.ts"),vote=__webpack_require__("./src/constants/vote.ts"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.li`
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

  font: var(--text-caption);
  text-overflow: ellipsis;
  word-break: break-word;

  margin: 10px 0;

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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Post({postInfo,isPreview}){const{postId,category,title,writer,createTime,deadline,content,voteInfo}=postInfo;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(DetailLink,{to:isPreview?`${path.m.POST}/${postId}`:"#",$isPreview:isPreview,onClick:e=>{isPreview||e.preventDefault()},"aria-describedby":isPreview?"해당 게시물의 상세페이지로 이동하기":"현재 상세페이지이므로 사용할 수 없음","aria-disabled":!isPreview,children:[(0,jsx_runtime.jsx)(Category,{"aria-label":"카테고리",children:category.map((category=>category.name)).join(" | ")}),(0,jsx_runtime.jsx)(Title,{"aria-label":"제목",$isPreview:isPreview,children:title}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)("span",{"aria-label":"작성자",children:writer.nickname}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)("span",{"aria-label":"작성일시",children:startTime}),(0,jsx_runtime.jsx)("span",{"aria-label":"투표 마감일시",children:endTime})]})]}),(0,jsx_runtime.jsx)(Content,{"aria-label":"내용",$isPreview:isPreview,children:content})]}),(0,jsx_runtime.jsx)(WrittenVoteOptionList.Z,{selectedOptionId:voteInfo.selectedOptionId,handleVoteClick:newOptionId=>{voteInfo.selectedOptionId!==newOptionId&&(voteInfo.selectedOptionId!==vote.a.NOT_VOTE?(0,post.hQ)(postId,{originOptionId:voteInfo.selectedOptionId,newOptionId}):(0,post.Gi)(postId,newOptionId))},isPreview,voteOptionList:voteInfo.options})]})}Post.displayName="Post";try{Post.displayName="Post",Post.__docgenInfo={description:"",displayName:"Post",props:{postInfo:{defaultValue:null,description:"",name:"postInfo",required:!0,type:{name:"PostInfo"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Post/index.tsx#Post"]={docgenInfo:Post.__docgenInfo,name:"Post",path:"src/components/common/Post/index.tsx#Post"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Post/mockData.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>MOCK_VOTE_POST,V:()=>MOCK_NOT_VOTE_POST});const MOCK_NOT_VOTE_POST={postId:1111111,title:"어느 곳에서 정보를 찾아야 할지도 막막한 사람들을 위한, 심심풀이로 나의 취향과 남의 취향을 비교해보고 싶은 사람들을 위한 프로젝트",writer:{id:12121221,nickname:"우아한 잔치국수"},content:"이는 사람들에게 재미와 정보, 두 가지를 줄 수 있습니다. 사람들은 MBTI, 밸런스게임처럼 나와 같은 사람들을 찾고, 나와 다른 사람들과 비교하는 것을 즐깁니다. 이를 컨텐츠화하여 보다 빠르게 질문하고 답변하며, 사람들의 반응을 확인할 수 있다면 사람들은 충분한 즐거움을 느낄 것입니다. 또한 20대가 많은 대학가에 창업을 하고 싶지만 20대의 의견을 모르겠을 때, 확실한 답은 아닐지라도 어느 정도의 가이드를 줄 수 있을 것입니다. 질문자에게 제공되는 성별/나이대별 투표 결과 정보는 질문자가 하고자 하는 의사결정의 근거가 될 수 있을 것입니다.",imageUrl:"",category:[{id:76767,name:"개발"},{id:74632,name:"연애"},{id:71347,name:"상담"}],createTime:"2023-07-12 12:40",deadline:"2023-07-20 18:40",voteInfo:{selectedOptionId:0,allPeopleCount:100,options:[{id:12312,text:"당선",peopleCount:-1,percent:-1,imageUrl:""},{id:12314,text:"votogether",peopleCount:-1,percent:-1,imageUrl:""},{id:123152,text:"블라인드와 같은 SNS의 형식을 차용합니다. 누군가는 글을 쓰고, 누군가는 반응합니다. 다만, 댓글은 없습니다. 투표로 자신의 의견을 표현하고 이를 사람들에게 보여줍니다.",peopleCount:-1,percent:-1,imageUrl:""},{id:123122,text:"fun from choice, 오늘도 즐거운 한 표 ",imageUrl:"https://source.unsplash.com/random",peopleCount:-1,percent:-1}]}},MOCK_VOTE_POST={postId:1111112,title:"어느 곳에서 정보를 찾아야 할지도 막막한 사람들을 위한, 심심풀이로 나의 취향과 남의 취향을 비교해보고 싶은 사람들을 위한 프로젝트",writer:{id:12121221,nickname:"우아한 잔치국수"},content:"이는 사람들에게 재미와 정보, 두 가지를 줄 수 있습니다. 사람들은 MBTI, 밸런스게임처럼 나와 같은 사람들을 찾고, 나와 다른 사람들과 비교하는 것을 즐깁니다. 이를 컨텐츠화하여 보다 빠르게 질문하고 답변하며, 사람들의 반응을 확인할 수 있다면 사람들은 충분한 즐거움을 느낄 것입니다. 또한 20대가 많은 대학가에 창업을 하고 싶지만 20대의 의견을 모르겠을 때, 확실한 답은 아닐지라도 어느 정도의 가이드를 줄 수 있을 것입니다. 질문자에게 제공되는 성별/나이대별 투표 결과 정보는 질문자가 하고자 하는 의사결정의 근거가 될 수 있을 것입니다.",imageUrl:"",category:[{id:76767,name:"개발"},{id:74632,name:"연애"},{id:71347,name:"상담"}],createTime:"2023-07-12 12:40",deadline:"2023-07-21 18:40",voteInfo:{selectedOptionId:12312,allPeopleCount:123,options:[{id:12312,text:"당선",peopleCount:30,imageUrl:"",percent:30},{id:12314,text:"votogether",peopleCount:40,imageUrl:"",percent:40},{id:123152,text:"인스타그램, 블라인드와 같은 SNS의 형식을 차용합니다. 누군가는 글을 쓰고, 누군가는 반응합니다. 다만, 댓글은 없습니다. 투표로 자신의 의견을 표현하고 이를 사람들에게 보여줍니다.",peopleCount:20,imageUrl:"",percent:20},{id:123122,text:"fun from choice, 오늘도 즐거운 한 표 ",imageUrl:"https://source.unsplash.com/random",peopleCount:10,percent:10}]}}},"./src/components/common/TagButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TagButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const size={sm:{width:"80px",height:"40px",fontSize:"14px"},md:{width:"100px",height:"50px",fontSize:"20px"},lg:{width:"120px",height:"60px",fontSize:"24px"}},Button=styled_components_browser_esm.zo.button`
  display: block;

  width: ${props=>size[props.$size].width};
  height: ${props=>size[props.$size].height};
  border-radius: 0 0 5px 5px;

  background-color: var(--primary-color);
  color: var(--white);

  font-size: ${props=>size[props.$size].fontSize};

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TagButton({size,...rest}){return(0,jsx_runtime.jsx)(Button,{$size:size,...rest,children:rest.children})}TagButton.displayName="TagButton";try{TagButton.displayName="TagButton",TagButton.__docgenInfo={description:"",displayName:"TagButton",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/TagButton/index.tsx#TagButton"]={docgenInfo:TagButton.__docgenInfo,name:"TagButton",path:"src/components/common/TagButton/index.tsx#TagButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ProgressBar});__webpack_require__("./node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  border-radius: 4px;

  height: 8px;

  background-color: rgba(0, 0, 0, 0.15);
`,Bar=styled_components_browser_esm.zo.div`
  border-radius: 4px;

  width: ${({progress})=>`${progress}%`};
  height: 8px;

  background-color: ${({$isSelected})=>$isSelected?"var(--primary-color)":"#9F9F9F"};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ProgressBar({percent,isSelected}){return(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsx)(Bar,{progress:percent,$isSelected:isSelected})})}ProgressBar.displayName="ProgressBar";try{ProgressBar.displayName="ProgressBar",ProgressBar.__docgenInfo={description:"",displayName:"ProgressBar",props:{percent:{defaultValue:null,description:"",name:"percent",required:!0,type:{name:"number"}},isSelected:{defaultValue:null,description:"",name:"isSelected",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx#ProgressBar"]={docgenInfo:ProgressBar.__docgenInfo,name:"ProgressBar",path:"src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx#ProgressBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WrittenVoteOption});var ProgressBar=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.button`
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

  font: var(--text-small);

  opacity: 0.7;

  @media (min-width: ${theme.r.breakpoint.md}) {
    font: var(--text-caption);
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOption({handleVoteClick,text,isVoted,peopleCount,percent,isSelected,isPreview,imageUrl,ariaLabel}){return(0,jsx_runtime.jsxs)(Container,{"aria-label":`${ariaLabel}${isSelected?" 선택된 선택지":""}`,$isSelected:isSelected,onClick:handleVoteClick,children:[!isPreview&&imageUrl&&(0,jsx_runtime.jsx)(Image,{src:imageUrl,alt:text}),isPreview?(0,jsx_runtime.jsx)(PreviewContent,{"aria-label":"선택지 내용",children:text}):(0,jsx_runtime.jsx)(DetailContent,{"aria-label":"선택지 내용",children:text}),isVoted&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(ProgressContainer,{"aria-label":"",children:(0,jsx_runtime.jsx)(ProgressBar.Z,{percent,isSelected})}),(0,jsx_runtime.jsxs)(TextContainer,{children:[(0,jsx_runtime.jsxs)(PeopleText,{"aria-label":"투표한 인원",children:[peopleCount,"명"]}),(0,jsx_runtime.jsxs)(PercentText,{"aria-label":"전체 투표 중 차지 비율",children:["(",percent.toFixed(1),"%)"]})]})]})]})}WrittenVoteOption.displayName="WrittenVoteOption";try{WrittenVoteOption.displayName="WrittenVoteOption",WrittenVoteOption.__docgenInfo={description:"",displayName:"WrittenVoteOption",props:{handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"() => void"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},isVoted:{defaultValue:null,description:"",name:"isVoted",required:!0,type:{name:"boolean"}},peopleCount:{defaultValue:null,description:"",name:"peopleCount",required:!0,type:{name:"number"}},percent:{defaultValue:null,description:"",name:"percent",required:!0,type:{name:"number"}},isSelected:{defaultValue:null,description:"",name:"isSelected",required:!0,type:{name:"boolean"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},imageUrl:{defaultValue:null,description:"",name:"imageUrl",required:!0,type:{name:"string"}},ariaLabel:{defaultValue:null,description:"",name:"ariaLabel",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"]={docgenInfo:WrittenVoteOption.__docgenInfo,name:"WrittenVoteOption",path:"src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WrittenVoteOptionList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WrittenVoteOptionList});var vote=__webpack_require__("./src/constants/vote.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const VoteOptionListContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  @media (min-width: ${theme.r.breakpoint.md}) {
    gap: 18px;
  }
`;var WrittenVoteOption=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOptionList({isPreview,voteOptionList,selectedOptionId,handleVoteClick}){return(0,jsx_runtime.jsx)(VoteOptionListContainer,{"aria-label":"투표 선택지",children:voteOptionList.map(((voteOption,index)=>(0,jsx_runtime.jsx)(WrittenVoteOption.Z,{ariaLabel:`${index+1}번`,...voteOption,isPreview,isVoted:selectedOptionId!==vote.a.NOT_VOTE,isSelected:selectedOptionId===voteOption.id,handleVoteClick:()=>handleVoteClick(voteOption.id)},voteOption.id)))})}WrittenVoteOptionList.displayName="WrittenVoteOptionList";try{WrittenVoteOptionList.displayName="WrittenVoteOptionList",WrittenVoteOptionList.__docgenInfo={description:"",displayName:"WrittenVoteOptionList",props:{isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},selectedOptionId:{defaultValue:null,description:"",name:"selectedOptionId",required:!0,type:{name:"number"}},voteOptionList:{defaultValue:null,description:"",name:"voteOptionList",required:!0,type:{name:"WrittenVoteOptionType[]"}},handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"(newOptionId: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/index.tsx#WrittenVoteOptionList"]={docgenInfo:WrittenVoteOptionList.__docgenInfo,name:"WrittenVoteOptionList",path:"src/components/optionList/WrittenVoteOptionList/index.tsx#WrittenVoteOptionList"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/vote.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>POST});const POST={NOT_VOTE:0}},"./src/hooks/useFetch.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>useFetch});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useFetch=fetchFn=>{const[data,setData]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[errorMessage,setErrorMessage]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),[isLoading,setIsLoading]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0),refetch=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{setIsLoading(!0),setData(null),setErrorMessage(null),fetchFn().then((res=>{setData(res)})).catch((error=>{setErrorMessage(error.message)})).finally((()=>{setIsLoading(!1)}))}),[fetchFn]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{refetch()}),[]),{data,errorMessage,isLoading,refetch}}},"./src/pages/post/PostDetail/BottomButtonPart/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>BottomButtonPart});var SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BottomButtonContainer=styled_components_browser_esm.zo.div`
  display: none;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: flex;
    width: 90%;
    height: 40px;
    margin-top: 40px;
    gap: 10px;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function BottomButtonPart({isWriter,isClosed,handleEvent:{movePage,controlPost}}){const{moveWritePostPage,moveVoteStatisticsPage}=movePage,{setEarlyClosePost,removePost,reportPost}=controlPost;return(0,jsx_runtime.jsx)(BottomButtonContainer,{children:isWriter?isClosed?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"fill",onClick:moveVoteStatisticsPage,children:"통계보기"}),(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"fill",onClick:removePost,children:"삭 제"})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"fill",onClick:setEarlyClosePost,children:"조기마감"}),(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"blank",onClick:moveWritePostPage,children:"수 정"}),(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"fill",onClick:removePost,children:"삭 제"})]}):(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"fill",onClick:reportPost,children:"신 고"})})}BottomButtonPart.displayName="BottomButtonPart";try{BottomButtonPart.displayName="BottomButtonPart",BottomButtonPart.__docgenInfo={description:"",displayName:"BottomButtonPart",props:{isWriter:{defaultValue:null,description:"",name:"isWriter",required:!0,type:{name:"boolean"}},isClosed:{defaultValue:null,description:"",name:"isClosed",required:!0,type:{name:"boolean"}},handleEvent:{defaultValue:null,description:"",name:"handleEvent",required:!0,type:{name:"{ movePage: Record<MovePageEvent, () => void>; controlPost: Record<ControlPostEvent, () => void>; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/post/PostDetail/BottomButtonPart/index.tsx#BottomButtonPart"]={docgenInfo:BottomButtonPart.__docgenInfo,name:"BottomButtonPart",path:"src/pages/post/PostDetail/BottomButtonPart/index.tsx#BottomButtonPart"})}catch(__react_docgen_typescript_loader_error){}},"./src/pages/post/PostDetail/InnerHeaderPart/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>InnerHeaderPart});var HeaderTextButton=__webpack_require__("./src/components/common/HeaderTextButton/index.tsx"),IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),TagButton=__webpack_require__("./src/components/common/TagButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const HeaderWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  gap: 30px;
`,TagButtonWrapper=styled_components_browser_esm.zo.div`
  position: absolute;
  top: 55px;
  margin-right: 10px;
  right: 10px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function InnerHeaderPart({isWriter,isClosed,handleEvent:{movePage,controlPost}}){const{moveWritePostPage,moveVoteStatisticsPage,movePostListPage}=movePage,{setEarlyClosePost,removePost,reportPost}=controlPost;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(IconButton.Z,{category:"back",onClick:movePostListPage}),(0,jsx_runtime.jsx)(HeaderWrapper,{children:isWriter?isClosed?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(HeaderTextButton.Z,{onClick:removePost,children:"삭제"}),(0,jsx_runtime.jsx)(TagButtonWrapper,{children:(0,jsx_runtime.jsx)(TagButton.Z,{size:"sm",onClick:moveVoteStatisticsPage,children:"통계보기"})})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(HeaderTextButton.Z,{onClick:moveWritePostPage,children:"수정"}),(0,jsx_runtime.jsx)(HeaderTextButton.Z,{onClick:removePost,children:"삭제"}),(0,jsx_runtime.jsx)(TagButtonWrapper,{children:(0,jsx_runtime.jsx)(TagButton.Z,{size:"sm",onClick:setEarlyClosePost,children:"조기마감"})})]}):(0,jsx_runtime.jsx)(HeaderTextButton.Z,{onClick:reportPost,children:"신고"})})]})}try{InnerHeaderPart.displayName="InnerHeaderPart",InnerHeaderPart.__docgenInfo={description:"",displayName:"InnerHeaderPart",props:{isWriter:{defaultValue:null,description:"",name:"isWriter",required:!0,type:{name:"boolean"}},isClosed:{defaultValue:null,description:"",name:"isClosed",required:!0,type:{name:"boolean"}},handleEvent:{defaultValue:null,description:"",name:"handleEvent",required:!0,type:{name:"{ movePage: Record<MovePageEvent, () => void>; controlPost: Record<ControlPostEvent, () => void>; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/post/PostDetail/InnerHeaderPart/index.tsx#InnerHeaderPart"]={docgenInfo:InnerHeaderPart.__docgenInfo,name:"InnerHeaderPart",path:"src/pages/post/PostDetail/InnerHeaderPart/index.tsx#InnerHeaderPart"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=pages-post-PostDetail-PostDetail-stories.c0fe940b.iframe.bundle.js.map