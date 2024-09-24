/* eslint-disable react/prop-types */

import { motion } from 'framer-motion';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl transform w-11/12 sm:w-96">
        <p className="text-lg font-semibold mb-6 text-gray-800 text-center sm:text-left">
          {message}
        </p>
        <div className="flex justify-center sm:justify-end space-x-4">
          <button
            className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-200"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition duration-200"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfirmationModal;
