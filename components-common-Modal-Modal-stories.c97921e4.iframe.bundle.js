"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[218],{"./src/components/common/Modal/Modal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CloseByESC:()=>CloseByESC,Default:()=>Default,Wide:()=>Wide,WithCloseButton:()=>WithCloseButton,WithTimePicker:()=>WithTimePicker,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_SquareButton__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/SquareButton/index.tsx"),_TimePickerOptionList__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/common/TimePickerOptionList/index.tsx"),___WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/common/Modal/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_3__.Z,decorators:[storyFn=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{width:"100px",height:"50px"},children:storyFn()})]},Default=()=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SquareButton__WEBPACK_IMPORTED_MODULE_1__.Z,{onClick:()=>{setIsOpen(!0)},theme:"blank",children:"Open Modal"}),isOpen&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_3__.Z,{size:"sm",onModalClose:()=>{setIsOpen(!1)},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p",{children:"This is Default Modal"})})]})},Wide=()=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SquareButton__WEBPACK_IMPORTED_MODULE_1__.Z,{onClick:()=>{setIsOpen(!0)},theme:"blank",children:"Open Modal"}),isOpen&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_3__.Z,{size:"lg",onModalClose:()=>{setIsOpen(!1)},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p",{children:"This is Wide Modal"})})]})},WithCloseButton=()=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),closeModal=()=>{setIsOpen(!1)};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SquareButton__WEBPACK_IMPORTED_MODULE_1__.Z,{onClick:()=>{setIsOpen(!0)},theme:"blank",children:"Open Modal"}),isOpen&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_3__.Z,{size:"sm",onModalClose:closeModal,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(S.Header,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p",{children:"Modal Title"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(S.CloseButton,{onClick:closeModal,children:"X"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(S.Body,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(S.Description,{children:"This is Description"}),"This is Content"]})]})})]})},CloseByESC=()=>{const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),closeModal=()=>{setIsOpen(!1)};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const handleKeyDown=event=>{"Escape"===event.key&&closeModal()};return isOpen&&document.addEventListener("keydown",handleKeyDown),()=>{document.removeEventListener("keydown",handleKeyDown)}}),[isOpen]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SquareButton__WEBPACK_IMPORTED_MODULE_1__.Z,{onClick:()=>{setIsOpen(!0)},theme:"blank",children:"Open Modal"}),isOpen&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_3__.Z,{size:"sm",onModalClose:closeModal,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p",{children:"Close This Modal by ESC"})})]})},WithTimePicker=()=>{const[time,setTime]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({day:2,hour:7,minute:58}),[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),closeModal=()=>{setIsOpen(!1)};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SquareButton__WEBPACK_IMPORTED_MODULE_1__.Z,{onClick:()=>{setIsOpen(!0)},theme:"blank",children:"사용자 지정"}),isOpen&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_3__.Z,{size:"sm",onModalClose:closeModal,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(S.Header,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h3",{children:"마감 시간 선택"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(S.CloseButton,{onClick:closeModal,children:"X"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(S.Body,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(S.Description,{children:"최대 3일을 넘을 수 없습니다."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_TimePickerOptionList__WEBPACK_IMPORTED_MODULE_2__.Z,{time,setTime}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(S.ButtonWrapper,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SquareButton__WEBPACK_IMPORTED_MODULE_1__.Z,{onClick:()=>{if(window.confirm("정말 초기화하시겠습니까?")){setTime({day:0,hour:0,minute:0})}},theme:"blank",children:"초기화"})})]})]})})]})},S={Header:styled_components__WEBPACK_IMPORTED_MODULE_5__.zo.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  padding: 10px;

  font: var(--text-body);
  font-weight: bold;
`,Body:styled_components__WEBPACK_IMPORTED_MODULE_5__.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 10px;

  padding: 10px 0;
  font: var(--text-caption);
`,Description:styled_components__WEBPACK_IMPORTED_MODULE_5__.zo.div`
  color: gray;

  font: var(--text-small);
`,CloseButton:styled_components__WEBPACK_IMPORTED_MODULE_5__.zo.button`
  width: 25px;
  height: 20px;

  background: white;

  font: var(--text-body);

  cursor: pointer;
`,ButtonWrapper:styled_components__WEBPACK_IMPORTED_MODULE_5__.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50%;
  height: 40px;
`};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'() => {\n  const [isOpen, setIsOpen] = useState(false);\n  const openModal = () => {\n    setIsOpen(true);\n  };\n  const closeModal = () => {\n    setIsOpen(false);\n  };\n  return <>\n      <SquareButton onClick={openModal} theme="blank">\n        Open Modal\n      </SquareButton>\n      {isOpen && <Modal size="sm" onModalClose={closeModal}>\n          <p>This is Default Modal</p>\n        </Modal>}\n    </>;\n}',...Default.parameters?.docs?.source}}},Wide.parameters={...Wide.parameters,docs:{...Wide.parameters?.docs,source:{originalSource:'() => {\n  const [isOpen, setIsOpen] = useState(false);\n  const openModal = () => {\n    setIsOpen(true);\n  };\n  const closeModal = () => {\n    setIsOpen(false);\n  };\n  return <>\n      <SquareButton onClick={openModal} theme="blank">\n        Open Modal\n      </SquareButton>\n      {isOpen && <Modal size="lg" onModalClose={closeModal}>\n          <p>This is Wide Modal</p>\n        </Modal>}\n    </>;\n}',...Wide.parameters?.docs?.source}}},WithCloseButton.parameters={...WithCloseButton.parameters,docs:{...WithCloseButton.parameters?.docs,source:{originalSource:'() => {\n  const [isOpen, setIsOpen] = useState(false);\n  const openModal = () => {\n    setIsOpen(true);\n  };\n  const closeModal = () => {\n    setIsOpen(false);\n  };\n  return <>\n      <SquareButton onClick={openModal} theme="blank">\n        Open Modal\n      </SquareButton>\n      {isOpen && <Modal size="sm" onModalClose={closeModal}>\n          <>\n            <S.Header>\n              <p>Modal Title</p>\n              <S.CloseButton onClick={closeModal}>X</S.CloseButton>\n            </S.Header>\n            <S.Body>\n              <S.Description>This is Description</S.Description>\n              This is Content\n            </S.Body>\n          </>\n        </Modal>}\n    </>;\n}',...WithCloseButton.parameters?.docs?.source}}},CloseByESC.parameters={...CloseByESC.parameters,docs:{...CloseByESC.parameters?.docs,source:{originalSource:"() => {\n  const [isOpen, setIsOpen] = useState(false);\n  const openModal = () => {\n    setIsOpen(true);\n  };\n  const closeModal = () => {\n    setIsOpen(false);\n  };\n  useEffect(() => {\n    const handleKeyDown = (event: KeyboardEvent) => {\n      if (event.key === 'Escape') {\n        closeModal();\n      }\n    };\n    if (isOpen) {\n      document.addEventListener('keydown', handleKeyDown);\n    }\n    return () => {\n      document.removeEventListener('keydown', handleKeyDown);\n    };\n  }, [isOpen]);\n  return <>\n      <SquareButton onClick={openModal} theme=\"blank\">\n        Open Modal\n      </SquareButton>\n      {isOpen && <Modal size=\"sm\" onModalClose={closeModal}>\n          <p>Close This Modal by ESC</p>\n        </Modal>}\n    </>;\n}",...CloseByESC.parameters?.docs?.source}}},WithTimePicker.parameters={...WithTimePicker.parameters,docs:{...WithTimePicker.parameters?.docs,source:{originalSource:'() => {\n  const [time, setTime] = useState({\n    day: 2,\n    hour: 7,\n    minute: 58\n  });\n  const [isOpen, setIsOpen] = useState(false);\n  const openModal = () => {\n    setIsOpen(true);\n  };\n  const closeModal = () => {\n    setIsOpen(false);\n  };\n  const handleResetBUtton = () => {\n    if (window.confirm(\'정말 초기화하시겠습니까?\')) {\n      const updatedTime = {\n        day: 0,\n        hour: 0,\n        minute: 0\n      };\n      setTime(updatedTime);\n    }\n  };\n  return <>\n      <SquareButton onClick={openModal} theme="blank">\n        사용자 지정\n      </SquareButton>\n      {isOpen && <Modal size="sm" onModalClose={closeModal}>\n          <>\n            <S.Header>\n              <h3>마감 시간 선택</h3>\n              <S.CloseButton onClick={closeModal}>X</S.CloseButton>\n            </S.Header>\n            <S.Body>\n              <S.Description>최대 3일을 넘을 수 없습니다.</S.Description>\n              <TimePickerOptionList time={time} setTime={setTime} />\n              <S.ButtonWrapper>\n                <SquareButton onClick={handleResetBUtton} theme="blank">\n                  초기화\n                </SquareButton>\n              </S.ButtonWrapper>\n            </S.Body>\n          </>\n        </Modal>}\n    </>;\n}',...WithTimePicker.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Wide","WithCloseButton","CloseByESC","WithTimePicker"]},"./src/components/common/Modal/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Modal});var react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const MODAL_SIZE={sm:"290px",md:"590px",lg:"700px"},All=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Modal({onModalClose,children,size}){const BackDropRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{const handler=e=>{e.target===BackDropRef.current&&onModalClose()};return document.addEventListener("click",handler),()=>document.removeEventListener("click",handler)}),[BackDropRef,onModalClose]),(0,jsx_runtime.jsxs)(All,{children:[(0,jsx_runtime.jsx)(HiddenCloseButton,{onClick:onModalClose,tabIndex:0,"aria-label":"팝업 창 닫기"}),(0,jsx_runtime.jsx)(Backdrop,{ref:BackDropRef}),(0,jsx_runtime.jsx)(Container,{tabIndex:0,size,children})]})}Modal.displayName="Modal";try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{onModalClose:{defaultValue:null,description:"",name:"onModalClose",required:!0,type:{name:"() => void"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/index.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/index.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SquareButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SquareButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const BORDER_THEME={fill:"var(--primary-color)",blank:"var(--primary-color)",gray:"#67727E"},TEXT_THEME={fill:"white",blank:"var(--primary-color)",gray:"white"},BACKGROUND_THEME={fill:"var(--primary-color)",blank:"white",gray:"#67727E"},Button=styled_components_browser_esm.zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SquareButton({theme,children,...rest}){return(0,jsx_runtime.jsx)(Button,{$theme:theme,...rest,children})}SquareButton.displayName="SquareButton";try{SquareButton.displayName="SquareButton",SquareButton.__docgenInfo={description:"",displayName:"SquareButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:"enum",value:[{value:'"blank"'},{value:'"fill"'},{value:'"gray"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SquareButton/index.tsx#SquareButton"]={docgenInfo:SquareButton.__docgenInfo,name:"SquareButton",path:"src/components/common/SquareButton/index.tsx#SquareButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/TimePickerOptionList/TimePickerOption/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>TimePickerOption});var react=__webpack_require__("./node_modules/react/index.js");const TIMEBOX_CHILD_HEIGHT=33,TIME_UNIT={day:3,hour:24,minute:60},TIME_KOREAN={day:"일",hour:"시간",minute:"분"};var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`;var TimePickerOption=__webpack_require__("./src/components/common/TimePickerOptionList/TimePickerOption/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TimePickerOptionList({time,setTime}){const{day,hour,minute}=time,updateTime=(option,updatedTime)=>{setTime((prev=>({...prev,[option]:updatedTime})))};return(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(Container,{children:Object.entries(time).map((([key,value])=>(0,jsx_runtime.jsx)(TimePickerOption.Z,{currentTime:value,option:key,handlePickTime:updateTime},key)))}),(0,jsx_runtime.jsxs)(PickedTimeText,{tabIndex:0,children:[(0,jsx_runtime.jsxs)("p",{children:[day,"일"]}),(0,jsx_runtime.jsxs)("p",{children:[hour,"시"]}),(0,jsx_runtime.jsxs)("p",{children:[minute,"분"]})," 후 마감"]})]})}TimePickerOptionList.displayName="TimePickerOptionList";try{TimePickerOptionList.displayName="TimePickerOptionList",TimePickerOptionList.__docgenInfo={description:"",displayName:"TimePickerOptionList",props:{time:{defaultValue:null,description:"",name:"time",required:!0,type:{name:"Time"}},setTime:{defaultValue:null,description:"",name:"setTime",required:!0,type:{name:"Dispatch<SetStateAction<Time>>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/TimePickerOptionList/index.tsx#TimePickerOptionList"]={docgenInfo:TimePickerOptionList.__docgenInfo,name:"TimePickerOptionList",path:"src/components/common/TimePickerOptionList/index.tsx#TimePickerOptionList"})}catch(__react_docgen_typescript_loader_error){}},"./src/styles/theme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>theme});var styled_components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const theme={breakpoint:{sm:"576px",md:"768px",lg:"1440px"},zIndex:{select:1,header:100,modal:200},animation:{skeletonGradientPulse:styled_components__WEBPACK_IMPORTED_MODULE_0__.F4`
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
  `}}}}]);
//# sourceMappingURL=components-common-Modal-Modal-stories.c97921e4.iframe.bundle.js.map