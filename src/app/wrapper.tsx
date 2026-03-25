'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '@/components/Loader'; // Path ke komponen Logo UBM kamu

// export default function RootTemplate({ children }: { children: React.ReactNode }) {
 export default function Wrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();



  useEffect(() => {
    // Fungsi untuk mematikan loader
    const handleLoad = () => {
      // Kita beri sedikit delay 500ms agar transisinya tidak terlalu kaget
      setTimeout(() => setIsLoading(false), 1500);
    };

    // Jika halaman sudah selesai load sebelum script ini jalan
    // ouh beri ini secara default handleLoadnya jika tidak mau ditampilkan juga tidak papa ya
    if (document.readyState === 'complete') {
        handleLoad();
    } else {
      // Tunggu event 'load' dari browser
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <>
      {isLoading ? <Loader /> : children}
    </>
  );
}