import React, { useEffect } from 'react';
import Banner from '../components/Banner';
import NewsLetter from './NewsLetter';
import { useLoaderData, useLocation } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import RecentBlogs from './RecentBlogs';

const Home = () => {
      const location = useLocation();
      const newBlogs = useLoaderData();
      

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

       useEffect(() => {
        document.title = "Home | techory"
    }, [])

    return (
        <div className=''>
            <ToastContainer/>
            <Banner></Banner>
              <div className=' w-11/12 mx-auto bg-secondary my-10 rounded-xl'>
                <RecentBlogs newBlogs={newBlogs} ></RecentBlogs>
            </div>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;