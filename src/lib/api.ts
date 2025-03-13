import { env } from "$env/dynamic/public";
import { treaty } from "@elysiajs/eden";
import { tokenStore, userStore } from "./store/auth";
import { toast } from "svelte-sonner";
import { get } from "svelte/store";
import { goto } from "$app/navigation";

export const client = treaty<any>(env["PUBLIC_BACKEND_URI"], {
  fetcher: fetch,
  headers() {
    return {
      authorization: "Bearer " + get(tokenStore),
    };
  },
});

export const logout = async () => {
  userStore.set(null);
  tokenStore.set(null);
  toast.success("ออกจากระบบแล้ว");
  window.location.reload();
};
export const register = async (body: {
  username: string;
  password: string;
  email: string;
}) => {
  const { data, error } = await client.api.v1.auth.register.post(body);

  console.log({ data, error });
  if (error) {
    toast.error(error.value.error);
    return;
  }
  tokenStore.set(data.token);
  toast.success("สมัครสมาชิกสำเร็จ");
  return getMe();
};
export const login = async (body: { username: string; password: string }) => {
  const { data, error } = await client.api.v1.auth.login.post(body);

  console.log({ data, error });
  if (error) {
    toast.error(error.value.error);
    return;
  }
  toast.success("เข้าสู่ระบบสำเร็จ");
  tokenStore.set(data.token);
  return getMe();
};

export const getMe = async () => {
  const { data: user } = await client.api.v1.users["@me"].get();
  user.balance = +user.balance;
  userStore.set(user);
  return user;
};

export const getMyOrders = async () => {
  const { data: orders } = await client.api.v1.users["@me"].orders.get();
  return orders;
};
