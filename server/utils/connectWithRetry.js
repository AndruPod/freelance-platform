import sequelize from "../db.js";

async function connectWithRetry(retries = 10, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            await sequelize.authenticate();
            console.log('Database connected');
            return;
        } catch (err) {
            console.log(`Database not ready, retrying in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error('Could not connect to database');
}

export default connectWithRetry;