import app from "./app.js";
import { connectDB, sequelize } from "./config/db.js";
import {RolePermission,Role, Users, Permission} from "./models/index.js";

connectDB();

sequelize.sync()
    .then(() => console.log('Database & table synced'))
    .catch(err => console.error('Sync error: ', err))

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})