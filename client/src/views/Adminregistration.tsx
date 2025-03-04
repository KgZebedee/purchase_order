import React from "react";
import AdminRegistrationForm from "../components/AdminRegistrationForm";

const Adminregistration = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Registration</h2>
        <AdminRegistrationForm />
      </div>
    </div>
  );
};

export default Adminregistration;
