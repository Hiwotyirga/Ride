module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/ride',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // Add other mongoose options here if needed
    }
};