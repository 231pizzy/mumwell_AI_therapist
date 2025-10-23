import { Request, Response, NextFunction } from "express";
import { Mood } from "../models/Mood";
import { logger } from "../utils/logger";
import { sendMoodUpdateEvent } from "../utils/inngestEvents";

// Create a new mood entry
export const createMood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { score, note } = req.body;
    const userId = req.user?._id; // From auth middleware

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const existingMood = await Mood.findOne({ userId })

    if (existingMood) {
      existingMood.score = score;
      existingMood.note = note
      existingMood.timestamp = new Date();

      await existingMood.save();
      logger.info(`Mood entry updated for user ${userId}`);

      // Send mood update event to Inngest
      try {
        await sendMoodUpdateEvent({
          userId,
          mood: score,
          note,
          timestamp: existingMood.timestamp,
        });
      } catch (e) {
        console.error("Inngest event failed:", e);
      }

      return res.status(200).json({
        success: true,
        message: "Test result updated successfully",
        data: existingMood,
      });
    }

    const newMood = new Mood({
      userId,
      score,
      note,
      timestamp: new Date(),
    });

    await newMood.save();
    logger.info(`Mood entry created for user ${userId}`);

    // Send mood update event to Inngest
    await sendMoodUpdateEvent({
      userId,
      mood: score,
      note,
      timestamp: newMood.timestamp,
    });

    res.status(201).json({
      success: true,
      data: newMood,
    });
  } catch (error) {
    console.error("Mood creation error:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};

export const getMood = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id; // from auth middleware

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const mood = await Mood.findOne({ userId }).sort({ timestamp: -1 });

    if (!mood) {
      return res.status(404).json({
        success: false,
        message: "No mood record found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        score: mood.score,
        note: mood.note,
        timestamp: mood.timestamp,
      },
    });
  } catch (error) {
    logger.error("Error fetching user test result:", error);
    next(error);
  }
};