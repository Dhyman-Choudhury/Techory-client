import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

const useBlogsApi = () => {
    const axiosSecure = useAxiosSecure()

    const myBlogsPromise =(blogData)=>{
        return axiosSecure.post(`/blogs`, blogData)
        .then(res => res.data)
    }
    return { 
        myBlogsPromise
    };
};

export default useBlogsApi;