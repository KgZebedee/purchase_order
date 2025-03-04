import React, { useState } from "react";
import axios from "axios";

const ClientForm = ({ onClientAdded }) => {
  const [clientData, setClientData] = useState({
    companyName: "",
    address: "",
    email: "",
    telephone: "",
    cell: "",
    contactPersonName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/clients", clientData);
      onClientAdded(response.data); // Update parent state
      setClientData({ companyName: "", address: "", email: "", telephone: "", cell: "", contactPersonName: "" });
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white shadow-md rounded-lg w-full max-w-2xl"> 
        {/* Increased max width to 2xl */}
        <h2 className="text-3xl font-bold text-center text-sky-500 mb-6">Add New Client</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {["companyName", "contactPersonName", "address", "email", "telephone", "cell"].map((field) => (
            <div key={field}>
              <label className="block text-lg font-medium text-gray-700">
                {field.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={clientData[field as keyof typeof clientData]}
                onChange={handleChange}
                className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg text-lg"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
