const app = require('./app');
const connectToDb = require('./config/db');

const port = process.env.PORT || 3000;

connectToDb();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})