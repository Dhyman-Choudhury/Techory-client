import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

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
  {
    name: "Gamma App",
    logo: "https://gamma.app/favicon-196.png",
    desc: "AI-powered presentation and document creation tool.",
    features: ["Slide design automation", "Text-to-presentation", "Collaboration tools"],
    pricing: "Freemium",
    link: "https://gamma.app",
  },
  {
    name: "ElevenLabs",
    logo: "https://elevenlabs.io/favicon.ico",
    desc: "AI voice generation and text-to-speech platform.",
    features: ["Realistic AI voices", "Voice cloning", "Multilingual support"],
    pricing: "Freemium",
    link: "https://elevenlabs.io",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = (index) => ({
  hidden: { opacity: 0, y: index % 2 === 0 ? -30 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
});

const CategoryHighlights = () => {
  return (
    <section className="py-12 px-4 md:px-16 bg-gray-100 rounded-xl mb-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Recommended AI Tools
      </h2>

      <motion.div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
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
            className="bg-white rounded-lg shadow-md flex items-center p-4 gap-4 group transition-all duration-300"
            variants={cardVariants(index)}
            style={{ perspective: 800, transformStyle: "preserve-3d" }}
            whileHover={{
              rotateY: 360,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
          >
            {/* Logo */}
            <img
              src={tool.logo}
              alt={tool.name}
              className="h-16 w-16 object-contain rounded-full bg-gray-50 p-2 group-hover:scale-110 transition"
            />

            {/* Content */}
            <div className="flex flex-col justify-between h-full space-y-2">
              <div className="space-y-2">
                <h3 className="text-[16px] font-semibold text-gray-800 mb-1">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-700 line-clamp-2">{tool.desc}</p>
                <ul className="text-xs text-gray-500 list-disc list-inside">
                  {tool.features.slice(0, 2).map((feature, i) => (
                    <li key={i} className="truncate">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between">
                <p className="text-xs font-semibold text-blue-500">{tool.pricing}</p>
                <div className="flex items-center gap-0.5 text-xs font-semibold text-blue-500">
                  <p>Visit</p>
                  <FaArrowRight />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default CategoryHighlights;
