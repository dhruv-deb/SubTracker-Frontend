import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
const Landing = lazy(() => import("./pages/landing/Landing"));
const Login = lazy(() => import("./pages/login/Login"));
const SignUp = lazy(() => import("./pages/signup/Signup"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Subscriptions = lazy(() => import("./pages/subscriptions/Subscriptions"));
const RequireAuth = lazy(() => import("./components/RequireAuth"));
import Header from "./components/Header/Header";
import { Toaster } from 'react-hot-toast';
import Footer from "./components/Footer/Footer";
import "./App.scss";

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
    <p>Loading page...</p>
  </div>
);

const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
      <Toaster position="top-center" reverseOrder={false} />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
}

export default App;
