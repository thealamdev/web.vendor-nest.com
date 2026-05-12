export default function DashboardPage() {
    return (
        <div className="space-y-6">

            {/* Page Heading */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    Welcome back 👋 Here’s your platform overview.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                {[
                    {
                        title: "Total Events",
                        value: "120",
                    },
                    {
                        title: "Active Users",
                        value: "3,240",
                    },
                    {
                        title: "Revenue",
                        value: "$12,450",
                    },
                    {
                        title: "Tickets Sold",
                        value: "8,930",
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="bg-white border border-gray-200 rounded-2xl p-6"
                    >
                        <p className="text-sm text-gray-500">
                            {item.title}
                        </p>

                        <h3 className="text-3xl font-bold text-gray-900 mt-3">
                            {item.value}
                        </h3>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                {/* Left */}
                <div className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 min-h-[400px]">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Analytics
                    </h2>

                    <div className="h-[320px] flex items-center justify-center text-gray-400">
                        Chart Area
                    </div>
                </div>

                {/* Right */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Recent Activities
                    </h2>

                    <div className="space-y-4 mt-5">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="flex items-start gap-3"
                            >
                                <div className="h-10 w-10 rounded-full bg-gray-200" />

                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        New event created
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        2 minutes ago
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}