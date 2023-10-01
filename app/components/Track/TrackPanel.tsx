import { useState, type ReactNode, useEffect } from "react";
import { CloseButton } from "@/components/Buttons";
import { Rnd as FxPanel } from "react-rnd";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~/db";

type PanelProps = {
  children: ReactNode;
  trackId: number;
};

export default function TrackPanel({ children, trackId }: PanelProps) {
  const currentTracks = JSON.parse(localStorage.getItem("currentTracks")!);

  const [panelPosition, setPanelPosition] = useState(
    currentTracks[trackId].panelPosition
  );

  const [panelSize, setPanelSize] = useState(currentTracks[trackId].panelSize);

  function handleResize(ref: HTMLElement) {
    setPanelSize({
      width: ref.style.width,
      height: "auto",
    });
    const currentTracks = JSON.parse(localStorage.getItem("currentTracks")!);
    currentTracks[trackId].panelSize = {
      width: ref.style.width,
      height: "auto",
    };
    localStorage.setItem("currentTracks", JSON.stringify(currentTracks));
  }

  function handleMove(d: { x: number; y: number }) {
    setPanelPosition({ x: d.x, y: d.y });
    const currentTracks = JSON.parse(localStorage.getItem("currentTracks")!);
    currentTracks[trackId].panelPosition = { x: d.x, y: d.y };
    localStorage.setItem("currentTracks", JSON.stringify(currentTracks));
  }

  async function handleClick() {
    if (!currentTracks) return;
    await db.currentTracks
      .where("path")
      .equals(currentTracks[trackId].path)
      .modify({ panelActive: !currentTracks[trackId].panelActive });
  }

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
