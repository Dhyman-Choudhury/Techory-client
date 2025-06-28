import React from "react";
import { motion } from "framer-motion";

const aiTools = [
  {
    name: "ChatGPT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    desc: "Chatbot for conversation, writing, and coding assistance.",
    features: [
      "Text generation & editing",
      "Code writing & debugging",
      "Idea brainstorming",
      "Q&A chatbot",
    ],
    pricing: "Freemium",
    link: "https://chat.openai.com",
  },
  {
    name: "Runway ML",
    logo: "https://cdn.prod.website-files.com/65c2a77b89979755176b33cd/65e5ab79d00b07a089568371_runway-logo-500w.png",
    desc: "AI video editing & generation platform.",
    features: [
      "Video creation & editing",
      "Background removal",
      "AI-powered animation",
    ],
    pricing: "Paid (Free tier available)",
    link: "https://runwayml.com",
  },
  {
    name: "Hugging Face",
    logo: "https://huggingface.co/front/assets/huggingface_logo.svg",
    desc: "Repository of AI models for NLP, vision, and audio.",
    features: [
      "Text summarization & translation",
      "Image classification & generation",
      "Audio processing",
    ],
    pricing: "Freemium",
    link: "https://huggingface.co",
  },
  {
    name: "Perplexity AI",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL5d9Jn-1O8zCh_ows4VnvsiFjER-sWurDsQ&s",
    desc: "AI-powered search and answer engine.",
    features: ["Live sourced answers", "AI research assistant"],
    pricing: "Free",
    link: "https://www.perplexity.ai",
  },
  {
    name: "Midjourney",
    logo: "https://midjourney.com/apple-touch-icon.png",
    desc: "Generate artistic images from text prompts.",
    features: ["Text-to-image generation", "Style experimentation"],
    pricing: "Paid subscription",
    link: "https://www.midjourney.com",
  },
  {
    name: "Leonardo AI",
    logo: "https://brandlogos.net/wp-content/uploads/2025/05/leonardo_ai-logo_brandlogos.net_ctjsa.png",
    desc: "AI-powered art & asset creation for games.",
    features: ["Concept art generation", "Texture creation"],
    pricing: "Freemium",
    link: "https://leonardo.ai",
  },
];

// Animation variants for container and cards
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const CategoryHighlights = () => {
  return (
    <section className="py-12 px-4 md:px-16 bg-secondary mb-10 w-11/12 mx-auto rounded-xl">
      <h2 className="text-3xl font-bold text-center text-base-100 mb-5">
        🛠️ Recommended AI Tools & What You Can Do
      </h2>
      <p className="mb-5 text-lg text-center text-base-100">You can visit this tool's website to click visit tool button.</p>
      <p className="mb-10 text-lg text-center text-base-100">Framer Motion is implemented in every card and logo.</p>
      <motion.div
        className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {aiTools.map((tool, index) => (
          <motion.a
            key={index}
            href={tool.link}
            target="_blank"
            rel="noreferrer"
            className="bg-[#16253a] rounded-xl shadow-md transition-all duration-300 p-6 flex flex-col items-center text-center group"
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={tool.logo}
              alt={tool.name}
              className="h-12 mb-4 object-contain group-hover:scale-105 transition"
            />
            <h3 className="text-lg font-semibold text-base-100 mb-2">{tool.name}</h3>
            <p className="text-sm text-base-100 mb-3">{tool.desc}</p>
            <ul className="text-sm text-gray-300 list-disc list-inside mb-3">
              {tool.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <p className="text-sm font-semibold text-blue-500 mb-2">{tool.pricing}</p>
            <button className="btn btn-primary mt-auto">Visit Tool</button>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default CategoryHighlights;
