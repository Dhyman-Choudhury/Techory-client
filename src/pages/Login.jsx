import React, { use, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';


const Login = () => {
    const [show, setShow] = useState(false);
    const { login, googleLogin } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef()


    useEffect(() => {
        document.title = "Login | GreeNHeaveN"
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(result => {
                // console.log(result)
                // setSuccess(user)
                // { state: { message: 'You registered successfully' } }

                const from = `${location.state?location.state : '/'}`;

                navigate(from, { state: { message: 'You logged in successfully' } });

            })
            .catch(error => {

                // const errorMessage=error.message;

                toast.error(error.message)
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {

                // const user = result.user;
                // console.log(user)
                toast.success('You logged in successfully')
                navigate('/')
            })
            .catch(error => {
                const errorMessage = error.message
                toast(errorMessage)
            })
    }

    /*** Forgot password */
    const [email, setEmail] = useState("");


    const handleForgetPassword = () => {
        navigate("/auth/forgot-password", { state: { email } });
    };

    return (
        <div className='w-11/12 mx-auto my-5 flex justify-center min-h-screen items-center bg-secondary'>
            <ToastContainer />
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='font-semibold text-2xl text-center'>Login your account</h2>
                <div className="card-body">
                    <form onSubmit={handleLogin} className="fieldset">

                        {/* email */}
                        <label className="label font-semibold text-gray-900">Email</label>
                        <input type="email" className="input" ref={emailRef} name='email' placeholder="Email" required value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                        {/* password */}
                        <label className="label font-semibold text-gray-900">Password</label>
                        <div className='relative'>
                            <input type={show ? "text" : "password"} className="input " name='password' placeholder="Password" required />
                            <div onClick={() => setShow(!show)} className='absolute top-3 right-6'>
                                {show ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                            </div>
                        </div>
                        <div onClick={handleForgetPassword}><a className="link link-hover">Forgot password?</a></div>
                        {/* {error && <p className='text-red-500 text-xs'>Invalid password. Please enter valid password.</p>} */}
                        <button type='submit' className="btn btn-primary mt-4">Login</button>
                        <div className="divider">OR</div>
                        <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                        <p className='mt-2 font-semibold text-center'>Don’t Have An Account ? <Link className='text-secondary' to='/auth/register'>Register</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;