import { MixerMachineContext } from "@/context/MixerMachineContext";
import usePanAutomationData from "@/hooks/usePanAutomationData";
import PlaybackMode from "../PlaybackMode";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~/db";

type Props = {
  trackId: number;
  channels: Channel[];
};

function Pan({ trackId, channels }: Props) {
  const { send } = MixerMachineContext.useActorRef();
  const currentTracks = useLiveQuery(() => db.currentTracks.toArray());
  const pan = currentTracks && currentTracks[trackId].pan;

  usePanAutomationData({ trackId, channels });

  function setPan(e: React.FormEvent<HTMLInputElement>): void {
    send({
      type: "SET_TRACK_PAN",
      trackId,
      value: parseFloat(e.currentTarget.value),
    });
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
        onChange={setPan}
      />
      <PlaybackMode trackId={trackId} param="pan" />
    </>
  );
}

export default Pan;
