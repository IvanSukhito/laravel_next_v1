import { myAppHook } from '@/context/AppProvider';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IconBase } from 'react-icons';


export type MenuItem = {
    iconMenu?: string,
    label: string,
    pathName: string,
};
interface Props {
    menuItems: MenuItem[];
}
  
const DropdownMenu = ({ menuItems }: Props) => {
    const {logout} = myAppHook();
    
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
        <a key="logout" onClick={logout} style={
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