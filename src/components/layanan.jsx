export default function Layanan() {
  return (
    <section className="py-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Layanan Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Konsultasi Psikolog</h3>
            <p className="text-gray-600 mb-4">
              Dapatkan sesi konsultasi dengan psikolog berlisensi untuk membantu mengatasi masalah kesehatan mental Anda.
            </p>
            <button className="px-4 py-2 bg-[#5ba8a0] text-white rounded hover:bg-[#4a9990] transition-all">
              Pelajari Lebih Lanjut
            </button>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Asesmen Kesehatan Mental</h3>
            <p className="text-gray-600 mb-4">
              Ikuti kuis asesmen untuk mengetahui kondisi kesehatan mental Anda dan dapatkan rekomendasi yang sesuai.
            </p>
            <button className="px-4 py-2 bg-[#5ba8a0] text-white rounded hover:bg-[#4a9990] transition-all">
              Mulai Asesmen Sekarang
            </button>
          </div>    

          {/* Service Card 3 */}  
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Artikel dan Tips</h3>
            <p className="text-gray-600 mb-4">
              Dapatkan artikel dan tips terbaru tentang kesehatan mental untuk meningkatkan kualitas hidup Anda.
            </p>
            <button className="px-4 py-2 bg-[#5ba8a0] text-white rounded hover:bg-[#4a9990] transition-all">
              Baca Artikel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}   