'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { IoClose, IoMenu, IoPerson  , IoCaretUpOutline, IoCaretUpSharp , IoCaretDownSharp , IoCaretDownOutline } from 'react-icons/io5';
import DropdownMenu, { MenuItem } from './DropdownMenu';


interface Props {
    label:string;
    icon?: string | null;
    menuItems: MenuItem[];
}


const DropdownMenuItems = ({label, icon, menuItems}: Props) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    // icon kalau menu dashboard ada icon usersnya
    // else hanya tanda panah ke atas naik atau turun

    return (
        <div className="div">
            <div className='relative flex items-center gap-3' onClick={() => setIsProfileOpen(!isProfileOpen)}>  
                {icon === "my-account" ? <IoPerson/> : null}
                <span>{label}</span>
                {isProfileOpen ? <IoCaretUpSharp/> : <IoCaretDownSharp/>}
            </div>
            {isProfileOpen && <DropdownMenu menuItems={menuItems}/>}
        </div>
       
        // <DropdownMenu menuItems={menuItems}/>
    )
}

export default DropdownMenuItems