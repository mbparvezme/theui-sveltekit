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
  notifications.update((all) => all.filter((toast: any) => toast.CONFIG.id !== id));
};

export let getClasses = (config: NOTIFY_CONFIG, type: string): string => {
  const variant: any = {
    borderBottom: "notification-border-bottom ",
    borderTop: "notification-border-top ",
    borderStart: "notification-border-start ",
    cardLight: "notification-card-light ",
    default: "notification-card "
  }
  return `notification${getRounded(config.rounded)} px-4 py-3 shadow-2xl shadow-black/50 cursor-pointer ${(variant[config?.variant] ?? variant["default"])} ${getTheme(config?.variant, type)}`;
};

let getTheme = (variant: string, type: string): string => {
  const themes: any = {
    card: {
      error: "bg-error-500 dark:bg-error-600 text-error-50",
      info: "bg-info-500 dark:bg-info-600 text-info-50",
      success: "bg-success-500 dark:bg-success-600 text-success-50",
      warning: "bg-warning-500 dark:bg-warning-600 text-warning-800 dark:text-warning-950"
    },
    cardLight: {
      error: "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-100 border-error-500",
      info: "bg-info-200 text-info-800 dark:bg-info-900 dark:text-info-200 border-info-500",
      success: "bg-success-200 text-success-800 dark:bg-success-900 dark:text-success-200 border-success-500",
      warning: "bg-warning-200 text-warning-800 dark:bg-warning-900 dark:text-warning-100 border-warning-500"
    },
    borderTop: {
      error: "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-100 border-error-500 border-t-4",
      info: "bg-info-200 text-info-800 dark:bg-info-900 dark:text-info-200 border-info-500 border-t-4",
      success: "bg-success-200 text-success-800 dark:bg-success-900 dark:text-success-200 border-success-500 border-t-4",
      warning: "bg-warning-200 text-warning-800 dark:bg-warning-900 dark:text-warning-100 border-warning-500 border-t-4",
    },
    borderBottom: {
      error: "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-100 border-error-500 border-b-4",
      info: "bg-info-200 text-info-800 dark:bg-info-900 dark:text-info-200 border-info-500 border-b-4",
      success: "bg-success-200 text-success-800 dark:bg-success-900 dark:text-success-200 border-success-500 border-b-4",
      warning: "bg-warning-200 text-warning-800 dark:bg-warning-900 dark:text-warning-100 border-warning-500 border-b-4",
    },
    borderStart: {
      error: "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-100 border-error-500 border-s-4",
      info: "bg-info-200 text-info-800 dark:bg-info-900 dark:text-info-200 border-info-500 border-s-4",
      success: "bg-success-200 text-success-800 dark:bg-success-900 dark:text-success-200 border-success-500 border-s-4",
      warning: "bg-warning-200 text-warning-800 dark:bg-warning-900 dark:text-warning-100 border-warning-500 border-s-4",
    },
  };
  return themes[variant][type] || "";
};
