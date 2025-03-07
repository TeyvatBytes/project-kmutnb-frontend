import { env } from "$env/dynamic/public";
import { treaty } from "@elysiajs/eden";

export const client = treaty<any>(env["PUBLIC_BACKEND_URI"]);
