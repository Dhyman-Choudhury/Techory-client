import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading";

const AdminNewsletter = () => {
  const axiosSecure = useAxiosSecure();
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axiosSecure.get("/newsletter");
        setSubscribers(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchSubscribers();
  }, [axiosSecure]);

  return (
    <div className="night_text table_bg min-h-screen py-5 bg-gray-50">
      <div className="px-4 md:px-6">
        <h2 className="text-4xl text-black font-bold mb-5">
          All Newsletter Subscribers
        </h2>

        {isLoading && <Loading />}
        {isError && (
          <p className="text-red-500">Failed to load subscribers.</p>
        )}

        {!isLoading && subscribers.length === 0 && (
          <p className="text-gray-800">No subscribers found.</p>
        )}

        {!isLoading && subscribers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-100 text-left shadow text-black">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border-b border-gray-300">#</th>
                  <th className="p-3 border-b border-gray-300">Name</th>
                  <th className="p-3 border-b border-gray-300">Email</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, index) => (
                  <tr
                    key={subscriber._id}
                    className="bg-white text-gray-800 shadow-sm"
                  >
                    <td className="p-3 border-b border-gray-300">{index + 1}</td>
                    <td className="p-3 border-b border-gray-300">{subscriber.name}</td>
                    <td className="p-3 border-b border-gray-300">{subscriber.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNewsletter;
