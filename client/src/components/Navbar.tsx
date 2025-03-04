import React, { useState } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [clientsOpen, setClientsOpen] = useState(false); // State for Clients dropdown

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav
        className={`bg-custom-blue text-white fixed top-0 left-0 h-full p-4 shadow-lg flex flex-col transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo & Collapse Button */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="flex items-center space-x-4">
              <img src="/AutoTech.svg" alt="Logo" className="h-16 w-auto" />
              <p className="text-black font-semibold">Purchase Order</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white transition-all duration-300"
          >
            {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-6">
          <Link to="/" className="flex items-center space-x-2 hover:text-gray-300">
            <i className="fas fa-tachometer-alt"></i>
            {!collapsed && <span>Dashboard</span>}
          </Link>

          {/* Clients Dropdown */}
          <div>
            <button
              onClick={() => setClientsOpen(!clientsOpen)}
              className="flex items-center space-x-2 hover:text-gray-300 w-full text-left"
            >
              <Link to="/Clients" className="flex items-center space-x-2 hover:text-gray-300">
                <i className="fas fa-users"></i>
                {!collapsed && <span>Clients</span>}
                {!collapsed && (clientsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
              </Link>
            </button>
            
            {/* Dropdown Items */}
            {!collapsed && clientsOpen && (
              <div className="ml-6 space-y-2 mt-2">
                <Link to="/ClientList" className="flex items-center space-x-2 hover:text-gray-300">
                  <i className="fas fa-list"></i>
                  <span>Client List</span>
                </Link>
              </div>
            )}
          </div>



           {/* LoanStatement Dropdown */}
           <div>
            <button
              onClick={() => setClientsOpen(!clientsOpen)}
              className="flex items-center space-x-2 hover:text-gray-300 w-full text-left"
            >
              <Link to="/LoanStatement" className="flex items-center space-x-2 hover:text-gray-300">
                <i className="fas fa-users"></i>
                {!collapsed && <span>Loan Statement</span>}
                {!collapsed && (clientsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
              </Link>
            </button>
            
            {/* Dropdown Items */}
            {!collapsed && clientsOpen && (
              <div className="ml-6 space-y-2 mt-2">
                <Link to="/LoanStatementReport" className="flex items-center space-x-2 hover:text-gray-300">
                  <i className="fas fa-list"></i>
                  <span>Loan Statement Report</span>
                </Link>
              </div>
            )}
          </div>

          {/* Settings Link */}
          <Link to="/Settings" className="flex items-center space-x-2 hover:text-gray-300">
            <Settings size={20} />
            {!collapsed && <span>Settings</span>}
          </Link>
        </div>

        {/* Footer */}
        <div className={`mt-auto flex items-center ${collapsed ? "text-center" : "space-x-2"}`}>
          <img src="/AutoTech.svg" alt="Logo" className="h-6 w-auto" />
          <p className="text-xs text-black-300">Powered by AutoTech Group Bw</p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
