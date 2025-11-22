import { useVideoPlayer, VideoView } from "expo-video";
import { forwardRef, useImperativeHandle } from "react";
import { View } from "react-native";

type Props = {
  uri: string;
  height?: number;
};

const VideoPlayer = forwardRef<any, Props>(({ uri, height = 260 }, ref) => {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = false;
  });

  useImperativeHandle(ref, () => ({
    seekTo: (seconds: number) => {
      player.currentTime = seconds;
    },
    play: () => player.play(),
    pause: () => player.pause(),
  }));

  return (
    <View
      className="w-full bg-black rounded-xl overflow-hidden mb-4"
      style={{ height }}
    >
      <VideoView
        player={player}
        style={{ width: "100%", height: "100%" }}
        nativeControls
        contentFit="contain"
      />
    </View>
  );
});

export default VideoPlayer;
