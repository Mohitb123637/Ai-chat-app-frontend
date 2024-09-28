/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../store/auth/authAction';
import { motion } from 'framer-motion';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: '',
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

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      const resultAction = await dispatch(registerUser(formData));

      if (registerUser.fulfilled.match(resultAction)) {
        const { token } = resultAction.payload;
        localStorage.setItem('token', token);
        navigate('/verifyEmail', { state: { email: formData.email } });
      } else {
        setError(resultAction.payload || 'Signup failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Signup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-h-full justify-center items-center bg-gradient-to-r from-blue-50 to-blue-100  overflow-auto ">
      <div className="flex p-8 max-w-4xl w-full mx-auto flex-col md:flex-row">
        {/* Left Section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h1 className="font-bold text-2xl sm:text-5xl text-gray-800 hover:text-gray-600 transition-colors">
            <span className=" font-bold text-2xl sm:text-5xl px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
              AI CHAT
            </span>
            APP
          </h1>
          <p className="text-gray-700 text-xl mt-6 leading-relaxed">
            Join us! Please fill in the details below to create an account.
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="sm:mt-6 md:mt-0 md:ml-16 md:w-1/2 w-full p-6">
          <form className="sm:space-y-8 space-y-4" onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full bg-white text-gray-900 p-3 rounded-md border border-gray-300"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="input input-bordered w-full bg-white text-gray-900 p-3 rounded-md border border-gray-300"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-control relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-white text-gray-900 p-3 rounded-md border border-gray-300"
                required
                onChange={handleChange}
              />
              <span
                className="absolute inset-y-0 right-4 top-3 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </span>
            </div>

            <div className="form-control relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Confirm your password"
                className="input input-bordered w-full bg-white text-gray-900 p-3 rounded-md border border-gray-300"
                required
                onChange={handleChange}
              />
              <span
                className="absolute inset-y-0 right-4 top-3 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </span>
            </div>

            <div className="form-control">
              <input
                type="text"
                id="number"
                placeholder="Enter your contact number"
                className="input input-bordered w-full bg-white text-gray-900 p-3 rounded-md border border-gray-300"
                required
                onChange={handleChange}
              />
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
                  Signing Up...
                </span>
              ) : (
                'Sign Up'
              )}
            </motion.button>

            <div className="flex gap-2 text-sm mt-5 justify-center">
              <span className="text-gray-700">Already have an account?</span>
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline transition-colors"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
