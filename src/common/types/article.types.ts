export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  readingTimeMin: number;
  publishedAt: Date;
  relatedCategories: string[];
  sections: ArticleSection[];
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}
