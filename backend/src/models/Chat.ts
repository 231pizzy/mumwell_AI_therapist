// import mongoose, { Schema, Document } from "mongoose";

// export interface IChatMessage {
//   role: "user" | "assistant";
//   content: string;
//   timestamp: Date;
//   metadata?: {
//     technique: string;
//     goal: string;
//     progress: any[];
//   };
// }

// export interface IChatSession extends Document {
//   sessionId: string;
//   messages: IChatMessage[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// const chatMessageSchema = new Schema<IChatMessage>({
//   role: {
//     type: String,
//     enum: ["user", "assistant"],
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
//   metadata: {
//     technique: String,
//     goal: String,
//     progress: [Schema.Types.Mixed],
//   },
// });

// const chatSessionSchema = new Schema<IChatSession>(
//   {
//     sessionId: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     messages: [chatMessageSchema],
//   },
//   {
//     timestamps: true,
//   }
// );

// export const ChatSession = mongoose.model<IChatSession>(
//   "ChatSession",
//   chatSessionSchema
// );



// update
import mongoose, { Schema, Document } from "mongoose";

export interface IChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  metadata?: {
    technique?: string;
    goal?: string;
    progress?: any[];
    analysis?: {
      emotionalState?: string;
      themes?: string[];
      riskLevel?: number;
      recommendedApproach?: string;
    };
  };
}

export interface ISessionMemory {
  sessionContext: {
    conversationThemes: string[];
    currentTechnique?: string | null;
  };
  userProfile: {
    emotionalState: string[];
    preferences: Record<string, any>;
    riskLevel: number;
  };
}

export interface IChatSession extends Document {
  sessionId: string;
  messages: IChatMessage[];
  memory?: ISessionMemory;
  createdAt: Date;
  updatedAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    technique: String,
    goal: String,
    progress: [Schema.Types.Mixed],
    analysis: {
      emotionalState: String,
      themes: [String],
      riskLevel: Number,
      recommendedApproach: String,
    },
  },
});

const sessionMemorySchema = new Schema<ISessionMemory>({
  sessionContext: {
    conversationThemes: {
      type: [String],
      default: [],
    },
    currentTechnique: {
      type: String,
      default: null,
    },
  },
  userProfile: {
    emotionalState: {
      type: [String],
      default: [],
    },
    preferences: {
      type: Schema.Types.Mixed,
      default: {},
    },
    riskLevel: {
      type: Number,
      default: 0,
    },
  },
});

const chatSessionSchema = new Schema<IChatSession>(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    messages: [chatMessageSchema],
    memory: {
      type: sessionMemorySchema,
      default: {
        sessionContext: { conversationThemes: [], currentTechnique: null },
        userProfile: { emotionalState: [], preferences: {}, riskLevel: 0 },
      },
    },
  },
  {
    timestamps: true,
  }
);

export const ChatSession = mongoose.model<IChatSession>(
  "ChatSession",
  chatSessionSchema
);
