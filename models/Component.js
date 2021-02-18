const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComponentSchema = new Schema({
    component_id: Number,
    url: String,
    component_name: String,
    part_number: String,
    retail_part_number: String,
    quantity: Number,
    location: String,
    size: String,
    type: String,
    volt: String,
    current: String,
    inductance: String,
    capacitance: String,
    tolerance: String,
    misc: String,
});

// Create collection and add schema
const Component = mongoose.model('Component', ComponentSchema);

module.exports = Component;