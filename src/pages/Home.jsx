import React from 'react';
import Banner from '../components/Banner';
import NewsLetter from './NewsLetter';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Banner></Banner>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;