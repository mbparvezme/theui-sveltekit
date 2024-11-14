import type {NOTIFY_CONFIG, NOTIFICATION_TYPE} from "$lib/types"
import {generateToken} from "$lib/functions"

export let activeAccordions: { value: string[]} = $state({value: [""]})
export let notifications: { value: any } = $state({ value: [] })

export let notify = (msg: string, type: NOTIFICATION_TYPE = "error", config: NOTIFY_CONFIG = {}): string => {
  let defaultConfig: NOTIFY_CONFIG = { animate: true, removeOnClick: true, removeAfter: 50000, rounded: "md", theme: "default", variant: "card" }
  const C: NOTIFY_CONFIG & { id: string } = { ...defaultConfig, ...config, id: generateToken() };

  notifications.value.push({ msg, type, CONFIG: C });

  if (C.removeAfter !== 0) {
    setTimeout(() => {
      removeNotification(C.id)
    }, C.removeAfter)
  }
  return C.id
}

export let removeNotification = (id: string) => notifications.value = notifications.value.filter((n: any) => n.CONFIG.id !== id)