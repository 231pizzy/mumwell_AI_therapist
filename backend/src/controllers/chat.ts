import { Request, Response } from "express";
import { ChatSession, IChatSession } from "../models/ChatSession";
import { GoogleGenAI } from "@google/genai";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger";
import { inngest } from "../inngest/client";
import { User } from "../models/User";
import { InngestSessionResponse, InngestEvent } from "../types/inngest";
import { Types } from "mongoose";

// Initialize Gemini API
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "AIzaSyAAtyGkMsjvtdERlukrvqFEF93py20OvWo",
});

// Create a new chat session
export const createChatSession = async (req: Request, res: Response) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User not authenticated" });
    }

    const userId = new Types.ObjectId(req.user.id);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique sessionId
    const sessionId = uuidv4();

    const session = new ChatSession({
      sessionId,
      userId,
      startTime: new Date(),
      status: "active",
      messages: [],
    });

    await session.save();

    res.status(201).json({
      message: "Chat session created successfully",
      sessionId: session.sessionId,
    });
  } catch (error) {
    logger.error("Error creating chat session:", error);
    res.status(500).json({
      message: "Error creating chat session",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Send a message in the chat session
// export const sendMessage = async (req: Request, res: Response) => {
//   try {
//     const { sessionId } = req.params;
//     const { message } = req.body;
//     const userId = new Types.ObjectId(req.user.id);

//     logger.info("Processing message:", { sessionId, message });

//     // Find session by sessionId
//     const session = await ChatSession.findOne({ sessionId }).lean(false);
//     if (!session) {
//       logger.warn("Session not found:", { sessionId });
//       return res.status(404).json({ message: "Session not found" });
//     }

//     if (session.userId.toString() !== userId.toString()) {
//       logger.warn("Unauthorized access attempt:", { sessionId, userId });
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     // Create Inngest event for message processing
//     const event: InngestEvent = {
//       name: "therapy/session.message",
//       data: {
//         message,
//         history: session.messages,
//         goals: [],
//         systemPrompt: `You are an AI therapist assistant. Your role is to:
//         1. Provide empathetic and supportive responses
//         2. Use evidence-based therapeutic techniques
//         3. Maintain professional boundaries
//         4. Monitor for risk factors
//         5. Remember context from session history (names, emotions, topics).
//         6. If the user asks about themselves (e.g., "what is my name?"),
//            infer their identity or state from past conversation content.
//         7. Never fabricate; if not sure, express that gently.
//         8. Guide users toward their therapeutic goals`,
//       },
//     };

//     logger.info("Sending message to Inngest:", { event });

//     // Send event to Inngest for logging and analytics
//     await inngest.send(event);

//     // ----------- ANALYSIS PHASE -----------
//     const analysisPrompt = `Analyze this therapy message and provide insights. Return ONLY a valid JSON object with no markdown formatting or extra text.
//     Message: ${message}
//     Context: ${JSON.stringify({
//       memory: event.data.history?.slice(-5) || [],
//       goals: event.data.goals,
//     })}

//     Required JSON structure:
//     {
//       "emotionalState": "string",
//       "themes": ["string"],
//       "riskLevel": number,
//       "recommendedApproach": "string",
//       "progressIndicators": ["string"]
//     }`;

//     const analysisResult = await genAI.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: analysisPrompt,
//     });

//     const analysisText = analysisResult?.text?.trim() || "{}";
//     const cleanText = analysisText.replace(/```json\n?|```/g, "").trim();
//     const analysis = JSON.parse(cleanText || "{}");

//     logger.info("Message analysis:", analysis);

//     // ----------- RESPONSE GENERATION PHASE -----------

//     // Format recent chat history for better continuity (last 10 messages)
//     const recentHistory = session.messages.slice(-10);
//     const formattedHistory = recentHistory
//       .map((m) => `${m.role === "assistant" ? "Therapist" : "User"}: ${m.content}`)
//       .join("\n");

//     const responsePrompt = `
// ${event.data.systemPrompt}

// Conversation so far:
// ${formattedHistory}

// The user just said: "${message}"

// Based on the full conversation history, generate the next therapist message that:
// 1. Acknowledges and connects to what the user just said
// 2. Reflects continuity from earlier exchanges (names, topics, emotions)
// 3. Maintains empathy, professionalism, and safety
// 4. Encourages exploration and reflection
// 5. Avoids repetition or robotic tone

// Provide only the next therapist message — do not restate history or analysis.
// `;

//     const responseResult = await genAI.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: responsePrompt,
//     });

//     const response_ = responseResult?.text?.trim() || "No response generated";

//     logger.info("Generated response:", response_);

//     // ----------- UPDATE SESSION HISTORY -----------

//     session.messages.push({
//       role: "user",
//       content: message,
//       timestamp: new Date(),
//     });

//     session.messages.push({
//       role: "assistant",
//       content: response_,
//       timestamp: new Date(),
//       metadata: {
//         analysis,
//         progress: {
//           emotionalState: analysis.emotionalState,
//           riskLevel: analysis.riskLevel,
//         },
//       },
//     });

//     // ----------- OPTIONAL: SUMMARIZE LONG CONVERSATIONS -----------

//     // if (session.messages.length > 20) {
//     //   const summaryPrompt = `
//     //   Summarize the key themes, emotions, and therapeutic goals from this conversation:
//     //   ${session.messages
//     //     .map((m) => `${m.role}: ${m.content}`)
//     //     .join("\n")}

//     //   Return a concise paragraph summary.
//     //   `;

//     //   const summaryResult = await genAI.models.generateContent({
//     //     model: "gemini-2.0-flash",
//     //     contents: summaryPrompt,
//     //   });

//     //   session.summary = summaryResult.text?.trim();
//     //   session.messages = session.messages.slice(-10); // keep last 10 for context
//     // }

//     await session.save();
//     logger.info("Session updated successfully:", { sessionId });

//     // ----------- RETURN RESPONSE -----------

//     res.json({
//       response_,
//       message: response_,
//       analysis,
//       metadata: {
//         progress: {
//           emotionalState: analysis.emotionalState,
//           riskLevel: analysis.riskLevel,
//         },
//       },
//     });
//   } catch (error) {
//     logger.error("Error in sendMessage:", error);
//     res.status(500).json({
//       message: "Error processing message",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };

// new send a message
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { message } = req.body;
    const userId = new Types.ObjectId(req.user.id);

    logger.info("Processing message:", { sessionId, message });

    // Find session by sessionId
    const session = await ChatSession.findOne({ sessionId }).lean(false);
    if (!session) {
      logger.warn("Session not found:", { sessionId });
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.userId.toString() !== userId.toString()) {
      logger.warn("Unauthorized access attempt:", { sessionId, userId });
      return res.status(403).json({ message: "Unauthorized" });
    }

    // ----------- MEMORY INITIALIZATION -----------
    session.memory = session.memory || {
      sessionContext: { conversationThemes: [], currentTechnique: null },
      userProfile: { emotionalState: [], preferences: {}, riskLevel: 0 },
    };

    session.memory.sessionContext =
      session.memory.sessionContext || { conversationThemes: [], currentTechnique: null };

    session.memory.userProfile =
      session.memory.userProfile || { emotionalState: [], preferences: {}, riskLevel: 0 };

    const defaultMemory = {
      sessionContext: { conversationThemes: [], currentTechnique: null },
      userProfile: { emotionalState: [], preferences: {}, riskLevel: 0 },
    };

    const memory = {
      ...defaultMemory,
      ...session.memory,
      sessionContext: { ...defaultMemory.sessionContext, ...(session.memory.sessionContext || {}) },
      userProfile: { ...defaultMemory.userProfile, ...(session.memory.userProfile || {}) },
    };

    // ----------- INNGEST EVENT -----------
    const event: InngestEvent = {
      name: "therapy/session.message",
      data: {
        message,
        history: session.messages,
        memory, // ✅ fully typed and safe
        goals: [],
        systemPrompt: `You are an AI therapist assistant. Your role is to:
1. Provide empathetic and supportive responses.
2. Use evidence-based therapeutic techniques.
3. Maintain professional boundaries.
4. Monitor for risk factors.
5. Remember context from session history (names, emotions, topics).
6. Refer to stored session memory for continuity.
7. If the user asks about themselves (e.g., "what is my name?"),
   infer their identity or emotions from memory or conversation.
8. Never fabricate; if uncertain, respond gently.
9. Guide users toward therapeutic goals.`,
      },
    };

    logger.info("Sending message to Inngest:", { event });
    await inngest.send(event);

    // ----------- ANALYSIS PHASE -----------
    const analysisPrompt = `Analyze this therapy message and provide insights. Return ONLY a valid JSON object with no markdown or extra text.
Message: ${message}
Context: ${JSON.stringify({
      recentHistory: session.messages.slice(-5),
      memory: session.memory,
    })}

Required JSON structure:
{
  "emotionalState": "string",
  "themes": ["string"],
  "riskLevel": number,
  "recommendedApproach": "string",
  "progressIndicators": ["string"]
}`;

    const analysisResult = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: analysisPrompt,
    });

    const analysisText = analysisResult?.text?.trim() || "{}";
    const cleanText = analysisText.replace(/```json\n?|```/g, "").trim();
    const analysis = JSON.parse(cleanText || "{}");

    logger.info("Message analysis:", analysis);

    // ----------- MEMORY UPDATE PHASE -----------
    // if (analysis.emotionalState) {
    //   session.memory.userProfile.emotionalState.push(analysis.emotionalState);
    //   session.memory.userProfile.emotionalState = session.memory.userProfile.emotionalState.slice(-5);
    // }

    if (Array.isArray(analysis.themes)) {
      const uniqueThemes = new Set([
        ...(session.memory.sessionContext.conversationThemes || []),
        ...analysis.themes,
      ]);
      session.memory.sessionContext.conversationThemes = Array.from(uniqueThemes);
    }

    session.memory.userProfile.riskLevel = analysis.riskLevel || 0;

    // ----------- RESPONSE GENERATION PHASE -----------
    const recentHistory = session.messages.slice(-10);
    const formattedHistory = recentHistory
      .map((m) => `${m.role === "assistant" ? "Therapist" : "User"}: ${m.content}`)
      .join("\n");

    const responsePrompt = `
${event.data.systemPrompt}

Known user memory:
${JSON.stringify(session.memory, null, 2)}

Conversation so far:
${formattedHistory}

The user just said: "${message}"

Based on the full conversation and memory, generate the next therapist message that:
1. Connects emotionally to the user's current state.
2. Reflects continuity (names, topics, emotions, previous discussions).
3. Uses empathy, clarity, and safety.
4. Avoids repetition or robotic tone.
`;

    const responseResult = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: responsePrompt,
    });

    const response_ = responseResult?.text?.trim() || "No response generated";
    logger.info("Generated response:", response_);

    // ----------- UPDATE SESSION HISTORY -----------
    session.messages.push({
      role: "user",
      content: message,
      timestamp: new Date(),
    });

    session.messages.push({
      role: "assistant",
      content: response_,
      timestamp: new Date(),
      metadata: {
        analysis,
        progress: {
          emotionalState: analysis.emotionalState,
          riskLevel: analysis.riskLevel,
        },
      },
    });

    await session.save();
    logger.info("Session updated successfully with memory:", {
      sessionId,
      memory: session.memory,
    });

    // ----------- RETURN RESPONSE -----------
    res.json({
      response_,
      message: response_,
      analysis,
      memory: session.memory,
      metadata: {
        progress: {
          emotionalState: analysis.emotionalState,
          riskLevel: analysis.riskLevel,
        },
      },
    });
  } catch (error) {
    logger.error("Error in sendMessage:", error);
    res.status(500).json({
      message: "Error processing message",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};




// Get chat session history
export const getSessionHistory = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = new Types.ObjectId(req.user.id);

    const session = (await ChatSession.findById(
      sessionId
    ).exec()) as IChatSession;
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json({
      messages: session.messages,
      startTime: session.startTime,
      status: session.status,
    });
  } catch (error) {
    logger.error("Error fetching session history:", error);
    res.status(500).json({ message: "Error fetching session history" });
  }
};

export const getChatSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    logger.info(`Getting chat session: ${sessionId}`);
    const chatSession = await ChatSession.findOne({ sessionId });
    if (!chatSession) {
      logger.warn(`Chat session not found: ${sessionId}`);
      return res.status(404).json({ error: "Chat session not found" });
    }
    logger.info(`Found chat session: ${sessionId}`);
    res.json(chatSession);
  } catch (error) {
    logger.error("Failed to get chat session:", error);
    res.status(500).json({ error: "Failed to get chat session" });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = new Types.ObjectId(req.user.id);

    // Find session by sessionId instead of _id
    const session = await ChatSession.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(session.messages);
  } catch (error) {
    logger.error("Error fetching chat history:", error);
    res.status(500).json({ message: "Error fetching chat history" });
  }
};

export const getAllChatSessions = async (req: Request, res: Response) => {
  try {
    // Ensure the user is authenticated
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User not authenticated" });
    }

    const userId = new Types.ObjectId(req.user.id);

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all chat sessions for the user
    const sessions = await ChatSession.find({ userId })
      .sort({ updatedAt: -1 }) // most recent first
      .lean(); // return plain JS objects instead of Mongoose docs

    // If none found, return empty array
    if (!sessions || sessions.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(sessions);
  } catch (error) {
    logger?.error("Error fetching chat sessions:", error);
    res.status(500).json({
      message: "Error fetching chat sessions",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};