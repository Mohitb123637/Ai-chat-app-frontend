/* eslint-disable react/prop-types */

import { FaCode, FaRegCompass, FaRegLightbulb } from 'react-icons/fa';
import { FaRegMessage } from 'react-icons/fa6';

const Suggestion = ({ user, handleSuggestionClick }) => {
  return (
    <div className="px-4 sm:px-6 h-[calc(100vh-205px)] overflow-y-auto py-8">
      {/* Greeting Section */}
      <div className="mb-10 text-center">
        <p className="text-2xl sm:text-4xl text-gray-600 font-bold mb-2 tracking-tight">
          Hello, {user?.name}
        </p>
        <p className="text-sm sm:text-lg text-gray-400 font-light">
          How can I assist you today?
        </p>
      </div>

      {/* Suggestions Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-full sm:max-w-5xl mx-auto">
        <div
          className="group flex flex-col items-start p-4 sm:p-6 bg-blue-50 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition cursor-pointer duration-300 ease-in-out"
          onClick={() =>
            handleSuggestionClick(
              'Suggest beautiful places to see in Uttarakhand'
            )
          }
        >
          <FaRegCompass className="text-blue-600 text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:rotate-12 transition-transform duration-300" />
          <p className="text-base sm:text-lg text-gray-800 font-semibold">
            Suggest beautiful places to see in Uttarakhand
          </p>
        </div>

        <div
          className="group flex flex-col items-start p-4 sm:p-6 bg-blue-50 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition cursor-pointer duration-300 ease-in-out"
          onClick={() => handleSuggestionClick('Where is Kedarnath temple')}
        >
          <FaRegLightbulb className="text-yellow-600 text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:rotate-12 transition-transform duration-300" />
          <p className="text-base sm:text-lg text-gray-800 font-semibold">
            Where is Kedarnath temple
          </p>
        </div>

        <div
          className="group flex flex-col items-start p-4 sm:p-6 bg-blue-50 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition cursor-pointer duration-300 ease-in-out"
          onClick={() =>
            handleSuggestionClick('Suggest beautiful places to see in Delhi')
          }
        >
          <FaRegMessage className="text-green-600 text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:rotate-12 transition-transform duration-300" />
          <p className="text-base sm:text-lg text-gray-800 font-semibold">
            Suggest beautiful places to see in Delhi
          </p>
        </div>

        <div
          className="group flex flex-col items-start p-4 sm:p-6 bg-blue-50 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition cursor-pointer duration-300 ease-in-out"
          onClick={() =>
            handleSuggestionClick('How to improve code readability')
          }
        >
          <FaCode className="text-red-600 text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:rotate-12 transition-transform duration-300" />
          <p className="text-base sm:text-lg text-gray-800 font-semibold">
            How to improve code readability
          </p>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
