import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';

const AllBlogs = () => {
    const {user}=use(AuthContext)
    useEffect(() => {
        document.title = "All Blogs | techory";
    }, []);

    const data = useLoaderData();
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredData, setFilteredData] = useState(data || []);

    // Get unique categories
    const categories = ['all', ...new Set(data.map(blog => blog.category))];

    useEffect(() => {
        let filtered = data;
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(event => event.category === selectedCategory);
        }
        setFilteredData(filtered);
    }, [selectedCategory, data]);

    // ✅ Search handler (server-side)

    const handleSearch = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/blogs`, {
            params: { title: searchText }
        })
            .then(res => {
                const result = res.data;
                setFilteredData(
                    selectedCategory === 'all'
                        ? result
                        : result.filter(blog => blog.category === selectedCategory)
                );
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

        axios.get(`${import.meta.env.VITE_API_URL}/wishlist/${id}?email=${user.email}`)
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
                            toast.error("Failed to add to wishlist.");
                        });
                }
            })
            .catch(() => {
                toast.error("Failed to check wishlist.");
            });
    };

    return (
        <div className='bg-secondary w-11/12 mx-auto mb-5 min-h-screen rounded-xl'>
            <ToastContainer/>
            <h2 className='text-5xl font-bold text-white text-center pt-10'>All Blogs</h2>

            {/* Filter + Search */}
            <div className="w-11/12 mx-auto mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="select select-bordered w-full md:w-1/4 px-4 py-2 rounded-lg"
                >
                    {
                        categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))
                    }
                </select>

                {/* Search Box + Button */}
                <div className="flex w-full md:w-3/4 gap-4">
                    <input
                        type="text"
                        placeholder="Search blog by title"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="input input-bordered w-full px-4 py-2 rounded-lg"
                    />
                    <button
                        className="btn btn-primary px-6 py-2 rounded-lg"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Blog Cards */}
            <div className=' mx-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    filteredData.length > 0 ? filteredData.map(event => (
                        <div key={event._id} className="bg-[#1B2431] shadow-xl rounded-xl w-full p-5">
                            <img
                                src={event.photo}
                                alt={event.title}
                                className="w-full object-cover rounded-xl h-[250px] shadow-2xl"
                            />
                            <div className="p-5 space-y-3">
                                <h2 className="text-xl font-bold text-base-100 mb-1">{event.title}</h2>
                                <p className="text-sm text-gray-400"><span className='font-semibold text-base-100'>Category :</span> {event.category}</p>
                                <p className="text-sm text-gray-400"><span className='font-semibold text-base-100'>Short Description:</span> {event.shortDescription}</p>
                                <div className='flex justify-between pt-3'>
                                    <Link to={`/blogDetails/${event._id}`}>
                                        <button className='btn btn-primary'>View Details</button>
                                    </Link>
                                    <button onClick={() => handleWishList(event._id)} className='btn btn-primary'>Wishlist</button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-3 text-center text-red-400 text-xl mt-10">
                            No blogs found.
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AllBlogs;
