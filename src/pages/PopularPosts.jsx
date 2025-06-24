import React from 'react';

const popularPosts = [
  {
    id: 1,
    title: "AI Tools Revolutionizing Daily Life",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_ZB7VlWZjiXep4GPRiuqUoqWxVLhgvsdxftFvhpKqEtGlPbtnBU9CKWj-kSFnqwIMbU&usqp=CAU",
    views: 1284,
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "10 JavaScript Tricks Every Dev Should Know",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1000/1*R16CtlXXOFYRnlgF8vI0iA.png",
    views: 986,
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Building Responsive Layouts with Tailwind CSS",
    thumbnail: "https://pbs.twimg.com/media/GkUNLrLW0AEPPGU?format=jpg&name=4096x4096",
    views: 834,
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Mastering React 19: New Features & Best Practices",
    thumbnail: "https://media.licdn.com/dms/image/v2/D4E12AQEaJPEAqzcFNw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1724217649243?e=2147483647&v=beta&t=5dVakTq1FUu5sHPxZsG20qaLtdkh3Aua5YvsPgxlpWk",
    views: 1123,
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Why TypeScript Is a Must-Have Skill in 2025",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1200/1*ozoWrwjOVLfodx9ig6YjAA.jpeg",
    views: 920,
    readTime: "5 min read"
  },
  {
    id: 6,
    title: "How to Use Framer Motion for Stunning UI Animation",
    thumbnail: "https://images.prismic.io/reskue-prismic/ZgLR3ccYqOFdyFsm_FramerMotion.png?auto=format%2Ccompress&rect=38%2C0%2C1524%2C800&w=2400&h=1260",
    views: 670,
    readTime: "4 min read"
  },
];


const PopularPosts = () => {
  return (
    <section className="py-10 px-4 md:px-16  w-11/12 mx-auto rounded-xl mb-10 bg-secondary">
      <h2 className="text-4xl font-bold mb-6 text-base-100 text-center "> Trending Now</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {popularPosts.map(post => (
          <div key={post.id} className="bg-[#1B2431] rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
            <img src={post.thumbnail} alt={post.title} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-base-100">{post.title}</h3>
              <div className="text-sm text-gray-300 mt-2 flex justify-between">
                <span>👁 {post.views} views</span>
                <span>⏱ {post.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularPosts;
