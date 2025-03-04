import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Upload, Edit, Trash2, Check, X } from "lucide-react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf"; // Import jsPDF

const LoanStatementReport: React.FC = () => {
  const [loanStatements, setLoanStatements] = useState<any[]>([]);
  const [selectedStatements, setSelectedStatements] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedStatement, setEditedStatement] = useState<any>(null);

  // Handle file upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        const binaryStr = evt.target.result;
        const wb = XLSX.read(binaryStr, { type: "binary" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        setLoanStatements(data);
      };
      reader.readAsBinaryString(file);
    }
  };

  // Handle Delete
  const handleDelete = (index: number) => {
    setLoanStatements(loanStatements.filter((_, i) => i !== index));
  };

  // Handle Delete All Selected
  const handleDeleteAll = () => {
    setLoanStatements(loanStatements.filter((_, i) => !selectedStatements.includes(i)));
  };

  // Handle Edit
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedStatement({ ...loanStatements[index] });
  };

  // Handle Save after Edit
  const handleSave = () => {
    const updatedStatements = [...loanStatements];
    updatedStatements[editingIndex as number] = editedStatement;
    setLoanStatements(updatedStatements);
    setEditingIndex(null);
  };

  // Handle Cancel Edit
  const handleCancel = () => {
    setEditingIndex(null);
  };

  // Handle Select
  const handleSelect = (index: number) => {
    const updatedSelected = [...selectedStatements];
    if (updatedSelected.includes(index)) {
      updatedSelected.splice(updatedSelected.indexOf(index), 1);
    } else {
      updatedSelected.push(index);
    }
    setSelectedStatements(updatedSelected);
  };

  // Filter loan statements based on search input
  const filteredStatements = loanStatements.filter((statement: any) =>
    `${statement.procuringEntity} ${statement.client}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Generate PDF for a loan statement
  const generatePDF = (statement: any) => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Loan Statement Report", 20, 20);

    // Add details from the record
    doc.setFontSize(12);
    doc.text(`Added Date: ${statement.addedDate}`, 20, 30);
    doc.text(`Procuring Entity: ${statement.procuringEntity}`, 20, 40);
    doc.text(`Client: ${statement.client}`, 20, 50);
    doc.text(`PO Number: ${statement.poNumber}`, 20, 60);
    doc.text(`Client Profit: ${statement.clientProfit}`, 20, 70);
    doc.text(`Our Profit: ${statement.ourProfit}`, 20, 80);
    doc.text(`PO Amount: ${statement.poAmount}`, 20, 90);

    // Download the PDF
    doc.save(`Loan_Statement_${statement.poNumber}.pdf`);
  };

  return (
    <div className="bg-white-400 min-h-screen flex justify-center items-center p-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg p-6 border-2 border-custom-blue">
        <h1 className="text-3xl font-bold text-center text-sky-500 mb-6">Loan Statement Report</h1>

        {/* Search Bar */}
        <div className="relative flex items-center mb-6">
          <Search className="absolute left-3 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search by Procuring Entity or Client..."
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
            <input type="file" accept=".csv, .xlsx" onChange={handleUpload} className="hidden" />
          </label>
        </div>

        {/* Loan Statements Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (selectedStatements.length === loanStatements.length) {
                        setSelectedStatements([]);
                      } else {
                        setSelectedStatements(loanStatements.map((_, index) => index));
                      }
                    }}
                    checked={selectedStatements.length === loanStatements.length}
                  />
                </th>
                <th className="px-4 py-2 border">Added Date</th>
                <th className="px-4 py-2 border">Procuring Entity</th>
                <th className="px-4 py-2 border">Client</th>
                <th className="px-4 py-2 border">PO Number</th>
                <th className="px-4 py-2 border">Client Profit</th>
                <th className="px-4 py-2 border">Our Profit</th>
                <th className="px-4 py-2 border">PO Amount</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStatements.length > 0 ? (
                filteredStatements.map((statement, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border text-center">
                      <input
                        type="checkbox"
                        checked={selectedStatements.includes(index)}
                        onChange={() => handleSelect(index)}
                      />
                    </td>
                    {/* Editable Fields */}
                    {editingIndex === index ? (
                      <>
                        <td className="px-4 py-2 border">
                          <input
                            type="text"
                            value={editedStatement.addedDate}
                            onChange={(e) => setEditedStatement({ ...editedStatement, addedDate: e.target.value })}
                            className="w-full border p-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="text"
                            value={editedStatement.procuringEntity}
                            onChange={(e) => setEditedStatement({ ...editedStatement, procuringEntity: e.target.value })}
                            className="w-full border p-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="text"
                            value={editedStatement.client}
                            onChange={(e) => setEditedStatement({ ...editedStatement, client: e.target.value })}
                            className="w-full border p-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="text"
                            value={editedStatement.poNumber}
                            onChange={(e) => setEditedStatement({ ...editedStatement, poNumber: e.target.value })}
                            className="w-full border p-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="number"
                            value={editedStatement.clientProfit || ""}
                            onChange={(e) => setEditedStatement({ ...editedStatement, clientProfit: e.target.value })}
                            className="w-full border p-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="number"
                            value={editedStatement.ourProfit || ""}
                            onChange={(e) => setEditedStatement({ ...editedStatement, ourProfit: e.target.value })}
                            className="w-full border p-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="number"
                            value={editedStatement.poAmount || ""}
                            onChange={(e) => setEditedStatement({ ...editedStatement, poAmount: e.target.value })}
                            className="w-full border p-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2 border text-center">
                          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">
                            <Check size={16} />
                          </button>
                          <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                            <X size={16} />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2 border">{statement.addedDate}</td>
                        <td className="px-4 py-2 border">{statement.procuringEntity}</td>
                        <td className="px-4 py-2 border">{statement.client}</td>
                        <td className="px-4 py-2 border">{statement.poNumber}</td>
                        <td className="px-4 py-2 border">{statement.clientProfit}</td>
                        <td className="px-4 py-2 border">{statement.ourProfit}</td>
                        <td className="px-4 py-2 border">{statement.poAmount}</td>
                        <td className="px-4 py-2 border text-center">
                          <button
                            onClick={() => handleEdit(index)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button
                            onClick={() => generatePDF(statement)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
                          >
                            Generate PDF
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete All Button */}
        <div className="mt-6">
          <button
            onClick={handleDeleteAll}
            className="bg-red-500 text-white px-6 py-2 rounded-lg"
          >
            Delete All Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanStatementReport;
