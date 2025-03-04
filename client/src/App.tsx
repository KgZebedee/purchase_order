import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./views/Dashboard";
import LoanStatement from "./views/LoanStatement";
import Clients from "./views/Clients";
import ClientList from "./views/ClientList";
import Login from "./views/Login";
import Settings from "./views/Settings";
import Adminregistration from "./views/Adminregistration";
import LoanStatementReport from "./views/LoanStatementReport";

const MainLayout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/Adminregistration"; // Also hide on /login
  

  return (
    <div className="flex">
      {!hideNavbar && <Navbar />}

      <div className={`${hideNavbar ? "" : "ml-64"} flex-1`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />  {/* ✅ Explicit login route */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/LoanStatement" element={<LoanStatement />} />
          <Route path="/LoanStatementReport" element={<LoanStatementReport/>}/>
          <Route path="/Clients" element={<Clients />} />
          <Route path="/ClientList" element={<ClientList />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Adminregistration" element={<Adminregistration/>}/>
        </Routes>
      </div>
    </div>
  );
};


const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

export default App;
