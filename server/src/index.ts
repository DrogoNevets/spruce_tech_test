import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import data from './controllers/data';
import player from './controllers/player';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/data', data);
app.use('/player', player);

app.listen(3002, () => {
  console.log("Server is running");
});