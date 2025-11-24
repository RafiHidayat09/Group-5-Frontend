import { useState } from "react";
import { API } from "../../../_api";
import { useNavigate } from "react-router-dom";

export default function CreatePsikiater() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    no_str: "",
    spesialisasi: "",
    pengalaman: "",
    deskripsi: "",
  });

  const [foto, setFoto] = useState(null);
  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      if (foto) formData.append("foto", foto);

      await API.post("/psikiater", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/psikiater");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data);
      }
      console.error("Gagal create:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Tambah Psikiater</h2>

      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        {/* Nama */}
        <div>
          <label className="block font-medium">Nama</label>
          <input
            name="name"
            placeholder="Nama"
            onChange={changeHandler}
            className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            placeholder="Email"
            onChange={changeHandler}
            className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={changeHandler}
            className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password[0]}</p>
          )}
        </div>

        {/* No STR */}
        <div>
          <label className="block font-medium">No STR</label>
          <input
            name="no_str"
            placeholder="Nomor STR"
            onChange={changeHandler}
            className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          {errors.no_str && (
            <p className="text-red-600 text-sm mt-1">{errors.no_str[0]}</p>
          )}
        </div>

        {/* Spesialisasi */}
        <div>
          <label className="block font-medium">Spesialisasi</label>
          <input
            name="spesialisasi"
            placeholder="Contoh: Psikologi Klinis"
            onChange={changeHandler}
            className="mt-1 w-full p-2 border rounded-lg"
          />
          {errors.spesialisasi && (
            <p className="text-red-600 text-sm mt-1">
              {errors.spesialisasi[0]}
            </p>
          )}
        </div>

        {/* Pengalaman */}
        <div>
          <label className="block font-medium">Pengalaman (Tahun)</label>
          <input
            name="pengalaman"
            placeholder="Contoh: 5"
            onChange={changeHandler}
            className="mt-1 w-full p-2 border rounded-lg"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea
            name="deskripsi"
            placeholder="Deskripsi singkat"
            onChange={changeHandler}
            className="mt-1 w-full p-2 border rounded-lg h-28 resize-none"
          ></textarea>
        </div>

        {/* Upload Foto */}
        <div>
          <label className="block font-medium">Foto Profil</label>
          <input
            type="file"
            onChange={(e) => setFoto(e.target.files[0])}
            className="mt-1 w-full"
          />
        </div>

        {/* Button Submit */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
        >
          Tambah
        </button>
      </form>
    </div>
  );
}
