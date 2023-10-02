import { useEffect, useCallback } from "react";
import { Transport as t } from "tone";
import { dbToPercent, log, roundFourth } from "@/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";

type Props = {
  trackId: number;
  channels: Channel[];
  volume: number;
  setVolume: (arg: number) => void;
};

type ReadProps = {
  trackId: number;
  channels: Channel[];
  setVolume: (arg: number) => void;
};

type WriteProps = {
  id: number;
  value: number | string | boolean;
};

function useVolumeAutomationData({
  trackId,
  channels,
  volume,
  setVolume,
}: Props) {
  useWrite({ id: trackId, value: volume });
  useRead({ trackId, channels, setVolume });

  return null;
}

const data = new Map<number, object>();

// !!! --- WRITE --- !!! //
function useWrite({ id, value }: WriteProps) {
  const currentTracks = useLiveQuery(() => db.currentTracks.toArray());
  const playbackMode = currentTracks && currentTracks[id].volumeMode;

  useEffect(() => {
    if (playbackMode !== "write") return;

    const loop = t.scheduleRepeat(
      () => {
        const time: number = roundFourth(t.seconds);
        data.set(time, { id, time, value });
        db.volumeData.put({
          id: `volumeData${id}`,
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
function useRead({ trackId, channels, setVolume }: ReadProps) {
  const currentTracks = useLiveQuery(() => db.currentTracks.toArray());
  const playbackMode = currentTracks && currentTracks[trackId].volumeMode;

  const setParam = useCallback(
    (
      trackId: number,
      data: {
        time: number;
        value: number;
      }
    ) => {
      t.schedule(() => {
        if (playbackMode !== "read") return;

        const scaled = dbToPercent(log(data.value));
        channels[trackId].volume.value = scaled;

        setVolume(data.value);
      }, data.time);
    },
    [playbackMode, setVolume, channels]
  );

  let queryData = [];
  const volumeData = useLiveQuery(async () => {
    queryData = await db.volumeData
      .where("id")
      .equals(`volumeData${trackId}`)
      .toArray();
    return queryData[0];
  });

  useEffect(() => {
    if (playbackMode !== "read" || !volumeData) return;

    for (const value of volumeData.data.values()) {
      setParam(value.id, value);
    }
  }, [volumeData, setParam, playbackMode]);

  return null;
}
export default useVolumeAutomationData;
