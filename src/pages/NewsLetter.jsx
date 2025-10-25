import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const NewsLetter = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email) {
      try {
        const newsletterData = { name, email };
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/newsletter`, newsletterData);

        if (res.data.insertedId) {
          setSubmitted(true);
          setName('');
          setEmail('');
          toast.success('Thank you for subscribing!');
        } else {
          toast.error('Failed to subscribe. Please try again.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <section className="newsletter-section w-full bg-gradient-to-r from-[#234652] to-[#3c325d] py-10 px-4 md:px-10 rounded-xl my-12">
      <ToastContainer />
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-3">Newsletter Section</h2>
        <p className="mb-6 text-lg">
          Don’t miss out! Subscribe to get alerts when new events are listed in your preferred location or category.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Enter your name"
            className="text-gray-900 px-4 py-2 bg-white rounded-md w-full md:w-2/3 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="text-gray-900 px-4 py-2 bg-white rounded-md w-full md:w-2/3 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary btn text-white font-semibold px-6 py-2 rounded-md transition">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
