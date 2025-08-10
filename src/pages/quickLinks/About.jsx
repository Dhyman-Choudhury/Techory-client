import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About Us | Techory ";
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-16 px-3d md:px-10 lg:16 mb-10 rounded-xl">
      <div className="text-center  p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">
          About <span className="text-primary">Techory</span>
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Welcome to <strong>Techory</strong> – your go-to hub for all things AI, 
          technology trends, and innovation. Our mission is simple: 
          to make cutting-edge AI knowledge accessible, engaging, 
          and useful for everyone — from curious beginners to seasoned professionals.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          We believe AI isn’t just the future — it’s the present. 
          That’s why we bring you insightful articles, tutorials, 
          and thought pieces that bridge the gap between complex concepts 
          and practical applications. Every blog post is crafted with 
          passion, accuracy, and a deep commitment to quality.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To empower readers with AI knowledge, inspire innovation, 
              and encourage responsible adoption of emerging technologies 
              in everyday life and business.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              A world where AI is understood, trusted, and harnessed 
              for the greater good — fostering creativity, efficiency, 
              and problem-solving on a global scale.
            </p>
          </div>
        </div>

        <div className="mt-10 bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6">
            Be part of a growing network of AI enthusiasts, 
            developers, and innovators. Subscribe to our blog, 
            share your thoughts, and let’s shape the future together.
          </p>
          <button className="btn btn-secondary">Subscribe Now</button>
        </div>
      </div>
    </div>
  );
};

export default About;
