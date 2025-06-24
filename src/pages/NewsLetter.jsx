import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      
      // You can later connect this with your backend or Firebase
    }
    if(submitted){
          toast.success('Thank you for subscribing')
    }
  };

  return (
     <section className="w-11/12 mx-auto bg-gradient-to-r from-[#234652] to-[#3c325d] py-10 px-4 md:px-10 rounded-xl my-12 ">
     <ToastContainer/>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl text-base-100 font-bold mb-3">Newsletter Section </h2>
        <p className="mb-6 text-base-100 text-lg">
          Don’t miss out! Subscribe to get alerts when new events are listed in your preferred location or category.
        </p>

    
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 bg-white  rounded-md w-full md:w-2/3 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
           
            <button
              type="submit"
              className="btn-primary btn text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Submit
            </button>
          </form>
    
          
       
    
      </div>
    </section>
  );
};

export default NewsLetter;
