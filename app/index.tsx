import VideoPlayer from "@/components/VideoPlayer";
import { useVideoStore, VideoItem } from "@/store/videoStore";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const videos = useVideoStore((state) => state.videos || []);

  const renderItem = ({ item }: { item: VideoItem }) => (
    <Animated.View
      entering={FadeInUp.duration(450)}
      className="mb-6 rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800"
    >
      {/* Video */}
      <View className="w-full bg-black">
        <VideoPlayer uri={item.uri} />
      </View>

      {/* Content */}
      <View className="px-5 py-4 bg-zinc-900">
        <Text className="text-xl font-semibold text-white mb-3 text-center">
          {item.name}
        </Text>

        <TouchableOpacity
          onPress={() => router.push(`/details/${item.id}`)}
          activeOpacity={0.85}
          className="py-3 rounded-xl bg-indigo-600"
        >
          <Text className="text-center text-white font-semibold text-base">
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-black px-4 pt-2">
      {/* TOP BAR */}
      <View className="flex-row justify-between items-center mb-6">
        <Animated.Text
          entering={FadeInDown.duration(500)}
          className="text-2xl font-bold text-white"
        >
          Your Videos
        </Animated.Text>

        <Animated.View entering={ZoomIn.duration(500)}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/crop")}
            className="bg-indigo-600 px-4 py-2 rounded-xl"
          >
            <Text className="text-white font-semibold">+ Add Video</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* EMPTY STATE */}
      {videos.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Animated.Text
            entering={FadeInUp.duration(600)}
            className="text-xl font-semibold text-gray-300 text-center mb-6"
          >
            No videos found
          </Animated.Text>

          <Animated.View entering={ZoomIn.duration(600)}>
            <TouchableOpacity
              onPress={() => router.push("/crop")}
              activeOpacity={0.85}
              className="w-56 flex-row items-center justify-center gap-2 py-4 rounded-xl bg-indigo-600"
            >
              <Text className="text-white text-2xl font-bold mt-[-2px]">+</Text>
              <Text className="text-white font-semibold text-lg">
                Add Your First Video
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      ) : (
        <FlatList
          data={videos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
