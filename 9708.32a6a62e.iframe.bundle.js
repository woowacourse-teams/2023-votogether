"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[9708],{"./src/components/common/Post/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Post});var react=__webpack_require__("./node_modules/react/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),post=__webpack_require__("./src/api/post.ts"),constants_queryKey=__webpack_require__("./src/constants/queryKey.ts");const useCreateVote=({isPreview,postId})=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate}=(0,useMutation.D)({mutationFn:optionId=>(0,post.Gi)(postId,optionId),onSuccess:()=>{isPreview?queryClient.invalidateQueries({predicate:({queryKey})=>queryKey[0]===constants_queryKey.l.POSTS}):queryClient.invalidateQueries([constants_queryKey.l.POST_DETAIL,postId])},onError:error=>{window.console.log("투표 선택지 생성에 실패했습니다.",error)}});return{mutate}},useEditVote=({isPreview,postId})=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate}=(0,useMutation.D)({mutationFn:optionData=>(0,post.hQ)(postId,optionData),onSuccess:()=>{isPreview?queryClient.invalidateQueries({predicate:({queryKey})=>queryKey[0]===constants_queryKey.l.POSTS}):queryClient.invalidateQueries([constants_queryKey.l.POST_DETAIL,postId])},onError:error=>{window.console.log("투표 선택지 생성에 실패했습니다.",error)}});return{mutate}};var WrittenVoteOptionList=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/index.tsx"),path=__webpack_require__("./src/constants/path.ts"),vote=__webpack_require__("./src/constants/vote.ts"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.li`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Post({postInfo,isPreview}){const{postId,category,title,writer,createTime,deadline,content,voteInfo}=postInfo,{loggedInfo}=(0,react.useContext)(auth.V),{mutate:createVote}=useCreateVote({isPreview,postId}),{mutate:editVote}=useEditVote({isPreview,postId});return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(DetailLink,{to:isPreview?`${path.m.POST}/${postId}`:"#",$isPreview:isPreview,onClick:e=>{isPreview||e.preventDefault()},"aria-describedby":isPreview?"해당 게시물의 상세페이지로 이동하기":"현재 상세페이지이므로 사용할 수 없음","aria-disabled":!isPreview,children:[(0,jsx_runtime.jsx)(Category,{"aria-label":"카테고리",children:category.map((category=>category.name)).join(" | ")}),(0,jsx_runtime.jsx)(Title,{"aria-label":"제목",$isPreview:isPreview,children:title}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)("span",{"aria-label":"작성자",children:writer.nickname}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)("span",{"aria-label":"작성일시",children:createTime}),(0,jsx_runtime.jsx)("span",{"aria-label":"투표 마감일시",children:deadline})]})]}),(0,jsx_runtime.jsx)(Content,{"aria-label":"내용",$isPreview:isPreview,children:content})]}),(0,jsx_runtime.jsx)(WrittenVoteOptionList.Z,{isWriter:writer.nickname===loggedInfo.userInfo?.nickname,selectedOptionId:voteInfo.selectedOptionId,handleVoteClick:newOptionId=>{writer.nickname!==loggedInfo.userInfo?.nickname&&voteInfo.selectedOptionId!==newOptionId&&(voteInfo.selectedOptionId!==vote.a.NOT_VOTE?editVote({originOptionId:voteInfo.selectedOptionId,newOptionId}):createVote(newOptionId))},isPreview,voteOptionList:voteInfo.options})]})}Post.displayName="Post";try{Post.displayName="Post",Post.__docgenInfo={description:"",displayName:"Post",props:{postInfo:{defaultValue:null,description:"",name:"postInfo",required:!0,type:{name:"PostInfo"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Post/index.tsx#Post"]={docgenInfo:Post.__docgenInfo,name:"Post",path:"src/components/common/Post/index.tsx#Post"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Select/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Select});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg");const SELECT_SELECTED="selected",SELECT_DISABLED="disabled",SELECT_DEFAULT="default";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Select({selectedOption,optionList,handleOptionChange,isDisabled=!1,...rest}){const optionKeyList=Object.keys(optionList),[isOpen,setIsOpen]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(SelectedContainer,{onClick:()=>{isDisabled||setIsOpen((prev=>!prev))},$status:isDisabled?SELECT_DISABLED:isOpen?SELECT_SELECTED:SELECT_DEFAULT,...rest,children:[(0,jsx_runtime.jsx)("span",{children:selectedOption}),(0,jsx_runtime.jsx)(Image,{src:isOpen?chevron_up:chevron_down,alt:"",$isSelected:isOpen})]}),isOpen&&(0,jsx_runtime.jsx)(OptionListParent,{children:(0,jsx_runtime.jsx)(OptionListContainer,{children:optionKeyList.map((optionKey=>(0,jsx_runtime.jsx)(OptionContainer,{onClick:()=>(handleOptionChange(optionKey),void setIsOpen(!1)),children:optionList[optionKey]},optionKey)))})})]})}Select.displayName="Select";try{Select.displayName="Select",Select.__docgenInfo={description:"",displayName:"Select",props:{selectedOption:{defaultValue:null,description:"",name:"selectedOption",required:!0,type:{name:"string"}},optionList:{defaultValue:null,description:"",name:"optionList",required:!0,type:{name:"Record<T, string>"}},handleOptionChange:{defaultValue:null,description:"",name:"handleOptionChange",required:!0,type:{name:"(option: T) => void"}},isDisabled:{defaultValue:{value:"false"},description:"",name:"isDisabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Select/index.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/components/common/Select/index.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Skeleton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Skeleton});__webpack_require__("./node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const skeletonGradient=styled_components_browser_esm.F4`
    0% {
        background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
        background-color: rgba(165, 165, 165, 0.3);
    }
    
    100% {
        background-color: rgba(165, 165, 165, 0.1);
    }
`,Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 9px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    gap: 12px;
  }
`,Box=styled_components_browser_esm.zo.div`
  border-radius: 4px;

  -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
  animation: ${skeletonGradient} 1.8s infinite ease-in-out;
`,FirstBox=(0,styled_components_browser_esm.zo)(Box)`
  height: 110px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: 140px;
  }
`,SecondBox=(0,styled_components_browser_esm.zo)(Box)`
  height: 20px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: 30px;
  }
`,ThirdBox=(0,styled_components_browser_esm.zo)(Box)`
  height: 10px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: 15px;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Skeleton(){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(FirstBox,{}),(0,jsx_runtime.jsx)(SecondBox,{}),(0,jsx_runtime.jsx)(ThirdBox,{})]})}Skeleton.displayName="Skeleton"},"./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ProgressBar});__webpack_require__("./node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`;var WrittenVoteOption=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOptionList({isPreview,isWriter,voteOptionList,selectedOptionId,handleVoteClick}){return(0,jsx_runtime.jsx)(VoteOptionListContainer,{"aria-label":"투표 선택지",children:voteOptionList.map(((voteOption,index)=>(0,jsx_runtime.jsx)(WrittenVoteOption.Z,{ariaLabel:`${index+1}번`,...voteOption,isPreview,isVoted:selectedOptionId!==vote.a.NOT_VOTE||isWriter,isSelected:selectedOptionId===voteOption.id,handleVoteClick:()=>handleVoteClick(voteOption.id)},voteOption.id)))})}WrittenVoteOptionList.displayName="WrittenVoteOptionList";try{WrittenVoteOptionList.displayName="WrittenVoteOptionList",WrittenVoteOptionList.__docgenInfo={description:"",displayName:"WrittenVoteOptionList",props:{isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},isWriter:{defaultValue:null,description:"",name:"isWriter",required:!0,type:{name:"boolean"}},selectedOptionId:{defaultValue:null,description:"",name:"selectedOptionId",required:!0,type:{name:"number"}},voteOptionList:{defaultValue:null,description:"",name:"voteOptionList",required:!0,type:{name:"WrittenVoteOptionType[]"}},handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"(newOptionId: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/index.tsx#WrittenVoteOptionList"]={docgenInfo:WrittenVoteOptionList.__docgenInfo,name:"WrittenVoteOptionList",path:"src/components/optionList/WrittenVoteOptionList/index.tsx#WrittenVoteOptionList"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/post/PostList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PostList});var react=__webpack_require__("./node_modules/react/index.js"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),queryObserver=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/queryObserver.mjs"),infiniteQueryBehavior=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/infiniteQueryBehavior.mjs");class InfiniteQueryObserver extends queryObserver.z{constructor(client,options){super(client,options)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(options,notifyOptions){super.setOptions({...options,behavior:(0,infiniteQueryBehavior.Gm)()},notifyOptions)}getOptimisticResult(options){return options.behavior=(0,infiniteQueryBehavior.Gm)(),super.getOptimisticResult(options)}fetchNextPage({pageParam,...options}={}){return this.fetch({...options,meta:{fetchMore:{direction:"forward",pageParam}}})}fetchPreviousPage({pageParam,...options}={}){return this.fetch({...options,meta:{fetchMore:{direction:"backward",pageParam}}})}createResult(query,options){var _state$fetchMeta,_state$fetchMeta$fetc,_state$fetchMeta2,_state$fetchMeta2$fet,_state$data,_state$data2;const{state}=query,result=super.createResult(query,options),{isFetching,isRefetching}=result,isFetchingNextPage=isFetching&&"forward"===(null==(_state$fetchMeta=state.fetchMeta)||null==(_state$fetchMeta$fetc=_state$fetchMeta.fetchMore)?void 0:_state$fetchMeta$fetc.direction),isFetchingPreviousPage=isFetching&&"backward"===(null==(_state$fetchMeta2=state.fetchMeta)||null==(_state$fetchMeta2$fet=_state$fetchMeta2.fetchMore)?void 0:_state$fetchMeta2$fet.direction);return{...result,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:(0,infiniteQueryBehavior.Qy)(options,null==(_state$data=state.data)?void 0:_state$data.pages),hasPreviousPage:(0,infiniteQueryBehavior.ZF)(options,null==(_state$data2=state.data)?void 0:_state$data2.pages),isFetchingNextPage,isFetchingPreviousPage,isRefetching:isRefetching&&!isFetchingNextPage&&!isFetchingPreviousPage}}}var useBaseQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useBaseQuery.mjs");var post=__webpack_require__("./src/constants/post.ts"),fetch=__webpack_require__("./src/utils/fetch.ts"),api_post=__webpack_require__("./src/api/post.ts");const getPostList=async(requiredOption,optionalOption)=>{const{pageNumber}=requiredOption,postListUrl=((requiredOption,optionalOption)=>{const{pageNumber,postSorting,postStatus,postType}=requiredOption,{categoryId,keyword}=optionalOption,requestedStatus=post.Kf[postStatus],requestedSorting=post.tL[postSorting],POST_BASE_URL=`/${post.It[postType]}`,OPTION_URL=`postClosingType=${requestedStatus}&postSortType=${requestedSorting}&page=${pageNumber}`;return categoryId>0&&postType===post.JH.CATEGORY?`${POST_BASE_URL}/${categoryId}?${OPTION_URL}`:postType===post.JH.SEARCH?`${POST_BASE_URL}?${post.Kn}=${keyword}&${OPTION_URL}`:`${POST_BASE_URL}?${OPTION_URL}`})(requiredOption,optionalOption);return{pageNumber,postList:(await(0,fetch.wY)(postListUrl)).map((post=>(0,api_post.wQ)(post)))}};var queryKey=__webpack_require__("./src/constants/queryKey.ts");const usePostList=(requiredOption,optionalOption)=>{const{postSorting,postStatus}=requiredOption,{categoryId,keyword}=optionalOption,{data,error,fetchNextPage,hasNextPage,isFetchingNextPage}=function useInfiniteQuery(arg1,arg2,arg3){const options=(0,utils._v)(arg1,arg2,arg3);return(0,useBaseQuery.r)(options,InfiniteQueryObserver)}([queryKey.l.POSTS,postSorting,postStatus,categoryId,keyword],(({pageParam=0})=>getPostList({...requiredOption,pageNumber:pageParam},optionalOption)),{getNextPageParam:lastPage=>{if(lastPage.postList.length===post.zV)return lastPage.pageNumber+1},suspense:!0});return{data,error,fetchNextPage,hasNextPage,isFetchingNextPage}},useIntersectionObserver=options=>{const[isIntersecting,setIsIntersecting]=(0,react.useState)(!1),targetRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{const target=targetRef.current;if(!target)return;const observer=new IntersectionObserver((([entry])=>{setIsIntersecting(entry.isIntersecting)}),options);return targetRef.current&&observer.observe(target),()=>{target&&observer.unobserve(target)}}),[options,targetRef]),{targetRef,isIntersecting}};try{useIntersectionObserver.displayName="useIntersectionObserver",useIntersectionObserver.__docgenInfo={description:"",displayName:"useIntersectionObserver",props:{root:{defaultValue:null,description:"",name:"root",required:!0,type:{name:"Element | Document | null"}},rootMargin:{defaultValue:null,description:"",name:"rootMargin",required:!0,type:{name:"string"}},thresholds:{defaultValue:null,description:"",name:"thresholds",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useIntersectionObserver.tsx#useIntersectionObserver"]={docgenInfo:useIntersectionObserver.__docgenInfo,name:"useIntersectionObserver",path:"src/hooks/useIntersectionObserver.tsx#useIntersectionObserver"})}catch(__react_docgen_typescript_loader_error){}var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),react_router_dom_dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),path=__webpack_require__("./src/constants/path.ts");const REQUEST_URL={[path.m.HOME]:post.JH.ALL,[path.m.POST_CATEGORY]:post.JH.CATEGORY,[path.m.USER_POST]:post.JH.MY_POST,[path.m.USER_VOTE]:post.JH.MY_VOTE,[path.m.SEARCH]:post.JH.SEARCH},usePostRequestInfo=()=>{const params=(0,dist.UO)(),[searchParams]=(0,react_router_dom_dist.lr)(),{pathname}=(0,dist.TH)(),categoryId=Number(params.categoryId??post.yE),keyword=searchParams.get(post.Kn)?.toString().slice(0,post.ko)??post.D,convertedPathname=(url=>{const pathList=url.split("/"),lastIndex=pathList.length-1;return Number(pathList[lastIndex])>0?(pathList.pop(),pathList.join("/")):url})(pathname),postType=REQUEST_URL[convertedPathname],postOptionalOption={categoryId,keyword};return postType?{postType,postOptionalOption}:{postType:REQUEST_URL[path.m.HOME],postOptionalOption}};var useSelect=__webpack_require__("./src/hooks/useSelect.tsx"),Post=__webpack_require__("./src/components/common/Post/index.tsx"),Select=__webpack_require__("./src/components/common/Select/index.tsx"),Skeleton=__webpack_require__("./src/components/common/Skeleton/index.tsx");const STATUS_OPTION={[post.Q_.ALL]:"전체",[post.Q_.PROGRESS]:"진행중",[post.Q_.CLOSED]:"마감완료"},SORTING_OPTION={[post.FQ.POPULAR]:"인기순",[post.FQ.LATEST]:"최신순"};var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
  width: 100px;

  position: absolute;

  &:first-child {
    left: 20px;
  }
  &:last-child {
    right: 20px;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function PostList(){const{postType,postOptionalOption}=usePostRequestInfo(),{targetRef,isIntersecting}=useIntersectionObserver({root:null,rootMargin:"",thresholds:.1}),{selectedOption:selectedStatusOption,handleOptionChange:handleStatusOptionChange}=(0,useSelect.L)(post.Q_.PROGRESS),{selectedOption:selectedSortingOption,handleOptionChange:handleSortingOptionChange}=(0,useSelect.L)(post.FQ.LATEST),{data,fetchNextPage,hasNextPage,isFetchingNextPage}=usePostList({postType,postSorting:selectedSortingOption,postStatus:selectedStatusOption},postOptionalOption);return(0,react.useEffect)((()=>{isIntersecting&&hasNextPage&&fetchNextPage()}),[isIntersecting,fetchNextPage,hasNextPage]),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(SelectContainer,{children:[(0,jsx_runtime.jsx)(SelectWrapper,{children:(0,jsx_runtime.jsx)(Select.Z,{handleOptionChange:handleStatusOptionChange,optionList:STATUS_OPTION,selectedOption:STATUS_OPTION[selectedStatusOption]})}),(0,jsx_runtime.jsx)(SelectWrapper,{children:(0,jsx_runtime.jsx)(Select.Z,{handleOptionChange:handleSortingOptionChange,optionList:SORTING_OPTION,selectedOption:SORTING_OPTION[selectedSortingOption]})})]}),(0,jsx_runtime.jsxs)(PostListContainer,{children:[data?.pages.map(((postListInfo,pageIndex)=>(0,jsx_runtime.jsx)(react.Fragment,{children:postListInfo.postList.map(((post,index)=>7===index?(0,jsx_runtime.jsx)("div",{ref:targetRef,children:(0,jsx_runtime.jsx)(Post.Z,{isPreview:!0,postInfo:post})},post.postId):(0,jsx_runtime.jsx)(Post.Z,{isPreview:!0,postInfo:post},post.postId)))},pageIndex))),isFetchingNextPage&&(0,jsx_runtime.jsx)(Skeleton.Z,{})]})]})}PostList.displayName="PostList"},"./src/constants/path.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>BASE_PATH,m:()=>PATH});const BASE_PATH={HOME:"/",LANDING:"/landing",LOGIN:"/login",POST:"/posts",USER:"/users",ADMIN:"/admin",SEARCH:"/search"},PATH={...BASE_PATH,POST_WRITE:`${BASE_PATH.POST}/write`,POST_VOTE_RESULT:`${BASE_PATH.POST}/result`,POST_CATEGORY:`${BASE_PATH.POST}/category`,USER_POST:`${BASE_PATH.USER}/posts`,USER_VOTE:`${BASE_PATH.USER}/votes`,USER_INFO:`${BASE_PATH.USER}/myPage`}},"./src/constants/post.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>DEFAULT_KEYWORD,Et:()=>POST_TITLE_MAX_LENGTH,FQ:()=>SORTING,It:()=>REQUEST_POST_KIND_URL,JH:()=>POST_TYPE,Kf:()=>REQUEST_STATUS_OPTION,Kn:()=>SEARCH_KEYWORD,Q_:()=>STATUS,ko:()=>SEARCH_KEYWORD_MAX_LENGTH,pl:()=>POST_DESCRIPTION_MAX_LENGTH,tL:()=>REQUEST_SORTING_OPTION,yE:()=>DEFAULT_CATEGORY_ID,zV:()=>POST_LIST_MAX_LENGTH});const STATUS={ALL:"all",PROGRESS:"progress",CLOSED:"closed"},SORTING={LATEST:"latest",POPULAR:"popular"},POST_TYPE={ALL:"posts",MY_POST:"myPost",MY_VOTE:"myVote",CATEGORY:"category",SEARCH:"search"},REQUEST_STATUS_OPTION={[STATUS.ALL]:"ALL",[STATUS.PROGRESS]:"PROGRESS",[STATUS.CLOSED]:"CLOSED"},REQUEST_SORTING_OPTION={[SORTING.LATEST]:"LATEST",[SORTING.POPULAR]:"HOT"},REQUEST_POST_KIND_URL={[POST_TYPE.ALL]:"posts",[POST_TYPE.MY_POST]:"posts/me",[POST_TYPE.MY_VOTE]:"posts/votes/me",[POST_TYPE.CATEGORY]:"posts/categories",[POST_TYPE.SEARCH]:"posts/search"},SEARCH_KEYWORD="keyword",POST_TITLE_MAX_LENGTH=100,POST_DESCRIPTION_MAX_LENGTH=1e3,SEARCH_KEYWORD_MAX_LENGTH=100,POST_LIST_MAX_LENGTH=10,DEFAULT_CATEGORY_ID=0,DEFAULT_KEYWORD=""},"./src/constants/queryKey.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>QUERY_KEY});const QUERY_KEY={POSTS:"posts",POST_DETAIL:"postDetail",COMMENTS:"comments",CATEGORIES:"categories",USER_INFO:"user_info"}},"./src/constants/vote.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>POST});const POST={NOT_VOTE:0}},"./src/hooks/context/auth.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>AuthContext});var react=__webpack_require__("./node_modules/react/index.js"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),fetch=__webpack_require__("./src/utils/fetch.ts");const getUserInfo=async()=>(userInfo=>{const{nickname,postCount,userPoint,voteCount,badge}=userInfo;return{nickname,postCount,userPoint,voteCount,badge}})(await(0,fetch.wY)("/members/me"));var queryKey=__webpack_require__("./src/constants/queryKey.ts");var cookie=__webpack_require__("./src/utils/cookie/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const notLoggedInfo={isLoggedIn:!1,accessToken:""},AuthContext=(0,react.createContext)({});function AuthProvider({children}){const[loggedInfo,setLoggedInfo]=(0,react.useState)(notLoggedInfo),{data:userInfo}=(isLogged=>{const{data,error,isLoading,isError}=(0,useQuery.a)([queryKey.l.USER_INFO,isLogged],getUserInfo);return{data,error,isLoading,isError}})(loggedInfo.isLoggedIn);return(0,react.useEffect)((()=>{userInfo&&loggedInfo.isLoggedIn&&setLoggedInfo((origin=>({...origin,userInfo})))}),[userInfo]),(0,react.useEffect)((()=>{const accessToken=(0,cookie.CL)().accessToken;accessToken&&setLoggedInfo((origin=>({...origin,accessToken,isLoggedIn:!0})))}),[]),(0,jsx_runtime.jsx)(AuthContext.Provider,{value:{loggedInfo,setLoggedInfo,clearLoggedInfo:()=>{setLoggedInfo(notLoggedInfo)}},children})}AuthProvider.displayName="AuthProvider";try{AuthProvider.displayName="AuthProvider",AuthProvider.__docgenInfo={description:"",displayName:"AuthProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/context/auth.tsx#AuthProvider"]={docgenInfo:AuthProvider.__docgenInfo,name:"AuthProvider",path:"src/hooks/context/auth.tsx#AuthProvider"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useSelect.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>useSelect});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useSelect=initialOption=>{const[selectedOption,setSelectedOption]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOption);return{selectedOption,handleOptionChange:option=>{setSelectedOption(option)}}};try{useSelect.displayName="useSelect",useSelect.__docgenInfo={description:"",displayName:"useSelect",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useSelect.tsx#useSelect"]={docgenInfo:useSelect.__docgenInfo,name:"useSelect",path:"src/hooks/useSelect.tsx#useSelect"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{header:100,modal:200}}},"./src/assets/chevron-down.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-down.f97a5bb1.svg"},"./src/assets/chevron-up.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-up.a1eb858b.svg"}}]);
//# sourceMappingURL=9708.32a6a62e.iframe.bundle.js.map