import type { NOTIFY_CONFIG, NOTIFICATION_TYPE } from "$lib/types";
import type { Writable } from "svelte/store";

import { writable } from "svelte/store";
import { getRounded, generateToken } from "$lib/functions";

export const notifications: Writable<any> = writable([]);

export let notify = (
  msg: string,
  type: NOTIFICATION_TYPE = "error",
  config: NOTIFY_CONFIG = { rounded: "md", variant: "card" },
): string => {
  let C: any = { animate: true, removeOnClick: true, removeAfter: 5000 };
  Object.assign(C, { id: generateToken() }, config);
  notifications.update((all) => [...all, { msg, type, CONFIG: C }]);
  if (C.removeAfter !== 0) {
    setTimeout(() => {
      removeNotification(C.id);
    }, C.removeAfter);
  }
  return C.id;
};

export let removeNotification = (id: string) => {
  notifications.update((all) =>
    all.filter((toast: any) => toast.CONFIG.id !== id),
  );
};

export let getClasses = (config: NOTIFY_CONFIG, type: string): string => {
  return (
    "notification " +
    getRounded(config.rounded) +
    " px-4 py-3 shadow-2xl shadow-black/50 cursor-pointer " +
    (config.variant == "borderBottom"
      ? "notification-border-bottom "
      : config.variant == "borderTop"
        ? "notification-border-top "
        : config.variant == "borderStart"
          ? "notification-border-top "
          : config.variant == "cardLight"
            ? "notification-card-light "
            : "notification-card ") +
    getTheme(config?.variant, type)
  );
};

let getTheme = (variant: string, type: string): string => {
  const themes: any = {
    card: {
      error: "bg-red-600 text-red-50",
      info: "bg-sky-600 text-sky-50",
      success: "bg-green-600 text-green-50",
      warning: "bg-yellow-400 text-yellow-950",
    },
    cardLight: {
      error: "bg-red-200 text-red-950",
      info: "bg-sky-200 text-sky-950",
      success: "bg-green-200 text-green-950",
      warning: "bg-yellow-100 text-yellow-950",
    },
    borderTop: {
      error: "bg-red-200 text-red-950 border-t-4 border-red-500",
      info: "bg-sky-200 text-sky-950 border-t-4 border-sky-500",
      success: "bg-green-200 text-green-950 border-t-4 border-green-500",
      warning: "bg-yellow-100 text-yellow-950 border-t-4 border-yellow-500",
    },
    borderBottom: {
      error: "bg-red-200 text-red-950 border-b-4 border-red-500",
      info: "bg-sky-200 text-sky-950 border-b-4 border-sky-500",
      success: "bg-green-200 text-green-950 border-b-4 border-green-500",
      warning: "bg-yellow-100 text-yellow-950 border-b-4 border-yellow-500",
    },
    borderStart: {
      error: "bg-red-200 text-red-950 border-s-4 border-red-500",
      info: "bg-sky-200 text-sky-950 border-s-4 border-sky-500",
      success: "bg-green-200 text-green-950 border-s-4 border-green-500",
      warning: "bg-yellow-100 text-yellow-950 border-s-4 border-yellow-500",
    },
  };
  return themes[variant][type] || "";
};
