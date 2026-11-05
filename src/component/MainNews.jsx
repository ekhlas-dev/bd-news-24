import Image from "next/image";
import Link from "next/link";
import React from "react";

const MainNews = ({ news }) => {
  const [firstNews, ...otherNews] = news;

  if (!firstNews) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main News - Left Side */}
      <div className="lg:col-span-2">
        <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg transition-all duration-300">
          <figure className="relative h-64 md:h-96 overflow-hidden bg-base-200">
            <Image
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt || firstNews.title || "News image"}
              width={700}
              height={400}
              sizes="(max-width: 768px) 100vw, 800px"
              className="h-full w-full object-contain"
            />
          </figure>

          <div className="card-body">
            <div className="flex items-center justify-between text-sm text-base-content/60">
              <span>{firstNews.source}</span>
              <span>
                {new Date(firstNews.firstPublished).toLocaleDateString("bn-BD")}
              </span>
            </div>

            <h2 className="card-title text-xl md:text-2xl leading-8 hover:text-primary transition-colors">
              {firstNews.title}
            </h2>

            <p className="text-base-content/70 line-clamp-3">
              {firstNews.description}
            </p>

            <div className="card-actions justify-end pt-2">
              <Link
                href={`/news/${firstNews.id}`}
                className="btn btn-primary btn-sm"
              >
                বিস্তারিত পড়ুন
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Other News - Right Side */}
      <div className="flex flex-col gap-4">
        {otherNews.slice(0, 4).map((item, index) => (
          <article
            key={item.link || item.title || index}
            className="flex gap-3 border-b border-base-300 pb-4"
          >
            <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt || item.title || "News image"}
                width={200}
                height={150}
                sizes="112px"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <span className="text-xs text-base-content/60">
                {item.category}
              </span>

              <h3 className="text-sm font-semibold leading-6 line-clamp-3 hover:text-primary transition-colors">
                {item.title}
              </h3>

              <Link
                href={`/news/${item.id}`}
                className="text-sm text-primary hover:underline"
              >
                বিস্তারিত পড়ুন
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
