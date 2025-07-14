import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router'; // 🛠️ changed from 'react-router' to 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import useWishlist from '../api/useWishlist';

const WishList = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { wishlistPromise, deleteWishlistItem } = useWishlist();

    useEffect(() => {
        document.title = "Wishlist | techory";

        if (user?.email) {
             wishlistPromise(user.email)
                .then(res => {
                    setData(res);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching wishlist:", error);
                    setLoading(false);
                });
        }
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteWishlistItem(id)
                    .then(res => {
                        if (res.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remainingBlogs = data.filter(blog => blog._id !== id);
                            setData(remainingBlogs);
                        }
                    })
                    .catch(error => {
                        console.error("Delete failed:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong while deleting.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    if (loading) {
        return <div className='text-center text-white py-20'>Loading...</div>
    }

    return (
        <div className='bg-secondary w-11/12 mx-auto min-h-[calc(100vh-340px)] my-10 rounded-xl'>
            <h2 className='text-5xl font-bold text-white text-center pt-10'>Your Wishlist Blogs</h2>

            {Array.isArray(data) && data.length > 0 ? (
                <div className='w-11/12 mx-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {data.map(event => (
                        <div key={event._id} className="bg-[#1B2431] shadow-xl rounded-xl m-6 w-full p-5">
                            <img
                                src={event.photo}
                                alt={event.title}
                                className="w-full object-cover rounded-xl h-[250px] shadow-2xl"
                            />
                            <div className="p-5 space-y-3">
                                <h2 className="text-xl font-bold text-base-100 mb-1">{event.title}</h2>
                                <p className="text-sm text-base-100">
                                    <span className='font-semibold text-base-100'>Author :</span> {event.name}
                                </p>
                                <p className="text-sm text-base-100">
                                    <span className='font-semibold text-base-100'>Category :</span> {event.category}
                                </p>
                                <p className="text-sm text-base-100">
                                    <span className='font-semibold text-base-100'>Short Description:</span> {event.shortDescription}
                                </p>
                                <div className='flex justify-between'>
                                    <Link to={`/blogDetails/${event.blogId}`}>
                                        <button className='btn btn-primary'>View Details</button>
                                    </Link>
                                    <button onClick={() => handleDelete(event._id)} className='btn btn-primary'>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='w-full text-center py-20'>
                    <h3 className='text-3xl text-base-100 my-5'>There are no Wishlist Blogs</h3>
                    <p className='text-2xl text-base-100 mb-5'>You can add wishlist blogs from the homepage.</p>
                    <button onClick={() => navigate('/')} className='btn btn-primary'>Home</button>
                </div>
            )}
        </div>
    );
};

export default WishList;
