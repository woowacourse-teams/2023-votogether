"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[4133],{"./src/components/PostForm/constants.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>MAX_FILE_SIZE,z:()=>DEADLINE_OPTION});const DEADLINE_OPTION=["10분","30분","1시간","6시간","1일"],MAX_FILE_SIZE=15e5},"./src/components/PostForm/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PostForm});var react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),constants=__webpack_require__("./src/components/PostForm/constants.ts");const useContentImage=(imageUrl="")=>{const[contentImage,setContentImage]=(0,react.useState)(imageUrl),contentInputRef=(0,react.useRef)(null);return{contentImage,contentInputRef,removeImage:()=>{setContentImage(""),contentInputRef.current&&(contentInputRef.current.value="")},handleUploadImage:event=>{const{files}=event.target;if(!files)return;const file=files[0];if(event.target.setCustomValidity(""),file.size>constants.T)return event.target.setCustomValidity("사진의 용량은 1.5MB 이하만 가능합니다."),void event.target.reportValidity();const reader=new FileReader;reader.readAsDataURL(file),reader.onloadend=()=>{setContentImage(reader.result?.toString()??"")}}}};var useMultiSelect=__webpack_require__("./src/hooks/useMultiSelect.ts"),useText=__webpack_require__("./src/hooks/useText.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),useToggle=__webpack_require__("./src/hooks/useToggle.tsx"),useWritingOption=__webpack_require__("./src/hooks/useWritingOption.tsx"),ErrorBoundary=__webpack_require__("./src/pages/ErrorBoundary.tsx"),Modal=__webpack_require__("./src/components/common/Modal/index.tsx"),NarrowTemplateHeader=__webpack_require__("./src/components/common/NarrowTemplateHeader/index.tsx"),SquareButton=__webpack_require__("./src/components/common/SquareButton/index.tsx"),TimePickerOptionList=__webpack_require__("./src/components/common/TimePickerOptionList/index.tsx"),Toast=__webpack_require__("./src/components/common/Toast/index.tsx"),WritingVoteOptionList=__webpack_require__("./src/components/optionList/WritingVoteOptionList/index.tsx"),path=__webpack_require__("./src/constants/path.ts"),policyMessage=__webpack_require__("./src/constants/policyMessage.ts"),post=__webpack_require__("./src/constants/post.ts");const calculateDeadlineTime=(createdAt,deadLine)=>{if(!createdAt||!deadLine)return{day:0,hour:0,minute:0};const createTimeNumber=new Date(createdAt),deadlineTimeNumber=new Date(deadLine),timeDifference=Number(deadlineTimeNumber)-Number(createTimeNumber),hourTimeInMilliseconds=timeDifference%864e5,minuteTimeInMilliseconds=hourTimeInMilliseconds%36e5;return{day:Math.floor(timeDifference/864e5),hour:Math.floor(hourTimeInMilliseconds/36e5),minute:Math.floor(minuteTimeInMilliseconds/6e4)}};var checkWriter=__webpack_require__("./src/utils/post/checkWriter.ts"),convertImageUrlToServerUrl=__webpack_require__("./src/utils/post/convertImageUrlToServerUrl.ts"),formatTime=__webpack_require__("./src/utils/post/formatTime.ts");const getDeadlineTime=({day,hour,minute})=>{const timeMessage=[];return day<0||hour<0||minute<0?"마감 시간을 다시 설정해주세요":0===day&&0===hour&&0===minute?"마감 시간을 선택해주세요":(day>0&&timeMessage.push(`${day}일`),hour>0&&timeMessage.push(`${hour}시간`),minute>0&&timeMessage.push(`${minute}분`),`${timeMessage.join(" ")} 후에 마감됩니다.`)},getSelectedTimeOption=({day,hour,minute})=>0===day&&0===hour&&0===minute?null:0===day&&0===hour&&10===minute?"10분":0===day&&0===hour&&30===minute?"30분":0===day&&1===hour&&0===minute?"1시간":0===day&&6===hour&&0===minute?"6시간":1===day&&0===hour&&0===minute?"1일":"사용자지정";var utils_time=__webpack_require__("./src/utils/time.ts"),auth=__webpack_require__("./src/hooks/context/auth.tsx"),useCategoryList=__webpack_require__("./src/hooks/query/category/useCategoryList.ts"),MultiSelect=__webpack_require__("./src/components/common/MultiSelect/index.tsx");const changeCategoryToOption=categoryList=>categoryList.map((category=>({id:category.id,name:category.name})));var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CategoryWrapper({multiSelectHook}){const{selectedOptionList,handleOptionAdd,handleOptionDelete}=multiSelectHook,{isLoggedIn}=(0,react.useContext)(auth.V).loggedInfo,{data:categoryList}=(0,useCategoryList.J)(isLoggedIn),categoryOptionList=changeCategoryToOption(categoryList??[]);return(0,jsx_runtime.jsx)(MultiSelect.Z,{selectedOptionList,optionList:categoryOptionList,handleOptionAdd,handleOptionDelete,placeholder:"카테고리를 선택해주세요."})}CategoryWrapper.displayName="CategoryWrapper";try{CategoryWrapper.displayName="CategoryWrapper",CategoryWrapper.__docgenInfo={description:"",displayName:"CategoryWrapper",props:{multiSelectHook:{defaultValue:null,description:"",name:"multiSelectHook",required:!0,type:{name:"{ selectedOptionList: Option[]; handleOptionAdd: (newItem: Option) => void; handleOptionDelete: (optionId: number) => void; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/PostForm/CategoryWrapper/index.tsx#CategoryWrapper"]={docgenInfo:CategoryWrapper.__docgenInfo,name:"CategoryWrapper",path:"src/components/PostForm/CategoryWrapper/index.tsx#CategoryWrapper"})}catch(__react_docgen_typescript_loader_error){}var OptionCancelButton=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const ContentImageContainer=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-columns: 40px auto;
`,IMAGE_SIZE={sm:"25%",md:"50%",lg:"100%"},ContentImageWrapper=styled_components_browser_esm.zo.div`
  width: ${props=>IMAGE_SIZE[props.$size]};
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
`,Button=styled_components_browser_esm.zo.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  padding: 5px 0;

  background-color: var(--primary-color);

  visibility: ${props=>props.$isVisible?"hidden":""};
  cursor: pointer;
`,Label=styled_components_browser_esm.zo.label`
  width: 100%;
  height: 100%;

  color: var(--white);

  font: var(--text-body);
  text-align: center;

  cursor: pointer;
`;function ContentImageSection({contentImageHook,size}){const{contentImage,contentInputRef,removeImage,handleUploadImage}=contentImageHook;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[contentImage&&(0,jsx_runtime.jsxs)(ContentImageContainer,{children:[(0,jsx_runtime.jsx)(OptionCancelButton.Z,{onClick:removeImage}),(0,jsx_runtime.jsx)(ContentImageWrapper,{$size:size,children:(0,jsx_runtime.jsx)(ContentImage,{src:contentImage,alt:"본문에 포함된 사진"})})]}),(0,jsx_runtime.jsxs)(FileInputContainer,{children:[(0,jsx_runtime.jsx)(Button,{type:"button",$isVisible:!!contentImage,"aria-label":"본문 이미지 업로드",onClick:e=>{e.preventDefault(),contentInputRef.current&&contentInputRef.current.click()},children:(0,jsx_runtime.jsx)(Label,{htmlFor:"content-image-upload",children:"본문에 사진 넣기"})}),(0,jsx_runtime.jsx)(FileInput,{id:"content-image-upload",ref:contentInputRef,type:"file",accept:"image/*",onChange:handleUploadImage,tabIndex:-1})]})]})}try{ContentImageSection.displayName="ContentImageSection",ContentImageSection.__docgenInfo={description:"",displayName:"ContentImageSection",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},contentImageHook:{defaultValue:null,description:"",name:"contentImageHook",required:!0,type:{name:"{ contentImage: string; contentInputRef: MutableRefObject<HTMLInputElement | null>; removeImage: () => void; handleUploadImage: (event: ChangeEvent<HTMLInputElement>) => void; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/PostForm/ContentImageSection/index.tsx#ContentImageSection"]={docgenInfo:ContentImageSection.__docgenInfo,name:"ContentImageSection",path:"src/components/PostForm/ContentImageSection/index.tsx#ContentImageSection"})}catch(__react_docgen_typescript_loader_error){}var theme=__webpack_require__("./src/styles/theme.ts");const HeaderWrapper=styled_components_browser_esm.zo.div`
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
    padding: 30px 80px 20px 80px;
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
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  padding: 10px;
  margin-top: 10px;

  color: gray;

  font: var(--text-title);

  &:focus {
    outline: none !important;
    border-color: var(--slate);
  }

  @media (min-width: ${theme.r.breakpoint.md}) {
    font-size: 2.4rem;
  }

  @media (min-width: ${theme.r.breakpoint.lg}) {
    font-size: 2.8rem;
    line-height: 3.6rem;
  }
`,Content=styled_components_browser_esm.zo.textarea`
  min-height: 300px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  padding: 10px;
  margin-top: 7px;
  margin-bottom: 10px;

  color: gray;

  resize: none;

  font: var(--text-caption);
  font-family: 'Raleway', sans-serif;

  &:focus {
    outline: none !important;
    border-color: var(--slate);
  }

  @media (min-width: ${theme.r.breakpoint.md}) {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }

  @media (min-width: ${theme.r.breakpoint.lg}) {
    font-size: 2rem;
    line-height: 2.8rem;
  }
`,ContentLinkButtonWrapper=styled_components_browser_esm.zo.div`
  width: 100%;
  height: 36px;
  margin-bottom: 5px;

  @media (max-width: ${theme.r.breakpoint.sm}) {
  }
`,style_Button=styled_components_browser_esm.zo.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  padding: 5px 0;

  color: var(--primary-color);
  background-color: white;

  font-size: 16px;

  cursor: pointer;
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
`;function PostForm({data,mutate}){const{postId,title,content,category:categoryIds,createTime,deadline,voteInfo:serverVoteInfo,imageUrl:serverImageUrl,writer}=data??{},navigate=(0,dist.s0)(),contentImageHook=useContentImage(serverImageUrl&&(0,convertImageUrlToServerUrl.B)(serverImageUrl)),writingOptionHook=(0,useWritingOption.$)(serverVoteInfo?.options.map((option=>({...option,imageUrl:option.imageUrl?(0,convertImageUrlToServerUrl.B)(option.imageUrl):""})))),{isToastOpen,openToast,toastMessage}=(0,useToast.p)(),[selectTimeOption,setSelectTimeOption]=(0,react.useState)(getSelectedTimeOption(calculateDeadlineTime(createTime,deadline))),{isOpen,openComponent,closeComponent}=(0,useToggle.O)(),[time,setTime]=(0,react.useState)(calculateDeadlineTime(createTime,deadline)),baseTime=createTime?new Date(createTime):new Date,closeModal=()=>{if(data&&(0,utils_time.Tp)(time,data.createTime)){openToast("마감시간 지정 조건을 다시 확인해주세요.");setTime({day:0,hour:0,minute:0}),setSelectTimeOption(null)}setSelectTimeOption(Object.values(time).every((time=>0===time))?null:"사용자지정"),closeComponent()},{text:writingTitle,handleTextChange:handleTitleChange}=(0,useText.X)(title??""),{text:writingContent,handleTextChange:handleContentChange,addText:addContent}=(0,useText.X)(content??""),multiSelectHook=(0,useMultiSelect.A)(categoryIds??[],post.cb);return postId&&writer&&!(0,checkWriter.C)(writer.id)?(0,jsx_runtime.jsx)(dist.Fg,{to:path.m.HOME}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(HeaderWrapper,{children:(0,jsx_runtime.jsxs)(NarrowTemplateHeader.Z,{children:[(0,jsx_runtime.jsx)(HeaderButton,{onClick:()=>navigate("/"),children:"취소"}),(0,jsx_runtime.jsx)(HeaderButton,{type:"submit",form:"form-post",children:"저장"})]})}),(0,jsx_runtime.jsxs)("form",{id:"form-post",onSubmit:e=>{e.preventDefault();const formData=new FormData,writingOptionList=writingOptionHook.optionList.map((({text,imageUrl},index)=>({content:text,imageUrl:(0,convertImageUrlToServerUrl.X)(imageUrl)}))),imageUrlList=[(0,convertImageUrlToServerUrl.X)(contentImageHook.contentImage),...writingOptionList.map((option=>option.imageUrl))],{selectedOptionList}=multiSelectHook;if(selectedOptionList.length<1)return openToast("카테고리를 최소 1개 골라주세요.");if(selectedOptionList.length>3)return openToast("카테고리를 최대 3개 골라주세요.");if(""===writingTitle.trim())return openToast("제목은 필수로 입력해야 합니다.");if(""===writingContent.trim())return openToast("내용은 필수로 입력해야 합니다.");if(writingOptionList.length<2)return openToast("선택지는 최소 2개 입력해주세요.");if(writingOptionList.length>5)return openToast("선택지는 최대 5개 입력할 수 있습니다.");if(writingOptionList.some((option=>""===option.content.trim())))return openToast("선택지에 글을 입력해주세요.");if(Object.values(time).reduce(((a,b)=>a+b),0)<1)return openToast("시간은 필수로 입력해야 합니다.");if(e.target instanceof HTMLFormElement){const fileInputList=[...e.target.querySelectorAll('input[type="file"]')],contentImageFileList=[],optionImageFileList=[];fileInputList.forEach(((item,index)=>{item.files&&(0===index?imageUrlList[index]&&imageUrlList[index]!==serverImageUrl?contentImageFileList.push(item.files[0]):contentImageFileList.push(new File(["없는사진"],"없는사진.jpg")):imageUrlList[index]&&imageUrlList[index]!==serverVoteInfo?.options[index-1].imageUrl?optionImageFileList.push(item.files[0]):optionImageFileList.push(new File(["없는사진"],"없는사진.jpg")))})),contentImageFileList.map((file=>formData.append("contentImages",file))),optionImageFileList.map((file=>formData.append("optionImages",file)));const updatedPostTexts={categoryIds:selectedOptionList.map((option=>option.id)),title:writingTitle,imageUrl:(0,convertImageUrlToServerUrl.X)(contentImageHook.contentImage),content:writingContent,postOptions:writingOptionList,deadline:(0,formatTime.G)(time,baseTime)};formData.append("request",JSON.stringify(updatedPostTexts)),mutate(formData)}},children:[(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsxs)(LeftSide,{$hasImage:!!contentImageHook.contentImage,children:[(0,jsx_runtime.jsx)(ErrorBoundary.Z,{children:(0,jsx_runtime.jsx)(CategoryWrapper,{multiSelectHook})}),(0,jsx_runtime.jsx)(Title,{value:writingTitle,onChange:e=>handleTitleChange(e,post.Pi),placeholder:policyMessage.Nk.DEFAULT,maxLength:post.Pi.MAX_LENGTH,minLength:post.Pi.MIN_LENGTH,required:!0}),(0,jsx_runtime.jsx)(Content,{value:writingContent,onChange:e=>handleContentChange(e,post.B9),placeholder:policyMessage.K8,maxLength:post.B9.MAX_LENGTH,minLength:post.B9.MIN_LENGTH,required:!0}),(0,jsx_runtime.jsx)(ContentLinkButtonWrapper,{children:(0,jsx_runtime.jsx)(style_Button,{onClick:()=>{addContent("[[이 괄호 안에 링크를 작성해주세요]] ")},type:"button",children:"본문에 링크 넣기"})}),(0,jsx_runtime.jsx)(ContentImagePartWrapper,{$hasImage:!!contentImageHook.contentImage,children:(0,jsx_runtime.jsx)(ContentImageSection,{size:"lg",contentImageHook})})]}),(0,jsx_runtime.jsxs)(RightSide,{children:[(0,jsx_runtime.jsx)(OptionListWrapper,{children:(0,jsx_runtime.jsx)(WritingVoteOptionList.Z,{writingOptionHook})}),(0,jsx_runtime.jsxs)(Deadline,{"aria-label":"마감시간 설정",children:[(0,jsx_runtime.jsxs)(DeadlineDescription,{"aria-label":getDeadlineTime({hour:time.hour,day:time.day,minute:time.minute}),"aria-live":"polite",children:[getDeadlineTime({hour:time.hour,day:time.day,minute:time.minute}),data&&(0,jsx_runtime.jsxs)(Description,{tabIndex:0,children:["현재 시간으로부터 글 작성일(",createTime,")로부터 3일 이내 (",(0,formatTime.G)({day:3,hour:0,minute:0},baseTime),")까지만 선택 가능합니다."]}),data&&(0,jsx_runtime.jsxs)(Description,{tabIndex:0,children:["* 작성일시로부터 마감시간이 계산됩니다."," "]}),data&&(0,jsx_runtime.jsxs)(Description,{tabIndex:0,children:["* 기존 마감 시간은 ",deadline,"입니다. "]})]}),(0,jsx_runtime.jsxs)(ButtonWrapper,{children:[constants.z.map((option=>(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":option,type:"button",onClick:()=>(option=>{const targetTime=(0,formatTime.M)(option);if(data&&(0,utils_time.Tp)(targetTime,data.createTime))return openToast("마감시간 지정 조건을 다시 확인해주세요.");setSelectTimeOption(option),setTime(targetTime)})(option),theme:selectTimeOption===option?"fill":"blank",children:option},option))),(0,jsx_runtime.jsx)(SquareButton.Z,{type:"button",onClick:openComponent,theme:"사용자지정"===selectTimeOption?"fill":"blank",children:"사용자 지정"})]})]}),(0,jsx_runtime.jsx)(SaveButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"글쓰기가 저장됩니다. 저장이 완료되면 메인화면으로 이동됩니다.",theme:"fill",type:"submit",form:"form-post",children:"저장"})})]})]}),isOpen&&(0,jsx_runtime.jsx)(Modal.Z,{size:"sm",onModalClose:closeModal,"aria-label":"마감시간 설정 모달",children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)(ModalHeader,{children:[(0,jsx_runtime.jsx)("h3",{children:"마감 시간 선택"}),(0,jsx_runtime.jsx)(CloseButton,{onClick:closeModal,"aria-label":"마감시간 설정 모달 끄기",children:"X"})]}),(0,jsx_runtime.jsxs)(ModalBody,{children:[(0,jsx_runtime.jsx)(Description,{"aria-label":policyMessage.NF.DEFAULT,tabIndex:0,children:policyMessage.NF.DEFAULT}),(0,jsx_runtime.jsx)(TimePickerOptionList.Z,{time,setTime}),(0,jsx_runtime.jsx)(ResetButtonWrapper,{children:(0,jsx_runtime.jsx)(SquareButton.Z,{"aria-label":"마감시간 초기화",onClick:()=>{if(window.confirm("정말 초기화하시겠습니까?")){setTime({day:0,hour:0,minute:0})}},type:"button",theme:"blank",children:"초기화"})})]})]})})]}),isToastOpen&&(0,jsx_runtime.jsx)(Toast.Z,{size:"md",position:"bottom",children:toastMessage})]})}try{PostForm.displayName="PostForm",PostForm.__docgenInfo={description:"",displayName:"PostForm",props:{data:{defaultValue:null,description:"",name:"data",required:!1,type:{name:"PostInfo"}},mutate:{defaultValue:null,description:"",name:"mutate",required:!0,type:{name:"UseMutateFunction<any, unknown, FormData, unknown>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/PostForm/index.tsx#PostForm"]={docgenInfo:PostForm.__docgenInfo,name:"PostForm",path:"src/components/PostForm/index.tsx#PostForm"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/AddButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>AddButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:{button:"25px",font:"13px"},md:{button:"40px",font:"30px"},lg:{button:"60px",font:"50px"}},Button=styled_components_browser_esm.zo.button`
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
`,HiddenCloseButton=styled_components_browser_esm.zo.button`
  position: absolute;
  left: -10000px;
  top: -10000px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Modal({onModalClose,children,size}){const BackDropRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{const handler=e=>{e.target===BackDropRef.current&&onModalClose()};return document.addEventListener("click",handler),()=>document.removeEventListener("click",handler)}),[BackDropRef,onModalClose]),(0,jsx_runtime.jsxs)(All,{children:[(0,jsx_runtime.jsx)(HiddenCloseButton,{onClick:onModalClose,tabIndex:0,"aria-label":"팝업 창 닫기"}),(0,jsx_runtime.jsx)(Backdrop,{ref:BackDropRef}),(0,jsx_runtime.jsx)(Container,{tabIndex:0,size,children})]})}Modal.displayName="Modal";try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{onModalClose:{defaultValue:null,description:"",name:"onModalClose",required:!0,type:{name:"() => void"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/index.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/index.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/MultiSelect/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>MultiSelect});var react=__webpack_require__("./node_modules/react/index.js"),OptionCancelButton=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`,SelectIcon=styled_components_browser_esm.zo.button`
  width: 20px;
`,DropDown=styled_components_browser_esm.zo.div`
  width: 100%;
  border: 1px solid #e4e5e7;
  border-radius: 6px;
  margin-top: 10px;

  position: absolute;

  opacity: ${({$isOpened})=>$isOpened?1:0};
  visibility: ${({$isOpened})=>$isOpened?"visible":"hidden"};

  transition: all 0.2s linear 0.1s;

  & > button {
    display: block;

    width: 100%;
    list-style: none;
    padding: 10px 0px 10px 15px;
    border-bottom: 1px solid #e4e5e7;

    text-align: left;

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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function MultiSelect({selectedOptionList,optionList,handleOptionAdd,handleOptionDelete,placeholder="여러 개의 옵션을 선택해주세요"}){const[isOpen,setIsOpen]=(0,react.useState)(!1),wrapperRef=(0,react.useRef)(null),filteredOptionList=optionList.filter((option=>!selectedOptionList.some((selected=>selected.id===option.id)))),handleOutsideClick=event=>{wrapperRef.current&&!wrapperRef.current.contains(event.target)&&setIsOpen(!1)};return(0,react.useEffect)((()=>(document.addEventListener("click",handleOutsideClick),()=>{document.removeEventListener("click",handleOutsideClick)})),[]),(0,jsx_runtime.jsxs)(Container,{"aria-label":"다중선택이 가능한 셀렉터입니다.",children:[(0,jsx_runtime.jsxs)(Wrapper,{ref:wrapperRef,onClick:()=>{setIsOpen(!isOpen)},"aria-label":`선택되어있는 항목들 ${selectedOptionList.map((option=>option.name)).join(", ")}`,"aria-live":"polite",children:[(0,jsx_runtime.jsxs)(SelectedOptionListContainer,{children:[0===selectedOptionList.length&&(0,jsx_runtime.jsxs)("span",{"aria-label":"현재 선택된 옵션이 없습니다.",children:[placeholder," "]}),selectedOptionList.map((({id,name})=>(0,jsx_runtime.jsxs)(SelectedOption,{onClick:e=>e.stopPropagation(),children:[(0,jsx_runtime.jsx)("span",{children:name}),(0,jsx_runtime.jsx)(OptionCancelButton.Z,{"aria-label":`${name} 옵션 삭제`,onClick:e=>{e.stopPropagation(),handleOptionDelete(id)}})]},id)))]}),(0,jsx_runtime.jsx)(SelectIcon,{"aria-label":isOpen?"선택항목이 열렸습니다.":"선택항목이 닫혔습니다.","aria-live":"polite",children:(0,jsx_runtime.jsx)(Image,{src:isOpen?chevron_up:chevron_down,alt:"",$isSelected:isOpen})})]}),filteredOptionList.length>0&&(0,jsx_runtime.jsx)(DropDown,{$isOpened:isOpen,"aria-label":"선택하지 않은 항목들",children:filteredOptionList.map((({id,name})=>(0,jsx_runtime.jsx)("button",{"aria-label":`클릭시 ${name} 추가`,onClick:e=>{e.stopPropagation(),handleOptionAdd({id,name})},children:name},id)))})]})}MultiSelect.displayName="MultiSelect";try{MultiSelect.displayName="MultiSelect",MultiSelect.__docgenInfo={description:"",displayName:"MultiSelect",props:{selectedOptionList:{defaultValue:null,description:"",name:"selectedOptionList",required:!0,type:{name:"Option[]"}},optionList:{defaultValue:null,description:"",name:"optionList",required:!0,type:{name:"Option[]"}},handleOptionAdd:{defaultValue:null,description:"",name:"handleOptionAdd",required:!0,type:{name:"(newItem: Option) => void"}},handleOptionDelete:{defaultValue:null,description:"",name:"handleOptionDelete",required:!0,type:{name:"(optionId: number) => void"}},placeholder:{defaultValue:{value:"여러 개의 옵션을 선택해주세요"},description:"",name:"placeholder",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/MultiSelect/index.tsx#MultiSelect"]={docgenInfo:MultiSelect.__docgenInfo,name:"MultiSelect",path:"src/components/common/MultiSelect/index.tsx#MultiSelect"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/NarrowTemplateHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>NarrowTemplateHeader});const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function NarrowTemplateHeader({children}){return(0,jsx_runtime.jsx)(Container,{children})}NarrowTemplateHeader.displayName="NarrowTemplateHeader";try{NarrowTemplateHeader.displayName="NarrowTemplateHeader",NarrowTemplateHeader.__docgenInfo={description:"",displayName:"NarrowTemplateHeader",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"]={docgenInfo:NarrowTemplateHeader.__docgenInfo,name:"NarrowTemplateHeader",path:"src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/TimePickerOptionList/TimePickerOption/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TimePickerOption});var react=__webpack_require__("./node_modules/react/index.js");const TIMEBOX_CHILD_HEIGHT=33,TIME_UNIT={day:3,hour:24,minute:60},TIME_KOREAN={day:"일",hour:"시간",minute:"분"};var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TimePickerOption({currentTime,option,handlePickTime}){const timeUnit=TIME_UNIT[option],timeBoxRef=(0,react.useRef)(null),timeBoxChildRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{const timeBox=timeBoxRef.current;if(!timeBox)return;const cancelWheel=e=>e.preventDefault();return timeBox.addEventListener("wheel",cancelWheel,{passive:!1}),()=>timeBox.removeEventListener("wheel",cancelWheel)}),[]),(0,react.useEffect)((()=>{const timeBox=timeBoxRef.current,timeBoxChild=timeBoxChildRef.current;timeBox&&timeBoxChild&&(timeBox.scrollTop=timeBoxChild.offsetHeight*currentTime)}),[]),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(PickedTimeOverlay,{}),(0,jsx_runtime.jsxs)(TimeBox,{"aria-label":`현재 선택된 ${TIME_KOREAN[option]}은 ${currentTime} 입니다. 위, 아래 방향키 혹은 터치로 시간 조절이 가능합니다.`,tabIndex:0,onScroll:()=>{const timeBox=timeBoxRef.current;if(!timeBox)return;const pickedTimeIndex=Math.round(timeBox.scrollTop/TIMEBOX_CHILD_HEIGHT);pickedTimeIndex>=0&&pickedTimeIndex<timeUnit&&handlePickTime(option,pickedTimeIndex)},ref:timeBoxRef,onWheel:event=>{const timeBox=timeBoxRef.current;timeBox&&(event.deltaY>0&&(timeBox.scrollTop+=TIMEBOX_CHILD_HEIGHT),event.deltaY<0&&(timeBox.scrollTop-=TIMEBOX_CHILD_HEIGHT))},children:[(0,jsx_runtime.jsx)(Empty,{}),Array.from({length:timeUnit}).map(((_,index)=>(0,jsx_runtime.jsx)(Time,{"aria-live":"polite","aria-label":`현재 선택된 ${TIME_KOREAN[option]}은 ${currentTime} 입니다.`,ref:index===currentTime?timeBoxChildRef:null,$isPicked:currentTime===index,children:index},index))),(0,jsx_runtime.jsx)(Empty,{})]})]})}TimePickerOption.displayName="TimePickerOption";try{TimePickerOption.displayName="TimePickerOption",TimePickerOption.__docgenInfo={description:"",displayName:"TimePickerOption",props:{currentTime:{defaultValue:null,description:"",name:"currentTime",required:!0,type:{name:"number"}},option:{defaultValue:null,description:"",name:"option",required:!0,type:{name:"string"}},handlePickTime:{defaultValue:null,description:"",name:"handlePickTime",required:!0,type:{name:"(option: string, updatedTime: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/TimePickerOptionList/TimePickerOption/index.tsx#TimePickerOption"]={docgenInfo:TimePickerOption.__docgenInfo,name:"TimePickerOption",path:"src/components/common/TimePickerOptionList/TimePickerOption/index.tsx#TimePickerOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/TimePickerOptionList/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TimePickerOptionList});__webpack_require__("./node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.zo.div`
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
`;var TimePickerOption=__webpack_require__("./src/components/common/TimePickerOptionList/TimePickerOption/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TimePickerOptionList({time,setTime}){const{day,hour,minute}=time,updateTime=(option,updatedTime)=>{setTime((prev=>({...prev,[option]:updatedTime})))};return(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(Container,{children:Object.entries(time).map((([key,value])=>(0,jsx_runtime.jsx)(TimePickerOption.Z,{currentTime:value,option:key,handlePickTime:updateTime},key)))}),(0,jsx_runtime.jsxs)(PickedTimeText,{tabIndex:0,children:[(0,jsx_runtime.jsxs)("p",{children:[day,"일"]}),(0,jsx_runtime.jsxs)("p",{children:[hour,"시"]}),(0,jsx_runtime.jsxs)("p",{children:[minute,"분"]})," 후 마감"]})]})}TimePickerOptionList.displayName="TimePickerOptionList";try{TimePickerOptionList.displayName="TimePickerOptionList",TimePickerOptionList.__docgenInfo={description:"",displayName:"TimePickerOptionList",props:{time:{defaultValue:null,description:"",name:"time",required:!0,type:{name:"Time"}},setTime:{defaultValue:null,description:"",name:"setTime",required:!0,type:{name:"Dispatch<SetStateAction<Time>>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/TimePickerOptionList/index.tsx#TimePickerOptionList"]={docgenInfo:TimePickerOptionList.__docgenInfo,name:"TimePickerOptionList",path:"src/components/common/TimePickerOptionList/index.tsx#TimePickerOptionList"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>OptionCancelButton});__webpack_require__("./node_modules/react/index.js");const x_mark_white_namespaceObject=__webpack_require__.p+"static/media/x_mark_white.5e090f6f.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),style=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/style.ts");const Container=styled_components_browser_esm.zo.button`
  ${style.T$}
`,Image=(0,styled_components_browser_esm.zo)(style.Z)``;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function OptionCancelButton({...rest}){return(0,jsx_runtime.jsx)(Container,{"aria-label":"삭제",type:"button",...rest,children:(0,jsx_runtime.jsx)(Image,{src:x_mark_white_namespaceObject,alt:""})})}OptionCancelButton.displayName="OptionCancelButton";try{OptionCancelButton.displayName="OptionCancelButton",OptionCancelButton.__docgenInfo={description:"",displayName:"OptionCancelButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx#OptionCancelButton"]={docgenInfo:OptionCancelButton.__docgenInfo,name:"OptionCancelButton",path:"src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx#OptionCancelButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionUploadImageButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>OptionUploadImageButton});var react=__webpack_require__("./node_modules/react/index.js"),photo_white=__webpack_require__("./src/assets/photo_white.svg"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),style=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/style.ts");const Container=styled_components_browser_esm.zo.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  visibility: ${props=>props.$isVisible&&"hidden"};
`,Label=styled_components_browser_esm.zo.label`
  ${style.T$}
`,FileInput=styled_components_browser_esm.zo.input`
  visibility: hidden;
`,Image=(0,styled_components_browser_esm.zo)(style.Z)``;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function OptionUploadImageButton({optionId,isImageVisible,...rest}){const inputRef=(0,react.useRef)(null),id=optionId.toString();return(0,jsx_runtime.jsxs)(Container,{$isVisible:isImageVisible,children:[(0,jsx_runtime.jsx)("button",{type:"button","aria-label":"선택지 이미지 업로드",onClick:e=>{e.preventDefault(),inputRef.current&&inputRef.current.click()},children:(0,jsx_runtime.jsx)(Label,{htmlFor:id,children:(0,jsx_runtime.jsx)(Image,{src:photo_white,alt:""})})}),(0,jsx_runtime.jsx)(FileInput,{id,type:"file",accept:"image/*",tabIndex:-1,ref:inputRef,...rest})]})}OptionUploadImageButton.displayName="OptionUploadImageButton";try{OptionUploadImageButton.displayName="OptionUploadImageButton",OptionUploadImageButton.__docgenInfo={description:"",displayName:"OptionUploadImageButton",props:{optionId:{defaultValue:null,description:"",name:"optionId",required:!0,type:{name:"number"}},isImageVisible:{defaultValue:null,description:"",name:"isImageVisible",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionUploadImageButton/index.tsx#OptionUploadImageButton"]={docgenInfo:OptionUploadImageButton.__docgenInfo,name:"OptionUploadImageButton",path:"src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionUploadImageButton/index.tsx#OptionUploadImageButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WritingVoteOption});var _constants_policyMessage__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/constants/policyMessage.ts"),_OptionCancelButton__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx"),_OptionUploadImageButton__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionUploadImageButton/index.tsx"),_style__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/style.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const MAX_WRITING_LENGTH=50;function WritingVoteOption({optionId,text,isDeletable,ariaLabel,handleUpdateOptionChange,handleDeleteOptionClick,handleRemoveImageClick,handleUploadImage,imageUrl}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_style__WEBPACK_IMPORTED_MODULE_3__.W2,{"aria-label":ariaLabel,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_style__WEBPACK_IMPORTED_MODULE_3__.QU,{children:isDeletable&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_OptionCancelButton__WEBPACK_IMPORTED_MODULE_1__.Z,{title:"선택지 삭제하기",onClick:handleDeleteOptionClick})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_style__WEBPACK_IMPORTED_MODULE_3__.Y7,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_style__WEBPACK_IMPORTED_MODULE_3__.OO,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_style__WEBPACK_IMPORTED_MODULE_3__.im,{name:"optionText",defaultValue:text,onChange:e=>handleUpdateOptionChange(e),placeholder:_constants_policyMessage__WEBPACK_IMPORTED_MODULE_0__.kL.DEFAULT,maxLength:MAX_WRITING_LENGTH}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_OptionUploadImageButton__WEBPACK_IMPORTED_MODULE_2__.Z,{isImageVisible:imageUrl.length>0,optionId,onChange:handleUploadImage})]}),imageUrl&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_style__WEBPACK_IMPORTED_MODULE_3__.mo,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_style__WEBPACK_IMPORTED_MODULE_3__.Ee,{src:imageUrl,alt:text}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_style__WEBPACK_IMPORTED_MODULE_3__.S0,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_OptionCancelButton__WEBPACK_IMPORTED_MODULE_1__.Z,{onClick:handleRemoveImageClick})})]})]})]})}WritingVoteOption.displayName="WritingVoteOption";try{WritingVoteOption.displayName="WritingVoteOption",WritingVoteOption.__docgenInfo={description:"",displayName:"WritingVoteOption",props:{optionId:{defaultValue:null,description:"",name:"optionId",required:!0,type:{name:"number"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},isDeletable:{defaultValue:null,description:"",name:"isDeletable",required:!0,type:{name:"boolean"}},ariaLabel:{defaultValue:null,description:"",name:"ariaLabel",required:!0,type:{name:"string"}},handleUpdateOptionChange:{defaultValue:null,description:"",name:"handleUpdateOptionChange",required:!0,type:{name:"(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void"}},handleDeleteOptionClick:{defaultValue:null,description:"",name:"handleDeleteOptionClick",required:!0,type:{name:"() => void"}},handleRemoveImageClick:{defaultValue:null,description:"",name:"handleRemoveImageClick",required:!0,type:{name:"() => void"}},handleUploadImage:{defaultValue:null,description:"",name:"handleUploadImage",required:!0,type:{name:"(event: ChangeEvent<HTMLInputElement>) => void"}},imageUrl:{defaultValue:null,description:"",name:"imageUrl",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WritingVoteOptionList/WritingVoteOption/index.tsx#WritingVoteOption"]={docgenInfo:WritingVoteOption.__docgenInfo,name:"WritingVoteOption",path:"src/components/optionList/WritingVoteOptionList/WritingVoteOption/index.tsx#WritingVoteOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/style.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ee:()=>Image,OO:()=>ContentContainer,QU:()=>CancelButtonWrapper,S0:()=>ImageCancelWrapper,T$:()=>ButtonCssText,W2:()=>Container,Y7:()=>OptionContainer,Z:()=>IconImage,im:()=>ContentTextArea,mo:()=>ImageContainer});var styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_styles_theme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styles/theme.ts");const Container=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.li`
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
`;var WritingVoteOption=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const MINIMUM_COUNT=2,MAXIMUM_COUNT=5;function WritingVoteOptionList({writingOptionHook}){const{optionList,addOption,writingOption,deleteOption,removeImage,handleUploadImage}=writingOptionHook,isDeletable=optionList.length>MINIMUM_COUNT;return(0,jsx_runtime.jsxs)(Container,{"aria-label":`${optionList.length}개의 선택지가 있습니다.`,"aria-live":"polite",children:[optionList.map(((optionItem,index)=>(0,jsx_runtime.jsx)(WritingVoteOption.Z,{ariaLabel:`${index+1}번 선택지`,optionId:optionItem.id,isDeletable,text:optionItem.text,handleUpdateOptionChange:writingOption(optionItem.id),handleDeleteOptionClick:()=>deleteOption(optionItem.id),handleRemoveImageClick:()=>removeImage(optionItem.id),handleUploadImage:event=>handleUploadImage(event,optionItem.id),imageUrl:optionItem.imageUrl},optionItem.id))),optionList.length<MAXIMUM_COUNT&&(0,jsx_runtime.jsx)(AddButtonWrapper,{children:(0,jsx_runtime.jsx)(AddButton.Z,{type:"button",size:"md","aria-label":"선택지 추가",onClick:addOption})})]})}WritingVoteOptionList.displayName="WritingVoteOptionList";try{WritingVoteOptionList.displayName="WritingVoteOptionList",WritingVoteOptionList.__docgenInfo={description:"",displayName:"WritingVoteOptionList",props:{writingOptionHook:{defaultValue:null,description:"",name:"writingOptionHook",required:!0,type:{name:"{ optionList: WritingVoteOptionType[]; addOption: () => void; writingOption: (optionId: number) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; deleteOption: (optionId: number) => void; removeImage: (optionId: number) => void; handleUploadImage: (event: ChangeEvent<...>, optionId: number) =>..."}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WritingVoteOptionList/index.tsx#WritingVoteOptionList"]={docgenInfo:WritingVoteOptionList.__docgenInfo,name:"WritingVoteOptionList",path:"src/components/optionList/WritingVoteOptionList/index.tsx#WritingVoteOptionList"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/policyMessage.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K8:()=>CONTENT_PLACEHOLDER,NF:()=>POST_DEADLINE_POLICY,Nk:()=>POST_TITLE_POLICY,Rp:()=>NICKNAME_POLICY,kL:()=>POST_OPTION_POLICY});const NICKNAME_POLICY={LETTER_AMOUNT:"2자에서 15자 이내로 입력해주세요.",NO_DUPLICATION:"중복된 닉네임은 사용할 수 없습니다.",LIMIT_CHANGING:"닉네임 변경은 14일간 1회로 제한됩니다.",LIMIT_LETTER_TYPE:"한글/영어/숫자를 사용해 닉네임을 지어주세요.",LIMIT_KOREAN:"한글은 완전한 단어만 가능합니다."},POST_TITLE_POLICY={DEFAULT:"제목을 입력해주세요 (100자 이내)",LETTER_AMOUNT:"100자 이내로 입력해주세요."},POST_CONTENT_POLICY={DEFAULT:"내용을 입력해주세요 (1000자 이내)",LETTER_AMOUNT:"1000자 이내로 입력해주세요.",PHOTO_COUNT:"1장의 사진을 업로드 할 수 있습니다.",PHOTO_SHAPE:"사진은 정사각형으로 잘라져 업로드됩니다.",PHOTO_CAPACITY:"용량은 1.5MB으로 제한됩니다."},POST_OPTION_POLICY={DEFAULT:"선택지를 입력해주세요 (50자 이내)",LETTER_AMOUNT:"50자 이내로 입력해주세요.",AMOUNT:"2개 ~ 5개 선택지를 작성해주세요.",PHOTO_COUNT:"1장의 사진을 업로드 할 수 있습니다.",PHOTO_SHAPE:"사진은 정사각형으로 잘라져 업로드됩니다.",PHOTO_CAPACITY:"용량은 1.5MB으로 제한됩니다."},POST_DEADLINE_POLICY={DEFAULT:"3일 이내로 마감시간을 정해주세요."},CONTENT_PLACEHOLDER=[POST_CONTENT_POLICY.DEFAULT,POST_CONTENT_POLICY.PHOTO_COUNT,POST_CONTENT_POLICY.PHOTO_CAPACITY,POST_CONTENT_POLICY.PHOTO_SHAPE].join("\n - ")},"./src/hooks/query/post/useEditPost.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>useEditPost});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),_api_post__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/api/post.ts"),_constants_queryKey__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/queryKey.ts");const useEditPost=postId=>{const queryClient=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.NL)(),{mutate,isLoading,isSuccess,isError,error}=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.D)((updatedPost=>(0,_api_post__WEBPACK_IMPORTED_MODULE_0__.dq)(postId,updatedPost)),{onSuccess:()=>{queryClient.invalidateQueries([_constants_queryKey__WEBPACK_IMPORTED_MODULE_1__.l.POST_DETAIL,postId])},onError:error=>{window.console.log("editPost error",error)}});return{mutate,isLoading,isSuccess,isError,error}}},"./src/hooks/useMultiSelect.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>useMultiSelect});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useMultiSelect=(initialSelectedOptionList,optionCountLimit)=>{const[selectedOptionList,setSelectedOptionList]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialSelectedOptionList);return{selectedOptionList,handleOptionAdd:newItem=>{optionCountLimit&&optionCountLimit===selectedOptionList.length?alert(`${optionCountLimit}개까지 선택 가능합니다!`):setSelectedOptionList([...selectedOptionList,newItem])},handleOptionDelete:optionId=>{setSelectedOptionList(selectedOptionList.filter((option=>option.id!==optionId)))}}}},"./src/hooks/useText.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>useText});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useText=originalText=>{const[text,setText]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(originalText);return{text,setText,handleTextChange:(event,limit)=>{const{value}=event.target;if(value.length>limit.MAX_LENGTH)return event.target.setCustomValidity(`해당 입력값은 ${limit.MAX_LENGTH}자까지 입력 가능합니다.`),void event.target.reportValidity();setText(value),event.target.setCustomValidity("")},resetText:()=>{setText("")},addText:newTextToAdd=>{setText(text+newTextToAdd)}}}},"./src/hooks/useToggle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>useToggle});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useToggle=(isInitialOpen=!1)=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(isInitialOpen);return{isOpen,openComponent:()=>{setIsOpen(!0)},closeComponent:()=>{setIsOpen(!1)},toggleComponent:()=>{setIsOpen((prevIsOpen=>!prevIsOpen))}}};try{useToggle.displayName="useToggle",useToggle.__docgenInfo={description:"",displayName:"useToggle",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useToggle.tsx#useToggle"]={docgenInfo:useToggle.__docgenInfo,name:"useToggle",path:"src/hooks/useToggle.tsx#useToggle"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useWritingOption.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>useWritingOption});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_PostForm_constants__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/PostForm/constants.ts");const INIT_OPTION_LIST=[{id:Math.floor(1e5*Math.random()),text:"",imageUrl:""},{id:Math.floor(1e5*Math.random()),text:"",imageUrl:""}],useWritingOption=(initialOptionList=INIT_OPTION_LIST)=>{const[optionList,setOptionList]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOptionList);return{optionList,addOption:()=>{if(optionList.length>=5)return;const updatedOptionList=[...optionList,{id:Math.floor(1e5*Math.random()),text:"",imageUrl:""}];setOptionList(updatedOptionList)},writingOption:optionId=>event=>{const{value}=event.target;if(50===value.length)return event.target.setCustomValidity("선택지 내용은 50자까지 입력 가능합니다."),void event.target.reportValidity();const updateOptionList=optionList.map((optionItem=>optionItem.id!==optionId?optionItem:{...optionItem,text:value}));event.target.setCustomValidity(""),setOptionList(updateOptionList)},deleteOption:optionId=>{if(optionList.length<=2)return;const removedOptionList=optionList.filter((optionItem=>optionItem.id!==optionId));setOptionList(removedOptionList)},removeImage:optionId=>{const updatedOptionList=optionList.map((optionItem=>optionItem.id===optionId?{...optionItem,imageUrl:""}:optionItem));setOptionList(updatedOptionList)},handleUploadImage:(event,optionId)=>{const{files}=event.target;if(!files)return;const file=files[0];if(event.target.setCustomValidity(""),file.size>_components_PostForm_constants__WEBPACK_IMPORTED_MODULE_1__.T)return event.target.setCustomValidity("사진의 용량은 1.5MB 이하만 가능합니다."),void event.target.reportValidity();const reader=new FileReader;reader.readAsDataURL(file),reader.onloadend=()=>{const updatedOptionList=optionList.map((optionItem=>optionItem.id===optionId?{...optionItem,imageUrl:reader.result?.toString()??""}:optionItem));setOptionList(updatedOptionList)}}}};try{useWritingOption.displayName="useWritingOption",useWritingOption.__docgenInfo={description:"",displayName:"useWritingOption",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useWritingOption.tsx#useWritingOption"]={docgenInfo:useWritingOption.__docgenInfo,name:"useWritingOption",path:"src/hooks/useWritingOption.tsx#useWritingOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/post/checkWriter.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>checkWriter});var _constants_localStorage__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/localStorage.ts"),_utils_localStorage__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/localStorage.ts"),_utils_token_decodeToken__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/utils/token/decodeToken.ts");function checkWriter(writerId){const accessToken=(0,_utils_localStorage__WEBPACK_IMPORTED_MODULE_0__.$o)(_constants_localStorage__WEBPACK_IMPORTED_MODULE_1__.W);if(!accessToken)return!1;return writerId===(0,_utils_token_decodeToken__WEBPACK_IMPORTED_MODULE_2__.T)(accessToken).memberId}},"./src/utils/post/convertImageUrlToServerUrl.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>convertImageUrlToServerUrl,X:()=>convertServerUrlToImageUrl});var _constants_post__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/constants/post.ts");const convertImageUrlToServerUrl=imageUrl=>`${_constants_post__WEBPACK_IMPORTED_MODULE_0__.f_}${imageUrl}`,convertServerUrlToImageUrl=imageUrl=>imageUrl.replace(_constants_post__WEBPACK_IMPORTED_MODULE_0__.f_,"")},"./src/assets/photo_white.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/photo_white.830f687b.svg"}}]);
//# sourceMappingURL=4133.233f8a95.iframe.bundle.js.map