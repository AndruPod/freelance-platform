import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Creating a database connection for Postgres
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        dialect: 'postgres',
        port: process.env.DATABASE_PORT,
        host: process.env.DATABASE_HOST,
        logging: false,
    }
)

export default sequelize;