import React from "react";
import ClientForm from "../components/ClientForm";

const Clients = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-5xl"> {/* Increased max width for better layout */}
        <ClientForm onClientAdded={() => {}} /> {/* No need to handle client list */}
      </div>
    </div>
  );
};

export default Clients;
