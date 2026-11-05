import { connection } from "next/server";

export default async function DateDisplay() {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return <p className="text-sm text-gray-500">{date}</p>;
}