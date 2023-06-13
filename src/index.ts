import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './router/router';
import { randomUUID } from 'crypto';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use('/api', router);

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL || '');
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
		console.log(randomUUID());
	} catch (e) {
		console.log(e);
	}
};

start();
