"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[368],{"./src/components/common/TimePickerOptionList/TimePickerOption/TimePickerOption.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/TimePickerOptionList/TimePickerOption/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_1__.Z},Default=()=>{const[time,setTime]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({day:0,hour:5,minute:0});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{currentTime:time.hour,option:"hour",handlePickTime:(option,updatedTime)=>{setTime((prev=>({...prev,[option]:updatedTime})))}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p",{children:["시간 단위: ",time.hour]})]})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'() => {\n  const [time, setTime] = useState({\n    day: 0,\n    hour: 5,\n    minute: 0\n  });\n  const updateTime = (option: string, updatedTime: number) => {\n    setTime(prev => ({\n      ...prev,\n      [option]: updatedTime\n    }));\n  };\n  return <>\n      <TimePickerOption currentTime={time.hour} option="hour" handlePickTime={updateTime} />\n      <p>시간 단위: {time.hour}</p>\n    </>;\n}',...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/TimePickerOptionList/TimePickerOption/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TimePickerOption});var react=__webpack_require__("./node_modules/react/index.js");const TIMEBOX_CHILD_HEIGHT=33,TIME_UNIT={day:3,hour:24,minute:60};var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TimePickerOption({currentTime,option,handlePickTime}){const timeUnit=TIME_UNIT[option],timeBoxRef=(0,react.useRef)(null),timeBoxChildRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{const timeBox=timeBoxRef.current;if(!timeBox)return;const cancelWheel=e=>e.preventDefault();return timeBox.addEventListener("wheel",cancelWheel,{passive:!1}),()=>timeBox.removeEventListener("wheel",cancelWheel)}),[]),(0,react.useEffect)((()=>{const timeBox=timeBoxRef.current,timeBoxChild=timeBoxChildRef.current;timeBox&&timeBoxChild&&(timeBox.scrollTop=timeBoxChild.offsetHeight*currentTime)}),[]),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(PickedTimeOverlay,{}),(0,jsx_runtime.jsxs)(TimeBox,{onScroll:()=>{const timeBox=timeBoxRef.current;if(!timeBox)return;const pickedTimeIndex=Math.round(timeBox.scrollTop/TIMEBOX_CHILD_HEIGHT);pickedTimeIndex>=0&&pickedTimeIndex<timeUnit&&handlePickTime(option,pickedTimeIndex)},ref:timeBoxRef,onWheel:event=>{const timeBox=timeBoxRef.current;timeBox&&(event.deltaY>0&&(timeBox.scrollTop+=TIMEBOX_CHILD_HEIGHT),event.deltaY<0&&(timeBox.scrollTop-=TIMEBOX_CHILD_HEIGHT))},children:[(0,jsx_runtime.jsx)(Empty,{}),Array.from({length:timeUnit}).map(((_,index)=>(0,jsx_runtime.jsx)(Time,{ref:index===currentTime?timeBoxChildRef:null,$isPicked:currentTime===index,children:index},index))),(0,jsx_runtime.jsx)(Empty,{})]})]})}TimePickerOption.displayName="TimePickerOption";try{TimePickerOption.displayName="TimePickerOption",TimePickerOption.__docgenInfo={description:"",displayName:"TimePickerOption",props:{currentTime:{defaultValue:null,description:"",name:"currentTime",required:!0,type:{name:"number"}},option:{defaultValue:null,description:"",name:"option",required:!0,type:{name:"string"}},handlePickTime:{defaultValue:null,description:"",name:"handlePickTime",required:!0,type:{name:"(option: string, updatedTime: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/TimePickerOptionList/TimePickerOption/index.tsx#TimePickerOption"]={docgenInfo:TimePickerOption.__docgenInfo,name:"TimePickerOption",path:"src/components/common/TimePickerOptionList/TimePickerOption/index.tsx#TimePickerOption"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-common-TimePickerOptionList-TimePickerOption-TimePickerOption-stories.90fb5a74.iframe.bundle.js.map