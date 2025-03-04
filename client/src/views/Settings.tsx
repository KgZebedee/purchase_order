import React, { useState, useEffect } from "react";
import { Edit, Trash, Plus, Save, X, UploadCloud } from "lucide-react";
import axios from "axios";

const Settings = () => {
  const [users, setUsers] = useState([]);
  const [company, setCompany] = useState({ name: "", email: "", address: "", phone: "", logoUrl: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });

  useEffect(() => {
    fetchUsers();
    fetchCompanyDetails();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/company");
      setCompany(response.data);
    } catch (error) {
      console.error("Error fetching company details", error);
    }
  };

  const handleSaveUser = async () => {
    try {
      if (editingUser) {
        await axios.put(`http://localhost:5000/api/users/${editingUser.id}`, newUser);
      } else {
        await axios.post("http://localhost:5000/api/users", newUser);
      }
      setModalOpen(false);
      setNewUser({ name: "", email: "", role: "user" });
      fetchUsers();
    } catch (error) {
      console.error("Error saving user", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleCompanyUpdate = async () => {
    try {
      await axios.put("http://localhost:5000/api/company", company);
    } catch (error) {
      console.error("Error updating company details", error);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview the logo before uploading
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompany({ ...company, logoUrl: reader.result });
      };
      reader.readAsDataURL(file);

      // Prepare the file for uploading
      const formData = new FormData();
      formData.append("logo", file);

      try {
        // Send the file to the backend (replace with your upload endpoint)
        const response = await axios.post("http://localhost:5000/api/upload-logo", formData);
        setCompany({ ...company, logoUrl: response.data.logoUrl }); // Update logoUrl with response from the server
      } catch (error) {
        console.error("Error uploading logo", error);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-center">Settings</h2>

      {/* User Management Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold">User Management</h3>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          >
            <Plus size={18} className="mr-2" /> Add User
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center hover:bg-gray-100">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => {
                      setEditingUser(user);
                      setNewUser({ name: user.name, email: user.email, role: user.role });
                      setModalOpen(true);
                    }}
                    className="text-blue-600 mr-2"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Company Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Company Details</h3>
        
        {/* Company Logo Section */}
        <div className="mb-4 flex items-center space-x-4">
          <img
            src={company.logoUrl || '/path/to/default-logo.png'}
            alt="Company Logo"
            className="w-16 h-16 object-cover"
          />
          <label htmlFor="logo-upload" className="bg-gray-600 text-white px-4 py-2 rounded cursor-pointer">
            <UploadCloud size={18} className="mr-2" />
            Upload Logo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
            id="logo-upload"
          />
        </div>

        <input
          type="text"
          placeholder="Company Name"
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
          className="w-full p-2 border mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={company.email}
          onChange={(e) => setCompany({ ...company, email: e.target.value })}
          className="w-full p-2 border mb-2"
        />
        <input
          type="text"
          placeholder="Address"
          value={company.address}
          onChange={(e) => setCompany({ ...company, address: e.target.value })}
          className="w-full p-2 border mb-2"
        />
        <input
          type="text"
          placeholder="Phone"
          value={company.phone}
          onChange={(e) => setCompany({ ...company, phone: e.target.value })}
          className="w-full p-2 border mb-2"
        />
        <button
          onClick={handleCompanyUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>

      {/* Add/Edit User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{editingUser ? "Edit User" : "Add User"}</h3>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-2 border mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full p-2 border mb-2"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full p-2 border mb-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setModalOpen(false)} className="text-red-600">
                <X size={20} />
              </button>
              <button onClick={handleSaveUser} className="bg-blue-600 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
 