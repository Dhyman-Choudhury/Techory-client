import React, { useEffect, useState } from 'react';
import { motion } from "motion/react";
import banner from '../assets/images/banner-1.png';
import image1 from '../assets/images/ai-1.avif';
import image2 from '../assets/images/ai-2.jpg';

const Banner = () => {
  const [xValues, setXValues] = useState([100, 150, 100]);

  const fullText = "Revolutionizing AI Search!";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    function updateXValues() {
      const width = window.innerWidth;
      if (width < 768) {
        setXValues([70, 130, 70]);
      } else if (width >= 768 && width < 1024) {
        setXValues([80, 140, 80]);
      } else {
        setXValues([100, 150, 100]);
      }
    }

    updateXValues();
    window.addEventListener('resize', updateXValues);
    return () => window.removeEventListener('resize', updateXValues);
  }, []);

  // Typing animation effect
  useEffect(() => {
    let timer;

    if (!isDeleting && index <= fullText.length) {
      timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, index));
        setIndex(index + 1);
      }, 100);
    } else if (isDeleting && index >= 0) {
      timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, index));
        setIndex(index - 1);
      }, 50);
    }

    if (index === fullText.length + 1) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (index === -1) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setIndex(0);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, fullText]);


  return (
    <div className='hero w-full mx-auto min-h-96'>
      <div
        className='pb-5 w-full flex flex-col items-center justify-center lg:flex-row-reverse gap-10'
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: '12px',
          height: '100%',
          opacity: '0.8',
          width: '100%',
        }}
      >
        <div className='flex-1 ml-5 sm:ml-7 flex flex-col md:items-center lg:items-start lg:ml-10'>
          <motion.img
            src={image1}
            animate={{ y: [100, 150, 100] }}
            transition={{ duration: 5, repeat: Infinity }}
            className='max-w-[57%] border-blue-800 border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl'
          />
          <motion.img
            src={image2}
            animate={{ x: xValues }}
            transition={{ duration: 5, delay: 2, repeat: Infinity }}
            className='max-w-[57%] border-blue-800 border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl'
          />
        </div>

        <div className='flex-1 text-center flex flex-col justify-center items-center px-5'>
          <h1
            className='text-4xl sm:text-5xl md:text-6xl font-bold dark:text-base-100 font-mono min-h-[4.5rem]'
          >
            {displayText}
            <span className='inline-block w-1 h-8 bg-white ml-1 animate-blink'></span>
          </h1>



          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className='text-lg text-gray-200 mt-4 max-w-sm'
          >
            The future of search is smarter and faster.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='mt-8 dark:text-base-100 btn btn-outline dark:btn-outline hover:btn-primary transition-colors duration-500'
          >
            <a href="/allBlogs">All Blogs</a>
          </motion.button>



        </div>
      </div>

      {/* Inline styles for blinking cursor */}
      <style>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1.2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;
