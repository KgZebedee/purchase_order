const express = require('express');

const loanStatementController = require('../controllers/loanStatementController');
const router = express.Router();
router.post('/', loanStatementController.createLoanStatement);
router.get('/', loanStatementController.getLoanStatements);
router.get('/:id', loanStatementController.getLoanStatementById);
router.put('/:id', loanStatementController.updateLoanStatement);
router.delete('/:id', loanStatementController.deleteLoanStatement);

module.exports = router;

