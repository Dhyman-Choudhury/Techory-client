
import { NavLink, useLocation, useNavigate } from 'react-router';
import logo from '../assets/logo.png'
import { toast } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
import { use } from 'react';



const Navbar = () => {
     const { user, logout } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()

    const handleNavigate = () => {
        navigate('/addBlog')
    }

    const handleLogout = () => {
        logout()
            .then(() => {
                // setSuccess(null)
                navigate('/')
                toast.success('You logged out')
            })
            .catch(error => {
                toast(error.message)
            })
    }

    const links = [
        <li><NavLink className="text-bold text-base-100" to='/'>Home</NavLink></li>,
        <li><NavLink className="text-bold text-base-100" to='/featuredBlog'>Featured Blogs</NavLink></li>,
        <li><NavLink className="text-bold text-base-100" to='/allBlogs'>All Blogs</NavLink></li>,
        <li>
            {user && (
                <button
                    onClick={handleNavigate}
                    className={`${location.pathname === '/addBlog' ? 'bg-[#60A5FA] text-white' : 'text-base-100'}`}
                >
                    Add Blog
                </button>
            )}
        </li>,
     
         <li>
            {user && (
                
            <NavLink className="text-bold text-base-100" to={`/wishList/${user?.email}`}> Wishlist</NavLink>
        
            )}
        </li>
      

    ]
    return (
        <div className='sticky top-0 z-50 bg-gradient-to-r from-[#0F172A] to-[#112565] px-1 md:px-10 lg:px-20 w-11/12 mx-auto rounded-xl my-5'>
            <div className="navbar  ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className=" mr-1 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <div className='flex  items-center gap-2'>
                        <img className='w-14 h-14 rounded-full bg-teal-50 ' src={logo} alt="Logo" />
                        <button onClick={() => navigate('/')} className="">
                            <h1 className="text-3xl font-bold md:font-extrabold tracking-wide text-[#66e3e3e5]">
                                te<span className="text-white">ch</span>
                                <span className="text-[#6be3b7f2]">ory</span>
                            </h1>
                        </button>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-3">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end space-x-0  lg:space-x-2 relative">
                    <div className='lg:hidden'>
                        {user && (
                            <img
                                className="w-14 h-14 object-cover rounded-full"
                                src={user.photoURL}
                                alt=''
                                title={user.displayName}
                            />
                        )}
                    </div>
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="" className="lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-base-100" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="5" r="1.5" />
                                <circle cx="12" cy="12" r="1.5" />
                                <circle cx="12" cy="19" r="1.5" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 shadow">

                            <li>
                                {
                                    user ? <button onClick={handleLogout} className="btn rounded-full btn-primary text-white">Logout</button> : <><button onClick={() => navigate('/auth/login')} className="btn rounded-full btn-primary text-white">Login</button> <button onClick={() => navigate('/auth/register')} className="btn rounded-full btn-primary mt-1 text-white">Register</button></>
                                }
                            </li>

                        </ul>
                    </div>


                    <div className='hidden lg:flex items-center gap-2'>
                        <div className=''>
                            {
                                user ? <div className='text-gray-200 font-semibold'>{user.email}</div> : ''
                            }
                        </div>
                        {user && (
                            <img
                                className="w-16 h-16 object-cover rounded-full"
                                src={user.photoURL}
                                alt=''
                                title={user.displayName}
                            />
                        )}

                        {
                            user ? <button onClick={handleLogout} className="btn rounded-full btn-primary text-white">Logout</button> : <><button onClick={() => navigate('/auth/login')} className="btn rounded-full btn-primary text-white">Login</button> <button onClick={() => navigate('/auth/register')} className="btn rounded-full btn-primary text-white">Register</button></>
                        }

                        {/* <button onClick={() => navigate('/auth/login')} className="btn rounded-full btn-primary text-white">Login</button>  */}
                        {/* <button onClick={handleLogout} className="btn rounded-full btn-primary text-white">Register</button> */}
                        {/* <><button onClick={() => navigate('/auth/login')} className="btn rounded-full btn-primary text-white">Login</button> <button onClick={() => navigate('/auth/register')} className="btn rounded-full btn-primary text-white">Register</button></> */}
                    </div>
                    
                </div>

            </div>
             <div className='lg:hidden flex justify-end pr-2'>
                {
                    user ? <div className='text-base-100 mb-1 font-semibold'>{user.email}</div> : ''
                }
            </div> 
        </div>
    );
};

export default Navbar;