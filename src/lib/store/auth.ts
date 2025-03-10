import { persisted } from "svelte-persisted-store";
import { writable } from "svelte/store";

// First param `preferences` is the local storage key.
// Second param is the initial value.
export const tokenStore = persisted("token", null);
export const userStore = persisted("user", null);
export const authRedirect = writable("/");
