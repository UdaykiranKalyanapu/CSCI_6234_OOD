import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express'
import fileUpload from 'express-fileupload';
import { initializeSocket } from './lib/socket.js';
import path from "path";
import cors from 'cors'; //to allow cross-origin requests
import cron from "node-cron";


import { createServer } from "http"; 

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js'; 
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statRoutes from './routes/stat.route.js';
import {connectDB} from './lib/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT; //if env file is empty, the port would be undefined.
const __dirname = path.resolve(); //for path to temp folder to save songs


const httpServer = createServer(app);
initializeSocket(httpServer);



const allowedOrigins = [
	"https://udaymelodyhhub.vercel.app",
	"http://localhost:5173", // optional, for local testing
	"http://localhost:5174"
  ];
  
  app.use(cors({
	origin: function (origin, callback) {
	  if (!origin || allowedOrigins.includes(origin)) {
		callback(null, true);
	  } else {
		console.log("CORS blocked origin:", origin);
		callback(new Error("Not allowed by CORS"));
	  }
	},
	credentials: true,
  }));
  
   //to allow cross-origin requests
app.use(clerkMiddleware()) //for auth.userid response
app.use(express.json()); //to parse json data
app.use(fileUpload({
useTempFiles: true,
tempFileDir: path.join(__dirname, 'tmp'),
createParentPath: true, //to create parent folder if not exist
limits: { fileSize: 10 * 1024 * 1024 }, // file zite limit to upload

}))






// cron jobs
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
	});
}

// error handler
app.use((err, req, res, next) => {
	res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message });
});

httpServer.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
	connectDB();
});
