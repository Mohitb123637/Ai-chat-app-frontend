import { MdMenu } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { MdChatBubbleOutline, MdHelpOutline } from 'react-icons/md';
import { IoIosLogOut } from 'react-icons/io';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/auth/authAction';
import ConfirmationModal from '../model/ConfirmationModel';

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const menuVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  const dispatch = useDispatch();

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

  return (
    <motion.div
      className="h-screen flex flex-col justify-between bg-blue-100 shadow-lg p-4 overflow-y-auto overflow-x-hidden md:block hidden"
      initial={{ width: '5rem' }}
      animate={{ width: extended ? '16rem' : '5rem' }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Section */}
      <div>
        <button
          className="text-2xl text-gray-700 hover:text-blue-600 mb-6"
          onClick={() => setExtended((prev) => !prev)}
        >
          <MdMenu />
        </button>

        <div className="mb-8">
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 p-3 w-full text-blue-700 bg-blue-200 rounded-lg hover:bg-blue-300 transition duration-300"
          >
            <FaPlus className="text-lg" />
            <AnimatePresence>
              {extended && (
                <motion.span
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={menuVariants}
                  transition={{ duration: 0.3 }}
                  className="text-sm font-medium"
                >
                  New Chat
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {extended && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <p className="text-gray-600 font-semibold mb-3">History</p>
              <motion.div
                className="flex items-center gap-3 p-3 hover:bg-blue-200 rounded-lg transition duration-300 cursor-pointer"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdChatBubbleOutline className="text-lg text-gray-700" />
                <span className="text-sm font-medium text-gray-800">
                  What is React...
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4">
        <motion.div
          className="flex items-center gap-3 p-3 hover:bg-blue-200 rounded-lg transition duration-300 cursor-pointer"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MdHelpOutline className="text-lg text-gray-700" />
          {extended && (
            <motion.span
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium text-gray-800"
            >
              Help
            </motion.span>
          )}
        </motion.div>

        <motion.div
          className="flex items-center gap-3 p-3 hover:bg-blue-200 rounded-lg transition duration-300 cursor-pointer"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleLogout}
        >
          <IoIosLogOut className="text-2xl font-semibold text-gray-700" />
          {extended && (
            <motion.span
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium text-gray-800"
            >
              Logout
            </motion.span>
          )}
        </motion.div>
      </div>
      {showLogoutModal && (
        <ConfirmationModal
          message="Are you sure you want to logout?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </motion.div>
  );
};

export default Sidebar;
