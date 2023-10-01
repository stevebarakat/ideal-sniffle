import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// prisma/seed.ts
export async function seed2() {
  const song1 = await db.sourceSong.create({
    data: {
      title: "A Day In The Life",
      slug: "a-day-in-the-life",
      artist: "The Beatles",
      year: "1967",
      studio: "Abby Road",
      location: "London, England",
      bpm: 79,
      start: 0,
      end: 267,
    },
  });

  await db.sourceTrack.create({
    data: {
      songSlug: "a-day-in-the-life",
      name: "Bass/Drums",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/aDayInTheLife/bass-drums.mp3",
    },
  });
  await db.sourceTrack.create({
    data: {
      songSlug: "a-day-in-the-life",
      name: "Instruments",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/aDayInTheLife/instruments.mp3",
    },
  });
  await db.sourceTrack.create({
    data: {
      songSlug: "a-day-in-the-life",
      name: "Orchestra",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/aDayInTheLife/orchestra.mp3",
    },
  });
  await db.sourceTrack.create({
    data: {
      songSlug: "a-day-in-the-life",
      name: "Vocals",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/aDayInTheLife/vox.mp3",
    },
  });
}
