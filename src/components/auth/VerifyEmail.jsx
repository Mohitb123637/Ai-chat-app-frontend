import { useState } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
// import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../../store/auth/authAction';
// import { useDispatch } from 'react-redux';

const VerifyEmail = () => {
  const location = useLocation();
  const emailFromState = location.state?.email || '';
  const [formData, setFormData] = useState({
    email: emailFromState,
    verificationCode: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e);
    setFormData((prevData) => ({
      ...prevData,
      verificationCode: e,
    }));
    console.log(e);
  };

  const handleEmailChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');
      console.log('Submitting:', formData); //
      const resultAction = await dispatch(verifyEmail(formData));
      if (verifyEmail.fulfilled.match(resultAction)) {
        navigate('/login');
      } else {
        setError(resultAction.payload || 'Verification failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-h-full w-full justify-center items-center bg-gradient-to-r from-blue-50 to-blue-100">
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
            Welcome! Please verify your registered Email Address
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
                type="email"
                id="email"
                value={formData.email}
                placeholder="Enter your email address"
                className="input input-bordered w-full bg-white text-gray-900"
                required
                onChange={handleEmailChange}
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-gray-700 text-lg">
                  Verification Code
                </span>
              </label>
              <MuiOtpInput value={otp} onChange={handleChange} length={6} />
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
                  Verifying...
                </span>
              ) : (
                'Verify'
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
