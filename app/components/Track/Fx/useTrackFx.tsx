import { useRef } from "react";
import { localStorageGet, array } from "@/utils";
import type { InputNode } from "tone";
import { Destination } from "tone";
import {
  useReverb,
  useDelay,
  usePitchShift,
  Reverber,
  Delay,
  PitchShifter,
  NoFx,
} from ".";

function useTrackFx(trackId: number, channel: Channel, trackFx: TrackFx) {
  const currentTracks = localStorageGet("currentTracks");
  const ct = currentTracks[trackId];
  const reverb = useReverb;
  const pitchShift = usePitchShift;
  const delay = useDelay;

  const fxComponents = useRef([
    <NoFx nofx={trackFx.nofx} />,
    <NoFx nofx={trackFx.nofx} />,
  ]);

  const fx = (() => {
    const currentFx = ct.fxNames ?? null;

    array(2).forEach((_, fxId) => {
      switch (currentFx[fxId]) {
        case "nofx":
          trackFx.nofx = null;

          // fxComponents.current = {
          //   ...fxComponents.current,
          //   [`${fxId + 1}`]: <NoFx nofx={trackFx.nofx} />,
          // };

          fxComponents.current[fxId] = <NoFx nofx={trackFx.nofx} />;

          break;
        case "reverb":
          trackFx.reverb = reverb({
            wet: ct.mix[fxId],
            preDelay: ct.preDelay[fxId],
            decay: ct.decay[fxId],
          });

          // fxComponents.current = {
          //   ...fxComponents.current,
          //   [`${fxId + 1}`]: (
          //     <Reverber reverb={trackFx.reverb} trackId={trackId} fxId={fxId} />
          //   ),
          // };

          fxComponents.current[fxId] = (
            <Reverber reverb={trackFx.reverb} trackId={trackId} fxId={fxId} />
          );
          break;
        case "delay":
          trackFx.delay = delay({
            wet: ct.delaySettings.mix[fxId],
            delayTime: ct.delaySettings.delayTime[fxId],
            feedback: ct.delaySettings.feedback[fxId],
          });

          // fxComponents.current = {
          //   ...fxComponents.current,
          //   [`${fxId + 1}`]: (
          //     <Delay delay={trackFx.delay} trackId={trackId} fxId={fxId} />
          //   ),
          // };

          fxComponents.current[fxId] = (
            <Delay delay={trackFx.delay} trackId={trackId} fxId={fxId} />
          );

          break;
        case "pitchShift":
          trackFx.pitchShift = pitchShift({
            wet: ct.pitchShiftSettings.mix[fxId],
            pitch: ct.pitchShiftSettings.pitch[fxId],
          });

          // fxComponents.current = {
          //   ...fxComponents.current,
          //   [`${fxId + 1}`]: (
          //     <PitchShifter
          //       pitchShift={trackFx.pitchShift}
          //       trackId={trackId}
          //       fxId={fxId}
          //     />
          //   ),
          // };

          fxComponents.current[fxId] = (
            <PitchShifter
              pitchShift={trackFx.pitchShift}
              trackId={trackId}
              fxId={fxId}
            />
          );

          break;
        default:
          break;
      }
    });
    const fxProps: InputNode[] = fxComponents.current.map((fx) => fx.props);
    const fxNodes = fxProps.map((prop) => Object.values(prop)[0]);
    channel.disconnect();
    channel.chain(fxNodes[0], fxNodes[1], Destination).toDestination();
    return fxComponents.current;
  })();

  return fx;
}

export default useTrackFx;
