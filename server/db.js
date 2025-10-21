import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Creating a database connection for Postgres
const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        dialect: 'postgres',
        port: process.env.POSTGRES_PORT,
        host: process.env.POSTGRES_HOST,
        logging: false,
    }
)

export default sequelize;