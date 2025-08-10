import React, { useEffect, useState, useContext } from 'react';
import { FaPen, FaPaperPlane } from "react-icons/fa"; // Changed icon to FaPaperPlane
import { Link, useLoaderData, useLocation, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import AllComments from './AllComments';
import Loading from './Loading';

const BlogDetails = () => {
  const { id: blogId } = useParams();
  const { user } = useContext(AuthContext);
  const event = useLoaderData();
  const location = useLocation();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message, { autoClose: 2500 });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    document.title = "Blog Details | Techory";
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/comments`)
      .then((res) => {
        const filtered = res.data.filter((comment) => comment.blogId === blogId);
        setComments(filtered);
      })
      .catch((error) => {
        toast.error(`Failed to load comments: ${error.message}`);
      })
      .finally(() => setLoading(false));
  }, [blogId]);

  const handleCommentSubmit = () => {
    const text = commentText.trim();

    if (!text) {
      toast.warn("Comment cannot be empty.");
      return;
    }

    const comment = {
      blogId,
      commenter_name: user?.displayName || "Anonymous",
      commenter_email: user?.email,
      photo: user?.photoURL,
      text,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/comments`, comment)
      .then((res) => {
        if (res?.data?.insertedId) {
          toast.success('✅ Comment added successfully');
          setCommentText("");
          setComments((prev) => [...prev, comment]);
        }
      })
      .catch((error) => {
        toast.error(`Error adding comment: ${error.message}`);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommentSubmit();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const handleToast = () => {
    toast.info("You cannot edit someone else's blog.");
  };

  return (
    <div>
      <ToastContainer />

      {/* Blog Info */}
      <section className="mb-10 w-full  px-3 md:px-10 lg:px-16 flex flex-col gap-5 md:flex-row lg:gap-10 bg-secondary shadow-md rounded-xl overflow-hidden py-5 lg:py-10 ">
        {/* Blog Image */}
        <div className="w-full md:w-2/5">
          <img
            src={event.photo}
            alt={event.title}
            className="rounded-xl object-cover  w-full"
          />
        </div>

        {/* Blog Content */}
        <div className="p-5 w-full md:w-2/5 text-base-100">
          <h2 className="text-2xl font-bold mb-3">{event.title}</h2>
          <p><span className="font-semibold">Category:</span> {event.category}</p>
          <p><span className="font-semibold">Description:</span> {event.shortDescription}</p>
          <p><span className="font-semibold">Long Description:</span> {event.longDescription}</p>
          <p><span className="font-semibold">Blog Date:</span> {event.eventDate}</p>
          <p><span className="font-semibold">Writer:</span> {event.name}</p>
          <p><span className="font-semibold">Email:</span> {event.email}</p>
        </div>

        {/* Edit Button */}
        <div className="flex items-start">
          {event?.email === user?.email ? (
            <Link to={`/updateBlog/${event._id}`}>
              <button
                className="p-3 rounded-lg bg-sky-300 hover:bg-sky-400 transition text-white"
                aria-label="Edit Blog"
              >
                <FaPen size={20} />
              </button>
            </Link>
          ) : (
            <button
              onClick={handleToast}
              className="p-3 rounded-lg bg-sky-300 hover:bg-sky-400 transition text-white"
              aria-label="Edit Blog Disabled"
            >
              <FaPen size={20} />
            </button>
          )}
        </div>
      </section>
        
      <div className="bg-secondary p-6 rounded-xl flex flex-col md:flex-row mb-10 px-3 md:px-10 lg:px-16 md:overflow-x-auto">
        <aside className="lg:w-1/4 bg-secondary rounded-xl p-4 h-fit sticky top-4 self-start mb-6 md:mb-0">
          <h3 className="text-lg font-semibold text-base-100 mb-4">Leave a Comment</h3>

          {user?.email === event?.email ? (
            <p className="text-base-100 text-sm">
              You are not allowed to comment on your own blog.
            </p>
          ) : (
            <form
              className="flex flex-col gap-3 relative"
              onSubmit={handleSubmit}
            >
              <input
                className="bg-base-100 text-base-content flex-1 resize-none focus:outline-none rounded-full p-2 text-sm pr-10"
                name="comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write a comment..."
                aria-label="Write a comment"
              />

              <FaPaperPlane
                onClick={handleCommentSubmit}
                className="absolute right-3 top-2.5 md:top-3 text-blue-500 cursor-pointer"
                size={20}
                title="Submit Comment"
                aria-label="Submit Comment"
              />
            </form>
          )}
        </aside>
        <div className='w-full md:w-3/4'>
          <h3 className="text-2xl font-bold text-base-100 mb-4">All Comments</h3>
          {loading ? <Loading /> : <AllComments data={comments} />}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
