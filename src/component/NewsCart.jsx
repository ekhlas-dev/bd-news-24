
import Image from "next/image";
import Link from "next/link";

const NewsCart = ({ news }) => {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      {/* Fixed image size */}
      <figure className="relative h-40 shrink-0 overflow-hidden bg-base-200 sm:h-44">
        <Image
          src={news.imageUrl}
          alt={news.imageAlt || news.title || "News image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </figure>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-center justify-between gap-2 text-xs text-base-content/60">
          <span className="truncate font-medium">
            {news.source}
          </span>

          <time className="shrink-0">
            {news.firstPublished
              ? new Date(news.firstPublished).toLocaleDateString("bn-BD")
              : ""}
          </time>
        </div>

        {/* Fixed title height */}
        <h2 className="mb-2 line-clamp-2 min-h-12 text-base font-bold leading-6 transition-colors duration-200 group-hover:text-primary">
          {news.title}
        </h2>

        {/* Fixed description height */}
        <p className="mb-4 line-clamp-3 text-sm leading-6 text-base-content/70">
          {news.description}
        </p>

        {/* Button stays at the bottom */}
        <div className="mt-auto border-t border-base-300/70 pt-3">
          <Link
            href={`/news/${news.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 hover:gap-3"
          >
            বিস্তারিত পড়ুন
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsCart;
