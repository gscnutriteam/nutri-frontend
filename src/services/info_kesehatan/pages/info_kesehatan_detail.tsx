import { HeaderFeature } from "@/components/ui/header_feature";
import AppMobileLayout from "@/layout/app_mobile_layout";
import type { Metadata } from "next";
import { InfoKesehatanHead } from "../components/info_kesehatan_head";
import type { InfoKesehatanHeadProps } from "../types/types";
import MarkdownRenderer from "@/components/ui/markdown-renderer";
import { getArticleById, getArticles } from "../api/articleService";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArticleDetailSkeleton } from "../components/article-detail-skeleton";
import { CardInfoKesehatan } from "../components/card-info-kesehatan";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import FloatingBackToTopWrapper from "../components/floating-back-to-top-wrapper";
import { ToastProvider } from "../components/toast-provider";

// Set revalidation time to 5 minutes (300 seconds)
export const revalidate = 300;

interface InfoKesehatanDetailProps {
  params: {
    id: string;
  };
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Generate dynamic metadata based on the article
export async function generateMetadata({ params }: InfoKesehatanDetailProps): Promise<Metadata> {
  const articleId = params.id;
  const article = await getArticleById(articleId);
  
  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | NutriCare",
      description: "Artikel yang Anda cari tidak ditemukan",
    };
  }
  
  return {
    title: `${article.title} | NutriCare`,
    description: article.content.substring(0, 160),
    icons: "/assets/img/logo.png",
    openGraph: {
      title: `${article.title} | NutriCare`,
      description: article.content.substring(0, 160),
      images: [article.image],
    },
  };
}

export default async function InfoKesehatanDetail({ params }: InfoKesehatanDetailProps) {
  const articleId = params.id;
  
  // Fetch article data
  const article = await getArticleById(articleId);
  
  // If article not found, show 404
  if (!article) {
    notFound();
  }
  
  // Map API data to component props
  const articleData: InfoKesehatanHeadProps = {
    tanggal: new Date(article.published_at),
    title: article.title,
    category: article.category_name,
    image: article.image,
    link: `/app/info-kesehatan/${article.id}`,
    readingTime: estimateReadingTime(article.content),
    id: article.id,
    content: article.content
  };

  // Get related articles based on the same category
  const allArticles = await getArticles();
  const relatedArticles = allArticles
    .filter(a => a.category_id === article.category_id && a.id !== article.id)
    .slice(0, 3)
    .map(a => ({
      tanggal: new Date(a.published_at),
      title: a.title,
      category: a.category_name,
      image: a.image,
      link: `/app/info-kesehatan/${a.id}`,
      id: a.id
    }));

  return (
    <AppMobileLayout>
      <ToastProvider />
      <div className="bg-white max-h-[90vh] flex flex-col w-full overflow-auto">
        {/* Floating Back To Top Button */}
        <FloatingBackToTopWrapper />
        
        {/* Custom header with back button */}
        <div className="w-full border-b border-gray-200 py-3 px-4 flex items-center relative bg-white">
          <Link href="/app/info-kesehatan" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors absolute left-4 z-10">
            <ArrowLeftIcon size={20} />
          </Link>
          
          <h1 className="text-lg font-semibold text-center w-full px-4 truncate text-gray-800">
            {article.title.length > 30 ? `${article.title.slice(0, 30)}...` : article.title}
          </h1>
        </div>
        
        <div className="px-4 pb-8 pt-4">
          <Suspense fallback={<ArticleDetailSkeleton />}>
            <InfoKesehatanHead data={articleData} showActionButtons={true} />
            
            {/* Markdown Render with improved styling */}
            <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none mt-6 pb-8 space-y-4">
              <MarkdownRenderer>
                {article.content}
              </MarkdownRenderer>
            </div>

            {/* Related articles section */}
            {relatedArticles.length > 0 && (
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-4">Artikel Terkait</h2>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <CardInfoKesehatan key={relatedArticle.id} {...relatedArticle} />
                  ))}
                </div>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </AppMobileLayout>
  );
}
