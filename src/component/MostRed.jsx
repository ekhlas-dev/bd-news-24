
import Link from "next/link";
import React from "react";

const MostRed = async () => {
  let news = [];

  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news/most-read",
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const result = await res.json();
    news = result.success ? result.data : [];
  } catch (error) {
    console.error("Most-read news fetch failed:", error);
  }

  return (
    <section className="w-full">
      <h2 className="mb-4 border-b-2 border-primary pb-3 text-xl font-bold">
        সর্বাধিক পঠিত
      </h2>

      {news.length > 0 ? (
        <div className="flex flex-col gap-3">
          {news.map((item, index) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              
              className="group flex items-center gap-4 rounded-xl border border-base-300 bg-base-100 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg font-bold ${
                  index < 3
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content/70 group-hover:bg-primary/10 group-hover:text-primary"
                }`}
              >
                {index + 1}
              </span>

              <h3 className="line-clamp-2 min-w-0 flex-1 text-sm font-semibold leading-6 transition-colors group-hover:text-primary sm:text-base">
                {item.title}
              </h3>

              <span className="shrink-0 text-base-content/40 transition-transform group-hover:translate-x-1 group-hover:text-primary">
                →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="rounded-lg bg-base-200 p-4 text-sm text-base-content/70">
          এই মুহূর্তে খবর লোড করা যাচ্ছে না। পরে আবার চেষ্টা করো।
        </p>
      )}
    </section>
  );
};

export default MostRed;
