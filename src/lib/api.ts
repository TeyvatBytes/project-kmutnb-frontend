import { env } from "$env/dynamic/public";
import { treaty } from "@elysiajs/eden";
import { authRedirect, tokenStore, userStore } from "./store/auth";
import { toast } from "svelte-sonner";
import { get } from "svelte/store";
import { goto } from "$app/navigation";

export const client = treaty<any>(env["PUBLIC_BACKEND_URI"], {
  headers() {
    return {
      authorization: "Bearer " + get(tokenStore),
    };
  },
});

export const logout = async () => {
  goto("/");
  userStore.set(null);
  tokenStore.set(null);
  toast.success("ออกจากระบบแล้ว");
};
export const register = async (body: {
  username: string;
  password: string;
  email: string;
}) => {
  const { data, error } = await client.api.v1.auth.register.post(body);

  console.log({ data, error });
  if (error) return toast.error(error.value.error);
  tokenStore.set(data.token);
  await getMe();
  toast.success("สมัครสมาชิกสำเร็จ");
  goto(get(authRedirect));
};
export const login = async (body: { username: string; password: string }) => {
  const { data, error } = await client.api.v1.auth.login.post(body);

  console.log({ data, error });
  if (error) return toast.error(error.value.error);
  toast.success("เข้าสู่ระบบสำเร็จ");
  tokenStore.set(data.token);
  await getMe();
  goto(get(authRedirect));
};

export const getMe = async () => {
  const { data: user } = await client.api.v1.users["@me"].get();
  user.balance = +user.balance;
  userStore.set(user);
  return user;
};
