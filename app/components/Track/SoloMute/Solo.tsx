import { Toggle } from "@/components/Buttons";
import { MixerMachineContext } from "@/context/MixerMachineContext";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~/db";

type Props = {
  trackId: number;
};

function Solo({ trackId }: Props) {
  const { send } = MixerMachineContext.useActorRef();
  const currentTracks = useLiveQuery(() => db.currentTracks.toArray());
  const soloMute = currentTracks && currentTracks[trackId].soloMute;

  function toggleSolo(e: React.FormEvent<HTMLInputElement>): void {
    if (!soloMute) return;
    const checked = e.currentTarget.checked;
    send({
      type: "SET_TRACK_SOLOMUTE",
      trackId,
      value: {
        mute: soloMute.mute,
        solo: checked,
      },
    });
  }

  return (
    <Toggle
      id={`trackSolo${trackId}`}
      checked={soloMute?.solo || false}
      onChange={toggleSolo}
    >
      S
    </Toggle>
  );
}

export default Solo;
