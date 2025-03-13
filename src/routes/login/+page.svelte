<!-- SellVat Login Page in SvelteKit -->
<script>
    import { onMount } from "svelte";
    import { Button } from "$lib/components/ui/button";
    import { login } from "$lib/api";
    import Copyright from "$lib/components/Copyright.svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";

    let username = "";
    let password = "";
    let rememberMe = false;
    let isLoading = false;
    let errorMessage = "";

    const handleSubmit = async () => {
        if (!username || !password) {
            errorMessage = "กรุณากรอกอีเมลและรหัสผ่าน";
            return;
        }

        try {
            isLoading = true;
            await login({ username, password });
            goto(page.url.searchParams.get("returnUrl") || "/");
        } catch (error) {
            errorMessage = "เข้าสู่ระบบล้มเหลว กรุณาลองอีกครั้ง";
        } finally {
            isLoading = false;
        }
    };
</script>

<div
    class="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
>
    <!-- Header with Logo -->
    <header class="py-4 px-6">
        <div class="max-w-7xl mx-auto">
            <a href="/" class="text-3xl font-extrabold"> SellVat </a>
        </div>
    </header>

    <!-- Login Form Container -->
    <main class="flex-1 flex items-center justify-center px-6 py-12">
        <div class="w-full max-w-md">
            <!-- Card -->
            <div
                class="bg-background dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden"
            >
                <!-- Form Header -->
                <div class="p-6">
                    <h1 class="text-2xl font-bold text-primary">เข้าสู่ระบบ</h1>
                </div>

                <!-- Form Body -->
                <div class="px-6">
                    {#if errorMessage}
                        <div
                            class="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-4"
                        >
                            {errorMessage}
                        </div>
                    {/if}

                    <form
                        on:submit|preventDefault={handleSubmit}
                        class="space-y-4"
                    >
                        <!-- Email Field -->
                        <div class="space-y-2">
                            <label
                                for="username"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                            >
                                username
                            </label>
                            <input
                                type="username"
                                id="username"
                                bind:value={username}
                                class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                placeholder="username"
                                required
                            />
                        </div>

                        <!-- Password Field -->
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <label
                                    for="password"
                                    class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                                >
                                    รหัสผ่าน
                                </label>
                                <a
                                    href="#"
                                    class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                                >
                                    ลืมรหัสผ่าน?
                                </a>
                            </div>
                            <input
                                type="password"
                                id="password"
                                bind:value={password}
                                class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <!-- Remember Me Checkbox -->
                        <div class="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                bind:checked={rememberMe}
                                class="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 border-slate-300 dark:border-slate-600 rounded"
                            />
                            <label
                                for="remember-me"
                                class="ml-2 block text-sm text-slate-700 dark:text-slate-200"
                            >
                                จดจำฉัน
                            </label>
                        </div>

                        <!-- Submit Button -->
                        <Button
                            type="submit"
                            class="w-full py-3 text-white bg-blue-600 font-bold"
                            disabled={isLoading}
                        >
                            {#if isLoading}
                                <svg
                                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                กำลังเข้าสู่ระบบ...
                            {:else}
                                เข้าสู่ระบบ
                            {/if}
                        </Button>
                    </form>

                    <!-- Divider -->
                    <!-- <div class="relative flex items-center mt-8">
                        <div
                            class="flex-grow border-t border-slate-300 dark:border-slate-600"
                        ></div>
                        <span
                            class="flex-shrink mx-4 text-slate-600 dark:text-slate-400"
                            >หรือ</span
                        >
                        <div
                            class="flex-grow border-t border-slate-300 dark:border-slate-600"
                        ></div>
                    </div> -->

                    <!-- Social Login Buttons -->
                    <!-- <div class="grid grid-cols-2 gap-4 mt-6">
                        <button
                            class="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="#4285F4"
                            >
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span
                                class="text-slate-700 dark:text-slate-200 text-sm font-medium"
                                >Google</span
                            >
                        </button>
                        <button
                            class="flex items-center justify-center gap-2 py-3 px-4 bg-[#1877F2] text-white rounded-lg shadow-sm hover:bg-[#166FE5] transition-colors"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                />
                            </svg>
                            <span class="text-sm font-medium">Facebook</span>
                        </button>
                    </div> -->

                    <!-- Register Link -->
                    <div class="text-center my-4">
                        <p class="text-slate-600 dark:text-slate-400">
                            ยังไม่มีบัญชี?
                            <a
                                href="/register"
                                class="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-500 dark:hover:text-blue-300"
                            >
                                สมัครสมาชิก
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Extra Links -->
            <div
                class="text-center mt-8 text-sm text-slate-600 dark:text-slate-400"
            >
                <p class="space-x-1">
                    <a
                        href="/terms"
                        class="hover:text-slate-900 dark:hover:text-slate-200"
                        >ข้อกำหนดการใช้งาน</a
                    >
                    <span>·</span>
                    <a
                        href="/privacy"
                        class="hover:text-slate-900 dark:hover:text-slate-200"
                        >นโยบายความเป็นส่วนตัว</a
                    >
                    <span>·</span>
                    <a
                        href="/help"
                        class="hover:text-slate-900 dark:hover:text-slate-200"
                        >ความช่วยเหลือ</a
                    >
                </p>
            </div>
            <Copyright />
        </div>
    </main>
</div>
