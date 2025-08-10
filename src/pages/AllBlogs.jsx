import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
import { FaArrowRight, FaSearch } from 'react-icons/fa';

const ITEMS_PER_PAGE = 6;

const AllBlogs = () => {
    const { user } = use(AuthContext);

    useEffect(() => {
        document.title = "All Blogs | Techory";
    }, []);

    const data = useLoaderData();

    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredData, setFilteredData] = useState(data || []);
    const [currentPage, setCurrentPage] = useState(1);

    // Get unique categories
    const categories = ['all', ...new Set(data.map(blog => blog.category))];

    // Filter by category when category or data changes
    useEffect(() => {
        let filtered = data;
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(blog => blog.category === selectedCategory);
        }
        setFilteredData(filtered);
        setCurrentPage(1); // reset page on filter change
    }, [selectedCategory, data]);

    // Handle search (server-side)
    const handleSearch = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/blogs`, {
            params: { title: searchText }
        })
            .then(res => {
                const result = res.data;
                const filteredResult =
                    selectedCategory === 'all'
                        ? result
                        : result.filter(blog => blog.category === selectedCategory);
                setFilteredData(filteredResult);
                setCurrentPage(1); // reset page on search
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
            });
    };

    const handleWishList = (id) => {
        const wishData = data.find(blog => blog._id === id);

        if (!wishData || !user?.email) {
            toast.error("Invalid data or user not logged in.");
            return;
        }

        axios.get(`${import.meta.env.VITE_API_URL}/my-wishlist/${id}?email=${user.email}`)
            .then(checkRes => {
                if (checkRes.data?.exists) {
                    toast.info("This blog is already in your wishlist.");
                } else {
                    const dataToSave = {
                        ...wishData,
                        blogId: id,
                        userEmail: user.email
                    };
                    delete dataToSave._id;

                    axios.post(`${import.meta.env.VITE_API_URL}/wishlist`, dataToSave)
                        .then(postRes => {
                            if (postRes.data?.insertedId) {
                                toast.success("You’ve successfully added the blog to your wishlist.");
                            }
                        })
                        .catch(() => {
                            toast.error("Failed to add to wishlist-1.");
                        });
                }
            })
            .catch(() => {
                toast.error("Failed to check wishlist-2.");
            });
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Pagination controls
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll top on page change
    };

    return (
        <div className='bg-gray-100 w-full min-h-screen rounded-xl flex flex-col md:flex-row p-6 gap-6 mb-10'>

            <ToastContainer />

            {/* Sidebar - Search & Filter */}
            <aside className="w-full md:w-1/4 md:mt-20 rounded-xl p-6 sticky top-6 self-start h-max  bg-white shadow-md">

                {/* Category Filter */}
                <label className="block mb-3 text-gray-800 font-semibold">Category</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="select select-bordered w-full px-4 py-2 rounded-lg mb-8"
                >
                    {
                        categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))
                    }
                </select>

                {/* Search Box */}
                <label className="block  mb-3 text-gray-800 font-semibold">Search by Title</label>
                <div className="relative w-full mb-4">
                    <input
                        type="text"
                        placeholder="Search blog by title"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="input input-bordered w-full px-4 py-2 rounded-lg pr-10"
                        onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
                    />
                    <FaSearch
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={18}
                    />
                </div>
            </aside>

            {/* Blog Cards Section */}
            <main className='flex-1'>
                <h2 className='text-4xl font-bold text-gray-900 text-center mb-10'>All Blogs</h2>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        paginatedData.length > 0 ? paginatedData.map(event => (
                            <div
                                key={event._id}
                                className="bg-white shadow-xl rounded-xl w-full p-5 flex flex-col"
                                style={{ minHeight: '100%', flexGrow: 1 }}
                            >
                                <img
                                    src={event.photo}
                                    alt={event.title}
                                    className="w-full object-cover rounded-xl h-[250px] shadow-md"
                                />
                                <div className="p-5 space-y-3 flex flex-col flex-grow">
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h2>
                                    <p className="text-sm text-gray-600"><span className='font-semibold text-gray-900'>Category :</span> {event.category}</p>
                                    <p className="text-sm text-gray-600 flex-grow"><span className='font-semibold text-gray-900'>Short Description:</span> {event.shortDescription}</p>
                                    <div className='flex justify-between pt-3 text-primary md:font-semibold'>
                                        <Link to={`/blogDetails/${event?._id}`} className='flex items-center gap-1 hover:underline'>
                                            <span>View Details</span> <FaArrowRight />
                                        </Link>
                                        <button
                                            onClick={() => handleWishList(event?._id)}
                                            className="flex  items-center gap-1 text-primary hover:underline bg-transparent border-none p-0 cursor-pointer"
                                            type="button"
                                        >
                                            <span className='btn btn-soft btn-success'>Wishlist</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-3 text-center text-red-600 text-xl mt-10">
                                No blogs found.
                            </div>
                        )
                    }
                </div>

                {/* Pagination */}
                {
                    totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-10">
                            <button
                                className="btn btn-outline btn-primary"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={`btn btn-outline ${currentPage === i + 1 ? 'bg-gray-200 text-gray-900' : 'border border-gray-300 text-gray-700'}`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                className="btn btn-outline btn-primary"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )
                }
            </main>
        </div>
    );
};

export default AllBlogs;
