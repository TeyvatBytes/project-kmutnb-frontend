import { tokenStore } from "$lib/store/auth";
import { get } from "svelte/store";
import { redirect } from "@sveltejs/kit";

export const csr = true;
export const ssr = false;

export function load({ url, set }) {
  const token = get(tokenStore);

  if (!token) {
    // Store the current path to redirect back after login
    const returnUrl = encodeURIComponent(url.pathname);

    // Redirect to login with return URL parameter
    return redirect(302, `/login?returnUrl=${returnUrl}`);
  }
}
