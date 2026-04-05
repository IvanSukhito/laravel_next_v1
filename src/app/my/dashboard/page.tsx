
"use client";

import React, { useEffect, useState } from 'react';
import { useProfileContext } from '@/context/ProfileContext'; // Gunakan Context yang baru kita buat
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";


const MyDashboardPage = () => {
    // Ambil data profile dan status loading dari context
    const [loading, setLoading] = useState(false);
    const token = Cookies.get("authToken") || null;


    const { profile, profileLoading, profileReady, logout, refreshProfile } = useProfileContext();
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        try {
            const success = await logout(token);
            if (success) {
                // Redirect langsung ke sign-in setelah bersih-bersih di context
                // router.push("/sign-in");
                window.location.href = "/sign-in";
                router.refresh();
            }
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setLoading(false);
        }
    };

    console.log("profile ready", profileReady);
    console.log("profiless ", profile);
    useEffect(() => {
        // Jika pengecekan profile selesai dan ternyata tidak ada user (null)
        if (profileReady && !profile) {
            router.push("/sign-in");
            return;
        }
        // 2. Jika kamu ingin MEMASTIKAN data paling segar saat masuk dashboard
        // tapi jangan masukkan 'profile' ke dependency array di bawah
        const syncData = async () => {
            const token = Cookies.get("authToken");
            if (token && !profile) { // Hanya panggil jika profile belum ada di state
                await refreshProfile(token);
            }
        };

    syncData();
        
        // await refreshProfile(token);
    }, [profile, profileReady, router]);

    // Tampilkan Loading jika data sedang diambil
    if (profileLoading || !profileReady) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="animate-pulse text-gray-500 text-xl">Loading profile...</p>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome Back, {profile.name}! 👋
                        </h1>
                        <p className="text-gray-500">{profile.email}</p>
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm transition shadow-sm"
                    >
                        Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Contoh Card Informasi User */}
                    <div className="border p-4 rounded-md bg-blue-50">
                        <p className="text-sm text-blue-600 font-bold uppercase">Role</p>
                        <p className="text-lg font-medium text-gray-700">Member / User</p>
                    </div>
                    
                    <div className="border p-4 rounded-md bg-amber-50">
                        <p className="text-sm text-amber-600 font-bold uppercase">Status</p>
                        <p className="text-lg font-medium text-gray-700 font-mono">Verified</p>
                    </div>

                    <div className="border p-4 rounded-md bg-green-50">
                        <p className="text-sm text-green-600 font-bold uppercase">Account ID</p>
                        <p className="text-lg font-medium text-gray-700">#{profile.name || 'N/A'}</p>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Activities</h2>
                    <div className="bg-gray-100 h-32 flex items-center justify-center border-dashed border-2 border-gray-300 rounded-md">
                        <p className="text-gray-400">No recent activities found.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyDashboardPage;