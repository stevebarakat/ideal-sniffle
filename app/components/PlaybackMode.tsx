// import { MixerMachineContext } from "@/context/MixerMachineContext";
import Toggle from "./Buttons/Toggle";
import { Button } from "./Buttons";
import {
  XCircle,
  PlayCircle,
  CircleDotDashed,
  CircleDot,
  MinusCircle,
} from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import { useEffect, useState } from "react";

type Props = {
  trackId: number;
  param: "volume" | "pan" | "soloMute";
};

function PlaybackMode({ trackId, param }: Props) {
  const currentTracks = useLiveQuery(() => db.currentTracks.toArray());
  const [playbackMode, setPlaybackMode] = useState(
    currentTracks &&
      currentTracks[trackId] &&
      currentTracks[trackId][`${param}Mode`]
  );

  function setTrackPlaybackMode(e: React.FormEvent<HTMLInputElement>): void {
    const data = JSON.parse(JSON.stringify(currentTracks));
    data[trackId][`${param}Mode`] = e.currentTarget.value;
    setPlaybackMode(e.currentTarget.value);

    if (!currentTracks) return;
    (async () => {
      await db.currentTracks
        .where("path")
        .equals(currentTracks[trackId].path)
        .modify({
          [`${param}Mode`]: e.currentTarget.value,
        });
    })();
  }

  useEffect(() => {
    const getCurrentTracks = new Promise((resolve) => resolve(currentTracks));
    getCurrentTracks.then((value) => {
      if (!Array.isArray(value)) return;
      setPlaybackMode(value[trackId][`${param}Mode`]);
    });
  }, [currentTracks, trackId, param]);

  function clearData() {
    db[`${param}Data`].where("id").equals(`${param}Data${trackId}`).delete();
  }

  return (
    <div className="flex gap4">
      {/* {playbackMode} */}
      <Toggle
        type="radio"
        id={`track${trackId + 1}-${param}-write`}
        name={`track${trackId + 1}-${param}playbackMode`}
        onChange={setTrackPlaybackMode}
        checked={playbackMode === "write"}
        value="write"
      >
        {playbackMode === "write" ? (
          <CircleDotDashed className="rotate" />
        ) : (
          <CircleDot />
        )}
      </Toggle>
      <Toggle
        type="radio"
        id={`track${trackId + 1}-${param}-read`}
        name={`track${trackId + 1}-${param}playbackMode`}
        onChange={setTrackPlaybackMode}
        checked={playbackMode === "read"}
        value="read"
      >
        <PlayCircle />
      </Toggle>
      <Toggle
        type="radio"
        id={`track${trackId + 1}-${param}-static`}
        name={`track${trackId + 1}-${param}playbackMode`}
        onChange={setTrackPlaybackMode}
        checked={playbackMode === "static"}
        value="static"
      >
        <MinusCircle />
      </Toggle>
      <Button onClick={clearData}>
        <XCircle />
      </Button>
    </div>
  );
}

export default PlaybackMode;
