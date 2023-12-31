import Transport from "./Transport";
import { log, dbToPercent } from "../utils";
import SongSelect from "./SongSelect";
import ImportExport from "./ImportExport.client";
import useTracks from "@/hooks/useTracks";
import Loader from "./Loader";
import SongInfo from "./SongInfo";
import { TrackChannel } from "./Track";
import Main from "./Main";
import { defaultTrackData } from "~/assets/songs/defaultData";
import { MixerMachineContext } from "@/context/MixerMachineContext";
import { Destination, Transport as t } from "tone";
import type { MixData } from "@prisma/client";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~/db";
import { useEffect, useState } from "react";

type Props = {
  mixData: MixData[];
  sourceSong: SourceSong;
  currentMain: MainSettings;
  currentTracks: TrackSettings[];
};

export const Mixer = ({
  mixData,
  sourceSong,
  currentMain,
  currentTracks,
}: Props) => {
  useEffect(() => {
    const keys = Object.keys(localStorage);
    const hasSourceSong = keys.some((key) => key === "sourceSong");
    const hasCurrentMain = keys.some((key) => key === "currentMain");
    const hasCurrentTracks = keys.some((key) => key === "currentTracks");
    !hasSourceSong &&
      localStorage.setItem("sourceSong", JSON.stringify(sourceSong));
    !hasCurrentMain &&
      localStorage.setItem("currentMain", JSON.stringify(currentMain));
    !hasCurrentTracks &&
      localStorage.setItem("currentTracks", JSON.stringify(currentTracks));

    db.currentMain.put({
      ...currentMain,
    });
    db.sourceSong.put({
      ...sourceSong,
    });

    currentTracks.forEach(async (currentTrack) => {
      await db.currentTracks.put(currentTrack);
    });
  }, [currentTracks, sourceSong, currentMain]);

  const { channels, isLoading } = useTracks({ tracks: currentTracks });

  // (function loadSettings() {
  //   // t.bpm.value = sourceSong.bpm;
  //   // const volume = currentMain.volume;
  //   // const scaled = dbToPercent(log(volume));
  //   // Destination.volume.value = scaled;

  //   currentTracks.forEach((currentTrack: TrackSettings, trackId: number) => {
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
            {currentTracks.map((track, i) => (
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
        <SongSelect />
      </>
    );
  }
};
