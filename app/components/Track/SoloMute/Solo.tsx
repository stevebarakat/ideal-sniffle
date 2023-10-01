import { Toggle } from "@/components/Buttons";

type Props = {
  trackId: number;
  soloMute: SoloMute;
  setSoloMute: (arg: SoloMute) => void;
};

function Solo({ trackId, soloMute, setSoloMute }: Props) {
  function toggleSolo(e: React.FormEvent<HTMLInputElement>): void {
    if (!soloMute) return;
    const checked = e.currentTarget.checked;
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
