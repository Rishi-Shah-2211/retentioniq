import { Router } from "express";
import { getAIInsight } from "../controllers/dashboard.controller";
import {
  getKPIs,
  getPlanChurn,
  getChurnTrend,
  getChurnDrivers,
  getRiskPlanMatrix,
  getAllUsers,
  getChurnedUsers,
  getChurnRateDetails,
} from "../controllers/dashboard.controller";

const router = Router();

router.get("/kpis", getKPIs);
router.get("/churn/plan-wise", getPlanChurn);
router.get("/churn/trend", getChurnTrend);
router.get("/churn/drivers", getChurnDrivers);
router.get("/churn/risk-plan-matrix", getRiskPlanMatrix);
router.get("/insight", getAIInsight);
router.get("/users", getAllUsers);
router.get("/churned-users", getChurnedUsers);
router.get("/churn-rate-details", getChurnRateDetails);

export default router;