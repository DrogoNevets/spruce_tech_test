import express from 'express';
import get from './get';

const app = express.Router();

app.get('/:player', get);

export default app;