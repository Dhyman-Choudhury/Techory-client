import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
import { motion } from 'framer-motion';

const RecentBlogs = ({ newBlogs }) => {
    const { user } = useContext(AuthContext);

    const handleWishList = (id) => {
        const wishData = newBlogs.find(blog => blog._id === id);

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

    const sortedBlogs = [...newBlogs].sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
    const sliced = sortedBlogs.slice(0, 6);

    return (
        <div>
            <h2 className='text-5xl font-bold  text-white text-center pt-10'>Recent Blogs</h2>
            <div className='w-11/12 mx-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    sliced.map(event => (
                        <motion.div
                            key={event._id}
                            whileHover={{
                                y: -10,
                                backgroundColor: "#21183e",
                                transition: { duration: 0.5 }
                            }}
                            className="bg-[#1B2431] shadow-xl rounded-xl m-6 w-full p-5 cursor-pointer"
                        >
                            <img
                                src={event.photo}
                                alt={event.title}
                                className="w-full object-cover rounded-xl h-[250px] shadow-2xl"
                            />
                            <div className="p-5 space-y-3">
                                <h2 className="text-xl font-bold text-base-100 mb-1">{event.title}</h2>
                                <p className="text-sm text-gray-600">
                                    <span className='font-semibold text-base-100'>Category :</span> {event.category}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className='font-semibold text-base-100'>Short Description:</span> {event.shortDescription}
                                </p>
                                <div className='flex justify-between'>
                                    <Link to={`/blogDetails/${event._id}`}>
                                        <button className='btn btn-primary'>View Details</button>
                                    </Link>
                                    <button onClick={() => handleWishList(event._id)} className='btn btn-primary'>Wishlist</button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    );
};

export default RecentBlogs;
