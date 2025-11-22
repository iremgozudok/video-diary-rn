import VideoPlayer from "@/components/VideoPlayer";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { PanResponder, Text, TouchableOpacity, View } from "react-native";

export default function SelectRange() {
  const { uri, duration } = useLocalSearchParams<{
    uri: string;
    duration: string;
  }>();

  const videoDurationSec = Number(duration) / 1000;
  const SEGMENT = 5;
  const maxStart = videoDurationSec - SEGMENT;

  const [start, setStart] = useState(0);
  const end = start + SEGMENT;

  const barWidth = 300;
  const ratio = barWidth / videoDurationSec;

  const videoRef = useRef<any>(null);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        const moveSec = start + gesture.dx / ratio;

        let newStart = moveSec;
        if (newStart < 0) newStart = 0;
        if (newStart > maxStart) newStart = maxStart;

        setStart(newStart);

        videoRef.current?.seekTo(newStart);
      },
    })
  ).current;

  return (
    <View className="flex-1 bg-[#0E0E10] px-6 py-10 justify-center items-center">
      {/* TITLE */}
      <Text className="text-white text-[24px] font-bold mb-8 text-center">
        Select 5-Second Range
      </Text>

      {/* VIDEO */}
      <VideoPlayer uri={uri!} height={230} ref={videoRef} />

      {/* INFO */}
      <Text className="text-gray-300 text-center text-base mt-6 mb-4 px-5">
        Drag the blue block to choose which 5 seconds you want to crop.
      </Text>

      {/* RANGE BAR */}
      <View className="w-full items-center mt-2">
        <View className="h-3 w-[300px] bg-zinc-800 rounded-full relative overflow-hidden">
          {/* ACTIVE RANGE */}
          <View
            {...panResponder.panHandlers}
            className="absolute h-3 bg-cyan-600 rounded-full"
            style={{
              width: SEGMENT * ratio,
              left: start * ratio,
            }}
          />
        </View>
      </View>

      {/* START & END */}
      <View className="flex-row justify-between w-[300px] mt-4">
        <Text className="text-gray-400">Start: {start.toFixed(1)}s</Text>
        <Text className="text-gray-400">End: {end.toFixed(1)}s</Text>
      </View>

      {/* CONTINUE */}
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/crop/metadata",
            params: {
              uri,
              start: String(start),
              end: String(end),
            },
          })
        }
        activeOpacity={0.85}
        className="w-[300px] bg-cyan-600 py-4 rounded-2xl mt-10"
      >
        <Text className="text-white text-center font-semibold text-base">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
