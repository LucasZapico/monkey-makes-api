import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import { restart } from "nodemon";

dotenv.config();
const opt = { debug: true };

const PORT = process.env.PORT || 3333;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// axios params
const axiosDefaultHeader =  {
  cookie:
    "__cfduid=dcd347b02bcc50c89e42c29e4a994e5391613329627; __cf_bm=023c6721868a22d5c5513539a3d408a0eb806000-1613411630-1800-AekJ2f5aDRV68O4WDMaxfItoNS1uS89rRUN%2BbxORuThnJQsngbHkBGYe2uEiuzhIkIEmgQ1Gz4XsyZTXL8MbP00%3D",
  Authorization: process.env.PRINTFUL_API_KEY,
  "Content-Type": "application/json",
}


app.get("/", (req, res) => res.send("Hello Monkey Makes Printable API"));


app.get("/products", async (req, res, next) => {
  const data = await axios
    .get("https://api.printful.com/products", {
      headers: axiosDefaultHeader     
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return err
    });

    res.status(200).json(data)  
});

app.get("/store/products", async (req, res, next) => {
  const data = await axios
    .get("https://api.printful.com/store/products", {
      headers: axiosDefaultHeader     
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return err
    });

    res.status(200).json(data)  
});

app.get("/sync/products", async (req, res, next) => {
  const data = await axios
    .get("https://api.printful.com/sync/products", {
      headers: axiosDefaultHeader     
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return err
    });

    res.status(200).json(data)  
});




app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

app.use((req, res) => {
  res.status(404);
});