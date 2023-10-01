import usePanAutomationData from "@/hooks/usePanAutomationData";
import PlaybackMode from "../PlaybackMode";
import { useState } from "react";

type Props = {
  trackId: number;
  channels: Channel[];
};

function Pan({ trackId, channels }: Props) {
  const localTracks = JSON.parse(localStorage.getItem("currentTracks")!);
  const [pan, setPan] = useState(() => localTracks[trackId].pan);

  usePanAutomationData({ trackId, channels, pan, setPan });

  function saveTrackPan(e: React.FormEvent<HTMLInputElement>): void {
    const value = parseFloat(e.currentTarget.value);
    setPan(value);
    channels[trackId].pan.value = value;
    const currentTracks = JSON.parse(localStorage.getItem("currentTracks")!);
    currentTracks[trackId].pan = value;
    localStorage.setItem("currentTracks", JSON.stringify(currentTracks));
  }

  return (
    <>
      <input
        type="range"
        id={`trackPan${trackId}`}
        className="range-x"
        min={-1}
        max={1}
        step={0.25}
        value={pan}
        onChange={(e) => setPan(parseFloat(e.currentTarget.value))}
        onPointerUp={saveTrackPan}
      />
      <PlaybackMode trackId={trackId} param="pan" />
    </>
  );
}

export default Pan;
