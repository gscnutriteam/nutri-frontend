// Server Component
import { getTopArticles } from "../api/articleService";
import { Article } from "../api/articleService";
import { CardTopNewsProps } from "../types/types";
import { TopNewsClient } from "./top-news-client";

export async function TopNewsServer() {
  const data = await getTopArticles();
  
  // Map API data to component props
  const articles = data.map((article: Article) => ({
    tanggal: new Date(article.published_at),
    title: article.title,
    category: article.category_name,
    image: article.image,
    id: article.id,
    slug: article.slug
  }));

  return <TopNewsClient articles={articles} />;
}
