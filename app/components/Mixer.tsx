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
import type { MixData } from "@prisma/client";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~/db";
import { roxanne } from "~/assets/songs";
import { useEffect, useState } from "react";
import { setSourceSong as sss } from "~/utils/init";

type Props = {
  mixData: MixData[];
};

export const Mixer = ({ mixData }: Props) => {
  const defaultSourceSong =
    useLiveQuery(async () => {
      const temp = await db.sourceSong.toArray();
      return temp[0];
    }) || roxanne;

  const [sourceSong, setSourceSong] = useState(defaultSourceSong);

  useEffect(() => {
    sss();
    const getSourceSong = new Promise((resolve) => resolve(sourceSong));
    getSourceSong.then((value) => {
      if (!Array.isArray(value)) return;
      setSourceSong(value[0]);
    });
  }, [sourceSong]);

  const currentTracks = useLiveQuery(
    async () => await db.currentTracks.toArray()
  );

  const [tracks, setTracks] = useState(sourceSong.tracks);

  useEffect(() => {
    const getCurrentTracks = new Promise((resolve) => resolve(currentTracks));
    getCurrentTracks.then((value) => {
      if (!Array.isArray(value)) return;
      setTracks(value);
    });
  }, [currentTracks]);

  const { channels, isLoading } = useTracks({ tracks });

  // (function loadSettings() {
  //   // t.bpm.value = sourceSong.bpm;
  //   // const volume = currentMain.volume;
  //   // const scaled = dbToPercent(log(volume));
  //   // Destination.volume.value = scaled;

  //   currentTracks?.forEach((currentTrack: TrackSettings, trackId: number) => {
  //     const value = currentTrack.volume;
  //     const scaled = dbToPercent(log(value));

  //     if (channels[trackId]) {
  //       channels[trackId].set({
  //         volume: scaled,
  //         pan: currentTrack.pan,
  //         solo: currentTrack.soloMute.solo,
  //         mute: currentTrack.soloMute.mute,
  //       });
  //     }
  //   });
  // })();

  if (isLoading) {
    return <Loader song={sourceSong} />;
  } else {
    return (
      <>
        <div className="mixer">
          <SongInfo song={sourceSong} />

          <ImportExport mixData={mixData} />
          <div className="channels">
            {tracks?.map((track, i) => (
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
