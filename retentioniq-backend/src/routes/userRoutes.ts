import { Router, Request, Response } from "express";
import { pool } from "../db";

const router = Router();

// Create user
router.post("/", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

export default router;