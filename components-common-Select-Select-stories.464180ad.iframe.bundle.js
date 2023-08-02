"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[9591],{"./src/components/common/Select/Select.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Disabled:()=>Disabled,PostStatus:()=>PostStatus,SelectExample:()=>SelectExample,Sorting:()=>Sorting,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Select/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_1__.Z,decorators:[storyFn=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{width:"100px"},children:storyFn()})]},MOCK_STATUS_OPTION={all:"전체",progress:"진행중",closed:"마감완료"},MOCK_SORTING_OPTION={popular:"인기순",latest:"최신순",longLong:"엄청나게 긴 옵션"},PostStatus={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{"aria-label":"게시글 진행 상태 선택",selectedOption:"진행중",optionList:MOCK_STATUS_OPTION,handleOptionChange:()=>{}})},Sorting={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{"aria-label":"게시글 정렬 방법 선택",selectedOption:"최신순",optionList:MOCK_SORTING_OPTION,handleOptionChange:()=>{}})},Disabled={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{"aria-label":"게시글 정렬 방법 선택",isDisabled:!0,selectedOption:"최신순",optionList:MOCK_SORTING_OPTION,handleOptionChange:()=>{}})},SelectExample=()=>{const[selectedOption,setSelectedOption]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("popular");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{"aria-label":"게시글 정렬 방법 선택",selectedOption:MOCK_SORTING_OPTION[selectedOption],optionList:MOCK_SORTING_OPTION,handleOptionChange:option=>{setSelectedOption(option)}})};SelectExample.displayName="SelectExample",PostStatus.parameters={...PostStatus.parameters,docs:{...PostStatus.parameters?.docs,source:{originalSource:'{\n  render: () => <Select<PostStatusType> aria-label="게시글 진행 상태 선택" selectedOption="진행중" optionList={MOCK_STATUS_OPTION} handleOptionChange={() => {}} />\n}',...PostStatus.parameters?.docs?.source}}},Sorting.parameters={...Sorting.parameters,docs:{...Sorting.parameters?.docs,source:{originalSource:'{\n  render: () => <Select aria-label="게시글 정렬 방법 선택" selectedOption="최신순" optionList={MOCK_SORTING_OPTION} handleOptionChange={() => {}} />\n}',...Sorting.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:'{\n  render: () => <Select aria-label="게시글 정렬 방법 선택" isDisabled={true} selectedOption="최신순" optionList={MOCK_SORTING_OPTION} handleOptionChange={() => {}} />\n}',...Disabled.parameters?.docs?.source}}},SelectExample.parameters={...SelectExample.parameters,docs:{...SelectExample.parameters?.docs,source:{originalSource:"() => {\n  const [selectedOption, setSelectedOption] = useState<SortingOptionType>('popular');\n  const handelOptionChange = (option: SortingOptionType) => {\n    setSelectedOption(option);\n  };\n  return <Select<SortingOptionType> aria-label=\"게시글 정렬 방법 선택\" selectedOption={MOCK_SORTING_OPTION[selectedOption]} optionList={MOCK_SORTING_OPTION} handleOptionChange={handelOptionChange} />;\n}",...SelectExample.parameters?.docs?.source}}};const __namedExportsOrder=["PostStatus","Sorting","Disabled","SelectExample"]},"./src/components/common/Select/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Select});var react=__webpack_require__("./node_modules/react/index.js"),chevron_down=__webpack_require__("./src/assets/chevron-down.svg"),chevron_up=__webpack_require__("./src/assets/chevron-up.svg");const SELECT_SELECTED="selected",SELECT_DISABLED="disabled",SELECT_DEFAULT="default";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Select({selectedOption,optionList,handleOptionChange,isDisabled=!1,...rest}){const optionKeyList=Object.keys(optionList),[isOpen,setIsOpen]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(SelectedContainer,{onClick:()=>{isDisabled||setIsOpen((prev=>!prev))},$status:isDisabled?SELECT_DISABLED:isOpen?SELECT_SELECTED:SELECT_DEFAULT,...rest,children:[(0,jsx_runtime.jsx)("span",{children:selectedOption}),(0,jsx_runtime.jsx)(Image,{src:isOpen?chevron_up:chevron_down,alt:"",$isSelected:isOpen})]}),isOpen&&(0,jsx_runtime.jsx)(OptionListParent,{children:(0,jsx_runtime.jsx)(OptionListContainer,{children:optionKeyList.map((optionKey=>(0,jsx_runtime.jsx)(OptionContainer,{onClick:()=>(handleOptionChange(optionKey),void setIsOpen(!1)),children:optionList[optionKey]},optionKey)))})})]})}Select.displayName="Select";try{Select.displayName="Select",Select.__docgenInfo={description:"",displayName:"Select",props:{selectedOption:{defaultValue:null,description:"",name:"selectedOption",required:!0,type:{name:"string"}},optionList:{defaultValue:null,description:"",name:"optionList",required:!0,type:{name:"Record<T, string>"}},handleOptionChange:{defaultValue:null,description:"",name:"handleOptionChange",required:!0,type:{name:"(option: T) => void"}},isDisabled:{defaultValue:{value:"false"},description:"",name:"isDisabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Select/index.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/components/common/Select/index.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{header:100,modal:200}}},"./src/assets/chevron-down.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-down.f97a5bb1.svg"},"./src/assets/chevron-up.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/chevron-up.a1eb858b.svg"}}]);
//# sourceMappingURL=components-common-Select-Select-stories.464180ad.iframe.bundle.js.map