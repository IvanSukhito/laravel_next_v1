'use client';
import { useProfileContext } from '@/context/ProfileContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IconBase } from 'react-icons';
import { useRouter } from 'next/navigation'; // IMPORT INI
import Cookies from "js-cookie";


export type MenuItem = {
    iconMenu?: string,
    label: string,
    pathName: string,
};
interface Props {
    menuItems: MenuItem[];
}
  
const DropdownMenu = ({ menuItems }: Props) => {
    // const {logout} = useProfileContext();
    // const { logout } = useProfileContext();
    // const router = useRouter(); // INISIALISASI ROUTER
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
    
  return (
    <div
      style={{
        position: "absolute",
        right: "8px",
        marginTop: "8px",
        flexDirection: "column",
        padding: "1.5rem",
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 10px 40px #00000033",
        gap: "10px",
      }}
    >
      {menuItems.map((item) => {
        return (
          <div
            key={item.label}
            style={{
              display: "flex",          // ✅ icon + text sejajar
            }}
          >
            <Link href={item.pathName}  
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 8px",
                    textDecoration: "none",
                    color: "black",
                }}      
            >
            {item.iconMenu && (
                <Image
                    src={item.iconMenu}
                    alt="icon-menu-dropdowns"
                    width={16}
                    height={16}
                />
            )}
            <span>{item.label}</span>
            </Link>
          </div>
        );
      })}
      {/* logout terpisah */}
        <a key="logout" onClick={handleLogout} style={
            {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 8px",
                textDecoration: "none",
                color: "black",
                cursor: "pointer", // ✅ ini biar ada tanda tangan
            }
        }>
            <Image
                src="/images/icons/icon-planning.svg"
                alt="icon-menu-dropdowns"
                width={16}
                height={16}
            />
            <span>Logout</span>
        </a>
    </div>
  );
};
export default DropdownMenu