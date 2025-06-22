import Lottie from 'lottie-react';
import React from 'react';
import loading from '../assets/json/loader.json'

const Loading = () => {
    return (
        <div className='w-11/12 bg-secondary mx-auto mb-5 rounded-xl min-h-[calc(100vh-340px)]'>
           <Lottie className='w-80 mx-auto' animationData={loading}  loop={true} />
        </div>
    );
};

export default Loading;