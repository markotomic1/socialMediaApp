import express from "express";
import { addComment, getComments } from "../controlers/comment.js";
const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);

export default router;
