import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { AiOutlineClose, AiOutlineMenu, AiOutlineHome, AiOutlineUser, AiOutlineTeam, AiOutlineUserAdd, AiOutlineMail } from 'react-icons/ai';


const DashboardLayout = () => {
    useEffect(() => {
        document.title = 'Dashboard | Techory';
    }, []);

    // const { role, roleLoading } = useUserRole()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const linkClasses = ({ isActive }) =>
        isActive
            ? 'flex items-center gap-2 px-4 py-2 rounded bg-blue-400 text-white'
            : 'flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 hover:text-gray-800';

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Mobile Toggle Button */}
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center md:hidden">
               
                <div className="flex gap-0.5 items-center">
                    <label className="toggle text-base-content lg:hidden">
                        <input type="checkbox" value="synthwave" className="theme-controller" />
                        <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="4"></circle>
                                <path d="M12 2v2"></path>
                                <path d="M12 20v2"></path>
                                <path d="m4.93 4.93 1.41 1.41"></path>
                                <path d="m17.66 17.66 1.41 1.41"></path>
                                <path d="M2 12h2"></path>
                                <path d="M20 12h2"></path>
                                <path d="m6.34 17.66-1.41 1.41"></path>
                                <path d="m19.07 4.93-1.41 1.41"></path>
                            </g>
                        </svg>
                        <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                            </g>
                        </svg>
                    </label>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-white text-2xl"
                    >
                        {isSidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <aside
                className={`bg-gray-900 text-white p-6 space-y-6 w-64 md:block ${isSidebarOpen ? 'block' : 'hidden'
                    } md:relative absolute z-50 h-screen md:h-auto`}
            >
            
                <nav className="flex flex-col space-y-2">
                    <NavLink to="/dashboard" end className={linkClasses}>
                        <AiOutlineHome size={20} />
                        Dashboard Home
                    </NavLink>
                    {/* Admin */}
                    {/* {!roleLoading && role === 'admin' && <> */}
                    <NavLink to="/dashboard/makeAdmin" className={linkClasses}>
                        <AiOutlineUserAdd size={20} />
                        Make Admin
                    </NavLink>
                    <NavLink to="/dashboard/adminNewsletter" className={linkClasses}>
                        <AiOutlineMail size={20} />
                        Admin Newsletter
                    </NavLink>
                </nav>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
