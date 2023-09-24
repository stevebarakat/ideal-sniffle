import Transport from "./Transport";
import { log, dbToPercent } from "../utils";
// import SongSelect from "./SongSelect";
import ImportExport from "./ImportExport.client";
import useTracks from "@/hooks/useTracks";
import Loader from "./Loader";
import SongInfo from "./SongInfo";
import { TrackChannel } from "./Track";
import Main from "./Main";
import { MixerMachineContext } from "@/context/MixerMachineContext";
import { Destination, Transport as t } from "tone";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { prisma } from "~/utils/db.server";
import { useRef } from "react";
import type { MixData } from "@prisma/client";

type Props = {
  mixData: MixData[];
};

export const Mixer = ({ mixData }: Props) => {
  const fetcher = useFetcher();
  const { currentTracks, currentMain, sourceSong } =
    MixerMachineContext.useSelector((state) => state.context);

  if (!sourceSong) window.location.reload();

  const tracks = sourceSong.tracks;
  const { channels, isLoading } = useTracks({ tracks });

  (function loadSettings() {
    // t.bpm.value = sourceSong.bpm;
    // const volume = currentMain.volume;
    // const scaled = dbToPercent(log(volume));
    // Destination.volume.value = scaled;

    currentTracks.forEach((currentTrack: TrackSettings, trackId: number) => {
      const value = currentTrack.volume;
      const scaled = dbToPercent(log(value));

      if (channels[trackId]) {
        channels[trackId].set({
          volume: scaled,
          pan: currentTrack.pan,
          solo: currentTrack.soloMute.solo,
          mute: currentTrack.soloMute.mute,
        });
      }
    });
  })();

  if (isLoading) {
    return <Loader song={sourceSong} />;
  } else {
    return (
      <>
        <div className="mixer">
          <SongInfo song={sourceSong} />

          <ImportExport mixData={mixData} />
          <div className="channels">
            {tracks.map((track, i) => (
              <TrackChannel
                key={track.id}
                track={track}
                trackId={i}
                channels={channels}
              />
            ))}
            <Main />
          </div>
          <Transport song={sourceSong} />
        </div>
        {/* <SongSelect /> */}
      </>
    );
  }
};
