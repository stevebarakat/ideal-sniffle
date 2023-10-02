import { Mixer } from "~/components/Mixer";
import { type LoaderFunction } from "@remix-run/node";
import { defaultTrackData } from "~/assets/songs/defaultData";
import { MixerMachineContext } from "@/context/MixerMachineContext";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db.server";
import { useEffect } from "react";

export const loader: LoaderFunction = async () => {
  const mixData = await prisma.mixData.findMany({
    orderBy: { name: "asc" },
  });

  console.log("mixData", mixData);
  return mixData;
};

function Index() {
  const mixData = useLoaderData();
  const fetcher = useFetcher();

  // resource route for loading server data
  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/mixName/");
    }
  }, [fetcher]);

  const sourceSong = JSON.parse(mixData[0].data).data.data[0].rows[0].data;
  const sourceTracks = JSON.parse(mixData[0].data).data.data[2].rows;
  const currentMain = JSON.parse(mixData[0].data).data.data[1].rows[0].data;
  const currentTracks = sourceTracks.map((track: TrackSettings) => ({
    ...track,
    ...defaultTrackData,
    songSlug: sourceSong?.slug,
  }));

  console.log("mixData", mixData);

  return (
    <MixerMachineContext.Provider>
      <Mixer
        mixData={mixData}
        sourceSong={sourceSong}
        currentMain={currentMain}
        currentTracks={currentTracks}
      />
    </MixerMachineContext.Provider>
  );
}

export default Index;
