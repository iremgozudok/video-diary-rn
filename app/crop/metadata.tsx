import { MetadataForm } from "@/components/MetadataForm";
import { metadataSchema } from "@/validation/metadataSchema";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Metadata() {
  const { uri, start, end } = useLocalSearchParams<{
    uri: string;
    start: string;
    end: string;
  }>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
  }>({});

  const handleSubmit = () => {
    const result = metadataSchema.safeParse({ name, description });

    if (!result.success) {
      const formatted: any = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        formatted[field] = issue.message;
      });

      setErrors(formatted);
      return;
    }

    router.push({
      pathname: "/crop/processing",
      params: {
        uri,
        start,
        end,
        name,
        description,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-[#0E0E10]"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingVertical: 40,
        }}
        className="px-6"
      >
        {/* TITLE */}
        <Text className="text-white text-3xl font-bold text-center mb-10">
          Add Metadata
        </Text>

        {/* FORM CARD */}
        <View className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <MetadataForm
            name={name}
            description={description}
            errors={errors}
            onChangeName={setName}
            onChangeDescription={setDescription}
            onSubmit={handleSubmit}
            submitLabel="Continue"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
