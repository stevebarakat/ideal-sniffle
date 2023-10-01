import { useEffect, useCallback } from "react";
import { Transport as t } from "tone";
import { roundFourth } from "@/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";

type Props = {
  trackId: number;
  channels: Channel[];
  soloMute: SoloMute;
  setSoloMute: (arg: SoloMute) => void;
};

type ReadProps = { trackId: number; setSoloMute: (arg: SoloMute) => void };

type WriteProps = {
  id: number;
  value: SoloMute;
};

function useSoloMuteAutomationData({
  trackId,
  channels,
  soloMute,
  setSoloMute,
}: Props) {
  const currentTracks = useLiveQuery(
    async () => await db.currentTracks.toArray()
  );

  useEffect(() => {
    const getCurrentTracks = new Promise((resolve) => resolve(currentTracks));
    getCurrentTracks.then((value) => {
      if (!Array.isArray(value)) return;
      setSoloMute(value[trackId].soloMute);
    });
  }, [currentTracks, trackId, setSoloMute]);

  useWrite({ id: trackId, value: soloMute });
  useRead({ trackId, setSoloMute });
  return null;
}

const data = new Map<
  number,
  { id: number; value: { solo: boolean; mute: boolean }; time: number }
>();

// !!! --- WRITE --- !!! //

function useWrite({ id, value }: WriteProps) {
  const currentTracks = useLiveQuery(() => db.currentTracks.toArray());
  const playbackMode = currentTracks && currentTracks[id]?.soloMuteMode;

  useEffect(() => {
    if (playbackMode !== "write") return;

    const loop = t.scheduleRepeat(
      () => {
        const time: number = roundFourth(t.seconds);
        data.set(time, { id, time, value });
        db.soloMuteData.put({
          id: `soloMuteData${id}`,
          data,
        });
      },
      0.25,
      0
    );

    return () => {
      t.clear(loop);
    };
  }, [id, value, playbackMode]);

  return data;
}

// !!! --- READ --- !!! //

function useRead({ trackId, setSoloMute }: ReadProps) {
  const currentTracks = useLiveQuery(() => db.currentTracks.toArray());
  const playbackMode = currentTracks && currentTracks[trackId]?.volumeMode;

  const setParam = useCallback(
    (
      trackId: number,
      data: {
        time: number;
        value: SoloMute;
      }
    ) => {
      t.schedule(() => {
        if (playbackMode !== "read") return;

        setSoloMute(data.value);
      }, data.time);
    },
    [playbackMode, setSoloMute]
  );

  let queryData = [];
  const soloMuteData = useLiveQuery(async () => {
    queryData = await db.soloMuteData
      .where("id")
      .equals(`soloMuteData${trackId}`)
      .toArray();
    return queryData[0];
  });

  useEffect(() => {
    if (playbackMode !== "read" || !soloMuteData) return;
    for (const value of soloMuteData.data.values()) {
      setParam(value.id, value);
    }
  }, [soloMuteData, setParam, playbackMode]);

  return null;
}
export default useSoloMuteAutomationData;
