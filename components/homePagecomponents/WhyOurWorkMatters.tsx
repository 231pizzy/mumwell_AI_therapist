import { motion } from "framer-motion";
import { Heart, Activity, Users } from "lucide-react";

export function WhyOurWorkMatters() {
  return (
    <section
      aria-labelledby="why-our-work-matters"
      className="max-w-6xl mx-auto px-6 py-16 lg:py-24 bg-background rounded-2xl shadow-lg"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 id="why-our-work-matters" className="text-3xl md:text-5xl font-bold text-foreground">
          Why Our Work Matters
        </h2>
        <p className="mt-4 text-lg lg:text-xl text-foreground">
          Maternal mental health is a critical and often overlooked public health issue. Early
          recognition and support change outcomes for mothers, babies, and entire families.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 grid gap-6 sm:grid-cols-3 items-stretch"
      >
        <article
          className="bg-card p-6 rounded-2xl border border-fuchsia-100 shadow-sm flex flex-col items-start"
          aria-labelledby="stat-1"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-100/60">
            <Heart className="w-6 h-6 text-primary" aria-hidden />
          </div>
          <h3 id="stat-1" className="mt-4 text-4xl font-extrabold leading-none text-primary">
            1 in 5
          </h3>
          <p className="mt-2 text-sm text-foreground">mothers are diagnosed with postpartum depression</p>
        </article>

        <article
          className="bg-card p-6 rounded-2xl border border-fuchsia-100 shadow-sm flex flex-col items-start"
          aria-labelledby="stat-2"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-100/60">
            <Activity className="w-6 h-6 text-primary" aria-hidden />
          </div>
          <h3 id="stat-2" className="mt-4 text-4xl font-extrabold leading-none text-primary">
            25%
          </h3>
          <p className="mt-2 text-sm text-foreground">of women with PPD still have symptoms 3 years later</p>
        </article>

        <article
          className="bg-card p-6 rounded-2xl border border-fuchsia-100 shadow-sm flex flex-col items-start"
          aria-labelledby="stat-3"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-100/60">
            <Users className="w-6 h-6 text-primary" aria-hidden />
          </div>
          <h3 id="stat-3" className="mt-4 text-4xl font-extrabold leading-none text-primary">
            3x
          </h3>
          <p className="mt-2 text-sm text-foreground">PPD and PPA symptoms have tripled since the pandemic</p>
        </article>
      </motion.div>

      <div className="mt-10 max-w-2xl mx-auto text-center">
        <p className="text-sm text-foreground">
          These numbers show the urgent need for accessible screening and empathetic support. MumWell
          provides early detection and actionable help so no mother has to navigate this alone.
        </p>
      </div>
    </section>
  );
}
