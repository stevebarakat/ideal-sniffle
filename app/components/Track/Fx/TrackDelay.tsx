import { useEffect, useCallback } from "react";
import { MixerMachineContext } from "@/context/MixerMachineContext";
import { powerIcon } from "@/assets/icons";
import useWrite from "@/hooks/useWrite";
import PlaybackMode from "@/components/FxPlaybackMode";
import type { FeedbackDelay } from "tone";
import { Toggle } from "@/components/Buttons";
import { Transport as t } from "tone";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";

type Props = {
  delay: FeedbackDelay | null;
  trackId: number;
};

type ReadProps = {
  trackId: number;
};

export default function Delay({ delay, trackId }: Props) {
  const { send } = MixerMachineContext.useActorRef();

  const bypassed = MixerMachineContext.useSelector((state) => {
    return state.context.currentTracks[trackId].delaySettings.bypassed;
  });

  const mix = MixerMachineContext.useSelector((state) => {
    return state.context.currentTracks[trackId].delaySettings.mix;
  });

  const delayTime = MixerMachineContext.useSelector((state) => {
    return state.context.currentTracks[trackId].delaySettings.delayTime;
  });

  const feedback = MixerMachineContext.useSelector((state) => {
    return state.context.currentTracks[trackId].delaySettings.feedback;
  });

  function toggleBypass(e: React.FormEvent<HTMLInputElement>): void {
    const checked = e.currentTarget.checked;
    send({
      type: "SET_TRACK_DELAY_BYPASS",
      checked,
      delay: delay!,
      trackId,
    });
  }

  function setMix(e: React.FormEvent<HTMLInputElement>): void {
    const value = parseFloat(e.currentTarget.value);
    send({
      type: "SET_TRACK_DELAY_MIX",
      value,
      delay: delay!,
      trackId,
    });
  }

  function setDelayTime(e: React.FormEvent<HTMLInputElement>): void {
    const value = parseFloat(e.currentTarget.value);
    send({
      type: "SET_TRACK_DELAY_TIME",
      value,
      delay: delay!,
      trackId,
    });
  }

  function setFeedback(e: React.FormEvent<HTMLInputElement>): void {
    const value = parseFloat(e.currentTarget.value);
    send({
      type: "SET_TRACK_DELAY_FEEDBACK",
      value,
      delay: delay!,
      trackId,
    });
  }

  // !!! --- WRITE --- !!! //
  useWrite({
    id: trackId,
    fxParam: "delay",
    value: {
      playbackMode: "static",
      bypassed: bypassed,
      mix: mix,
      delayTime: delayTime,
      feedback: feedback,
    },
  });

  useRead({ trackId });

  // !!! --- READ --- !!! //
  function useRead({ trackId }: ReadProps) {
    const { send } = MixerMachineContext.useActorRef();
    const playbackMode = MixerMachineContext.useSelector(
      (state) => state.context.currentTracks[trackId].delaySettings.playbackMode
    );

    const setParam = useCallback(
      (
        trackId: number,
        data: {
          time: number;
          value: DelaySettings;
        }
      ) => {
        t.schedule(() => {
          if (playbackMode !== "read") return;

          send({
            type: "SET_TRACK_DELAY_MIX",
            value: data.value.mix,
            delay: delay!,
            trackId,
          });

          send({
            type: "SET_TRACK_DELAY_TIME",
            value: data.value.delayTime,
            delay: delay!,
            trackId,
          });

          send({
            type: "SET_TRACK_DELAY_FEEDBACK",
            value: data.value.feedback,
            delay: delay!,
            trackId,
          });
        }, data.time);
      },
      [send, playbackMode]
    );

    let queryData = [];
    const delayData = useLiveQuery(async () => {
      queryData = await db.delayData
        .where("id")
        .equals(`delayData${trackId}`)
        .toArray();
      return queryData[0];
    });

    useEffect(() => {
      if (playbackMode !== "read" || !delayData) return;
      for (const value of delayData.data.values()) {
        setParam(value.id, value);
      }
    }, [delayData, setParam, playbackMode]);

    return null;
  }

  return (
    <div>
      <div className="flex gap12">
        <h3>Delay</h3>
        <div className="power-button">
          <Toggle
            id={`bypassed-track${trackId}`}
            onChange={toggleBypass}
            checked={bypassed}
          >
            {powerIcon}
          </Toggle>
        </div>
      </div>
      <div className="flex-y">
        <PlaybackMode trackId={trackId} param="delay" />
        <label htmlFor={`track${trackId}mix`}>Mix:</label>
        <input
          type="range"
          id={`track${trackId}mix`}
          min={0}
          max={1}
          step={0.01}
          disabled={bypassed}
          value={mix}
          onChange={setMix}
        />
      </div>
      <div className="flex-y">
        <label htmlFor={`track${trackId}delayTime`}>Delay Time:</label>
        <input
          type="range"
          id={`track${trackId}delayTime`}
          min={0}
          max={1}
          step={0.01}
          disabled={bypassed}
          value={delayTime}
          onChange={setDelayTime}
        />
      </div>
      <div className="flex-y">
        <label htmlFor={`track${trackId}feedback`}>Feedback:</label>
        <input
          type="range"
          id={`track${trackId}feedback`}
          min={0}
          max={1}
          step={0.01}
          disabled={bypassed}
          value={feedback}
          onChange={setFeedback}
        />
      </div>
    </div>
  );
}
