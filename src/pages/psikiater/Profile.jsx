import React, { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // pastikan JWT tersimpan
        const res = await fetch("http://localhost:8000/api/psikolog-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("Gagal mengambil data");

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Profil Psikiater</h2>
      <p>Nama: {profile.user.name}</p>
      <p>Email: {profile.user.email}</p>
      <p>Spesialisasi: {profile.profile.spesialisasi}</p>
      <p>Pengalaman: {profile.profile.pengalaman}</p>
      <p>Deskripsi: {profile.profile.deskripsi}</p>
      {profile.profile.foto && <img src={profile.profile.foto} alt="Foto Psikiater" />}
    </div>
  );
}
