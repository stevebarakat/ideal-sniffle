import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { prisma } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ params: { slug } }) => {
  // console.log("slug", slug);
  const mixData = await prisma.mixData.findMany({
    orderBy: { name: "asc" },
  });
  if (!mixData) throw new Error("Mix not found");
  const data = { mixData };
  return json(data);
};
