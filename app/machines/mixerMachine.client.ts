import { createMachine, assign } from "xstate";
import { defaultTrackData } from "@/assets/songs/defaultData";
import { produce } from "immer";
import {
  start as initializeAudio,
  getContext as getAudioContext,
  Transport as t,
  type Reverb,
  type FeedbackDelay,
  type PitchShift,
} from "tone";
import { db } from "@/db";
import { roxanne } from "~/assets/songs";
import { localStorageGet, localStorageSet } from "~/utils";

export function setSourceSong() {
  const sourceSong = JSON.parse(localStorage.get("sourceSong"));
  if (!sourceSong) {
    localStorage.set("sourceSong", JSON.stringify(roxanne));
    setCurrentMain();
    setCurrentTracks();
    window.location.reload();
  }
}

function setCurrentMain() {
  const currentMain = localStorageGet("currentMain");
  if (!currentMain) {
    localStorageSet("currentMain", {
      volume: -32,
    });
  }
}

function setCurrentTracks() {
  const sourceSong = localStorageGet("sourceSong") || roxanne;
  const currentTracks = localStorageGet("currentTracks");

  if (!currentTracks) {
    const defaultCurrentTracks = sourceSong.tracks.map(
      (track: SourceTrack) => ({
        id: track.id,
        name: track.name,
        path: track.path,
        ...defaultTrackData,
      })
    );
    localStorageSet("currentTracks", defaultCurrentTracks);
  }
}

setSourceSong();

export type MixerContext = {
  sourceSong: SourceSong;
  currentMain: MainSettings;
  currentTracks: TrackSettings[];
};
type SoloMuteType = { solo: boolean; mute: boolean };

const audioContext = getAudioContext();

const tracks = roxanne.tracks;

const currentTracks = tracks.map((track) => ({
  id: track.id,
  name: track.name,
  path: track.path,
  ...defaultTrackData,
}));

const initialContext: MixerContext = {
  sourceSong: roxanne,
  currentMain: { volume: -32 },
  currentTracks,
};

export const mixerMachine = createMachine(
  {
    id: "mixer",
    initial: "loading",
    tsTypes: {} as import("./mixerMachine.typegen").Typegen0,
    context: initialContext,
    on: {
      LOAD_SONG: { actions: "loadSong" },
      RESET: { actions: "reset", target: "stopped" },
      REWIND: { actions: "rewind" },
      FF: { actions: "fastForward" },
      SET_MAIN_VOLUME: { actions: "setMainVolume" },
      SET_TRACK_VOLUME: { actions: "setTrackVolume" },
      SET_TRACK_PAN: { actions: "setPan" },
      SET_TRACK_SOLOMUTE: { actions: "toggleSoloMute" },
      SET_TRACK_FX_NAMES: { actions: "setTrackFxNames" },
      SET_ACTIVE_TRACK_PANELS: { actions: "setActiveTrackPanels" },
      SET_TRACK_REVERB_BYPASS: { actions: "setTrackReverbBypass" },
      SET_TRACK_REVERB_MIX: { actions: "setTrackReverbMix" },
      SET_TRACK_REVERB_PREDELAY: { actions: "setTrackReverbPreDelay" },
      SET_TRACK_REVERB_DECAY: { actions: "setTrackReverbDecay" },
      SET_TRACK_DELAY_BYPASS: { actions: "setTrackDelayBypass" },
      SET_TRACK_DELAY_MIX: { actions: "setTrackDelayMix" },
      SET_TRACK_DELAY_TIME: { actions: "setTrackDelayTime" },
      SET_TRACK_DELAY_FEEDBACK: { actions: "setTrackDelayFeedback" },
      SET_TRACK_PITCHSHIFT_BYPASS: {
        actions: "setTrackPitchShiftBypass",
      },
      SET_TRACK_PITCHSHIFT_MIX: { actions: "setTrackPitchShiftMix" },
      SET_TRACK_PITCHSHIFT_PITCH: { actions: "setTrackPitchShiftPitch" },
      SET_TRACK_PANEL_SIZE: { actions: "setTrackPanelSize" },
      SET_TRACK_PANEL_POSITON: { actions: "setTrackPanelPosition" },
      SET_PLAYBACK_MODE: { actions: "setPlaybackMode" },
      SET_FX_PLAYBACK_MODE: { actions: "setFxPlaybackMode" },
    },
    states: {
      loading: { on: { LOADED: "stopped" } },
      playing: {
        entry: "play",
        on: {
          PAUSE: { target: "stopped", actions: "pause" },
        },
      },
      stopped: {
        on: {
          PLAY: { target: "playing" },
        },
      },
    },
    schema: {
      context: {} as typeof initialContext,
      events: {} as
        | { type: "LOAD_SONG" }
        | { type: "LOADED" }
        | { type: "PLAY" }
        | { type: "PAUSE" }
        | { type: "REWIND" }
        | { type: "FF" }
        | { type: "RESET" }
        | { type: "SET_MAIN_VOLUME"; value: number }
        | { type: "SET_TRACK_VOLUME"; value: number; trackId: number }
        | { type: "SET_TRACK_PAN"; value: number; trackId: number }
        | { type: "SET_TRACK_SOLOMUTE"; value: SoloMuteType; trackId: number }
        | {
            type: "SET_TRACK_FX_NAMES";
            trackId: number;
            fxId: number;
            action: string;
            channels: Channel[];
            value: string;
          }
        | {
            type: "SET_TRACK_REVERB_BYPASS";
            checked: boolean;
            reverb: Reverb;
            trackId: number;
          }
        | {
            type: "SET_TRACK_REVERB_MIX";
            value: number;
            reverb: Reverb;
            trackId: number;
          }
        | {
            type: "SET_TRACK_REVERB_PREDELAY";
            value: number;
            reverb: Reverb;
            trackId: number;
          }
        | {
            type: "SET_TRACK_REVERB_DECAY";
            value: number;
            reverb: Reverb;
            trackId: number;
          }
        | {
            type: "SET_TRACK_DELAY_BYPASS";
            checked: boolean;
            delay: FeedbackDelay;
            trackId: number;
          }
        | {
            type: "SET_TRACK_DELAY_MIX";
            value: number;
            delay: FeedbackDelay;
            trackId: number;
          }
        | {
            type: "SET_TRACK_DELAY_TIME";
            value: number;
            delay: FeedbackDelay;
            trackId: number;
          }
        | {
            type: "SET_TRACK_DELAY_FEEDBACK";
            value: number;
            delay: FeedbackDelay;
            trackId: number;
          }
        | {
            type: "SET_TRACK_PITCHSHIFT_BYPASS";
            checked: boolean;
            pitchShift: PitchShift;
            trackId: number;
          }
        | {
            type: "SET_TRACK_PITCHSHIFT_MIX";
            value: number;
            pitchShift: PitchShift;
            trackId: number;
          }
        | {
            type: "SET_TRACK_PITCHSHIFT_PITCH";
            value: number;
            pitchShift: PitchShift;
            trackId: number;
          }
        | { type: "SET_ACTIVE_TRACK_PANELS"; trackId: number }
        | {
            type: "SET_TRACK_PANEL_SIZE";
            trackId: number;
            width: string;
          }
        | {
            type: "SET_TRACK_PANEL_POSITON";
            trackId: number;
            x: number;
            y: number;
          }
        | {
            type: "SET_PLAYBACK_MODE";
            value: string;
            param: "volume" | "pan" | "soloMute";
            trackId: number;
          }
        | {
            type: "SET_FX_PLAYBACK_MODE";
            value: string;
            param: "volume" | "pan" | "soloMute";
            trackId: number;
          },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },

  {
    actions: {
      play: () => {
        if (audioContext.state === "suspended") {
          initializeAudio();
          t.start();
        } else {
          t.start();
        }
      },
      pause: () => t.pause(),

      reset: assign((context) => {
        return produce(context, (draft) => {
          const sourceSong = draft.sourceSong;
          t.stop();
          t.seconds = sourceSong.start ?? 0;
        });
      }),

      fastForward: assign((context) => {
        return produce(context, (draft) => {
          const sourceSong = draft.sourceSong;
          t.seconds =
            t.seconds < sourceSong.end - 10
              ? t.seconds + 10
              : (t.seconds = sourceSong.end);
        });
      }),

      rewind: assign((context) => {
        return produce(context, (draft) => {
          const sourceSong = draft.sourceSong;
          t.seconds =
            t.seconds > 10 + sourceSong.start
              ? t.seconds - 10
              : sourceSong.start;
        });
      }),

      loadSong: assign(async (context, { value }: any): any => {
        await db.sourceSong.put({
          id: "sourceSong",
          ...value,
        });
        const currentTracks = value.tracks.map((track: TrackSettings) => ({
          id: crypto.randomUUID(),
          name: track.name,
          path: track.path,
          ...defaultTrackData,
        }));
        context.sourceSong = value;
        context.currentTracks = currentTracks;
        await db.currentTracks.put({
          id: "currentTracks",
          ...currentTracks,
        });
        window.location.reload();
      }),

      setMainVolume: assign((context, { value }) => {
        return produce(context, (draft) => {
          draft.currentMain.volume = value;
        });
      }),

      setTrackVolume: assign((context, { value, trackId }) => {
        return produce(context, (draft) => {
          draft.currentTracks[trackId].volume = value;
        });
      }),

      setPan: assign((context, { value, trackId }) => {
        return produce(context, (draft) => {
          draft.currentTracks[trackId].pan = value;
        });
      }),

      toggleSoloMute: assign((context, { value, trackId }) => {
        return produce(context, (draft) => {
          draft.currentTracks[trackId].soloMute = value;
        });
      }),

      setTrackFxNames: assign(
        async (context, { trackId, fxId, action, channels, value }) => {
          const currentTracks = await db.currentTracks.orderBy("id").toArray();

          if (action === "remove") {
            channels[trackId].disconnect();

            currentTracks[trackId].fxNames.splice(fxId, 1);
            await db.currentTracks.put({ ...currentTracks[trackId] });

            return produce(context, (draft) => {
              draft.currentTracks[trackId].fxNames.splice(fxId, 1);
            });
          } else {
            await db.currentTracks
              .where("path")
              .equals(currentTracks[trackId].path)
              .modify({
                fxNames: [...currentTracks[trackId].fxNames, value].reverse(),
              });
            return produce(context, (draft) => {
              draft.currentTracks[trackId].fxNames[fxId] = value;
            });
          }
        }
      ),

      setTrackReverbBypass: assign((context, { checked, reverb, trackId }) => {
        if (checked) {
          reverb?.disconnect();
        } else {
          reverb?.toDestination();
        }

        return produce(context, (draft) => {
          draft.currentTracks[trackId].reverbSettings.bypassed = checked;
        });
      }),

      setTrackReverbMix: assign((context, { value, reverb, trackId }) => {
        if (reverb) reverb.wet.value = value;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].reverbSettings.mix = value;
        });
      }),

      setTrackReverbPreDelay: assign((context, { value, reverb, trackId }) => {
        if (reverb) reverb.preDelay = value;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].reverbSettings.preDelay = value;
        });
      }),

      setTrackReverbDecay: assign((context, { value, reverb, trackId }) => {
        if (reverb) reverb.decay = value;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].reverbSettings.decay = value;
        });
      }),

      setTrackDelayBypass: assign((context, { checked, delay, trackId }) => {
        if (checked) {
          delay.disconnect();
        } else {
          delay.toDestination();
        }
        return produce(context, (draft) => {
          draft.currentTracks[trackId].delaySettings.bypassed = checked;
        });
      }),

      setTrackDelayMix: assign((context, { value, delay, trackId }) => {
        if (delay) delay.wet.value = value;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].delaySettings.mix = value;
        });
      }),

      setTrackDelayTime: assign((context, { value, delay, trackId }) => {
        if (delay) delay.delayTime.value = value;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].delaySettings.delayTime = value;
        });
      }),

      setTrackDelayFeedback: assign((context, { value, delay, trackId }) => {
        if (delay) delay.feedback.value = value;
        return produce(context, (draft) => {
          draft.currentTracks[trackId].delaySettings.feedback = value;
        });
      }),

      setTrackPitchShiftBypass: assign(
        (context, { checked, pitchShift, trackId }) => {
          if (checked) {
            pitchShift?.disconnect();
          } else {
            pitchShift?.toDestination();
          }
          return produce(context, (draft) => {
            draft.currentTracks[trackId].pitchShiftSettings.bypassed = checked;
          });
        }
      ),

      setTrackPitchShiftMix: assign(
        (context, { value, pitchShift, trackId }) => {
          if (pitchShift) pitchShift.wet.value = value;
          return produce(context, (draft) => {
            draft.currentTracks[trackId].pitchShiftSettings.mix = value;
          });
        }
      ),

      setTrackPitchShiftPitch: assign(
        (context, { value, pitchShift, trackId }) => {
          if (pitchShift) pitchShift.pitch = value;
          return produce(context, (draft) => {
            draft.currentTracks[trackId].pitchShiftSettings.pitch = value;
          });
        }
      ),

      setActiveTrackPanels: assign((context, { trackId }) => {
        return produce(context, (draft) => {
          draft.currentTracks[trackId].panelActive =
            !draft.currentTracks[trackId].panelActive;
        });
      }),

      setTrackPanelSize: assign((context, { width, trackId }) => {
        return produce(context, (draft) => {
          draft.currentTracks[trackId].panelSize.width = width;
        });
      }),

      setTrackPanelPosition: assign((context, { x, y, trackId }) => {
        return produce(context, (draft) => {
          draft.currentTracks[trackId].panelPosition = { x, y };
        });
      }),

      setPlaybackMode: assign(async (context, { value, param, trackId }) => {
        await db.currentTracks
          .where("id")
          .equals(trackId + 1)
          .modify({ volumeMode: value });

        return produce(context, (draft) => {
          draft.currentTracks[trackId][`${param}Mode`] = value;
        });
      }),

      setFxPlaybackMode: assign(async (context, { value, param, trackId }) => {
        await db.currentTracks
          .where("id")
          .equals(trackId + 1)
          .modify({ fxPlaybackMode: [value] });

        return produce(context, (draft) => {
          draft.currentTracks[trackId][`${param}Settings`].playbackMode = value;
        });
      }),
    },
  }
);
