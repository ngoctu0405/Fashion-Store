require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/configs/database.config');

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
