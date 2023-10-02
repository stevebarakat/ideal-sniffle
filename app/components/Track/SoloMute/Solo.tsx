import { Toggle } from "@/components/Buttons";

type Props = {
  trackId: number;
  soloMute: SoloMute;
  setSoloMute: (arg: SoloMute) => void;
  channels: Channel[];
};

function Solo({ trackId, soloMute, setSoloMute, channels }: Props) {
  function toggleSolo(e: React.FormEvent<HTMLInputElement>): void {
    if (!soloMute) return;
    const checked = e.currentTarget.checked;
    channels[trackId].solo = checked;
    setSoloMute({
      ...soloMute,
      solo: checked,
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
