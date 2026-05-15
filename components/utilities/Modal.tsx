"use client";

import React, { ReactNode, useEffect } from "react";

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
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    w-full max-w-lg
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-xl
                    transform transition-all duration-200 ease-out
                    animate-fadeIn
                  `}
            >
                {title && (
                    <h2 className="text-lg font-semibold mb-4">{title}</h2>
                )}

                {children}
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