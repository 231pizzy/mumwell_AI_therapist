'use client'

import { useState } from "react";
import { ChevronDown, ChevronUp, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const faqs = [
  {
    question: "How can I schedule a therapy session?",
    answer: "You can schedule a session by logging into your account and clicking on 'Book a Session'."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. All your personal data is encrypted and handled according to GDPR guidelines."
  },
  {
    question: "Can I access MumWell on mobile?",
    answer: "Yes! MumWell is fully responsive and works on all modern devices and browsers."
  },
];

const socialLinks = [
  { name: "Facebook", url: "http://linkedin.com/in/obiora-ejiofor-282496177", icon: <Facebook /> },
  { name: "Twitter", url: "http://linkedin.com/in/obiora-ejiofor-282496177", icon: <Twitter /> },
  { name: "Instagram", url: "https://www.instagram.com/techwithpizzy?igsh=cXk5d3pjNWRpMDEz&utm_source=qr", icon: <Instagram /> },
  { name: "LinkedIn", url: "http://linkedin.com/in/obiora-ejiofor-282496177", icon: <Linkedin /> },
];

const ContactPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start md:p-6 p-2 mt-26">
      <div className="max-w-4xl w-full bg-card border border-slate-200 rounded-2xl shadow-lg p-10 sm:p-12 mt-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 text-center">Contact MumWell</h1>
        <p className="text-foreground mb-8 text-center">
          Have questions or need support? Reach us through email, social media, or check our FAQs below.
        </p>

        {/* Contact Info */}
        <div className="mb-10 text-center text-gray-700 space-y-2">
          <p>Email: <a href="mailto:support@mumwell.org" className="text-foreground italic hover:underline">support@mumwell.org</a></p>
          <p>Phone: <a href="tel:+2348062329708" className="text-foreground italic hover:underline">+234 8062329708</a></p>
        </div>

        {/* Social Media */}
        <div className="mb-10 flex justify-center gap-6 text-2xl text-gray-600">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fuchsia-400 transition"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <button
                  className="flex justify-between w-full text-left font-medium text-gray-700 focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  {openFAQ === index ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openFAQ === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
