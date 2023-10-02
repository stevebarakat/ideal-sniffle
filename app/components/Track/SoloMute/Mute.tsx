import { Toggle } from "@/components/Buttons";

type Props = {
  trackId: number;
  soloMute: SoloMute;
  setSoloMute: (arg: SoloMute) => void;
  channels: Channel[];
};

function Mute({ trackId, soloMute, setSoloMute, channels }: Props) {
  function toggleMute(e: React.FormEvent<HTMLInputElement>): void {
    if (!soloMute) return;
    const checked = e.currentTarget.checked;
    channels[trackId].mute = checked;
    setSoloMute({
      ...soloMute,
      mute: checked,
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
