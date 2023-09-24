import { useState, useEffect, useRef } from "react";
import { loaded, Channel, Player, Transport as t } from "tone";

type Props = {
  tracks: SourceTrack[];
};

function useTracks({ tracks }: Props) {
  const channels = useRef<Channel[] | []>([]);
  const players = useRef<Player[] | []>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    tracks?.forEach((track) => {
      channels.current = [...channels.current, new Channel().toDestination()];
      players.current = [...players.current, new Player(track.path)];
    });

    players.current?.forEach((player, i) => {
      channels.current && player.connect(channels.current[i]).sync().start(0);
    });

    return () => {
      t.stop();
      players.current?.forEach((player, i) => {
        player?.dispose();
        channels.current && channels.current[i].dispose();
      });
      players.current = [];
      channels.current = [];
    };
  }, [tracks]);

  useEffect(() => {
    loaded().then(() => setIsLoaded(true));
  }, [setIsLoaded]);

  return { channels: channels.current, isLoading: !isLoaded };
}

export default useTracks;
