const mongoose = require('mongoose');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));