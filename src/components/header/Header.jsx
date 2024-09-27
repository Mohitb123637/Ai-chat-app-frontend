/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { FaTrash, FaSignOutAlt } from 'react-icons/fa';
import ConfirmationModal from '../model/ConfirmationModel';
import { logout } from '../../../store/auth/authAction';
import { useDispatch } from 'react-redux';

const Header = ({ messages, handleDeleteChat }) => {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const toggleProfileTab = () => {
    setIsTabOpen(!isTabOpen);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Close the profile tab when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isTabOpen && !event.target.closest('.profile-tab')) {
        setIsTabOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTabOpen]);

  return (
    <div className="flex items-center justify-between p-4 mx-3 sm:mx-5">
      <p className="text-2xl sm:text-3xl font-extrabold text-gray-800">
        INTELLICON
      </p>
      <div className="flex items-center gap-4 sm:gap-8">
        {messages?.length > 0 ? (
          <div
            className="tooltip tooltip-bottom cursor-pointer"
            data-tip="Clear Chat"
          >
            <FaTrash
              className="text-red-600 text-2xl sm:text-3xl hover:text-red-800 transition duration-300"
              title="Clear Chat"
              onClick={handleDeleteChat}
            />
          </div>
        ) : null}

        {/* User Profile Image */}
        <img
          src="https://a0.anyrgb.com/pngimg/946/838/user-profile-login-avatar-heroes-user-sphere-blog-black-icons-circle-thumbnail.png"
          alt="AI Chat Icon"
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg border-4 border-gray-300 transition-transform transform hover:scale-105"
          onClick={toggleProfileTab}
        />
        {isTabOpen && (
          <div className="profile-tab absolute right-0 mt-2 w-40 sm:w-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg z-10 p-3 sm:p-4 transform transition-all duration-300 ease-in-out origin-top-right">
            <div className="p-2 sm:p-3 cursor-pointer flex items-center gap-2 sm:gap-3 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition duration-300 ease-in-out">
              <FaSignOutAlt className="text-white text-base sm:text-lg" />
              <span
                className="text-white font-semibold tracking-wide text-sm sm:text-base"
                onClick={handleLogout}
              >
                Logout
              </span>
            </div>
          </div>
        )}
      </div>
      {showLogoutModal && (
        <ConfirmationModal
          message="Are you sure you want to logout?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </div>
  );
};

export default Header;
