import express from "express";
import { sql } from "../config/db.js";
import {
  getTransactionsByUserID,
  createTransaction,
  deleteTransaction,
  getTransactionSummary,
} from "../controllers/transactionsControllers.js";

const router = express.Router();

router.get("/summary/:userid", getTransactionSummary);

router.get("/:userid", getTransactionsByUserID);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

export default router;
