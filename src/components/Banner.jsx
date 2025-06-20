import React from 'react';
import { motion } from "motion/react";
import banner from '../assets/images/banner-1.png'
import image1 from '../assets/images/ai-1.avif'
import image2 from '../assets/images/ai-2.jpg'

const Banner = () => {
    return (
       <div className='hero w-11/12  mx-auto min-h-96 '>
         <div className='hero-content w-full flex flex-col lg:flex-row-reverse gap-10' style={{
                backgroundImage: `url(${banner})`,
                backgroundSize: 'cover',
               backgroundRepeat:'no-repeat',
                backgroundPosition: 'center',
                height:'100%',
                opacity:'0.8',
                width: '100%'
            }}>
            

        <div className='flex-1'>
          <motion.img
          src={image1}
          animate={{y: [100, 150, 100]}}
          transition={{duration: 5, repeat: Infinity}}
          className='max-w-sm border-blue-800 border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl'

          />
          <motion.img
          src={image2}
          animate={{x: [100, 150, 100]}}
          transition={{duration: 5, delay: 2, repeat: Infinity}}
          className='max-w-sm border-blue-800 border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl'
          />
          
        </div>
        <div className='flex-1'>
           <motion.h1 
             initial={{ scale: 0}}
             animate={{ scale: 1, transition: { duration: 4}}}
             className='text-5xl font-bold text-gray-200'
           >
            Wre are in revolutionary era where <motion.span
              animate={
              {
                color: ['#ff5733', '#33ff33', '#8a33ff'],
                transition: {duration: 2, repeat: Infinity}
              }}
             >AI</motion.span> changes how we search! </motion.h1>
        </div>
        </div>
       </div>
    );
};

export default Banner;