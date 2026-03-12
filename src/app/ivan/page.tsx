export default function IvanPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100">
      <h1 className="text-4xl font-bold text-black">
        HALO IVAN!
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        Kalau lo bisa liat tulisan ini di <code className="bg-white px-2">localhost:3000/ivan</code>, 
        berarti routing Next.js lo SEHAT.
      </p>
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        Artinya: Masalahnya cuma ada di file <code className="text-red-500 font-bold">src/app/page.tsx</code> lo!
      </div>
    </div>
  );
}