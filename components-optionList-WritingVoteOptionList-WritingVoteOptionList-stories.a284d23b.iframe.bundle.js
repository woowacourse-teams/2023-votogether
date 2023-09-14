"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[7572],{"./src/components/optionList/WritingVoteOptionList/WritingVoteOptionList.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DefaultOptionList:()=>DefaultOptionList,MaxCountOptionList:()=>MaxCountOptionList,MinCountOptionList:()=>MinCountOptionList,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_hooks_useWritingOption__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/hooks/useWritingOption.tsx"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/optionList/WritingVoteOptionList/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_1__.Z},ListWrapper=styled_components__WEBPACK_IMPORTED_MODULE_3__.zo.div`
  width: 100%;
  max-width: 320px;
`,MOCK_MAX_VOTE_OPTION=[{id:1234123,text:"",imageUrl:""},{id:1234177,text:"",imageUrl:""},{id:1234221,text:"방학 때 강릉으로  강아지와 기차여행을 하려했지만 장마가 와서 취소했어요. 여행을 별로 좋",imageUrl:""},{id:1834221,text:"방학 때 강릉으로  강아지와 기차여행을 하려했지만 장마가 와서 취소했어요. 여행을 별로 좋",imageUrl:"https://source.unsplash.com/random"},{id:1234451,text:"",imageUrl:"https://source.unsplash.com/random"}],MOCK_MIN_VOTE_OPTION=[{id:123741,text:"",imageUrl:""},{id:123415,text:"",imageUrl:""}],DefaultOptionList=()=>{const writingOptionHook=(0,_hooks_useWritingOption__WEBPACK_IMPORTED_MODULE_0__.$)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ListWrapper,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{writingOptionHook})})};DefaultOptionList.displayName="DefaultOptionList";const MaxCountOptionList=()=>{const writingOptionHook=(0,_hooks_useWritingOption__WEBPACK_IMPORTED_MODULE_0__.$)(MOCK_MAX_VOTE_OPTION);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ListWrapper,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{writingOptionHook})})};MaxCountOptionList.displayName="MaxCountOptionList";const MinCountOptionList=()=>{const writingOptionHook=(0,_hooks_useWritingOption__WEBPACK_IMPORTED_MODULE_0__.$)(MOCK_MIN_VOTE_OPTION);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ListWrapper,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{writingOptionHook})})};MinCountOptionList.displayName="MinCountOptionList",DefaultOptionList.parameters={...DefaultOptionList.parameters,docs:{...DefaultOptionList.parameters?.docs,source:{originalSource:"() => {\n  const writingOptionHook = useWritingOption();\n  return <ListWrapper>\n      <WritingVoteOptionList writingOptionHook={writingOptionHook} />\n    </ListWrapper>;\n}",...DefaultOptionList.parameters?.docs?.source}}},MaxCountOptionList.parameters={...MaxCountOptionList.parameters,docs:{...MaxCountOptionList.parameters?.docs,source:{originalSource:"() => {\n  const writingOptionHook = useWritingOption(MOCK_MAX_VOTE_OPTION);\n  return <ListWrapper>\n      <WritingVoteOptionList writingOptionHook={writingOptionHook} />\n    </ListWrapper>;\n}",...MaxCountOptionList.parameters?.docs?.source}}},MinCountOptionList.parameters={...MinCountOptionList.parameters,docs:{...MinCountOptionList.parameters?.docs,source:{originalSource:"() => {\n  const writingOptionHook = useWritingOption(MOCK_MIN_VOTE_OPTION);\n  return <ListWrapper>\n      <WritingVoteOptionList writingOptionHook={writingOptionHook} />\n    </ListWrapper>;\n}",...MinCountOptionList.parameters?.docs?.source}}};const __namedExportsOrder=["DefaultOptionList","MaxCountOptionList","MinCountOptionList"]},"./src/components/PostForm/constants.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>MAX_FILE_SIZE,z:()=>DEADLINE_OPTION});const DEADLINE_OPTION=["10분","30분","1시간","6시간","1일"],MAX_FILE_SIZE=15e5},"./src/components/common/AddButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>AddButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:{button:"25px",font:"13px"},md:{button:"40px",font:"30px"},lg:{button:"60px",font:"50px"}},Button=styled_components_browser_esm.zo.button`
  display: block;

  width: ${props=>SIZE[props.size].button};
  height: ${props=>SIZE[props.size].button};
  border-radius: 50%;

  background-color: var(--primary-color);
  color: var(--white);

  font-size: ${props=>SIZE[props.size].font};

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function AddButton({size,...rest}){return(0,jsx_runtime.jsx)(Button,{size,"aria-label":"더하기",...rest,children:"+"})}AddButton.displayName="AddButton";try{AddButton.displayName="AddButton",AddButton.__docgenInfo={description:"",displayName:"AddButton",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/AddButton/index.tsx#AddButton"]={docgenInfo:AddButton.__docgenInfo,name:"AddButton",path:"src/components/common/AddButton/index.tsx#AddButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>OptionCancelButton});__webpack_require__("./node_modules/react/index.js");const x_mark_white_namespaceObject=__webpack_require__.p+"static/media/x_mark_white.5e090f6f.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),style=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/style.ts");const Container=styled_components_browser_esm.zo.button`
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
`;var WritingVoteOption=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const MINIMUM_COUNT=2,MAXIMUM_COUNT=5;function WritingVoteOptionList({writingOptionHook}){const{optionList,addOption,writingOption,deleteOption,removeImage,handleUploadImage}=writingOptionHook,isDeletable=optionList.length>MINIMUM_COUNT;return(0,jsx_runtime.jsxs)(Container,{"aria-label":`${optionList.length}개의 선택지가 있습니다.`,"aria-live":"polite",children:[optionList.map(((optionItem,index)=>(0,jsx_runtime.jsx)(WritingVoteOption.Z,{ariaLabel:`${index+1}번 선택지`,optionId:optionItem.id,isDeletable,text:optionItem.text,handleUpdateOptionChange:writingOption(optionItem.id),handleDeleteOptionClick:()=>deleteOption(optionItem.id),handleRemoveImageClick:()=>removeImage(optionItem.id),handleUploadImage:event=>handleUploadImage(event,optionItem.id),imageUrl:optionItem.imageUrl},optionItem.id))),optionList.length<MAXIMUM_COUNT&&(0,jsx_runtime.jsx)(AddButtonWrapper,{children:(0,jsx_runtime.jsx)(AddButton.Z,{type:"button",size:"md","aria-label":"선택지 추가",onClick:addOption})})]})}WritingVoteOptionList.displayName="WritingVoteOptionList";try{WritingVoteOptionList.displayName="WritingVoteOptionList",WritingVoteOptionList.__docgenInfo={description:"",displayName:"WritingVoteOptionList",props:{writingOptionHook:{defaultValue:null,description:"",name:"writingOptionHook",required:!0,type:{name:"{ optionList: WritingVoteOptionType[]; addOption: () => void; writingOption: (optionId: number) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; deleteOption: (optionId: number) => void; removeImage: (optionId: number) => void; handleUploadImage: (event: ChangeEvent<...>, optionId: number) =>..."}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WritingVoteOptionList/index.tsx#WritingVoteOptionList"]={docgenInfo:WritingVoteOptionList.__docgenInfo,name:"WritingVoteOptionList",path:"src/components/optionList/WritingVoteOptionList/index.tsx#WritingVoteOptionList"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/policyMessage.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K8:()=>CONTENT_PLACEHOLDER,NF:()=>POST_DEADLINE_POLICY,Nk:()=>POST_TITLE_POLICY,Rp:()=>NICKNAME_POLICY,kL:()=>POST_OPTION_POLICY});const NICKNAME_POLICY={LETTER_AMOUNT:"2자에서 15자 이내로 입력해주세요.",NO_DUPLICATION:"중복된 닉네임은 사용할 수 없습니다.",LIMIT_CHANGING:"닉네임 변경은 14일간 1회로 제한됩니다.",LIMIT_LETTER_TYPE:"한글/영어/숫자를 사용해 닉네임을 지어주세요.",LIMIT_KOREAN:"한글은 완전한 단어만 가능합니다."},POST_TITLE_POLICY={DEFAULT:"제목을 입력해주세요 (100자 이내)",LETTER_AMOUNT:"100자 이내로 입력해주세요."},POST_CONTENT_POLICY={DEFAULT:"내용을 입력해주세요 (1000자 이내)",LETTER_AMOUNT:"1000자 이내로 입력해주세요.",PHOTO_COUNT:"1장의 사진을 업로드 할 수 있습니다.",PHOTO_SHAPE:"사진은 정사각형으로 잘라져 업로드됩니다.",PHOTO_CAPACITY:"용량은 1.5MB으로 제한됩니다."},POST_OPTION_POLICY={DEFAULT:"선택지를 입력해주세요 (50자 이내)",LETTER_AMOUNT:"50자 이내로 입력해주세요.",AMOUNT:"2개 ~ 5개 선택지를 작성해주세요.",PHOTO_COUNT:"1장의 사진을 업로드 할 수 있습니다.",PHOTO_SHAPE:"사진은 정사각형으로 잘라져 업로드됩니다.",PHOTO_CAPACITY:"용량은 1.5MB으로 제한됩니다."},POST_DEADLINE_POLICY={DEFAULT:"3일 이내로 마감시간을 정해주세요."},CONTENT_PLACEHOLDER=[POST_CONTENT_POLICY.DEFAULT,POST_CONTENT_POLICY.PHOTO_COUNT,POST_CONTENT_POLICY.PHOTO_CAPACITY,POST_CONTENT_POLICY.PHOTO_SHAPE].join("\n - ")},"./src/hooks/useWritingOption.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>useWritingOption});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_PostForm_constants__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/PostForm/constants.ts");const INIT_OPTION_LIST=[{id:Math.floor(1e5*Math.random()),text:"",imageUrl:""},{id:Math.floor(1e5*Math.random()),text:"",imageUrl:""}],useWritingOption=(initialOptionList=INIT_OPTION_LIST)=>{const[optionList,setOptionList]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOptionList);return{optionList,addOption:()=>{if(optionList.length>=5)return;const updatedOptionList=[...optionList,{id:Math.floor(1e5*Math.random()),text:"",imageUrl:""}];setOptionList(updatedOptionList)},writingOption:optionId=>event=>{const{value}=event.target;if(50===value.length)return event.target.setCustomValidity("선택지 내용은 50자까지 입력 가능합니다."),void event.target.reportValidity();const updateOptionList=optionList.map((optionItem=>optionItem.id!==optionId?optionItem:{...optionItem,text:value}));event.target.setCustomValidity(""),setOptionList(updateOptionList)},deleteOption:optionId=>{if(optionList.length<=2)return;const removedOptionList=optionList.filter((optionItem=>optionItem.id!==optionId));setOptionList(removedOptionList)},removeImage:optionId=>{const updatedOptionList=optionList.map((optionItem=>optionItem.id===optionId?{...optionItem,imageUrl:""}:optionItem));setOptionList(updatedOptionList)},handleUploadImage:(event,optionId)=>{const{files}=event.target;if(!files)return;const file=files[0];if(event.target.setCustomValidity(""),file.size>_components_PostForm_constants__WEBPACK_IMPORTED_MODULE_1__.T)return event.target.setCustomValidity("사진의 용량은 1.5MB 이하만 가능합니다."),void event.target.reportValidity();const reader=new FileReader;reader.readAsDataURL(file),reader.onloadend=()=>{const updatedOptionList=optionList.map((optionItem=>optionItem.id===optionId?{...optionItem,imageUrl:reader.result?.toString()??""}:optionItem));setOptionList(updatedOptionList)}}}};try{useWritingOption.displayName="useWritingOption",useWritingOption.__docgenInfo={description:"",displayName:"useWritingOption",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useWritingOption.tsx#useWritingOption"]={docgenInfo:useWritingOption.__docgenInfo,name:"useWritingOption",path:"src/hooks/useWritingOption.tsx#useWritingOption"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
  0% {
      background-color: rgba(165, 165, 165, 0.1);
  }

  50% {
      background-color: rgba(165, 165, 165, 0.3);
  }
  
  100% {
      background-color: rgba(165, 165, 165, 0.1);
  }
  `,skeletonGradientWave:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
  to {
      background-position-x: -200%;
    }
  `}}},"./src/assets/photo_white.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/photo_white.830f687b.svg"}}]);
//# sourceMappingURL=components-optionList-WritingVoteOptionList-WritingVoteOptionList-stories.a284d23b.iframe.bundle.js.map