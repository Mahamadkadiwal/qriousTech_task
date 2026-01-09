const app = require('./app'); 
const { connectDB, sequelize } = require('./config/db');
require('./models/user.model');

connectDB();

// sequelize.sync({alter: true})
//     .then(() => console.log('Database & table synced'))
//     .catch(err => console.error('Sync error: ', err))

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})