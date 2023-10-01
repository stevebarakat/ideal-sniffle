import { Mixer } from "~/components/Mixer";
import type { LoaderFunction } from "@remix-run/node";
import { MixerMachineContext } from "@/context/MixerMachineContext";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
  const sourceSong = await prisma.sourceSong.findFirst();
  const currentTracks = await prisma.sourceTrack.findMany({
    where: { id: sourceSong?.id },
  });
  return sourceSong;
};

function Index() {
  const sourceSong = useLoaderData();
  const fetcher = useFetcher();
  const namesQuery = fetcher.data;

  const mixData = namesQuery?.mixData;

  return (
    <MixerMachineContext.Provider>
      <Mixer mixData={mixData} sourceSong={sourceSong} />
    </MixerMachineContext.Provider>
  );
}

export default Index;
