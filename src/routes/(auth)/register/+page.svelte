<!-- SellVat Register Page in SvelteKit -->
<script>
    import { onMount } from "svelte";
    import { Button } from "$lib/components/ui/button";
    import { register } from "$lib/api";
    import Copyright from "$lib/components/Copyright.svelte";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";

    let formData = {
        username: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    };

    let isLoading = false;
    let errorMessage = "";
    let errors = {};
    let returnUrl = page.url.searchParams.get("returnUrl") || "/";

    const validateForm = () => {
        errors = {};
        if (!formData.email) {
            errors.email = "กรุณากรอกอีเมล";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
        }

        if (!formData.password) {
            errors.password = "กรุณากรอกรหัสผ่าน";
        } else if (formData.password.length < 8) {
            errors.password = "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร";
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = "กรุณายืนยันรหัสผ่าน";
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
        }
        if (!formData.acceptTerms) {
            errors.acceptTerms = "กรุณายอมรับข้อกำหนดและเงื่อนไข";
        }

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            errorMessage = "กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง";
            toast.error(errorMessage);
            return;
        }

        try {
            isLoading = true;

            const user = await register(formData);
            if (user) goto(returnUrl);
        } catch (error) {
            console.error(error);
            errorMessage = "การสมัครสมาชิกล้มเหลว กรุณาลองอีกครั้ง";
        } finally {
            isLoading = false;
        }
    };
</script>

<svelte:head>
    <title>SellVat | สมัครสมาชิก</title>
    <link rel="canonical" href="https://sellvat.com/login" />
</svelte:head>
<div
    class="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
>
    <!-- Header with Logo -->
    <header class="py-4 px-6">
        <div class="max-w-7xl mx-auto">
            <a href="/" class="text-3xl font-extrabold"> SellVat </a>
        </div>
    </header>

    <!-- Registration Form Container -->
    <main class="flex-1 flex items-center justify-center px-6 py-12">
        <div class="w-full max-w-2xl">
            <!-- Card -->

            <div
                class="bg-background dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden"
            >
                <!-- Form Header -->
                <div class="p-6">
                    <h1 class="text-2xl font-bold text-primary">สมัครสมาชิก</h1>
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
                        <!-- Personal Information Section -->
                        <div>
                            <div class="space-y-2">
                                <label
                                    for="username"
                                    class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                                >
                                    ชื่อผู้ใช้ <span class="text-red-500"
                                        >*</span
                                    >
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    bind:value={formData.username}
                                    class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                    placeholder="username"
                                    required
                                />
                                {#if errors.username}
                                    <p class="text-red-500 text-xs mt-1">
                                        {errors.username}
                                    </p>
                                {/if}
                            </div>

                            <!-- Email Field -->
                            <div class="space-y-2 mt-4">
                                <label
                                    for="email"
                                    class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                                >
                                    อีเมล <span class="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    bind:value={formData.email}
                                    class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                    placeholder="your@email.com"
                                    required
                                />
                                {#if errors.email}
                                    <p class="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </p>
                                {/if}
                            </div>
                        </div>

                        <!-- Account Information Section -->
                        <div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <!-- Password Field -->
                                <div class="space-y-2">
                                    <label
                                        for="password"
                                        class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                                    >
                                        รหัสผ่าน <span class="text-red-500"
                                            >*</span
                                        >
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        bind:value={formData.password}
                                        class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                        placeholder="••••••••"
                                        required
                                    />
                                    {#if errors.password}
                                        <p class="text-red-500 text-xs mt-1">
                                            {errors.password}
                                        </p>
                                    {/if}
                                </div>

                                <!-- Confirm Password Field -->
                                <div class="space-y-2">
                                    <label
                                        for="confirmPassword"
                                        class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                                    >
                                        ยืนยันรหัสผ่าน <span
                                            class="text-red-500">*</span
                                        >
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        bind:value={formData.confirmPassword}
                                        class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                        placeholder="••••••••"
                                        required
                                    />
                                    {#if errors.confirmPassword}
                                        <p class="text-red-500 text-xs mt-1">
                                            {errors.confirmPassword}
                                        </p>
                                    {/if}
                                </div>
                            </div>
                        </div>

                        <!-- Terms and Conditions Checkbox -->
                        <div class="mt-6">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input
                                        id="acceptTerms"
                                        type="checkbox"
                                        bind:checked={formData.acceptTerms}
                                        class="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 border-slate-300 dark:border-slate-600 rounded"
                                        required
                                    />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label
                                        for="acceptTerms"
                                        class="text-slate-700 dark:text-slate-200"
                                    >
                                        ฉันยอมรับ <a
                                            href="/terms"
                                            class="text-blue-600 dark:text-blue-400 hover:underline"
                                            >ข้อกำหนดการใช้งาน</a
                                        >
                                        และ
                                        <a
                                            href="/privacy"
                                            class="text-blue-600 dark:text-blue-400 hover:underline"
                                            >นโยบายความเป็นส่วนตัว</a
                                        >
                                    </label>
                                    {#if errors.acceptTerms}
                                        <p class="text-red-500 text-xs mt-1">
                                            {errors.acceptTerms}
                                        </p>
                                    {/if}
                                </div>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <Button
                            type="submit"
                            class="w-full py-3 mt-6 text-white bg-blue-600 font-bold"
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
                                กำลังสมัครสมาชิก...
                            {:else}
                                สมัครสมาชิก
                            {/if}
                        </Button>
                    </form>

                    <!-- Login Link -->
                    <div class="text-center my-4">
                        <p class="text-slate-600 dark:text-slate-400">
                            มีบัญชีอยู่แล้ว?
                            <a
                                href="/login?returnUrl={encodeURIComponent(
                                    returnUrl,
                                )}"
                                class="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-500 dark:hover:text-blue-300"
                            >
                                เข้าสู่ระบบ
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
