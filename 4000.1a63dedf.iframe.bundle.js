"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[4e3],{"./src/api/post.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Gi:()=>votePost,M8:()=>removePost,dq:()=>editPost,hQ:()=>changeVotedOption,qb:()=>createPost,xl:()=>getPost,yx:()=>setEarlyClosePost});var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/fetch.ts");const votePost=async(postId,optionId)=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.ZL)(`/posts/${postId}/options/${optionId}`,""),changeVotedOption=async(postId,optionData)=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.XH)(`/posts/${postId}/options?source=${optionData.originOptionId}&target=${optionData.newOptionId}`),getPost=async postId=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)(`/posts/${postId}`),createPost=async newPost=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.hO)("/posts",newPost),editPost=async(postId,updatedPost)=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.$V)(`/posts/${postId}`,updatedPost),removePost=async postId=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.Wq)(`/posts/${postId}`),setEarlyClosePost=async postId=>await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.XH)(`/posts/${postId}/close`)},"./src/components/common/Post/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Post});var post=__webpack_require__("./src/api/post.ts"),WrittenVoteOptionList=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/index.tsx"),path=__webpack_require__("./src/constants/path.ts"),vote=__webpack_require__("./src/constants/vote.ts"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.li`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Post({postInfo,isPreview}){const{postId,category,title,writer,startTime,endTime,content,voteInfo}=postInfo;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(DetailLink,{to:`${path.m.POST}/${postId}`,$isPreview:isPreview,children:[(0,jsx_runtime.jsx)(Category,{children:category.map((category=>category.name)).join(" | ")}),(0,jsx_runtime.jsx)(Title,{$isPreview:isPreview,children:title}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)("span",{children:writer.nickname}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)("span",{children:startTime}),(0,jsx_runtime.jsx)("span",{children:endTime})]})]}),(0,jsx_runtime.jsx)(Content,{$isPreview:isPreview,children:content})]}),(0,jsx_runtime.jsx)(WrittenVoteOptionList.Z,{selectedOptionId:voteInfo.selectedOptionId,handleVoteClick:newOptionId=>{voteInfo.selectedOptionId!==newOptionId&&(voteInfo.selectedOptionId!==vote.a.NOT_VOTE?(0,post.hQ)(postId,{originOptionId:voteInfo.selectedOptionId,newOptionId}):(0,post.Gi)(postId,newOptionId))},isPreview,voteOptionList:voteInfo.options})]})}Post.displayName="Post";try{Post.displayName="Post",Post.__docgenInfo={description:"",displayName:"Post",props:{postInfo:{defaultValue:null,description:"",name:"postInfo",required:!0,type:{name:"PostInfo"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Post/index.tsx#Post"]={docgenInfo:Post.__docgenInfo,name:"Post",path:"src/components/common/Post/index.tsx#Post"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Select/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Select});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg");const SELECT_SELECTED="selected",SELECT_DISABLED="disabled",SELECT_DEFAULT="default";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOption({handleVoteClick,text,isVoted,peopleCount,percent,isSelected,isPreview,imageUrl}){return(0,jsx_runtime.jsxs)(Container,{$isSelected:isSelected,onClick:handleVoteClick,children:[!isPreview&&imageUrl&&(0,jsx_runtime.jsx)(Image,{src:imageUrl,alt:text}),isPreview?(0,jsx_runtime.jsx)(PreviewContent,{children:text}):(0,jsx_runtime.jsx)(DetailContent,{children:text}),isVoted&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(ProgressContainer,{children:(0,jsx_runtime.jsx)(ProgressBar.Z,{percent,isSelected})}),(0,jsx_runtime.jsxs)(TextContainer,{children:[(0,jsx_runtime.jsxs)(PeopleText,{children:[peopleCount,"명"]}),(0,jsx_runtime.jsxs)(PercentText,{children:["(",percent.toFixed(1),"%)"]})]})]})]})}WrittenVoteOption.displayName="WrittenVoteOption";try{WrittenVoteOption.displayName="WrittenVoteOption",WrittenVoteOption.__docgenInfo={description:"",displayName:"WrittenVoteOption",props:{handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"() => void"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},isVoted:{defaultValue:null,description:"",name:"isVoted",required:!0,type:{name:"boolean"}},peopleCount:{defaultValue:null,description:"",name:"peopleCount",required:!0,type:{name:"number"}},percent:{defaultValue:null,description:"",name:"percent",required:!0,type:{name:"number"}},isSelected:{defaultValue:null,description:"",name:"isSelected",required:!0,type:{name:"boolean"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},imageUrl:{defaultValue:null,description:"",name:"imageUrl",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"]={docgenInfo:WrittenVoteOption.__docgenInfo,name:"WrittenVoteOption",path:"src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx#WrittenVoteOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WrittenVoteOptionList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WrittenVoteOptionList});var vote=__webpack_require__("./src/constants/vote.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const VoteOptionListContainer=styled_components_browser_esm.zo.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  @media (min-width: ${theme.r.breakpoint.md}) {
    gap: 18px;
  }
`;var WrittenVoteOption=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOptionList({isPreview,voteOptionList,selectedOptionId,handleVoteClick}){return(0,jsx_runtime.jsx)(VoteOptionListContainer,{children:voteOptionList.map((voteOption=>(0,jsx_runtime.jsx)(WrittenVoteOption.Z,{...voteOption,isPreview,isVoted:selectedOptionId!==vote.a.NOT_VOTE,isSelected:selectedOptionId===voteOption.id,handleVoteClick:()=>handleVoteClick(voteOption.id)},voteOption.id)))})}WrittenVoteOptionList.displayName="WrittenVoteOptionList";try{WrittenVoteOptionList.displayName="WrittenVoteOptionList",WrittenVoteOptionList.__docgenInfo={description:"",displayName:"WrittenVoteOptionList",props:{isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},selectedOptionId:{defaultValue:null,description:"",name:"selectedOptionId",required:!0,type:{name:"number"}},voteOptionList:{defaultValue:null,description:"",name:"voteOptionList",required:!0,type:{name:"WrittenVoteOptionType[]"}},handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"(newOptionId: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/index.tsx#WrittenVoteOptionList"]={docgenInfo:WrittenVoteOptionList.__docgenInfo,name:"WrittenVoteOptionList",path:"src/components/optionList/WrittenVoteOptionList/index.tsx#WrittenVoteOptionList"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/post/PostList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PostList});var react=__webpack_require__("./node_modules/react/index.js"),useInfiniteQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useInfiniteQuery.mjs"),post=__webpack_require__("./src/constants/post.ts"),fetch=__webpack_require__("./src/utils/fetch.ts");const getPostList=async(requiredOption,optionalOption)=>{const{pageNumber}=requiredOption,postListUrl=((requiredOption,optionalOption)=>{const{pageNumber,postSorting,postStatus,postType}=requiredOption,{categoryId,keyword}=optionalOption,requestedStatus=post.Kf[postStatus],requestedSorting=post.tL[postSorting],POST_BASE_URL=`/${post.It[postType]}`,OPTION_URL=`postClosingType=${requestedStatus}&postSortType=${requestedSorting}&page=${pageNumber}`;return categoryId>0&&postType===post.JH.CATEGORY?`${POST_BASE_URL}/${categoryId}?${OPTION_URL}`:postType===post.JH.SEARCH?`${POST_BASE_URL}?${post.Kn}=${keyword}&${OPTION_URL}`:`${POST_BASE_URL}?${OPTION_URL}`})(requiredOption,optionalOption);return{pageNumber,postList:await(0,fetch.wY)(postListUrl)}},usePostList=(requiredOption,optionalOption)=>{const{postSorting,postStatus}=requiredOption,{categoryId,keyword}=optionalOption,{data,error,fetchNextPage,hasNextPage,isFetchingNextPage}=(0,useInfiniteQuery.N)(["posts",postSorting,postStatus,categoryId,keyword],(({pageParam=0})=>getPostList({...requiredOption,pageNumber:pageParam},optionalOption)),{getNextPageParam:lastPage=>{if(lastPage.postList.length===post.zV)return lastPage.pageNumber+1}});return{data,error,fetchNextPage,hasNextPage,isFetchingNextPage}},useIntersectionObserver=options=>{const[isIntersecting,setIsIntersecting]=(0,react.useState)(!1),targetRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{const target=targetRef.current;if(!target)return;const observer=new IntersectionObserver((([entry])=>{setIsIntersecting(entry.isIntersecting)}),options);return targetRef.current&&observer.observe(target),()=>{target&&observer.unobserve(target)}}),[options,targetRef]),{targetRef,isIntersecting}};try{useIntersectionObserver.displayName="useIntersectionObserver",useIntersectionObserver.__docgenInfo={description:"",displayName:"useIntersectionObserver",props:{root:{defaultValue:null,description:"",name:"root",required:!0,type:{name:"Element | Document | null"}},rootMargin:{defaultValue:null,description:"",name:"rootMargin",required:!0,type:{name:"string"}},thresholds:{defaultValue:null,description:"",name:"thresholds",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useIntersectionObserver.tsx#useIntersectionObserver"]={docgenInfo:useIntersectionObserver.__docgenInfo,name:"useIntersectionObserver",path:"src/hooks/useIntersectionObserver.tsx#useIntersectionObserver"})}catch(__react_docgen_typescript_loader_error){}var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),react_router_dom_dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),path=__webpack_require__("./src/constants/path.ts");const REQUEST_URL={[path.m.HOME]:post.JH.ALL,[path.m.POST_CATEGORY]:post.JH.CATEGORY,[path.m.USER_POST]:post.JH.MY_POST,[path.m.USER_VOTE]:post.JH.MY_VOTE,[path.m.SEARCH]:post.JH.SEARCH},usePostRequestInfo=()=>{const params=(0,dist.UO)(),[searchParams]=(0,react_router_dom_dist.lr)(),{pathname}=(0,dist.TH)(),categoryId=Number(params.categoryId??0),keyword=searchParams.get(post.Kn)?.toString().slice(0,post.ko)??"",convertedPathname=(url=>{const pathList=url.split("/"),lastIndex=pathList.length-1;return Number(pathList[lastIndex])>0?(pathList.pop(),pathList.join("/")):url})(pathname),postType=REQUEST_URL[convertedPathname],postOptionalOption={categoryId,keyword};return postType?{postType,postOptionalOption}:{postType:REQUEST_URL[path.m.HOME],postOptionalOption}};var useSelect=__webpack_require__("./src/hooks/useSelect.tsx"),Post=__webpack_require__("./src/components/common/Post/index.tsx"),Select=__webpack_require__("./src/components/common/Select/index.tsx"),Skeleton=__webpack_require__("./src/components/common/Skeleton/index.tsx");const STATUS_OPTION={[post.Q_.ALL]:"전체",[post.Q_.PROGRESS]:"진행중",[post.Q_.CLOSED]:"마감완료"},SORTING_OPTION={[post.FQ.POPULAR]:"인기순",[post.FQ.LATEST]:"최신순"};var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function PostList(){const{postType,postOptionalOption}=usePostRequestInfo(),{targetRef,isIntersecting}=useIntersectionObserver({root:null,rootMargin:"",thresholds:.1}),{selectedOption:selectedStatusOption,handleOptionChange:handleStatusOptionChange}=(0,useSelect.L)(post.Q_.PROGRESS),{selectedOption:selectedSortingOption,handleOptionChange:handleSortingOptionChange}=(0,useSelect.L)(post.FQ.LATEST),{data,fetchNextPage,hasNextPage,isFetchingNextPage}=usePostList({postType,postSorting:selectedSortingOption,postStatus:selectedStatusOption},postOptionalOption);return(0,react.useEffect)((()=>{isIntersecting&&hasNextPage&&fetchNextPage()}),[isIntersecting,fetchNextPage,hasNextPage]),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(SelectContainer,{children:[(0,jsx_runtime.jsx)(SelectWrapper,{children:(0,jsx_runtime.jsx)(Select.Z,{handleOptionChange:handleStatusOptionChange,optionList:STATUS_OPTION,selectedOption:STATUS_OPTION[selectedStatusOption]})}),(0,jsx_runtime.jsx)(SelectWrapper,{children:(0,jsx_runtime.jsx)(Select.Z,{handleOptionChange:handleSortingOptionChange,optionList:SORTING_OPTION,selectedOption:SORTING_OPTION[selectedSortingOption]})})]}),(0,jsx_runtime.jsxs)(PostListContainer,{children:[data?.pages.map(((postListInfo,pageIndex)=>(0,jsx_runtime.jsx)(react.Fragment,{children:postListInfo.postList.map(((post,index)=>7===index?(0,jsx_runtime.jsx)("div",{ref:targetRef,children:(0,jsx_runtime.jsx)(Post.Z,{isPreview:!0,postInfo:post})},post.postId):(0,jsx_runtime.jsx)(Post.Z,{isPreview:!0,postInfo:post},post.postId)))},pageIndex))),isFetchingNextPage&&(0,jsx_runtime.jsx)(Skeleton.Z,{})]})]})}PostList.displayName="PostList"},"./src/constants/post.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Et:()=>POST_TITLE_MAX_LENGTH,FQ:()=>SORTING,It:()=>REQUEST_POST_KIND_URL,JH:()=>POST_TYPE,Kf:()=>REQUEST_STATUS_OPTION,Kn:()=>SEARCH_KEYWORD,Q_:()=>STATUS,ko:()=>SEARCH_KEYWORD_MAX_LENGTH,pl:()=>POST_DESCRIPTION_MAX_LENGTH,tL:()=>REQUEST_SORTING_OPTION,zV:()=>POST_LIST_MAX_LENGTH});const STATUS={ALL:"all",PROGRESS:"progress",CLOSED:"closed"},SORTING={LATEST:"latest",POPULAR:"popular"},POST_TYPE={ALL:"posts",MY_POST:"myPost",MY_VOTE:"myVote",CATEGORY:"category",SEARCH:"search"},REQUEST_STATUS_OPTION={[STATUS.ALL]:"ALL",[STATUS.PROGRESS]:"PROGRESS",[STATUS.CLOSED]:"CLOSED"},REQUEST_SORTING_OPTION={[SORTING.LATEST]:"LATEST",[SORTING.POPULAR]:"HOT"},REQUEST_POST_KIND_URL={[POST_TYPE.ALL]:"posts",[POST_TYPE.MY_POST]:"posts/me",[POST_TYPE.MY_VOTE]:"posts/votes/me",[POST_TYPE.CATEGORY]:"posts/categories",[POST_TYPE.SEARCH]:"posts/search"},SEARCH_KEYWORD="keyword",POST_TITLE_MAX_LENGTH=100,POST_DESCRIPTION_MAX_LENGTH=1e3,SEARCH_KEYWORD_MAX_LENGTH=100,POST_LIST_MAX_LENGTH=10},"./src/constants/vote.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>POST});const POST={NOT_VOTE:0}},"./src/hooks/useSelect.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>useSelect});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useSelect=initialOption=>{const[selectedOption,setSelectedOption]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOption);return{selectedOption,handleOptionChange:option=>{setSelectedOption(option)}}};try{useSelect.displayName="useSelect",useSelect.__docgenInfo={description:"",displayName:"useSelect",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useSelect.tsx#useSelect"]={docgenInfo:useSelect.__docgenInfo,name:"useSelect",path:"src/hooks/useSelect.tsx#useSelect"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=4000.1a63dedf.iframe.bundle.js.map