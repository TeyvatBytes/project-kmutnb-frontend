import { tokenStore } from "$lib/store/auth";
import { get } from "svelte/store";
import { redirect } from "@sveltejs/kit";

export const csr = true;
export const ssr = false;

export function load({ url, set }) {
  const token = get(tokenStore);

  if (!token) {
    const returnUrl = encodeURIComponent(url.pathname);

    return redirect(302, `/login?returnUrl=${returnUrl}`);
  }
}
