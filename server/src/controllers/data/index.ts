import express from 'express';
import defaultHandler from './get';

const app = express.Router();

app.get('/', defaultHandler);

export default app;