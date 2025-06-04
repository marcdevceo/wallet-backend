import { sql } from "../config/db.js";

export async function getTransactionsByUserID(req, res) {
  const userId = req.params.userid;

  try {
    const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC;
        `;
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createTransaction(req, res) {
  const userId = req.params.userid;

  try {
    const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC;
        `;
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteTransaction(req, res) {
  const transactionId = req.params.id;

  try {
    if (isNaN(transactionId) || transactionId <= 0) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    const result = await sql`
              DELETE FROM transactions WHERE ID = ${transactionId} RETURNING *;
          `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getTransactionSummary(req, res) {
  const userId = req.params.userid;

  try {
    const balance = await sql`
            SELECT COALESCE(SUM(amount), 0) AS total_balance
            FROM transactions
            WHERE user_id = ${userId};
        `;

    const incomee = await sql`
            SELECT COALESCE(SUM(amount), 0) AS total_income
            FROM transactions
            WHERE user_id = ${userId} AND amount > 0;
        `;
    const expense = await sql`
            SELECT COALESCE(SUM(amount), 0) AS total_expenses
            FROM transactions
            WHERE user_id = ${userId} AND amount < 0;
        `;

    res.status(200).json({
      summary: {
        total_balance: balance[0].total_balance,
        total_income: incomee[0].total_income,
        total_expenses: expense[0].total_expenses,
      },
    });
  } catch (error) {
    console.error("Error fetching transaction summary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
