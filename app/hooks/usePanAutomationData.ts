import { MixerMachineContext } from "@/context/MixerMachineContext";
import { useEffect, useCallback, useState } from "react";
import { Transport as t } from "tone";
import { roundFourth } from "@/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";

type Props = { trackId: number; channels: Channel[] };

type WriteProps = {
  id: number;
  value: number | string | boolean;
};

function usePanAutomationData({ trackId, channels }: Props) {
  const currentTracks = useLiveQuery(
    async () => await db.currentTracks.toArray()
  );
  const [value, setValue] = useState(
    currentTracks && currentTracks[trackId].pan
  );

  useEffect(() => {
    const getCurrentTracks = new Promise((resolve) => resolve(currentTracks));
    getCurrentTracks.then((value) => {
      if (!Array.isArray(value)) return;
      setValue(value[trackId].pan);
    });
  }, [currentTracks, trackId]);

  useWrite({ id: trackId, value });
  useRead({ trackId, channels });
  return null;
}
const data = new Map<number, object>();

// !!! --- WRITE --- !!! //
function useWrite({ id, value }: WriteProps) {
  const currentTracks = useLiveQuery(() => db.currentTracks.toArray());
  const playbackMode = currentTracks && currentTracks[id].panMode;

  useEffect(() => {
    if (playbackMode !== "write") return;

    const loop = t.scheduleRepeat(
      () => {
        const time: number = roundFourth(t.seconds);
        data.set(time, { id, time, value });
        db.panData.put({
          id: `panData${id}`,
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

function useRead({ trackId }: Props) {
  const { send } = MixerMachineContext.useActorRef();
  const currentTracks = useLiveQuery(() => db.currentTracks.toArray());
  const playbackMode = currentTracks && currentTracks[trackId].panMode;

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

        send({
          type: "SET_TRACK_PAN",
          trackId,
          value: data.value,
        });
      }, data.time);
    },
    [playbackMode, send]
  );

  let queryData = [];
  const panData = useLiveQuery(async () => {
    queryData = await db.panData
      .where("id")
      .equals(`panData${trackId}`)
      .toArray();
    return queryData[0];
  });

  useEffect(() => {
    if (playbackMode !== "read" || !panData) return;
    for (const value of panData.data.values()) {
      setParam(value.id, value);
    }
  }, [panData, setParam, playbackMode]);

  return null;
}
export default usePanAutomationData;
