-- CreateTable
CREATE TABLE "SourceSong" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "studio" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "bpm" INTEGER NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "SourceTrack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "songSlug" TEXT NOT NULL,
    "sourceSongId" TEXT,
    CONSTRAINT "SourceTrack_sourceSongId_fkey" FOREIGN KEY ("sourceSongId") REFERENCES "SourceSong" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
