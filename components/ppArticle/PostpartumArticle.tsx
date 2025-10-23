/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

// Animation variants for fade/slide-in effects
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const PostpartumArticle = () => {
  return (
    <motion.div
      className="max-w-7xl mx-auto md:px-4 px-2 py-4 text-foreground leading-relaxed bg-background"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      <motion.h1
        variants={fadeUp}
        className="text-2xl font-bold mb-4 text-foreground"
      >
        Understanding Postpartum Depression: Signs, Support, and Solutions
      </motion.h1>

      <motion.p variants={fadeUp} className="text-lg mb-4 text-gray-700">
        Postpartum depression affects 1 in 5 mothers globally. Early detection,
        AI-powered screening, and professional support can improve outcomes for
        mothers and families.
      </motion.p>

      <motion.p variants={fadeUp} className="mb-4">
        Postpartum depression (PPD) is a complex mental health condition that
        affects mothers after childbirth. It goes beyond the common "baby
        blues" and can include persistent sadness, overwhelming anxiety,
        irritability, and difficulty bonding with the newborn.
      </motion.p>

      <motion.p variants={fadeUp} className="mb-6">
        PPD impacts not only the mother but also the infant, partner, and entire
        family. Early recognition, professional intervention, and consistent
        support are crucial for recovery. MumWell provides a comprehensive
        platform to educate, screen, and guide mothers through this challenging
        period.
      </motion.p>

      {/* Animated Image */}
      <motion.div
        variants={fadeUp}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="my-6 flex justify-center"
      >
        <Image
          src="/ppd.jpg"
          height={600}
          width={600}
          alt="Healthy mother bonding with child"
          className="rounded-lg shadow-lg md:w-[60%] w-full md:h-72 h-52"
        />
      </motion.div>

      <motion.h3
        variants={fadeUp}
        className="text-2xl font-semibold mt-8 mb-4"
      >
        Common Signs and Symptoms of Postpartum Depression
      </motion.h3>

      <motion.p variants={fadeUp} className="mb-4">
        While every mother experiences the postpartum period differently, PPD
        has recognizable symptoms that can signal the need for support.
      </motion.p>

      <motion.ul
        variants={fadeUp}
        className="list-disc pl-6 mb-6 space-y-2 text-foreground"
      >
        <li>Persistent sadness or hopelessness lasting more than two weeks</li>
        <li>Loss of interest or pleasure in daily activities</li>
        <li>Anxiety, panic attacks, or obsessive thoughts about the baby</li>
        <li>Difficulty bonding or caring for the newborn</li>
        <li>Changes in sleep or appetite unrelated to normal postpartum shifts</li>
        <li>Feelings of guilt or self-blame</li>
        <li>Fatigue interfering with daily functioning</li>
        <li>Thoughts of self-harm (seek immediate help)</li>
      </motion.ul>

      <motion.h3
        variants={fadeUp}
        className="text-2xl font-semibold mt-8 mb-4"
      >
        Factors That Increase Risk of Postpartum Depression
      </motion.h3>

      <motion.p variants={fadeUp} className="mb-4">
        While PPD can affect any mother, certain factors increase vulnerability.
      </motion.p>

      <motion.div variants={fadeUp} className="mb-6">
        <h4 className="font-semibold text-lg mb-2">Common Risk Factors:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Previous Mental Health Conditions:</strong> Prior depression
            or anxiety increases PPD likelihood.
          </li>
          <li>
            <strong>Stressful Life Events:</strong> Financial or relationship
            stress can contribute to depression.
          </li>
          <li>
            <strong>Lack of Social Support:</strong> Isolation worsens
            postpartum stress.
          </li>
          <li>
            <strong>Complications During Pregnancy:</strong> Premature birth or
            difficult delivery can heighten anxiety.
          </li>
          <li>
            <strong>Hormonal Changes:</strong> Rapid drops in estrogen and
            progesterone affect mood regulation.
          </li>
        </ul>
      </motion.div>

      <motion.h3
        variants={fadeUp}
        className="text-2xl font-semibold mt-8 mb-4"
      >
        The Importance of Early Detection
      </motion.h3>

      <motion.p variants={fadeUp} className="mb-4">
        Timely recognition of PPD allows early intervention, reducing long-term
        risks for mother and baby.
      </motion.p>

      <motion.div variants={fadeUp} className="mb-6">
        <h4 className="font-semibold text-lg mb-2">
          Early Detection Strategies:
        </h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Self-assessment using mood and sleep tracking</li>
          <li>Partner and family observations</li>
          <li>
            <strong>AI-Powered Screening:</strong> MumWell provides confidential
            assessments and insights.
          </li>
          <li>Routine checkups with healthcare providers</li>
        </ul>
      </motion.div>

      <motion.h3
        variants={fadeUp}
        className="text-2xl font-semibold mt-8 mb-4"
      >
        How MumWell Supports Mothers
      </motion.h3>

      <motion.p variants={fadeUp} className="mb-4">
        MumWell combines technology, education, and professional care to support
        mothers through PPD.
      </motion.p>

      <motion.ul variants={fadeUp} className="list-disc pl-6 space-y-2 mb-6">
        <li>AI Screening for early detection</li>
        <li>24/7 AI Chat Guidance</li>
        <li>Professional Counseling (virtual or in-person)</li>
        <li>Educational Resources and mental health content</li>
        <li>Community Peer Support</li>
      </motion.ul>

      <motion.div
        variants={fadeUp}
        className="bg-card border-l-4 border-slate-100 p-4 my-6 rounded"
      >
        <p className="text-[#564356] font-medium">
          Proactive support reduces long-term risks, improves bonding, and
          strengthens family well-being.
        </p>
      </motion.div>

      <motion.h3
        variants={fadeUp}
        className="text-2xl font-semibold mt-8 mb-4"
      >
        Coping Strategies for Mothers
      </motion.h3>

      <motion.ul variants={fadeUp} className="list-disc pl-6 mb-6 space-y-2">
        <li>Prioritize self-care, sleep, and nutrition</li>
        <li>Accept help from loved ones</li>
        <li>Gentle exercise and mindfulness</li>
        <li>Stay socially connected</li>
        <li>Journal to process emotions</li>
        <li>Set realistic expectations</li>
      </motion.ul>

      <motion.h3
        variants={fadeUp}
        className="text-2xl font-semibold mt-8 mb-4"
      >
        Why Maternal Mental Health Matters
      </motion.h3>

      <motion.p variants={fadeUp} className="mb-4">
        Maternal mental health affects family relationships and child
        development. Education and accessible support ensure healthier outcomes.
      </motion.p>

      <motion.div
        variants={fadeUp}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="my-6 flex justify-center"
      >
        <Image
          src="/love.webp"
          height={600}
          width={600}
          alt="Healthy mother bonding with child"
          className="rounded-lg shadow-lg md:w-[60%] w-full md:h-72 h-52"
        />
      </motion.div>

      <motion.p variants={fadeUp} className="mb-4">
        MumWell bridges the gap between mothers and timely care, providing tools
        and resources that make real improvements in maternal mental health.
      </motion.p>
    </motion.div>
  );
};

export default PostpartumArticle;
