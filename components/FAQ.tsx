'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
      }}
      className="border-b border-neutral-800"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <h3 className={`text-xl md:text-2xl font-syne font-medium transition-colors ${isOpen ? 'text-lime-400' : 'text-white group-hover:text-neutral-300'}`}>
          {question}
        </h3>
        <span className={`p-2 rounded-full border transition-all ${isOpen ? 'border-lime-400 text-lime-400 rotate-180' : 'border-neutral-700 text-white'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-neutral-400 leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Are the requests actually unlimited?",
      answer: "Absolutely! As our client, you have the freedom to submit as many requests as you wish. There's no cap on the number of tasks you can queue. We'll process each one sequentially, ensuring you receive each task's outcomes before moving on to the next."
    },
    {
      question: "How and where are tasks managed?",
      answer: "We have a notion dashboard created for you that has all the tasks, milestones, resources, notes and everything around the project. Complete transparency."
    },
    {
      question: "Do you provide white labeled services?",
      answer: "Yes, we evaluate if it aligns with what we're doing. Contact us to know more about our partnership programs."
    },
    {
      question: "How long do website revamps take?",
      answer: "Depending on the number of pages it can take anywhere between 1-3 months. We will get your homepage live in under one month. Then plan phase 2 for other releases."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-syne font-bold mb-6"
          >
            Frequently Asked <br/> Questions
          </motion.h2>
        </div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl"
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;