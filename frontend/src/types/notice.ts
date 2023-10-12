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
  pageNumber: number;
  noticeList: Notice[];
}
