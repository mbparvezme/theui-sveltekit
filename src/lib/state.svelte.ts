import type {NOTIFY_CONFIG, NOTIFICATION_TYPE} from "$lib/types"
import {generateToken} from "$lib/functions"

export let ST_ACTIVE_ACCORDIONS: { value: string[]} = $state({value: [""]})
export let ST_MOBILE_NAV: { value: string[]} = $state({value: []})
export let ST_NOTIFICATIONS: { value: any } = $state({ value: [] })

export let notify = (msg: string, type: NOTIFICATION_TYPE = "error", config: NOTIFY_CONFIG = {}): string => {
  let defaultConfig: NOTIFY_CONFIG = { animate: true, removeOnClick: true, removeAfter: 50000, rounded: "md", theme: "default", variant: "card" }
  const C: NOTIFY_CONFIG & { id: string } = { ...defaultConfig, ...config, id: generateToken() };

  ST_NOTIFICATIONS.value.push({ msg, type, CONFIG: C });

  if (C.removeAfter !== 0) {
    setTimeout(() => {
      removeNotification(C.id)
    }, C.removeAfter)
  }
  return C.id
}

export let removeNotification = (id: string) => ST_NOTIFICATIONS.value = ST_NOTIFICATIONS.value.filter((n: any) => n.CONFIG.id !== id)