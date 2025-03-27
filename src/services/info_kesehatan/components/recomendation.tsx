// Server Component
import { getRecommendedArticles } from "../api/articleService";
import { Article } from "../api/articleService";
import { CardInfoKesehatanProps } from "../types/types";
import { RecommendationClient } from "./recommendation-client";

export async function RecommendationServer() {
  const data = await getRecommendedArticles();
  
  // Map API data to component props
  const articles = data.map((article: Article) => ({
    tanggal: new Date(article.published_at),
    title: article.title,
    category: article.category_name,
    image: article.image,
    link: `/app/info-kesehatan/${article.id}`,
    id: article.id,
    slug: article.slug
  }));

  return <RecommendationClient articles={articles} />;
}
