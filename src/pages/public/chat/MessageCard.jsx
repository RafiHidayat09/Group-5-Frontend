import React, { useState } from 'react';

const MessageCard = ({ message, isSender, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {
    if (onDelete && message.id) {
      onDelete(message.id);
      setShowDeleteConfirm(false);
      setShowActions(false);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Mencegah event bubbling
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  return (
    <div 
      className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}
      onMouseEnter={() => !showDeleteConfirm && setShowActions(true)}
      onMouseLeave={() => !showDeleteConfirm && setShowActions(false)}
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

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="absolute -left-48 top-1/2 transform -translate-y-1/2 z-10">
            <div className="bg-white rounded-xl shadow-xl p-4 w-64">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-exclamation text-red-600"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Hapus Pesan</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Apakah Anda yakin ingin menghapus pesan ini? Tindakan ini tidak dapat dibatalkan.
                  </p>
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={handleCancelDelete}
                      className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Action Button */}
        {showActions && isSender && !showDeleteConfirm && (
          <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-5">
            <button 
              onClick={handleDeleteClick}
              className="w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors hover:scale-110 active:scale-95"
              title="Hapus pesan"
            >
              <i className="fa-regular fa-trash-can text-sm"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCard;