import { Toggle } from "@/components/Buttons";
import { MixerMachineContext } from "@/context/MixerMachineContext";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~/db";

type Props = {
  trackId: number;
};

function Mute({ trackId }: Props) {
  const { send } = MixerMachineContext.useActorRef();
  const currentTracks = useLiveQuery(() => db.currentTracks.toArray());
  const soloMute = currentTracks && currentTracks[trackId].soloMute;

  function toggleMute(e: React.FormEvent<HTMLInputElement>): void {
    if (!soloMute) return;
    const checked = e.currentTarget.checked;
    send({
      type: "SET_TRACK_SOLOMUTE",
      trackId,
      value: {
        solo: soloMute.solo,
        mute: checked,
      },
    });
  }

  return (
    <Toggle
      id={`trackMute${trackId}`}
      checked={soloMute?.mute || false}
      onChange={toggleMute}
    >
      M
    </Toggle>
  );
}

export default Mute;
