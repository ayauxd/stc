import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  User, 
  X,
  ArrowUp,
  Phone,
  PhoneCall
} from 'lucide-react';

const ChatAssistant = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Array<{text: string, sender: string, timestamp: Date}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDialing, setIsDialing] = useState(false);
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callReason, setCallReason] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle click outside to close expanded chat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newUserMessage = { 
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        text: "Thanks for your question. I can help with that! Is there anything specific you'd like to know about our AI solutions?",
        sender: 'assistant',
        timestamp: new Date()
      }]);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const handleCallButton = () => {
    setIsDialing(true);
    // Simulate dialing for 2 seconds
    setTimeout(() => {
      setIsDialing(false);
      setShowCallbackForm(true);
    }, 2000);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the data to your backend
    console.log('Callback requested:', { phoneNumber, callReason });
    
    // Show confirmation message in chat
    setMessages(prev => [...prev, {
      text: `Thanks! We'll call you at ${phoneNumber} to discuss: ${callReason}`,
      sender: 'system',
      timestamp: new Date()
    }]);
    
    // Close the form
    setShowCallbackForm(false);
  };

  const suggestions = [
    "How can I integrate AI in my business?",
    "What AI solutions do you offer?",
    "How much does AI implementation cost?"
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        {/* Chat Button */}
        <div>
          <button 
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setIsExpanded(true)}
            className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg
                    bg-[#00BCD4] hover:bg-[#00ACC1] text-white
                    transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
          {showTooltip && (
            <div className="absolute bottom-0 right-20 bg-[#1E2A38] text-white text-sm py-2 px-3 rounded shadow-md whitespace-nowrap">
              Chat with AI Assistant
            </div>
          )}
        </div>
        
        {/* Phone Button */}
        <div>
          <button 
            onMouseEnter={() => setShowPhoneTooltip(true)}
            onMouseLeave={() => setShowPhoneTooltip(false)}
            onClick={handleCallButton}
            disabled={isDialing}
            className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg
                      ${isDialing ? 'bg-[#0097A7] animate-pulse' : 'bg-[#00BCD4] hover:bg-[#00ACC1]'} 
                      text-white transition-all duration-300 hover:scale-105 hover:shadow-xl`}
          >
            {isDialing ? (
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-100 mx-1"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200"></div>
              </div>
            ) : (
              <Phone className="w-6 h-6" />
            )}
          </button>
          {showPhoneTooltip && !isDialing && (
            <div className="absolute bottom-0 right-20 bg-[#1E2A38] text-white text-sm py-2 px-3 rounded shadow-md whitespace-nowrap">
              Schedule a Call
            </div>
          )}
        </div>
      </div>

      {/* Chat Interface */}
      {isExpanded && (
        <div 
          ref={chatContainerRef}
          className="fixed inset-0 z-50 bg-black/80 p-4 md:p-8 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="bg-[#101520] border border-[#00BCD4]/10 rounded-xl shadow-xl overflow-hidden w-full max-w-3xl h-[80vh] flex flex-col">
            {/* Chat header */}
            <div className="border-b border-[#00BCD4]/20 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-[#00BCD4]" />
                <span className="font-medium text-white">AI Assistant</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#1A2331] transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-grow p-4 overflow-y-auto scrollbar-hide">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-5">
                  <MessageSquare className="w-12 h-12 text-[#00BCD4] mb-3" />
                  <h3 className="text-lg font-medium text-white mb-2">Welcome to Softworks AI Assistant</h3>
                  <p className="text-sm text-gray-400 max-w-md mb-5">
                    Ask a question about AI integration, workflow automation, or custom AI development.
                  </p>
                  
                  {/* Suggestion chips */}
                  <div className="flex flex-wrap justify-center gap-2 max-w-md">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1.5 rounded-full text-xs bg-[#002B36] border border-[#00BCD4]/30 text-gray-300 
                                   hover:bg-[#003747] hover:border-[#00BCD4]/50 transition-all duration-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.sender !== "user" && (
                        <div className="w-8 h-8 rounded-full bg-[#003747] flex items-center justify-center mr-2 flex-shrink-0">
                          <MessageSquare className="w-4 h-4 text-[#00BCD4]" />
                        </div>
                      )}
                      <div
                        className={`rounded-lg p-3 max-w-[80%] ${
                          message.sender === "user"
                            ? "bg-[#00BCD4] text-white rounded-tr-none"
                            : message.sender === "system"
                            ? "bg-[#003747]/80 text-gray-200 rounded-lg"
                            : "bg-[#002B36] text-gray-200 rounded-tl-none"
                        }`}
                      >
                        <p className="break-words">{message.text}</p>
                        <div
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-[#E0F7FA]"
                              : "text-[#78909C]"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                      {message.sender === "user" && (
                        <div className="w-8 h-8 rounded-full bg-[#00BCD4]/20 flex items-center justify-center ml-2 flex-shrink-0">
                          <User className="w-4 h-4 text-[#00BCD4]" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#003747] flex items-center justify-center mr-2 flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-[#00BCD4]" />
                      </div>
                      <div className="bg-[#002B36] px-4 py-2 rounded-lg rounded-tl-none inline-flex">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#00BCD4] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#00BCD4] rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-[#00BCD4] rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-[#00BCD4]/20">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow p-2 rounded-md bg-[#1A2331] border border-[#00BCD4]/30 text-white 
                             focus:outline-none focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`p-2 rounded-md transition-colors flex-shrink-0 ${
                    inputValue.trim()
                      ? "bg-[#00BCD4] hover:bg-[#00ACC1] text-white"
                      : "bg-[#1A2331] text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Callback Form Modal */}
      {showCallbackForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#101520] border border-[#00BCD4]/10 rounded-xl shadow-xl overflow-hidden w-full max-w-md animate-scale-in">
            <div className="border-b border-[#00BCD4]/20 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <PhoneCall className="w-5 h-5 mr-2 text-[#00BCD4]" />
                <span className="font-medium text-white">Schedule a Consultation</span>
              </div>
              <button
                onClick={() => setShowCallbackForm(false)}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#1A2331] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number*</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full p-2 rounded-md bg-[#1A2331] border border-[#00BCD4]/30 text-white focus:outline-none focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">What would you like to discuss?*</label>
                  <textarea
                    value={callReason}
                    onChange={(e) => setCallReason(e.target.value)}
                    placeholder="e.g., AI integration for logistics, workflow automation..."
                    className="w-full p-2 rounded-md bg-[#1A2331] border border-[#00BCD4]/30 text-white focus:outline-none focus:border-[#00BCD4] focus:ring-1 focus:ring-[#00BCD4] resize-none"
                    rows={3}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-2 rounded-md bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-medium transition-colors"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant; 