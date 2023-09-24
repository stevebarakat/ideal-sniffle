import { v4 as uuid } from "uuid";

export const ninteenOne = {
  title: "1901",
  artist: "Phoenix",
  year: "2009",
  studio: "Motorbass",
  location: "Paris, France",
  slug: "1901",
  bpm: 144,
  start: 3,
  end: 192,
  tracks: [
    {
      id: uuid(),
      name: "Drums L",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/1901/1901_drumsleft.mp3",
    },
    {
      id: uuid(),
      name: "Drums R",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/1901/1901_drumsright.mp3",
    },
    {
      id: uuid(),
      name: "Triggers",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/1901/1901_triggers.mp3",
    },
    {
      id: uuid(),
      name: "Bass",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/1901/1901_bass.mp3",
    },
    {
      id: uuid(),
      name: "Keys",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/1901/1901_keys.mp3",
    },
    {
      id: uuid(),
      name: "Gtr 1",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/1901/1901_gtr1.mp3",
    },
    {
      id: uuid(),
      name: "Gtr 2",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/1901/1901_gtr2.mp3",
    },
    {
      id: uuid(),
      name: "Synth 1",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/1901/1901_synth1.mp3",
    },
    {
      id: uuid(),
      name: "Synth 2",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/1901/1901_synth2.mp3",
    },
    {
      id: uuid(),
      name: "Siren",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/1901/1901_siren.mp3",
    },
    {
      id: uuid(),
      name: "Vox FX",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/1901/1901_voxfx.mp3",
    },
    {
      id: uuid(),
      name: "Ld Vox",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/1901/1901_leadvox.mp3",
    },
  ],
};
