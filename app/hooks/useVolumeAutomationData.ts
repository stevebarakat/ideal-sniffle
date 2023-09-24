import { MixerMachineContext } from "@/context/MixerMachineContext";
import { useEffect, useCallback } from "react";
import { Draw, Transport as t } from "tone";
import { roundFourth } from "@/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";

type Props = { trackId: number; channels: Channel[] };

type WriteProps = {
  id: number;
  value: number | string | boolean;
};

function useVolumeAutomationData({ trackId, channels }: Props) {
  const value: number | boolean = MixerMachineContext.useSelector((state) => {
    return state.context.currentTracks[trackId].volume;
  });
  useWrite({ id: trackId, value });
  useRead({ trackId, channels });
  return null;
}

const data = new Map<number, object>();

// !!! --- WRITE --- !!! //
function useWrite({ id, value }: WriteProps) {
  // const playbackMode = MixerMachineContext.useSelector(
  //   (state) => state.context.currentTracks[id].volumeMode
  // );
  const currentTracks = useLiveQuery(() => db.currentTracks.toArray());
  const playbackMode = currentTracks && currentTracks[id]?.volumeMode;

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
function useRead({ trackId }: Props) {
  const { send } = MixerMachineContext.useActorRef();
  // const playbackMode = MixerMachineContext.useSelector(
  //   (state) => state.context.currentTracks[trackId].volumeMode
  // );

  const currentTracks = useLiveQuery(() => db.currentTracks.toArray());
  const playbackMode = currentTracks && currentTracks[trackId]?.volumeMode;

  const setParam = useCallback(
    (
      trackId: number,
      data: {
        time: number;
        value: number;
      }
    ) => {
      t.schedule(() => {
        send({
          type: "SET_TRACK_VOLUME",
          trackId,
          value: data.value,
        });
      }, data.time);
    },
    [send]
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

    console.log("volumeData", volumeData);
    for (const value of volumeData.data.values()) {
      console.log("value", value);
      setParam(value.id, value);
    }
  }, [volumeData, setParam, playbackMode]);

  return null;
}
export default useVolumeAutomationData;
