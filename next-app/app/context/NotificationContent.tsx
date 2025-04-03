"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Update the interface to include triggerNotification
interface NotificationContextType {
  notifications: string[];
  addNotification: (message: string) => void;
  triggerNotification: () => void;
  getNewNotification: () => boolean;
  disableNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const triggerNotification = () => {
    setHasNewNotification(true); // This can be used to trigger a new notification
  };

  const getNewNotification = () => {
    return hasNewNotification
  };

  const disableNotification = () => {
    setHasNewNotification(false)
  }

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, triggerNotification, getNewNotification, disableNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used within a NotificationProvider");
  return context;
}
