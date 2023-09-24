import { useState } from "react";
import { useFetcher } from "@remix-run/react";
import { Transport as t } from "tone";
import { db } from "@/db";
import "dexie-export-import";

import type { MixData } from "@prisma/client";

type Props = {
  mixData: MixData[];
};

function ImportExport({ mixData }: Props) {
  const fetcher = useFetcher();
  const [mixName, setMixName] = useState("");

  async function exportDb(
    e: React.FormEvent<HTMLFormElement>,
    mixName: string
  ) {
    e.preventDefault();
    try {
      const blob = await db.export();
      const str = await blob.text();
      fetcher.submit(
        {
          actionName: "exportMix",
          name: mixName,
          data: str,
        },
        { method: "post", action: "/actions", replace: true }
      );
    } catch (error) {
      console.error("error: " + error);
    }
    setMixName("");
  }

  async function importDb(e: React.FormEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;
    console.log("value", value);
    console.log("mixData", mixData);
    const data = mixData.find((data) => data.name === value);
    console.log("data", data?.data);
    if (!data) return;
    const str = JSON.stringify(data.data);
    console.log("str", str);
    const bytes = new TextEncoder().encode(data.data);
    console.log("bytes", bytes);
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8",
    });
    console.log("blob", blob);
    t.cancel();
    await db.import(blob, { overwriteValues: true });
  }

  return (
    <>
      <form onSubmit={(e) => exportDb(e, mixName)}>
        <label htmlFor="mixName">File Name: </label>
        <input
          id="mixName"
          onChange={(e) => setMixName(e.currentTarget.value)}
          value={mixName}
        />
        <button>Submit</button>
      </form>
      <select name="mixes" id="mix-select" onChange={importDb}>
        <option value="">Choose a song:</option>
        {mixData?.map((data) => (
          <option key={data.id} value={data.name}>
            {data.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default ImportExport;
