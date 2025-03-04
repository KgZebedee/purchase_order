const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const clientRoutes = require('./routes/clientRoutes'); 
const loanStatementRoutes = require('./routes/loanStatementRoutes');

dotenv.config();

const app = express();
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json()); 

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://automationbtb:uOgxbhjSa6NvDV6W@cluster0.op4wr.mongodb.net/purchaseOrder?retryWrites=true&w=majority")
  .then(() => console.log(process.env.MONGODB_URI))
  .catch((err) => console.error('MongoDB Connection Error:', err.message));


// Routes
app.use('/api/Clients', clientRoutes);
app.use('/api/LoanStatements', loanStatementRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Purchase Order API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
