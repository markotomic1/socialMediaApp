import express from "express";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import likesRoutes from "./routes/likes.js";
import commentsRoutes from "./routes/comments.js";
import postsRoutes from "./routes/posts.js";

const app = express();

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/comments", commentsRoutes);

app.listen(8800, () => {
  console.log("connected");
});
