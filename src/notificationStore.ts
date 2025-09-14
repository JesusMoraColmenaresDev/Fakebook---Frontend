import { create } from "zustand";
import type { Notification } from "./types";

interface NotificationState {
    notifications: Notification[];
    hasBeenFetched: boolean; // Para saber si ya se hizo la carga inicial
    setNotifications: (notifications: Notification[]) => void;
    addNotification: (notification: Notification) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  hasBeenFetched: false,
  setNotifications: (notifications) => set({ notifications, hasBeenFetched: true }),
  addNotification: (notification) => set((state) => ({
    // Añade la nueva notificación al principio de la lista para que aparezca primero.
    notifications: [notification, ...state.notifications]
  })),
}));
