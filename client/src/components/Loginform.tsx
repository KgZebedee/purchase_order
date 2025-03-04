import React, { useState } from "react";

const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const result = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", result.token); // Store JWT token
        console.log("Logged in successfully");
        // Redirect to dashboard or homepage
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  );
};

export default Loginform;
