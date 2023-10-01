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
  const localTracks = JSON.parse(localStorage.getItem("currentTracks")!);
  const [volume, setVolume] = useState(() => localTracks[trackId].volume);

  useVolumeAutomationData({ trackId, channels, volume, setVolume });

  const nofx = useNoFx();
  const delay = useDelay();
  const reverb = useReverb();
  const pitchShift = usePitchShift();

  const currentTracks = useLiveQuery(
    async () => await db.currentTracks.toArray()
  );

  const meters = useRef(
    Array(channels.length).fill(new Meter({ channels: 2 }))
  );

  const [currentTrackFx, setCurrentTrackFx] = useState(
    Array(localTracks[trackId].fxNames.length).fill(new Volume())
  );

  const [fxNames, setFxNames] = useState(
    currentTracks && currentTracks[trackId] && currentTracks[trackId].fxNames
  );

  useEffect(() => {
    const getCurrentTracks = new Promise((resolve) => resolve(currentTracks));
    getCurrentTracks.then((value) => {
      if (!Array.isArray(value)) return;
      setFxNames(value[trackId].fxNames);
    });
  }, [currentTracks, trackId]);

  const disabled =
    fxNames &&
    fxNames?.every((item: string) => {
      return item === "nofx";
    });

  async function handleClick() {
    if (!currentTracks) return;
    await db.currentTracks
      .where("path")
      .equals(currentTracks[trackId].path)
      .modify({ panelActive: !currentTracks[trackId].panelActive });
  }

  useEffect(() => {
    fxNames?.forEach((name, fxId) => {
      switch (name) {
        case "nofx":
          currentTrackFx[fxId] = nofx;
          setCurrentTrackFx(() => currentTrackFx);
          break;

        case "reverb":
          currentTrackFx[fxId] = reverb;
          setCurrentTrackFx(() => currentTrackFx);
          break;

        case "delay":
          currentTrackFx[fxId] = delay;
          setCurrentTrackFx(() => currentTrackFx);
          break;

        case "pitchShift":
          currentTrackFx[fxId] = pitchShift;
          setCurrentTrackFx(() => currentTrackFx);
          break;

        default:
          break;
      }
    }, []);

    channels[trackId]?.disconnect();
    channels[trackId]?.connect(meters.current[trackId].toDestination());
    currentTrackFx?.forEach((ctf) => {
      ctf && channels[trackId].chain(ctf, Destination);
    });
  });

  let currentFx: JSX.Element[] = [];
  fxNames?.forEach((fxName) => {
    switch (fxName) {
      case "reverb":
        currentFx = [
          <Reverber key="reverb" reverb={reverb} trackId={trackId} />,
          ...currentFx,
        ];
        break;
      case "delay":
        currentFx = [
          <Delay key="delay" delay={delay} trackId={trackId} />,
          ...currentFx,
        ];
        break;
      case "pitchShift":
        currentFx = [
          <PitchShifter
            key="pitchShift"
            pitchShift={pitchShift}
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

    if (action === "remove") {
      channels[trackId].disconnect();
      if (!id) return;
      const fxId = parseInt(id, 10);

      const currentTracks = JSON.parse(localStorage.getItem("currentTracks")!);

      const spliced = currentTracks[trackId].fxNames.toSpliced(fxId, 1);
      currentTracks[trackId].fxNames = spliced;
      localStorage.setItem("currentTracks", JSON.stringify(currentTracks));
      console.log("spliced", spliced);
      setFxNames(spliced);
    } else {
      const currentTracks = JSON.parse(localStorage.getItem("currentTracks")!);
      setFxNames([...currentTracks[trackId].fxNames, fxName].reverse());
      currentTracks[trackId].fxNames = [
        ...currentTracks[trackId].fxNames,
        fxName,
      ].reverse();
      localStorage.setItem("currentTracks", JSON.stringify(currentTracks));
    }
  }
  const panelEmpty = fxNames?.every((name: string) => name === "nofx");
  const panelActive =
    currentTracks &&
    currentTracks[trackId] &&
    currentTracks[trackId].panelActive;

  return (
    <div className="flex-y gap2">
      <>
        {!panelEmpty && !panelActive && (
          <TrackPanel trackId={trackId}>{currentFx.map((fx) => fx)}</TrackPanel>
        )}
        <ChannelButton
          className="fx-select"
          disabled={disabled}
          onClick={handleClick}
        >
          {disabled
            ? "No "
            : currentTracks &&
              currentTracks[trackId] &&
              currentTracks[trackId].panelActive === false
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
        <Fader
          trackId={trackId}
          channels={channels}
          meters={meters}
          volume={volume}
          setVolume={setVolume}
        />
        <SoloMute trackId={trackId} channels={channels} />
        <ChannelLabel channelName={track.name} />
      </div>
      <PlaybackMode trackId={trackId} param="volume" />
    </div>
  );
}

export default TrackChannel;
