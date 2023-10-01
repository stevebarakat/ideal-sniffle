import { roxanne } from "@/assets/songs";
import { defaultTrackData } from "@/assets/songs/defaultData";

export function setSourceSong() {
  const sourceSongString = window.localStorage.getItem("sourceSong");
  const sourceSong = sourceSongString && JSON.parse(sourceSongString);
  if (!sourceSong) {
    localStorage.setItem("sourceSong", JSON.stringify(roxanne));
    setCurrentMain();
    setCurrentTracks();
    window.location.reload();
  }
}

function setCurrentMain() {
  const currentMain = localStorage.getItem("currentMain");
  if (!currentMain) {
    localStorage.setItem(
      "currentMain",
      JSON.stringify({
        volume: -32,
      })
    );
  }
}

function setCurrentTracks() {
  const sourceSongString = window.localStorage.getItem("sourceSong");
  const sourceSong = sourceSongString && JSON.parse(sourceSongString);
  const currentTracksString = window.localStorage.getItem("currentTracks");
  const currentTracks = currentTracksString && JSON.parse(currentTracksString);
  // const sourceSong = localStorageGet("sourceSong") || roxanne;
  // const currentTracks = localStorageGet("currentTracks");

  if (!currentTracks) {
    const defaultCurrentTracks = sourceSong.tracks.map(
      (track: SourceTrack) => ({
        id: track.id,
        name: track.name,
        path: track.path,
        ...defaultTrackData,
      })
    );
    localStorage.setItem("currentTracks", JSON.stringify(defaultCurrentTracks));
  }
}
