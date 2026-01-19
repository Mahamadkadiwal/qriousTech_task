import React, { useEffect, useState, useRef } from "react";
import { socket } from "./component/socket";
import "./App.css";

export default function App() {
  const [connected, setConnected] = useState(socket.connected);
  const [message, setMessage] = useState(""); 
  const [messages, setMessages] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const [serverName, setServerName] = useState(null);

  const [usernameInput, setUsernameInput] = useState("");
  const [serverInput, setServerInput] = useState("");
  const messagesEndRef = useRef(null);
  
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("serverMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("serverMessage");
    };
  }, []);

  const handleJoin = () => {
    const name = usernameInput.trim();
    const room = serverInput.trim();

    if (!name || !room) return;

    setCurrentUser(name);
    setServerName(room);

    socket.emit("joinRoom", {
      user: name,
      room: room
    });
  };

  const sendMessage = () => {
    if (!message.trim() || !currentUser) return;

    const msgData = {
      sender: currentUser,
      text: message.trim(),
      timestamp: new Date().toISOString(),
      room: serverName
    };

    socket.emit("clientMessage", msgData);
    setMessage("");
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Show name input if user hasn't set their name
  if (!currentUser) {
    return (
      <div className="h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Enter Your Name</h2>
          <input  
            type="text"
            className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-sm mb-4"
            placeholder="Your name..."
            value={usernameInput}
            onChange={(e) => {
                setUsernameInput(e.target.value);
            }}
          />
          <input
            type="text"
            className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-sm mb-4"
            placeholder="Your Server..."
            value={serverInput}
            onChange={(e) => {
                setServerInput(e.target.value);
              }
            }
          />
          <button
            onClick={handleJoin}
            className="w-full bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg font-medium"
          >
            Start Chatting
          </button>
        </div>
      </div>
    );
  }

  // Show chat interface once user has set their name
  return (
    <div className="h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4">
      {/* Chat Container */}
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl flex flex-col h-[95vh] max-h-200">

        {/* Header */}
        <div className="p-5 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              💬
            </div>
            <div>
              <span className="text-lg">Chat Room</span>
              <p className="text-xs text-white/80">Logged in as: {currentUser}</p>
            </div>
          </div>
          <span className="text-sm flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
            <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`}></span>
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <p className="text-lg">No messages yet</p>
                <p className="text-sm">Start the conversation!</p>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isSender = msg.sender === currentUser;

              return (
                <div
                  key={index}
                  className={`flex ${isSender ? "justify-end" : "justify-start"} animate-fadeIn`}
                >
                  <div className={`flex flex-col ${isSender ? "items-end" : "items-start"} max-w-[75%]`}>
                    {!isSender && (
                      <span className="text-xs font-medium text-gray-600 mb-1 px-1">
                        {msg.sender}
                      </span>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm ${
                        isSender
                          ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-br-sm"
                          : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
                      }`}
                    >
                      <p className="text-sm leading-relaxed wrap-break-words">{msg.text}</p>
                    </div>
                    <span className="text-xs text-gray-400 mt-1 px-1">
                      {msg.timestamp ? formatTime(msg.timestamp) : 'Now'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
          <div className="flex gap-3">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-sm"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
            >
              <span>Send</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}