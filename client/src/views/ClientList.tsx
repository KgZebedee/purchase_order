import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Upload, Edit, Trash2, Check, X } from "lucide-react";
import * as XLSX from "xlsx";
import Papa from "papaparse";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedClient, setEditedClient] = useState<any>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  // Filter clients based on search input
  const filteredClients = clients.filter((client: any) =>
    `${client.companyName} ${client.contactPersonName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;

      if (file.name.endsWith(".csv")) {
        Papa.parse(data as string, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setClients((prevClients) => [...prevClients, ...result.data]);
          },
        });
      } else if (file.name.endsWith(".xlsx")) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setClients((prevClients) => [...prevClients, ...parsedData]);
      }
    };

    if (file.name.endsWith(".csv")) {
      reader.readAsText(file);
    } else if (file.name.endsWith(".xlsx")) {
      reader.readAsBinaryString(file);
    }
  };

  // Handle Delete
  const handleDelete = (index: number) => {
    const updatedClients = clients.filter((_, i) => i !== index);
    setClients(updatedClients);
  };

  // Handle Edit
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedClient({ ...clients[index] });
  };

  // Handle Save after Edit
  const handleSave = (index: number) => {
    const updatedClients = [...clients];
    updatedClients[index] = editedClient;
    setClients(updatedClients);
    setEditingIndex(null);
  };

  // Handle Cancel Edit
  const handleCancel = () => {
    setEditingIndex(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
     <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 border-2 border-custom-blue">

        <h2 className="text-3xl font-bold text-center text-sky-500 mb-6">Client Reports</h2>

        {/* Search Bar */}
        <div className="relative flex items-center mb-6">
          <Search className="absolute left-3 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search by Company Name or Contact Person..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* File Upload Section */}
        <div className="mb-6 flex items-center space-x-4">
          <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center">
            <Upload className="mr-2" size={18} />
            Upload Excel/CSV
            <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Client Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Company Name</th>
              <th className="border border-gray-300 px-4 py-2">Contact Person</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Contact</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client: any, index) => (
                <tr key={index} className="text-center hover:bg-gray-100">
                  {/* Editable Fields */}
                  {editingIndex === index ? (
                    <>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          value={editedClient.companyName}
                          onChange={(e) => setEditedClient({ ...editedClient, companyName: e.target.value })}
                          className="w-full border p-1 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          value={editedClient.contactPersonName}
                          onChange={(e) => setEditedClient({ ...editedClient, contactPersonName: e.target.value })}
                          className="w-full border p-1 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          value={editedClient.address}
                          onChange={(e) => setEditedClient({ ...editedClient, address: e.target.value })}
                          className="w-full border p-1 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="email"
                          value={editedClient.email}
                          onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value })}
                          className="w-full border p-1 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          value={editedClient.telephone || editedClient.cell}
                          onChange={(e) => setEditedClient({ ...editedClient, telephone: e.target.value })}
                          className="w-full border p-1 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                        <Check onClick={() => handleSave(index)} className="text-green-600 cursor-pointer" size={20} />
                        <X onClick={handleCancel} className="text-red-600 cursor-pointer" size={20} />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-300 px-4 py-2">{client.companyName}</td>
                      <td className="border border-gray-300 px-4 py-2">{client.contactPersonName}</td>
                      <td className="border border-gray-300 px-4 py-2">{client.address}</td>
                      <td className="border border-gray-300 px-4 py-2">{client.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{client.telephone || client.cell}</td>
                      <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                        <Edit onClick={() => handleEdit(index)} className="text-blue-600 cursor-pointer" size={20} />
                        <Trash2 onClick={() => handleDelete(index)} className="text-red-600 cursor-pointer" size={20} />
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
