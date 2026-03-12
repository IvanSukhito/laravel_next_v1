// import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS langsung tanpa { }
import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px]">
      
      {/* Spinner Lingkaran: Pakai border-t buat bikin efek garis muter */}
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
      
      {/* Teks Animasi: Biar kelihatan interaktif */}
      <p className="mt-4 font-medium text-blue-600 animate-pulse">
        Loading ...
      </p>

    </div>
  )
}

export default Loader