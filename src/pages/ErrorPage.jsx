import Lottie from 'lottie-react';
import React from 'react';
import error from '../assets/json/error.json'

const ErrorPage = () => {
    return (
        <div className='mx-auto bg-secondary'>
             <Lottie className='w-1/2 mx-auto' animationData={error} loop={true} />
        </div>
    );
};

export default ErrorPage;