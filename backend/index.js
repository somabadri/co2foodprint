import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import recipesDAO from "./dao/recipesDAO.js"
import usersDAO from "./dao/usersDAO.js"
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.CO2FP_DB_URI,
    {
        poolSize: 50,
        wtimeout: 2500,
        useNewUrlParse: true
    }
).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => {
    await usersDAO.injectDB(client);
    app.listen(port, () => {
        console.log('please visit localhost:'+ port + '/api/v1/users to check code');
    })
})
