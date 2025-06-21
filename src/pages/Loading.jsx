import Lottie from 'lottie-react';
import React from 'react';
import loading from '../assets/json/loader.json'

const Loading = () => {
    return (
        <div className='w-11/12 bg-secondary mx-auto'>
           <Lottie animationData={loading}  loop={true} />
        </div>
    );
};

export default Loading;