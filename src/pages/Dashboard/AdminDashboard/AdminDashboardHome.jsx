import React, { use, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AuthContext } from "../../../Provider/AuthProvider";

const AdminDashboardHome = () => {
  const { user } = use(AuthContext);
  // Dummy data
  const metrics = [
    { title: "Total Posts", value: 560, trend: 40.35, color: "green" },
    { title: "Total Categories", value: 102, trend: -40.35, color: "red" },
    { title: "Total Media Files", value: 430, trend: 40.35, color: "green" },
    { title: "Pending Comments", value: 160, trend: 40.35, color: "green" },
  ];

  const postGrowthData = [
    { month: "Jan", posts: 20 },
    { month: "Feb", posts: 40 },
    { month: "Mar", posts: 15 },
    { month: "Apr", posts: 25 },
    { month: "May", posts: 10 },
    { month: "Jun", posts: 12 },
  ];

  const commentsTrendData = [
    { day: 1, Approved: 5, Pending: 10, Spam: 8 },
    { day: 2, Approved: 15, Pending: 20, Spam: 12 },
    { day: 3, Approved: 25, Pending: 30, Spam: 18 },
    { day: 4, Approved: 30, Pending: 15, Spam: 10 },
    { day: 5, Approved: 40, Pending: 10, Spam: 5 },
    { day: 6, Approved: 25, Pending: 5, Spam: 2 },
    { day: 7, Approved: 10, Pending: 5, Spam: 1 },
    { day: 8, Approved: 5, Pending: 3, Spam: 0 },
    { day: 9, Approved: 15, Pending: 10, Spam: 5 },
    { day: 10, Approved: 20, Pending: 15, Spam: 8 },
    { day: 11, Approved: 25, Pending: 20, Spam: 10 },
    { day: 12, Approved: 30, Pending: 25, Spam: 12 },
    { day: 13, Approved: 35, Pending: 20, Spam: 8 },
    { day: 14, Approved: 40, Pending: 15, Spam: 5 },
    { day: 15, Approved: 30, Pending: 10, Spam: 3 },
  ];

  const latestPosts = [
    { title: "Career growth tips", status: "Published", date: "18 Mar" },
    { title: "Top design tools", status: "Draft", date: "18 Mar" },
    { title: "AI in healthcare", status: "Published", date: "17 Mar" },
    { title: "Learning React fast", status: "Draft", date: "16 Mar" },
  ];

  const recentComments = [
    { author: "Neha V.", preview: "Great article on mentorship!", date: "18 Mar" },
    { author: "Rohan S.", preview: "Can you share more resources?", date: "18 Mar" },
    { author: "Maya P.", preview: "Loved the post!", date: "17 Mar" },
    { author: "Alex K.", preview: "Very informative.", date: "16 Mar" },
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen text-gray-800">
      {/* Welcome + Search */}
      <h2 className="text-3xl font-bold text-gray-800">Admin</h2>
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-xl font-semibold text-gray-800">{user?.displayName}</h2>
        <input
          type="text"
          placeholder="Enter keywords ..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 text-gray-800"
        />
        <div>
             
              <img
                className="w-10 h-10 object-cover rounded-full"
                src={user.photoURL}
                alt={user.displayName || 'User profile'}
                />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-800">{m.title}</p>
            <h2 className="text-2xl font-bold text-gray-800">{m.value}</h2>
            <p className={`text-sm mt-1 ${m.color === "green" ? "text-green-500" : "text-red-500"}`}>
              Last 30 days {m.trend > 0 ? `↑ ${m.trend}%` : `↓ ${Math.abs(m.trend)}%`}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Post Growth */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4 text-gray-800">Post Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={postGrowthData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="posts" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Comments Trend */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4 text-gray-800">Comments Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={commentsTrendData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Approved" stroke="#22c55e" />
              <Line type="monotone" dataKey="Pending" stroke="#facc15" />
              <Line type="monotone" dataKey="Spam" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Latest Posts */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4 text-gray-800">Latest Posts</h3>
          <table className="w-full text-left bg-white p-4">
            <thead>
              <tr>
                <th className="py-2 text-gray-800">Title</th>
                <th className="text-gray-800">Status</th>
                <th className="text-gray-800">Date</th>
              </tr>
            </thead>
            <tbody>
              {latestPosts.map((p, idx) => (
                <tr key={idx} className="shadow mb-2 rounded">
                  <td className="py-2 text-gray-800">{p.title}</td>
                  <td className={`py-2 ${p.status === "Published" ? "text-green-500" : "text-yellow-500"}`}>{p.status}</td>
                  <td className="py-2 text-gray-800">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Comments */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4 text-gray-800">Recent Comments</h3>
          <table className="w-full text-left bg-white p-4">
            <thead>
              <tr>
                <th className="py-2 text-gray-800">Author</th>
                <th className="text-gray-800">Comment Preview</th>
                <th className="text-gray-800">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentComments.map((c, idx) => (
                <tr key={idx} className="shadow mb-2 rounded">
                  <td className="py-2 text-gray-800">{c.author}</td>
                  <td className="py-2 text-gray-800">{c.preview}</td>
                  <td className="py-2 text-gray-800">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
