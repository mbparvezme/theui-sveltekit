// Stores
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export const mobileNav: Writable<string[]> = writable([])