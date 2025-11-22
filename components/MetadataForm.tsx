import { Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  name: string;
  description: string;
  errors: { name?: string; description?: string };
  onChangeName: (val: string) => void;
  onChangeDescription: (val: string) => void;
  onSubmit: () => void;
  submitLabel: string;
};

export function MetadataForm({
  name,
  description,
  errors,
  onChangeName,
  onChangeDescription,
  onSubmit,
  submitLabel,
}: Props) {
  return (
    <View className="w-full">
      {/* NAME */}
      <Text className="text-gray-300 mb-2 font-medium">Name</Text>
      <TextInput
        className={`w-full p-3 rounded-xl bg-zinc-800 text-white border ${
          errors.name ? "border-red-500" : "border-zinc-700"
        } mb-1`}
        placeholder="Enter video name"
        placeholderTextColor="#6b7280"
        value={name}
        onChangeText={onChangeName}
      />
      {errors.name && (
        <Text className="text-red-500 text-sm">{errors.name}</Text>
      )}

      {/* DESCRIPTION */}
      <Text className="text-gray-300 mb-2 mt-5 font-medium">Description</Text>
      <TextInput
        className={`w-full p-3 rounded-xl bg-zinc-800 text-white border ${
          errors.description ? "border-red-500" : "border-zinc-700"
        } mb-1`}
        placeholder="Enter description"
        placeholderTextColor="#6b7280"
        multiline
        numberOfLines={4}
        style={{ textAlignVertical: "top" }}
        value={description}
        onChangeText={onChangeDescription}
      />
      {errors.description && (
        <Text className="text-red-500 text-sm mb-3">{errors.description}</Text>
      )}

      {/* SUBMIT BUTTON */}
      <TouchableOpacity
        onPress={onSubmit}
        className="mt-6 py-4 bg-emerald-600 rounded-2xl"
        activeOpacity={0.85}
      >
        <Text className="text-white text-center font-semibold">
          {submitLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
