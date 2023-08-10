"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[3278],{"./node_modules/@tanstack/react-query/build/lib/useMutation.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>useMutation});var react=__webpack_require__("./node_modules/react/index.js"),useSyncExternalStore=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),mutation=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/mutation.mjs"),notifyManager=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs"),subscribable=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");class MutationObserver extends subscribable.l{constructor(client,options){super(),this.client=client,this.setOptions(options),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(options){var _this$currentMutation;const prevOptions=this.options;this.options=this.client.defaultMutationOptions(options),(0,utils.VS)(prevOptions,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(_this$currentMutation=this.currentMutation)||_this$currentMutation.setOptions(this.options)}onUnsubscribe(){var _this$currentMutation2;this.hasListeners()||(null==(_this$currentMutation2=this.currentMutation)||_this$currentMutation2.removeObserver(this))}onMutationUpdate(action){this.updateResult();const notifyOptions={listeners:!0};"success"===action.type?notifyOptions.onSuccess=!0:"error"===action.type&&(notifyOptions.onError=!0),this.notify(notifyOptions)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(variables,options){return this.mutateOptions=options,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:void 0!==variables?variables:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){const state=this.currentMutation?this.currentMutation.state:(0,mutation.R)(),result={...state,isLoading:"loading"===state.status,isSuccess:"success"===state.status,isError:"error"===state.status,isIdle:"idle"===state.status,mutate:this.mutate,reset:this.reset};this.currentResult=result}notify(options){notifyManager.V.batch((()=>{var _this$mutateOptions$o,_this$mutateOptions,_this$mutateOptions$o2,_this$mutateOptions2;if(this.mutateOptions&&this.hasListeners())if(options.onSuccess)null==(_this$mutateOptions$o=(_this$mutateOptions=this.mutateOptions).onSuccess)||_this$mutateOptions$o.call(_this$mutateOptions,this.currentResult.data,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o2=(_this$mutateOptions2=this.mutateOptions).onSettled)||_this$mutateOptions$o2.call(_this$mutateOptions2,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context);else if(options.onError){var _this$mutateOptions$o3,_this$mutateOptions3,_this$mutateOptions$o4,_this$mutateOptions4;null==(_this$mutateOptions$o3=(_this$mutateOptions3=this.mutateOptions).onError)||_this$mutateOptions$o3.call(_this$mutateOptions3,this.currentResult.error,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o4=(_this$mutateOptions4=this.mutateOptions).onSettled)||_this$mutateOptions$o4.call(_this$mutateOptions4,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context)}options.listeners&&this.listeners.forEach((({listener})=>{listener(this.currentResult)}))}))}}var QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),lib_utils=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/utils.mjs");function useMutation(arg1,arg2,arg3){const options=(0,utils.lV)(arg1,arg2,arg3),queryClient=(0,QueryClientProvider.NL)({context:options.context}),[observer]=react.useState((()=>new MutationObserver(queryClient,options)));react.useEffect((()=>{observer.setOptions(options)}),[observer,options]);const result=(0,useSyncExternalStore.$)(react.useCallback((onStoreChange=>observer.subscribe(notifyManager.V.batchCalls(onStoreChange))),[observer]),(()=>observer.getCurrentResult()),(()=>observer.getCurrentResult())),mutate=react.useCallback(((variables,mutateOptions)=>{observer.mutate(variables,mutateOptions).catch(noop)}),[observer]);if(result.error&&(0,lib_utils.L)(observer.options.useErrorBoundary,[result.error]))throw result.error;return{...result,mutate,mutateAsync:result.mutate}}function noop(){}},"./src/components/PostForm/PostForm.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NewPost:()=>NewPost,OldPost:()=>OldPost,__namedExportsOrder:()=>__namedExportsOrder,default:()=>PostForm_stories});var QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),api_post=__webpack_require__("./src/api/post.ts"),queryKey=__webpack_require__("./src/constants/queryKey.ts");var react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),useCategoryList=__webpack_require__("./src/hooks/query/category/useCategoryList.ts"),constants=__webpack_require__("./src/components/PostForm/constants.ts");var useMultiSelect=__webpack_require__("./src/hooks/useMultiSelect.ts"),useText=__webpack_require__("./src/hooks/useText.ts"),useToggle=__webpack_require__("./src/hooks/useToggle.tsx"),useWritingOption=__webpack_require__("./src/hooks/useWritingOption.tsx"),Modal=__webpack_require__("./src/components/common/Modal/index.tsx"),MultiSelect=__webpack_require__("./src/components/common/MultiSelect/index.tsx"),NarrowTemplateHeader=__webpack_require__("./src/components/common/NarrowTemplateHeader/index.tsx"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),TimePickerOptionList=__webpack_require__("./src/components/common/TimePickerOptionList/index.tsx"),WritingVoteOptionList=__webpack_require__("./src/components/optionList/WritingVoteOptionList/index.tsx"),post=__webpack_require__("./src/constants/post.ts");function addTimeToDate(addTime,baseTime){const{day,hour,minute}=addTime;if(0===day&&0===hour&&0===minute)return;const newTime=new Date(baseTime);newTime.setDate(baseTime.getDate()+day),newTime.setHours(baseTime.getHours()+hour),newTime.setMinutes(baseTime.getMinutes()+minute);const newYear=newTime.getFullYear(),newDay=String(newTime.getDate()).padStart(2,"0");return`${newYear}-${String(newTime.getMonth()+1).padStart(2,"0")}-${newDay} ${String(newTime.getHours()).padStart(2,"0")}:${String(newTime.getMinutes()).padStart(2,"0")}`}const getDeadlineTime=({day,hour,minute})=>{const timeMessage=[];return day<0||hour<0||minute<0?"마감 시간을 다시 설정해주세요":0===day&&0===hour&&0===minute?"마감 시간을 선택해주세요":(day>0&&timeMessage.push(`${day}일`),hour>0&&timeMessage.push(`${hour}시간`),minute>0&&timeMessage.push(`${minute}분`),`${timeMessage.join(" ")} 후에 마감됩니다.`)};var OptionCancelButton=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const ContentImageContainer=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-columns: 40px auto;
`,imageSize={sm:"25%",md:"50%",lg:"100%"},ContentImageWrapper=styled_components_browser_esm.zo.div`
  width: ${props=>imageSize[props.$size]};
  height: 100%;

  position: relative;
`,ContentImage=styled_components_browser_esm.zo.img`
  width: 100%;
  border-radius: 4px;

  aspect-ratio: 1/1;
  object-fit: cover;
`,FileInputContainer=styled_components_browser_esm.zo.div`
  width: 100%;
  border-radius: 50%;
`,FileInput=styled_components_browser_esm.zo.input`
  visibility: hidden;
`,Label=styled_components_browser_esm.zo.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  padding: 5px 0;

  background-color: var(--primary-color);
  color: var(--white);

  font: var(--text-body);
  text-align: center;

  visibility: ${props=>props.$isVisible?"hidden":""};
  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ContentImageSection({contentImageHook,size}){const{contentImage,removeImage,handleUploadImage}=contentImageHook;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[contentImage&&(0,jsx_runtime.jsxs)(ContentImageContainer,{children:[(0,jsx_runtime.jsx)(OptionCancelButton.Z,{onClick:removeImage}),(0,jsx_runtime.jsx)(ContentImageWrapper,{$size:size,children:(0,jsx_runtime.jsx)(ContentImage,{src:contentImage,alt:"본문에 포함된 사진"})})]}),(0,jsx_runtime.jsxs)(FileInputContainer,{children:[(0,jsx_runtime.jsx)(Label,{htmlFor:"content-image-upload","aria-label":"본문 이미지 업로드 버튼",title:"이미지 업로드",$isVisible:!!contentImage,children:"본문에 사진 넣기"}),(0,jsx_runtime.jsx)(FileInput,{id:"content-image-upload",type:"file",accept:"image/*",onChange:handleUploadImage})]})]})}try{ContentImageSection.displayName="ContentImageSection",ContentImageSection.__docgenInfo={description:"",displayName:"ContentImageSection",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},contentImageHook:{defaultValue:null,description:"",name:"contentImageHook",required:!0,type:{name:"{ contentImage: string; removeImage: () => void; handleUploadImage: (event: ChangeEvent<HTMLInputElement>) => void; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/PostForm/ContentImageSection/index.tsx#ContentImageSection"]={docgenInfo:ContentImageSection.__docgenInfo,name:"ContentImageSection",path:"src/components/PostForm/ContentImageSection/index.tsx#ContentImageSection"})}catch(__react_docgen_typescript_loader_error){}var theme=__webpack_require__("./src/styles/theme.ts");const HeaderWrapper=styled_components_browser_esm.zo.div`
  width: 100%;

  position: fixed;
  left: 0;

  z-index: ${theme.r.zIndex.header};

  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: none;
  }
`,HeaderButton=styled_components_browser_esm.zo.button`
  width: 30px;

  color: white;

  cursor: pointer;
`,Wrapper=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  padding: 70px 10px 20px 10px;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    grid-template-columns: 2fr 1fr;
    gap: 30px;

    padding: 30px 40px 20px 40px;
  }

  @media (min-width: ${theme.r.breakpoint.md}) {
    grid-template-columns: 1fr 300px;
    padding: 30px 80px 20px 8cqb;
  }

  @media (min-width: ${theme.r.breakpoint.lg}) {
    grid-template-columns: 1fr 400px;
  }
`,LeftSide=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: grid;
    grid-template-rows: max-content max-content minmax(max-content, 1fr) max-content;

    height: calc(100vh - 130px);

    overflow-y: ${({$hasImage})=>$hasImage&&"scroll"};
  }
`,Title=styled_components_browser_esm.zo.input`
  padding: 10px;

  color: gray;

  font: var(--text-title);

  @media (min-width: ${theme.r.breakpoint.md}) {
    font-size: 2.4rem;
  }

  @media (min-width: ${theme.r.breakpoint.lg}) {
    font-size: 2.8rem;
    line-height: 3.6rem;
  }
`,Content=styled_components_browser_esm.zo.textarea`
  min-height: 300px;
  padding: 10px;
  margin-bottom: 10px;

  color: gray;

  resize: none;

  font: var(--text-caption);
  font-family: 'Raleway', sans-serif;

  @media (min-width: ${theme.r.breakpoint.md}) {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }

  @media (min-width: ${theme.r.breakpoint.lg}) {
    font-size: 2rem;
    line-height: 2.8rem;
  }
`,ContentImagePartWrapper=styled_components_browser_esm.zo.div`
  justify-self: ${props=>props.$hasImage&&"center"};
  height: 100%;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    max-width: ${({$hasImage})=>$hasImage&&"800px"};
    width: ${({$hasImage})=>$hasImage&&"80%"};
  }
`,RightSide=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-rows: auto max-content max-content;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    height: calc(100vh - 130px);
  }
`,OptionListWrapper=styled_components_browser_esm.zo.div`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  overflow-x: hidden;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    overflow-y: auto;
  }
`,Deadline=styled_components_browser_esm.zo.div`
  font: var(--text-body);
  font-weight: bold;
  text-align: center;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    margin: 10px 0;
  }
`,DeadlineDescription=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;

  margin: 10px 0;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    margin: 10px 0;
    min-height: 40px;
  }
`,Description=styled_components_browser_esm.zo.div`
  color: gray;

  font: var(--text-small);
`,ButtonWrapper=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 46px);
  gap: 10px;

  margin-bottom: 30px;
`,SaveButtonWrapper=styled_components_browser_esm.zo.div`
  display: none;

  visibility: hidden;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: flex;

    width: 100%;
    height: 60px;

    visibility: visible;
  }
`,ModalHeader=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  padding: 10px;

  font: var(--text-body);
  font-weight: bold;
`,CloseButton=styled_components_browser_esm.zo.button`
  width: 25px;
  height: 20px;

  background: white;

  font: var(--text-body);

  cursor: pointer;
`,ModalBody=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  align-items: center;
  gap: 10px;

  padding: 10px 0;

  font: var(--text-caption);
`,ResetButtonWrapper=styled_components_browser_esm.zo.div`
  display: flex;

  justify-content: center;
  align-items: center;

  width: 50%;
  height: 40px;
`;function PostForm({data,mutate,isError,error}){const{title,content,category:categoryIds,createTime,deadline,voteInfo,imageUrl}=data??{},navigate=(0,dist.s0)(),writingOptionHook=(0,useWritingOption.$)(voteInfo?.options),contentImageHook=((imageUrl="")=>{const[contentImage,setContentImage]=(0,react.useState)(imageUrl);return{contentImage,removeImage:()=>{setContentImage("")},handleUploadImage:event=>{const{files}=event.target;if(!files)return;const file=files[0];if(event.target.setCustomValidity(""),file.size>constants.T)return event.target.setCustomValidity("사진의 용량은 5MB 이하만 가능합니다."),void event.target.reportValidity();const reader=new FileReader;reader.readAsDataURL(file),reader.onloadend=()=>{setContentImage(reader.result?.toString()??"")}}}})(imageUrl),{isLoggedIn:isLogged}=(0,react.useContext)(auth.V).loggedInfo,{data:categoryList}=(0,useCategoryList.J)(isLogged),{isOpen,openComponent,closeComponent}=(0,useToggle.O)(),[time,setTime]=(0,react.useState)({day:0,hour:0,minute:0}),baseTime=createTime?new Date(createTime):new Date,{text:writingTitle,handleTextChange:handleTitleChange}=(0,useText.X)(title??""),{text:writingContent,handleTextChange:handleContentChange}=(0,useText.X)(content??""),{selectedOptionList,handleOptionAdd,handleOptionDelete}=(0,useMultiSelect.A)(categoryIds??[],3),categoryOptionList=(categoryList=>categoryList.map((category=>({id:category.id,name:category.name}))))(categoryList??[]);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(HeaderWrapper,{children:(0,jsx_runtime.jsxs)(NarrowTemplateHeader.Z,{children:[(0,jsx_runtime.jsx)(HeaderButton,{onClick:()=>navigate("/"),children:"취소"}),(0,jsx_runtime.jsx)(HeaderButton,{type:"submit",form:"form-post",children:"저장"})]})}),(0,jsx_runtime.jsxs)("form",{id:"form-post",onSubmit:e=>{e.preventDefault();const formData=new FormData,imageUrlList=[contentImageHook.contentImage,...writingOptionHook.optionList.map((option=>option.imageUrl))];if(e.target instanceof HTMLFormElement){const fileInputList=[...e.target.querySelectorAll('input[type="file"]')],contentImageFileList=[],optionImageFileList=[];fileInputList.forEach(((item,index)=>{item.files&&(""===imageUrlList[index]?0===index?contentImageFileList.push(new File(["없는사진"],"없는사진.jpg")):optionImageFileList.push(new File(["없는사진"],"없는사진.jpg")):0===index?contentImageFileList.push(item.files[0]):optionImageFileList.push(item.files[0]))})),contentImageFileList.map((file=>formData.append("contentImages",file))),optionImageFileList.map((file=>formData.append("optionImages",file)));const writingOptionList=writingOptionHook.optionList.map((({text,imageUrl},index)=>({content:text,imageUrl}))),updatedPostTexts={categoryIds:selectedOptionList.map((option=>option.id)),title:writingTitle??"",imageUrl:imageUrl??"",content:writingContent??"",postOptions:writingOptionList,deadline:addTimeToDate(time,baseTime)};formData.append("request",JSON.stringify(updatedPostTexts)),mutate(formData)}},children:[(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsxs)(LeftSide,{$hasImage:!!contentImageHook.contentImage,children:[(0,jsx_runtime.jsx)(MultiSelect.Z,{selectedOptionList,optionList:categoryOptionList,handleOptionAdd,handleOptionDelete,placeholder:"카테고리를 선택해주세요."}),(0,jsx_runtime.jsx)(Title,{value:writingTitle,onChange:e=>handleTitleChange(e,post.Et),placeholder:"제목을 입력해주세요",maxLength:100,required:!0}),(0,jsx_runtime.jsx)(Content,{value:writingContent,onChange:e=>handleContentChange(e,post.pl),placeholder:"내용을 입력해주세요",maxLength:1e3,required:!0}),(0,jsx_runtime.jsx)(ContentImagePartWrapper,{$hasImage:!!contentImageHook.contentImage,children:(0,jsx_runtime.jsx)(ContentImageSection,{size:"lg",contentImageHook})})]}),(0,jsx_runtime.jsxs)(RightSide,{children:[(0,jsx_runtime.jsx)(OptionListWrapper,{children:(0,jsx_runtime.jsx)(WritingVoteOptionList.Z,{writingOptionHook})}),(0,jsx_runtime.jsxs)(Deadline,{children:[(0,jsx_runtime.jsxs)(DeadlineDescription,{children:[getDeadlineTime({hour:time.hour,day:time.day,minute:time.minute}),data&&(0,jsx_runtime.jsxs)(Description,{children:["글 작성일(",createTime,")로부터 하루 이후 (",addTimeToDate({day:1,hour:0,minute:0},baseTime),")까지만 선택 가능합니다."]}),data&&(0,jsx_runtime.jsxs)(Description,{children:["* 기존 마감 시간은 ",deadline,"입니다. "]})]}),(0,jsx_runtime.jsxs)(ButtonWrapper,{children:[constants.z.map((option=>(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":option,type:"button",onClick:()=>(option=>{setTime(function formatTimeWithOption(option){return"10분"===option?{day:0,hour:0,minute:10}:"30분"===option?{day:0,hour:0,minute:30}:"1시간"===option?{day:0,hour:1,minute:0}:"6시간"===option?{day:0,hour:6,minute:0}:{day:1,hour:0,minute:0}}(option))})(option),theme:"blank",children:option},option))),(0,jsx_runtime.jsx)(SquareButton.Z,{type:"button",onClick:openComponent,theme:"blank",children:"사용자 지정"})]})]}),(0,jsx_runtime.jsx)(SaveButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{theme:"fill",type:"submit",form:"form-post",children:"저장"})})]})]}),isOpen&&(0,jsx_runtime.jsx)(Modal.Z,{size:"sm",onModalClose:closeComponent,children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)(ModalHeader,{children:[(0,jsx_runtime.jsx)("h3",{children:"마감 시간 선택"}),(0,jsx_runtime.jsx)(CloseButton,{onClick:closeComponent,children:"X"})]}),(0,jsx_runtime.jsxs)(ModalBody,{children:[(0,jsx_runtime.jsx)(Description,{children:"최대 3일을 넘을 수 없습니다."}),(0,jsx_runtime.jsx)(TimePickerOptionList.Z,{time,setTime}),(0,jsx_runtime.jsx)(ResetButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{onClick:()=>{if(window.confirm("정말 초기화하시겠습니까?")){setTime({day:0,hour:0,minute:0})}},type:"button",theme:"blank",children:"초기화"})})]})]})})]})]})}try{PostForm.displayName="PostForm",PostForm.__docgenInfo={description:"",displayName:"PostForm",props:{data:{defaultValue:null,description:"",name:"data",required:!1,type:{name:"PostInfo"}},mutate:{defaultValue:null,description:"",name:"mutate",required:!0,type:{name:"UseMutateFunction<any, unknown, FormData, unknown>"}},isError:{defaultValue:null,description:"",name:"isError",required:!0,type:{name:"boolean"}},error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"unknown"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/PostForm/index.tsx#PostForm"]={docgenInfo:PostForm.__docgenInfo,name:"PostForm",path:"src/components/PostForm/index.tsx#PostForm"})}catch(__react_docgen_typescript_loader_error){}const PostForm_stories={component:PostForm},MOCK_DATA={postId:1,title:"당신의 최애 동물에 투표하세요!",writer:{id:15216,nickname:"jero"},content:"한자로 견(犬)·구(狗) 등으로 표기한다. 포유류 중 가장 오래된 가축으로 거의 전세계에서 사육되며 약 400여 품종이 있다.  개는 이리·자칼(jackal) 등이 조상이라고 하는데, 이는 개와 교배하여 계대(繼代) 번식의 가능성이 있는 새끼를 낳을 수 있다는 것을 뜻한다. 즉 개에 이들의 혈액이 혼혈될 가능성이 있다는 것이다. 그러나 두개골이나 치아의 구조를 보면 개는 혼합된 것이 아니며, 또 그들 중의 어느 것에서 생긴 것이라고도 여겨지지 않는다. 아마도 개는 오스트레일리아에 야생하는 딩고(dingo)나 남아시아에 반야생상태로 서식하는 개와 흡사한, 절멸된 야생종에서 생긴 것으로 추측된다.",imageUrl:"",category:[{id:13215,name:"음식"},{id:13217,name:"게임"},{id:13219,name:"연예"}],createTime:"2023-07-18 12:40",deadline:"2023-08-15 12:40",voteInfo:{selectedOptionId:1,allPeopleCount:0,options:[{id:Math.floor(1e5*Math.random()),text:"햄스터가 세상을 구한다.",imageUrl:"",peopleCount:0,percent:20},{id:Math.floor(1e5*Math.random()),text:"강아지가 세상을 구한다.",imageUrl:"",peopleCount:0,percent:10},{id:Math.floor(1e5*Math.random()),text:"고양이가 세상을 구한다.",imageUrl:"https://source.unsplash.com/random",peopleCount:0,percent:10}]}},NewPost=()=>{const{mutate,isError,error}=(()=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isLoading,isSuccess,isError,error}=(0,useMutation.D)((post=>(0,api_post.qb)(post)),{onSuccess:()=>{queryClient.invalidateQueries([queryKey.l.USER_INFO,!0])},onError:error=>{window.console.log("createPost error",error)}});return{mutate,isLoading,isSuccess,isError,error}})();return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(PostForm,{mutate,isError,error})})},OldPost=()=>{const{mutate,isError,error}=(postId=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate,isLoading,isError,error}=(0,useMutation.D)((updatedPost=>(0,api_post.dq)(postId,updatedPost)),{onSuccess:()=>{queryClient.invalidateQueries([queryKey.l.POSTS,postId])},onError:error=>{window.console.log("editPost error",error)}});return{mutate,isLoading,isError,error}})(1);return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(PostForm,{data:MOCK_DATA,mutate,isError,error})})};NewPost.parameters={...NewPost.parameters,docs:{...NewPost.parameters?.docs,source:{originalSource:"() => {\n  const {\n    mutate,\n    isError,\n    error\n  } = useCreatePost();\n  return <>\n      <PostForm mutate={mutate} isError={isError} error={error} />\n    </>;\n}",...NewPost.parameters?.docs?.source}}},OldPost.parameters={...OldPost.parameters,docs:{...OldPost.parameters?.docs,source:{originalSource:"() => {\n  const examplePostId = 1;\n  const {\n    mutate,\n    isError,\n    error\n  } = useEditPost(examplePostId);\n  return <>\n      <PostForm data={MOCK_DATA} mutate={mutate} isError={isError} error={error} />\n    </>;\n}",...OldPost.parameters?.docs?.source}}};const __namedExportsOrder=["NewPost","OldPost"]},"./src/api/categoryList.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{CM:()=>addFavoriteCategory,a$:()=>getUserCategoryList,kD:()=>getGuestCategoryList,xh:()=>removeFavoriteCategory});var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/fetch.ts");const transformCategoryListResponse=categoryList=>categoryList.map((category=>({id:category.id,name:category.name,isFavorite:category.isFavorite}))),getUserCategoryList=async()=>{const categoryList=await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)("/categories");return transformCategoryListResponse(categoryList)},getGuestCategoryList=async()=>{const categoryList=await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.wY)("/categories/guest");return transformCategoryListResponse(categoryList)},addFavoriteCategory=async categoryId=>{await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.ZL)(`/categories/${categoryId}/like`,"")},removeFavoriteCategory=async categoryId=>{await(0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.Wq)(`/categories/${categoryId}/like`)}},"./src/components/PostForm/constants.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>MAX_FILE_SIZE,z:()=>DEADLINE_OPTION});const DEADLINE_OPTION=["10분","30분","1시간","6시간","1일"],MAX_FILE_SIZE=5e6},"./src/components/common/AddButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>AddButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:{button:"25px",font:"13px"},md:{button:"40px",font:"30px"},lg:{button:"60px",font:"50px"}},Button=styled_components_browser_esm.zo.button`
  display: block;

  width: ${props=>SIZE[props.size].button};
  height: ${props=>SIZE[props.size].button};
  border-radius: 50%;

  background-color: var(--primary-color);
  color: var(--white);

  font-size: ${props=>SIZE[props.size].font};

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function AddButton({size,...rest}){return(0,jsx_runtime.jsx)(Button,{size,"aria-label":"더하기",...rest,children:"+"})}AddButton.displayName="AddButton";try{AddButton.displayName="AddButton",AddButton.__docgenInfo={description:"",displayName:"AddButton",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/AddButton/index.tsx#AddButton"]={docgenInfo:AddButton.__docgenInfo,name:"AddButton",path:"src/components/common/AddButton/index.tsx#AddButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Modal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Modal});var react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const MODAL_SIZE={sm:"290px",md:"590px",lg:"700px"},All=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;
`,Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.35);
`,Container=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-rows: 1fr 6fr;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: ${props=>MODAL_SIZE[props.size]};
  height: 290px;
  border-radius: 12px;
  border: 2px solid #f6f6f6;
  padding: 5px;

  background-color: white;

  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Modal({onModalClose,children,size}){const BackDropRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{const handler=e=>{e.target===BackDropRef.current&&onModalClose()};return document.addEventListener("click",handler),()=>document.removeEventListener("click",handler)}),[BackDropRef,onModalClose]),(0,jsx_runtime.jsxs)(All,{children:[(0,jsx_runtime.jsx)(Backdrop,{ref:BackDropRef}),(0,jsx_runtime.jsx)(Container,{size,children})]})}Modal.displayName="Modal";try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{onModalClose:{defaultValue:null,description:"",name:"onModalClose",required:!0,type:{name:"() => void"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/index.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/index.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/MultiSelect/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>MultiSelect});var react=__webpack_require__("./node_modules/react/index.js"),OptionCancelButton=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  position: relative;

  font: var(--text-caption);

  & > * {
    background-color: var(--white);
  }

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`,Wrapper=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-columns: 1fr 20px;
  align-items: center;

  height: auto;
  border: 1px solid var(--slate);
  border-radius: 6px;
  padding: 7px;

  position: relative;

  cursor: pointer;
`,SelectedOptionListContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
`,SelectIcon=styled_components_browser_esm.zo.span`
  width: 20px;
`,DropDown=styled_components_browser_esm.zo.ul`
  width: 100%;
  border: 1px solid #e4e5e7;
  border-radius: 6px;
  margin-top: 10px;

  position: absolute;

  opacity: ${({$isOpened})=>$isOpened?1:0};
  visibility: ${({$isOpened})=>$isOpened?"visible":"hidden"};

  transition: all 0.2s linear 0.1s;

  & > li {
    list-style: none;
    padding: 10px 0px 10px 15px;
    border-bottom: 1px solid #e4e5e7;

    &:hover {
      background-color: #ffefd5;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`,SelectedOption=styled_components_browser_esm.zo.span`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 4px;
  padding: 10px;
  margin: 2px 4px 2px 2px;
  & > span {
    margin-right: 8px;
  }

  background: #e8f7f6;
`,Image=styled_components_browser_esm.zo.img`
  width: 20px;
  height: 20px;
  border-left: 1px solid var(--slate);
  padding-left: 8px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function MultiSelect({selectedOptionList,optionList,handleOptionAdd,handleOptionDelete,placeholder="여러 개의 옵션을 선택해주세요"}){const[isOpen,setIsOpen]=(0,react.useState)(!1),filteredOptionList=optionList.filter((option=>!selectedOptionList.some((selected=>selected.id===option.id))));return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(Wrapper,{onClick:()=>{setIsOpen(!isOpen)},children:[(0,jsx_runtime.jsxs)(SelectedOptionListContainer,{children:[0===selectedOptionList.length&&(0,jsx_runtime.jsxs)("span",{children:[placeholder," "]}),selectedOptionList.map((({id,name})=>(0,jsx_runtime.jsxs)(SelectedOption,{onClick:e=>e.stopPropagation(),children:[(0,jsx_runtime.jsx)("span",{children:name}),(0,jsx_runtime.jsx)(OptionCancelButton.Z,{onClick:e=>{e.stopPropagation(),handleOptionDelete(id)}})]},id)))]}),(0,jsx_runtime.jsx)(SelectIcon,{children:(0,jsx_runtime.jsx)(Image,{src:isOpen?chevron_up:chevron_down,alt:"",$isSelected:isOpen})})]}),filteredOptionList.length>0&&(0,jsx_runtime.jsx)(DropDown,{$isOpened:isOpen,children:filteredOptionList.map((({id,name})=>(0,jsx_runtime.jsx)("li",{onClick:e=>{e.stopPropagation(),handleOptionAdd({id,name})},children:name},id)))})]})}MultiSelect.displayName="MultiSelect";try{MultiSelect.displayName="MultiSelect",MultiSelect.__docgenInfo={description:"",displayName:"MultiSelect",props:{selectedOptionList:{defaultValue:null,description:"",name:"selectedOptionList",required:!0,type:{name:"Option[]"}},optionList:{defaultValue:null,description:"",name:"optionList",required:!0,type:{name:"Option[]"}},handleOptionAdd:{defaultValue:null,description:"",name:"handleOptionAdd",required:!0,type:{name:"(newItem: Option) => void"}},handleOptionDelete:{defaultValue:null,description:"",name:"handleOptionDelete",required:!0,type:{name:"(optionId: number) => void"}},placeholder:{defaultValue:{value:"여러 개의 옵션을 선택해주세요"},description:"",name:"placeholder",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/MultiSelect/index.tsx#MultiSelect"]={docgenInfo:MultiSelect.__docgenInfo,name:"MultiSelect",path:"src/components/common/MultiSelect/index.tsx#MultiSelect"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/NarrowTemplateHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>NarrowTemplateHeader});const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function NarrowTemplateHeader({children}){return(0,jsx_runtime.jsx)(Container,{children})}NarrowTemplateHeader.displayName="NarrowTemplateHeader";try{NarrowTemplateHeader.displayName="NarrowTemplateHeader",NarrowTemplateHeader.__docgenInfo={description:"",displayName:"NarrowTemplateHeader",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"]={docgenInfo:NarrowTemplateHeader.__docgenInfo,name:"NarrowTemplateHeader",path:"src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BORDER_THEME={fill:"var(--primary-color)",blank:"var(--primary-color)",gray:"#67727E"},TEXT_THEME={fill:"white",blank:"var(--primary-color)",gray:"white"},BACKGROUND_THEME={fill:"var(--primary-color)",blank:"white",gray:"#67727E"},Button=styled_components_browser_esm.zo.button`
  display: block;

  width: 100%;
  height: 100%;
  border: 2px solid ${({$theme})=>BORDER_THEME[$theme]};
  border-radius: 8px;

  color: ${({$theme})=>TEXT_THEME[$theme]};
  background-color: ${({$theme})=>BACKGROUND_THEME[$theme]};

  font: var(--text-caption);

  cursor: pointer;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    font: var(--text-body);
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{$theme:theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'},{value:'"gray"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/TimePickerOptionList/TimePickerOption/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TimePickerOption});var react=__webpack_require__("./node_modules/react/index.js");const TIMEBOX_CHILD_HEIGHT=33,TIME_UNIT={day:3,hour:24,minute:60};var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  width: 33.3%;
  height: 99px;

  position: relative;
`,TimeBox=styled_components_browser_esm.zo.div`
  width: 100%;
  height: ${3*TIMEBOX_CHILD_HEIGHT+"px"};

  position: absolute;

  background-color: rgba(0, 0, 0, 0);

  text-align: center;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`,PickedTimeOverlay=styled_components_browser_esm.zo.div`
  width: 100%;
  height: 33px;

  position: absolute;
  top: 33%;

  background-color: rgba(128, 128, 128, 0.2);

  z-index: -1;
`,Time=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: ${`${TIMEBOX_CHILD_HEIGHT}px`};

  color: ${props=>!props.$isPicked&&"gray"};

  font: var(--text-body);
  font-weight: ${props=>props.$isPicked?"bold":"light"};
`,Empty=styled_components_browser_esm.zo.div`
  height: ${`${TIMEBOX_CHILD_HEIGHT}px`};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TimePickerOption({currentTime,option,handlePickTime}){const timeUnit=TIME_UNIT[option],timeBoxRef=(0,react.useRef)(null),timeBoxChildRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{const timeBox=timeBoxRef.current;if(!timeBox)return;const cancelWheel=e=>e.preventDefault();return timeBox.addEventListener("wheel",cancelWheel,{passive:!1}),()=>timeBox.removeEventListener("wheel",cancelWheel)}),[]),(0,react.useEffect)((()=>{const timeBox=timeBoxRef.current,timeBoxChild=timeBoxChildRef.current;timeBox&&timeBoxChild&&(timeBox.scrollTop=timeBoxChild.offsetHeight*currentTime)}),[]),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(PickedTimeOverlay,{}),(0,jsx_runtime.jsxs)(TimeBox,{onScroll:()=>{const timeBox=timeBoxRef.current;if(!timeBox)return;const pickedTimeIndex=Math.round(timeBox.scrollTop/TIMEBOX_CHILD_HEIGHT);pickedTimeIndex>=0&&pickedTimeIndex<timeUnit&&handlePickTime(option,pickedTimeIndex)},ref:timeBoxRef,onWheel:event=>{const timeBox=timeBoxRef.current;timeBox&&(event.deltaY>0&&(timeBox.scrollTop+=TIMEBOX_CHILD_HEIGHT),event.deltaY<0&&(timeBox.scrollTop-=TIMEBOX_CHILD_HEIGHT))},children:[(0,jsx_runtime.jsx)(Empty,{}),Array.from({length:timeUnit}).map(((_,index)=>(0,jsx_runtime.jsx)(Time,{ref:index===currentTime?timeBoxChildRef:null,$isPicked:currentTime===index,children:index},index))),(0,jsx_runtime.jsx)(Empty,{})]})]})}TimePickerOption.displayName="TimePickerOption";try{TimePickerOption.displayName="TimePickerOption",TimePickerOption.__docgenInfo={description:"",displayName:"TimePickerOption",props:{currentTime:{defaultValue:null,description:"",name:"currentTime",required:!0,type:{name:"number"}},option:{defaultValue:null,description:"",name:"option",required:!0,type:{name:"string"}},handlePickTime:{defaultValue:null,description:"",name:"handlePickTime",required:!0,type:{name:"(option: string, updatedTime: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/TimePickerOptionList/TimePickerOption/index.tsx#TimePickerOption"]={docgenInfo:TimePickerOption.__docgenInfo,name:"TimePickerOption",path:"src/components/common/TimePickerOptionList/TimePickerOption/index.tsx#TimePickerOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/TimePickerOptionList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TimePickerOptionList});__webpack_require__("./node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 15px;

  width: 200px;
`,Container=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  border: 1px solid gray;
`,PickedTimeText=styled_components_browser_esm.zo.p`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;

  font: var(--text-caption);
  font-weight: bold;
`;var TimePickerOption=__webpack_require__("./src/components/common/TimePickerOptionList/TimePickerOption/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TimePickerOptionList({time,setTime}){const{day,hour,minute}=time,updateTime=(option,updatedTime)=>{setTime((prev=>({...prev,[option]:updatedTime})))};return(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(Container,{children:Object.entries(time).map((([key,value])=>(0,jsx_runtime.jsx)(TimePickerOption.Z,{currentTime:value,option:key,handlePickTime:updateTime},key)))}),(0,jsx_runtime.jsxs)(PickedTimeText,{children:[(0,jsx_runtime.jsxs)("p",{children:[day,"일"]}),(0,jsx_runtime.jsxs)("p",{children:[hour,"시"]}),(0,jsx_runtime.jsxs)("p",{children:[minute,"분"]})," 후 마감"]})]})}TimePickerOptionList.displayName="TimePickerOptionList";try{TimePickerOptionList.displayName="TimePickerOptionList",TimePickerOptionList.__docgenInfo={description:"",displayName:"TimePickerOptionList",props:{time:{defaultValue:null,description:"",name:"time",required:!0,type:{name:"Time"}},setTime:{defaultValue:null,description:"",name:"setTime",required:!0,type:{name:"Dispatch<SetStateAction<Time>>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/TimePickerOptionList/index.tsx#TimePickerOptionList"]={docgenInfo:TimePickerOptionList.__docgenInfo,name:"TimePickerOptionList",path:"src/components/common/TimePickerOptionList/index.tsx#TimePickerOptionList"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>OptionCancelButton});__webpack_require__("./node_modules/react/index.js");const x_mark_white_namespaceObject=__webpack_require__.p+"static/media/x_mark_white.5e090f6f.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),style=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/style.ts");const Container=styled_components_browser_esm.zo.button`
  ${style.T$}
`,Image=(0,styled_components_browser_esm.zo)(style.Z)``;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function OptionCancelButton({...rest}){return(0,jsx_runtime.jsx)(Container,{"aria-label":"삭제",type:"button",...rest,children:(0,jsx_runtime.jsx)(Image,{src:x_mark_white_namespaceObject,alt:""})})}OptionCancelButton.displayName="OptionCancelButton";try{OptionCancelButton.displayName="OptionCancelButton",OptionCancelButton.__docgenInfo={description:"",displayName:"OptionCancelButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx#OptionCancelButton"]={docgenInfo:OptionCancelButton.__docgenInfo,name:"OptionCancelButton",path:"src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx#OptionCancelButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionUploadImageButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>OptionUploadImageButton});__webpack_require__("./node_modules/react/index.js");const photo_white_namespaceObject=__webpack_require__.p+"static/media/photo_white.830f687b.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),style=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/style.ts");const Container=styled_components_browser_esm.zo.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  visibility: ${props=>props.$isVisible&&"hidden"};
`,Label=styled_components_browser_esm.zo.label`
  ${style.T$}
`,FileInput=styled_components_browser_esm.zo.input`
  visibility: hidden;
`,Image=(0,styled_components_browser_esm.zo)(style.Z)``;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function OptionUploadImageButton({optionId,isImageVisible,...rest}){const id=optionId.toString();return(0,jsx_runtime.jsxs)(Container,{$isVisible:isImageVisible,children:[(0,jsx_runtime.jsx)(Label,{htmlFor:id,"aria-label":"선택지 이미지 업로드 버튼",title:"이미지 업로드",children:(0,jsx_runtime.jsx)(Image,{src:photo_white_namespaceObject,alt:""})}),(0,jsx_runtime.jsx)(FileInput,{id,type:"file",accept:"image/*",...rest})]})}OptionUploadImageButton.displayName="OptionUploadImageButton";try{OptionUploadImageButton.displayName="OptionUploadImageButton",OptionUploadImageButton.__docgenInfo={description:"",displayName:"OptionUploadImageButton",props:{optionId:{defaultValue:null,description:"",name:"optionId",required:!0,type:{name:"number"}},isImageVisible:{defaultValue:null,description:"",name:"isImageVisible",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionUploadImageButton/index.tsx#OptionUploadImageButton"]={docgenInfo:OptionUploadImageButton.__docgenInfo,name:"OptionUploadImageButton",path:"src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionUploadImageButton/index.tsx#OptionUploadImageButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WritingVoteOption});var _OptionCancelButton__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx"),_OptionUploadImageButton__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionUploadImageButton/index.tsx"),_style__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/style.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const MAX_WRITING_LENGTH=50;function WritingVoteOption({optionId,text,isDeletable,handleUpdateOptionChange,handleDeleteOptionClick,handleRemoveImageClick,handleUploadImage,imageUrl}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_style__WEBPACK_IMPORTED_MODULE_2__.W2,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_style__WEBPACK_IMPORTED_MODULE_2__.QU,{children:isDeletable&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_OptionCancelButton__WEBPACK_IMPORTED_MODULE_0__.Z,{title:"선택지 삭제하기",onClick:handleDeleteOptionClick})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_style__WEBPACK_IMPORTED_MODULE_2__.Y7,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_style__WEBPACK_IMPORTED_MODULE_2__.OO,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_style__WEBPACK_IMPORTED_MODULE_2__.im,{name:"optionText",defaultValue:text,onChange:e=>handleUpdateOptionChange(e),placeholder:"내용을 입력해주세요.",maxLength:MAX_WRITING_LENGTH}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_OptionUploadImageButton__WEBPACK_IMPORTED_MODULE_1__.Z,{isImageVisible:imageUrl.length>0,optionId,onChange:handleUploadImage})]}),imageUrl&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_style__WEBPACK_IMPORTED_MODULE_2__.mo,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_style__WEBPACK_IMPORTED_MODULE_2__.Ee,{src:imageUrl,alt:text}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_style__WEBPACK_IMPORTED_MODULE_2__.S0,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_OptionCancelButton__WEBPACK_IMPORTED_MODULE_0__.Z,{onClick:handleRemoveImageClick})})]})]})]})}WritingVoteOption.displayName="WritingVoteOption";try{WritingVoteOption.displayName="WritingVoteOption",WritingVoteOption.__docgenInfo={description:"",displayName:"WritingVoteOption",props:{optionId:{defaultValue:null,description:"",name:"optionId",required:!0,type:{name:"number"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},isDeletable:{defaultValue:null,description:"",name:"isDeletable",required:!0,type:{name:"boolean"}},handleUpdateOptionChange:{defaultValue:null,description:"",name:"handleUpdateOptionChange",required:!0,type:{name:"(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void"}},handleDeleteOptionClick:{defaultValue:null,description:"",name:"handleDeleteOptionClick",required:!0,type:{name:"() => void"}},handleRemoveImageClick:{defaultValue:null,description:"",name:"handleRemoveImageClick",required:!0,type:{name:"() => void"}},handleUploadImage:{defaultValue:null,description:"",name:"handleUploadImage",required:!0,type:{name:"(event: ChangeEvent<HTMLInputElement>) => void"}},imageUrl:{defaultValue:null,description:"",name:"imageUrl",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WritingVoteOptionList/WritingVoteOption/index.tsx#WritingVoteOption"]={docgenInfo:WritingVoteOption.__docgenInfo,name:"WritingVoteOption",path:"src/components/optionList/WritingVoteOptionList/WritingVoteOption/index.tsx#WritingVoteOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/style.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ee:()=>Image,OO:()=>ContentContainer,QU:()=>CancelButtonWrapper,S0:()=>ImageCancelWrapper,T$:()=>ButtonCssText,W2:()=>Container,Y7:()=>OptionContainer,Z:()=>IconImage,im:()=>ContentTextArea,mo:()=>ImageContainer});var styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_styles_theme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styles/theme.ts");const Container=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.li`
  display: flex;
  gap: 10px;
`,OptionContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 15px;
  border-radius: 4px;

  background-color: #e6e6e6;
`,ContentContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  width: 100%;
`,ContentTextArea=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.textarea`
  width: 100%;
  height: 90px;
  padding: 8px;

  font: var(--text-caption);
  line-height: 2.4rem;

  background-color: #e6e6e6;

  resize: none;

  @media (min-width: ${_styles_theme__WEBPACK_IMPORTED_MODULE_0__.r.breakpoint.md}) {
    font: var(--text-body);
  }
`,ImageContainer=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  width: 80%;
  margin-top: 20px;

  position: relative;
`,Image=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.img`
  width: 100%;
  border-radius: 4px;

  aspect-ratio: 1/1;
  object-fit: cover;
`,ImageCancelWrapper=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  position: absolute;
  top: 10px;
  right: 10px;
`,CancelButtonWrapper=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  width: 34px;
  height: 100%;
`,ButtonCssText=`\ndisplay: flex;\njustify-content: center;\nalign-items: center;\n\nwidth: 24px;\nheight: 24px;\nborder-radius: 50%;\n\nbackground-color: #bebebe;\n\ncursor: pointer;\n\n@media (min-width: ${_styles_theme__WEBPACK_IMPORTED_MODULE_0__.r.breakpoint.md}) {\n width:20px;\n height:20px;\n}\n`,IconImage=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.img`
  width: 14px;
  height: 14px;

  @media (min-width: ${_styles_theme__WEBPACK_IMPORTED_MODULE_0__.r.breakpoint.md}) {
    width: 16px;
    height: 16px;
  }
`},"./src/components/optionList/WritingVoteOptionList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WritingVoteOptionList});var AddButton=__webpack_require__("./src/components/common/AddButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.ul`
  display: flex;
  flex-direction: column;

  gap: 20px;
`,AddButtonWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;

  position: relative;
`;var WritingVoteOption=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const MINIMUM_COUNT=2,MAXIMUM_COUNT=5;function WritingVoteOptionList({writingOptionHook}){const{optionList,addOption,writingOption,deleteOption,removeImage,handleUploadImage}=writingOptionHook,isDeletable=optionList.length>MINIMUM_COUNT;return(0,jsx_runtime.jsxs)(Container,{children:[optionList.map((optionItem=>(0,jsx_runtime.jsx)(WritingVoteOption.Z,{optionId:optionItem.id,isDeletable,text:optionItem.text,handleUpdateOptionChange:writingOption(optionItem.id),handleDeleteOptionClick:()=>deleteOption(optionItem.id),handleRemoveImageClick:()=>removeImage(optionItem.id),handleUploadImage:event=>handleUploadImage(event,optionItem.id),imageUrl:optionItem.imageUrl},optionItem.id))),optionList.length<MAXIMUM_COUNT&&(0,jsx_runtime.jsx)(AddButtonWrapper,{children:(0,jsx_runtime.jsx)(AddButton.Z,{type:"button",size:"md",onClick:addOption})})]})}WritingVoteOptionList.displayName="WritingVoteOptionList";try{WritingVoteOptionList.displayName="WritingVoteOptionList",WritingVoteOptionList.__docgenInfo={description:"",displayName:"WritingVoteOptionList",props:{writingOptionHook:{defaultValue:null,description:"",name:"writingOptionHook",required:!0,type:{name:"{ optionList: WritingVoteOptionType[]; addOption: () => void; writingOption: (optionId: number) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; deleteOption: (optionId: number) => void; removeImage: (optionId: number) => void; handleUploadImage: (event: ChangeEvent<...>, optionId: number) =>..."}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WritingVoteOptionList/index.tsx#WritingVoteOptionList"]={docgenInfo:WritingVoteOptionList.__docgenInfo,name:"WritingVoteOptionList",path:"src/components/optionList/WritingVoteOptionList/index.tsx#WritingVoteOptionList"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/post.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>DEFAULT_KEYWORD,Et:()=>POST_TITLE_MAX_LENGTH,FQ:()=>SORTING,It:()=>REQUEST_POST_KIND_URL,JH:()=>POST_TYPE,Kf:()=>REQUEST_STATUS_OPTION,Kn:()=>SEARCH_KEYWORD,Q_:()=>STATUS,ko:()=>SEARCH_KEYWORD_MAX_LENGTH,pl:()=>POST_DESCRIPTION_MAX_LENGTH,tL:()=>REQUEST_SORTING_OPTION,yE:()=>DEFAULT_CATEGORY_ID,zV:()=>POST_LIST_MAX_LENGTH});const STATUS={ALL:"all",PROGRESS:"progress",CLOSED:"closed"},SORTING={LATEST:"latest",POPULAR:"popular"},POST_TYPE={ALL:"posts",MY_POST:"myPost",MY_VOTE:"myVote",CATEGORY:"category",SEARCH:"search"},REQUEST_STATUS_OPTION={[STATUS.ALL]:"ALL",[STATUS.PROGRESS]:"PROGRESS",[STATUS.CLOSED]:"CLOSED"},REQUEST_SORTING_OPTION={[SORTING.LATEST]:"LATEST",[SORTING.POPULAR]:"HOT"},REQUEST_POST_KIND_URL={[POST_TYPE.ALL]:"posts",[POST_TYPE.MY_POST]:"posts/me",[POST_TYPE.MY_VOTE]:"posts/votes/me",[POST_TYPE.CATEGORY]:"posts/categories",[POST_TYPE.SEARCH]:"posts/search"},SEARCH_KEYWORD="keyword",POST_TITLE_MAX_LENGTH=100,POST_DESCRIPTION_MAX_LENGTH=1e3,SEARCH_KEYWORD_MAX_LENGTH=100,POST_LIST_MAX_LENGTH=10,DEFAULT_CATEGORY_ID=0,DEFAULT_KEYWORD=""},"./src/hooks/query/category/useCategoryList.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>useCategoryList});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),_api_categoryList__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/api/categoryList.ts"),_constants_queryKey__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/queryKey.ts");const useCategoryList=isLoggedIn=>{const{data,error,isLoading,isError}=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.a)([_constants_queryKey__WEBPACK_IMPORTED_MODULE_1__.l.CATEGORIES,isLoggedIn],isLoggedIn?_api_categoryList__WEBPACK_IMPORTED_MODULE_0__.a$:_api_categoryList__WEBPACK_IMPORTED_MODULE_0__.kD,{cacheTime:36e5,staleTime:36e5});return{data,error,isLoading,isError}}},"./src/hooks/useMultiSelect.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>useMultiSelect});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useMultiSelect=(initialSelectedOptionList,optionCountLimit)=>{const[selectedOptionList,setSelectedOptionList]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialSelectedOptionList);return{selectedOptionList,handleOptionAdd:newItem=>{optionCountLimit&&optionCountLimit===selectedOptionList.length?alert(`${optionCountLimit}개까지 선택 가능합니다!`):setSelectedOptionList([...selectedOptionList,newItem])},handleOptionDelete:optionId=>{setSelectedOptionList(selectedOptionList.filter((option=>option.id!==optionId)))}}}},"./src/hooks/useText.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>useText});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useText=originalText=>{const[text,setText]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(originalText);return{text,handleTextChange:(event,limit)=>{const{value}=event.target;if(value.length===limit)return event.target.setCustomValidity(`선택지 내용은 ${limit}자까지 입력 가능합니다.`),void event.target.reportValidity();setText(value),event.target.setCustomValidity("")},resetText:()=>{setText("")}}}},"./src/hooks/useToggle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>useToggle});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useToggle=()=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return{isOpen,openComponent:()=>{setIsOpen(!0)},closeComponent:()=>{setIsOpen(!1)},toggleComponent:()=>{setIsOpen((prevIsOpen=>!prevIsOpen))}}}},"./src/hooks/useWritingOption.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>useWritingOption});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_PostForm_constants__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/PostForm/constants.ts");const INIT_OPTION_LIST=[{id:Math.floor(1e5*Math.random()),text:"",imageUrl:""},{id:Math.floor(1e5*Math.random()),text:"",imageUrl:""}],useWritingOption=(initialOptionList=INIT_OPTION_LIST)=>{const[optionList,setOptionList]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOptionList);return{optionList,addOption:()=>{if(optionList.length>=5)return;const updatedOptionList=[...optionList,{id:Math.floor(1e5*Math.random()),text:"",imageUrl:""}];setOptionList(updatedOptionList)},writingOption:optionId=>event=>{const{value}=event.target;if(50===value.length)return event.target.setCustomValidity("선택지 내용은 50자까지 입력 가능합니다."),void event.target.reportValidity();const updateOptionList=optionList.map((optionItem=>optionItem.id!==optionId?optionItem:{...optionItem,text:value}));event.target.setCustomValidity(""),setOptionList(updateOptionList)},deleteOption:optionId=>{if(optionList.length<=2)return;const removedOptionList=optionList.filter((optionItem=>optionItem.id!==optionId));setOptionList(removedOptionList)},removeImage:optionId=>{const updatedOptionList=optionList.map((optionItem=>optionItem.id===optionId?{...optionItem,imageUrl:""}:optionItem));setOptionList(updatedOptionList)},handleUploadImage:(event,optionId)=>{const{files}=event.target;if(!files)return;const file=files[0];if(event.target.setCustomValidity(""),file.size>_components_PostForm_constants__WEBPACK_IMPORTED_MODULE_1__.T)return event.target.setCustomValidity("사진의 용량은 5MB 이하만 가능합니다."),void event.target.reportValidity();const reader=new FileReader;reader.readAsDataURL(file),reader.onloadend=()=>{const updatedOptionList=optionList.map((optionItem=>optionItem.id===optionId?{...optionItem,imageUrl:reader.result?.toString()??""}:optionItem));setOptionList(updatedOptionList)}}}};try{useWritingOption.displayName="useWritingOption",useWritingOption.__docgenInfo={description:"",displayName:"useWritingOption",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useWritingOption.tsx#useWritingOption"]={docgenInfo:useWritingOption.__docgenInfo,name:"useWritingOption",path:"src/hooks/useWritingOption.tsx#useWritingOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{header:100,modal:200}}},"./src/assets/chevron-down.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-down.f97a5bb1.svg"},"./src/assets/chevron-up.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-up.a1eb858b.svg"}}]);
//# sourceMappingURL=components-PostForm-PostForm-stories.21a0805f.iframe.bundle.js.map