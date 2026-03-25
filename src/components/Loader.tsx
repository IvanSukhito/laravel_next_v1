
'use client';
import Image from 'next/image';

export default function Loader() {
  return (
  
    <div className="flex justify-center items-center h-screen bg-white">
      {/* Container Utama diperbesar ke w-80 h-80 (320px) agar logo juga lebih besar di dalam orbit */}
      <div className="relative w-60 h-60 flex justify-center items-center">        
        {/* Logo UBM diperbesar mengikuti parent */}
        <Image
          src="/images/Logo-UBM-NoDots.png"
          alt="Logo UBM"
          fill
          className="object-contain z-10 animate-logo-active"
          priority
        />

        {/* Dots - ml-28 untuk mendorong formasi titik lebih jauh ke kanan logo */}
        <div className="dots relative">
          {[...Array(48)].map((_, index) => (
            <span 
              key={index} 
              style={{ "--i": index + 1 } as React.CSSProperties}
            ></span>
          ))}
        </div>

      </div>
    </div>
  );
}