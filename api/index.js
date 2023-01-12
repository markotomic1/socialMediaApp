import express from "express";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import likesRoutes from "./routes/likes.js";
import commentsRoutes from "./routes/comments.js";
import postsRoutes from "./routes/posts.js";
import relationshipsRoutes from "./routes/relationships.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { upload } from "./fileUpload.js";
const app = express();

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/relationships", relationshipsRoutes);

//upload files
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});
app.listen(8800, () => {
  console.log("connected");
});
