/* eslint-disable react/prop-types */

import { FaTrash } from 'react-icons/fa';

const Header = ({ messages, handleDeleteChat }) => {
  return (
    <div className="flex items-center justify-between p-4 mx-3 sm:mx-5">
      {/* App Title */}
      <p className="text-2xl sm:text-3xl font-extrabold text-gray-800">
        INTELLICON
      </p>

      <div className="flex items-center gap-4 sm:gap-8">
        {/* Trash Icon for Clearing Messages */}
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
        />
      </div>
    </div>
  );
};

export default Header;
