import VideoPlayer from "@/components/VideoPlayer";
import { useVideoStore } from "@/store/videoStore";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
} from "react-native-reanimated";

export default function VideoDetails() {
  const { id } = useLocalSearchParams();

  const videos = useVideoStore((state) => state.videos);
  const video = videos.find((v) => v.id === id);

  const deleteVideo = useVideoStore((state) => state.deleteVideo);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!video) {
    return (
      <View className="flex-1 bg-[#0E0E10] items-center justify-center">
        <Text className="text-lg font-semibold text-white/80">
          Video not found.
        </Text>
      </View>
    );
  }

  const confirmDelete = () => {
    deleteVideo(video.id);
    setShowDeleteModal(false);
    router.back();
  };

  return (
    <>
      <ScrollView
        className="flex-1 bg-[#0E0E10]"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 40,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ width: "100%", maxWidth: 480 }}>
          {/* VIDEO */}
          <View className="w-full h-64 bg-black rounded-2xl overflow-hidden mb-8">
            <VideoPlayer uri={video.uri} />
          </View>

          {/* TITLE */}
          <Animated.Text
            entering={FadeInDown.duration(500)}
            className="text-[26px] font-bold text-center text-white mb-4"
          >
            {video.name}
          </Animated.Text>

          {/* DESCRIPTION */}
          <Animated.View entering={FadeInUp.duration(500)}>
            <Text className="text-gray-300 text-base leading-6 mb-4 text-center">
              {video.description}
            </Text>
          </Animated.View>

          {/* META */}
          <Animated.View
            entering={FadeInUp.delay(100).duration(500)}
            className="mb-8 items-center"
          >
            <View className="px-3 py-1.5 rounded-xl bg-[#1A1A1D]/80 border border-white/5 backdrop-blur-md">
              <Text className="text-gray-300 text-sm">
                Created: {new Date(video.createdAt).toLocaleString()}
              </Text>
            </View>
          </Animated.View>

          {/* BUTTONS */}
          <Animated.View
            entering={FadeInUp.delay(200).duration(500)}
            className="gap-4"
          >
            <TouchableOpacity
              onPress={() => router.push(`/edit/${video.id}`)}
              activeOpacity={0.85}
              className="py-4 rounded-2xl bg-indigo-600/90 shadow shadow-indigo-900/40"
            >
              <Text className="text-center text-white font-semibold text-base">
                Edit Video
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowDeleteModal(true)}
              activeOpacity={0.85}
              className="py-4 rounded-2xl bg-red-600/90 shadow shadow-red-900/40"
            >
              <Text className="text-center text-white font-semibold text-base">
                Delete Video
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>

      {/* MODAL */}
      <Modal transparent visible={showDeleteModal} animationType="fade">
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <Animated.View
            entering={FadeInUp.duration(300)}
            exiting={FadeOutDown.duration(250)}
            className="w-full rounded-3xl p-6 bg-[#1A1A1D]/95 border border-white/5 backdrop-blur-md"
          >
            <Text className="text-white text-xl font-bold mb-3">
              Delete Video
            </Text>
            <Text className="text-gray-300 text-base leading-6 mb-6">
              Are you sure you want to delete this video?
            </Text>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-2xl bg-white/10"
              >
                <Text className="text-center text-white font-medium">
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmDelete}
                className="flex-1 py-3 rounded-2xl bg-red-600/80 shadow shadow-red-900/40"
              >
                <Text className="text-center text-white font-semibold">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
