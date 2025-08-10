import React, { useEffect, useState } from 'react';
import { motion } from "motion/react";
import banner from '../assets/images/banner-1.png'
import image1 from '../assets/images/ai-1.avif'
import image2 from '../assets/images/ai-2.jpg'

const Banner = () => {
   const [xValues, setXValues] = useState([100, 150, 100]);

  useEffect(() => {
    function updateXValues() {
      const width = window.innerWidth;
      if (width < 768) {
        // Small devices below md
        setXValues([70, 130, 70]);
      } else if (width >= 768 && width < 1024) {
        // md devices (768px - 1023px)
        setXValues([80, 140, 80]);
      } else {
        // Large devices lg+
        setXValues([100, 150, 100]);
      }
    }

    updateXValues();
    window.addEventListener('resize', updateXValues);

    return () => window.removeEventListener('resize', updateXValues);
  }, []);
    return (
       <div className='hero w-full  mx-auto min-h-96 '>
        <div className='pb-5 w-full flex flex-col items-center justify-center lg:flex-row-reverse  gap-10' 
          style={{
                backgroundImage: `url(${banner})`,
                backgroundSize: 'cover',
               backgroundRepeat:'no-repeat',
                backgroundPosition: 'center',
                borderRadius:'12px',
                height: '100%',
                opacity: '0.8',
                width: '100%'
          }}>
            

        <div className='flex-1 ml-5 sm:ml-7 flex flex-col md:items-center lg:items-start lg:ml-10'>
          <motion.img
          src={image1}
          animate={{y: [100, 150, 100]}}
          transition={{duration: 5, repeat: Infinity}}
          className='max-w-[57%] border-blue-800 border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl'

          />
          <motion.img
          src={image2}
          animate={{x: xValues}}
          transition={{duration: 5, delay: 2, repeat: Infinity}}
          className='max-w-[57%] border-blue-800 border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl'
          />
          
        </div>
        <div className='flex-1 text-center flex justify-center items-center'>
           <motion.h1 
             initial={{ scale: 0}}
             animate={{ scale: 1, transition: { duration: 4}}}
             className='text-5xl font-bold text-base-100'
           >
            We are in revolutionary <br /> era where <motion.span
              animate={
              {
                color: ['#ff5733', '#33ff33', '#8a33ff'],
                transition: {duration: 2, repeat: Infinity}
              }}
             >AI</motion.span> changes <br /> how we search! </motion.h1>
        </div>
        </div>
       </div>
   );
};

export default Banner;