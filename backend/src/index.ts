import path from 'path'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import Route from './routes'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

const app = express();
const port: number = 3333;

app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined"));

const db = require("./config/db");
db.connect();

Route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

