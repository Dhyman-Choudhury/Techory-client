import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const RecentBlogs = ({ newBlogs }) => {
  const { user } = useContext(AuthContext);

  const handleWishList = (id) => {
    const wishData = newBlogs.find(blog => blog._id === id);

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
              toast.error("Failed to add to wishlist 1.");
            });
        }
      })
      .catch(() => {
        toast.error("Failed to check wishlist 2.");
      });
  };

  const sortedBlogs = [...newBlogs].sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
  const sliced = sortedBlogs.slice(0, 8); // Show 8 cards

  return (
    <div className='w-full bg-gray-100 px-3 md:px-10 lg:px-16 py-10'>
      <h2 className='text-5xl font-bold text-gray-800 text-center mb-12'>Recent Blogs</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {sliced.map((event, index) => {
          const isLeftColumn = index % 2 === 0;

          return (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, x: isLeftColumn ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{
                y: -10,
                boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                transition: { duration: 0.6 }
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer flex flex-col md:flex-row"
              style={{ minHeight: '200px' }}
            >
              <div className="p-3 flex-shrink-0">
                <img
                  src={event.photo}
                  alt={event.title}
                  className="w-full md:w-48 h-48 object-cover rounded-lg"
                />
              </div>
              <div className="p-5 flex flex-col justify-between flex-grow min-w-0 md:ml-5">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">{event.title}</h2>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className='font-semibold'>Category: </span>{event.category}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-3">{event.shortDescription}</p>
                </div>
                <div className='flex justify-between mt-5'>
                  <Link to={`/blogDetails/${event._id}`}>
                    <button className='text-primary md:font-semibold flex items-center md:gap-1'>
                      <p>View Details</p> <FaArrowRight />
                    </button>
                  </Link>
                  <button onClick={() => handleWishList(event._id)} className='btn btn-primary'>
                    Wishlist
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentBlogs;
