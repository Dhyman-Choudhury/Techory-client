import React, { useEffect, useState } from 'react';
import { FaPen } from "react-icons/fa";
import { Link, useLoaderData, useLocation, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import AllComments from './AllComments';
import Loading from './Loading';

const BlogDetails = () => {
  const { id: blogId } = useParams();
  const { user } = React.useContext(AuthContext);
  const event = useLoaderData();
  const location = useLocation();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    document.title = "Blog Details | techory";
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/comments`)
      .then((res) => {
        const filtered = res.data.filter((comment) => comment.blogId === blogId);
        setComments(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, [blogId]);

  const handleComment = (e) => {
    e.preventDefault();
    const text = e.target.comment.value;

    const comment = {
      blogId,
      commenter_name: user?.displayName,
      commenter_email: user?.email,
      text,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/comments`, comment)
      .then((res) => {
        if (res?.data?.insertedId) {
          toast.success('You added comment successfully');
          e.target.reset();

          // 🔁 Refresh comment list after successful comment
          setComments((prev) => [...prev, comment]);
        }
      })
      .catch((error) => {
        toast.warn(error.message);
      });
  };

   const handleToast = ()=>{
     toast("You can not edit other's blog.")
   }
  return (
    <div>
      <ToastContainer />
      <div className="my-10 w-11/12 mx-auto flex flex-col gap-5 md:flex-row lg:gap-10 bg-secondary shadow-md rounded-xl overflow-hidden p-5">
        {/* Image Section */}
        <div className="w-2/5">
          <img src={event.photo} alt={event.title} className="rounded-xl w-full" />
        </div>

        {/* Content Section */}
        <div className="p-5 w-2/5 text-base-100">
          <h2 className="text-xl font-bold mb-1">{event.title}</h2>
          <p><span className="font-semibold">Category:</span> {event.category}</p>
          <p><span className="font-semibold">Description:</span> {event.shortDescription}</p>
          <p><span className="font-semibold">Long Description:</span> {event.longDescription}</p>
          <p><span className="font-semibold">Blog Date:</span> {event.eventDate}</p>
          <p><span className="font-semibold">Writer:</span> {event.name}</p>
          <p><span className="font-semibold">Email:</span> {event.email}</p>
        </div>
        <div>
          {
            event?.email === user?.email ? <Link to={`/updateBlog/${event._id}`}><button className="p-3 rounded-lg bg-sky-300 text-white"><FaPen size={20} /></button></Link> : <button onClick={()=>handleToast()} className="p-3 rounded-lg bg-sky-300 text-white"><FaPen size={20} /></button>
          }
        </div>
      </div>

      <div className="mb-10 w-11/12 mx-auto p-5">
        {/* Comment Form or Restriction */}
        <div className="mb-10">
          {user?.email === event?.email ? (
            <div className="bg-secondary p-10 flex-1 rounded-xl">
              <h3 className="text-2xl font-bold text-base-100">You are not allowed to comment on your own blog.</h3>
            </div>
          ) : (
            <div className="bg-secondary p-10 flex-1 rounded-xl gap-5">
              <form className="flex flex-col" onSubmit={handleComment}>
                <textarea
                  className="bg-base-100 text-base-content p-3 rounded mb-4"
                  cols={40}
                  rows={3}
                  name="comment"
                  placeholder="Comment here"
                  required
                ></textarea>
                <input className="btn btn-primary" type="submit" value="Submit" />
              </form>
            </div>
          )}
        </div>

        {/* All Comments */}
        <div className="bg-secondary p-10 rounded-xl flex-1">
          <h3 className="text-4xl font-bold text-base-100 text-center mb-5">All Comments</h3>
          {loading ? (
            <Loading/>
          ) : (
            <AllComments data={comments} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
