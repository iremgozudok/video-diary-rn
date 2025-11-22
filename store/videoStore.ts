import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type VideoItem = {
  id: string;
  uri: string;
  name: string;
  description: string;
  createdAt: number;
};

type VideoStore = {
  videos: VideoItem[];

  addVideo: (video: VideoItem) => void;
  updateVideo: (id: string, data: Partial<VideoItem>) => void;
  deleteVideo: (id: string) => void;
};

export const useVideoStore = create<VideoStore>()(
  persist(
    (set, get) => ({
      videos: [],

      addVideo: (video) => set({ videos: [...get().videos, video] }),

      updateVideo: (id, data) =>
        set({
          videos: get().videos.map((v) =>
            v.id === id ? { ...v, ...data } : v
          ),
        }),

      deleteVideo: (id) =>
        set({
          videos: get().videos.filter((v) => v.id !== id),
        }),
    }),

    {
      name: "video-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
