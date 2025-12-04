import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showArticle } from "../../../_services/articles";
import { articleImageStorage } from "../../../_api";

export default function ShowArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  // Fetch Article
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showArticle(id);
        setArticle(data);
      } catch (error) {
        console.error("Gagal memuat artikel:", error);
      }
    };
    fetchData();
  }, [id]);

  // Load Disqus
  useEffect(() => {
    if (!article?.article_id) return;

    const oldScript = document.getElementById("dsq-embed-scr");
    if (oldScript) oldScript.remove();

    window.disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = `article-${article.article_id}`;
    };

    const d = document;
    const s = d.createElement("script");
    s.src = "https://booksales-com.disqus.com/embed.js";
    s.id = "dsq-embed-scr";
    s.setAttribute("data-timestamp", +new Date());
    (d.head || d.body).appendChild(s);

    return () => {
      const thread = document.getElementById("disqus_thread");
      if (thread) thread.innerHTML = "";
    };
  }, [article]);

  if (!article) {
    return (
      <div className="text-center py-20 text-[#163737]">
        Memuat artikel...
      </div>
    );
  }

  return (
    <section className="bg-[#1a3c3c]/20 py-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Judul */}
        <h1 className="text-4xl font-bold text-[#163737] mb-8 text-center">
          {article.judul}
        </h1>

        {/* Meta Info */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-[#1e4d4d]/20 mb-10">
          <p className="text-[#163737]">
            <span className="font-semibold">Kategori:</span> {article.kategori}
          </p>
          <p className="text-[#163737]">
            <span className="font-semibold">Tanggal:</span>{" "}
            {new Date(article.tanggal).toLocaleDateString()}
          </p>
          <p className="text-[#163737]">
            <span className="font-semibold">Penulis:</span> {article.penulis?.name}
          </p>
        </div>

        {/* Gambar */}
        {article.gambar && (
          <div className="mb-10">
            <img
              src={`${articleImageStorage}/${article.gambar}`}
              alt={article.judul}
              className="w-full h-80 object-cover rounded-2xl shadow-md border border-[#1e4d4d]/20"
            />
          </div>
        )}

        {/* Konten */}
        <div
          className="prose prose-lg max-w-none leading-relaxed text-gray-800 
                     bg-white border border-[#1e4d4d]/20 shadow-md 
                     rounded-2xl p-8"
          dangerouslySetInnerHTML={{ __html: article.konten }}
        ></div>

        {/* DISQUS */}
        <div className="mt-14 bg-white shadow-md rounded-2xl border border-[#1e4d4d]/20 p-8">
          <h3 className="text-xl font-semibold text-[#163737] mb-4">
            Diskusi & Komentar
          </h3>
          <div id="disqus_thread"></div>
        </div>

      </div>
    </section>
  );
}
