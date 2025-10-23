"use client";

import Hero from "@/components/aboutPageComponents/Hero";
import { motion } from "framer-motion";
import Image from "next/image";
import FeaturesCarousel from "@/components/homePagecomponents/FeaturesSlider";
import Link from "next/link";

export default function Features() {
    return (
        <>
            <Hero title="Features" />
            <div className="min-h-screen bg-background text-foreground font-din-condensed">
                {/* Header Section */}
                <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20">
                    <div className="max-w-5xl mx-auto text-center px-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-bold mb-4"
                        >
                            Discover MumWell Features
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                        >
                            MumWell combines modern technology and compassionate care to help
                            mothers navigate the challenges of postpartum recovery providing
                            personalized support, education, and guidance through AI-powered
                            wellness tools.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="absolute bottom-0 left-0 right-0 flex justify-center mt-10"
                    >
                        <Image
                            src="/hero-mumwell.png"
                            alt="MumWell Feature Banner"
                            width={800}
                            height={500}
                            className="rounded-2xl shadow-2xl hidden md:block"
                        />
                    </motion.div>
                </section>

                {/* Carousel Section */}
                <section className="py-10 md:py-24 bg-card/30 border-t border-primary/10">
                    <div className="max-w-6xl mx-auto px-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-center mb-10"
                        >
                            Explore Core Features
                        </motion.h2>
                        <FeaturesCarousel />
                    </div>
                </section>

                {/* Insight Section */}
                <section className="py-10 bg-background border-t border-primary/10">
                    <div className="max-w-4xl mx-auto text-center px-6">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-2xl md:text-3xl font-semibold mb-6"
                        >
                            Technology with a Human Touch
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-muted-foreground text-lg leading-relaxed"
                        >
                            Every MumWell feature is built around one mission to make
                            maternal wellness accessible and stigma-free. From mood tracking
                            and AI-assisted early detection to on-demand counseling and
                            community resources, MumWell ensures that no mother goes through
                            postpartum struggles alone.
                        </motion.p>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 bg-gradient-to-r from-primary/10 via-background to-primary/10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto text-center px-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Supporting Mothers. Saving Lives.
                        </h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Join the movement to make maternal mental health accessible,
                            stigma-free, and empowered by technology.
                        </p>
                        <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-md">
                            <Link href="/signup">

                                Get Started with MumWell{' '}
                            </Link>
                        </button>
                    </motion.div>
                </section>
            </div>
        </>
    );
}
