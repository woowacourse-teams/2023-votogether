"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[7079],{"./src/components/common/Post/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Post});var react=__webpack_require__("./node_modules/react/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),post=__webpack_require__("./src/api/post.ts"),constants_queryKey=__webpack_require__("./src/constants/queryKey.ts");const useCreateVote=({isPreview,postId})=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate}=(0,useMutation.D)({mutationFn:optionId=>(0,post.Gi)(postId,optionId),onSuccess:()=>{queryClient.invalidateQueries([constants_queryKey.l.USER_INFO,!0]),isPreview?queryClient.invalidateQueries({predicate:({queryKey})=>queryKey[0]===constants_queryKey.l.POSTS}):queryClient.invalidateQueries([constants_queryKey.l.POST_DETAIL,postId])},onError:error=>{window.console.log("투표 선택지 생성에 실패했습니다.",error)}});return{mutate}},useEditVote=({isPreview,postId})=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate}=(0,useMutation.D)({mutationFn:optionData=>(0,post.hQ)(postId,optionData),onSuccess:()=>{isPreview?queryClient.invalidateQueries({predicate:({queryKey})=>queryKey[0]===constants_queryKey.l.POSTS}):queryClient.invalidateQueries([constants_queryKey.l.POST_DETAIL,postId])},onError:error=>{window.console.log("투표 선택지 생성에 실패했습니다.",error)}});return{mutate}};var WrittenVoteOptionList=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/index.tsx"),path=__webpack_require__("./src/constants/path.ts"),vote=__webpack_require__("./src/constants/vote.ts"),time=__webpack_require__("./src/utils/time.ts"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.li`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Post({postInfo,isPreview}){const{postId,category,title,writer,createTime,deadline,content,voteInfo}=postInfo,{loggedInfo}=(0,react.useContext)(auth.V),{mutate:createVote}=useCreateVote({isPreview,postId}),{mutate:editVote}=useEditVote({isPreview,postId}),isActive=!(0,time.g)(deadline);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(DetailLink,{to:isPreview?`${path.m.POST}/${postId}`:"#",$isPreview:isPreview,onClick:e=>{isPreview||e.preventDefault()},"aria-describedby":isPreview?"해당 게시물의 상세페이지로 이동하기":"현재 상세페이지이므로 사용할 수 없음","aria-disabled":!isPreview,children:[(0,jsx_runtime.jsx)(Category,{"aria-label":"카테고리",children:category.map((category=>category.name)).join(" | ")}),(0,jsx_runtime.jsx)(ActivateState,{"aria-label":"마감 상태",$isActive:isActive}),(0,jsx_runtime.jsx)(Title,{"aria-label":"제목",$isPreview:isPreview,children:title}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)("span",{"aria-label":"작성자",children:writer.nickname}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)("span",{"aria-label":"작성일시",children:(0,time.O)(createTime)}),(0,jsx_runtime.jsx)("span",{"aria-label":"투표 마감일시",children:isActive?(0,time.O)(deadline):"마감 완료"})]})]}),(0,jsx_runtime.jsx)(Content,{"aria-label":"내용",$isPreview:isPreview,children:content})]}),(0,jsx_runtime.jsx)(WrittenVoteOptionList.Z,{isWriter:writer.id===loggedInfo.id,selectedOptionId:voteInfo.selectedOptionId,handleVoteClick:newOptionId=>{writer.nickname!==loggedInfo.userInfo?.nickname&&voteInfo.selectedOptionId!==newOptionId&&(voteInfo.selectedOptionId!==vote.a.NOT_VOTE?editVote({originOptionId:voteInfo.selectedOptionId,newOptionId}):createVote(newOptionId))},isPreview,voteOptionList:voteInfo.options})]})}Post.displayName="Post";try{Post.displayName="Post",Post.__docgenInfo={description:"",displayName:"Post",props:{postInfo:{defaultValue:null,description:"",name:"postInfo",required:!0,type:{name:"PostInfo"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Post/index.tsx#Post"]={docgenInfo:Post.__docgenInfo,name:"Post",path:"src/components/common/Post/index.tsx#Post"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Select/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Select});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg");const SELECT_SELECTED="selected",SELECT_DISABLED="disabled",SELECT_DEFAULT="default";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  font: var(--text-caption);

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`,SELECTED_CSS_OPTION={selected:{border:"2px solid #60a5fa",color:"var(--slate)",cursor:"pointer"},disabled:{border:"1px solid var(--slate)",color:"var(--slate)",cursor:"not-allowed"},default:{border:"1px solid var(--slate)",color:"",cursor:"pointer"}},SelectedContainer=styled_components_browser_esm.zo.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 8px;
  border: ${({$status})=>SELECTED_CSS_OPTION[$status].border};
  border-radius: 4px;

  font: inherit;

  color: ${({$status})=>SELECTED_CSS_OPTION[$status].color};

  cursor: ${({$status})=>SELECTED_CSS_OPTION[$status].cursor};
`,OptionListParent=styled_components_browser_esm.zo.div`
  position: relative;

  z-index: ${theme.r.zIndex.select};
`,OptionListContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  border: 1px solid var(--slate);
  border-radius: 4px;

  position: absolute;
  top: 4px;

  background-color: var(--white);
`,OptionContainer=styled_components_browser_esm.zo.div`
  padding: 8px;

  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`,Image=styled_components_browser_esm.zo.img`
  width: 20px;
  height: 20px;
  border-left: 1px solid var(--slate);
  padding-left: 8px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Select({selectedOption,optionList,handleOptionChange,isDisabled=!1,...rest}){const optionKeyList=Object.keys(optionList),[isOpen,setIsOpen]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(SelectedContainer,{onClick:()=>{isDisabled||setIsOpen((prev=>!prev))},$status:isDisabled?SELECT_DISABLED:isOpen?SELECT_SELECTED:SELECT_DEFAULT,...rest,children:[(0,jsx_runtime.jsx)("span",{children:selectedOption}),(0,jsx_runtime.jsx)(Image,{src:isOpen?chevron_up:chevron_down,alt:"",$isSelected:isOpen})]}),isOpen&&(0,jsx_runtime.jsx)(OptionListParent,{children:(0,jsx_runtime.jsx)(OptionListContainer,{children:optionKeyList.map((optionKey=>(0,jsx_runtime.jsx)(OptionContainer,{onClick:()=>(handleOptionChange(optionKey),void setIsOpen(!1)),children:optionList[optionKey]},optionKey)))})})]})}Select.displayName="Select";try{Select.displayName="Select",Select.__docgenInfo={description:"",displayName:"Select",props:{selectedOption:{defaultValue:null,description:"",name:"selectedOption",required:!0,type:{name:"string"}},optionList:{defaultValue:null,description:"",name:"optionList",required:!0,type:{name:"Record<T, string>"}},handleOptionChange:{defaultValue:null,description:"",name:"handleOptionChange",required:!0,type:{name:"(option: T) => void"}},isDisabled:{defaultValue:{value:"false"},description:"",name:"isDisabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Select/index.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/components/common/Select/index.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Skeleton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Skeleton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 9px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    gap: 12px;
  }
`,Box=styled_components_browser_esm.zo.div`
  border-radius: 4px;

  background-color: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;

  animation: 1.7s ${theme.r.animation.skeletonGradientWave} linear infinite;
`,FirstBox=(0,styled_components_browser_esm.zo)(Box)`
  height: ${props=>props.$isLarge?"40vh":"30vh"};

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: ${props=>props.$isLarge?"44vh":"34vh"};
  }
`,SecondBox=(0,styled_components_browser_esm.zo)(Box)`
  height: 4vh;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: 6vh;
  }
`,ThirdBox=(0,styled_components_browser_esm.zo)(Box)`
  height: 2vh;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: 4vh;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Skeleton({isLarge}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(FirstBox,{$isLarge:isLarge}),(0,jsx_runtime.jsx)(SecondBox,{}),(0,jsx_runtime.jsx)(ThirdBox,{})]})}Skeleton.displayName="Skeleton";try{Skeleton.displayName="Skeleton",Skeleton.__docgenInfo={description:"",displayName:"Skeleton",props:{isLarge:{defaultValue:null,description:"",name:"isLarge",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Skeleton/index.tsx#Skeleton"]={docgenInfo:Skeleton.__docgenInfo,name:"Skeleton",path:"src/components/common/Skeleton/index.tsx#Skeleton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ProgressBar});__webpack_require__("./node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOption({handleVoteClick,text,isVoted,peopleCount,percent,isSelected,isPreview,imageUrl,ariaLabel}){const imageBaseUrl="".replace(/api\./,"");return(0,jsx_runtime.jsxs)(Container,{"aria-label":`${ariaLabel}${isSelected?" 선택된 선택지":""}`,$isSelected:isSelected,onClick:handleVoteClick,children:[!isPreview&&imageUrl&&(0,jsx_runtime.jsx)(Image,{src:`${imageBaseUrl}/${imageUrl}`,alt:text}),isPreview?(0,jsx_runtime.jsx)(PreviewContent,{"aria-label":"선택지 내용",children:text}):(0,jsx_runtime.jsx)(DetailContent,{"aria-label":"선택지 내용",children:text}),isVoted&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(ProgressContainer,{"aria-label":"",children:(0,jsx_runtime.jsx)(ProgressBar.Z,{percent,isSelected})}),(0,jsx_runtime.jsxs)(TextContainer,{children:[(0,jsx_runtime.jsxs)(PeopleText,{"aria-label":"투표한 인원",children:[peopleCount,"명"]}),(0,jsx_runtime.jsxs)(PercentText,{"aria-label":"전체 투표 중 차지 비율",children:["(",percent.toFixed(1),"%)"]})]})]})]})}WrittenVoteOption.displayName="WrittenVoteOption";try{WrittenVoteOption.displayName="WrittenVoteOption",WrittenVoteOption.__docgenInfo={description:"",displayName:"WrittenVoteOption",props:{handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"() => void"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},isVoted:{defaultValue:null,description:"",name:"isVoted",required:!0,type:{name:"boolean"}},peopleCount:{defaultValue:null,description:"",name:"peopleCount",required:!0,type:{name:"number"}},percent:{defaultValue:null,description:"",name:"percent",required:!0,type:{name:"number"}},isSelected:{defaultValue:null,description:"",name:"isSelected",required:!0,type:{name:"boolean"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},imageUrl:{defaultValue:null,description:"",name:"imageUrl",required:!0,type:{name:"string"}},ariaLabel:{defaultValue:null,description:"",name:"ariaLabel",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"]={docgenInfo:WrittenVoteOption.__docgenInfo,name:"WrittenVoteOption",path:"src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WrittenVoteOptionList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WrittenVoteOptionList});var vote=__webpack_require__("./src/constants/vote.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const VoteOptionListContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  @media (min-width: ${theme.r.breakpoint.md}) {
    gap: 18px;
  }
`;var WrittenVoteOption=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOptionList({isPreview,isWriter,voteOptionList,selectedOptionId,handleVoteClick}){return(0,jsx_runtime.jsx)(VoteOptionListContainer,{"aria-label":"투표 선택지",children:voteOptionList.map(((voteOption,index)=>(0,jsx_runtime.jsx)(WrittenVoteOption.Z,{ariaLabel:`${index+1}번`,...voteOption,isPreview,isVoted:selectedOptionId!==vote.a.NOT_VOTE||isWriter,isSelected:selectedOptionId===voteOption.id,handleVoteClick:()=>handleVoteClick(voteOption.id)},voteOption.id)))})}WrittenVoteOptionList.displayName="WrittenVoteOptionList";try{WrittenVoteOptionList.displayName="WrittenVoteOptionList",WrittenVoteOptionList.__docgenInfo={description:"",displayName:"WrittenVoteOptionList",props:{isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},isWriter:{defaultValue:null,description:"",name:"isWriter",required:!0,type:{name:"boolean"}},selectedOptionId:{defaultValue:null,description:"",name:"selectedOptionId",required:!0,type:{name:"number"}},voteOptionList:{defaultValue:null,description:"",name:"voteOptionList",required:!0,type:{name:"WrittenVoteOptionType[]"}},handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"(newOptionId: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/index.tsx#WrittenVoteOptionList"]={docgenInfo:WrittenVoteOptionList.__docgenInfo,name:"WrittenVoteOptionList",path:"src/components/optionList/WrittenVoteOptionList/index.tsx#WrittenVoteOptionList"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/post/EmptyPostList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>EmptyPostList});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 30px;
`,Title=styled_components_browser_esm.zo.span`
  font: var(--text-body);
  font-weight: 600;

  @media (min-width: ${theme.r.breakpoint.md}) {
    font: var(--text-subtitle);
  }
`,Keyword=(0,styled_components_browser_esm.zo)(Title)`
  color: #ff3c3c;
`,TextCardContainer=styled_components_browser_esm.zo.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 30px 15px;

  font: var(--text-caption);

  @media (min-width: ${theme.r.breakpoint.md}) {
    font: var(--text-body);
  }
`,TextCard=styled_components_browser_esm.zo.li`
  list-style: disc;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function EmptyPostList({keyword,status}){return keyword?(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)("div",{children:["all"!==status&&(0,jsx_runtime.jsx)(Title,{children:"현재 조건에는"}),(0,jsx_runtime.jsxs)(Keyword,{children:["'",keyword,"'"]}),(0,jsx_runtime.jsx)(Title,{children:"와(과) 일치하는 검색결과가 없습니다."})]}),(0,jsx_runtime.jsxs)(TextCardContainer,{children:["all"!==status&&(0,jsx_runtime.jsx)(TextCard,{children:"전체 옵션으로 사용해보세요."}),(0,jsx_runtime.jsx)(TextCard,{children:"모든 단어의 철자가 정확한지 확인하세요."}),(0,jsx_runtime.jsx)(TextCard,{children:"다른 검색어를 사용해 보세요."}),(0,jsx_runtime.jsx)(TextCard,{children:"더 일반적인 검색어를 사용해 보세요."}),(0,jsx_runtime.jsx)(TextCard,{children:"키워드 수를 줄여보세요."})]})]}):(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsx)(Title,{children:"해당 되는 조건의 게시글이 없습니다."})})}EmptyPostList.displayName="EmptyPostList";try{EmptyPostList.displayName="EmptyPostList",EmptyPostList.__docgenInfo={description:"",displayName:"EmptyPostList",props:{status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:"enum",value:[{value:'"all"'},{value:'"progress"'},{value:'"closed"'}]}},keyword:{defaultValue:null,description:"",name:"keyword",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/post/EmptyPostList/index.tsx#EmptyPostList"]={docgenInfo:EmptyPostList.__docgenInfo,name:"EmptyPostList",path:"src/components/post/EmptyPostList/index.tsx#EmptyPostList"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/post/PostList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PostList});var react=__webpack_require__("./node_modules/react/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),post=__webpack_require__("./src/constants/post.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const PostOptionContext=(0,react.createContext)({postOption:{sorting:post.FQ.LATEST,status:post.Q_.PROGRESS},setPostOption:()=>{}});try{postOption.displayName="postOption",postOption.__docgenInfo={description:"",displayName:"postOption",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/context/postOption.tsx#postOption"]={docgenInfo:postOption.__docgenInfo,name:"postOption",path:"src/hooks/context/postOption.tsx#postOption"})}catch(__react_docgen_typescript_loader_error){}var utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),queryObserver=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/queryObserver.mjs"),infiniteQueryBehavior=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/infiniteQueryBehavior.mjs");class InfiniteQueryObserver extends queryObserver.z{constructor(client,options){super(client,options)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(options,notifyOptions){super.setOptions({...options,behavior:(0,infiniteQueryBehavior.Gm)()},notifyOptions)}getOptimisticResult(options){return options.behavior=(0,infiniteQueryBehavior.Gm)(),super.getOptimisticResult(options)}fetchNextPage({pageParam,...options}={}){return this.fetch({...options,meta:{fetchMore:{direction:"forward",pageParam}}})}fetchPreviousPage({pageParam,...options}={}){return this.fetch({...options,meta:{fetchMore:{direction:"backward",pageParam}}})}createResult(query,options){var _state$fetchMeta,_state$fetchMeta$fetc,_state$fetchMeta2,_state$fetchMeta2$fet,_state$data,_state$data2;const{state}=query,result=super.createResult(query,options),{isFetching,isRefetching}=result,isFetchingNextPage=isFetching&&"forward"===(null==(_state$fetchMeta=state.fetchMeta)||null==(_state$fetchMeta$fetc=_state$fetchMeta.fetchMore)?void 0:_state$fetchMeta$fetc.direction),isFetchingPreviousPage=isFetching&&"backward"===(null==(_state$fetchMeta2=state.fetchMeta)||null==(_state$fetchMeta2$fet=_state$fetchMeta2.fetchMore)?void 0:_state$fetchMeta2$fet.direction);return{...result,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:(0,infiniteQueryBehavior.Qy)(options,null==(_state$data=state.data)?void 0:_state$data.pages),hasPreviousPage:(0,infiniteQueryBehavior.ZF)(options,null==(_state$data2=state.data)?void 0:_state$data2.pages),isFetchingNextPage,isFetchingPreviousPage,isRefetching:isRefetching&&!isFetchingNextPage&&!isFetchingPreviousPage}}}var useBaseQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useBaseQuery.mjs");var fetch=__webpack_require__("./src/utils/fetch.ts"),api_post=__webpack_require__("./src/api/post.ts");const getPostList=async(requiredOption,optionalOption)=>{const{pageNumber}=requiredOption,postListUrl=((requiredOption,optionalOption)=>{const{pageNumber,postSorting,postStatus,postType,isLoggedIn}=requiredOption,{categoryId,keyword}=optionalOption,requestedStatus=post.Kf[postStatus],requestedSorting=post.tL[postSorting],POST_BASE_URL=`/${post.It[postType]}${isLoggedIn?"":"/guest"}`,OPTION_URL=`postClosingType=${requestedStatus}&postSortType=${requestedSorting}&page=${pageNumber}`;return categoryId>0&&postType===post.JH.CATEGORY?`${POST_BASE_URL}/?${OPTION_URL}&category=${categoryId}`:postType===post.JH.SEARCH?`${POST_BASE_URL}?${post.Kn}=${keyword}&${OPTION_URL}`:`${POST_BASE_URL}?${OPTION_URL}`})(requiredOption,optionalOption);return{pageNumber,postList:(await(0,fetch.wY)(postListUrl)).map((post=>(0,api_post.wQ)(post)))}};var queryKey=__webpack_require__("./src/constants/queryKey.ts");const usePostList=(requiredOption,optionalOption)=>{const{postSorting,postStatus,isLoggedIn,postType}=requiredOption,{categoryId,keyword}=optionalOption,{data,error,fetchNextPage,hasNextPage,isFetchingNextPage}=function useInfiniteQuery(arg1,arg2,arg3){const options=(0,utils._v)(arg1,arg2,arg3);return(0,useBaseQuery.r)(options,InfiniteQueryObserver)}([queryKey.l.POSTS,postSorting,postStatus,categoryId,keyword,isLoggedIn,postType],(({pageParam=0})=>getPostList({...requiredOption,pageNumber:pageParam},optionalOption)),{getNextPageParam:lastPage=>{if(lastPage.postList.length===post.zV)return lastPage.pageNumber+1},suspense:!0});return{data,error,fetchNextPage,hasNextPage,isFetchingNextPage,isPostListEmpty:0===data?.pages[0].postList.length}},useIntersectionObserver=options=>{const[isIntersecting,setIsIntersecting]=(0,react.useState)(!1),targetRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{const target=targetRef.current;if(!target)return;const observer=new IntersectionObserver((([entry])=>{setIsIntersecting(entry.isIntersecting)}),options);return targetRef.current&&observer.observe(target),()=>{target&&observer.unobserve(target)}}),[options,targetRef]),{targetRef,isIntersecting}};try{useIntersectionObserver.displayName="useIntersectionObserver",useIntersectionObserver.__docgenInfo={description:"",displayName:"useIntersectionObserver",props:{root:{defaultValue:null,description:"",name:"root",required:!0,type:{name:"Element | Document | null"}},rootMargin:{defaultValue:null,description:"",name:"rootMargin",required:!0,type:{name:"string"}},thresholds:{defaultValue:null,description:"",name:"thresholds",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useIntersectionObserver.tsx#useIntersectionObserver"]={docgenInfo:useIntersectionObserver.__docgenInfo,name:"useIntersectionObserver",path:"src/hooks/useIntersectionObserver.tsx#useIntersectionObserver"})}catch(__react_docgen_typescript_loader_error){}var usePostRequestInfo=__webpack_require__("./src/hooks/usePostRequestInfo.ts"),useSelect=__webpack_require__("./src/hooks/useSelect.tsx"),Post=__webpack_require__("./src/components/common/Post/index.tsx"),Select=__webpack_require__("./src/components/common/Select/index.tsx"),Skeleton=__webpack_require__("./src/components/common/Skeleton/index.tsx");const STATUS_OPTION={[post.Q_.ALL]:"전체",[post.Q_.PROGRESS]:"진행중",[post.Q_.CLOSED]:"마감완료"},SORTING_OPTION={[post.FQ.POPULAR]:"인기순",[post.FQ.LATEST]:"최신순"};var EmptyPostList=__webpack_require__("./src/components/post/EmptyPostList/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
`,SelectContainer=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  padding: 20px 20px 30px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  @media (min-width: ${theme.r.breakpoint.sm}) {
    padding: 40px 20px;
  }
`,PostListContainer=styled_components_browser_esm.zo.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding: 30px 20px;

  > li {
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`,SelectWrapper=styled_components_browser_esm.zo.div`
  width: 110px;

  position: absolute;

  &:first-child {
    left: 20px;
  }
  &:last-child {
    right: 20px;
  }
`;function PostList(){const{postType,postOptionalOption}=(0,usePostRequestInfo.Y)(),{loggedInfo}=(0,react.useContext)(auth.V),{targetRef,isIntersecting}=useIntersectionObserver({root:null,rootMargin:"",thresholds:.1}),{postOption,setPostOption}=(0,react.useContext)(PostOptionContext),{selectedOption:selectedStatusOption,handleOptionChange:handleStatusOptionChange}=(0,useSelect.L)(postOption.status),{selectedOption:selectedSortingOption,handleOptionChange:handleSortingOptionChange}=(0,useSelect.L)(postOption.sorting),{data,fetchNextPage,hasNextPage,isFetchingNextPage,isPostListEmpty}=usePostList({postType,postSorting:selectedSortingOption,postStatus:selectedStatusOption,isLoggedIn:loggedInfo.isLoggedIn},postOptionalOption);return(0,react.useEffect)((()=>{isIntersecting&&hasNextPage&&fetchNextPage()}),[isIntersecting,fetchNextPage,hasNextPage]),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(SelectContainer,{children:[(0,jsx_runtime.jsx)(SelectWrapper,{children:(0,jsx_runtime.jsx)(Select.Z,{handleOptionChange:value=>{setPostOption({...postOption,status:value}),handleStatusOptionChange(value)},optionList:STATUS_OPTION,selectedOption:STATUS_OPTION[selectedStatusOption]})}),(0,jsx_runtime.jsx)(SelectWrapper,{children:(0,jsx_runtime.jsx)(Select.Z,{handleOptionChange:value=>{setPostOption({...postOption,sorting:value}),handleSortingOptionChange(value)},optionList:SORTING_OPTION,selectedOption:SORTING_OPTION[selectedSortingOption]})})]}),(0,jsx_runtime.jsxs)(PostListContainer,{children:[isPostListEmpty&&(0,jsx_runtime.jsx)(EmptyPostList.Z,{status:selectedStatusOption,keyword:postOptionalOption.keyword}),data?.pages.map(((postListInfo,pageIndex)=>(0,jsx_runtime.jsx)(react.Fragment,{children:postListInfo.postList.map(((post,index)=>7===index?(0,jsx_runtime.jsx)("div",{ref:targetRef,children:(0,jsx_runtime.jsx)(Post.Z,{isPreview:!0,postInfo:post})},post.postId):(0,jsx_runtime.jsx)(Post.Z,{isPreview:!0,postInfo:post},post.postId)))},pageIndex))),isFetchingNextPage&&(0,jsx_runtime.jsx)(Skeleton.Z,{isLarge:!1})]})]})}PostList.displayName="PostList"},"./src/constants/vote.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>POST});const POST={NOT_VOTE:0}},"./src/hooks/useSelect.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>useSelect});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useSelect=initialOption=>{const[selectedOption,setSelectedOption]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOption);return{selectedOption,handleOptionChange:option=>{setSelectedOption(option)}}};try{useSelect.displayName="useSelect",useSelect.__docgenInfo={description:"",displayName:"useSelect",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useSelect.tsx#useSelect"]={docgenInfo:useSelect.__docgenInfo,name:"useSelect",path:"src/hooks/useSelect.tsx#useSelect"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/time.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>convertTimeToWord,g:()=>checkClosedPost});const checkClosedPost=deadline=>(()=>{const now=new Date,year=now.getFullYear(),month=String(now.getMonth()+1).padStart(2,"0"),day=String(now.getDate()).padStart(2,"0"),hours=String(now.getHours()).padStart(2,"0"),minutes=String(now.getMinutes()).padStart(2,"0");return Number(`${year}${month}${day}${hours}${minutes}`)})()>=(date=>{const dateComponents=date.split(" "),datePieces=dateComponents[0].split("-"),timePieces=dateComponents[1].split(":");return Number([...datePieces,...timePieces].join(""))})(deadline),time_hour=24,time_minute=60,convertTimeToWord=date=>{const targetDate=new Date(date),currentDate=new Date,timeDifference=Math.floor((targetDate.getTime()-currentDate.getTime())/6e4);if(0===timeDifference)return"지금";const afterBefore=timeDifference>0?"후 마감":"전 작성 |",positiveTimeDifference=Math.abs(timeDifference);return Math.round(positiveTimeDifference/(time_hour*time_minute))>0?`${Math.round(positiveTimeDifference/(time_hour*time_minute))}일 ${afterBefore}`:Math.round(positiveTimeDifference/time_minute)>0?`${Math.round(positiveTimeDifference/time_minute)}시간 ${afterBefore}`:`${positiveTimeDifference}분 ${afterBefore}`}}}]);
//# sourceMappingURL=7079.3b4e0d2e.iframe.bundle.js.map