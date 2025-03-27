import { Article } from "../api/articleService";
import { CardInfoKesehatan } from "./card-info-kesehatan";

interface ArticlesListProps {
  articles: Article[];
}

export function ArticlesList({ articles }: ArticlesListProps) {
  return (
    <div className="flex w-full flex-col mt-3 gap-3">
      {articles.map((article) => (
        <CardInfoKesehatan
          key={article.id}
          id={article.id}
          title={article.title}
          category={article.category_name}
          image={article.image}
          link={`/app/info-kesehatan/${article.id}`}
          tanggal={new Date(article.published_at)}
        />
      ))}
    </div>
  );
} 