import Link from "next/link";

export default async function NavLink() {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/categories",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result = await res.json();
  const categories = result.data ?? [];

  const filterNavlink = categories.filter(n =>n.scrapable)

  return (
    <nav className="flex flex-wrap items-center gap-5">
        <Link href="/">Home</Link>
      {filterNavlink.map((category) => (
        <Link key={category.slug}href={`/category/${category.slug}`}className="text-gray-700 transition-colors hover:text-blue-600">{category.title} </Link>
      ))}
    </nav>
  );
}