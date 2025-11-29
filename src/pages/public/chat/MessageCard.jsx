import React, { useState } from 'react';

const MessageCard = ({ message, isSender }) => {
  const [showActions, setShowActions] = useState(false);

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`relative max-w-xs lg:max-w-md ${isSender ? 'order-2' : 'order-1'}`}>
        {/* Message Bubble */}
        <div className={`
          rounded-2xl p-4 shadow-sm transition-all duration-200
          ${isSender 
            ? 'bg-[#1e4d4d] text-white rounded-br-md' 
            : 'bg-white text-gray-800 rounded-bl-md border border-[#1e4d4d]/10'
          }
          ${showActions ? 'transform scale-105' : ''}
        `}>
          {/* Message Text */}
          {message.body && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.body}
            </p>
          )}
          
          {/* Attachment */}
          {message.attachment && (
            <div className="mt-2">
              {message.attachment.type === 'image' ? (
                <img 
                  src={message.attachment.url} 
                  alt={message.attachment.title}
                  className="rounded-lg max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => window.open(message.attachment.url, '_blank')}
                />
              ) : (
                <a 
                  href={message.attachment.download_url}
                  className="inline-flex items-center space-x-2 bg-black/10 hover:bg-black/20 rounded-lg px-3 py-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-regular fa-file text-[#1e4d4d]"></i>
                  <span className="text-sm font-medium">{message.attachment.title}</span>
                </a>
              )}
            </div>
          )}
          
          {/* Time and Status */}
          <div className={`flex items-center justify-end space-x-2 mt-2 text-xs ${
            isSender ? 'text-white/80' : 'text-gray-500'
          }`}>
            <span>{formatTime(message.created_at)}</span>
            {isSender && (
              <i className={`fa-solid fa-${message.seen ? 'check-double' : 'check'}`}></i>
            )}
          </div>
        </div>

        {/* Actions */}
        {showActions && isSender && (
          <div className="absolute -left-10 top-1/2 transform -translate-y-1/2">
            <button className="w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
              <i className="fa-regular fa-trash-can text-sm"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCard;