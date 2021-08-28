export interface Article {
  Id: number,
  title: string,
  shortSummary?: string,
  author: string,
  postedAt: string,
  reviewedBy: string,
  content?: string,
  headerImg?: string,
  urlName: string,
  url: string
};

export interface ArticlePagination {
  articles: Article[],
  offset?: number,
  limit?: number,
  maxPage?: number
};