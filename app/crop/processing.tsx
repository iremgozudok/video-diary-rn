import { useVideoStore } from "@/store/videoStore";
import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { trimVideo } from "expo-trim-video";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Processing() {
  const { uri, start, end, name, description } = useLocalSearchParams<{
    uri: string;
    start: string;
    end: string;
    name: string;
    description: string;
  }>();

  const addVideo = useVideoStore((s) => s.addVideo);

  const trimMutation = useMutation({
    mutationFn: async () => {
      const result = await trimVideo({
        uri: uri!,
        start: Number(start),
        end: Number(end),
      });

      return result.uri;
    },

    onSuccess: (trimmedUri) => {
      addVideo({
        id: Date.now().toString(),
        name: name!,
        description: description!,
        uri: trimmedUri,
        createdAt: Date.now(),
      });

      router.replace("/");
    },

    onError: (e) => {
      console.error("TRIM ERROR:", e);
      alert("Video trimming failed.");
      router.back();
    },
  });

  useEffect(() => {
    trimMutation.mutate();
  }, []);

  return (
    <View className="flex-1 bg-[#0E0E10] items-center justify-center px-6">
      {/* LOADING ICON */}
      <View className="mb-6">
        <ActivityIndicator size="large" color="#10b981" />
      </View>

      {/* TEXT */}
      <Text className="text-xl font-semibold text-white mb-2">
        Processing your video...
      </Text>

      <Text className="text-gray-400 text-center text-base px-4">
        This may take a few seconds. Please wait while we trim your clip.
      </Text>
    </View>
  );
}