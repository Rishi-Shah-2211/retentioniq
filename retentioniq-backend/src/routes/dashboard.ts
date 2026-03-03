import { Router } from "express";

const router = Router();

router.get("/overview", (req, res) => {
  res.json({ status: "dashboard route working" });
});

export default router;