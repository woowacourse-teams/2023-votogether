"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[4223],{"./src/components/common/MultiSelect/MultiSelect.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CategoryNotSelected:()=>CategoryNotSelected,CategorySelected:()=>CategorySelected,NotSelected:()=>NotSelected,Selected:()=>Selected,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _hooks_useMultiSelect__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/hooks/useMultiSelect.ts"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/MultiSelect/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_1__.Z,decorators:[storyFn=>storyFn()]},MOCK_OPTION_LIST=[{id:1,name:"옵션1"},{id:2,name:"옵션2"},{id:5,name:"옵션3"},{id:7,name:"옵션4"},{id:9,name:"옵션5"},{id:10,name:"옵션6"},{id:11,name:"옵션7"},{id:13,name:"옵션8"},{id:15,name:"옵션9"},{id:16,name:"매우 긴----------~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~옵션10"}],MOCK_CATEGORY_LIST=[{id:1,name:"음식"},{id:2,name:"패션"},{id:5,name:"금융"},{id:7,name:"게임"},{id:9,name:"개발"},{id:10,name:"연애"},{id:11,name:"취미"},{id:13,name:"주식"},{id:15,name:"연예"},{id:16,name:"정치"}],NotSelected=()=>{const{selectedOptionList,handleOptionAdd,handleOptionDelete}=(0,_hooks_useMultiSelect__WEBPACK_IMPORTED_MODULE_0__.A)([]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{selectedOptionList,optionList:MOCK_OPTION_LIST,handleOptionAdd,handleOptionDelete,placeholder:"여러 개의 옵션을 선택해주세요."})};NotSelected.displayName="NotSelected";const Selected=()=>{const initialSelectedOptionList=MOCK_OPTION_LIST.filter((option=>"옵션1"===option.name||"옵션7"===option.name)),{selectedOptionList,handleOptionAdd,handleOptionDelete}=(0,_hooks_useMultiSelect__WEBPACK_IMPORTED_MODULE_0__.A)(initialSelectedOptionList);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{selectedOptionList,optionList:MOCK_OPTION_LIST,handleOptionAdd,handleOptionDelete})};Selected.displayName="Selected";const CategoryNotSelected=()=>{const{selectedOptionList,handleOptionAdd,handleOptionDelete}=(0,_hooks_useMultiSelect__WEBPACK_IMPORTED_MODULE_0__.A)([],3);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{selectedOptionList,optionList:MOCK_CATEGORY_LIST,handleOptionAdd,handleOptionDelete,placeholder:"카테고리를 선택해주세요."})};CategoryNotSelected.displayName="CategoryNotSelected";const CategorySelected=()=>{const initialSelectedOptionList=MOCK_CATEGORY_LIST.filter((option=>7===option.id||9===option.id)),{selectedOptionList,handleOptionAdd,handleOptionDelete}=(0,_hooks_useMultiSelect__WEBPACK_IMPORTED_MODULE_0__.A)(initialSelectedOptionList,3);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{selectedOptionList,optionList:MOCK_CATEGORY_LIST,handleOptionAdd,handleOptionDelete})};CategorySelected.displayName="CategorySelected",NotSelected.parameters={...NotSelected.parameters,docs:{...NotSelected.parameters?.docs,source:{originalSource:'() => {\n  const {\n    selectedOptionList,\n    handleOptionAdd,\n    handleOptionDelete\n  } = useMultiSelect([]);\n  return <MultiSelect selectedOptionList={selectedOptionList} optionList={MOCK_OPTION_LIST} handleOptionAdd={handleOptionAdd} handleOptionDelete={handleOptionDelete} placeholder="여러 개의 옵션을 선택해주세요." />;\n}',...NotSelected.parameters?.docs?.source}}},Selected.parameters={...Selected.parameters,docs:{...Selected.parameters?.docs,source:{originalSource:"() => {\n  const initialSelectedOptionList = MOCK_OPTION_LIST.filter(option => option.name === '옵션1' || option.name === '옵션7');\n  const {\n    selectedOptionList,\n    handleOptionAdd,\n    handleOptionDelete\n  } = useMultiSelect(initialSelectedOptionList);\n  return <MultiSelect selectedOptionList={selectedOptionList} optionList={MOCK_OPTION_LIST} handleOptionAdd={handleOptionAdd} handleOptionDelete={handleOptionDelete} />;\n}",...Selected.parameters?.docs?.source}}},CategoryNotSelected.parameters={...CategoryNotSelected.parameters,docs:{...CategoryNotSelected.parameters?.docs,source:{originalSource:'() => {\n  const CATEGORY_COUNT_LIMIT = 3;\n  const {\n    selectedOptionList,\n    handleOptionAdd,\n    handleOptionDelete\n  } = useMultiSelect([], CATEGORY_COUNT_LIMIT);\n  return <MultiSelect selectedOptionList={selectedOptionList} optionList={MOCK_CATEGORY_LIST} handleOptionAdd={handleOptionAdd} handleOptionDelete={handleOptionDelete} placeholder="카테고리를 선택해주세요." />;\n}',...CategoryNotSelected.parameters?.docs?.source}}},CategorySelected.parameters={...CategorySelected.parameters,docs:{...CategorySelected.parameters?.docs,source:{originalSource:"() => {\n  const CATEGORY_COUNT_LIMIT = 3;\n  const initialSelectedOptionList = MOCK_CATEGORY_LIST.filter(option => option.id === 7 || option.id === 9);\n  const {\n    selectedOptionList,\n    handleOptionAdd,\n    handleOptionDelete\n  } = useMultiSelect(initialSelectedOptionList, CATEGORY_COUNT_LIMIT);\n  return <MultiSelect selectedOptionList={selectedOptionList} optionList={MOCK_CATEGORY_LIST} handleOptionAdd={handleOptionAdd} handleOptionDelete={handleOptionDelete} />;\n}",...CategorySelected.parameters?.docs?.source}}};const __namedExportsOrder=["NotSelected","Selected","CategoryNotSelected","CategorySelected"]},"./src/components/common/MultiSelect/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>MultiSelect});var react=__webpack_require__("./node_modules/react/index.js"),OptionCancelButton=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function MultiSelect({selectedOptionList,optionList,handleOptionAdd,handleOptionDelete,placeholder="여러 개의 옵션을 선택해주세요"}){const[isOpen,setIsOpen]=(0,react.useState)(!1),filteredOptionList=optionList.filter((option=>!selectedOptionList.some((selected=>selected.id===option.id))));return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(Wrapper,{onClick:()=>{setIsOpen(!isOpen)},children:[(0,jsx_runtime.jsxs)(SelectedOptionListContainer,{children:[0===selectedOptionList.length&&(0,jsx_runtime.jsxs)("span",{children:[placeholder," "]}),selectedOptionList.map((({id,name})=>(0,jsx_runtime.jsxs)(SelectedOption,{onClick:e=>e.stopPropagation(),children:[(0,jsx_runtime.jsx)("span",{children:name}),(0,jsx_runtime.jsx)(OptionCancelButton.Z,{onClick:e=>{e.stopPropagation(),handleOptionDelete(id)}})]},id)))]}),(0,jsx_runtime.jsx)(SelectIcon,{children:(0,jsx_runtime.jsx)(Image,{src:isOpen?chevron_up:chevron_down,alt:"",$isSelected:isOpen})})]}),filteredOptionList.length>0&&(0,jsx_runtime.jsx)(DropDown,{$isOpened:isOpen,children:filteredOptionList.map((({id,name})=>(0,jsx_runtime.jsx)("li",{onClick:e=>{e.stopPropagation(),handleOptionAdd({id,name})},children:name},id)))})]})}MultiSelect.displayName="MultiSelect";try{MultiSelect.displayName="MultiSelect",MultiSelect.__docgenInfo={description:"",displayName:"MultiSelect",props:{selectedOptionList:{defaultValue:null,description:"",name:"selectedOptionList",required:!0,type:{name:"Option[]"}},optionList:{defaultValue:null,description:"",name:"optionList",required:!0,type:{name:"Option[]"}},handleOptionAdd:{defaultValue:null,description:"",name:"handleOptionAdd",required:!0,type:{name:"(newItem: Option) => void"}},handleOptionDelete:{defaultValue:null,description:"",name:"handleOptionDelete",required:!0,type:{name:"(optionId: number) => void"}},placeholder:{defaultValue:{value:"여러 개의 옵션을 선택해주세요"},description:"",name:"placeholder",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/MultiSelect/index.tsx#MultiSelect"]={docgenInfo:MultiSelect.__docgenInfo,name:"MultiSelect",path:"src/components/common/MultiSelect/index.tsx#MultiSelect"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>OptionCancelButton});__webpack_require__("./node_modules/react/index.js");const x_mark_white_namespaceObject=__webpack_require__.p+"static/media/x_mark_white.5e090f6f.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),style=__webpack_require__("./src/components/optionList/WritingVoteOptionList/WritingVoteOption/style.ts");const Container=styled_components_browser_esm.zo.button`
  ${style.T$}
`,Image=(0,styled_components_browser_esm.zo)(style.Z)``;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function OptionCancelButton({...rest}){return(0,jsx_runtime.jsx)(Container,{"aria-label":"삭제",type:"button",...rest,children:(0,jsx_runtime.jsx)(Image,{src:x_mark_white_namespaceObject,alt:""})})}OptionCancelButton.displayName="OptionCancelButton";try{OptionCancelButton.displayName="OptionCancelButton",OptionCancelButton.__docgenInfo={description:"",displayName:"OptionCancelButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx#OptionCancelButton"]={docgenInfo:OptionCancelButton.__docgenInfo,name:"OptionCancelButton",path:"src/components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton/index.tsx#OptionCancelButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/optionList/WritingVoteOptionList/WritingVoteOption/style.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ee:()=>Image,OO:()=>ContentContainer,QU:()=>CancelButtonWrapper,S0:()=>ImageCancelWrapper,T$:()=>ButtonCssText,W2:()=>Container,Y7:()=>OptionContainer,Z:()=>IconImage,im:()=>ContentTextArea,mo:()=>ImageContainer});var styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_styles_theme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styles/theme.ts");const Container=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.li`
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
`},"./src/hooks/useMultiSelect.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>useMultiSelect});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useMultiSelect=(initialSelectedOptionList,optionCountLimit)=>{const[selectedOptionList,setSelectedOptionList]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialSelectedOptionList);return{selectedOptionList,handleOptionAdd:newItem=>{optionCountLimit&&optionCountLimit===selectedOptionList.length?alert(`${optionCountLimit}개까지 선택 가능합니다!`):setSelectedOptionList([...selectedOptionList,newItem])},handleOptionDelete:optionId=>{setSelectedOptionList(selectedOptionList.filter((option=>option.id!==optionId)))}}}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{header:100,modal:200}}},"./src/assets/chevron-down.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-down.f97a5bb1.svg"},"./src/assets/chevron-up.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-up.a1eb858b.svg"}}]);
//# sourceMappingURL=components-common-MultiSelect-MultiSelect-stories.57bfd01e.iframe.bundle.js.map