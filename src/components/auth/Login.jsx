/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../store/auth/authAction';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');
      const resultAction = await dispatch(loginUser(formData));

      if (loginUser.fulfilled.match(resultAction)) {
        const { token } = resultAction.payload;
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        setError(resultAction.payload || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full justify-center items-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="flex p-6 max-w-5xl mx-auto flex-col md:flex-row md:items-start  rounded-lg">
        {/* left */}
        <div className="md:w-1/2 p-6">
          <h1 className="font-bold sm:text-5xl text-3xl text-gray-800 hover:text-gray-600 transition-colors">
            <span className=" font-bold sm:text-5xl text-3xl px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              AI CHAT
            </span>
            APP
          </h1>
          <p className="text-gray-700 text-lg mt-5">
            Welcome! Please login with your registered Email Address and
            Password.
          </p>
        </div>
        {/* right */}
        <div className="mt-5 md:mt-0 md:ml-20 md:w-1/2 w-full p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-gray-700 text-lg">
                  Email ID
                </span>
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email address"
                className="input input-bordered w-full bg-white text-gray-900"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-control mb-6 relative">
              <label className="label">
                <span className="label-text text-gray-700 text-lg">
                  Password
                </span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                id="password"
                className="input input-bordered w-full bg-white text-gray-900"
                required
                onChange={handleChange}
              />
              <span
                className="absolute inset-y-0 right-3 top-14 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </span>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className={`btn btn-primary w-full  bg-gradient-to-r from-indigo-500 to-pink-500 text-white `}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>

            <div className="flex gap-2 text-sm mt-5">
              <span className="text-gray-700">Don't have an account?</span>
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
