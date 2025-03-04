import React, { useState } from "react";

const LoanStatement: React.FC = () => {
  const [transactions, setTransactions] = useState([
    {
      fromDate: "",
      description: "",
      quotation: "",
      duration: "",
      monthlyInterest: "",
      dailyRate: "",
      overdue: "",
    },
  ]);

  const [poAmounts, setPoAmounts] = useState<number[]>([]);
  const [interests, setInterests] = useState({
    nonCompliantBankFees: "",
    forexRiskExchange: "",
    administrativeFee: "",
  });

  const addTransactionRow = () => {
    setTransactions([
      ...transactions,
      {
        fromDate: "",
        description: "",
        quotation: "",
        duration: "",
        monthlyInterest: "",
        dailyRate: "",
        overdue: "",
      },
    ]);
  };

  const addPoAmountRow = () => {
    setPoAmounts([...poAmounts, 0]); // Start with 0 as default PO Amount
  };

  const handlePoAmountChange = (index: number, value: string) => {
    const updatedPoAmounts = [...poAmounts];
    updatedPoAmounts[index] = Number(value);
    setPoAmounts(updatedPoAmounts);
  };

  const handleTransactionChange = (index: number, field: string, value: string) => {
    const updatedTransactions = [...transactions];
    updatedTransactions[index][field] = value;
    setTransactions(updatedTransactions);
  };
  const handleInterestChange = (field: string, value: string) => {
    setInterests((prevInterests) => ({
      ...prevInterests,
      [field]: value,
    }));
  };
  

  return (
    <div className="bg-sky-400 min-h-screen flex justify-center items-center p-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-sky-500 mb-6">Loan Statement</h1>

        {/* Loan Statement Form */}
        <form className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium mb-2">Added Date</label>
              <input type="date" className="border rounded p-2 text-sm" />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-2">Procuring Entity</label>
              <input type="text" className="border rounded p-2 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium mb-2">Client</label>
              <input type="text" className="border rounded p-2 text-sm" />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-2">To Date</label>
              <input type="date" className="border rounded p-2 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium mb-2">PO Number</label>
              <input type="text" className="border rounded p-2 text-sm" />
            </div>
          </div>

           {/* Interest Section */}
           <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Interest</h3>
            <div className="flex flex-col">
              <label className="font-medium mb-2">Interest</label>
              <input
                type="number"
                className="border rounded p-2 text-sm"
                onChange={(e) => handleInterestChange("interest", e.target.value)}
              />
            </div>
          </div>

          {/* PO Amount Table */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">PO Amounts</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border">PO Amount</th>
                  </tr>
                </thead>
                <tbody>
  {poAmounts.map((amount, index) => (
    <tr key={index}>
      <td className="px-4 py-2 border">
        <input
          type="number"
          value={amount}
          onChange={(e) => handlePoAmountChange(index, e.target.value)}
          className="border rounded p-2 text-sm"
        />
      </td>
      <td className="px-4 py-2 border text-center">
        <button
          type="button"
          onClick={() => {
            const updatedPoAmounts = poAmounts.filter((_, i) => i !== index);
            setPoAmounts(updatedPoAmounts);
          }}
          className="text-red-500"
        >
          ×
        </button>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
            <button
              type="button"
              onClick={addPoAmountRow}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add PO Amount Row
            </button>
          </div>


          {/* Interests Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Interests</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium mb-2">Non Compliant Bank Account Fees - Non Interest</label>
                <input
                  type="number"
                  className="border rounded p-2 text-sm"
                  onChange={(e) =>
                    handleInterestChange("nonCompliantBankFees", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-2">Forex Risk Exchange - Non Interest</label>
                <input
                  type="number"
                  className="border rounded p-2 text-sm"
                  onChange={(e) =>
                    handleInterestChange("forexRiskExchange", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-2">Administrative Fee</label>
                <input
                  type="number"
                  className="border rounded p-2 text-sm"
                  onChange={(e) => handleInterestChange("administrativeFee", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Transaction Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Transaction</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border">From Date</th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border">Quotation</th>
                    <th className="px-4 py-2 border">Duration (Days)</th>
                    <th className="px-4 py-2 border">Monthly Interest</th>
                    <th className="px-4 py-2 border">Daily Rate</th>
                    <th className="px-4 py-2 border">Overdue</th>
                  </tr>
                </thead>
                <tbody>
  {transactions.map((transaction, index) => (
    <tr key={index}>
      <td className="px-4 py-2 border">
        <input
          type="date"
          value={transaction.fromDate}
          onChange={(e) => handleTransactionChange(index, "fromDate", e.target.value)}
          className="border rounded p-2 text-sm"
        />
      </td>
      <td className="px-4 py-2 border">
        <input
          type="text"
          value={transaction.description}
          onChange={(e) => handleTransactionChange(index, "description", e.target.value)}
          className="border rounded p-2 text-sm"
        />
      </td>
      <td className="px-4 py-2 border">
        <input
          type="number"
          value={transaction.quotation}
          onChange={(e) => handleTransactionChange(index, "quotation", e.target.value)}
          className="border rounded p-2 text-sm"
        />
      </td>
      <td className="px-4 py-2 border">
        <input
          type="number"
          value={transaction.duration}
          onChange={(e) => handleTransactionChange(index, "duration", e.target.value)}
          className="border rounded p-2 text-sm"
        />
      </td>
      <td className="px-4 py-2 border">
        <input
          type="number"
          value={transaction.monthlyInterest}
          onChange={(e) => handleTransactionChange(index, "monthlyInterest", e.target.value)}
          className="border rounded p-2 text-sm"
        />
      </td>
      <td className="px-4 py-2 border">
        <input
          type="number"
          value={transaction.dailyRate}
          onChange={(e) => handleTransactionChange(index, "dailyRate", e.target.value)}
          className="border rounded p-2 text-sm"
        />
      </td>
      <td className="px-4 py-2 border">
        <input
          type="number"
          value={transaction.overdue}
          onChange={(e) => handleTransactionChange(index, "overdue", e.target.value)}
          className="border rounded p-2 text-sm"
        />
      </td>
      <td className="px-4 py-2 border text-center">
        <button
          type="button"
          onClick={() => {
            const updatedTransactions = transactions.filter((_, i) => i !== index);
            setTransactions(updatedTransactions);
          }}
          className="text-red-500"
        >
          ×
        </button>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
            <button
              type="button"
              onClick={addTransactionRow}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Transaction Row
            </button>
          </div>

          {/* Sub Total Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Sub Total</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium mb-2">Amount Loaned Out</label>
                <input type="number" className="border rounded p-2 text-sm" />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-2">Calculated Interest</label>
                <input type="number" className="border rounded p-2 text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium mb-2">Total</label>
                <input type="number" className="border rounded p-2 text-sm" />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-2">Total Overdue</label>
                <input type="number" className="border rounded p-2 text-sm" />
              </div>
            </div>
          </div>

          {/* Balances Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Balances</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium mb-2">Grand Total</label>
                <input type="number" className="border rounded p-2 text-sm" />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-2">Total PO Amount</label>
                <input type="number" className="border rounded p-2 text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium mb-2">Client Profit</label>
                <input type="number" className="border rounded p-2 text-sm" />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-2">Our Profit</label>
                <input type="number" className="border rounded p-2 text-sm" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-green-500 text-white px-6 py-3 rounded"
          >
            Submit Loan Statement
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanStatement;








