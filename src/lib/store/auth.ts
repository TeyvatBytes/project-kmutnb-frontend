import { persisted } from "svelte-persisted-store";

// First param `preferences` is the local storage key.
// Second param is the initial value.
export const token = persisted("token", null);
export const user = persisted("user", null);
