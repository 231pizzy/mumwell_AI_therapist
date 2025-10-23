'use client';

import { testimonials } from "@/components/data";
import FeaturesCarousel from "@/components/homePagecomponents/FeaturesSlider";
import { Hero } from "@/components/homePagecomponents/Hero";
import { TestimonialSlider } from "@/components/homePagecomponents/TestimonialSlider";
import { WhyOurWorkMatters } from "@/components/homePagecomponents/WhyOurWorkMatters";
import { Ripple } from "@/components/ui/ripple";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Waves, Brain,  ClipboardCheck, Users, HeartPulse } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const emotions = [
    { value: 0, label: "😞 Sad", color: "from-blue-500/50" },
    { value: 25, label: "☺️ Content", color: "from-green-500/50" },
    { value: 50, label: "😌 Peaceful", color: "from-purple-500/50" },
    { value: 75, label: "😁 Happy", color: "from-yellow-500/50" },
    { value: 100, label: "🤩 Excited", color: "from-pink-500/50" },
  ];

  const [emotion, setEmotion] = useState(50);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentEmotion =
    emotions.find((em) => Math.abs(emotion - em.value) < 15) || emotions[2];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Hero />
      {/* Hero Section */}
      <section className="relative min-h-[90vh]  flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className={`absolute w-[500px] h-[500px] rounded-full blur-3xl top-0 -left-20 transition-all duration-700 ease-in-out bg-gradient-to-r ${currentEmotion.color} to-transparent opacity-60`}
          />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl bottom-0 right-0 animate-pulse delay-700" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
        </div>

        <Ripple className="opacity-60" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative space-y-6 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full md:px-4 px-2 py-1.5 text-sm border border-primary/20 bg-primary/5 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
            <Waves className="w-4 h-4 animate-wave text-primary" />
            <span className="text-foreground/90 dark:text-foreground">
              AI Therapy for a Healthier Mind
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Empowering Emotional Well-Being Through{" "}
            <span className="inline-block bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] hover:to-primary transition-all duration-300">
              Intelligent Conversations
            </span>
          </h1>

          <p className="max-w-[600px] mx-auto text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide">
            Experience safe, empathetic, and AI-powered support designed to help you navigate your emotions,
            build resilience, and improve your mental wellness anytime, anywhere.
          </p>

          <motion.div
            className="w-full max-w-[600px] mx-auto space-y-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="space-y-2 text-center">
              <p className="text-lg text-muted-foreground/80 font-medium">
                Here to listen, understand, and support your mental well-being.
              </p>
              <div className="flex justify-between items-center px-2">
                {emotions.map((em) => (
                  <div
                    key={em.value}
                    className={`transition-all duration-500 ease-out cursor-pointer hover:scale-105 ${Math.abs(emotion - em.value) < 15
                      ? "opacity-100 scale-110 transform-gpu"
                      : "opacity-50 scale-100"
                      }`}
                    onClick={() => setEmotion(em.value)}
                  >
                    <div className="text-2xl transform-gpu">
                      {em.label.split(" ")[0]}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-medium">
                      {em.label.split(" ")[1]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative px-2">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${currentEmotion.color} to-transparent blur-2xl -z-10 transition-all duration-500`}
              />
              <Slider
                value={[emotion]}
                onValueChange={(value) => setEmotion(value[0])}
                min={0}
                max={100}
                step={1}
                className="py-4"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground animate-pulse">
                Slide to express how you&apos;re feeling today
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* <Button
              size="lg"
              className="relative group cursor-pointer h-12 px-8 rounded-full bg-gradient-to-r from-primary via-primary/90 to-secondary hover:to-primary shadow-lg shadow-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/30"
            >
              <span className="relative z-10 font-medium flex items-center gap-2">
                Begin Your Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button> */}
          </motion.div>
        </motion.div>
      </section>

      {/* === Feature Section === */}
      <section className="relative py-6 px-6 bg-background border-t border-border/20">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-foreground"
          >
            How <span className="text-primary">MumWell</span> Works
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              {
                icon: <ClipboardCheck className="w-10 h-10 text-primary" />,
                title: 'Take EPDS Screening',
                desc:
                  'Complete the EPDS questionnaire to assess postpartum mental health and detect early signs of depression.',
              },
              {
                icon: <Brain className="w-10 h-10 text-primary" />,
                title: "AI Emotional Intelligence",
                desc: "Our AI uses advanced language models trained for empathy, helping you express and process emotions safely.",
              },
              {
                icon: <Users className="w-10 h-10 text-primary" />,
                title: "Connect with a Counselor",
                desc: "High-risk scores are matched to professional counselors for personalized tele-counseling sessions.",
              },
              {
                icon: <HeartPulse className="w-10 h-10 text-primary" />, // You can use 'HeartPulse' or 'Gamepad2' from lucide-react
                title: "Wellness Games & Exercises",
                desc: "Relax your mind through calming activities from breathing and focus exercises to interactive mood-boosting games designed to reduce stress.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border/10 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <WhyOurWorkMatters/>

      <FeaturesCarousel/>
      <TestimonialSlider
				testimonials={testimonials}
				heading=''
			/>
    </div>
  );
}
