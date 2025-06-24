import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const categories = [
    {
        id: 1,
        name: "AI & Machine Learning",
        slug: "ai",
        postCount: 12,
        bg: "https://hospitalityinsights.ehl.edu/hubfs/Service-robots-1.jpg",
        icon: "🤖"
    },
    {
        id: 2,
        name: "Web Development",
        slug: "web-dev",
        postCount: 18,
        bg: "https://source.unsplash.com/400x250/?web,code",
        icon: "💻"
    },
    {
        id: 3,
        name: "Health & Wellness",
        slug: "health",
        postCount: 7,
        bg: "https://source.unsplash.com/400x250/?health,fitness",
        icon: "💪"
    },
    {
        id: 4,
        name: "Travel Diaries",
        slug: "travel",
        postCount: 9,
        bg: "https://source.unsplash.com/400x250/?travel,adventure",
        icon: "✈️"
    },
    {
        id: 5,
        name: "Productivity Hacks",
        slug: "productivity",
        postCount: 6,
        bg: "https://source.unsplash.com/400x250/?productivity,workspace",
        icon: "📈"
    },
    {
        id: 6,
        name: "Design & UI/UX",
        slug: "design",
        postCount: 11,
        bg: "https://source.unsplash.com/400x250/?ui,design",
        icon: "🎨"
    }
];

const CategoryHighlights = () => {
    return (
        <section className="py-12 px-4 md:px-16 bg-secondary w-11/12 mx-auto mb-10 rounded-xl">
            <h2 className="text-2xl font-bold mb-8 text-base-100 flex items-center gap-2">
                Explore by Category
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
                {categories.map(category => (

                    <Link
                        to={`/category/${category.slug}`}
                        key={category.id}
                        className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 group"
                    >
                        <div className="h-[180px] w-full">
                            <img
                                src={category.bg}
                                alt={category.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div className="absolute inset-0 bg-[#0d1b30] bg-opacity-40 group-hover:bg-opacity-50 transition duration-300 flex items-center justify-center">
                            <div className="text-center text-white px-4">
                                <div className="text-4xl mb-2">{category.icon}</div>
                                <h3 className="text-xl font-semibold">{category.name}</h3>
                                <p className="text-sm mt-1">{category.postCount} posts</p>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>

        </section>
    );
};

export default CategoryHighlights;
