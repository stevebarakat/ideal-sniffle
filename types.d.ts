import type {
  FeedbackDelay,
  PitchShift,
  Reverb,
  Volume,
  Channel as ToneChannel,
} from "tone";
import type { Destination as ToneDestination } from "tone/build/esm/core/context/Destination";

declare global {
  type Destination = ToneDestination;
  type Channel = ToneChannel;

  type Fx = Volume | Reverb | FeedbackDelay | PitchShift;

  type TrackFx = {
    nofx: Volume | null;
    reverb: Reverb | null;
    delay: FeedbackDelay | null;
    pitchShift: PitchShift | null;
  };

  type SourceSong = {
    id: string;
    slug: string;
    title: string;
    artist: string;
    year: string;
    studio: string;
    location: string;
    bpm: number;
    start: number;
    end: number;
    tracks: SourceTrack[];
  };

  type SourceTrack = {
    id: string;
    songSlug: string;
    name: string;
    path: string;
  };

  type MainSettings = {
    volume: number;
  };

  type SoloMute = {
    solo: boolean;
    mute: boolean;
  };

  type TrackSettings = {
    id: string;
    name: string;
    path: string;

    // MAIN
    volume: number;
    volumeMode: string;
    pan: number;
    panMode: string;
    soloMute: { solo: boolean; mute: boolean };
    soloMuteMode: string;

    // FX
    fxNames: string[];
    delaySettings: DelaySettings;
    reverbSettings: ReverbSettings;
    pitchShiftSettings: PitchShiftSettings;

    // PANELS
    panelPosition: { x: number; y: number };
    panelSize: { width: string; height: string };
    panelActive: boolean;
  };

  type DelaySettings = {
    playbackMode: string;
    bypassed: boolean;
    mix: number;
    delayTime: number;
    feedback: number;
  };

  type ReverbSettings = {
    playbackMode: string;
    bypassed: boolean;
    mix: number;
    preDelay: number;
    decay: number;
  };

  type PitchShiftSettings = {
    playbackMode: string;
    bypassed: boolean;
    mix: number;
    pitch: number;
  };
}
