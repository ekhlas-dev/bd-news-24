import { Suspense } from "react";
import NewsCart from "../component/NewsCart";
import MostRed from "../component/MostRed";
import MainNews from "../component/MainNews";

async function NewsSections() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news sections");
  }

  const data = await res.json();
  const sections = data.data;
  const mainNews = sections[0].articles;

  const otherSection = sections.slice(1);
  console.log(otherSection);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-[90%] gap-4 mx-auto">
      <div className="col-span-2">
        <MainNews news={mainNews}></MainNews>
        <div className="grid gap-5">
          {otherSection.map((os, ind) => (
            <div className="" key={ind}>
              <h1 className="font-bold border-b-2 border-b-amber-950 mb-3 mt-5">
                {os.title}
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {os.articles.map((news) => (
                  <NewsCart key={news.id} news={news} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-1">
        <MostRed></MostRed>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Suspense fallback={<p className="text-center py-10">Loading news...</p>}>
        <NewsSections />
      </Suspense>
    </div>
  );
}
