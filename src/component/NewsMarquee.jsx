import Link from "next/link";
import MarqueeText from "react-marquee-text";


async function getNews() {
  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news?limit=10",
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const result = await res.json();
    return result.data ?? [];
  } catch (error) {
    console.error("News fetch error:", error);
    return [];
  }
}

export default async function NewsMarquee() {
  const news = await getNews();

  if (news.length === 0) return null;

  return (
    <section className="mx-auto my-4 flex w-[90%] overflow-hidden rounded-md border border-gray-200 bg-white">
      <div className="z-10 flex shrink-0 items-center bg-red-600 px-4 py-3 text-sm font-bold text-white">
        BREAKING NEWS
      </div>

      <div className="min-w-0 flex-1 overflow-hidden py-3">
        <MarqueeText
          duration={10}
          direction="right"
          pauseOnHover={true}
          playOnlyInView="true"
        >
          {news.map((item) => (
            <span key={item.id} className="mx-5 inline-block">
              <Link
                href={`/news/${item.id}`}
                className="text-sm text-gray-800 hover:text-red-600"
              >
                <span className="mr-2 text-red-600">•</span>
                {item.title}
              </Link>
            </span>
          ))}
        </MarqueeText>
      </div>
    </section>
  );
}