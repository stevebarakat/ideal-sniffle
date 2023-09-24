export const defaultTrackData = {
  // MAIN
  volume: -32,
  volumeMode: "static",
  panMode: "static",
  soloMuteMode: "static",
  pan: 0,
  soloMute: { solo: false, mute: false },

  // FX
  fxNames: [],
  delaySettings: {
    playbackMode: "static",
    bypassed: false,
    mix: 0.5,
    delayTime: 1,
    feedback: 0.5,
  },
  reverbSettings: {
    playbackMode: "static",
    bypassed: false,
    mix: 0.5,
    preDelay: 0.5,
    decay: 0.5,
  },
  pitchShiftSettings: {
    playbackMode: "static",
    bypassed: false,
    mix: 0.5,
    pitch: 5,
  },

  // PANELS
  panelPosition: { x: 0, y: 0 },
  panelActive: false,
  panelSize: { width: "325px", height: "auto" },
};
