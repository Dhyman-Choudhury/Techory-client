import React from "react";
import { motion } from "framer-motion";

const popularPosts = [
  {
    id: 1,
    title: "AI Tools Revolutionizing Daily Life",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_ZB7VlWZjiXep4GPRiuqUoqWxVLhgvsdxftFvhpKqEtGlPbtnBU9CKWj-kSFnqwIMbU&usqp=CAU",
    views: 1284,
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "10 JavaScript Tricks Every Dev Should Know",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1000/1*R16CtlXXOFYRnlgF8vI0iA.png",
    views: 986,
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Building Responsive Layouts with Tailwind CSS",
    thumbnail:
      "https://pbs.twimg.com/media/GkUNLrLW0AEPPGU?format=jpg&name=4096x4096",
    views: 834,
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Mastering React 19: New Features & Best Practices",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D4E12AQEaJPEAqzcFNw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1724217649243?e=2147483647&v=beta&t=5dVakTq1FUu5sHPxZsG20qaLtdkh3Aua5YvsPgxlpWk",
    views: 1123,
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Why TypeScript Is a Must-Have Skill in 2025",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1200/1*ozoWrwjOVLfodx9ig6YjAA.jpeg",
    views: 920,
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "How to Use Framer Motion for Stunning UI Animation",
    thumbnail:
      "https://images.prismic.io/reskue-prismic/ZgLR3ccYqOFdyFsm_FramerMotion.png?auto=format%2Ccompress&rect=38%2C0%2C1524%2C800&w=2400&h=1260",
    views: 670,
    readTime: "4 min read",
  },
  {
    id: 7,
    title: "Exploring the Future of Web Development",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5612AQGvXXjCBq-Etg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1688710312431?e=2147483647&v=beta&t=VcJ32B4UgNZ0IxGIqklVdjvATtNWVhZmW39gpn8Um0g",
    views: 1450,
    readTime: "6 min read",
  },
  {
    id: 8,
    title: "Cloud Computing Trends to Watch in 2025",
    thumbnail:
      "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/67939b89a108d3001d27ada7.jpg",
    views: 1100,
    readTime: "5 min read",
  },
];

const PopularPosts = () => {
  return (
    <section className="py-10 px-4 md:px-16 w-full rounded-xl mb-10 bg-secondary">
      <h2 className="text-4xl font-bold mb-8 text-base-100 text-center tracking-wide">
        🔥 Trending Now
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15, // wave timing
              ease: "easeOut",
            }}
            className="bg-[#1B2431] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
          >
            <div className="overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-base-100 group-hover:text-green-700 transition-colors duration-300">
                {post.title}
              </h3>
              <div className="text-sm text-base-100 group-hover:text-green-700 mt-3 flex justify-between items-center">
                <span>👁 {post.views.toLocaleString()} views</span>
                <span>⏱ {post.readTime}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PopularPosts;
