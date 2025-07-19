import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Landing from "./pages/landing/Landing";
import Subscriptions from "./pages/subscriptions/Subscriptions"; // Import the new page
import RequireAuth from "./components/RequireAuth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.scss";

const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <RequireAuth>
              <Subscriptions />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
