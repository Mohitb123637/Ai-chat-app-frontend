import ReactMarkdown from 'react-markdown';
import { RiImageAddFill } from 'react-icons/ri';
import { MdKeyboardVoice } from 'react-icons/md';
import { motion } from 'framer-motion';
import { IoMdSend } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../store/profile/profileAction';
import {
  deleteChat,
  getChatHistory,
  getResponse,
} from '../../../store/ai/aiAction';
import Header from '../header/Header';
import Footer from '../Footer';
import ConfirmationModal from '../model/ConfirmationModel';
import Suggestion from '../suggestion/Suggestion';

const Main = () => {
  const [messages, setMessages] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const user = useSelector((state) => state.profile?.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChatHistory())
      .then((action) => {
        if (action.payload) {
          const historyMessages = [];
          console.log(action.payload, 'action payload is ');
          action.payload.history.forEach((message) => {
            if (message.question) {
              historyMessages.push({
                type: 'question',
                content: message.question,
                from: 'user',
              });
            }
            if (message.answer) {
              historyMessages.push({
                text: message.answer,
                from: 'ai',
              });
            }
          });
          setMessages(historyMessages);
        }
      })
      .catch((error) => {
        console.error('Error fetching chat history:', error);
      });
  }, [dispatch]);

  // Update showResults based on messages length
  useEffect(() => {
    // Update showResults based on messages length
    setShowResults(messages.length > 0);
  }, [messages]);

  const handleSubmit = async () => {
    setShowResults(true);
    const trimmedInput = input.trim();
    if (trimmedInput === '') return;
    const newMessage = { text: trimmedInput, from: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await dispatch(
        getResponse({ question: trimmedInput })
      ).unwrap();
      console.log(response, 'unwrapped response');
      console.log(response.answer, 'unwrapped response');
      if (response && response.answer) {
        const aiMessage = { text: response.answer, from: 'ai' };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  console.log(messages, 'messages Section');

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setShowResults(true);
    handleSubmit();
  };

  const handleDeleteChat = () => {
    setShowModel(true);
  };

  const confirmClearChat = async () => {
    await dispatch(deleteChat());
    setMessages([]);
    setShowModel(false);
  };

  const cancelChatClear = () => {
    setShowModel(false);
  };
  console.log(messages.length, 'length');

  return (
    <div className="flex-1 min-h-screen relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Header Section */}

      <Header messages={messages} handleDeleteChat={handleDeleteChat} />

      {/* Main Chat Section */}
      {!showResults ? (
        <Suggestion user={user} handleSuggestionClick={handleSuggestionClick} />
      ) : (
        <div className="p-8 h-[calc(100vh-205px)] overflow-y-auto overflow-x-hidden space-y-5 max-w-[75vw] mx-auto sm:block max-w-full mx-auto space-y-1">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={messageVariants}
              transition={{ duration: 0.1, delay: index * 0.05 }}
              className={
                message.from === 'user' ? 'chat chat-end' : 'chat chat-start'
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      message.from === 'user'
                        ? 'https://a0.anyrgb.com/pngimg/946/838/user-profile-login-avatar-heroes-user-sphere-blog-black-icons-circle-thumbnail.png'
                        : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                    }
                  />
                </div>
              </div>
              <div className="chat-header font-semibold">
                {message.from === 'user' ? 'You' : 'AI '}
              </div>
              <div
                className={
                  message.from === 'user'
                    ? 'chat-bubble bg-blue-600 text-gray-100'
                    : 'chat-bubble bg-violet-200 text-gray-600 font-medium'
                }
              >
                {/* Render text from either the 'content' or 'text' field */}
                <ReactMarkdown>{message.content || message.text}</ReactMarkdown>
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex justify-center mb-5">
              <motion.div
                className="text-black font-bold"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </motion.div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Bottom Input Section */}
      <div className="sticky bottom-0 w-full  ">
        <div className=" max-w-5xl mx-auto px-4 ">
          <div className="flex items-center space-x-4 border border-gray-300 rounded-full bg-gray-100 px-4 py-2">
            <textarea
              placeholder="Enter a prompt here"
              className="flex-1 h-[50px] py-3 px-4 bg-gray-100 rounded-full text-gray-800 font-semibold border-none focus:outline-none resize-none overflow-y-auto transition-colors duration-200 ease-in-out"
              value={input}
              disabled={isLoading}
              ref={inputRef}
              rows={1}
              onKeyDown={handleKeyDown}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className="flex space-x-3">
              <RiImageAddFill className="text-gray-600 hover:text-blue-500 text-3xl cursor-pointer transition-transform duration-300" />
              <MdKeyboardVoice className="text-gray-600 hover:text-blue-500 text-3xl cursor-pointer transition-transform duration-300" />
              <button onClick={handleSubmit} disabled={isLoading}>
                <IoMdSend className="text-blue-600 hover:text-blue-500 text-3xl cursor-pointer transition-transform duration-300" />
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {showModel && (
        <ConfirmationModal
          message="Are you sure you want to Clear the chat?"
          onConfirm={confirmClearChat}
          onCancel={cancelChatClear}
        />
      )}
    </div>
  );
};

export default Main;
