import { MetadataForm } from "@/components/MetadataForm";
import { useVideoStore } from "@/store/videoStore";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

export default function EditVideo() {
  const { id } = useLocalSearchParams();

  const video = useVideoStore((state) => state.videos.find((v) => v.id === id));

  const updateVideo = useVideoStore((state) => state.updateVideo);

  const [name, setName] = useState(video?.name || "");
  const [description, setDescription] = useState(video?.description || "");

  const errors = {};

  if (!video) {
    return (
      <View className="flex-1 bg-[#0E0E10] items-center justify-center px-5">
        <Text className="text-lg font-semibold text-white/80">
          Video not found.
        </Text>
      </View>
    );
  }

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Title cannot be empty.");
      return;
    }

    updateVideo(video.id, { name, description });
    router.back();
  };

  return (
    <ScrollView
      className="flex-1 bg-[#0E0E10]"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        paddingVertical: 40,
        paddingHorizontal: 24,
      }}
    >
      <View style={{ width: "100%", maxWidth: 480 }}>
        {/* TITLE */}
        <Text className="text-[26px] font-bold mb-8 text-center text-white">
          Edit Video
        </Text>

        {/* FORM */}
        <View className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 mb-10">
          <MetadataForm
            name={name}
            description={description}
            errors={{}}
            onChangeName={setName}
            onChangeDescription={setDescription}
            onSubmit={handleSave}
            submitLabel="Save Changes"
          />
        </View>
      </View>
    </ScrollView>
  );
}
