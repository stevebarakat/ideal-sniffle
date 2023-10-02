import { Button } from "./Buttons";
import { XCircle } from "lucide-react";
import { db } from "@/db";
import { useState } from "react";

type Props = {
  trackId: number;
  param: "volume" | "pan" | "soloMute";
};

function PlaybackMode({ trackId, param }: Props) {
  const currentTracks = JSON.parse(localStorage.getItem("currentTracks")!);

  const [playbackMode, setPlaybackMode] = useState(
    currentTracks[trackId][`${param}Mode`]
  );
  function setTrackPlaybackMode(e: React.FormEvent<HTMLSelectElement>): void {
    const ctCopy = JSON.parse(JSON.stringify(currentTracks));
    ctCopy[trackId][`${param}Mode`] = e.currentTarget.value;
    db.currentTracks.put({ id: "currentTracks", data: ctCopy });
    setPlaybackMode(e.currentTarget.value);
  }

  function clearData() {
    db[`${param}Data`].where("id").equals(`${param}Data${trackId}`).delete();
  }

  return (
    <div className="flex gap4">
      {/* {playbackMode} */}
      <select
        name="playbackMode"
        id="playbackMode-select"
        onChange={setTrackPlaybackMode}
        value={playbackMode}
      >
        <option value="static">Static</option>
        <option value="read">Read</option>
        <option value="write">Write</option>
      </select>
      <Button onClick={clearData}>
        <XCircle />
      </Button>
    </div>
  );
}

export default PlaybackMode;
