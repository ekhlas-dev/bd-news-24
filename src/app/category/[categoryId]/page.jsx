import NewsCart from "../../../component/NewsCart";

// import NewsCart from "@/component/NewsCart";

const CategoryNews = async ({ params }) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category news");
  }

  const result = await res.json();
  const newsList = result.data || [];

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Category Header */}
      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {result.title || categoryId}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          মোট {result.count} টি সংবাদ
        </p>
      </div>

      {/* News Grid */}
      {newsList.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsList.map((news) => (
            <NewsCart key={news.id} news={news} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-gray-500">
          এই category-তে কোনো সংবাদ পাওয়া যায়নি।
        </p>
      )}
    </main>
  );
};

export default CategoryNews;
