import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { prisma } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ params: { slug } }) => {
  // console.log("slug", slug);
  const mixData = await prisma.mixData
    .findFirst({
      where: { name: slug },
    })
    .then((data) => JSON.stringify(data))
    .then((str) => new TextEncoder().encode(str))
    .then(
      (bytes) => new Blob([bytes], { type: "application/json;charset=utf-8" })
    );
  if (!mixData) throw new Error("Mix not found");
  const data = { mixData };
  console.log("data", data);
  return data;
  return new Response(mixData, {
    status: 200,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
};
