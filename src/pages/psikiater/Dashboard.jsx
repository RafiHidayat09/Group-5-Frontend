import { useEffect, useState } from "react";

export default function Dashboard() {
  const [totalResults, setTotalResults] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/api/quiz-results", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setTotalResults(data.length);
        setTotalUsers([...new Set(data.map((r) => r.user.id))].length);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Psikiater</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Total Assessment</p>
          <p className="text-2xl font-bold">{totalResults}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Total User</p>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
      </div>
    </div>
  );
}
