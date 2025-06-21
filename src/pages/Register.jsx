import React, {  useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';


const Register = () => {
    const { signUp, setUser, updateUser } = useContext(AuthContext)
    const [show, setShow] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Register | GreeNHeaveN"
    }, [])

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name,photo,email,password)
        if (password.length < 6) {
            toast.warn('Password must be equal or larger than six.')
            return
        }
        if (!/[a-z]/.test(password)) {
            toast.warn('Password must be contain at least one lowercase letter.')
            return
        }
        if (!/[A-Z]/.test(password)) {
            toast.warn('Password must be contain at least one uppercase letter.')
            return
        }
          if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
           toast.warn('Password must contain at least one special character.');
            return;
        }
        signUp(email, password)
            .then(result => {
                // console.log(result)
                const user = result.user;
                // console.log(user);
                updateUser({ displayName: name, photoURL: photo })
                    // console.log(updateUser)
                    .then(() => {

                        setUser({ ...user, displayName: name, photoURL: photo })
                        // console.log(user)
                        navigate('/', { state: { message: 'You registered successfully' } });

                    })
                    .catch(error => {
                        const errorMessage=error.message
                        toast(errorMessage)
                        setUser(user);
                    })
            })
            .catch(error => {
                const errorMessage = error.message;
                toast.error(errorMessage);
            })
    }
   
    return (
        <div className='w-11/12 mx-auto flex justify-center min-h-screen items-center bg-secondary mb-5'>
            <ToastContainer />
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='font-semibold text-3xl text-center'>Register your account</h2>
                <div className="card-body">
                    <form onSubmit={handleRegister} className="fieldset ">

                        {/* name */}
                        <label className="label font-semibold text-gray-900">Name</label>
                        <input type="text" className="input" name='name' placeholder="Name" required />
                        {/* {nameError && <p className='text-xs text-error'>{nameError}</p>} */}
                       
                        {/* email */}
                        <label className="label font-semibold text-gray-900">Email</label>
                        <input type="email" className="input" name='email' placeholder="Email" required />

                         {/* photo url */}
                        <label className="label font-semibold text-gray-900">Photo URL</label>
                        <input type="text" className="input" name='photo' placeholder="Photo URL" required />


                        {/* password */}
                        <label className="label font-semibold text-gray-900">Password</label>
                        <div className='relative'>
                            <input type={show ? "text" : "password"} className="input " name='password' placeholder="Password" required />
                            <div onClick={() => setShow(!show)} className='absolute top-3 right-6'>
                                {show ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Register</button>
                        {/* <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button> */}
                        <p className='mt-2 font-semibold text-center'>Already have an account. Please <Link className='text-secondary' to='/auth/login'>Login</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;