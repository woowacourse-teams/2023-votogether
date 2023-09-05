"use strict";(self.webpackChunkvotogether=self.webpackChunkvotogether||[]).push([[2344],{"./src/pages/Ranking/Ranking.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Ranking_stories});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),useToggleSwitch=__webpack_require__("./src/hooks/useToggleSwitch.ts"),IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),Layout=__webpack_require__("./src/components/common/Layout/index.tsx"),NarrowTemplateHeader=__webpack_require__("./src/components/common/NarrowTemplateHeader/index.tsx"),ToggleSwitch=__webpack_require__("./src/components/common/ToggleSwitch/index.tsx"),PassionUser=__webpack_require__("./src/pages/Ranking/PassionUser/index.tsx"),PopularPost=__webpack_require__("./src/pages/Ranking/PopularPost/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const HeaderWrapper=styled_components_browser_esm.zo.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.r.zIndex.header};

  @media (min-width: ${theme.r.breakpoint.sm}) {
    display: none;
  }
`,Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 50px;
  margin-bottom: 20px;

  & > * {
    width: 100%;
  }

  @media (min-width: ${theme.r.breakpoint.sm}) {
    margin-top: 30px;
  }
`,PageHeader=styled_components_browser_esm.zo.div`
  margin: 15px;

  text-align: center;
  font: var(--text-title);
`,ContentContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-top: 20px;
  padding: 0 15px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const userRankingInfo={rank:1111,nickname:"wow",postCount:1,voteCount:3,score:8},rankerList=new Array(10).fill({rank:1,nickname:"gil-dong",postCount:11,voteCount:79,score:134}).map(((ranker,index)=>({...ranker,rank:index+1}))),rankingPostList=new Array(10).fill({rank:1,post:{id:29,writer:"writer",title:"이것은 엄청나게 많은 투표가 이루어진 대단한 글이지요",voteCount:10}}).map(((post,index)=>({...post,ranking:index+1})));function Ranking(){const navigate=(0,dist.s0)(),{selectedButton,firstButton,secondButton}=(0,useToggleSwitch.t)("열정 유저","인기글 유저");return(0,jsx_runtime.jsxs)(Layout.Z,{isSidebarVisible:!0,children:[(0,jsx_runtime.jsx)(HeaderWrapper,{children:(0,jsx_runtime.jsx)(NarrowTemplateHeader.Z,{children:(0,jsx_runtime.jsx)(IconButton.Z,{category:"back",onClick:()=>{navigate(-1)}})})}),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(PageHeader,{children:"🏆 랭킹 🏆"}),(0,jsx_runtime.jsxs)(ContentContainer,{children:[(0,jsx_runtime.jsx)(ToggleSwitch.Z,{size:"md",selectedButton,firstButton,secondButton}),"열정 유저"===selectedButton&&(0,jsx_runtime.jsx)(PassionUser.Z,{rankerList,userRanking:userRankingInfo}),"인기글 유저"===selectedButton&&(0,jsx_runtime.jsx)(PopularPost.Z,{rankingPostList})]})]})]})}Ranking.displayName="Ranking";const Ranking_stories={component:Ranking},Default={render:()=>(0,jsx_runtime.jsx)(Ranking,{})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <Ranking />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/IconButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>IconButton});const back_namespaceObject=__webpack_require__.p+"static/media/back.0d0cf282.svg",category_namespaceObject=__webpack_require__.p+"static/media/category.5dbd06d6.svg",ranking_namespaceObject=__webpack_require__.p+"static/media/ranking.bc2e65d6.svg",retry_namespaceObject=__webpack_require__.p+"static/media/retry.d97418a2.svg",search_white_namespaceObject=__webpack_require__.p+"static/media/search_white.74caf850.svg",user_namespaceObject=__webpack_require__.p+"static/media/user.87af8a44.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;

  background-color: ${props=>props.$isRoundBackground?"var(--gray)":"rgba(0, 0, 0, 0)"};

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ICON_CATEGORY={category:{name:"카테고리",url:category_namespaceObject,isRoundBackground:!1},back:{name:"뒤로가기",url:back_namespaceObject,isRoundBackground:!1},search:{name:"검색",url:search_white_namespaceObject,isRoundBackground:!1},retry:{name:"다시시도",url:retry_namespaceObject,isRoundBackground:!1},userInfo:{name:"사용자 페이지 이동",url:user_namespaceObject,isRoundBackground:!0},ranking:{name:"랭킹 페이지 이동",url:ranking_namespaceObject,isRoundBackground:!1}};function IconButton({category,...rest}){const src=ICON_CATEGORY[category].url,ariaLabelText=ICON_CATEGORY[category].name;return(0,jsx_runtime.jsx)(Button,{"aria-label":ariaLabelText,$isRoundBackground:ICON_CATEGORY[category].isRoundBackground,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:`${ariaLabelText} 버튼`})})}IconButton.displayName="IconButton";try{IconButton.displayName="IconButton",IconButton.__docgenInfo={description:"",displayName:"IconButton",props:{category:{defaultValue:null,description:"",name:"category",required:!0,type:{name:"enum",value:[{value:'"search"'},{value:'"category"'},{value:'"back"'},{value:'"retry"'},{value:'"userInfo"'},{value:'"ranking"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/IconButton/index.tsx#IconButton"]={docgenInfo:IconButton.__docgenInfo,name:"IconButton",path:"src/components/common/IconButton/index.tsx#IconButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Layout/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Layout});var Dashboard=__webpack_require__("./src/components/common/Dashboard/index.tsx"),WideHeader=__webpack_require__("./src/components/common/WideHeader/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Container=styled_components_browser_esm.zo.div`
  height: 100vh;
`,ContentContainer=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    padding-top: 70px;
  }
`,WideHeaderWrapper=styled_components_browser_esm.zo.div`
  width: 100%;

  position: fixed;
  top: 0;

  z-index: ${theme.r.zIndex.header};

  @media (max-width: ${theme.r.breakpoint.sm}) {
    display: none;
    visibility: hidden;
  }
`,DashboardWrapper=styled_components_browser_esm.zo.aside`
  width: 225px;
  height: 90vh;

  position: fixed;
  left: 0;

  @media (max-width: ${theme.r.breakpoint.sm}) {
    display: none;
    visibility: hidden;
  }
`,MainContainer=styled_components_browser_esm.zo.main`
  display: flex;
  justify-content: center;

  margin-top: 15px;
  width: 100%;

  @media (min-width: ${theme.r.breakpoint.sm}) {
    margin-top: 0;
    padding-left: ${({$isSidebarVisible})=>$isSidebarVisible&&"225px"};
  }
`,ChildrenWrapper=styled_components_browser_esm.zo.div`
  width: 100%;
  max-width: ${({$isSidebarVisible})=>$isSidebarVisible&&"700px"};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Layout({children,isSidebarVisible}){return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(WideHeaderWrapper,{children:(0,jsx_runtime.jsx)(WideHeader.Z,{})}),(0,jsx_runtime.jsxs)(ContentContainer,{children:[isSidebarVisible&&(0,jsx_runtime.jsx)(DashboardWrapper,{children:(0,jsx_runtime.jsx)(Dashboard.Z,{})}),(0,jsx_runtime.jsx)(MainContainer,{$isSidebarVisible:isSidebarVisible,children:(0,jsx_runtime.jsx)(ChildrenWrapper,{$isSidebarVisible:isSidebarVisible,children})})]})]})}Layout.displayName="Layout";try{Layout.displayName="Layout",Layout.__docgenInfo={description:"",displayName:"Layout",props:{isSidebarVisible:{defaultValue:null,description:"",name:"isSidebarVisible",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Layout/index.tsx#Layout"]={docgenInfo:Layout.__docgenInfo,name:"Layout",path:"src/components/common/Layout/index.tsx#Layout"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/LogoButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LogoButton});var logo=__webpack_require__("./src/assets/logo.svg");const projectName_namespaceObject=__webpack_require__.p+"static/media/projectName.7b011954.svg";const Button=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.button`
  display: flex;
  align-items: center;
  gap: 10px;

  background-color: rgba(0, 0, 0, 0);

  height: 100%;

  cursor: pointer;

  & :first-child {
    height: 100%;
    border-radius: 5px;
  }

  & :last-child {
    height: ${props=>"icon"!==props.content&&"60%"};
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const contentCategory={icon:{name:"보투게더 로고 아이콘",url:logo},text:{name:"보투게더 아이콘",url:projectName_namespaceObject},full:{name:"보투게더 아이콘",url:""}};function LogoButton({content,...rest}){const src=contentCategory[content].url,ariaLabelText=contentCategory[content].name;return"full"===content?(0,jsx_runtime.jsxs)(Button,{content,"aria-label":ariaLabelText,...rest,children:[(0,jsx_runtime.jsx)("img",{src:logo,alt:"로고 아이콘"}),(0,jsx_runtime.jsx)("img",{src:projectName_namespaceObject,alt:"보투게더 아이콘"})]}):(0,jsx_runtime.jsx)(Button,{content,"aria-label":ariaLabelText,...rest,children:(0,jsx_runtime.jsx)("img",{src,alt:"보투게더 아이콘"})})}LogoButton.displayName="LogoButton";try{LogoButton.displayName="LogoButton",LogoButton.__docgenInfo={description:"",displayName:"LogoButton",props:{content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"enum",value:[{value:'"text"'},{value:'"icon"'},{value:'"full"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/LogoButton/index.tsx#LogoButton"]={docgenInfo:LogoButton.__docgenInfo,name:"LogoButton",path:"src/components/common/LogoButton/index.tsx#LogoButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/NarrowTemplateHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>NarrowTemplateHeader});const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function NarrowTemplateHeader({children}){return(0,jsx_runtime.jsx)(Container,{children})}NarrowTemplateHeader.displayName="NarrowTemplateHeader";try{NarrowTemplateHeader.displayName="NarrowTemplateHeader",NarrowTemplateHeader.__docgenInfo={description:"",displayName:"NarrowTemplateHeader",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"]={docgenInfo:NarrowTemplateHeader.__docgenInfo,name:"NarrowTemplateHeader",path:"src/components/common/NarrowTemplateHeader/index.tsx#NarrowTemplateHeader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/SearchBar/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>SearchBar});var path=__webpack_require__("./src/constants/path.ts"),post=__webpack_require__("./src/constants/post.ts");const search_black_namespaceObject=__webpack_require__.p+"static/media/search_black.af78e45d.svg";var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const formSize={sm:"170px",md:"250px",lg:"400px"},Form=styled_components_browser_esm.zo.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  width: ${props=>"free"===props.size?"100%":formSize[props.size]};
  height: 36px;
  padding: 5px 10px;
  border-radius: 5px;

  background-color: #cccccc;
  color: red;

  font-size: 1rem;
`,Input=styled_components_browser_esm.zo.input`
  width: 100%;
  height: 100%;
  outline: 0;

  background-color: rgba(0, 0, 0, 0);

  font: var(--text-caption);
  letter-spacing: 1px;
`,Button=styled_components_browser_esm.zo.button`
  background-color: rgba(0, 0, 0, 0);

  cursor: pointer;
`,ScreenReaderDirection=styled_components_browser_esm.zo.p`
  position: absolute;
  left: -9999px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SearchBar({size,isOpen,...rest}){return(0,jsx_runtime.jsxs)(Form,{size,action:path.m.SEARCH,children:[(0,jsx_runtime.jsx)(Input,{"aria-label":"게시글 제목 및 내용 검색창",type:"search",name:post.Kn,...rest}),(0,jsx_runtime.jsx)(Button,{type:"submit",children:(0,jsx_runtime.jsx)("img",{src:search_black_namespaceObject,alt:"검색버튼"})}),isOpen&&(0,jsx_runtime.jsx)(ScreenReaderDirection,{"aria-live":"polite",children:"검색창을 닫으려면 검색창 외부를 클릭해주세요."})]})}SearchBar.displayName="SearchBar";try{SearchBar.displayName="SearchBar",SearchBar.__docgenInfo={description:"",displayName:"SearchBar",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/SearchBar/index.tsx#SearchBar"]={docgenInfo:SearchBar.__docgenInfo,name:"SearchBar",path:"src/components/common/SearchBar/index.tsx#SearchBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/ToggleSwitch/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ToggleSwitch});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SIZE={sm:{height:"40px"},md:{height:"60px"},lg:{height:"80px"},free:{height:"100%"}},Wrapper=styled_components_browser_esm.zo.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;

  height: ${props=>SIZE[props.$size].height};
  border: 1.5px solid var(--primary-color);
  border-radius: 4px;
`,Content=styled_components_browser_esm.zo.button`
  border-radius: 4px;

  height: calc(100% - 10px);
  width: calc(100% - 10px);

  background-color: ${props=>props.$isSelected&&"var(--primary-color)"};
  color: ${props=>props.$isSelected?"white":"var(--primary-color)"};

  font: var(--text-caption);
  letter-spacing: 1px;

  cursor: pointer;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ToggleSwitch({size,selectedButton,firstButton,secondButton}){return(0,jsx_runtime.jsxs)(Wrapper,{$size:size,children:[(0,jsx_runtime.jsx)(Content,{onClick:()=>{selectedButton!==firstButton.text&&firstButton.event()},$isSelected:selectedButton===firstButton.text,children:firstButton.text}),(0,jsx_runtime.jsx)(Content,{onClick:()=>{selectedButton!==secondButton.text&&secondButton.event()},$isSelected:selectedButton===secondButton.text,children:secondButton.text})]})}ToggleSwitch.displayName="ToggleSwitch";try{ToggleSwitch.displayName="ToggleSwitch",ToggleSwitch.__docgenInfo={description:"",displayName:"ToggleSwitch",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"free"'}]}},selectedButton:{defaultValue:null,description:"",name:"selectedButton",required:!0,type:{name:"string"}},firstButton:{defaultValue:null,description:"",name:"firstButton",required:!0,type:{name:"ButtonInfo"}},secondButton:{defaultValue:null,description:"",name:"secondButton",required:!0,type:{name:"ButtonInfo"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/ToggleSwitch/index.tsx#ToggleSwitch"]={docgenInfo:ToggleSwitch.__docgenInfo,name:"ToggleSwitch",path:"src/components/common/ToggleSwitch/index.tsx#ToggleSwitch"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/WideHeader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>WideHeader});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),path=__webpack_require__("./src/constants/path.ts"),IconButton=__webpack_require__("./src/components/common/IconButton/index.tsx"),LogoButton=__webpack_require__("./src/components/common/LogoButton/index.tsx"),SearchBar=__webpack_require__("./src/components/common/SearchBar/index.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 70px;

  position: fixed;
  top: 0;

  background-color: var(--header);

  padding: 0 80px;
`,LogoWrapper=styled_components_browser_esm.zo.div`
  height: 50%;
`,Wrapper=styled_components_browser_esm.zo.div`
  display: flex;
  gap: 15px;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function WideHeader(){const navigate=(0,dist.s0)();return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(LogoWrapper,{children:(0,jsx_runtime.jsx)(LogoButton.Z,{content:"full",onClick:()=>{navigate("/")}})}),(0,jsx_runtime.jsxs)(Wrapper,{children:[(0,jsx_runtime.jsx)(SearchBar.Z,{size:"sm"}),(0,jsx_runtime.jsx)(IconButton.Z,{category:"userInfo",onClick:()=>{navigate(path.m.USER_INFO)}}),(0,jsx_runtime.jsx)(IconButton.Z,{category:"ranking",onClick:()=>{navigate(path.m.RANKING)}})]})]})}WideHeader.displayName="WideHeader"},"./src/hooks/useToggleSwitch.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>useToggleSwitch});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useToggleSwitch=(firstText,secondText)=>{const[selectedButton,setSelectedButton]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(firstText);return{selectedButton,firstButton:{text:firstText,event:()=>setSelectedButton(firstText)},secondButton:{text:secondText,event:()=>setSelectedButton(secondText)}}}},"./src/pages/Ranking/PassionUser/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PassionUserRanking});var first_rank=__webpack_require__("./src/assets/first-rank.svg"),second_rank=__webpack_require__("./src/assets/second-rank.svg"),third_rank=__webpack_require__("./src/assets/third-rank.svg"),RankingTableStyle=__webpack_require__("./src/pages/Ranking/RankingTableStyle.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Table=styled_components_browser_esm.zo.table`
  width: 100%;

  font: var(--text-caption);
  text-align: center;

  & > :nth-child(12) {
    margin-top: 20px;
    padding: 3px 0;
    border-radius: 4px;

    background-color: var(--white);

    font-weight: 500;
  }
`,Tr=styled_components_browser_esm.zo.tr`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 1fr 1fr 1fr;
  align-items: center;
`,Th=styled_components_browser_esm.zo.th`
  padding: 10px 0;

  font: var(--text-body);
`,RankingTd=styled_components_browser_esm.zo.td`
  padding: 5px 0;
  height: auto;

  line-height: 0;
`,Td=styled_components_browser_esm.zo.td`
  padding: 10px 0;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const columnNameList=["등수","닉네임","작성글 수","투표 수","점수"],rankIconUrl={1:first_rank,2:second_rank,3:third_rank};function PassionUserRanking({rankerList,userRanking}){return(0,jsx_runtime.jsx)(RankingTableStyle.A,{children:(0,jsx_runtime.jsxs)(Table,{children:[(0,jsx_runtime.jsx)(Tr,{children:columnNameList.map((text=>(0,jsx_runtime.jsx)(Th,{children:text},text)))}),rankerList.map((ranker=>{const rankIcon=rankIconUrl[ranker.rank]&&(0,jsx_runtime.jsx)("img",{src:rankIconUrl[ranker.rank],alt:ranker.rank.toString()});return(0,jsx_runtime.jsxs)(Tr,{children:[(0,jsx_runtime.jsx)(RankingTd,{children:rankIcon??ranker.rank}),(0,jsx_runtime.jsx)(Td,{children:ranker.nickname}),(0,jsx_runtime.jsx)(Td,{children:ranker.postCount}),(0,jsx_runtime.jsx)(Td,{children:ranker.voteCount}),(0,jsx_runtime.jsx)(Td,{children:ranker.score})]},ranker.rank)})),userRanking&&(0,jsx_runtime.jsxs)(Tr,{children:[(0,jsx_runtime.jsx)(Td,{children:userRanking.rank}),(0,jsx_runtime.jsx)(Td,{children:userRanking.nickname}),(0,jsx_runtime.jsx)(Td,{children:userRanking.postCount}),(0,jsx_runtime.jsx)(Td,{children:userRanking.voteCount}),(0,jsx_runtime.jsx)(Td,{children:userRanking.score})]})]})})}PassionUserRanking.displayName="PassionUserRanking";try{PassionUser.displayName="PassionUser",PassionUser.__docgenInfo={description:"",displayName:"PassionUser",props:{rankerList:{defaultValue:null,description:"",name:"rankerList",required:!0,type:{name:"PassionUser[]"}},userRanking:{defaultValue:null,description:"",name:"userRanking",required:!1,type:{name:"PassionUser"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/Ranking/PassionUser/index.tsx#PassionUser"]={docgenInfo:PassionUser.__docgenInfo,name:"PassionUser",path:"src/pages/Ranking/PassionUser/index.tsx#PassionUser"})}catch(__react_docgen_typescript_loader_error){}},"./src/pages/Ranking/PopularPost/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PopularPost});var dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),path=__webpack_require__("./src/constants/path.ts"),first_rank=__webpack_require__("./src/assets/first-rank.svg"),second_rank=__webpack_require__("./src/assets/second-rank.svg"),third_rank=__webpack_require__("./src/assets/third-rank.svg"),RankingTableStyle=__webpack_require__("./src/pages/Ranking/RankingTableStyle.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Table=styled_components_browser_esm.zo.table`
  width: 100%;

  font: var(--text-caption);
  text-align: center;
`,Tr=styled_components_browser_esm.zo.tr`
  display: grid;
  grid-template-columns: 0.5fr 1fr 3fr 1fr;
  align-items: center;
`,Th=styled_components_browser_esm.zo.th`
  padding: 10px 0;

  font: var(--text-body);
`,RankingTd=styled_components_browser_esm.zo.td`
  padding: 5px 0;
  height: auto;

  line-height: 0;
`,Td=styled_components_browser_esm.zo.td`
  padding: 10px 0;

  > a {
    display: -webkit-box;

    text-decoration-line: underline;
    text-underline-offset: 0.2em;
    text-overflow: ellipsis;
    word-break: break-word;

    overflow: hidden;

    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const rankIconUrl={1:first_rank,2:second_rank,3:third_rank},columnNameList=["등수","닉네임","글 제목","투표 수"];function PopularPost({rankingPostList}){return(0,jsx_runtime.jsx)(RankingTableStyle.A,{children:(0,jsx_runtime.jsxs)(Table,{children:[(0,jsx_runtime.jsx)(Tr,{children:columnNameList.map((text=>(0,jsx_runtime.jsx)(Th,{children:text},text)))}),rankingPostList.map((rankingPost=>{const rankIcon=rankIconUrl[rankingPost.rank]&&(0,jsx_runtime.jsx)("img",{src:rankIconUrl[rankingPost.rank],alt:rankingPost.rank.toString()});return(0,jsx_runtime.jsxs)(Tr,{children:[(0,jsx_runtime.jsx)(RankingTd,{children:rankIcon??rankingPost.rank}),(0,jsx_runtime.jsx)(Td,{children:rankingPost.post.writer}),(0,jsx_runtime.jsx)(Td,{children:(0,jsx_runtime.jsx)(dist.rU,{to:`${path.m.POST}/${rankingPost.post.id}`,children:rankingPost.post.title})}),(0,jsx_runtime.jsx)(Td,{children:rankingPost.post.voteCount})]},rankingPost.rank)}))]})})}PopularPost.displayName="PopularPost";try{PopularPost.displayName="PopularPost",PopularPost.__docgenInfo={description:"",displayName:"PopularPost",props:{rankingPostList:{defaultValue:null,description:"",name:"rankingPostList",required:!0,type:{name:"RankingPost[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/pages/Ranking/PopularPost/index.tsx#PopularPost"]={docgenInfo:PopularPost.__docgenInfo,name:"PopularPost",path:"src/pages/Ranking/PopularPost/index.tsx#PopularPost"})}catch(__react_docgen_typescript_loader_error){}},"./src/pages/Ranking/RankingTableStyle.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Background});var styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_styles_theme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/styles/theme.ts");const Background=styled_components__WEBPACK_IMPORTED_MODULE_1__.zo.div`
  height: fit-content;
  border-radius: 4px;

  background-color: var(--gray);

  padding: 15px 10px;

  @media (min-width: ${_styles_theme__WEBPACK_IMPORTED_MODULE_0__.r.breakpoint.sm}) {
    padding: 15px 15px;
  }
`},"./src/assets/first-rank.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/first-rank.218349c4.svg"},"./src/assets/logo.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/logo.9ee58604.svg"},"./src/assets/second-rank.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/second-rank.181f5249.svg"},"./src/assets/third-rank.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/third-rank.188589ee.svg"}}]);
//# sourceMappingURL=pages-Ranking-Ranking-stories.335bcfa1.iframe.bundle.js.map