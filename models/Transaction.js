const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    receeipt_id: Number,
    student_id: String,
    student_name: String,
    time: String,
    order_details:  Array
});

// Create collection and add schema
const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;