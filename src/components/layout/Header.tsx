'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="bg-white shadow-sm fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-60">
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-start w-60 h-60">
                            <Image
                                src="/images/logoFinal.png"
                                alt="Tower Trader Logo"
                                fill
                                priority
                                className="object-contain"
                                
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500">Investment made Easy</p>
                        </div>
                    </div>

                    <nav className="flex space-x-4">
                        <Link
                            href="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/"
                                ? "bg-indigo-100 text-indigo-700"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/profile"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/profile"
                                ? "bg-indigo-100 text-indigo-700"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            Profile
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
} 