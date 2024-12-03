import type {NOTIFY_CONFIG, NOTIFICATION_TYPE, SITE} from "$lib/types"
import {generateToken} from "$lib/function.core"

export let ST_ACTIVE_ACCORDIONS: { value: string[]} = $state({ value: [""]})
export let ST_MOBILE_NAV: { value: string[]} = $state({ value: [] })
export let ST_NOTIFICATIONS: { value: any } = $state({ value: [] })

export let ST_TABS: {tabs: string[], panels: string[], selectedTab: string | null, selectedPanel: string | null} =  $state({ tabs: [], panels: [], selectedTab: null, selectedPanel: null })
export let selectedTab: { value: string | null } = $state({ value: null })
export let selectedPanel: { value: string | null } = $state({ value: null })

export let ST_SLIDER: { slides: any[], activeSlide: number | null, previousSlide: string, nextSlide: string } = $state({ slides: [], activeSlide: null, previousSlide: "", nextSlide: "" })

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