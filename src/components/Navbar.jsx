import { NavLink, useLocation, useNavigate } from 'react-router';
import logo from '../assets/logo-4.webp';
import { toast } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
import { use } from 'react';

const Navbar = () => {
  const { user, logout } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    navigate('/addBlog');
  };
  const handleNavigateDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate('/');
        toast.success('You logged out');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const links = [
    <li key="home">
      <NavLink className="text-bold dark:text-base-100" to="/">
        Home
      </NavLink>
    </li>,
    <li key="featured">
      <NavLink className="text-bold dark:text-base-100" to="/featuredBlog">
        Featured Blogs
      </NavLink>
    </li>,
    <li key="all">
      <NavLink className="text-bold dark:text-base-100" to="/allBlogs">
        All Blogs
      </NavLink>
    </li>,
    <li key="add-blog">
      {user && (
        <button
          onClick={handleNavigate}
          className={`${location.pathname === '/addBlog' ? 'bg-[#60A5FA] text-white' : 'dark:text-base-100'
            }`}
        >
          Add Blog
        </button>
      )}
    </li>,
    <li key="wishlist">
      {user && (
        <NavLink className="text-bold dark:text-base-100" to={`/wishList/${user?.email}`}>
          Wishlist
        </NavLink>
      )}
    </li>,
    <li key="dashboard">
      {user && (
        <button
          onClick={handleNavigateDashboard}
          className={`${location.pathname === '/dashboard' ? 'bg-[#60A5FA] text-white' : 'dark:text-base-100'
            }`}
        >
          Dashboard
        </button>
      )}
    </li>,
    
   
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-[#0F172A] to-[#0b1740] px-3 md:px-10 lg:px-16 mx-auto rounded-xl mb-10">
      <nav className="navbar">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown with links + auth buttons */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="mr-1 lg:hidden"
              aria-label="Toggle menu"
            >
              {/* Hamburger icon visible */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 dark:text-base-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#1e293b] rounded-box z-10 mt-3  p-4 shadow-lg"
            >
              {links}

              <li className="divider my-2 border-gray-500"></li>

              {/* Auth buttons inside dropdown on mobile */}
              <li className="flex flex-col space-y-2 mt-2">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="btn rounded-full btn-primary text-white w-full"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate('/auth/login')}
                      className="btn rounded-full btn-primary text-white w-full"
                      aria-label="Login"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate('/auth/register')}
                      className="btn rounded-full btn-primary mt-1 text-white w-full"
                      aria-label="Register"
                    >
                      Register
                    </button>
                  </>
                )}
              </li>
            </ul>
          </div>

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img
              className="hidden md:block w-14 h-14 rounded-full "
              src={logo}
              alt="Techory Logo"
            />
            <h1 className="text-3xl font-extrabold tracking-wide text-[#66e3e3e5]">
              Te<span className="text-white">ch</span>
              <span className="text-[#6be3b7f2]">ory</span>
            </h1>
          </div>
        </div>

        {/* Navbar Center (Desktop Links + Auth Buttons) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-3">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center space-x-0 lg:space-x-2 relative">
          {/* Mobile Profile Image */}
          <div className="lg:hidden">
            {user && (
              <img
                className="w-14 h-14 object-cover rounded-full"
                src={user.photoURL}
                alt={user.displayName || 'User profile'}
                title={user.displayName || ''}
              />
            )}
          </div>
          
          <label className="toggle text-base-content">
            <input type="checkbox" value="synthwave" className="theme-controller" />

            <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

            <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

          </label>
          {/* Desktop Profile + Auth Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {user && (
              <img
                className="w-16 h-16 object-cover rounded-full text-white"
                src={user.photoURL}
                alt={user.displayName || 'User profile'}
                title={user.displayName || ''}
              />
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="btn rounded-full btn-primary text-white"
                aria-label="Logout"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/auth/login')}
                  className="btn rounded-full btn-primary text-white"
                  aria-label="Login"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/auth/register')}
                  className="btn rounded-full btn-primary text-white"
                  aria-label="Register"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
