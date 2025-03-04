const mongoose = require('mongoose');

const loanStatementSchema = new mongoose.Schema({
  addedDate: { type: Date, required: true },
  procuringEntity: { type: String, required: true },
  client: { type: String, required: true },
  toDate: { type: Date, required: true },
  poNumber: { type: Number, required: true },
  transactions: [
    {
      fromDate: { type: Date, required: true },
      description: { type: String, required: true },
      quotation: { type: Number, required: true },
      duration: { type: Number, required: true },
      monthlyInterest: { type: Number, required: true },
      dailyRate: { type: Number, required: true },
      overdue: { type: Number, required: true },
    },
  ],
  poAmounts: [{ type: Number, required: true }],
  interests: {
    nonCompliantBankFees: { type: Number, required: true },
    forexRiskExchange: { type: Number, required: true },
    administrativeFee: { type: Number, required: true },
  },
  subTotal: {
    amountLoanedOut: { type: Number, required: true },
    calculatedInterest: { type: Number, required: true },
    total: { type: Number, required: true },
    totalOverdue: { type: Number, required: true },
  },
  balances: {
    grandTotal: { type: Number, required: true },
    totalPoAmount: { type: Number, required: true },
    clientProfit: { type: Number, required: true },
    ourProfit: { type: Number, required: true },
  },
});

const LoanStatement = mongoose.model('LoanStatement', loanStatementSchema);

module.exports = LoanStatement;
