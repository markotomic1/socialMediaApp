import express from "express";
import {
  addRelationship,
  deleteRelationship,
  getRelationship,
} from "../controlers/relationship.js";

const router = express.Router();

router.get("/", getRelationship);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

export default router;
