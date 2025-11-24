import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PsikiaterLayout from "./layouts/PsikiaterLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import GoogleAuthCallback from "./pages/auth/GoogleAuthCallback";
import Forums from "./pages/Forums";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import PsychologistList from "./pages/PsychologistList";
import Wallet from "./pages/Wallet";
import ChatMain from "./pages/ChatMain";
import PaymentGateway from "./pages/PaymentGateway";
import Articles from "./pages/Articles";
import ShowArticle from "./pages/ShowArticle";
import Dashboard from "./pages/psikiater/Dashboard";
import QuizResults from "./pages/psikiater/QuizResults";
import UserDetail from "./pages/psikiater/UserDetail";
import Profile from "./pages/psikiater/Profile";
import PsikiaterArticles from "./pages/psikiater/Articles";
import CreateArticles from "./pages/psikiater/CreateArticles";
import EditArticles from "./pages/psikiater/EditArticles";
import AdminDashboard from "./pages/admin/Dashboard";
import PsikiaterIndex from "./pages/admin/PsikiaterIndex";
import CreatePsikiater from "./pages/admin/CreatePsikiater";
import EditPsikiater from "./pages/admin/EditPsikiater";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* =======================
            Public Layout Routes (Navbar & Footer)
        ======================== */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} /> {/* path="/" */}
          
          {/* --- Fitur Tambahan dari Branch Rafi --- */}
          <Route path="forums" element={<Forums />} />
          <Route path="konsultasi" element={<PsychologistList />} />
          <Route path="wallet" element={<Wallet />} />

          {/* --- Fitur Artikel (Trial3) --- */}
          <Route path="artikel" element={<Articles />} />
          <Route path="articles/show/:id" element={<ShowArticle />} />

          {/* --- Protected User Routes (Butuh Login) --- */}
          {/* Quiz & Result dibungkus ProtectedRoute agar aman */}
          <Route
            path="quiz"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="result"
            element={
              <ProtectedRoute>
                <ResultPage />
              </ProtectedRoute>
            }
          />
        </Route>


        {/* =======================
            Auth Routes
        ======================== */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* Callback Google dari Rafi */}
        <Route path="auth/callback" element={<GoogleAuthCallback />} />


        {/* =======================
            Chat & Payment (Dari Rafi)
        ======================== */}
        {/* Note: Ditaruh di luar PublicLayout sesuai kode asli Rafi. 
            Jika ingin pakai Navbar, pindahkan ke dalam blok PublicLayout di atas. 
            Sebaiknya dibungkus ProtectedRoute juga jika harus login. */}
        <Route 
            path="chat" 
            element={
                <ProtectedRoute>
                    <ChatMain />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="chat/:consultationId" 
            element={
                <ProtectedRoute>
                    <ChatMain />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="payment/:consultationId" 
            element={
                <ProtectedRoute>
                    <PaymentGateway />
                </ProtectedRoute>
            } 
        />


        {/* =======================
            Psikiater Routes (Protected role="psikiater")
        ======================== */}
        <Route
          path="/psikiater"
          element={
            <ProtectedRoute role="psikiater">
              <PsikiaterLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="results" element={<QuizResults />} />
          <Route path="results/:id" element={<UserDetail />} />
          <Route path="profile" element={<Profile />} />

          {/* CRUD ARTIKEL PSIKIATER */}
          <Route path="artikel" element={<PsikiaterArticles />} />
          <Route path="articles/create" element={<CreateArticles />} />
          <Route path="articles/edit/:id" element={<EditArticles />} />
        </Route>


        {/* =======================
            Admin Routes
        ======================== */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="psikiater" element={<PsikiaterIndex />} />
          <Route path="psikiater/create" element={<CreatePsikiater />} />
          <Route path="psikiater/edit/:id" element={<EditPsikiater />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;