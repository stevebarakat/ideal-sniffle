import type { Song } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export type { Song } from "@prisma/client";

export async function getSongWithTracks(id: Song["id"]) {
  return db.song.findUnique({ where: { id }, include: { tracks: true } });
}

// prisma/seed.ts
export async function seed1() {
  await db.mixData.create({
    data: {
      name: "ubu",
      data: JSON.stringify({
        formatName: "dexie",
        formatVersion: 1,
        data: {
          databaseName: "mixerDb",
          databaseVersion: 1,
          tables: [
            { name: "sourceSong", schema: "++id", rowCount: 1 },
            { name: "currentMain", schema: "++id", rowCount: 1 },
            {
              name: "currentTracks",
              schema:
                "++id,name,path,volume,volumeMode,panMode,soloMuteMode,pan,soloMute,fxNames,delaySettings,reverbSettings,pitchShiftSettings,panelPosition,panelActive,panelSize",
              rowCount: 5,
            },
            { name: "volumeData", schema: "++id", rowCount: 1 },
            { name: "panData", schema: "++id", rowCount: 0 },
            { name: "soloMuteData", schema: "++id", rowCount: 0 },
            { name: "delayData", schema: "++id", rowCount: 0 },
            { name: "reverbData", schema: "++id", rowCount: 0 },
            { name: "pitchShiftData", schema: "++id", rowCount: 0 },
          ],
          data: [
            {
              tableName: "sourceSong",
              inbound: true,
              rows: [
                {
                  id: "sourceSong",
                  data: {
                    id: "l34kj53lk5j35l3jk",
                    title: "Roxanne",
                    artist: "The Police",
                    year: "1978",
                    studio: "Surrey Sound Studios",
                    location: "Leatherhead, Surrey, U.K.",
                    slug: "roxanne",
                    bpm: 92,
                    start: 1,
                    end: 180,
                    tracks: [
                      {
                        id: "2947d4e3-41b6-4172-b165-7bafd0fec748",
                        name: "Drums",
                        path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Drums.mp3",
                      },
                      {
                        id: "38515685-6bc8-4882-a8a2-08518ac8e9e0",
                        name: "Bass",
                        path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Bass.mp3",
                      },
                      {
                        id: "7ca20aed-8776-4b35-93d7-f01b31efdcca",
                        name: "Guitar",
                        path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Guitar.mp3",
                      },
                      {
                        id: "85ae327c-6ab0-405f-9836-508ba692e8d6",
                        name: "Vocals",
                        path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Vocal.mp3",
                      },
                    ],
                  },
                  $types: { "data.tracks": "arrayNonindexKeys" },
                },
              ],
            },
            {
              tableName: "currentMain",
              inbound: true,
              rows: [{ id: "currentMain", data: { volume: -32 } }],
            },
            {
              tableName: "currentTracks",
              inbound: true,
              rows: [
                {
                  name: "Drums",
                  path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Drums.mp3",
                  volume: -32,
                  volumeMode: "static",
                  panMode: "static",
                  soloMuteMode: "static",
                  pan: 0,
                  soloMute: { solo: false, mute: false },
                  fxNames: [],
                  delaySettings: {
                    playbackMode: "static",
                    delayBypass: [false, false],
                    delayMix: [0.5, 0.5],
                    delayTime: [1, 1],
                    delayFeedback: [0.5, 0.5],
                  },
                  reverbSettings: {
                    playbackMode: "static",
                    reverbBypass: [false, false],
                    reverbMix: [0.5, 0.5],
                    reverbPreDelay: [0.5, 0.5],
                    reverbDecay: [0.5, 0.5],
                  },
                  pitchShiftSettings: {
                    playbackMode: "static",
                    pitchShiftBypass: [false, false],
                    pitchShiftMix: [0.5, 0.5],
                    pitchShiftPitch: [5, 5],
                  },
                  panelPosition: { x: 0, y: 0 },
                  panelActive: false,
                  panelSize: { width: "325px", height: "auto" },
                  id: 1,
                  $types: {
                    fxNames: "arrayNonindexKeys",
                    "delaySettings.delayBypass": "arrayNonindexKeys",
                    "delaySettings.delayMix": "arrayNonindexKeys",
                    "delaySettings.delayTime": "arrayNonindexKeys",
                    "delaySettings.delayFeedback": "arrayNonindexKeys",
                    "reverbSettings.reverbBypass": "arrayNonindexKeys",
                    "reverbSettings.reverbMix": "arrayNonindexKeys",
                    "reverbSettings.reverbPreDelay": "arrayNonindexKeys",
                    "reverbSettings.reverbDecay": "arrayNonindexKeys",
                    "pitchShiftSettings.pitchShiftBypass": "arrayNonindexKeys",
                    "pitchShiftSettings.pitchShiftMix": "arrayNonindexKeys",
                    "pitchShiftSettings.pitchShiftPitch": "arrayNonindexKeys",
                  },
                },
                {
                  name: "Bass",
                  path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Bass.mp3",
                  volume: -32,
                  volumeMode: "static",
                  panMode: "static",
                  soloMuteMode: "static",
                  pan: 0,
                  soloMute: { solo: false, mute: false },
                  fxNames: [],
                  delaySettings: {
                    playbackMode: "static",
                    delayBypass: [false, false],
                    delayMix: [0.5, 0.5],
                    delayTime: [1, 1],
                    delayFeedback: [0.5, 0.5],
                  },
                  reverbSettings: {
                    playbackMode: "static",
                    reverbBypass: [false, false],
                    reverbMix: [0.5, 0.5],
                    reverbPreDelay: [0.5, 0.5],
                    reverbDecay: [0.5, 0.5],
                  },
                  pitchShiftSettings: {
                    playbackMode: "static",
                    pitchShiftBypass: [false, false],
                    pitchShiftMix: [0.5, 0.5],
                    pitchShiftPitch: [5, 5],
                  },
                  panelPosition: { x: 0, y: 0 },
                  panelActive: false,
                  panelSize: { width: "325px", height: "auto" },
                  id: 2,
                  $types: {
                    fxNames: "arrayNonindexKeys",
                    "delaySettings.delayBypass": "arrayNonindexKeys",
                    "delaySettings.delayMix": "arrayNonindexKeys",
                    "delaySettings.delayTime": "arrayNonindexKeys",
                    "delaySettings.delayFeedback": "arrayNonindexKeys",
                    "reverbSettings.reverbBypass": "arrayNonindexKeys",
                    "reverbSettings.reverbMix": "arrayNonindexKeys",
                    "reverbSettings.reverbPreDelay": "arrayNonindexKeys",
                    "reverbSettings.reverbDecay": "arrayNonindexKeys",
                    "pitchShiftSettings.pitchShiftBypass": "arrayNonindexKeys",
                    "pitchShiftSettings.pitchShiftMix": "arrayNonindexKeys",
                    "pitchShiftSettings.pitchShiftPitch": "arrayNonindexKeys",
                  },
                },
                {
                  name: "Guitar",
                  path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Guitar.mp3",
                  volume: -32,
                  volumeMode: "read",
                  panMode: "static",
                  soloMuteMode: "static",
                  pan: 0,
                  soloMute: { solo: false, mute: false },
                  fxNames: [],
                  delaySettings: {
                    playbackMode: "static",
                    delayBypass: [false, false],
                    delayMix: [0.5, 0.5],
                    delayTime: [1, 1],
                    delayFeedback: [0.5, 0.5],
                  },
                  reverbSettings: {
                    playbackMode: "static",
                    reverbBypass: [false, false],
                    reverbMix: [0.5, 0.5],
                    reverbPreDelay: [0.5, 0.5],
                    reverbDecay: [0.5, 0.5],
                  },
                  pitchShiftSettings: {
                    playbackMode: "static",
                    pitchShiftBypass: [false, false],
                    pitchShiftMix: [0.5, 0.5],
                    pitchShiftPitch: [5, 5],
                  },
                  panelPosition: { x: 0, y: 0 },
                  panelActive: false,
                  panelSize: { width: "325px", height: "auto" },
                  id: 3,
                  $types: {
                    fxNames: "arrayNonindexKeys",
                    "delaySettings.delayBypass": "arrayNonindexKeys",
                    "delaySettings.delayMix": "arrayNonindexKeys",
                    "delaySettings.delayTime": "arrayNonindexKeys",
                    "delaySettings.delayFeedback": "arrayNonindexKeys",
                    "reverbSettings.reverbBypass": "arrayNonindexKeys",
                    "reverbSettings.reverbMix": "arrayNonindexKeys",
                    "reverbSettings.reverbPreDelay": "arrayNonindexKeys",
                    "reverbSettings.reverbDecay": "arrayNonindexKeys",
                    "pitchShiftSettings.pitchShiftBypass": "arrayNonindexKeys",
                    "pitchShiftSettings.pitchShiftMix": "arrayNonindexKeys",
                    "pitchShiftSettings.pitchShiftPitch": "arrayNonindexKeys",
                  },
                },
                {
                  name: "Vocals",
                  path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Vocal.mp3",
                  volume: -32,
                  volumeMode: "static",
                  panMode: "static",
                  soloMuteMode: "static",
                  pan: 0,
                  soloMute: { solo: false, mute: false },
                  fxNames: [],
                  delaySettings: {
                    playbackMode: "static",
                    delayBypass: [false, false],
                    delayMix: [0.5, 0.5],
                    delayTime: [1, 1],
                    delayFeedback: [0.5, 0.5],
                  },
                  reverbSettings: {
                    playbackMode: "static",
                    reverbBypass: [false, false],
                    reverbMix: [0.5, 0.5],
                    reverbPreDelay: [0.5, 0.5],
                    reverbDecay: [0.5, 0.5],
                  },
                  pitchShiftSettings: {
                    playbackMode: "static",
                    pitchShiftBypass: [false, false],
                    pitchShiftMix: [0.5, 0.5],
                    pitchShiftPitch: [5, 5],
                  },
                  panelPosition: { x: 0, y: 0 },
                  panelActive: false,
                  panelSize: { width: "325px", height: "auto" },
                  id: 4,
                  $types: {
                    fxNames: "arrayNonindexKeys",
                    "delaySettings.delayBypass": "arrayNonindexKeys",
                    "delaySettings.delayMix": "arrayNonindexKeys",
                    "delaySettings.delayTime": "arrayNonindexKeys",
                    "delaySettings.delayFeedback": "arrayNonindexKeys",
                    "reverbSettings.reverbBypass": "arrayNonindexKeys",
                    "reverbSettings.reverbMix": "arrayNonindexKeys",
                    "reverbSettings.reverbPreDelay": "arrayNonindexKeys",
                    "reverbSettings.reverbDecay": "arrayNonindexKeys",
                    "pitchShiftSettings.pitchShiftBypass": "arrayNonindexKeys",
                    "pitchShiftSettings.pitchShiftMix": "arrayNonindexKeys",
                    "pitchShiftSettings.pitchShiftPitch": "arrayNonindexKeys",
                  },
                },
                {
                  id: "currentTracks",
                  data: [
                    {
                      name: "Drums",
                      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Drums.mp3",
                      volume: -32,
                      volumeMode: "static",
                      panMode: "static",
                      soloMuteMode: "static",
                      pan: 0,
                      soloMute: { solo: false, mute: false },
                      fxNames: [],
                      delaySettings: {
                        playbackMode: "static",
                        delayBypass: [false, false],
                        delayMix: [0.5, 0.5],
                        delayTime: [1, 1],
                        delayFeedback: [0.5, 0.5],
                      },
                      reverbSettings: {
                        playbackMode: "static",
                        reverbBypass: [false, false],
                        reverbMix: [0.5, 0.5],
                        reverbPreDelay: [0.5, 0.5],
                        reverbDecay: [0.5, 0.5],
                      },
                      pitchShiftSettings: {
                        playbackMode: "static",
                        pitchShiftBypass: [false, false],
                        pitchShiftMix: [0.5, 0.5],
                        pitchShiftPitch: [5, 5],
                      },
                      panelPosition: { x: 0, y: 0 },
                      panelActive: false,
                      panelSize: { width: "325px", height: "auto" },
                      id: 1,
                    },
                    {
                      name: "Bass",
                      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Bass.mp3",
                      volume: -32,
                      volumeMode: "static",
                      panMode: "static",
                      soloMuteMode: "static",
                      pan: 0,
                      soloMute: { solo: false, mute: false },
                      fxNames: [],
                      delaySettings: {
                        playbackMode: "static",
                        delayBypass: [false, false],
                        delayMix: [0.5, 0.5],
                        delayTime: [1, 1],
                        delayFeedback: [0.5, 0.5],
                      },
                      reverbSettings: {
                        playbackMode: "static",
                        reverbBypass: [false, false],
                        reverbMix: [0.5, 0.5],
                        reverbPreDelay: [0.5, 0.5],
                        reverbDecay: [0.5, 0.5],
                      },
                      pitchShiftSettings: {
                        playbackMode: "static",
                        pitchShiftBypass: [false, false],
                        pitchShiftMix: [0.5, 0.5],
                        pitchShiftPitch: [5, 5],
                      },
                      panelPosition: { x: 0, y: 0 },
                      panelActive: false,
                      panelSize: { width: "325px", height: "auto" },
                      id: 2,
                    },
                    {
                      name: "Guitar",
                      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Guitar.mp3",
                      volume: -32,
                      volumeMode: "read",
                      panMode: "static",
                      soloMuteMode: "static",
                      pan: 0,
                      soloMute: { solo: false, mute: false },
                      fxNames: [],
                      delaySettings: {
                        playbackMode: "static",
                        delayBypass: [false, false],
                        delayMix: [0.5, 0.5],
                        delayTime: [1, 1],
                        delayFeedback: [0.5, 0.5],
                      },
                      reverbSettings: {
                        playbackMode: "static",
                        reverbBypass: [false, false],
                        reverbMix: [0.5, 0.5],
                        reverbPreDelay: [0.5, 0.5],
                        reverbDecay: [0.5, 0.5],
                      },
                      pitchShiftSettings: {
                        playbackMode: "static",
                        pitchShiftBypass: [false, false],
                        pitchShiftMix: [0.5, 0.5],
                        pitchShiftPitch: [5, 5],
                      },
                      panelPosition: { x: 0, y: 0 },
                      panelActive: false,
                      panelSize: { width: "325px", height: "auto" },
                      id: 3,
                    },
                    {
                      name: "Vocals",
                      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Vocal.mp3",
                      volume: -32,
                      volumeMode: "static",
                      panMode: "static",
                      soloMuteMode: "static",
                      pan: 0,
                      soloMute: { solo: false, mute: false },
                      fxNames: [],
                      delaySettings: {
                        playbackMode: "static",
                        delayBypass: [false, false],
                        delayMix: [0.5, 0.5],
                        delayTime: [1, 1],
                        delayFeedback: [0.5, 0.5],
                      },
                      reverbSettings: {
                        playbackMode: "static",
                        reverbBypass: [false, false],
                        reverbMix: [0.5, 0.5],
                        reverbPreDelay: [0.5, 0.5],
                        reverbDecay: [0.5, 0.5],
                      },
                      pitchShiftSettings: {
                        playbackMode: "static",
                        pitchShiftBypass: [false, false],
                        pitchShiftMix: [0.5, 0.5],
                        pitchShiftPitch: [5, 5],
                      },
                      panelPosition: { x: 0, y: 0 },
                      panelActive: false,
                      panelSize: { width: "325px", height: "auto" },
                      id: 4,
                    },
                    {
                      id: "currentTracks",
                      data: [
                        {
                          name: "Drums",
                          path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Drums.mp3",
                          volume: -32,
                          volumeMode: "static",
                          panMode: "static",
                          soloMuteMode: "static",
                          pan: 0,
                          soloMute: { solo: false, mute: false },
                          fxNames: [],
                          delaySettings: {
                            playbackMode: "static",
                            delayBypass: [false, false],
                            delayMix: [0.5, 0.5],
                            delayTime: [1, 1],
                            delayFeedback: [0.5, 0.5],
                          },
                          reverbSettings: {
                            playbackMode: "static",
                            reverbBypass: [false, false],
                            reverbMix: [0.5, 0.5],
                            reverbPreDelay: [0.5, 0.5],
                            reverbDecay: [0.5, 0.5],
                          },
                          pitchShiftSettings: {
                            playbackMode: "static",
                            pitchShiftBypass: [false, false],
                            pitchShiftMix: [0.5, 0.5],
                            pitchShiftPitch: [5, 5],
                          },
                          panelPosition: { x: 0, y: 0 },
                          panelActive: false,
                          panelSize: { width: "325px", height: "auto" },
                          id: 1,
                        },
                        {
                          name: "Bass",
                          path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Bass.mp3",
                          volume: -32,
                          volumeMode: "static",
                          panMode: "static",
                          soloMuteMode: "static",
                          pan: 0,
                          soloMute: { solo: false, mute: false },
                          fxNames: [],
                          delaySettings: {
                            playbackMode: "static",
                            delayBypass: [false, false],
                            delayMix: [0.5, 0.5],
                            delayTime: [1, 1],
                            delayFeedback: [0.5, 0.5],
                          },
                          reverbSettings: {
                            playbackMode: "static",
                            reverbBypass: [false, false],
                            reverbMix: [0.5, 0.5],
                            reverbPreDelay: [0.5, 0.5],
                            reverbDecay: [0.5, 0.5],
                          },
                          pitchShiftSettings: {
                            playbackMode: "static",
                            pitchShiftBypass: [false, false],
                            pitchShiftMix: [0.5, 0.5],
                            pitchShiftPitch: [5, 5],
                          },
                          panelPosition: { x: 0, y: 0 },
                          panelActive: false,
                          panelSize: { width: "325px", height: "auto" },
                          id: 2,
                        },
                        {
                          name: "Guitar",
                          path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Guitar.mp3",
                          volume: -32,
                          volumeMode: "write",
                          panMode: "static",
                          soloMuteMode: "static",
                          pan: 0,
                          soloMute: { solo: false, mute: false },
                          fxNames: [],
                          delaySettings: {
                            playbackMode: "static",
                            delayBypass: [false, false],
                            delayMix: [0.5, 0.5],
                            delayTime: [1, 1],
                            delayFeedback: [0.5, 0.5],
                          },
                          reverbSettings: {
                            playbackMode: "static",
                            reverbBypass: [false, false],
                            reverbMix: [0.5, 0.5],
                            reverbPreDelay: [0.5, 0.5],
                            reverbDecay: [0.5, 0.5],
                          },
                          pitchShiftSettings: {
                            playbackMode: "static",
                            pitchShiftBypass: [false, false],
                            pitchShiftMix: [0.5, 0.5],
                            pitchShiftPitch: [5, 5],
                          },
                          panelPosition: { x: 0, y: 0 },
                          panelActive: false,
                          panelSize: { width: "325px", height: "auto" },
                          id: 3,
                        },
                        {
                          name: "Vocals",
                          path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Vocal.mp3",
                          volume: -32,
                          volumeMode: "static",
                          panMode: "static",
                          soloMuteMode: "static",
                          pan: 0,
                          soloMute: { solo: false, mute: false },
                          fxNames: [],
                          delaySettings: {
                            playbackMode: "static",
                            delayBypass: [false, false],
                            delayMix: [0.5, 0.5],
                            delayTime: [1, 1],
                            delayFeedback: [0.5, 0.5],
                          },
                          reverbSettings: {
                            playbackMode: "static",
                            reverbBypass: [false, false],
                            reverbMix: [0.5, 0.5],
                            reverbPreDelay: [0.5, 0.5],
                            reverbDecay: [0.5, 0.5],
                          },
                          pitchShiftSettings: {
                            playbackMode: "static",
                            pitchShiftBypass: [false, false],
                            pitchShiftMix: [0.5, 0.5],
                            pitchShiftPitch: [5, 5],
                          },
                          panelPosition: { x: 0, y: 0 },
                          panelActive: false,
                          panelSize: { width: "325px", height: "auto" },
                          id: 4,
                        },
                        {
                          id: "currentTracks",
                          data: [
                            {
                              name: "Drums",
                              path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Drums.mp3",
                              volume: -32,
                              volumeMode: "static",
                              panMode: "static",
                              soloMuteMode: "static",
                              pan: 0,
                              soloMute: { solo: false, mute: false },
                              fxNames: [],
                              delaySettings: {
                                playbackMode: "static",
                                delayBypass: [false, false],
                                delayMix: [0.5, 0.5],
                                delayTime: [1, 1],
                                delayFeedback: [0.5, 0.5],
                              },
                              reverbSettings: {
                                playbackMode: "static",
                                reverbBypass: [false, false],
                                reverbMix: [0.5, 0.5],
                                reverbPreDelay: [0.5, 0.5],
                                reverbDecay: [0.5, 0.5],
                              },
                              pitchShiftSettings: {
                                playbackMode: "static",
                                pitchShiftBypass: [false, false],
                                pitchShiftMix: [0.5, 0.5],
                                pitchShiftPitch: [5, 5],
                              },
                              panelPosition: { x: 0, y: 0 },
                              panelActive: false,
                              panelSize: { width: "325px", height: "auto" },
                              id: 1,
                            },
                            {
                              name: "Bass",
                              path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Bass.mp3",
                              volume: -32,
                              volumeMode: "static",
                              panMode: "static",
                              soloMuteMode: "static",
                              pan: 0,
                              soloMute: { solo: false, mute: false },
                              fxNames: [],
                              delaySettings: {
                                playbackMode: "static",
                                delayBypass: [false, false],
                                delayMix: [0.5, 0.5],
                                delayTime: [1, 1],
                                delayFeedback: [0.5, 0.5],
                              },
                              reverbSettings: {
                                playbackMode: "static",
                                reverbBypass: [false, false],
                                reverbMix: [0.5, 0.5],
                                reverbPreDelay: [0.5, 0.5],
                                reverbDecay: [0.5, 0.5],
                              },
                              pitchShiftSettings: {
                                playbackMode: "static",
                                pitchShiftBypass: [false, false],
                                pitchShiftMix: [0.5, 0.5],
                                pitchShiftPitch: [5, 5],
                              },
                              panelPosition: { x: 0, y: 0 },
                              panelActive: false,
                              panelSize: { width: "325px", height: "auto" },
                              id: 2,
                            },
                            {
                              name: "Guitar",
                              path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Guitar.mp3",
                              volume: -32,
                              volumeMode: "static",
                              panMode: "static",
                              soloMuteMode: "static",
                              pan: 0,
                              soloMute: { solo: false, mute: false },
                              fxNames: [],
                              delaySettings: {
                                playbackMode: "static",
                                delayBypass: [false, false],
                                delayMix: [0.5, 0.5],
                                delayTime: [1, 1],
                                delayFeedback: [0.5, 0.5],
                              },
                              reverbSettings: {
                                playbackMode: "static",
                                reverbBypass: [false, false],
                                reverbMix: [0.5, 0.5],
                                reverbPreDelay: [0.5, 0.5],
                                reverbDecay: [0.5, 0.5],
                              },
                              pitchShiftSettings: {
                                playbackMode: "static",
                                pitchShiftBypass: [false, false],
                                pitchShiftMix: [0.5, 0.5],
                                pitchShiftPitch: [5, 5],
                              },
                              panelPosition: { x: 0, y: 0 },
                              panelActive: false,
                              panelSize: { width: "325px", height: "auto" },
                              id: 3,
                            },
                            {
                              name: "Vocals",
                              path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Vocal.mp3",
                              volume: -32,
                              volumeMode: "static",
                              panMode: "static",
                              soloMuteMode: "static",
                              pan: 0,
                              soloMute: { solo: false, mute: false },
                              fxNames: [],
                              delaySettings: {
                                playbackMode: "static",
                                delayBypass: [false, false],
                                delayMix: [0.5, 0.5],
                                delayTime: [1, 1],
                                delayFeedback: [0.5, 0.5],
                              },
                              reverbSettings: {
                                playbackMode: "static",
                                reverbBypass: [false, false],
                                reverbMix: [0.5, 0.5],
                                reverbPreDelay: [0.5, 0.5],
                                reverbDecay: [0.5, 0.5],
                              },
                              pitchShiftSettings: {
                                playbackMode: "static",
                                pitchShiftBypass: [false, false],
                                pitchShiftMix: [0.5, 0.5],
                                pitchShiftPitch: [5, 5],
                              },
                              panelPosition: { x: 0, y: 0 },
                              panelActive: false,
                              panelSize: { width: "325px", height: "auto" },
                              id: 4,
                            },
                            {
                              id: "currentTracks",
                              data: [
                                {
                                  name: "Drums",
                                  path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Drums.mp3",
                                  volume: -32,
                                  volumeMode: "static",
                                  panMode: "static",
                                  soloMuteMode: "static",
                                  pan: 0,
                                  soloMute: { solo: false, mute: false },
                                  fxNames: [],
                                  delaySettings: {
                                    playbackMode: "static",
                                    delayBypass: [false, false],
                                    delayMix: [0.5, 0.5],
                                    delayTime: [1, 1],
                                    delayFeedback: [0.5, 0.5],
                                  },
                                  reverbSettings: {
                                    playbackMode: "static",
                                    reverbBypass: [false, false],
                                    reverbMix: [0.5, 0.5],
                                    reverbPreDelay: [0.5, 0.5],
                                    reverbDecay: [0.5, 0.5],
                                  },
                                  pitchShiftSettings: {
                                    playbackMode: "static",
                                    pitchShiftBypass: [false, false],
                                    pitchShiftMix: [0.5, 0.5],
                                    pitchShiftPitch: [5, 5],
                                  },
                                  panelPosition: { x: 0, y: 0 },
                                  panelActive: false,
                                  panelSize: { width: "325px", height: "auto" },
                                  id: 1,
                                },
                                {
                                  name: "Bass",
                                  path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Bass.mp3",
                                  volume: -32,
                                  volumeMode: "read",
                                  panMode: "static",
                                  soloMuteMode: "static",
                                  pan: 0,
                                  soloMute: { solo: false, mute: false },
                                  fxNames: [],
                                  delaySettings: {
                                    playbackMode: "static",
                                    delayBypass: [false, false],
                                    delayMix: [0.5, 0.5],
                                    delayTime: [1, 1],
                                    delayFeedback: [0.5, 0.5],
                                  },
                                  reverbSettings: {
                                    playbackMode: "static",
                                    reverbBypass: [false, false],
                                    reverbMix: [0.5, 0.5],
                                    reverbPreDelay: [0.5, 0.5],
                                    reverbDecay: [0.5, 0.5],
                                  },
                                  pitchShiftSettings: {
                                    playbackMode: "static",
                                    pitchShiftBypass: [false, false],
                                    pitchShiftMix: [0.5, 0.5],
                                    pitchShiftPitch: [5, 5],
                                  },
                                  panelPosition: { x: 0, y: 0 },
                                  panelActive: false,
                                  panelSize: { width: "325px", height: "auto" },
                                  id: 2,
                                },
                                {
                                  name: "Guitar",
                                  path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Guitar.mp3",
                                  volume: -32,
                                  volumeMode: "static",
                                  panMode: "static",
                                  soloMuteMode: "static",
                                  pan: 0,
                                  soloMute: { solo: false, mute: false },
                                  fxNames: [],
                                  delaySettings: {
                                    playbackMode: "static",
                                    delayBypass: [false, false],
                                    delayMix: [0.5, 0.5],
                                    delayTime: [1, 1],
                                    delayFeedback: [0.5, 0.5],
                                  },
                                  reverbSettings: {
                                    playbackMode: "static",
                                    reverbBypass: [false, false],
                                    reverbMix: [0.5, 0.5],
                                    reverbPreDelay: [0.5, 0.5],
                                    reverbDecay: [0.5, 0.5],
                                  },
                                  pitchShiftSettings: {
                                    playbackMode: "static",
                                    pitchShiftBypass: [false, false],
                                    pitchShiftMix: [0.5, 0.5],
                                    pitchShiftPitch: [5, 5],
                                  },
                                  panelPosition: { x: 0, y: 0 },
                                  panelActive: false,
                                  panelSize: { width: "325px", height: "auto" },
                                  id: 3,
                                },
                                {
                                  name: "Vocals",
                                  path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Vocal.mp3",
                                  volume: -32,
                                  volumeMode: "static",
                                  panMode: "static",
                                  soloMuteMode: "static",
                                  pan: 0,
                                  soloMute: { solo: false, mute: false },
                                  fxNames: [],
                                  delaySettings: {
                                    playbackMode: "static",
                                    delayBypass: [false, false],
                                    delayMix: [0.5, 0.5],
                                    delayTime: [1, 1],
                                    delayFeedback: [0.5, 0.5],
                                  },
                                  reverbSettings: {
                                    playbackMode: "static",
                                    reverbBypass: [false, false],
                                    reverbMix: [0.5, 0.5],
                                    reverbPreDelay: [0.5, 0.5],
                                    reverbDecay: [0.5, 0.5],
                                  },
                                  pitchShiftSettings: {
                                    playbackMode: "static",
                                    pitchShiftBypass: [false, false],
                                    pitchShiftMix: [0.5, 0.5],
                                    pitchShiftPitch: [5, 5],
                                  },
                                  panelPosition: { x: 0, y: 0 },
                                  panelActive: false,
                                  panelSize: { width: "325px", height: "auto" },
                                  id: 4,
                                },
                                {
                                  id: "currentTracks",
                                  data: [
                                    {
                                      name: "Drums",
                                      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Drums.mp3",
                                      volume: -32,
                                      volumeMode: "static",
                                      panMode: "static",
                                      soloMuteMode: "static",
                                      pan: 0,
                                      soloMute: { solo: false, mute: false },
                                      fxNames: [],
                                      delaySettings: {
                                        playbackMode: "static",
                                        delayBypass: [false, false],
                                        delayMix: [0.5, 0.5],
                                        delayTime: [1, 1],
                                        delayFeedback: [0.5, 0.5],
                                      },
                                      reverbSettings: {
                                        playbackMode: "static",
                                        reverbBypass: [false, false],
                                        reverbMix: [0.5, 0.5],
                                        reverbPreDelay: [0.5, 0.5],
                                        reverbDecay: [0.5, 0.5],
                                      },
                                      pitchShiftSettings: {
                                        playbackMode: "static",
                                        pitchShiftBypass: [false, false],
                                        pitchShiftMix: [0.5, 0.5],
                                        pitchShiftPitch: [5, 5],
                                      },
                                      panelPosition: { x: 0, y: 0 },
                                      panelActive: false,
                                      panelSize: {
                                        width: "325px",
                                        height: "auto",
                                      },
                                      id: 1,
                                    },
                                    {
                                      name: "Bass",
                                      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Bass.mp3",
                                      volume: -32,
                                      volumeMode: "write",
                                      panMode: "static",
                                      soloMuteMode: "static",
                                      pan: 0,
                                      soloMute: { solo: false, mute: false },
                                      fxNames: [],
                                      delaySettings: {
                                        playbackMode: "static",
                                        delayBypass: [false, false],
                                        delayMix: [0.5, 0.5],
                                        delayTime: [1, 1],
                                        delayFeedback: [0.5, 0.5],
                                      },
                                      reverbSettings: {
                                        playbackMode: "static",
                                        reverbBypass: [false, false],
                                        reverbMix: [0.5, 0.5],
                                        reverbPreDelay: [0.5, 0.5],
                                        reverbDecay: [0.5, 0.5],
                                      },
                                      pitchShiftSettings: {
                                        playbackMode: "static",
                                        pitchShiftBypass: [false, false],
                                        pitchShiftMix: [0.5, 0.5],
                                        pitchShiftPitch: [5, 5],
                                      },
                                      panelPosition: { x: 0, y: 0 },
                                      panelActive: false,
                                      panelSize: {
                                        width: "325px",
                                        height: "auto",
                                      },
                                      id: 2,
                                    },
                                    {
                                      name: "Guitar",
                                      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Guitar.mp3",
                                      volume: -32,
                                      volumeMode: "static",
                                      panMode: "static",
                                      soloMuteMode: "static",
                                      pan: 0,
                                      soloMute: { solo: false, mute: false },
                                      fxNames: [],
                                      delaySettings: {
                                        playbackMode: "static",
                                        delayBypass: [false, false],
                                        delayMix: [0.5, 0.5],
                                        delayTime: [1, 1],
                                        delayFeedback: [0.5, 0.5],
                                      },
                                      reverbSettings: {
                                        playbackMode: "static",
                                        reverbBypass: [false, false],
                                        reverbMix: [0.5, 0.5],
                                        reverbPreDelay: [0.5, 0.5],
                                        reverbDecay: [0.5, 0.5],
                                      },
                                      pitchShiftSettings: {
                                        playbackMode: "static",
                                        pitchShiftBypass: [false, false],
                                        pitchShiftMix: [0.5, 0.5],
                                        pitchShiftPitch: [5, 5],
                                      },
                                      panelPosition: { x: 0, y: 0 },
                                      panelActive: false,
                                      panelSize: {
                                        width: "325px",
                                        height: "auto",
                                      },
                                      id: 3,
                                    },
                                    {
                                      name: "Vocals",
                                      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Vocal.mp3",
                                      volume: -32,
                                      volumeMode: "static",
                                      panMode: "static",
                                      soloMuteMode: "static",
                                      pan: 0,
                                      soloMute: { solo: false, mute: false },
                                      fxNames: [],
                                      delaySettings: {
                                        playbackMode: "static",
                                        delayBypass: [false, false],
                                        delayMix: [0.5, 0.5],
                                        delayTime: [1, 1],
                                        delayFeedback: [0.5, 0.5],
                                      },
                                      reverbSettings: {
                                        playbackMode: "static",
                                        reverbBypass: [false, false],
                                        reverbMix: [0.5, 0.5],
                                        reverbPreDelay: [0.5, 0.5],
                                        reverbDecay: [0.5, 0.5],
                                      },
                                      pitchShiftSettings: {
                                        playbackMode: "static",
                                        pitchShiftBypass: [false, false],
                                        pitchShiftMix: [0.5, 0.5],
                                        pitchShiftPitch: [5, 5],
                                      },
                                      panelPosition: { x: 0, y: 0 },
                                      panelActive: false,
                                      panelSize: {
                                        width: "325px",
                                        height: "auto",
                                      },
                                      id: 4,
                                    },
                                    {
                                      id: "currentTracks",
                                      data: [
                                        {
                                          name: "Drums",
                                          path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Drums.mp3",
                                          volume: -32,
                                          volumeMode: "static",
                                          panMode: "static",
                                          soloMuteMode: "static",
                                          pan: 0,
                                          soloMute: {
                                            solo: false,
                                            mute: false,
                                          },
                                          fxNames: [],
                                          delaySettings: {
                                            playbackMode: "static",
                                            delayBypass: [false, false],
                                            delayMix: [0.5, 0.5],
                                            delayTime: [1, 1],
                                            delayFeedback: [0.5, 0.5],
                                          },
                                          reverbSettings: {
                                            playbackMode: "static",
                                            reverbBypass: [false, false],
                                            reverbMix: [0.5, 0.5],
                                            reverbPreDelay: [0.5, 0.5],
                                            reverbDecay: [0.5, 0.5],
                                          },
                                          pitchShiftSettings: {
                                            playbackMode: "static",
                                            pitchShiftBypass: [false, false],
                                            pitchShiftMix: [0.5, 0.5],
                                            pitchShiftPitch: [5, 5],
                                          },
                                          panelPosition: { x: 0, y: 0 },
                                          panelActive: false,
                                          panelSize: {
                                            width: "325px",
                                            height: "auto",
                                          },
                                          id: 1,
                                        },
                                        {
                                          name: "Bass",
                                          path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Bass.mp3",
                                          volume: -32,
                                          volumeMode: "read",
                                          panMode: "static",
                                          soloMuteMode: "static",
                                          pan: 0,
                                          soloMute: {
                                            solo: false,
                                            mute: false,
                                          },
                                          fxNames: [],
                                          delaySettings: {
                                            playbackMode: "static",
                                            delayBypass: [false, false],
                                            delayMix: [0.5, 0.5],
                                            delayTime: [1, 1],
                                            delayFeedback: [0.5, 0.5],
                                          },
                                          reverbSettings: {
                                            playbackMode: "static",
                                            reverbBypass: [false, false],
                                            reverbMix: [0.5, 0.5],
                                            reverbPreDelay: [0.5, 0.5],
                                            reverbDecay: [0.5, 0.5],
                                          },
                                          pitchShiftSettings: {
                                            playbackMode: "static",
                                            pitchShiftBypass: [false, false],
                                            pitchShiftMix: [0.5, 0.5],
                                            pitchShiftPitch: [5, 5],
                                          },
                                          panelPosition: { x: 0, y: 0 },
                                          panelActive: false,
                                          panelSize: {
                                            width: "325px",
                                            height: "auto",
                                          },
                                          id: 2,
                                        },
                                        {
                                          name: "Guitar",
                                          path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Guitar.mp3",
                                          volume: -32,
                                          volumeMode: "static",
                                          panMode: "static",
                                          soloMuteMode: "static",
                                          pan: 0,
                                          soloMute: {
                                            solo: false,
                                            mute: false,
                                          },
                                          fxNames: [],
                                          delaySettings: {
                                            playbackMode: "static",
                                            delayBypass: [false, false],
                                            delayMix: [0.5, 0.5],
                                            delayTime: [1, 1],
                                            delayFeedback: [0.5, 0.5],
                                          },
                                          reverbSettings: {
                                            playbackMode: "static",
                                            reverbBypass: [false, false],
                                            reverbMix: [0.5, 0.5],
                                            reverbPreDelay: [0.5, 0.5],
                                            reverbDecay: [0.5, 0.5],
                                          },
                                          pitchShiftSettings: {
                                            playbackMode: "static",
                                            pitchShiftBypass: [false, false],
                                            pitchShiftMix: [0.5, 0.5],
                                            pitchShiftPitch: [5, 5],
                                          },
                                          panelPosition: { x: 0, y: 0 },
                                          panelActive: false,
                                          panelSize: {
                                            width: "325px",
                                            height: "auto",
                                          },
                                          id: 3,
                                        },
                                        {
                                          name: "Vocals",
                                          path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Vocal.mp3",
                                          volume: -32,
                                          volumeMode: "static",
                                          panMode: "static",
                                          soloMuteMode: "static",
                                          pan: 0,
                                          soloMute: {
                                            solo: false,
                                            mute: false,
                                          },
                                          fxNames: [],
                                          delaySettings: {
                                            playbackMode: "static",
                                            delayBypass: [false, false],
                                            delayMix: [0.5, 0.5],
                                            delayTime: [1, 1],
                                            delayFeedback: [0.5, 0.5],
                                          },
                                          reverbSettings: {
                                            playbackMode: "static",
                                            reverbBypass: [false, false],
                                            reverbMix: [0.5, 0.5],
                                            reverbPreDelay: [0.5, 0.5],
                                            reverbDecay: [0.5, 0.5],
                                          },
                                          pitchShiftSettings: {
                                            playbackMode: "static",
                                            pitchShiftBypass: [false, false],
                                            pitchShiftMix: [0.5, 0.5],
                                            pitchShiftPitch: [5, 5],
                                          },
                                          panelPosition: { x: 0, y: 0 },
                                          panelActive: false,
                                          panelSize: {
                                            width: "325px",
                                            height: "auto",
                                          },
                                          id: 4,
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  $types: {
                    data: "arrayNonindexKeys",
                    "data.0.fxNames": "arrayNonindexKeys",
                    "data.0.delaySettings.delayBypass": "arrayNonindexKeys",
                    "data.0.delaySettings.delayMix": "arrayNonindexKeys",
                    "data.0.delaySettings.delayTime": "arrayNonindexKeys",
                    "data.0.delaySettings.delayFeedback": "arrayNonindexKeys",
                    "data.0.reverbSettings.reverbBypass": "arrayNonindexKeys",
                    "data.0.reverbSettings.reverbMix": "arrayNonindexKeys",
                    "data.0.reverbSettings.reverbPreDelay": "arrayNonindexKeys",
                    "data.0.reverbSettings.reverbDecay": "arrayNonindexKeys",
                    "data.0.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.0.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.0.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.1.fxNames": "arrayNonindexKeys",
                    "data.1.delaySettings.delayBypass": "arrayNonindexKeys",
                    "data.1.delaySettings.delayMix": "arrayNonindexKeys",
                    "data.1.delaySettings.delayTime": "arrayNonindexKeys",
                    "data.1.delaySettings.delayFeedback": "arrayNonindexKeys",
                    "data.1.reverbSettings.reverbBypass": "arrayNonindexKeys",
                    "data.1.reverbSettings.reverbMix": "arrayNonindexKeys",
                    "data.1.reverbSettings.reverbPreDelay": "arrayNonindexKeys",
                    "data.1.reverbSettings.reverbDecay": "arrayNonindexKeys",
                    "data.1.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.1.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.1.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.2.fxNames": "arrayNonindexKeys",
                    "data.2.delaySettings.delayBypass": "arrayNonindexKeys",
                    "data.2.delaySettings.delayMix": "arrayNonindexKeys",
                    "data.2.delaySettings.delayTime": "arrayNonindexKeys",
                    "data.2.delaySettings.delayFeedback": "arrayNonindexKeys",
                    "data.2.reverbSettings.reverbBypass": "arrayNonindexKeys",
                    "data.2.reverbSettings.reverbMix": "arrayNonindexKeys",
                    "data.2.reverbSettings.reverbPreDelay": "arrayNonindexKeys",
                    "data.2.reverbSettings.reverbDecay": "arrayNonindexKeys",
                    "data.2.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.2.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.2.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.3.fxNames": "arrayNonindexKeys",
                    "data.3.delaySettings.delayBypass": "arrayNonindexKeys",
                    "data.3.delaySettings.delayMix": "arrayNonindexKeys",
                    "data.3.delaySettings.delayTime": "arrayNonindexKeys",
                    "data.3.delaySettings.delayFeedback": "arrayNonindexKeys",
                    "data.3.reverbSettings.reverbBypass": "arrayNonindexKeys",
                    "data.3.reverbSettings.reverbMix": "arrayNonindexKeys",
                    "data.3.reverbSettings.reverbPreDelay": "arrayNonindexKeys",
                    "data.3.reverbSettings.reverbDecay": "arrayNonindexKeys",
                    "data.3.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.3.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.3.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data": "arrayNonindexKeys",
                    "data.4.data.0.fxNames": "arrayNonindexKeys",
                    "data.4.data.0.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.0.delaySettings.delayMix": "arrayNonindexKeys",
                    "data.4.data.0.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.0.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.0.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.0.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.0.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.0.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.0.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.0.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.0.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.1.fxNames": "arrayNonindexKeys",
                    "data.4.data.1.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.1.delaySettings.delayMix": "arrayNonindexKeys",
                    "data.4.data.1.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.1.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.1.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.1.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.1.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.1.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.1.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.1.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.1.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.2.fxNames": "arrayNonindexKeys",
                    "data.4.data.2.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.2.delaySettings.delayMix": "arrayNonindexKeys",
                    "data.4.data.2.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.2.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.2.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.2.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.2.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.2.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.2.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.2.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.2.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.3.fxNames": "arrayNonindexKeys",
                    "data.4.data.3.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.3.delaySettings.delayMix": "arrayNonindexKeys",
                    "data.4.data.3.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.3.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.3.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.3.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.3.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.3.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.3.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.3.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.3.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data": "arrayNonindexKeys",
                    "data.4.data.4.data.0.fxNames": "arrayNonindexKeys",
                    "data.4.data.4.data.0.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.0.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.0.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.0.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.0.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.0.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.0.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.0.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.0.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.0.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.0.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.1.fxNames": "arrayNonindexKeys",
                    "data.4.data.4.data.1.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.1.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.1.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.1.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.1.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.1.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.1.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.1.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.1.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.1.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.1.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.2.fxNames": "arrayNonindexKeys",
                    "data.4.data.4.data.2.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.2.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.2.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.2.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.2.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.2.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.2.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.2.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.2.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.2.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.2.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.3.fxNames": "arrayNonindexKeys",
                    "data.4.data.4.data.3.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.3.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.3.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.3.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.3.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.3.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.3.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.3.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.3.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.3.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.3.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data": "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.0.fxNames": "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.0.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.0.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.0.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.0.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.0.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.0.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.0.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.0.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.0.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.0.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.0.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.1.fxNames": "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.1.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.1.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.1.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.1.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.1.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.1.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.1.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.1.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.1.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.1.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.1.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.2.fxNames": "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.2.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.2.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.2.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.2.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.2.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.2.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.2.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.2.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.2.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.2.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.2.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.3.fxNames": "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.3.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.3.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.3.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.3.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.3.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.3.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.3.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.3.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.3.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.3.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.3.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data": "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.0.fxNames":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.0.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.0.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.0.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.0.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.0.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.0.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.0.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.0.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.0.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.0.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.0.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.1.fxNames":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.1.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.1.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.1.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.1.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.1.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.1.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.1.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.1.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.1.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.1.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.1.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.2.fxNames":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.2.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.2.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.2.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.2.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.2.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.2.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.2.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.2.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.2.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.2.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.2.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.3.fxNames":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.3.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.3.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.3.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.3.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.3.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.3.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.3.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.3.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.3.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.3.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.3.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.0.fxNames":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.0.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.0.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.0.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.0.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.0.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.0.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.0.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.0.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.0.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.0.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.0.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.1.fxNames":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.1.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.1.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.1.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.1.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.1.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.1.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.1.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.1.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.1.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.1.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.1.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.2.fxNames":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.2.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.2.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.2.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.2.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.2.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.2.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.2.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.2.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.2.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.2.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.2.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.3.fxNames":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.3.delaySettings.delayBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.3.delaySettings.delayMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.3.delaySettings.delayTime":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.3.delaySettings.delayFeedback":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.3.reverbSettings.reverbBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.3.reverbSettings.reverbMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.3.reverbSettings.reverbPreDelay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.3.reverbSettings.reverbDecay":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.3.pitchShiftSettings.pitchShiftBypass":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.3.pitchShiftSettings.pitchShiftMix":
                      "arrayNonindexKeys",
                    "data.4.data.4.data.4.data.4.data.4.data.3.pitchShiftSettings.pitchShiftPitch":
                      "arrayNonindexKeys",
                  },
                },
              ],
            },
            {
              tableName: "volumeData",
              inbound: true,
              rows: [
                {
                  id: "volumeData2",
                  data: [
                    [1.25, { id: 2, time: 1.25, value: -32 }],
                    [1.5, { id: 2, time: 1.5, value: -32 }],
                    [1.75, { id: 2, time: 1.75, value: -32 }],
                    [2, { id: 2, time: 2, value: -32 }],
                    [2.25, { id: 2, time: 2.25, value: -32 }],
                    [2.5, { id: 2, time: 2.5, value: -32 }],
                    [2.75, { id: 2, time: 2.75, value: -32 }],
                    [3, { id: 2, time: 3, value: -32 }],
                    [3.25, { id: 2, time: 3.25, value: -32 }],
                    [3.5, { id: 2, time: 3.5, value: -32 }],
                    [3.75, { id: 2, time: 3.75, value: -32 }],
                    [4, { id: 2, time: 4, value: -32 }],
                    [4.25, { id: 2, time: 4.25, value: -32 }],
                    [4.5, { id: 2, time: 4.5, value: -32 }],
                    [4.75, { id: 2, time: 4.75, value: -32 }],
                    [5, { id: 2, time: 5, value: -32 }],
                    [5.25, { id: 2, time: 5.25, value: -32 }],
                    [5.5, { id: 2, time: 5.5, value: -32 }],
                    [5.75, { id: 2, time: 5.75, value: -32 }],
                    [6.25, { id: 2, time: 6.25, value: -88.7 }],
                    [6.5, { id: 2, time: 6.5, value: -100 }],
                    [7.25, { id: 2, time: 7.25, value: -14.8 }],
                    [8, { id: 2, time: 8, value: -100 }],
                    [9.5, { id: 2, time: 9.5, value: -100 }],
                    [10.25, { id: 2, time: 10.25, value: -17.6 }],
                    [10.5, { id: 2, time: 10.5, value: -19.7 }],
                    [10.75, { id: 2, time: 10.75, value: -19.7 }],
                    [11, { id: 2, time: 11, value: -100 }],
                    [11.25, { id: 2, time: 11.25, value: -100 }],
                    [11.5, { id: 2, time: 11.5, value: -100 }],
                    [11.75, { id: 2, time: 11.75, value: -100 }],
                    [12, { id: 2, time: 12, value: -100 }],
                    [12.75, { id: 2, time: 12.75, value: -23.5 }],
                    [13, { id: 2, time: 13, value: -23.5 }],
                    [13.25, { id: 2, time: 13.25, value: -23.5 }],
                    [13.5, { id: 2, time: 13.5, value: -23.5 }],
                    [13.75, { id: 2, time: 13.75, value: -23.5 }],
                  ],
                  $types: {
                    data: "map",
                    "data.0": "arrayNonindexKeys",
                    "data.1": "arrayNonindexKeys",
                    "data.2": "arrayNonindexKeys",
                    "data.3": "arrayNonindexKeys",
                    "data.4": "arrayNonindexKeys",
                    "data.5": "arrayNonindexKeys",
                    "data.6": "arrayNonindexKeys",
                    "data.7": "arrayNonindexKeys",
                    "data.8": "arrayNonindexKeys",
                    "data.9": "arrayNonindexKeys",
                    "data.10": "arrayNonindexKeys",
                    "data.11": "arrayNonindexKeys",
                    "data.12": "arrayNonindexKeys",
                    "data.13": "arrayNonindexKeys",
                    "data.14": "arrayNonindexKeys",
                    "data.15": "arrayNonindexKeys",
                    "data.16": "arrayNonindexKeys",
                    "data.17": "arrayNonindexKeys",
                    "data.18": "arrayNonindexKeys",
                    "data.19": "arrayNonindexKeys",
                    "data.20": "arrayNonindexKeys",
                    "data.21": "arrayNonindexKeys",
                    "data.22": "arrayNonindexKeys",
                    "data.23": "arrayNonindexKeys",
                    "data.24": "arrayNonindexKeys",
                    "data.25": "arrayNonindexKeys",
                    "data.26": "arrayNonindexKeys",
                    "data.27": "arrayNonindexKeys",
                    "data.28": "arrayNonindexKeys",
                    "data.29": "arrayNonindexKeys",
                    "data.30": "arrayNonindexKeys",
                    "data.31": "arrayNonindexKeys",
                    "data.32": "arrayNonindexKeys",
                    "data.33": "arrayNonindexKeys",
                    "data.34": "arrayNonindexKeys",
                    "data.35": "arrayNonindexKeys",
                    "data.36": "arrayNonindexKeys",
                  },
                },
              ],
            },
            { tableName: "panData", inbound: true, rows: [] },
            { tableName: "soloMuteData", inbound: true, rows: [] },
            { tableName: "delayData", inbound: true, rows: [] },
            { tableName: "reverbData", inbound: true, rows: [] },
            { tableName: "pitchShiftData", inbound: true, rows: [] },
          ],
        },
      }),
    },
  });
}
