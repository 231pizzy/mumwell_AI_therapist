"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, Loader2, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@/lib/contexts/session-context";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  question: string;
  options: string[];
  scores: number[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "I have been able to laugh and see the funny side of things.",
    options: [
      "As much as I always could",
      "Not quite so much now",
      "Definitely not so much now",
      "Not at all",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: 2,
    question: "I have looked forward with enjoyment to things.",
    options: [
      "As much as I ever did",
      "Rather less than I used to",
      "Definitely less than I used to",
      "Hardly at all",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: 3,
    question: "I have blamed myself unnecessarily when things went wrong.",
    options: [
      "No, never",
      "Not very often",
      "Yes, sometimes",
      "Yes, most of the time",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: 4,
    question: "I have been anxious or worried for no good reason.",
    options: ["No, not at all", "Hardly ever", "Yes, sometimes", "Yes, very often"],
    scores: [0, 1, 2, 3],
  },
  {
    id: 5,
    question: "I have felt scared or panicky for no good reason.",
    options: ["No, not at all", "No, not much", "Yes, sometimes", "Yes, quite a lot"],
    scores: [0, 1, 2, 3],
  },
  {
    id: 6,
    question: "Things have been getting on top of me.",
    options: [
      "No, I have been coping as well as ever",
      "No, most of the time I have coped quite well",
      "Yes, sometimes I haven’t been coping as well as usual",
      "Yes, most of the time I haven’t been able to cope at all",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: 7,
    question: "I have been so unhappy that I have had difficulty sleeping.",
    options: [
      "No, not at all",
      "Not very often",
      "Yes, sometimes",
      "Yes, most of the time",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: 8,
    question: "I have felt sad or miserable.",
    options: [
      "No, not at all",
      "Not very often",
      "Yes, quite often",
      "Yes, most of the time",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: 9,
    question: "I have been so unhappy that I have been crying.",
    options: ["No, never", "Only occasionally", "Yes, quite often", "Yes, most of the time"],
    scores: [0, 1, 2, 3],
  },
  {
    id: 10,
    question: "The thought of harming myself has occurred to me.",
    options: ["Never", "Hardly ever", "Sometimes", "Yes, quite often"],
    scores: [0, 1, 2, 3],
  },
];

export default function PostpartumTest() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useSession();
  const router = useRouter();
  const [result, setResult] = useState<
    null | { score: number; level: string; message: string; chatMsg: string }
  >(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if not authenticated
      router.replace("/login");
    }
  }, [router]);

  const handleAnswer = (score: number) => {
    const updated = [...answers];
    updated[current] = score;
    setAnswers(updated);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setLoading(true);
      setTimeout(() => calculateResult(updated), 1000);
    }
  };

  const handleSendToBackend = async (resultData: { score: number; level: string; message: string }) => {
    console.log("TestForm: Auth state:", { isAuthenticated, user });

    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to save your test score",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(resultData), // ✅ only sending score, level, message
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save test result");
      }

      const data = await response.json();
      console.log("TestForm: Success response:", data);

      toast({
        title: "Test score saved successfully!",
        description: "Your postpartum depression screening result has been recorded.",
      });
    } catch (error) {
      console.error("TestForm: Error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save score",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  const calculateResult = (answers: number[]) => {
    const totalScore = answers.reduce((a, b) => a + b, 0);
    let level = "";
    let message = "";
    let chatMsg = "";

    if (totalScore <= 9) {
      level = "Low Risk";
      message =
        "You show minimal signs of postpartum depression. Continue prioritizing rest, support, and self-care.";
      chatMsg = "I’m happy you’re doing well. Want to chat about staying balanced and strong?";
    } else if (totalScore <= 12) {
      level = "Mild Risk";
      message =
        "You might be experiencing mild mood changes. Consider talking with loved ones or joining a support group.";
      chatMsg = "You deserve care and understanding — come to the chatroom, let’s talk.";
    } else {
      level = "High Risk";
      message =
        "Your responses suggest possible postpartum depression. We strongly recommend professional assessment and emotional support.";
      chatMsg = "I can see you’re hurting… come to the chatroom, let’s talk.";
    }

    setLoading(false);
    setResult({ score: totalScore, level, message, chatMsg });

    handleSendToBackend({ score: totalScore, level, message });
  };

  const restartTest = () => {
    setAnswers([]);
    setCurrent(0);
    setResult(null);
  };

  const progress = ((current + 1) / questions.length) * 100;

  const handleChat = () => {
    // Link to your chat feature route
    window.location.href = "/chat";
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4 mt-14">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-foreground mb-4">
          Edinburgh Postnatal Depression Test (EPDS)
        </h1>
        <p className="text-muted-foreground">
          A world-standard screening tool to assess emotional well-being after childbirth.
          Your responses remain confidential and are meant to guide your support journey.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto shadow-2xl border border-gray-100 rounded-2xl bg-card">
        <CardContent className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="animate-spin text-foreground w-10 h-10 mb-4" />
              <p className="text-foreground">Analyzing your responses...</p>
            </div>
          ) : result ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <CheckCircle className="mx-auto text-foreground w-14 h-14 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">{result.level}</h2>
              <p className="text-foreground mb-6">{result.message}</p>
              <div className="text-lg font-bold text-foreground mb-6">
                Your EPDS Score: {result.score} / 30
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  onClick={handleChat}
                  variant="outline"
                  className="hover:bg-primary/15 border-gray-300 text-foreground cursor-pointer font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {result.chatMsg}
                </Button>

                <Button
                  onClick={restartTest}
                  variant="outline"
                  className="hover:bg-primary/20 border-gray-300 cursor-pointer text-foreground py-3 rounded-lg"
                >
                  Retake Test
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              <Progress value={progress} className="h-2 mb-8" />
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h2 className="text-xl font-semibold mb-6 text-foreground">
                  Question {current + 1} of {questions.length}
                </h2>
                <p className="text-lg text-foreground mb-8">
                  {questions[current].question}
                </p>

                <div className="grid gap-4">
                  {questions[current].options.map((opt, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      onClick={() => handleAnswer(questions[current].scores[i])}
                      className="border-gray-300 hover:bg-primary/15 transition-all cursor-pointer"
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="text-center mt-10 text-foreground flex justify-center items-center gap-2">
        <Heart className="w-5 h-5 text-rose-500" />
        <span>Your feelings matter. You’re not alone.</span>
      </div>
    </div>
  );
}
