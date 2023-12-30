import "reflect-metadata";

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { AppDataSource } from './db';
import apiRoutes from './routes/api/api.routes';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected')
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })   
    } catch (error) {
        console.log(error)
    }
}

main();
