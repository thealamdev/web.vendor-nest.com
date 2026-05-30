"use client";

import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Settings,
    LogOut,
    Bell,
    Search,
    ChevronDown,
    User,
    CreditCard,
    Files,
    ListOrdered,
} from "lucide-react";

import OrganizationSwitcher from "../components/OrganizationSwitcher";
import { RolePermissionContext, RolePermissionResponse } from '@/app/context/RolePermissionContext';
import { logoutAction } from "@/app/actions/auth/vendor/logout-action";
import { getCookie } from "@/lib/session";
import { CookieEnum } from "@/app/enums/CookieEnum";
import { getEcho } from "@/lib/echo";

export default function LayoutContext({
    children,
}: {
    children: ReactNode;
}) {

    const pathname = usePathname();
    const router = useRouter();

    const [showNotification, setShowNotification] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showRoleMenu, setShowRoleMenu] = useState(false);

    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const { permissions } = useContext<RolePermissionResponse>(RolePermissionContext);
    const [user, setUser] = useState<Record<string, string>>({
        id: '',
        name: '',
        email: ''
    });

    const sidebarMenus = [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard, permission: 'dashboard.view' },
        { title: "Products", href: "/dashboard/products", icon: CalendarDays, permission: 'product.view' },
        { title: "Orders", href: "/dashboard/orders", icon: ListOrdered, permission: 'order.view' },
        { title: "Members", href: "/dashboard/members", icon: Users, permission: 'member.view' },
        { title: "Reports", href: "/dashboard/reports", icon: Files, permission: 'report.view' },
        { title: "Notification", href: "/dashboard/notification", icon: Files, permission: 'notification.view' },
        { title: "Role & Permission", href: "/dashboard/role-permisson", icon: Files, permission: 'role.view' },
        { title: "Settings", href: "/dashboard/settings", icon: Settings, permission: 'dashboard.view' },
    ];

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getCookie(CookieEnum.AUTH_COOKIE);
            setUser(res.user);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (!user?.id) return;

        const channelName = `user.logout.${user.id}`;
        let cleanup: (() => void) | null = null;

        const subscribe = async () => {
            const echoInstance = await getEcho();
            if (!echoInstance) return;

            echoInstance.private(channelName).listen(".user.logout", (e: any) => {
                toast.success("You have been logged out successfully.");
                window.location.href = "/";
            });

            cleanup = () => echoInstance.leave(channelName);
        };

        subscribe();

        return () => {
            cleanup?.();
        };
    }, [user?.id]);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(e.target as Node)
            ) {
                setShowNotification(false);
            }

            if (
                profileRef.current &&
                !profileRef.current.contains(e.target as Node)
            ) {
                setShowProfileMenu(false);
                setShowRoleMenu(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleLogout = async () => {
        const res = await logoutAction();

        if (res.success) {
            setUser({ id: '', name: '', email: '' });
            window.location.href = "/";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Sidebar */}
            <aside className="hidden lg:flex w-[270px] bg-white border-r border-gray-200 flex-col">

                <OrganizationSwitcher />

                <nav className="flex-1 p-4 space-y-2">
                    {sidebarMenus.map((menu) => {

                        const Icon = menu.icon;
                        const isActive = pathname === menu.href;

                        return (
                            <div key={menu.href}>
                                {
                                    permissions?.includes(menu.permission as string) && (
                                        <Link
                                            href={menu.href}
                                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition
                                    ${isActive
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                                }`}
                                        >
                                            <Icon size={18} />
                                            {menu.title}
                                        </Link>
                                    )
                                }
                            </div>
                        );
                    })}
                </nav>

                <div className="border-t border-gray-200 p-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 px-4 lg:px-8 flex items-center justify-between">

                    {/* Search */}
                    <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-3 h-11 w-[320px]">
                        <Search size={18} className="text-gray-500" />
                        <input
                            className="bg-transparent outline-none w-full text-sm"
                            placeholder="Search..."
                        />
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-4 ml-auto">

                        {/* Notification */}
                        <div ref={notificationRef}>
                            <button
                                onClick={() => setShowNotification(!showNotification)}
                                className="relative h-11 w-11 rounded-xl border border-gray-200 flex items-center justify-center"
                            >
                                <Bell size={18} />
                                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
                            </button>
                        </div>

                        {/* Profile */}
                        <div className="relative" ref={profileRef}>

                            {/* Profile Button */}
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded-xl"
                            >
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    SA
                                </div>

                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-semibold">
                                        {user?.name ? user?.name : 'User loading...'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {!user?.email ? 'Email loading...' : user?.email}
                                    </p>
                                </div>

                                <ChevronDown size={18} />
                            </button>

                            {/* Dropdown */}
                            {showProfileMenu && (
                                <div className="absolute right-0 top-16 w-[260px] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50">

                                    {/* User Info */}
                                    <div className="p-4 border-b">
                                        <h4 className="text-sm font-semibold">
                                            {user?.name}
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            {user?.email}
                                        </p>
                                    </div>

                                    <div className="p-2 space-y-1">

                                        {/* Profile */}
                                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
                                            <User size={18} />
                                            Profile
                                        </button>

                                        {/* Billing */}
                                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
                                            <CreditCard size={18} />
                                            Billing
                                        </button>

                                        {/* Logout */}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50"
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}