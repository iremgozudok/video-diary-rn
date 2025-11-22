import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function SelectVideo() {
  const [selectedVideo, setSelectedVideo] = useState<{
    uri: string;
    duration: number;
  } | null>(null);

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const pickVideo = async () => {
    if (!status || status.status !== "granted") {
      const perm = await requestPermission();
      if (perm.status !== "granted") {
        alert("We need permission to access your media library.");
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setSelectedVideo({
        uri: asset.uri,
        duration: asset.duration ?? 0,
      });
    }
  };

  const goNext = () => {
    if (!selectedVideo) return;

    router.push({
      pathname: "/crop/range",
      params: {
        uri: selectedVideo.uri,
        duration: String(selectedVideo.duration),
      },
    });
  };

  return (
    <View className="flex-1 bg-[#0E0E10] px-6 py-10 justify-center items-center">
      {/* PAGE TITLE */}
      <Animated.Text
        entering={FadeInDown.duration(500)}
        className=" text-[26px] font-bold text-white mb-10 text-center"
      >
        Select a Video
      </Animated.Text>

      {/* SELECT BUTTON */}
      <Animated.View entering={FadeInUp.duration(500)}>
        <TouchableOpacity
          onPress={pickVideo}
          activeOpacity={0.85}
          className="w-56 flex-row items-center justify-center gap-2 py-4 rounded-2xl bg-pink-600 shadow-sm"
        >
          <Text className="text-white text-2xl font-bold mt-[-2px]">+</Text>

          <Text className="text-white font-semibold text-lg tracking-wide">
            Select Video
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* SELECTED VIDEO INFO */}
      {selectedVideo && (
        <Animated.View
          entering={FadeInUp.delay(150).duration(500)}
          className="mt-8 items-center"
        >
          <Text className="text-gray-300 font-medium text-base mb-2">
            Selected Video
          </Text>

          <View className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 items-center">
            <Text className="text-gray-400">
              Duration: {(selectedVideo.duration / 1000).toFixed(1)} sec
            </Text>
          </View>
        </Animated.View>
      )}

      {/* CONTINUE BUTTON */}
      {selectedVideo && (
        <Animated.View
          entering={FadeInUp.delay(250).duration(500)}
          className="mt-10 w-full"
        >
          <TouchableOpacity
            onPress={goNext}
            activeOpacity={0.85}
            className="py-4 rounded-2xl bg-pink-600 shadow-sm"
          >
            <Text className="text-center text-white font-semibold text-base tracking-wide">
              Continue
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}
