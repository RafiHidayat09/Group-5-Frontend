import { useEffect, useState } from "react";
import { API } from "../../../_api";
import { Link } from "react-router-dom";
import { psikologImageStorage } from "../../../_api";

export default function PsikiaterIndex() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await API.get("/psikiater");
      setData(res.data || []);
    } catch (err) {
      console.error("Gagal load psikiater:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus psikiater ini?")) return;
    await API.delete(`/psikiater/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = data.filter((item) =>
    (item.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-gray-100 py-12 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#163737]">Manajemen Psikiater</h1>

          <Link
            to="/admin/psikiater/create"
            className="px-4 py-2 bg-[#163737] text-white rounded-lg hover:bg-[#0f2a2a]"
          >
            + Tambah Psikiater
          </Link>
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari psikiater berdasarkan nama..."
            className="w-full max-w-xl px-4 py-3 rounded-lg border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold">Foto</th>
                <th className="px-4 py-3 text-left font-semibold">Nama</th>
                <th className="px-4 py-3 text-left font-semibold">STR</th>
                <th className="px-4 py-3 text-left font-semibold">Spesialisasi</th>
                <th className="px-4 py-3 text-left font-semibold">Pengalaman</th>
                <th className="px-4 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    {/* FOTO */}
                    <td className="px-4 py-3">
                      {p.psikolog_profile?.foto ? (
                        <img
                          src={`${psikologImageStorage}/${p.psikolog_profile.foto}`}
                          alt="Foto Psikiater"
                          className="w-14 h-14 object-cover rounded-full border"
                        />
                      ) : (
                        <span className="text-gray-400">Tidak ada foto</span>
                      )}
                    </td>

                    <td className="px-4 py-3 font-medium">{p.name}</td>

                    <td className="px-4 py-3">{p.psikolog_profile?.no_str || "-"}</td>

                    <td className="px-4 py-3">
                      {p.psikolog_profile?.spesialisasi || "-"}
                    </td>

                    <td className="px-4 py-3">
                      {p.psikolog_profile?.pengalaman || "-"}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-4">
                        <Link
                          to={`/admin/psikiater/edit/${p.id}`}
                          className="text-green-600 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-red-600 hover:underline"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Tidak ada psikiater ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
