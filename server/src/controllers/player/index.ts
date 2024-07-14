import express from 'express';
import get from './get';
import post from './post';

const app = express.Router();

app.get('/:player', get);
app.post('/:player', post);

export default app;