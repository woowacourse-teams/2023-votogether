"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[5569],{"./src/components/common/Post/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Post});var react=__webpack_require__("./node_modules/react/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),post=__webpack_require__("./src/api/post.ts"),constants_queryKey=__webpack_require__("./src/constants/queryKey.ts");const useCreateVote=({isPreview,postId})=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isError,error}=(0,useMutation.D)({mutationFn:optionId=>(0,post.Gi)(postId,optionId),onSuccess:()=>{queryClient.invalidateQueries([constants_queryKey.l.USER_INFO,!0]),isPreview?queryClient.invalidateQueries({predicate:({queryKey})=>queryKey[0]===constants_queryKey.l.POSTS}):queryClient.invalidateQueries([constants_queryKey.l.POST_DETAIL,postId,true])},onError:error=>{window.console.log("투표 선택지 생성에 실패했습니다.",error)}});return{mutate,isError,error}},useEditVote=({isPreview,postId})=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isError,error}=(0,useMutation.D)({mutationFn:optionData=>(0,post.hQ)(postId,optionData),onSuccess:()=>{isPreview?queryClient.invalidateQueries({predicate:({queryKey})=>queryKey[0]===constants_queryKey.l.POSTS}):queryClient.invalidateQueries([constants_queryKey.l.POST_DETAIL,postId,true])},onError:error=>{window.console.log("투표 선택지 생성에 실패했습니다.",error)}});return{mutate,isError,error}};var useToast=__webpack_require__("./src/hooks/useToast.ts"),WrittenVoteOptionList=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/index.tsx"),path=__webpack_require__("./src/constants/path.ts");const POST={NOT_VOTE:0};var convertImageUrlToServerUrl=__webpack_require__("./src/utils/post/convertImageUrlToServerUrl.ts"),time=__webpack_require__("./src/utils/time.ts"),photo_white=__webpack_require__("./src/assets/photo_white.svg"),Toast=__webpack_require__("./src/components/common/Toast/index.tsx"),dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.li`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Post({postInfo,isPreview}){const{postId,category,imageUrl,title,writer,createTime,deadline,content,voteInfo}=postInfo,{loggedInfo}=(0,react.useContext)(auth.V),{isToastOpen,openToast,toastMessage}=(0,useToast.p)(),{mutate:createVote,isError:isCreateError,error:createError}=useCreateVote({isPreview,postId}),{mutate:editVote,isError:isEditError,error:editError}=useEditVote({isPreview,postId}),isActive=!(0,time.gr)(deadline),isStatisticsVisible=writer.id===loggedInfo.id||!isActive||voteInfo.selectedOptionId!==POST.NOT_VOTE;(0,react.useEffect)((()=>{isCreateError&&createError instanceof Error&&openToast(createError.message)}),[isCreateError,createError]),(0,react.useEffect)((()=>{isEditError&&editError instanceof Error&&openToast(editError.message)}),[isEditError,editError]);const isPreviewTabIndex=isPreview?void 0:0;return(0,jsx_runtime.jsxs)(Container,{as:isPreview?"li":"div",children:[(0,jsx_runtime.jsxs)(DetailLink,{as:isPreview?"":"main",to:isPreview?`${path.m.POST}/${postId}`:"#",$isPreview:isPreview,onClick:e=>{isPreview||e.preventDefault()},"aria-describedby":isPreview?"해당 게시물의 상세페이지로 이동하기":"현재 상세페이지이므로 사용할 수 없습니다.",children:[(0,jsx_runtime.jsx)(Category,{tabIndex:isPreviewTabIndex,"aria-label":`카테고리 ${category.map((category=>category.name)).join("|")}`,children:category.map((category=>category.name)).join(" | ")}),isPreview&&(""!==imageUrl||voteInfo.options.map((option=>option.imageUrl)).some((url=>""!==url)))&&(0,jsx_runtime.jsx)(ImageIconWrapper,{children:(0,jsx_runtime.jsx)(ImageIcon,{src:photo_white,alt:"해당 게시물은 사진을 포함하고 있습니다."})}),(0,jsx_runtime.jsx)(ActivateState,{tabIndex:isPreviewTabIndex,role:"status","aria-label":"게시글 "+(isActive?"진행중":"마감완료"),$isActive:isActive}),(0,jsx_runtime.jsx)(Title,{tabIndex:isPreviewTabIndex,"aria-label":`게시글 제목: ${title}`,$isPreview:isPreview,children:title}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)("span",{"aria-label":`작성자 ${writer.nickname}`,tabIndex:isPreviewTabIndex,children:writer.nickname}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)("span",{"aria-label":`작성일시 ${(0,time.Ox)(createTime)}`,tabIndex:isPreviewTabIndex,children:(0,time.Ox)(createTime)}),(0,jsx_runtime.jsx)("span",{"aria-label":`투표 마감일시 ${isActive?(0,time.Ox)(deadline):"마감 완료"}`,tabIndex:isPreviewTabIndex,children:isActive?(0,time.Ox)(deadline):"마감 완료"})]})]}),(0,jsx_runtime.jsx)(Content,{tabIndex:isPreviewTabIndex,"aria-label":`내용: ${content}`,$isPreview:isPreview,children:content}),!isPreview&&imageUrl&&(0,jsx_runtime.jsx)(Image,{src:(0,convertImageUrlToServerUrl.B)(imageUrl),alt:"본문에 포함된 이미지"})]}),(0,jsx_runtime.jsx)(WrittenVoteOptionList.Z,{isStatisticsVisible,selectedOptionId:voteInfo.selectedOptionId,handleVoteClick:newOptionId=>{loggedInfo.isLoggedIn?isActive?writer.nickname!==loggedInfo.userInfo?.nickname?voteInfo.selectedOptionId!==newOptionId&&(voteInfo.selectedOptionId!==POST.NOT_VOTE?editVote({originOptionId:voteInfo.selectedOptionId,newOptionId}):createVote(newOptionId)):openToast("내가 쓴 글에는 투표를 할 수 없습니다."):openToast("마감된 게시글에는 투표를 할 수 없습니다."):openToast("투표는 로그인 후에 이용하실 수 있습니다.")},isPreview,voteOptionList:voteInfo.options}),isToastOpen&&(0,jsx_runtime.jsx)(Toast.Z,{size:"md",position:"bottom",children:toastMessage})]})}Post.displayName="Post";try{Post.displayName="Post",Post.__docgenInfo={description:"",displayName:"Post",props:{postInfo:{defaultValue:null,description:"",name:"postInfo",required:!0,type:{name:"PostInfo"}},isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Post/index.tsx#Post"]={docgenInfo:Post.__docgenInfo,name:"Post",path:"src/components/common/Post/index.tsx#Post"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/ProgressBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ProgressBar});__webpack_require__("./node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`;var WrittenVoteOption=__webpack_require__("./src/components/optionList/WrittenVoteOptionList/WrittenVoteOption/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WrittenVoteOptionList({isPreview,isStatisticsVisible,voteOptionList,selectedOptionId,handleVoteClick}){return(0,jsx_runtime.jsx)(VoteOptionListContainer,{"aria-label":"투표 선택지",children:voteOptionList.map(((voteOption,index)=>{const isSelected=selectedOptionId===voteOption.id;return(0,jsx_runtime.jsx)(WrittenVoteOption.Z,{ariaLabel:`선택지 내용: ${voteOption.text}, 선택지 순서: ${index+1}번 , \n            ${isStatisticsVisible?`투표한 인원: ${voteOption.peopleCount}명, 전체 투표 중 차지 비율: ${voteOption.percent}%, `:""}\n            ${isSelected?"투표 완료한 선택지 상태":"투표하지 않은 선택지 상태"}\n            `,...voteOption,isPreview,isStatisticsVisible,isSelected,handleVoteClick:()=>handleVoteClick(voteOption.id)},voteOption.id)}))})}WrittenVoteOptionList.displayName="WrittenVoteOptionList";try{WrittenVoteOptionList.displayName="WrittenVoteOptionList",WrittenVoteOptionList.__docgenInfo={description:"",displayName:"WrittenVoteOptionList",props:{isPreview:{defaultValue:null,description:"",name:"isPreview",required:!0,type:{name:"boolean"}},isStatisticsVisible:{defaultValue:null,description:"",name:"isStatisticsVisible",required:!0,type:{name:"boolean"}},selectedOptionId:{defaultValue:null,description:"",name:"selectedOptionId",required:!0,type:{name:"number"}},voteOptionList:{defaultValue:null,description:"",name:"voteOptionList",required:!0,type:{name:"WrittenVoteOptionType[]"}},handleVoteClick:{defaultValue:null,description:"",name:"handleVoteClick",required:!0,type:{name:"(newOptionId: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WrittenVoteOptionList/index.tsx#WrittenVoteOptionList"]={docgenInfo:WrittenVoteOptionList.__docgenInfo,name:"WrittenVoteOptionList",path:"src/components/optionList/WrittenVoteOptionList/index.tsx#WrittenVoteOptionList"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/post/convertImageUrlToServerUrl.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>convertImageUrlToServerUrl,X:()=>convertServerUrlToImageUrl});var _constants_post__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/constants/post.ts");const convertImageUrlToServerUrl=imageUrl=>`${_constants_post__WEBPACK_IMPORTED_MODULE_0__.f_}${imageUrl}`,convertServerUrlToImageUrl=imageUrl=>imageUrl.replace(_constants_post__WEBPACK_IMPORTED_MODULE_0__.f_,"")},"./src/utils/post/formatTime.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function addTimeToDate(addTime,baseTime){const{day,hour,minute}=addTime;if(0===day&&0===hour&&0===minute)return;const newTime=new Date(baseTime);newTime.setDate(baseTime.getDate()+day),newTime.setHours(baseTime.getHours()+hour),newTime.setMinutes(baseTime.getMinutes()+minute);const newYear=newTime.getFullYear(),newDay=String(newTime.getDate()).padStart(2,"0");return`${newYear}-${String(newTime.getMonth()+1).padStart(2,"0")}-${newDay} ${String(newTime.getHours()).padStart(2,"0")}:${String(newTime.getMinutes()).padStart(2,"0")}`}function formatTimeWithOption(option){return"10분"===option?{day:0,hour:0,minute:10}:"30분"===option?{day:0,hour:0,minute:30}:"1시간"===option?{day:0,hour:1,minute:0}:"6시간"===option?{day:0,hour:6,minute:0}:{day:1,hour:0,minute:0}}__webpack_require__.d(__webpack_exports__,{G:()=>addTimeToDate,M:()=>formatTimeWithOption})},"./src/utils/time.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ox:()=>convertTimeToWord,Tp:()=>checkIrreplaceableTime,gr:()=>checkClosedPost});var _post_formatTime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/post/formatTime.ts");const convertNowTimeToNumber=()=>{const now=new Date,year=now.getFullYear(),month=String(now.getMonth()+1).padStart(2,"0"),day=String(now.getDate()).padStart(2,"0"),hours=String(now.getHours()).padStart(2,"0"),minutes=String(now.getMinutes()).padStart(2,"0");return Number(`${year}${month}${day}${hours}${minutes}`)},convertTimeFromStringToNumber=date=>{const dateComponents=date.split(" "),datePieces=dateComponents[0].split("-"),timePieces=dateComponents[1].split(":");return Number([...datePieces,...timePieces].join(""))},checkClosedPost=deadline=>convertNowTimeToNumber()>=convertTimeFromStringToNumber(deadline),checkIrreplaceableTime=(addTime,createTime)=>{const changedDeadline=(0,_post_formatTime__WEBPACK_IMPORTED_MODULE_0__.G)(addTime,new Date(createTime));if(!changedDeadline)return!0;const limitDeadline=(0,_post_formatTime__WEBPACK_IMPORTED_MODULE_0__.G)({day:3,hour:0,minute:0},new Date(createTime)),changedDeadlineNumber=convertTimeFromStringToNumber(changedDeadline);return changedDeadlineNumber>=convertTimeFromStringToNumber(limitDeadline)||changedDeadlineNumber<=convertNowTimeToNumber()},time_hour=24,time_minute=60,convertTimeToWord=date=>{const targetDate=new Date(date),currentDate=new Date,timeDifference=Math.floor((targetDate.getTime()-currentDate.getTime())/6e4);if(0===timeDifference)return"지금";const afterBefore=timeDifference>0?"후 마감":"전 작성 |",positiveTimeDifference=Math.abs(timeDifference);return Math.round(positiveTimeDifference/(time_hour*time_minute))>0?`${Math.round(positiveTimeDifference/(time_hour*time_minute))}일 ${afterBefore}`:Math.round(positiveTimeDifference/time_minute)>0?`${Math.round(positiveTimeDifference/time_minute)}시간 ${afterBefore}`:`${positiveTimeDifference}분 ${afterBefore}`}},"./src/assets/photo_white.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/photo_white.830f687b.svg"}}]);
//# sourceMappingURL=5569.7984af34.iframe.bundle.js.map