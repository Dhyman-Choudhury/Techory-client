// src/pages/AddPlants.jsx

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import useBlogsApi from '../api/useBlogsApi';


const AddBlog = () => {

    const {myBlogsPromise} = useBlogsApi()

    useEffect(() => {
        document.title = "Add Blog | techory"
    }, [])
    const { user } = useContext(AuthContext);
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const offset = now.getTimezoneOffset();
            const localISOTime = new Date(now.getTime() - offset * 60000)
                .toISOString()
                .slice(0, 16);
            setDateTime(localISOTime);
        };

        updateTime(); // initial call

        const interval = setInterval(updateTime, 1000); // update every second

        return () => clearInterval(interval); // cleanup on unmount
    }, []);

    const handleAddBlog = (e) => {
       
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const blogsData = Object.fromEntries(formData.entries());

        myBlogsPromise(blogsData)
            .then(res => {
                if (res?.insertedId) {
                    toast.success('Blog added successfully!');
                    form.reset();
                }
            })
            .catch(error => {
                 toast.warn(error.message)
            })

    };

    return (
        <div className=" mb-10 w-full ">
            <ToastContainer />
            <div className="card bg-secondary  mx-auto shadow-2xl py-5 px-10">
                <h2 className="text-4xl font-bold text-white text-center">Add Your Blog</h2>
                <div className="card-body">
                    <form onSubmit={handleAddBlog} className="fieldset">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                            <div>
                                <label className="label text-white font-semibold">Photo URL</label>
                                <input type="text" name="photo" className="input w-full" placeholder='Photo URL' required />
                            </div>

                            <div>
                                <label className="label text-white font-semibold">Blog Title</label>
                                <input type="text" name="title" className="input w-full" placeholder='Blog Title' required />
                            </div>

                            <div>
                                <label className="label text-white font-semibold">Category</label>
                                <select name="category" className="select w-full" required>
                                    <option disabled selected value="">Pick a Category</option>
                                    <option>AI News & Trends</option>
                                    <option>Machine Learning</option>
                                    <option>Deep Learning</option> 
                                    <option>AI Tools & Frameworks</option>
                                    <option>AI Applications</option>
                                    <option>AI Career & Learning</option>

                                </select>
                            </div>

                            <div>
                                <label className="label text-white font-semibold">Short Description</label>
                                <input type="text" name="shortDescription" className="input w-full" placeholder='Short Description' required />
                            </div>
                            <div>
                                <label className="label text-white font-semibold">Long Description</label>
                                <input type="text" name="longDescription" className="input w-full" placeholder='Long Description' required />
                            </div>

                            <div>
                                <label className="label text-white font-semibold">User Name</label>
                                <input type="text" name="name" value={user?.displayName || ''} readOnly className="input w-full" />
                            </div>

                            <div>
                                <label className="label text-white font-semibold">Email</label>
                                <input type="email" name="email" value={user?.email || ''} readOnly className="input w-full" />
                            </div>
                            <div>
                                <label className="label text-white font-semibold"> Date and Time</label>
                                <input

                                    type="datetime-local"
                                    value={dateTime}
                                    name="eventDate"
                                    className='w-full input'
                                />
                            </div>
                        </div>

                        <input className="btn btn-primary mt-4" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;