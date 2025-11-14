import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const scores = location.state?.scores;

  if (!scores) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a3c3c]/20 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <p className="text-[#163737] font-medium mb-4">
            Belum ada data asesmen.<br />Silakan mulai quiz terlebih dahulu.
          </p>

          <button
            onClick={() => navigate("/quiz")}
            className="px-6 py-2 bg-[#1e4d4d] text-white rounded-full shadow-md hover:bg-[#163f3f] transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-redo"></i>
            Mulai Quiz
          </button>
        </div>
      </div>
    );
  }

  const scoreArray = Object.entries(scores).map(([category, value]) => ({
    category,
    value,
  }));

  const getCategoryIconClass = (category) => {
    switch (category.toLowerCase()) {
      case "stress":
        return "fas fa-brain";
      case "kecemasan":
        return "fas fa-face-frown";
      case "depresi":
        return "fas fa-heart-pulse";
      default:
        return "fas fa-brain";
    }
  };

  return (
    <div className="min-h-screen bg-[#1a3c3c]/20 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 border border-[#1e4d4d]/20">

        <h1 className="text-3xl font-bold text-[#163737] text-center mb-6">
          Hasil Asesmen Kesehatan Mental
        </h1>

        <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
          Berikut adalah rekap penilaian berdasarkan jawabanmu. 
          Setiap kategori menunjukkan tingkat kecenderungan tertentu.
        </p>

        <div className="space-y-5">
          {scoreArray.map((item, index) => (
            <div
              key={index}
              className="bg-[#e9f4f2] px-6 py-4 rounded-xl border border-[#1e4d4d]/20 shadow-inner flex items-center gap-4"
            >
              <i className={`${getCategoryIconClass(item.category)} text-[#1e4d4d] text-2xl`}></i>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-[#163737]">{item.category}</h2>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div
                    className="h-3 transition-all duration-300 rounded-full"
                    style={{
                      width: `${item.value * 10}%`,
                      backgroundColor: "#1e4d4d",
                    }}
                  ></div>
                </div>
                <p className="text-gray-700 mt-2">
                  Skor: <span className="font-semibold">{item.value}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center space-x-4">
          <button
            onClick={() => navigate("/quiz")}
            className="px-5 py-2 bg-[#1e4d4d] text-white rounded-full shadow-md hover:bg-[#163f3f] transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-redo"></i>
            Ulangi Asesmen
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-white border border-[#1e4d4d]/40 text-[#1e4d4d] rounded-full shadow hover:bg-[#eef7f6] transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-home"></i>
            Kembali ke Beranda
          </button>
        </div>

      </div>
    </div>
  );
}
