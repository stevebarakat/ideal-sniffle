import { useState, type ReactNode, useEffect } from "react";
import { MixerMachineContext } from "~/context/MixerMachineContext";
import { CloseButton } from "@/components/Buttons";
import { Rnd as FxPanel } from "react-rnd";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~/db";

type PanelProps = {
  children: ReactNode;
  trackId: number;
};

export default function TrackPanel({ children, trackId }: PanelProps) {
  const { send } = MixerMachineContext.useActorRef();
  const currentTracks = useLiveQuery(
    async () => await db.currentTracks.toArray()
  );

  const [panelPosition, setPanelPosition] = useState(
    currentTracks && currentTracks[trackId].panelPosition
  );

  const [panelSize, setPanelSize] = useState(
    currentTracks && currentTracks[trackId].panelSize
  );

  useEffect(() => {
    const getCurrentTracks = new Promise((resolve) => resolve(currentTracks));
    getCurrentTracks.then((value) => {
      setPanelPosition(value[trackId].panelPosition);
      setPanelSize(value[trackId].panelSize);
    });
  }, [currentTracks, trackId]);

  function handleResize(ref: HTMLElement) {
    setPanelSize({
      width: ref.style.width,
      height: "auto",
    });
    if (!currentTracks) return;
    (async () => {
      await db.currentTracks
        .where("path")
        .equals(currentTracks[trackId].path)
        .modify({
          panelSize: {
            width: ref.style.width,
            height: "auto",
          },
        });
    })();
  }

  function handleMove(d: { x: number; y: number }) {
    setPanelPosition({ x: d.x, y: d.y });
    if (!currentTracks) return;
    (async () => {
      await db.currentTracks
        .where("path")
        .equals(currentTracks[trackId].path)
        .modify({ panelPosition: { x: d.x, y: d.y } });
    })();
  }

  async function handleClick() {
    if (!currentTracks) return;
    await db.currentTracks
      .where("path")
      .equals(currentTracks[trackId].path)
      .modify({ panelActive: !currentTracks[trackId].panelActive });
  }

  console.log("panelSize", panelSize);

  return (
    <FxPanel
      className="fx-panel"
      position={panelPosition}
      onDragStop={(_, d) => handleMove(d)}
      size={panelSize}
      minWidth="200px"
      onResizeStop={(_, __, ref) => {
        handleResize(ref);
      }}
      cancel="input"
    >
      <CloseButton onClick={handleClick}>X</CloseButton>
      {children}
    </FxPanel>
  );
}
