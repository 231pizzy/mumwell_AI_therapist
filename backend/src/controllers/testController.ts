import { Request, Response, NextFunction } from "express";
import { Test } from "../models/Test";
import { logger } from "../utils/logger";

export const createTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { score, level, message } = req.body;
    const userId = req.user?._id; // From auth middleware

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // ✅ Check if a previous test already exists for this user
    const existingTest = await Test.findOne({ userId });

    if (existingTest) {
      // ✅ Update the existing record
      existingTest.score = score;
      existingTest.level = level;
      existingTest.message = message;
      existingTest.timestamp = new Date();

      await existingTest.save();
      logger.info(`Test entry updated for user ${userId}`);

      return res.status(200).json({
        success: true,
        message: "Test result updated successfully",
        data: existingTest,
      });
    }

    // ✅ Otherwise, create a new record
    const newTest = new Test({
      userId,
      score,
      level,
      message,
      timestamp: new Date(),
    });

    await newTest.save();
    logger.info(`New test entry created for user ${userId}`);

    res.status(201).json({
      success: true,
      message: "Test result saved successfully",
      data: newTest,
    });
  } catch (error) {
    logger.error("Error creating/updating test result:", error);
    next(error);
  }
};

export const getTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id; // from auth middleware

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const test = await Test.findOne({ userId }).sort({ timestamp: -1 });

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "No test record found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        score: test.score,
        level: test.level,
        message: test.message,
        timestamp: test.timestamp,
      },
    });
  } catch (error) {
    logger.error("Error fetching user test result:", error);
    next(error);
  }
};