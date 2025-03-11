<script>
    import {
        ArrowLeft,
        TrendingUp,
        Calendar,
        DollarSign,
        Users,
        ShoppingBag,
        Package,
        ArrowUpRight,
        ArrowDownRight,
    } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
    import { onMount } from "svelte";

    let { data } = $props();

    // Time period filter
    let timePeriod = $state("week");

    // Format number as Thai Baht
    function formatCurrency(amount) {
        return new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
            minimumFractionDigits: 2,
        }).format(amount);
    }

    // Format dates
    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    // Format number with +/- sign for percentage changes
    function formatPercentChange(value) {
        const formatted = Math.abs(value).toFixed(1);
        return value >= 0 ? `+${formatted}%` : `-${formatted}%`;
    }

    // Stats for different time periods (would come from API in a real implementation)
    let statsData = $state({
        week: {
            sales: {
                value: data.analytics.week.sales,
                change: data.analytics.week.salesChange,
            },
            orders: {
                value: data.analytics.week.orders,
                change: data.analytics.week.ordersChange,
            },
            customers: {
                value: data.analytics.week.customers,
                change: data.analytics.week.customersChange,
            },
            averageOrder: {
                value: data.analytics.week.averageOrder,
                change: data.analytics.week.averageOrderChange,
            },
        },
        month: {
            sales: {
                value: data.analytics.month.sales,
                change: data.analytics.month.salesChange,
            },
            orders: {
                value: data.analytics.month.orders,
                change: data.analytics.month.ordersChange,
            },
            customers: {
                value: data.analytics.month.customers,
                change: data.analytics.month.customersChange,
            },
            averageOrder: {
                value: data.analytics.month.averageOrder,
                change: data.analytics.month.averageOrderChange,
            },
        },
        year: {
            sales: {
                value: data.analytics.year.sales,
                change: data.analytics.year.salesChange,
            },
            orders: {
                value: data.analytics.year.orders,
                change: data.analytics.year.ordersChange,
            },
            customers: {
                value: data.analytics.year.customers,
                change: data.analytics.year.customersChange,
            },
            averageOrder: {
                value: data.analytics.year.averageOrder,
                change: data.analytics.year.averageOrderChange,
            },
        },
    });

    // Current stats based on selected time period
    let currentStats = $derived(statsData[timePeriod]);

    // Create chart for sales data
    let chartCanvas;
    let salesChart;

    onMount(() => {
        // This would use Chart.js in a real implementation
        renderSalesChart();
        renderTopProducts();
    });

    function renderSalesChart() {
        // In a real implementation, this would render a Chart.js chart
        // For this example, we're just simulating it

        // Create mock chart data based on time period
        const chartData = {
            week: data.analytics.week.dailySales,
            month: data.analytics.month.dailySales,
            year: data.analytics.year.monthlySales,
        };

        // Use a placeholder canvas or a simple SVG representation
        const container = document.getElementById("sales-chart-container");
        if (container) {
            // Clear previous content
            container.innerHTML = "";

            // Create a simple representation of the chart
            const svg = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg",
            );
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "200");
            svg.setAttribute("viewBox", "0 0 600 200");
            svg.style.overflow = "visible";

            const currentData = chartData[timePeriod];
            const maxValue = Math.max(...currentData.values) * 1.1;
            const width = 600;
            const height = 200;
            const barWidth = width / currentData.values.length - 10;

            // Draw bars
            currentData.values.forEach((value, index) => {
                const barHeight = (value / maxValue) * height;
                const x = index * (barWidth + 10);
                const y = height - barHeight;

                const rect = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "rect",
                );
                rect.setAttribute("x", x);
                rect.setAttribute("y", y);
                rect.setAttribute("width", barWidth);
                rect.setAttribute("height", barHeight);
                rect.setAttribute("fill", "#4F46E5");
                rect.setAttribute("rx", "3");

                // Add tooltip/label
                rect.setAttribute(
                    "data-label",
                    `${currentData.labels[index]}: ${formatCurrency(value)}`,
                );

                svg.appendChild(rect);
            });

            container.appendChild(svg);
        }
    }

    function renderTopProducts() {
        // This is just a placeholder function
        // In a real implementation, this would render product data
    }

    // Handle time period change
    function changeTimePeriod(period) {
        timePeriod = period;
        renderSalesChart();
    }
</script>

<div class="flex flex-col gap-5 mt-5">
    <div class="flex items-center gap-4">
        <a
            href="/seller/shops/{data.shop.id}"
            class="hover:bg-accent transition-colors p-2 rounded-full"
        >
            <ArrowLeft size={20} />
        </a>
        <h1 class="text-2xl font-bold">วิเคราะห์ยอดขาย</h1>
    </div>

    <!-- Time period filter -->
    <div class="flex space-x-2 bg-white rounded-lg shadow p-1 w-fit">
        <Button
            variant={timePeriod === "week" ? "default" : "ghost"}
            on:click={() => changeTimePeriod("week")}
            class={timePeriod === "week" ? "bg-blue-600" : ""}
        >
            7 วัน
        </Button>
        <Button
            variant={timePeriod === "month" ? "default" : "ghost"}
            on:click={() => changeTimePeriod("month")}
            class={timePeriod === "month" ? "bg-blue-600" : ""}
        >
            30 วัน
        </Button>
        <Button
            variant={timePeriod === "year" ? "default" : "ghost"}
            on:click={() => changeTimePeriod("year")}
            class={timePeriod === "year" ? "bg-blue-600" : ""}
        >
            ปีนี้
        </Button>
    </div>

    <!-- Key metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Sales -->
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-start">
                <div>
                    <p class="text-sm text-gray-500 flex items-center gap-1">
                        <DollarSign size={14} />
                        ยอดขาย
                    </p>
                    <p class="text-2xl font-bold mt-1">
                        {formatCurrency(currentStats.sales.value)}
                    </p>
                </div>
                <div
                    class={`flex items-center ${currentStats.sales.change >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                    {#if currentStats.sales.change >= 0}
                        <ArrowUpRight size={20} />
                    {:else}
                        <ArrowDownRight size={20} />
                    {/if}
                    <span class="font-medium"
                        >{formatPercentChange(currentStats.sales.change)}</span
                    >
                </div>
            </div>
        </div>

        <!-- Orders -->
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-start">
                <div>
                    <p class="text-sm text-gray-500 flex items-center gap-1">
                        <ShoppingBag size={14} />
                        คำสั่งซื้อ
                    </p>
                    <p class="text-2xl font-bold mt-1">
                        {currentStats.orders.value}
                    </p>
                </div>
                <div
                    class={`flex items-center ${currentStats.orders.change >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                    {#if currentStats.orders.change >= 0}
                        <ArrowUpRight size={20} />
                    {:else}
                        <ArrowDownRight size={20} />
                    {/if}
                    <span class="font-medium"
                        >{formatPercentChange(currentStats.orders.change)}</span
                    >
                </div>
            </div>
        </div>

        <!-- Customers -->
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-start">
                <div>
                    <p class="text-sm text-gray-500 flex items-center gap-1">
                        <Users size={14} />
                        ลูกค้า
                    </p>
                    <p class="text-2xl font-bold mt-1">
                        {currentStats.customers.value}
                    </p>
                </div>
                <div
                    class={`flex items-center ${currentStats.customers.change >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                    {#if currentStats.customers.change >= 0}
                        <ArrowUpRight size={20} />
                    {:else}
                        <ArrowDownRight size={20} />
                    {/if}
                    <span class="font-medium"
                        >{formatPercentChange(
                            currentStats.customers.change,
                        )}</span
                    >
                </div>
            </div>
        </div>

        <!-- Average Order Value -->
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-start">
                <div>
                    <p class="text-sm text-gray-500 flex items-center gap-1">
                        <Package size={14} />
                        มูลค่าเฉลี่ยต่อคำสั่งซื้อ
                    </p>
                    <p class="text-2xl font-bold mt-1">
                        {formatCurrency(currentStats.averageOrder.value)}
                    </p>
                </div>
                <div
                    class={`flex items-center ${currentStats.averageOrder.change >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                    {#if currentStats.averageOrder.change >= 0}
                        <ArrowUpRight size={20} />
                    {:else}
                        <ArrowDownRight size={20} />
                    {/if}
                    <span class="font-medium"
                        >{formatPercentChange(
                            currentStats.averageOrder.change,
                        )}</span
                    >
                </div>
            </div>
        </div>
    </div>

    <!-- Sales Chart -->
    <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">
            ยอดขายตาม{timePeriod === "year" ? "เดือน" : "วันที่"}
        </h2>
        <div id="sales-chart-container" class="h-64 w-full"></div>
    </div>

    <!-- Top Products -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">สินค้าขายดี</h2>
            <div class="space-y-4">
                {#each data.topProducts as product, index}
                    <div class="flex items-center gap-3">
                        <div class="text-lg font-bold text-gray-400 w-6">
                            {index + 1}
                        </div>
                        <div class="flex-1">
                            <p class="font-medium">{product.name}</p>
                            <div
                                class="flex justify-between text-sm text-gray-500"
                            >
                                <span>{product.sold} ขาย</span>
                                <span>{formatCurrency(product.revenue)}</span>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Recent Stats -->
        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">สถิติล่าสุด</h2>

            <div class="space-y-4">
                <div class="border-b pb-2">
                    <p class="text-gray-500 text-sm">คำสั่งซื้อล่าสุด</p>
                    <div class="flex justify-between mt-1">
                        <p class="font-medium">
                            #{data.latestOrder.id}
                            {data.latestOrder.productName}
                        </p>
                        <p class="font-medium">
                            {formatCurrency(data.latestOrder.price)}
                        </p>
                    </div>
                    <p class="text-gray-500 text-sm">
                        {formatDate(data.latestOrder.date)}
                    </p>
                </div>

                <div class="border-b pb-2">
                    <p class="text-gray-500 text-sm">สินค้าที่ขายล่าสุด</p>
                    <div class="flex justify-between mt-1">
                        <p class="font-medium">{data.latestSoldProduct.name}</p>
                        <p class="font-medium">
                            x{data.latestSoldProduct.quantity}
                        </p>
                    </div>
                    <p class="text-gray-500 text-sm">
                        {formatDate(data.latestSoldProduct.date)}
                    </p>
                </div>

                <div>
                    <p class="text-gray-500 text-sm">วันที่ขายดีที่สุด</p>
                    <div class="flex justify-between mt-1">
                        <p class="font-medium">
                            {formatDate(data.bestDay.date)}
                        </p>
                        <p class="font-medium">
                            {formatCurrency(data.bestDay.revenue)}
                        </p>
                    </div>
                    <p class="text-gray-500 text-sm">
                        {data.bestDay.orders} คำสั่งซื้อ
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
