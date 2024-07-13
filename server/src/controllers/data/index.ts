import express from 'express';
import defaultHandler from './default';

const app = express.Router();

app.get('/', defaultHandler);

export default app;