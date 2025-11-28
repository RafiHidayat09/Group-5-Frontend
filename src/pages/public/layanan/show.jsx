import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { showPsikiater } from "../../../_services/psikiater";
import { psikologImageStorage, API } from "../../../_api";

export default function ShowPsikiater() {
  const { id } = useParams(); // id psikiater
  const [psikiater, setPsikiater] = useState(null);

  // CHAT STATES
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  // Ambil user login dari localStorage
  const storedUser = localStorage.getItem("userInfo");
  const userLogin = storedUser ? JSON.parse(storedUser) : null;

  // ---------------- FETCH CHAT ----------------
  const fetchChat = async () => {
    if (!userLogin) return; // pastikan user login ada
    try {
      const res = await API.get(`/chat/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setMessages(res.data.data || res.data || []);
    } catch (err) {
      console.error("Gagal load chat:", err);
    }
  };

  // ---------------- SEND MESSAGE ----------------
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !userLogin) return;

    try {
      await API.post(
        "/chat/send",
        {
          receiver_id: id,
          message: input,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setInput("");
      fetchChat();
    } catch (err) {
      console.error("Gagal kirim pesan:", err);
    }
  };

  // ---------------- FETCH PSIKIATER + CHAT ----------------
  useEffect(() => {
    const fetchData = async () => {
      const data = await showPsikiater(id);
      setPsikiater(data);
    };
    fetchData();

    // Auto-refresh chat tiap 3 detik
    const interval = setInterval(fetchChat, 3000);
    return () => clearInterval(interval);
  }, [id]);

  // Scroll ke bawah tiap update messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!psikiater) {
    return <div className="text-center py-20 text-gray-500">Memuat...</div>;
  }

  const p = psikiater.psikolog_profile;

  return (
    <section className="py-12 bg-[#f4faf9]">
      <div className="max-w-3xl mx-auto px-6">

        {/* PROFILE PSIKIATER */}
        <div className="bg-white shadow-lg rounded-2xl p-10 border border-gray-200 mb-10">
          <div className="flex flex-col items-center text-center">
            <img
              src={
                p?.foto
                  ? `${psikologImageStorage}/${p.foto}`
                  : "https://via.placeholder.com/300?text=No+Photo"
              }
              alt="Foto Psikiater"
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
            />
            <h1 className="text-3xl font-bold text-[#163737] mt-4">
              {psikiater.name}
            </h1>
            <p className="text-gray-600 mt-1 text-lg">{p?.spesialisasi}</p>
          </div>
          <div className="mt-10 space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong className="text-[#163737]">No. STR:</strong> {p?.no_str}
            </p>
            <p>
              <strong className="text-[#163737]">Pengalaman:</strong>{" "}
              {p?.pengalaman}
            </p>
            <p>
              <strong className="text-[#163737]">Deskripsi:</strong>
              <br />
              {p?.deskripsi}
            </p>
          </div>
        </div>

        {/* CHAT BOX */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#163737] mb-4">
            Live Chat dengan Psikiater
          </h2>

          {/* AREA PESAN */}
          <div className="h-80 overflow-y-auto bg-gray-50 border p-4 rounded-lg mb-5">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-3 ${
                    msg.sender_id === userLogin?.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-xs shadow 
                    ${
                      msg.sender_id === userLogin?.id
                        ? "bg-[#163737] text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.message}
                    <div className="text-[10px] opacity-60 text-right">
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center mt-10">Belum ada pesan.</p>
            )}
            <div ref={scrollRef} />
          </div>

          {/* FORM KIRIM PESAN */}
          <form onSubmit={sendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pesan..."
              className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-teal-200"
            />
            <button
              type="submit"
              className="bg-[#163737] text-white px-6 py-2 rounded-lg hover:bg-[#1c4646]"
            >
              Kirim
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
