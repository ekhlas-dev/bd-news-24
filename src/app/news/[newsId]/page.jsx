
import { notFound } from "next/navigation";
import NotFound from "../../not-found";
import Image from "next/image";

const NewsPage = async ({ params }) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound()
  }

  const result = await res.json();
  const news = result.data;

  if (!news) {
    notFound()
  }

  // Extract text from nested description blocks
  const getText = (item) => {
    if (!item) return "";

    if (typeof item === "string") {
      return item;
    }

    if (Array.isArray(item)) {
      return item.map(getText).filter(Boolean).join("\n\n");
    }

    if (typeof item.text === "string") {
      return item.text;
    }

    if (typeof item.model?.text === "string") {
      return item.model.text;
    }

    if (item.model?.blocks) {
      return getText(item.model.blocks);
    }

    if (item.blocks) {
      return getText(item.blocks);
    }

    return "";
  };

  const description = news.text || getText(news.description);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <article>
        <h1 className="mb-4 text-2xl font-bold leading-relaxed sm:text-4xl">
          {news.title}
        </h1>

        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-base-content/60">
          <span>{news.source || "BBC Bangla"}</span>

          {news.firstPublished && (
            <time>
              {new Date(news.firstPublished).toLocaleDateString("bn-BD")}
            </time>
          )}
        </div>

        {news.imageUrl && (
          <div className="relative mb-6 aspect-video overflow-hidden rounded-xl bg-base-200">
            <Image
              src={news.imageUrl}
              alt={news.imageAlt || news.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-contain"
            />
          </div>
        )}

        <div className="whitespace-pre-line text-base leading-8 text-base-content/80">
          {description || "এই খবরের বিবরণ পাওয়া যায়নি।"}
        </div>
      </article>
    </main>
  );
};

export default NewsPage;
