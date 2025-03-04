import React, { useState } from "react";
import axios from "axios";

const AdminRegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register-admin", {
        name,
        email,
        password,
      });

      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Failed to register admin");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-red-500">{message}</h2>

      <div>
        <label className="block text-gray-600 text-sm mb-1">Name</label>
        <input
          type="text"
          className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-gray-600 text-sm mb-1">Email</label>
        <input
          type="email"
          className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-gray-600 text-sm mb-1">Password</label>
        <input
          type="password"
          className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-gray-600 text-sm mb-1">Confirm Password</label>
        <input
          type="password"
          className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
        Register
      </button>
    </form>
  );
};

export default AdminRegistrationForm;
