export interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  deadline: string;
  bannerTitle: string;
  bannerSubtitle: string;
}

export interface NoticeList {
  totalPageNumber: number;
  currentPageNumber: number;
  noticeList: Notice[];
}
