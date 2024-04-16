import React, { useState } from "react";
import { Toaster } from "sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalProvider from "./context/generalContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <GlobalProvider>
        <Toaster richColors position="top-center" />
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Dashboard loading={loading} setLoading={setLoading} />}
            />
            <Route
              path="/login"
              element={<Login loading={loading} setLoading={setLoading} />}
            />
            <Route
              path="/register"
              element={<Register loading={loading} setLoading={setLoading} />}
            />
          </Routes>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
