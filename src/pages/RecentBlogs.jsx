import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';

const RecentBlogs = ({ newBlogs }) => {
    // const [sliced, setSliced] = useState()
    // if (!Array.isArray(newPlants)) {
    //     return <div className="text-center mt-10 text-red-500">No plant data available or data format is invalid.</div>;
    // }
    const sortedBlogs = [...newBlogs].sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
     const sliced = sortedBlogs.slice(0, 6) 

    return (
        <div >
            <h2 className='text-5xl font-bold text-white text-center pt-10'>Recent Blogs</h2>
            <div className='w-11/12 mx-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>

                {
                    sliced.map(event => (
                        <div key={event._id} className="bg-[#1B2431] shadow-xl rounded-xl m-6 w-full p-5 ">
                            <img
                                src={event.photo}
                                alt={event.title}
                                className="w-full  object-cover rounded-xl h-[250px] shadow-2xl"
                            />
                            <div className="p-5 space-y-3">
                                <h2 className="text-xl font-bold text-green-700 mb-1">{event.title}</h2>
                                <p className="text-sm text-gray-600 "><span className='font-semibold text-green-700'>Category :</span> {event.category}</p>
                                <p className="text-sm text-gray-600"><span className='font-semibold text-green-700'>Short Description:</span> {event.shortDescription}</p>
                                {/* <p className="text-sm text-gray-600 mb-2"><span className='font-semibold text-green-700'>Long:</span> {event.health}</p> */}
                                <div className='flex justify-between'>
                                    <Link to={`/blogDetails/${event._id}`}>
                                        <button className='btn btn-primary'>View Details</button>
                                    </Link>
                                    <Link to={`/wishlist/${event._id}`}>
                                        <button className='btn btn-primary'>Whish List</button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>

    );
};


export default RecentBlogs;