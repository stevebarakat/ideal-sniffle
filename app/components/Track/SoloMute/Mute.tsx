import { Toggle } from "@/components/Buttons";

type Props = {
  trackId: number;
  soloMute: SoloMute;
  setSoloMute: (arg: SoloMute) => void;
};

function Mute({ trackId, soloMute, setSoloMute }: Props) {
  function toggleMute(e: React.FormEvent<HTMLInputElement>): void {
    if (!soloMute) return;
    const checked = e.currentTarget.checked;
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
