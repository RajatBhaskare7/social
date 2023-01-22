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
import Authroutes from "./routes/auth.js";
import UserRoutes from "./routes/user.js";
import PostRoutes from "./routes/post.js";
import {verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/post.js";
import User from "./models/users.js";
import Post from "./models/post.js";
import {users , posts} from "./data/index.js";
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
    destination:function (req, file, cb) {
        cb(null, "public/assets");
    }
    , 
    filename:function (req, file, cb)  {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

const port = process.env.PORT || 5000;

/* routes */
app.post("/auth/register",upload.single("picture"), register);
app.post("/posts",verifyToken, upload.single("picture"), createPost);
/*auth routes */
app.use("/auth", Authroutes);
app.use('/users', UserRoutes);

/* MOnGoDB connection */

mongoose.connect( process.env.MONGO_URL, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
     })
     .then(() => {

     app.listen(port, () => console.log(`Server running on port: ${port}`))
    //  User.insertMany(users);
    // Post.insertMany(posts);
     
     })
     
    .catch((error) => console.log(error.message));
     