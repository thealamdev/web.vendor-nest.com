"use client";

import { ArrowLeft, Fullscreen, Minimize, X } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const [toggleVisibility, setToggleVisiblility] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleVisible = () => {
    setTimeout(() => {
      setToggleVisiblility(!toggleVisibility);
    }, 100);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 shadow-2xl backdrop-blur-[1px] flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
                    relative
                    flex flex-col
                    w-full ${fullScreen ? 'max-w-[calc(100%-40px)] ml-0 mr-[40px] h-screen' : 'max-w-3xl max-h-[90vh]'} 
                    bg-white
                    ${toggleVisibility ? 'rounded-l-3xl' : 'rounded-3xl'}
                    ${fullScreen && '!rounded-none'}
                    shadow-xl
                    transform transition-all duration-200 ease-out
                    animate-fadeIn
                  `}
      >
        <div className={`absolute top-0 ${toggleVisibility ? '-right-10 -z-50 bg-gray-100' : 'right-0 border-0 z-50 bg-transparent'} transform duration-300 ease-in-out w-10 h-full ${fullScreen ? 'rounded-none' : 'rounded-r-3xl'}`}>
          <button
            type="button"
            className={`bg-gray-100 w-5 h-5 ${toggleVisibility ? 'rotate-0' : 'rotate-[180deg]'} transform duration-300 ease-in-out cursor-pointer rounded-full flex items-center justify-center absolute z-50 ${fullScreen ? "top-1/2 left-1/2" : "-top-2 -right-2"} shadow-md hover:bg-gray-200 transition-colors`}
            onClick={handleVisible}
          >
            <ArrowLeft size={12} className="text-slate-500" />
          </button>

          <div className={`py-8 ${toggleVisibility ? 'visible' : 'hidden'} flex items-center justify-center gap-4`}>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              type="button"
              onClick={() => setFullScreen(!fullScreen)}
            >
              {fullScreen ?
                (
                  <Minimize size={18} className="text-slate-500" />
                ) : (
                  <Fullscreen size={18} className="text-slate-500" />
                )}

            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            {title && (
              <h2 className="text-lg font-semibold">{title}</h2>
            )}
            <button
              className="text-slate-500 cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-colors"
              type="button"
              onClick={onClose}
            >
              <X
                size={18}
                onClick={onClose}
              />
            </button>
          </div>
          {children}
        </div>
      </div>

      {/* simple animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.18s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}