import { prisma } from "~/utils/db.server";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const actionName = form.get("actionName");

  switch (actionName) {
    case "exportMix":
      const dataString = form.get("data");
      const data = dataString;
      const name = form.get("name");
      await prisma.mixData.create({ data: { name, data } });
      break;

    default:
      throw new Response(`Unknown action ${actionName}`, { status: 400 });
  }
  return null;
};
