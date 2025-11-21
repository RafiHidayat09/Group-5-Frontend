import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../../_api";

export default function CreateArticles() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    judul: "",
    konten: "",
    kategori: "",
  });
  const [gambar, setGambar] = useState(null);
  const [penulisId, setPenulisId] = useState(null);
  const [errors, setErrors] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // ambil profil user (untuk penulis_id)
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/psikolog-profile"); // sesuai route backend kamu
        if (res.data && res.data.user) {
          setPenulisId(res.data.user.id);
        } else if (res.data && res.data.data && res.data.data.id) {
          // fallback struktur lain
          setPenulisId(res.data.data.id);
        }
      } catch (err) {
        console.warn("Gagal mengambil profil (pastikan login):", err);
      }
    };
    loadUser();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErrors(null);

    if (!penulisId) {
      alert("Profil tidak ditemukan. Pastikan Anda sudah login.");
      return;
    }

    const fd = new FormData();
    fd.append("judul", form.judul);
    fd.append("konten", form.konten);
    fd.append("kategori", form.kategori || "");
    fd.append("penulis_id", penulisId);
    if (gambar) fd.append("gambar", gambar);

    setSubmitting(true);
    try {
      await API.post("/articles", fd);
      navigate("/psikiater/artikel");
    } catch (err) {
      console.error("Gagal membuat artikel:", err);
      if (err.response?.status === 422) {
        setErrors(err.response.data.message || err.response.data.errors || "Validasi gagal");
      } else {
        alert("Terjadi kesalahan. Cek console untuk detail.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="p-6 bg-[#f4faf9] min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-[#163737]">📝 Buat Artikel Baru</h1>

        {errors && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(errors, null, 2)}</pre>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Judul</label>
            <input
              type="text"
              value={form.judul}
              onChange={(e) => setForm({ ...form, judul: e.target.value })}
              required
              className="w-full border p-3 rounded-xl"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Kategori (opsional)</label>
            <input
              type="text"
              value={form.kategori}
              onChange={(e) => setForm({ ...form, kategori: e.target.value })}
              className="w-full border p-3 rounded-xl"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Konten</label>
            <textarea
              value={form.konten}
              onChange={(e) => setForm({ ...form, konten: e.target.value })}
              rows={8}
              required
              className="w-full border p-3 rounded-xl"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Gambar (opsional)</label>
            <input type="file" accept="image/*" onChange={(e) => setGambar(e.target.files[0])} />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-[#163737] text-white rounded-xl hover:bg-[#0f2a2a]"
            >
              {submitting ? "Menyimpan..." : "Simpan Artikel"}
            </button>

            <button type="button" onClick={() => navigate("/psikiater/artikel")} className="px-4 py-2 border rounded">
              Batal
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
