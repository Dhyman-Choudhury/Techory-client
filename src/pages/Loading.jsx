import Lottie from 'lottie-react';
import React from 'react';
import loading from '../assets/json/loader.json'

const Loading = () => {
    return (
        <div className='w-full bg-secondary  mb-10 rounded-xl min-h-[calc(100vh-340px)]'>
           <Lottie className='w-80 mx-auto' animationData={loading}  loop={true} />
        </div>
    );
};

export default Loading;