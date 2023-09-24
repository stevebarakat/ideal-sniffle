import { useEffect, useState, useRef } from "react";
import { Destination, Meter, Volume } from "tone";
import PlaybackMode from "../PlaybackMode";
import Pan from "./Pan";
import SoloMute from "./SoloMute";
import Fader from "./Fader";
import ChannelLabel from "../ChannelLabel";
import { upperFirst } from "lodash";
import useVolumeAutomationData from "@/hooks/useVolumeAutomationData";
import { ChannelButton } from "../Buttons";
import { array } from "@/utils";
import { MixerMachineContext } from "@/context/MixerMachineContext";
import TrackPanel from "./TrackPanel";
import {
  Delay,
  Reverber,
  PitchShifter,
  useNoFx,
  useDelay,
  useReverb,
  usePitchShift,
} from "./Fx";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import type { JSX } from "react/jsx-runtime";

type Props = {
  track: SourceTrack;
  trackId: number;
  channels: Channel[];
};

function TrackChannel({ track, trackId, channels }: Props) {
  useVolumeAutomationData({ trackId, channels });

  const fx = {
    nofx: useNoFx(),
    delay: useDelay(),
    reverb: useReverb(),
    pitchShift: usePitchShift(),
  };

  const currentTracks = useLiveQuery(() => db.currentTracks.toArray());
  // const currentTracks = MixerMachineContext.useSelector(
  //   (state) => state.context.currentTracks
  // );
  const [fxNames, setFxNames] = useState(
    () => (currentTracks && currentTracks[trackId].fxNames) ?? ["nofx"]
  );

  useEffect(() => {
    if (!currentTracks) return;
    setFxNames(currentTracks[trackId].fxNames);
  }, [currentTracks, trackId]);

  const meters = useRef(
    Array(channels.length).fill(new Meter({ channels: 2 }))
  );

  const { send } = MixerMachineContext.useActorRef();

  const [currentTrackFx, setCurrentTrackFx] = useState<Fx>(new Volume());

  const disabled =
    fxNames &&
    fxNames?.every((item: string) => {
      return item === "nofx";
    });

  function handleClick() {
    send({
      type: "SET_ACTIVE_TRACK_PANELS",
      trackId,
    });
  }
  useEffect(() => {
    fxNames?.forEach((name) => {
      switch (name) {
        case "nofx":
          setCurrentTrackFx(fx.nofx);
          break;

        case "reverb":
          setCurrentTrackFx(fx.reverb);
          break;

        case "delay":
          setCurrentTrackFx(fx.delay);
          break;

        case "pitchShift":
          setCurrentTrackFx(fx.pitchShift);
          break;

        default:
          break;
      }
    });

    channels[trackId].disconnect();
    channels[trackId].connect(meters.current[trackId].toDestination());
    currentTrackFx && channels[trackId].chain(currentTrackFx, Destination);
  });

  let currentFx: JSX.Element[] = [];
  fxNames?.map((fxName) => {
    switch (fxName) {
      case "reverb":
        currentFx = [
          <Reverber key="reverb" reverb={fx.reverb} trackId={trackId} />,
          ...currentFx,
        ];
        break;
      case "delay":
        currentFx = [
          <Delay key="delay" delay={fx.delay} trackId={trackId} />,
          ...currentFx,
        ];
        break;
      case "pitchShift":
        currentFx = [
          <PitchShifter
            key="pitchShift"
            pitchShift={fx.pitchShift}
            trackId={trackId}
          />,
          ...currentFx,
        ];
        break;
      default:
        break;
    }
  });

  async function setTrackFxNames(
    e: React.FormEvent<HTMLSelectElement>,
    action: string
  ) {
    const fxName = e.currentTarget.value;
    const id = e.currentTarget.id.at(-1);
    const fxId = parseInt(id!, 10);

    send({
      type: "SET_TRACK_FX_NAMES",
      trackId,
      fxId,
      action,
      channels,
      value: fxName,
    });
  }
  const panelEmpty = fxNames?.every((name: string) => name === "nofx");

  return (
    <div className="flex-y gap2">
      <>
        {!panelEmpty && (
          <TrackPanel trackId={trackId}>{currentFx.map((fx) => fx)}</TrackPanel>
        )}
        <ChannelButton
          className="fx-select"
          disabled={disabled}
          onClick={handleClick}
        >
          {disabled
            ? "No "
            : currentTracks && currentTracks[trackId].panelActive === false
            ? "Close "
            : "Open "}
          FX
        </ChannelButton>
        <div className="flex-y gap2 reverse">
          {array((fxNames?.length && fxNames.length + 1) || 1).map(
            (_: void, fxId: number) => {
              if (!fxNames) return null;
              return (
                <select
                  key={fxId}
                  id={`track${trackId}fx${fxId}`}
                  className="fx-select"
                  onChange={(e) =>
                    e.target.value !== "nofx"
                      ? setTrackFxNames(e, "add")
                      : setTrackFxNames(e, "remove")
                  }
                  value={fxNames[fxId]}
                >
                  <option value={"nofx"}>
                    {fxNames[fxId] === undefined
                      ? "Add Fx"
                      : `- ${upperFirst(fxNames[fxId])}`}
                  </option>
                  <option
                    value={"reverb"}
                    disabled={fxNames.some((name) => name === "reverb")}
                  >
                    Reverb
                  </option>
                  <option
                    value={"delay"}
                    disabled={fxNames.some((name) => name === "delay")}
                  >
                    Delay
                  </option>
                  <option
                    value={"pitchShift"}
                    disabled={fxNames.some((name) => name === "pitchShift")}
                  >
                    Pitch Shift
                  </option>
                </select>
              );
            }
          )}
        </div>
      </>

      <div className="channel">
        <Pan trackId={trackId} channels={channels} />
        <Fader trackId={trackId} channels={channels} meters={meters} />
        <SoloMute trackId={trackId} channels={channels} />
        <ChannelLabel channelName={track.name} />
      </div>
      <PlaybackMode trackId={trackId} param="volume" />
    </div>
  );
}

export default TrackChannel;
