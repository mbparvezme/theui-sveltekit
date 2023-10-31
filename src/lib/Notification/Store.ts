import type { NOTIFY_CONFIG, NOTIFICATION } from "$lib/types"
import type { Writable } from "svelte/store"

import { writable } from "svelte/store"
import { getRounded, generateToken } from "$lib/functions"

export const notifications: Writable<any> = writable([])

export let notify = (msg: string, type: NOTIFICATION = "error", config: NOTIFY_CONFIG = {rounded: "md", variant: "card"}) : string => {
  let C: any = {animate : true, removeOnClick : true, removeAfter: 5000}
  Object.assign(C, { id: generateToken()}, config)
  notifications.update((all) => [...all, {msg, type, CONFIG: C}])
  if(C.removeAfter !== 0){
    setTimeout(() => {removeNotification(C.id)}, C.removeAfter)
  }
  return C.id;
}

export let removeNotification = (id: string) => {
  notifications.update((all) => all.filter((toast: any) => toast.CONFIG.id !== id));
}

export let getClasses = (config: NOTIFY_CONFIG, type: string): string => {
  return ("notification " + getRounded(config.rounded) + (config.variant == "flat" ? " notification-flat " : " notification-card ") +
    "px-4 py-3 shadow-2xl shadow-black/50 cursor-pointer " + getTheme(config?.variant, type))
}

let getTheme = (variant: string, type: string): string => {
  const themes: any = {
    card : {
      error: "bg-red-500 text-white",
      info: "bg-sky-500 text-white",
      success: "bg-green-500 text-white",
      warning: "bg-yellow-500 text-white",
    }
  }
  return themes[variant][type]||""
}
