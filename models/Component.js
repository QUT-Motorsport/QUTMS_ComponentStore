const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComponentSchema = new Schema({
    component_id: Number,
    component_name: String,
    quantity: Number,
    location: String,
    photo: Object
});

// Create collection and add schema
const Component = mongoose.model('Component', ComponentSchema);

module.exports = Component;