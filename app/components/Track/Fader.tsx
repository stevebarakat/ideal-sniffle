import VuMeter from "../VuMeter";
import useMeters from "@/hooks/useMeters";
import type { Meter } from "tone";
import { dbToPercent, log } from "~/utils";

type Props = {
  trackId: number;
  channels: Channel[];
  meters: React.MutableRefObject<Meter[]>;
  volume: number;
  setVolume: (arg: number) => void;
};

function Fader({ trackId, channels, meters, volume, setVolume }: Props) {
  const meterVal = useMeters([channels[trackId]], meters);

  function saveTrackVolume(e: React.FormEvent<HTMLInputElement>): void {
    const value = parseFloat(e.currentTarget.value);
    const scaled = dbToPercent(log(value));
    channels[trackId].volume.value = scaled;
    setVolume(value);
    const currentTracks = JSON.parse(localStorage.getItem("currentTracks")!);
    currentTracks[trackId].volume = value;
    localStorage.setItem("currentTracks", JSON.stringify(currentTracks));
  }

  return (
    <div className="fader-wrap">
      <div className="window">{`${volume?.toFixed(0)} dB`}</div>
      <div className="levels-wrap">
        <VuMeter meterValue={meterVal} height={150} width={12} />
      </div>
      <div className="vol-wrap">
        <input
          type="range"
          id={`trackVol${trackId}`}
          className="range-y volume"
          min={-100}
          max={12}
          step={0.1}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.currentTarget.value))}
          onPointerUp={saveTrackVolume}
        />
      </div>
    </div>
  );
}

export default Fader;
