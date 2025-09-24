'use client';

import { useState } from 'react';
import { MessageCircle, X, Minimize2 } from 'lucide-react';
import { ZaraPanel } from './ZaraPanel';

export function ZaraButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const togglePanel = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsMinimized(false);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const minimizePanel = () => {
    setIsMinimized(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={togglePanel}
            className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            aria-label="Open Zara Assistant"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            {/* Minimize button */}
            <button
              onClick={minimizePanel}
              className="w-10 h-10 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
              aria-label="Minimize Zara"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            
            {/* Close button */}
            <button
              onClick={closePanel}
              className="w-10 h-10 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
              aria-label="Close Zara"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Panel */}
      {isOpen && (
        <ZaraPanel 
          isMinimized={isMinimized} 
          onMinimize={minimizePanel}
          onClose={closePanel}
        />
      )}
    </>
  );
}