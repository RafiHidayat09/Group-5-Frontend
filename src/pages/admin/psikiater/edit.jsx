import { useEffect, useState } from "react";
import { API } from "../../../_api";
import { useNavigate, useParams } from "react-router-dom";
import { psikologImageStorage } from "../../../_api";

export default function EditPsikiater() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    no_str: "",
    spesialisasi: "",
    pengalaman: "",
    deskripsi: "",
  });

  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // =============================
  // LOAD DATA PSIKIATER
  // =============================
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await API.get(`/psikiater/${id}`);
        const data = res.data;

        // Jika struktur data flat
        const profile = data.psikolog_profile || data;

        setForm({
          name: data.name || "",
          email: data.email || "",
          no_str: profile.no_str || "",
          spesialisasi: profile.spesialisasi || "",
          pengalaman: profile.pengalaman || "",
          deskripsi: profile.deskripsi || "",
        });

        if (data.foto) {
          setFotoPreview(`${psikologImageStorage}/${data.foto}`);
        }
      } catch (err) {
        console.error("Gagal memuat data psikiater:", err);
      }
    };

    loadData();
  }, [id]);

  // =============================
  // HANDLER INPUT
  // =============================
  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =============================
  // SUBMIT UPDATE
  // =============================
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));

      if (foto) formData.append("foto", foto);

      await API.post(`/psikiater/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/psikiater");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data);
      }
      console.error("Gagal update:", err);
    }
  };

  // =============================
  // UI COMPONENT
  // =============================
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Edit Psikiater</h2>

      <form onSubmit={submitHandler} className="bg-white p-6 rounded-xl shadow space-y-4">

        {/* Name */}
        <div>
          <label className="block font-medium">Nama</label>
          <input
            name="name"
            value={form.name}
            onChange={changeHandler}
            className="mt-1 w-full p-2 border rounded-lg"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name[0]}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={changeHandler}
            className="mt-1 w-full p-2 border rounded-lg"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email[0]}</p>}
        </div>

        {/* No STR */}
        <div>
          <label className="block font-medium">No STR</label>
          <input
            name="no_str"
            value={form.no_str}
            onChange={changeHandler}
            className="mt-1 w-full p-2 border rounded-lg"
            placeholder="Nomor STR"
          />
          {errors.no_str && <p className="text-red-600 text-sm">{errors.no_str[0]}</p>}
        </div>

        {/* Spesialisasi */}
        <div>
          <label className="block font-medium">Spesialisasi</label>
          <input
            name="spesialisasi"
            value={form.spesialisasi}
            onChange={changeHandler}
            className="mt-1 w-full p-2 border rounded-lg"
            placeholder="Contoh: Psikologi Klinis"
          />
        </div>

        {/* Pengalaman */}
        <div>
          <label className="block font-medium">Pengalaman</label>
          <input
            name="pengalaman"
            value={form.pengalaman}
            onChange={changeHandler}
            className="mt-1 w-full p-2 border rounded-lg"
            placeholder="Contoh: 5 tahun"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={form.deskripsi}
            onChange={changeHandler}
            className="mt-1 w-full p-2 border rounded-lg h-28 resize-none"
            placeholder="Deskripsi singkat"
          />
        </div>

        {/* Foto Preview */}
        {fotoPreview && (
          <img
            src={fotoPreview}
            className="w-32 h-32 object-cover rounded-lg border mb-3"
          />
        )}

        {/* Upload Foto */}
        <div>
          <label className="block font-medium">Foto Profil</label>
          <input
            type="file"
            onChange={(e) => {
              setFoto(e.target.files[0]);
              setFotoPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="mt-1 w-full"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
