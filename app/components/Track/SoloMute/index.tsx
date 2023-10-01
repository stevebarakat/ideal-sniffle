import Solo from "./Solo";
import Mute from "./Mute";
import PlaybackMode from "../../PlaybackMode";
import useSoloMuteAutomationData from "@/hooks/useSoloMuteAutomationData";
import { useState } from "react";

type Props = {
  trackId: number;
  channels: Channel[];
};

function SoloMute({ trackId, channels }: Props) {
  const localTracks = JSON.parse(localStorage.getItem("currentTracks")!);
  const [soloMute, setSoloMute] = useState(() => localTracks[trackId].soloMute);

  useSoloMuteAutomationData({ trackId, channels, soloMute, setSoloMute });

  return (
    <div>
      <div className="solo-mute">
        <Solo trackId={trackId} soloMute={soloMute} setSoloMute={setSoloMute} />
        <Mute trackId={trackId} soloMute={soloMute} setSoloMute={setSoloMute} />
      </div>
      <PlaybackMode trackId={trackId} param="soloMute" />
    </div>
  );
}

export default SoloMute;
