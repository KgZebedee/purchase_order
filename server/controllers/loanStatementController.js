const LoanStatement = require('../models/loanStatementModel');

const calculateLoanStatement = (transactions, interests, poAmounts) => {
  let amountLoanedOut = 0;
  let totalOverdue = 0;
  let ourProfit = 0;

  transactions.forEach((transaction) => {
    amountLoanedOut += transaction.quotation;

    // Monthly interest
    const monthlyInterest = transaction.quotation * (transaction.monthlyInterest / 100);
    const dailyRate = monthlyInterest / 30;

    // Overdue calculation
    if (transaction.duration > 30) {
      const overdueDuration = transaction.duration - 30;
      const overdue = dailyRate * overdueDuration;
      transaction.overdue = overdue;
      totalOverdue += overdue;
    } else {
      transaction.overdue = 0;
    }

    transaction.dailyRate = dailyRate;
    transaction.monthlyInterest = monthlyInterest;
  });

  // Calculate company Profit
  ourProfit = amountLoanedOut - interests.nonCompliantBankFees - interests.forexRiskExchange - interests.administrativeFee + totalOverdue;

  // Calculate Grand Total
  const grandTotal = interests.nonCompliantBankFees + interests.forexRiskExchange + interests.administrativeFee + totalOverdue;

  const totalPoAmount = poAmounts.reduce((acc, amount) => acc + amount, 0);

  const clientProfit = amountLoanedOut - totalPoAmount;

  return {
    amountLoanedOut,
    totalOverdue,
    ourProfit,
    grandTotal,
    totalPoAmount,
    clientProfit,
  };
};

const createLoanStatement = async (req, res) => {
  try {
    const { transactions, interests, poAmounts, clientId } = req.body;

    // 🔹 Fetch the most recent loan statement for the given client
    const lastStatement = await LoanStatement.findOne({ clientId }).sort({ addedTime: -1 });

    const calculations = calculateLoanStatement(transactions, interests, poAmounts);

    // 🔹 If the last statement exists and client profit is negative, insert a "Balance Brought Forward"
    if (lastStatement && lastStatement.balances.clientProfit < 0) {
      transactions.push({
        quotation: lastStatement.balances.clientProfit,
        description: 'Balance Brought Forward',
        monthlyInterest: 0,
        clientId,
      });
    }

    const loanStatement = new LoanStatement({
      clientId,
      transactions,
      interests,
      poAmounts,
      subTotal: {
        amountLoanedOut: calculations.amountLoanedOut,
        calculatedInterest: calculations.totalOverdue,
        total: calculations.amountLoanedOut + calculations.totalOverdue,
        totalOverdue: calculations.totalOverdue,
      },
      balances: {
        grandTotal: calculations.grandTotal,
        totalPoAmount: calculations.totalPoAmount,
        clientProfit: calculations.clientProfit,
        ourProfit: calculations.ourProfit,
      },
    });

    await loanStatement.save();
    res.status(201).json(loanStatement);
  } catch (error) {
    console.error('Error creating loan statement:', error);
    res.status(500).json({ error: 'Error creating loan statement' });
  }
};

const getLoanStatements = async (req, res) => {
  try {
    const loanStatements = await LoanStatement.find();
    res.status(200).json(loanStatements);
  } catch (error) {
    console.error('Error fetching loan statements:', error);
    res.status(500).json({ error: 'Error fetching loan statements' });
  }
};

const getLoanStatementById = async (req, res) => {
  try {
    const loanStatement = await LoanStatement.findById(req.params.id);
    if (!loanStatement) {
      return res.status(404).json({ error: 'Loan Statement not found' });
    }
    res.status(200).json(loanStatement);
  } catch (error) {
    console.error('Error fetching loan statement by ID:', error);
    res.status(500).json({ error: 'Error fetching loan statement by ID' });
  }
};

const updateLoanStatement = async (req, res) => {
  try {
    const updatedLoanStatement = await LoanStatement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLoanStatement) {
      return res.status(404).json({ error: 'Loan Statement not found' });
    }
    res.status(200).json(updatedLoanStatement);
  } catch (error) {
    console.error('Error updating loan statement:', error);
    res.status(500).json({ error: 'Error updating loan statement' });
  }
};

const deleteLoanStatement = async (req, res) => {
  try {
    const deletedLoanStatement = await LoanStatement.findByIdAndDelete(req.params.id);
    if (!deletedLoanStatement) {
      return res.status(404).json({ error: 'Loan Statement not found' });
    }
    res.status(200).json({ message: 'Loan Statement deleted successfully' });
  } catch (error) {
    console.error('Error deleting loan statement:', error);
    res.status(500).json({ error: 'Error deleting loan statement' });
  }
};

module.exports = {
  createLoanStatement,
  getLoanStatements,
  getLoanStatementById,
  updateLoanStatement,
  deleteLoanStatement,
};
