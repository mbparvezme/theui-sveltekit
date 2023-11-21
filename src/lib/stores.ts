// Stores
import type { Writable } from "svelte/store"
import type { EditorData } from "$lib/types"
import { writable } from "svelte/store"

const editorDataType: EditorData = {}

export let activeAccordionID: Writable<string> = writable("")
export let collapseID: Writable<string[]> = writable([])
export let activeDropdownID: Writable<string[]> = writable([])
export const modalIdStore: Writable<string[]> = writable([])
export const mobileNav: Writable<string[]> = writable([])

export let editorData: Writable<EditorData> = writable(editorDataType)