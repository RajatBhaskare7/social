import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";
import helmet from "helmet";
import { register } from "./controllers/auth.js";


/* configuration */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname, "public/assets")));


/* file storage */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    }
    , filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

const port = process.env.PORT || 5000;

/* routes */
app.post("/auth/register",upload.single("picture"), register);

/* MOnGoDB connection */

mongoose.connect( process.env.MONGO_URL, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
     })
     .then(() => 
     app.listen(port, () => console.log(`Server running on port: ${port}`)))
    .catch((error) => console.log(error.message));
     