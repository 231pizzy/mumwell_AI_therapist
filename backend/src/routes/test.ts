import express from "express";
import { auth } from "../middleware/auth";
import { createTest, getTest } from "../controllers/testController";


const router = express.Router();

// All routes are protected with authentication
router.use(auth);

// Track a new mood entry
router.post("/", createTest);

router.get("/", getTest);

export default router;