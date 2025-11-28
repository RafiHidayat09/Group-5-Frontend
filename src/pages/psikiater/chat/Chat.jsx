import { useEffect, useState } from "react";
import { API } from "../../../_api";

export default function ChatPsikiater() {
  // Ambil info psikiater dari localStorage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const psikiaterId = user?.id;

  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");

  // =====================
  // Load daftar user
  // =====================
  useEffect(() => {
    const loadUserList = async () => {
      try {
        const res = await API.get("/chat/psikiater-users");
        setUserList(res.data.data || []);
      } catch (err) {
        console.error("Gagal memuat daftar user:", err);
      }
    };
    loadUserList();
  }, []);

  // =====================
  // Load chat dengan user yang dipilih
  // =====================
  useEffect(() => {
    if (!selectedUser) return;

    const loadChat = async () => {
      try {
        const res = await API.get(`/chat/room/${psikiaterId}/${selectedUser}`);
        setMessages(res.data.data || []);
      } catch (err) {
        console.error("Gagal memuat chat:", err);
      }
    };

    // Load pertama kali
    loadChat();
    // Auto-refresh setiap 3 detik
    const interval = setInterval(loadChat, 3000);
    return () => clearInterval(interval);
  }, [selectedUser, psikiaterId]);

  // =====================
  // Kirim balasan
  // =====================
  const sendReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    try {
      await API.post("/chat/send", {
        sender_id: psikiaterId,
        receiver_id: selectedUser,
        message: reply,
      });

      setReply("");
      // Refresh chat setelah kirim
      const res = await API.get(`/chat/room/${psikiaterId}/${selectedUser}`);
      setMessages(res.data.data || []);
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar user */}
      <div className="w-64 bg-white shadow-lg border-r">
        <h2 className="p-4 font-bold text-lg border-b">Daftar User</h2>
        <div className="overflow-y-auto h-full">
          {userList.length ? (
            userList.map((u) => (
              <div
                key={u.id}
                onClick={() => setSelectedUser(u.id)}
                className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
                  selectedUser === u.id ? "bg-gray-200" : ""
                }`}
              >
                <p className="font-semibold">{u.name}</p>
                <p className="text-xs text-gray-500">{u.email}</p>
              </div>
            ))
          ) : (
            <p className="p-4 text-gray-500">Belum ada user yang chat.</p>
          )}
        </div>
      </div>

      {/* Area chat */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-white border-b shadow-sm">
          {selectedUser ? (
            <h2 className="font-semibold">Chat dengan User #{selectedUser}</h2>
          ) : (
            <h2 className="text-gray-500">Pilih user untuk memulai chat</h2>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length ? (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender_id === psikiaterId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-xl max-w-xs ${
                    msg.sender_id === psikiaterId
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
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
            <p className="text-gray-400 text-center mt-10">Tidak ada pesan.</p>
          )}
        </div>

        {selectedUser && (
          <form onSubmit={sendReply} className="p-4 bg-white border-t flex gap-3">
            <input
              type="text"
              className="flex-1 border rounded-lg p-3"
              placeholder="Tulis balasan..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-5 rounded-lg">Kirim</button>
          </form>
        )}
      </div>
    </div>
  );
}
