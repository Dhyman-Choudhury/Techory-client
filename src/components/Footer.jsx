import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router';
import logo from '../assets/logo.png'
import { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';


const Footer = () => {
  const navigate = useNavigate()
//   const { user } = use(AuthContext)
  const handleNavigate = () => {
    navigate('/addPlants')
  }
  const links = [
    <li><NavLink className="text-bold p-2 rounded-lg" to='/'>Home</NavLink></li>,
    <li><NavLink className="text-bold p-2 rounded-lg" to='/allPlants'>All Plants</NavLink></li>,
    // <li>
    //   {user && (
    //     <button
    //       onClick={handleNavigate}
    //       className={` ${location.pathname === '/addPlants' ? 'bg-[#e55039] text-white' : ''
    //         }`}
    //     >
    //       Add Plants
    //     </button>
    //   )}
    // </li>,
    // <li>
    //   {user && (
    //     <button
    //       onClick={() => navigate(`/myPlants/${user.email}`)}
    //       className={` ${location.pathname.startsWith('/myPlants') ? 'bg-[#e55039] text-white' : ''}`}
    //     >
    //       My Plants
    //     </button>
    //   )}
    // </li>

  ]
  return (
    <footer className="bg-gradient-to-r from-[#0F172A] via-[#0a2043] to-[#02175c]  text-white py-10 ">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-5">

        {/* Company Info */}
        <div>
          <div className='flex  items-center gap-2'>
            <img className='w-14 h-14 rounded-full bg-teal-50' src={logo} alt="Logo" />
            <button onClick={() => navigate('/')} className="">
              <h1 className="text-3xl font-extrabold tracking-wide text-[#66e3e3e5]">
                te<span className="text-white">ch</span>
                <span className="text-[#54de7ff2]">ory</span>
              </h1>
            </button>
          </div>
          <p className="text-sm">This website provide you notions where the technology is going.</p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/terms" className="hover:text-primary">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="/contact" className="hover:text-primary">Contact Us</a></li>
            <li><a href="/about" className="hover:text-primary">About Us</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Routes</h2>
          <ul className="space-y-2 text-sm ">
            {links}
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="text-xl font-bold mb-2">Follow Us</h2>
          <div className="flex space-x-4 mt-2 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      <div className="mt-10 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Tech Explorer. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
